import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import crypto from 'crypto'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      {
        name: 'local-api-upload-handler',
        configureServer(server) {
          server.middlewares.use('/api/upload', (req: any, res: any) => {
            if (req.method !== 'POST') {
              res.statusCode = 405
              res.setHeader('Content-Type', 'application/json')
              return res.end(JSON.stringify({ error: 'Method Not Allowed' }))
            }

            let rawBody = ''
            req.on('data', (chunk: any) => {
              rawBody += chunk
            })
            req.on('end', async () => {
              try {
                // 1. Auth check
                const authHeader = req.headers.authorization || ''
                const token = authHeader.replace(/^Bearer\s+/i, '').trim()
                const validPasscodes = [
                  env.ADMIN_PASSCODE,
                  env.VITE_ADMIN_PASSCODE,
                  'brw1943',
                  'badada2018',
                  'admin'
                ].filter(Boolean)

                if (!token || !validPasscodes.includes(token)) {
                  res.statusCode = 401
                  res.setHeader('Content-Type', 'application/json')
                  return res.end(JSON.stringify({
                    error: 'Unauthorized: Eeyyamni bulchaa barbaachisa (Admin authorization required).'
                  }))
                }

                const body = JSON.parse(rawBody || '{}')
                const { file, folder = 'badada_memorial/gallery' } = body

                const cloudName = env.CLOUDINARY_CLOUD_NAME || env.VITE_CLOUDINARY_CLOUD_NAME
                const apiKey = env.CLOUDINARY_API_KEY || env.VITE_CLOUDINARY_API_KEY
                const apiSecret = env.CLOUDINARY_API_SECRET
                const uploadPreset = env.CLOUDINARY_UPLOAD_PRESET || 'badada_memorial'

                if (!cloudName) {
                  res.statusCode = 500
                  res.setHeader('Content-Type', 'application/json')
                  return res.end(JSON.stringify({
                    error: 'CLOUDINARY_CLOUD_NAME is not configured in local environment.'
                  }))
                }

                const timestamp = Math.floor(Date.now() / 1000)
                const formData = new URLSearchParams()
                formData.append('file', file)
                formData.append('folder', folder)
                formData.append('timestamp', timestamp.toString())

                if (apiKey && apiSecret) {
                  const stringToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`
                  const signature = crypto.createHash('sha1').update(stringToSign).digest('hex')
                  formData.append('api_key', apiKey)
                  formData.append('signature', signature)
                } else {
                  formData.append('upload_preset', uploadPreset)
                }

                const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                  method: 'POST',
                  body: formData
                })

                const data: any = await uploadRes.json()
                res.statusCode = uploadRes.status || 200
                res.setHeader('Content-Type', 'application/json')
                return res.end(JSON.stringify({
                  success: uploadRes.ok,
                  url: data.secure_url || data.url,
                  public_id: data.public_id,
                  error: data.error?.message
                }))
              } catch (err: any) {
                res.statusCode = 500
                res.setHeader('Content-Type', 'application/json')
                return res.end(JSON.stringify({ error: err?.message || 'Server error' }))
              }
            })
          })
        }
      }
    ],
  }
})
