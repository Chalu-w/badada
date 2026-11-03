import { BiographySection, FamilyMember, PhotoItem, TributeItem, WebsiteConfig } from '../types';

export const initialWebsiteConfig: WebsiteConfig = {
  personName: "Badhaadhaa Raggaasaa Wayyeessaa",
  honorific: "Obbo",
  birthDate: "1943",
  birthDateNote: "Bara 1943 keessa dhalatan (Godina Shawaa Lixaa, Aanaa Meettaa Walqixxee, Ganda Meexii Haroo, Gooxii Daadaa)",
  deathDate: "07/04/2018",
  deathDateNote: "Guyyaa 07/04/2018 (Kibxata, sa'aatii 7:00tti) boqotan. Galmee maatii keessatti 16/12/2025 (7/04/2018) jedhamee yaadatama.",
  heroQuote: {
    om: "Ijoolleen kiyya baratanii wallaalummaa keessaa haa bahan! Dhaalli guddaan ijoolleef dhiifamu beekumsa, naamusa, amanamummaa fi jaalala maatiiti.",
    en: "May my children be educated and rise out of ignorance! The greatest inheritance one can leave to children is knowledge, moral virtue, integrity, and love of family.",
    am: "ልጆቼ ተምረው ካለመማር ድንቁርና ይውጡ! ለልጆች የሚተላለፈው ትልቁ ቅርስ እውቀት፣ ስነምግባር፣ ታማኝነት እና የቤተሰብ ፍቅር ነው።"
  },
  heroPortraitUrl: "/hero-portrait.jpg", // Verified family portrait of Obbo Badhaadhaa Raggaasaa
  logoType: 'svg',
  candleCount: 312,
  primaryContact: "Maatii Obbo Badhaadhaa Raggaasaa Wayyeessaa",
  memorialAddress: "Godina Shawaa Lixaa, Aanaa Meettaa Walqixxee, Ganda Meexii Haroo / Minaaree / Hoolataa",
  metaTitle: "BADHAADHAA RAGGAASAA WAYYEESSAA AFAAN OROMOO AND ENGLISH"
};

export const initialBiographySections: BiographySection[] = [
  {
    id: "seensa",
    order: 1,
    title: {
      om: "1. Seensa",
      en: "1. Introduction",
      am: "1. መግቢያ"
    },
    subtitle: {
      om: "Yaadannoo jireenya nama kabajamaa",
      en: "Remembering the Life of an Honorable Man",
      am: "የተከበረ ሰው የህይወት መታሰቢያ"
    },
    content: {
      om: `Jireenyi nama tokkoo yeroo dhalatee hanga boqonnaatti dabarse qofa miti; hojii inni hojjete, namoota inni jaallate, gorsa inni kenne, dhaloota inni guddisuu keessatti gahee taphateefi hawaasa keessatti dhiiseen madaalama. Seenaa Obbo Badhaadha Raggaasaa Wayyeessaa yeroo yaadannu, jireenya abbaa maatii, nama hojii jaallatu, nama hawaasaaf yaadu, gorsa namaaf kennuufi nagaa jaallatu tokko yaadanna. Seenaa kana keessatti dhaloota isaa, guddina isaa, gaa’ela, maatii, hojii jireenyaa, jaalala barnootaa, tajaajila hawaasaa, rakkoolee inni keessa darbeefi dhaala inni dhalootaaf dhiise ni ilaalla.

Seenaa kana barreessuun kaayyoo tokko qaba: jireenya nama tokkoo galmeessuun, ijoollee, ijoollee ijoollee, firoota, hiriyootaafi hawaasa naannoo biratti yaadannoo isaa akka hin badne gochuu. Seenaa keessatti wantoonni tokko tokko akka odeeffannoo maatii irraa argametti dhiyaatu; maqaan yookaan guyyaan sirriitti hin mirkanoofne immoo osoo hin uumamin akkuma galmaa’eetti dhiyaata. Kun dhugaa seenaa kabajuuf barbaachisaadha.

Obbo Badhaadha Raggaasaa nama jireenya isaa keessatti maatii isaa cimsuuf, ijoollee isaa barsiisuuf, hawaasa waliin nagaan jiraachuuf carraaqe turan. Jireenyi isaanii gammachuu qofa hin qabne; rakkoolee ulfaatoo, gaddaafi dhukkubas keessa darbeera. Haa ta’u malee, waan isaan hojjataniifi namoota irratti dhiisan yaadachuun seenaa isaanii kabajaan dhalootaaf dabarsuuf nu gargaara.`,
      en: `A person's life is not measured merely by the span between birth and passing; it is weighed by the deeds accomplished, the lives touched with love, the counsel imparted, the generational legacy nurtured, and the enduring heritage left within the community. When we reflect upon the life of Obbo Badhaadhaa Raggaasaa Wayyeessaa, we remember a dedicated patriarch, an industrious worker, a civic guardian, a wise counselor, and an ardent peacemaker. Within this history, we celebrate his birth, upbringing, marriages, household, passion for education, community leadership, the severe trials he endured, and the timeless legacy he bequeathed.

Preserving this history fulfills a sacred purpose: to chronicle his journey so that his memory remains eternally luminous among his children, grandchildren, relatives, companions, and society. Every recorded event is presented faithfully as preserved by the family archives, maintaining historical truth with absolute reverence.

Obbo Badhaadhaa devoted his days to strengthening his family, educating his children, and fostering communal harmony. His path knew not only joy, but also profound sorrow, persecution, and painful physical illness. Yet, honoring his resilience enables us to pass down a dignified heritage of strength and love.`,
      am: `የአንድ ሰው ህይወት ከተወለደበት እስከ እረፍቱ ባለው ዘመን ብቻ የሚለካ አይደለም፤ በሰራው በጎ ስራ፣ በወደዳቸው ሰዎች፣ በሰጠው ምክር፣ ትውልድን በማሳደግ በኩል በተወጣው ሚና እና በማህበረሰቡ ውስጥ ባስቀመጠው አሻራ ይመዘናል። የአቶ በዳዳ ረጋሳ ወዬሳን የህይወት ታሪክ ስናስታውስ፣ አርአያ የሆነን የቤተሰብ አባት፣ ስራ ወዳድ፣ ለማህበረሰብ ተቆርቋሪ፣ መካሪ እና ሰላም ወዳድ ታላቅ ሰውን እናስታውሳለን። በዚህ ታሪክ ውስጥ ልደታቸውን፣ እድገታቸውን፣ ጋብቻቸውን፣ ቤተሰባቸውን፣ ለትምህርት ያላቸውን ፍቅር፣ ማህበራዊ አገልግሎታቸውን፣ ያለፉባቸውን ፈተናዎች እና ለትውልድ የተዉትን አሻራ እንመለከታለን።

ይህንን ታሪክ የመመዝገብ ዋና አላማ የአንድን ታላቅ ሰው ህይወት ሰንዶ በማስቀመጥ፣ በልጆቹ፣ በልጅ ልጆቹ፣ በዘመዶቹ፣ በጓደኞቹ እና በማህበረሰቡ ዘንድ መታሰቢያው ሳይደበዝዝ ለዘላለም እንዲኖር ማድረግ ነው።

አቶ በዳዳ ረጋሳ በህይወት ዘመናቸው ቤተሰባቸውን ለማጠንከር፣ ልጆቻቸውን ለማስተማር እና ከህብረተሰቡ ጋር በሰላም ለመኖር የታገሉ አባት ነበሩ። ህይወታቸው የደስታ ብቻ አልነበረም፤ ከባድ ፈተናዎችን፣ ጥልቅ ሀዘንና ህመምን አስተናግደዋል። ሆኖም ግን የሰሩትን መልካም ስራ በማስታወስ ታሪካቸውን በክብር ለቀጣዩ ትውልድ ማስተላለፍ የሁላችንም አደራ ነው።`
    },
    quote: {
      om: "Jireenyi nama tokkoo hojii inni hojjete, namoota inni jaallateefi dhaala inni dhalootaaf dhiiseen madaalama.",
      en: "A person's life is measured by the work they did, the people they loved, and the enduring legacy they left for generations.",
      am: "የአንድ ሰው ህይወት በሚሰራው መልካም ስራ፣ በሚያፈቅራቸው ሰዎች እና ለትውልድ በሚተወው አሻራ ይለካል።"
    }
  },
  {
    id: "dhalootaafi-maatii",
    order: 2,
    title: {
      om: "2. Dhalootaafi Maatii",
      en: "2. Birth and Family Roots",
      am: "2. ልደት እና የቤተሰብ አመጣጥ"
    },
    subtitle: {
      om: "Maqaa, dhalootaafi bu’uura maatii",
      en: "Name, Birthplace, and Ancestral Foundations",
      am: "ስም፣ የትውልድ ቦታ እና የቤተሰብ መሰረት"
    },
    content: {
      om: `Obbo Badhaadha Raggaasaa Wayyeessaa jedhamuun kan beekaman, bara 1943 keessa dhalatan jedhamee seenaa maatii keessatti yaadatama. Iddoon dhaloota isaanii Godina Shawaa Lixaa, Aanaa Meettaa Walqixxee, Ganda Meexii Haroo, iddoo addaa Gooxii Daadaa jedhamudha. Bakki dhalootaa kun lafa seenaa ijoollummaa isaanii jalqabsiise, maatii isaanii keessatti guddatan, hawaasa naannoo waliin wal baranefi eenyummaa isaanii itti ijaaratan ture.

Abbaan isaanii Obbo Raggaasaa Wayyeessaa, haati isaanii immoo Addee Fittaalee Sanbuuyyee turan. Maatiin isaanii haala jireenyaa yeroo sanaa keessatti ilma tokko qofa qabaachuun isaanii seenaa Badhaadhaa keessatti dhimma guddaa ture. Inni abbaa fi haadha isaatiif ilma tokkicha waan tureef, jaalalli, eegumsiifi abdii maatii isaanii isa irratti xiyyeeffata ture. Ilma tokkicha ta’uun isaa garuu of qofaaf jiraachuu osoo hin taane, maatii isaa tajaajiluu fi itti gaafatamummaa guddaa fudhachuu akka baratu taasise.

Maqaan Badhaadhaa jedhu seenaa maatii keessatti maqaa nama tokkoo qofa osoo hin taane, yaadannoo abbaa maatii, abbaa ijoollee hedduu, nama hawaasa keessatti beekamaa turee waliin wal qabata. Maqaa kanaan dhaloonni boodaas isa yaadata. Seenaa dhalootaa fi maatii isaa galmeessuun, eenyu irraa akka dhufeefi bakka kamiin akka guddina jireenyaa isaa jalqabe hubachuuf bu’uura ta’a.`,
      en: `Known by his full honorable name Obbo Badhaadhaa Raggaasaa Wayyeessaa, he was born in the year 1943 as recorded in the family archives. His birthplace is West Shewa Zone, Meta Walkite District, Meti Haro Kebele, in the specific locality known as Goxi Daadaa (Godina Shawaa Lixaa, Aanaa Meettaa Walqixxee, Ganda Meexii Haroo, Gooxii Daadaa). This homeland shaped the dawn of his childhood, his ancestral nurture, and his identity.

He was born to his esteemed father Obbo Raggaasaa Wayyeessaa and his mother Addee Fittaalee Sanbuuyyee. In that era, being the only child of his parents was a defining circumstance of his youth. As an only child, his parents invested all their love, vigilance, and future hopes into him. Yet being an only child never fostered selfishness; instead, it instilled a profound sense of responsibility, filial duty, and service to his family.

The name 'Badhaadhaa' carries deep meaning in Oromo culture—signifying prosperity, fullness, and generational blessing. For descendants, he is remembered not merely as an individual, but as the patriarch of a grand household of ten children and a pillar of the community.`,
      am: `አቶ በዳዳ ረጋሳ ወዬሳ በ1943 ዓ.ም እንደተወለዱ በቤተሰብ መዝገብ ውስጥ ተመዝግቧል። የትውልድ ቦታቸው በምዕራብ ሸዋ ዞን፣ ሜጣ ወልቂጤ ወረዳ፣ ሜጪ ሀሮ ቀበሌ፣ ዳዳ ተብሎ በሚጠራው ልዩ መንደር ውስጥ ነው (Godina Shawaa Lixaa, Aanaa Meettaa Walqixxee, Ganda Meexii Haroo, Gooxii Daadaa)። ይህ ቦታ የልጅነት ዘመናቸውን ያሳለፉበት፣ ከቤተሰባቸው ጋር ያደጉበት እና ስብዕናቸው የታነጸበት ምድር ነው።

አባታቸው አቶ ረጋሳ ወዬሳ ሲሆኑ እናታቸው ደግሞ ወይዘሮ ፊታሌ ሰንቡዬ ነበሩ። ለወላጆቻቸው ብቸኛ ልጅ (ilma tokkicha) ነበሩ። ብቸኛ ልጅ መሆናቸው የወላጆቻቸው ፍቅር፣ እንክብካቤ እና ተስፋ በእሳቸው ላይ እንዲያርፍ አድርጓል። ብቸኛ ልጅ መሆናቸው ለራሳቸው ብቻ እንዲኖሩ ሳይሆን፣ ለቤተሰብ ታማኝ እንዲሆኑና ታላቅ ኃላፊነትን እንዲሸከሙ አስተምሯቸዋል።

'በዳዳ' የሚለው ስም የበረከትና የሙላት ምልክት ሲሆን፣ ዛሬም ድረስ በቤተሰባቸውና በህብረተሰቡ ዘንድ በታላቅ አክብሮት ይጠራል።`
    }
  },
  {
    id: "ijoollummaa-fi-guddina",
    order: 3,
    title: {
      om: "3. Ijoollummaa fi Guddina",
      en: "3. Childhood and Upbringing",
      am: "3. የልጅነት ጊዜ እና እድገት"
    },
    subtitle: {
      om: "Amala ijoollummaa, taphoota aadaa fi hariiroo hawaasaa",
      en: "Early Character, Traditional Games, and Social Bonds",
      am: "የልጅነት ስነምግባር፣ ባህላዊ ጨዋታዎች እና ማህበራዊ ግንኙነት"
    },
    content: {
      om: `Badhaadhaan ijoollummaa isaa keessatti haala maatii isaatiin itti gaafatamummaa adda ta’e qaba ture. Abbaa fi haadha isaatiif ilma tokkicha waan ta’eef, bakka ijoollee biroo bu’ee maatii gargaaruun isa irraa eegama ture. Maatiin isaa isa kunuunsuuf, nyaata, uffata, barnoota jireenyaa fi guddina isaa irratti xiyyeeffannoo kennu turan. Innis tajaajila maatiif barbaachisu raawwachaa guddate.

Yeroo ijoollummaa, daa’imni tokko maatii isaa irraa naamusa, hojii, kabaja namaa fi waliin jiraachuu barataa deema. Badhaadhaanis haala kana keessatti guddachuun, maatii isaa tajaajiluun akka dirqama kabajamaa ta’e hubate. Hojii maatii keessatti hirmaachuun, waan isaaf kenname raawwachuun, abbaa fi haadha isaa gammachiisuuf carraaquun amala jireenya isaa keessatti mul’ate.

Yeroo Badhaadhaan guddachaa dhufe, hawaasa naannoo fi hiriyoota isaa biratti kabajaafi jaalala horachuu jalqabe. Namoota waliin jiraachuu, hiriyoota waliin yeroo dabarsuu, taphoota aadaa keessatti hirmaachuu fi wal kabajuun jireenya hawaasummaa isaa keessatti iddoo qaba ture. Keessumaa hiriyoota isaa waliin taphoota akka wallaansoo fi qillee taphachuun beekamaa ture jedhamee yaadatama. Taphoonni kun dargaggoota walitti fiduun, wal beekuu, waliif obsuu, seera taphaa kabajuu fi dandeettii qaamaa guddisuu keessatti gahee qabu turan. Badhaadhaan dubbii nama gammachiisu dubbachuu, namoota waliin walii galuu fi kabaja kennuu irratti beekamaa ture.`,
      en: `Throughout his early boyhood, Badhaadhaa shouldered distinct responsibilities. As the only child of his parents, he stepped up to fulfill the duties of multiple siblings, actively assisting his parents in farming and household chores while receiving their devoted love and guidance.

From his parents, he internalized self-discipline, respect for elders, and the sacredness of mutual service. As he grew, he gained admiration and fondness among neighborhood peers. He was an active and vibrant participant in traditional Oromo sports—most notably traditional wrestling (wallaansoo) and traditional field hockey (qillee).

These customary pastimes were more than recreation: they forged endurance, mutual respect, adherence to rules, and lifelong bonds. He became celebrated for speech that brought warmth and unity to gatherings, laying the bedrock for his future role as a respected elder and mediator.`,
      am: `በልጅነታቸው ለወላጆቻቸው ብቸኛ ልጅ በመሆናቸው ምክንያት የበርካታ ልጆችን ድርሻ በመወጣት ቤተሰቦቻቸውን በታማኝነት ያግዙ ነበር። ወላጆቻቸው በፍቅርና በስነምግባር አንጸው አሳድገዋቸዋል።

ከወላጆቻቸው ታዛዥነትን፣ ሰውን ማክበርንና ታታሪነትን ተምረዋል። ወደ ጉርምስና ሲሸጋገሩም ከእኩዮቻቸው ጋር ያላቸው ግንኙነት የጠበቀ ነበር። በተለይም በባህላዊ የትግል ጨዋታ (wallaansoo) እና በገና ጨዋታ (qillee) ላይ በንቃት በመሳተፍ ይታወቁ ነበር።

እነዚህ ባህላዊ ጨዋታዎች አካላዊ ጥንካሬንና ጓደኝነትን ከመፍጠር ባሻገር ሰውን የማክበርና የህግ ታዛዥነትን አስተምረዋቸዋል። አቶ በዳዳ ሰውን የሚያስደስት ንግግር በመናገርና ሰዎችን በማስማማት የታወቁ ነበሩ።`
    }
  },
  {
    id: "dargaggummaa",
    order: 4,
    title: {
      om: "4. Dargaggummaa",
      en: "4. Youth and Early Responsibility",
      am: "4. የወጣትነት ዘመን እና ኃላፊነት"
    },
    subtitle: {
      om: "Dargaggummaa, itti gaafatamummaa fi gaa’ela jalqabaa",
      en: "Youth, Family Expectations, and First Marriage at 16",
      am: "የወጣትነት ጊዜ እና የመጀመሪያው ጋብቻ በ16 ዓመት"
    },
    content: {
      om: `Badhaadhaan gara dargaggummaatti yeroo ce’u, itti gaafatamummaan maatii isa irra jiru itti fufe. Maatiin isaa ilma tokkicha waan qabuuf, akka inni gaa’ela dhaabbatee maatii ijaaru hawwu turan. Haalli hawaasummaa yeroo sanaa fi yaadni maatii, umurii isaa irratti dhiibbaa geessisanii turan. Seenaa maatii keessatti, osoo umurii fuudhaa guutuu hin geenye, waggaa 16tti gaa’ela akka dhaabbate ibsameera.

Gaa’ela umurii dargaggummaa jalqabaa keessatti dhaabbachuun yeroo sana haala maatii fi aadaa naannoo waliin wal qabata ture. Murtiin kun Badhaadhaaf itti gaafatamummaa haaraa fide. Dargaggeessa maatii isaa keessatti guddachaa ture irraa gara abbaa manaa ta’uutti ce’uun, jireenya keessatti sadarkaa haaraa jalqabe. Haa ta’u malee, gaa’elli jalqabaa sun yeroo dheeraa hin turre.

Seenaa keessatti gaa’ela jalqabaa isaa waliin Addee maqaan isaanii hin galmoofne tokko waliin raawwachuu isaa ibsameera. Sababa umurii isaa xiqqaa ta’eef, yeroo gabaabaa keessatti wal irraa adda bahan; ijoollee waliin hin horanne. Maqaan nama sanaa odeeffannoo keessatti hin ibsamne waan ta’eef, seenaa kana keessatti maqaa hin uumamu. Dhugaa galmeessuun, waan beekamu qofa barreessuun barbaachisaadha.`,
      en: `As Badhaadhaa transitioned into youth, family obligations grew heavier. Because he was an only son, his parents were eager for him to marry early and establish a lineage. Guided by contemporary customs and parental wishes, he entered into his first marriage at the very young age of 16.

Stepping into marriage as a 16-year-old youth required an abrupt shift into adulthood. However, given their very tender age, this union did not endure long.

Historical family records note that this first marriage was with a young woman whose name was not recorded. Owing to their youthful ages, they separated amicably after a short period without children. In strict accordance with historical integrity, no fictitious names are invented, honoring only the verified facts.`,
      am: `ወደ ወጣትነት ሲሸጋገሩ የወላጆቻቸው ብቸኛ ልጅ በመሆናቸው ምክንያት ቶሎ አግብተው ቤተሰብ እንዲመሰርቱ የወላጆቻቸው ከፍተኛ ፍላጎት ነበር። በወቅቱ በነበረው ባህላዊና ማህበራዊ ሁኔታ መሰረት ገና በ16 ዓመታቸው የመጀመሪያ ጋብቻቸውን ፈጸሙ።

በዚህ የለጋነት እድሜ ጋብቻ መመስረት አዲስ ኃላፊነትን አመጣባቸው። ይሁን እንጂ እድሜያቸው በጣም ትንሽ በመሆኑ ምክንያት ይህ የመጀመሪያ ጋብቻ ረጅም ጊዜ አልዘለቀም።

በቤተሰቡ መዝገብ ላይ ስማቸው ካልተጠቀሰ ወይዘሮ ጋር የተደረገው ይህ ጋብቻ በአጭር ጊዜ ውስጥ የተጠናቀቀ ሲሆን ምንም አይነት ልጅ አላፈሩም። ታሪክን በታማኝነት ለመዘገብ ሲባል ያልተረጋገጡ ስሞችን ከመፍጠር ተቆጥበናል።`
    }
  },
  {
    id: "gaaelaafi-ijaarsa-maatii",
    order: 5,
    title: {
      om: "5. Gaa'elaafi Ijaarsa Maatii",
      en: "5. Second Marriage and Building Household",
      am: "5. ሁለተኛው ጋብቻ እና የቤተሰብ ግንባታ"
    },
    subtitle: {
      om: "Gaa’ela lammaffaa Addee Ayeetuu Gammadaa waliin",
      en: "Marriage with Addee Ayeetuu Gammadaa and Prosperity",
      am: "ከወይዘሮ አየቱ ገመዳ ጋር የተመሰረተ የተባረከ ትዳር"
    },
    content: {
      om: `Gaa’ela jalqabaa booda, Badhaadhaan Addee Ayeetuu Gammadaa waliin gaa’ela lammaffaa dhaabbate. Gaa’elli kun jireenya isaa keessatti sadarkaa guddaa ta’e. Isaan waliin maatii bal’aa ijaaranii ijoollee hedduu guddisan; akkasumas qabeenya horachuun jireenya maatii isaanii cimsan. Addee Ayeetuu Gammadaa haadha ijoollee isaanii keessaa baay’ee ta’uun, seenaa maatii keessatti gahee guddaa qabdi.

Gaa’elli jireenya keessatti wal kabajuu, waliif obsuu, waliin murteessuu fi itti gaafatamummaa qooddachuun ijaarama. Seenaa maatii irraa hubachuun danda’amu, Badhaadhaafi Ayeetuun ijoollee isaanii guddisuu, barnoota isaanii irratti xiyyeeffachuu fi jireenya maatii ijaaruu keessatti waliin hojjetaniiru. Ijoollee hedduu qabaachuun gammachuu qofa osoo hin taane hojii, baasii, kunuunsaafi murtii hedduu gaafata.

Maatiin isaanii guddachaa yeroo deemu, Badhaadhaan abbaa ijoollee ta’ee gahee isaa raawwachaa ture. Ijoollee isaa akka guddatan, baratan, jireenya isaanii ijaarratan barbaada ture. Gaa’ela lammaffaa kana irraa ijoollee dhiiraa shan fi shamarran sadii maqaan isaanii galmaa’e; ijoollee dabalataa lama immoo haadholii biroo waliin qabaachuun ibsameera. Walumaagalatti ijoollee kudhan qabaachuun isaa seenaa keessatti yaadatama.`,
      en: `Following his first youthful marriage, Badhaadhaa married Addee Ayeetuu Gammadaa. This union became the cornerstone of his life. Together, they built an expansive, prosperous, and respected household, working tirelessly to acquire property and raise numerous children. Addee Ayeetuu Gammadaa was the mother of the majority of his children and holds a revered position in the family lineage.

A successful household requires deep mutual respect, shared sacrifice, and perseverance. Badhaadhaa and Ayeetuu stood shoulder to shoulder, prioritizing the rigorous upbringing and formal schooling of their offspring.

From their union, five sons and three daughters were born and recorded. Along with two sons born with other respected mothers, Obbo Badhaadhaa fathered a total of ten children, forging an extensive family clan.`,
      am: `ከመጀመሪያው ጋብቻ በኋላ አቶ በዳዳ ከወይዘሮ አየቱ ገመዳ ጋር ሁለተኛ ጋብቻቸውን መሰረቱ። ይህ ጋብቻ በህይወታቸው ውስጥ ትልቅ ምዕራፍ ሆነ። ከእርሳቸው ጋር ሰፊ ቤተሰብ መስርተው በርካታ ልጆችን አሳደጉ፤ ሀብትና ንብረት በማፍራትም ቤተሰባቸውን አጠናከሩ። ወይዘሮ አየቱ ገመዳ የአብዛኞቹ ልጆቻቸው እናት በመሆን በቤተሰቡ ታሪክ ውስጥ ትልቅ ቦታ አላቸው።

አቶ በዳዳና ባለቤታቸው አየቱ ልጆቻቸውን በስነምግባር በማሳደግና በትምህርታቸው ላይ ከፍተኛ ትኩረት በመስጠት አብረው ደክመዋል። ከዚህ ጋብቻ አምስት ወንዶችና ሶስት ሴቶች ልጆች የተወለዱ ሲሆን፣ ከሌሎች እናቶች ጋር ከተወለዱት ሁለት ልጆች ጋር በአጠቃላይ የአስር ልጆች አባት በመሆን በታሪክ ይታወሳሉ።`
    }
  },
  {
    id: "ijoollee-isaanii",
    order: 6,
    title: {
      om: "6. Ijoollee Isaanii",
      en: "6. His Ten Children",
      am: "6. አስሩ ልጆቻቸው"
    },
    subtitle: {
      om: "Ilmaan 5, Shamarran 3 fi Ijoollee dabalataa 2",
      en: "Five Sons, Three Daughters, and Two Additional Sons",
      am: "አምስት ወንዶች፣ ሶስት ሴቶች እና ሁለት ተጨማሪ ልጆች"
    },
    content: {
      om: `Badhaadhaafi Ayeetuu Gammadaa ijoollee dhiiraa shan qabaachuu isaanii keessatti maqaan isaanii akka armaan gadiitti galmaa’eera:
1. Taaddasaa Badhaadha (Ilma angafaa, PhD xumuree bakka hojii olaanaa ga'e)
2. Tolasa Badhaadha
3. Warquu Badhaadha (Gadda guddaan bara 2014 boqote)
4. Dheeressaa Badhaadha
5. Damissee Badhaadha

Ijoollee shamarranii Badhaadhaafi Ayeetuu Gammadaa keessaa maqaan isaanii:
6. Sukkaare Badhaadha
7. Zabdituu Badhaadha
8. Maskaram Badhaadha

Kana malees, Badhaadhaan maatii dabalataa waliin ijoollee lama qabaate:
9. Geetachoo Badhaadha (Addee Sinqee Gorfu waliin)
10. Tafarii Badhaadha (Addee Giddittuu waliin)

Walumaagalatti ijoollee kudhan (10) qabaachuun isaa seenaa keessatti galmaa'eera. Badhaadhaan ofii isaa obbolaa waan hin qabneef (ilma tokkicha waan tureef), ijoollee isaa akka obbolootaatti, akka maatii tokkootti walitti dhiyeessee guddisuuf xiyyeeffannoo guddaa kenne. Ijoolleen isaa akka wal jaallatan, wal gargaaran, fi kabaja maatii eegan dhaamsa dhiise.`,
      en: `Obbo Badhaadhaa and Addee Ayeetuu Gammadaa were blessed with five sons and three daughters, documented as follows:

Sons:
1. Taaddasaa Badhaadha (Eldest son, earned his PhD and achieved distinguished professional leadership)
2. Tolasa Badhaadha
3. Warquu Badhaadha (Tragically martyred in 2014)
4. Dheeressaa Badhaadha
5. Damissee Badhaadha

Daughters:
6. Sukkaare Badhaadha
7. Zabdituu Badhaadha
8. Maskaram Badhaadha

Additional Sons:
9. Geetachoo Badhaadha (with Addee Sinqee Gorfu)
10. Tafarii Badhaadha (with Addee Giddittuu)

In total, Obbo Badhaadhaa fathered ten children. Because he himself was an only child without brothers or sisters, he poured immense heart into ensuring his ten children lived with profound fraternal unity, loyalty, and mutual affection.`,
      am: `አቶ በዳዳ እና ባለቤታቸው ወይዘሮ አየቱ ገመዳ ያፈሯቸው አምስት ወንዶች ልጆች፡
1. ታደሰ በዳዳ (የበኩር ልጅ፣ የዶክትሬት ዲግሪ (PhD) አጠናቆ በከፍተኛ የስራ ኃላፊነት ላይ የሚገኝ)
2. ቶለሳ በዳዳ
3. ወርቁ በዳዳ (በ2014 ዓ.ም በከፍተኛ ሀዘን የተሰዋ)
4. ዴሬሳ በዳዳ
5. ደሚሴ በዳዳ

ሴቶች ልጆቻቸው፡
6. ሱካሬ በዳዳ
7. ዘብዲቱ በዳዳ
8. መስከረም በዳዳ

እንዲሁም ከሌሎች እናቶች የተወለዱ ሁለት ልጆቻቸው፡
9. ጌታቸው በዳዳ (ከወይዘሮ ስንቄ ጎርፉ)
10. ተፈሪ በዳዳ (ከወይዘሮ ግዲቱ)

በአጠቃላይ የአስር (10) ልጆች አባት ነበሩ። እሳቸው ወንድምና እህት ያልነበራቸው ብቸኛ ልጅ በመሆናቸው ልጆቻቸው እንደ አንድ ልብ መካሪ ሆነው በፍቅርና በመተሳሰብ እንዲያድጉ ልዩ ትኩረት ሰጥተዋቸዋል።`
    }
  },
  {
    id: "jaalala-barnootaa",
    order: 7,
    title: {
      om: "7. Jaalala Barnootaa",
      en: "7. Passion for Education",
      am: "7. ለትምህርት ያላቸው ጽኑ ፍቅር"
    },
    subtitle: {
      om: "Dhaadannoo 'Ijoolleen kiyya baratanii wallaalummaa keessaa haa bahan'",
      en: "'May My Children Be Educated and Rise Out of Ignorance'",
      am: "'ልጆቼ ተምረው ካለመማር ድንቁርና ይውጡ' የሚል ጽኑ አቋም"
    },
    content: {
      om: `Wantoota Badhaadhaan jireenya maatii keessatti iddoo guddaa kenne keessaa tokko barnoota ijoollee isaati. 'Ijoolleen kiyya baratanii wallaalummaa keessaa haa bahan' jechuun dhaadannoo isaa fi Ayeetuu Gammadaa ture jedhamee yaadatama. Yaadni kun barnoota akka karaa jireenya fooyyessuu, beekumsa argachuu fi hiyyummaa hir’isuutti ilaaluu isaanii agarsiisa.

Yeroo maatiin hedduun carraa barnootaa argachuun rakkisaa ture, Badhaadhaan ijoollee isaa mana barumsaa erguuf tattaaffii guddaa godhe. Keessumaa bara 1995 fi sana booda, ijoollee maatii keessaa shan yookaan isaa ol yeroo wal fakkaataa keessatti baratan gargaaruuf baasii fi dadhabbii fudhachuu isaa ibsameera. Ijoollee isaa keessaa kanneen barnootaaf magaalaa dhaqanii jiraatanis akka barnoota isaanii itti fufan haala mijeesse.

Ijoollee Badhaadhaa keessaa ilma angafaa Taaddasaa Badhaadha seenaa barnootaa keessatti fakkeenya ta’ee ka’a. Badhaadhaan yeroo mootummaa Dargii keessa ilmi isaa Taaddasaan barachuu akka danda’uuf carraaqqii fi dhiibbaa gaarii godhe. Taaddasaan barnoota isaa itti fufee sadarkaa olaanaa ga’ee, PhD xumuree bakka hojii olaanaa irra ga’uu isaa seenaa keessatti ragaa ta’ee dhiyaateera. Kun abdiin abbaa isaa barnoota irratti qabu bu’aa qabatamaa argachuu isaa agarsiisa.`,
      en: `Among all pursuits, Obbo Badhaadhaa elevated the education of his children above all else. His defining lifelong motto, shared passionately with Ayeetuu Gammadaa, was: "May my children be educated and rise out of ignorance!" They viewed education as the ultimate path out of poverty and the gateway to societal uplift.

At a time when schooling was scarce and economically daunting, Obbo Badhaadhaa undertook monumental sacrifices. Beginning notably in 1995 and onward, he financed and supported five or more of his children in formal education simultaneously, funding tuition, books, boarding, and travel expenses for those studying in urban schools.

His eldest son, Taaddasaa Badhaadha, stands as a shining testament to this vision. Even during the stringent Derg regime, Badhaadhaa championed Taaddasaa's schooling with relentless resolve. Taaddasaa ascended to the highest academic pinnacle, achieving his Doctorate (PhD) and attaining prominent leadership roles, fulfilling his father's greatest aspiration.`,
      am: `አቶ በዳዳ በህይወታቸው ከፍተኛ ቦታ ከሰጧቸው ጉዳዮች አንዱ የልጆቻቸው ትምህርት ነው። 'ልጆቼ ተምረው ካለመማር ድንቁርና ይውጡ' የሚለው ቃል የእሳቸው እና የባለቤታቸው የወይዘሮ አየቱ የዘወትር መርህ ነበር። ትምህርትን የህይወት መሻሻያ፣ የእውቀት መገኛ እና የድህነት ማሸነፊያ አድርገው ተመልክተውታል።

ትምህርት ማግኘት በጣም አዳጋች በነበረበት በዚያ ዘመን፣ በተለይም ከ1995 ዓ.ም ጀምሮ በአንድ ጊዜ ከአምስት በላይ ልጆቻቸውን በአንድነት ለማስተማር የሚያስፈልገውን ከፍተኛ ወጪና ድካም ተቋቁመዋል። ወደ ከተማ ሄደው የሚማሩትን ልጆቻቸውን የቤት ኪራይ፣ የቀለብና የትምህርት መሳሪያዎች ወጪ በመሸፈን አስተምረዋል።

የበኩር ልጃቸው ዶ/ር ታደሰ በዳዳ ለዚህ ትልቅ አርአያ ነው። በደርግ ዘመን እንኳን ሳይቀር ልጃቸው እንዲማር ከፍተኛ ጥረት አድርገዋል። ዶ/ር ታደሰ የዶክትሬት ዲግሪውን (PhD) አጠናቆ በከፍተኛ የስራ ኃላፊነት ላይ መድረሱ የአባቱን ጽኑ የትምህርት ፍላጎት ፍሬ ያፈራ ህያው ምስክር ነው።`
    }
  },
  {
    id: "tajaajila-hawaasaa",
    order: 8,
    title: {
      om: "8. Tajaajila Hawaasaa",
      en: "8. Community Leadership and Peacemaking",
      am: "8. የማህበረሰብ አገልግሎት እና የሽምግልና ስራ"
    },
    subtitle: {
      om: "Abbaa Gandaa, Abbaa Hawaasaa, Araara, Nagaa fi Haqa",
      en: "Abbaa Gandaa, Peacemaker, and Champion of Truth",
      am: "የአካባቢ መሪ፣ የእርቅ አባት እና የእውነት ዳኛ"
    },
    content: {
      om: `Badhaadhaan abbaa maatii qofa osoo hin taane, abbaa hawaasaafi abbaa gandaas ta’ee beekamaa ture. Hawaasa naannoo keessatti nama kabajaafi jaalala qabu, dubbii mi’aawaa dubbatu, namoota gorsuufi araarsu ta’ee yaadatama. Nama waliin jiraachuun, rakkoo namoota dhaggeeffachuun, murtii keessatti dhugaa fi haqaa filachuun amala isaa keessaa turan.

Hawaasni nama nagaa jaallatu, namoota walitti araarsu, dubbii miidhaagaa dubbatu fi walitti bu’iinsa hir’isu kabaja. Badhaadhaan yeroo dubbatu dubbii isaa namatti tolu, yeroo murteessu dhugaa fi haqa filata jedhamee ibsameera. Amaloonni akkanaa hawaasa keessatti amanamummaa uumu. Namoonni rakkoo isaanii itti himachuu, gorsa gaafachuu fi araara barbaaduuf gara isaanii dhaqu turan.

Nagaa jaallachuun dadhabina miti; rakkoo keessatti obsa qabaachuu, dubbii madaalawaa dubbachuu fi furmaata miidhaa hin qabne barbaaduu dha. Badhaadhaan amala kanaan hawaasa keessatti beekamaa ture. Dhaloonni itti aanu namoota gidduutti nagaa uumuun, wal kabajuun fi dhugaa irratti dhaabbachuun jireenya hawaasaa fooyyessuu akka danda’u seenaa isaa irraa barachuu danda’a.`,
      en: `Beyond his household, Obbo Badhaadhaa was revered as an Abbaa Gandaa (respected village elder and civic leader). Within his district, he was cherished for sweet, considerate speech, wise council, and impartial reconciliation of disputes.

He possessed an instinctive mastery of traditional dispute resolution. Whenever conflicts erupted between neighbors, kin, or communities, people sought Obbo Badhaadhaa's counsel because his judgments never compromised on truth or favored the mighty over the humble.

He proved that peace is not weakness, but the highest demonstration of moral patience, measured wisdom, and harmless solutions. His name remains a synonym for justice, peacemaking, and selfless community guardianship throughout Meta Walkite.`,
      am: `አቶ በዳዳ የቤተሰብ አባት ብቻ ሳይሆኑ የአካባቢ መሪ (አባ ጋንዳ) እና የማህበረሰብ አባት በመሆን ይታወቁ ነበር። በህብረተሰቡ ዘንድ ተወዳጅ፣ ጣፋጭ ንግግር የሚናገሩ፣ ሰዎችን የሚመክሩ እና የሚያስታርቁ ታላቅ አባት ነበሩ። የሰዎችን ችግር በትዕግስት በማዳመጥና በውሳኔያቸው እውነትንና ፍትህን በማስቀደም ይታወቃሉ።

አቶ በዳዳ ሲናገሩ ንግግራቸው ልብን የሚያረጋጋ፣ ሲፈርዱም ለእውነትና ለፍትህ የቆሙ እንደነበሩ ተመስክሮላቸዋል። ሰዎች ችግራቸውን ለመንገር፣ ምክር ለመጠየቅና እርቅን ለመሻት ወደ እሳቸው ይመጡ ነበር።

ሰላምን መውደድ ድክመት ሳይሆን በፈተና ወቅት በትዕግስት መቆም፣ ሚዛናዊ ንግግር መናገርና ሰላማዊ መፍትሄን መፈለግ መሆኑን በህይወታቸው አሳይተዋል።`
    }
  },
  {
    id: "amala-gaarii-fi-gorsa",
    order: 9,
    title: {
      om: "9. Amala Gaarii fi Gorsa",
      en: "9. Virtues, Character, and Wisdom",
      am: "9. መልካም ስነምግባር እና ምክር"
    },
    subtitle: {
      om: "Obsa, dubbii mi’aawaa, tokkummaa maatii fi haqa",
      en: "Patience, Sweet Speech, Family Unity, and Righteousness",
      am: "ትዕግስት፣ ጣፋጭ አንደበት፣ የቤተሰብ አንድነት እና እውነት"
    },
    content: {
      om: `Amalli Obbo Badhaadhaa inni beekamaan: obsa guddaa, dubbii mi’aawaa dubbachuu, dhugaa jaallachuu fi nama hunda kabajuudha. Wanta tokko yeroo murteessan aariin osoo hin taane, tasgabbiin qorachuun dhugaa fi haqa irratti hundaa’u.

Gorsi isaanii inni beekamaan:
1. 'Ijoolleen kiyya baratanii wallaalummaa keessaa haa bahan.'
2. 'Maatiin wal jaallachuu, waliif obsuu, fi akka obbolootaatti wal gargaaruu qaba.'
3. 'Nama hin miidhin, dhugaa qabadhu, fi nagaa jaalladhu.'

Badhaadhaan ofii isaa obbolaa waan hin qabneef, ijoolleen isaa tokkummaadhaan akka jiraatan yeroo mara gorsa kennaa ture. Maqaan gaariin qabeenyaan hin bitamu; gocha, amanamummaa fi haqa irraa madda. Dhaalli inni dhalootaaf dhiise maqaa gaarii fi gorsa qajeelaadha.`,
      en: `The signature virtues of Obbo Badhaadhaa were monumental patience, soothing articulation, an unbending love of truth, and universal respect toward every human being. He never rendered decisions in anger; instead, he examined every matter with calm equanimity rooted in righteousness.

His core pillars of wisdom:
1. "May my children be educated and rise out of ignorance."
2. "A family must walk in genuine love, mutual patience, and brotherly support."
3. "Harm no soul, hold steadfast to truth, and walk in peace."

Because he grew up without biological siblings, he ceaselessly instructed his children to treasure unity. He taught that an honorable name cannot be purchased with silver or gold; it is forged through righteous deeds, faithfulness, and equity.`,
      am: `የአቶ በዳዳ ዋነኛ ባህሪያት፡- ታላቅ ትዕግስት፣ ጣፋጭ ንግግር፣ እውነትን መውደድ እና ሰውን ሁሉ ማክበር ናቸው። ነገሮችን በቁጣ ሳይሆን በሰከነ መንፈስና በእውነት ላይ ተመስርተው ይመረምሩ ነበር።

ዘወትር የሚሰጡት ዋና ዋና ምክሮች፡-
1. 'ልጆቼ ተምረው ካለመማር ድንቁርና ይውጡ።'
2. 'ቤተሰብ በፍቅር፣ በትዕግስት እና እንደ ወንድማማች በመደጋገፍ መኖር አለበት።'
3. 'ሰውን አትበድል፣ እውነትን ያዝ፣ እና ሰላምን ውደድ።'

እሳቸው ወንድምና እህት ስላልነበራቸው ልጆቻቸው በአንድነት እንዲኖሩ ሁልጊዜ ይመክሩ ነበር። መልካም ስም በገንዘብ እንደማይገዛና በቅን ተግባር ብቻ እንደሚገነባ በህይወታቸው አሳይተዋል።`
    }
  },
  {
    id: "rakkoolee-jireenyaa",
    order: 10,
    title: {
      om: "10. Rakkoolee Jireenyaa fi Miidhaa",
      en: "10. Life Hardships, Persecution, and Loss",
      am: "10. የህይወት ፈተናዎች፣ እስራትና ጥልቅ ሀዘን"
    },
    subtitle: {
      om: "Bara 2011 qabamuu, reebicha hamaa, fi gadda ilma isaanii Warquu (2014)",
      en: "The 2011 Arrest, Brutal Beating, and Martyrdom of Son Warquu (2014)",
      am: "የ2011 ዓ.ም እስራት፣ ከባድ ድብደባ እና የልጃቸው የወርቁ መስዋዕትነት (2014)"
    },
    content: {
      om: `Jireenyi Badhaadhaa yeroo tokko gammachuu fi ijaarsa maatii qofa hin turre. Maatii isaa keessaa namoonni tokko tokko mootummaa waliin, kaan immoo Waraana Bilisummaa Oromoo (WBO) waliin walitti dhufeenya hojii qabaachuu jalqaban jedhamee seenaa keessatti ibsameera. Haalli kun abbaa maatii tokkoof dhiphina guddaa fide.

Seenaa maatii keessatti, bara 2011 keessa ilmi isaa waraana bilisummaa Oromoo keessa jira jechuun humni mootummaa isa qabee, magaalaa Minaaree irraa hanga bakka Xaaxxeessa jedhamuutti geessuun reebicha hamaa irraan ga’an. Guyyaa lama hidha keessa erga bulanii booda kan gad lakkifaman yoo ta'u, reebichi fi miidhaan qaamaa sun fayyaa isaanii irratti dhiibbaa hamaa geessisee dhibee cimaa keessa isaan galche.

Gaddi guddaan biraa ilma isaanii Warquu Badhaadha irratti ga’e. Bara 2012 keessa Warquun mana abbaa isaa keessatti cidha isaa raawwachuuf murteesse. Guyyaa cidha sanaa galgala (24/04/2013), humni mootummaa halkan mana seenuun namoota afur qabee deeme: Obbo Badhaadha Raggaasaa, Obbo Warquu Badhaadha, Obbo Dirriba Gaddisaa fi Obbo Damee Dinkaa. Booda guyyaa 07/07/2014 halkan keessaa sa’aatii afuritti (4:00) Warquu Badhaadha mana keessaa baafamee bakka Dha’e jedhamuutti ajjeefame. Dhimmi kun Badhaadhaaf gadda guddaa ta’ee dhibeen isaa akka hammaatu taasise.`,
      en: `Obbo Badhaadhaa's life journey was also marked by deep political adversity and heartbreaking suffering. As political crosswinds intensified, members of his household found themselves caught between government service and the Oromo Liberation Army (WBO), placing enormous anguish upon the patriarch.

In the year 2011, government forces arrested Obbo Badhaadhaa under allegations that his son was in the WBO. He was forcibly taken from Minaaree town to an area called Xaaxxeessa and subjected to severe physical beatings. Though released after two days of detention, the traumatic bodily harm inflicted upon him triggered severe chronic health decline.

Even more heartbreaking was the tragedy of his beloved son Warquu Badhaadha. In 2012, Warquu arranged to celebrate his wedding at his father's house so that rural and urban siblings could celebrate together. On the evening of the wedding festivities (24/04/2013), armed government forces raided the home and detained four individuals: Obbo Badhaadhaa Raggaasaa, Obbo Warquu Badhaadha, Obbo Dirriba Gaddisaa, and Obbo Damee Dinkaa. Subsequently, on 07/07/2014 at 4:00 in the night, Warquu Badhaadha was taken to a place named Dha'e and executed. The unbearable grief of losing his son shattered Badhaadhaa's heart and aggravated his declining health.`,
      am: `የአቶ በዳዳ ህይወት የደስታና የቤተሰብ እድገት ብቻ አልነበረም። በወቅቱ በነበረው የፖለቲካ ሁኔታ የተነሳ ከቤተሰባቸው አባላት መካከል አንዳንዶቹ ከመንግስት ጋር ሌሎች ደግሞ ከኦሮሞ ነጻነት ሰራዊት (WBO) ጋር ግንኙነት ነበራቸው። ይህም ለቤተሰብ አባት ታላቅ ጭንቀት ሆነባቸው።

በ2011 ዓ.ም ልጃቸው በኦሮሞ ነጻነት ሰራዊት ውስጥ አለ በሚል የመንግስት የጸጥታ ሀይሎች አቶ በዳዳን ከሚናሬ ከተማ ይዘው ወደ ጧጤሳ (Xaaxxeessa) በመውሰድ እጅግ አሰቃቂ ድብደባ ፈጸሙባቸው። ለሁለት ቀናት በእስር ላይ ከቆዩ በኋላ የተለቀቁ ቢሆንም፣ የደረሰባቸው ከባድ የአካል ጉዳት ለቀጣይ የጤና መታወክ ዳረጋቸው።

ሌላው እጅግ ልብ ሰባሪ ሀዘን በልጃቸው በወርቁ በዳዳ ላይ የደረሰው ነው። በ2012 ዓ.ም ወርቁ ሰርጉን በአባቱ ቤት ለማክበር ወሰነ። በሰርጉ ምሽት (24/04/2013) የመንግስት ሀይሎች ቤቱን ከበው አራት ሰዎችን ይዘው ሄዱ፡- አቶ በዳዳ ረጋሳ፣ አቶ ወርቁ በዳዳ፣ አቶ ድሪባ ገዲሳ እና አቶ ዳሜ ዲንቃ። በመቀጠል በ 07/07/2014 ዓ.ም ከሌሊቱ አራት ሰዓት ላይ ወርቁ በዳዳን ከቤት አውጥተው 'ዳኤ' (Dha'e) ወደተባለ ቦታ በመውሰድ ህይወቱን አጠፉት። የልጃቸው መገደል ለአቶ በዳዳ የማይረሳ መሪር ሀዘን ሆኖ ጤናቸውን ይበልጥ አዳከመው።`
    }
  },
  {
    id: "dhukkubaafi-boqonnaa",
    order: 11,
    title: {
      om: "11. Dhukkubaafi Boqonnaa",
      en: "11. Illness and Peaceful Rest",
      am: "11. ህመም እና የህይወት ፍጻሜ"
    },
    subtitle: {
      om: "Yaala Keetummaa, Eebba Labuu (2017) fi Guyyaa Boqonnaa (07/04/2018)",
      en: "Medical Treatment in Hoolataa, Son's Blessing (2017), and Passing on 07/04/2018",
      am: "የሆለታ ህክምና፣ የልጃቸው የቤት ምርቃት (2017) እና እረፍት (07/04/2018)"
    },
    content: {
      om: `Miidhaa reebichaa booda fayyaan Badhaadhaa hammaataa deemuun, ilmi isaa Taaddasaa Badhaadha gara magaalaa Hoolataatti geessuun hospitaala Keetummaa jedhamutti yaala akka argatu murteesse. Achitti yaala irra deddeebii fi opereeshinii argatanis, dhibeen isaanii guutumaan guutuutti hin fooyyofne.

Badhaadhaan yeroo tokko tokko 'qe’ee kiyyaattin galaa' jechuun hawwa ture. Cidha intala Warquu irratti hirmaachuuf magaalaa Walqixxee fi Minaareetti deebi'anii turan (12/09/2016). Akkasumas guyyaa 25/11/2017, ilmi isaanii Taaddasaa Badhaadha mana fooqii ijaaree eebbaaf yeroo ga’u, Badhaadhaan 'eebba ilma kiyyaa hin hafu' jechuun gara magaalaa Labuutti imalanii eebba sana irratti hirmaachuun gammachuu guddaa argatan.

Eebba ilma isaanii booda dhibeen itti hammaachaa dhufe. Yaaliin kennamus fayyisuu hin dandeenye. Dhumarratti, guyyaa 07/04/2018, Kibxata, sa'aatii keessaa torba (7:00) irratti du'aan addunyaa kana irraa boqotan. (Galmee maatii keessatti 16/12/2025 [7/04/2018] jedhamee galmaa'eera). Boqonnaan isaanii maatii fi hawaasa mara biratti gadda guddaa uume.`,
      en: `Following the severe physical trauma from his beating, Badhaadhaa's health deteriorated. His eldest son, Dr. Taaddasaa Badhaadha, arranged for him to be moved to Hoolataa town, where he was admitted to Keetummaa Hospital. Despite surgeries and devoted care from his children, his health never fully recovered.

Through it all, his heart longed for his ancestral home. He returned to Minaaree on 12/09/2016 to attend the wedding of his late son Warquu's daughter. Later, on 25/11/2017, when Dr. Taaddasaa completed the construction of his multi-story residence, Obbo Badhaadhaa declared, "I will not miss the blessing of my son's house!" and traveled to Labuu to bestow his paternal blessing.

Following that proud celebration, his illness intensified. Despite every effort by physicians and family, he rested peacefully on 07/04/2018, on a Tuesday at 7:00 (also noted as 16/12/2025 [7/04/2018] in the family calendar). His passing cast deep mourning across his extended family, kin, and communities.`,
      am: `ከደረሰባቸው ድብደባ በኋላ ጤናቸው እየተዳከመ በመምጣቱ የበኩር ልጃቸው ታደሰ በዳዳ ወደ ሆለታ ከተማ ወስዶ ኬቱማ በተባለው ሆስፒታል ውስጥ ህክምና እንዲያገኙ አደረገ። የቀዶ ጥገና እና ተደጋጋሚ ህክምናዎች ቢደረጉላቸውም ጤናቸው ሙሉ በሙሉ ሊመለስ አልቻለም።

ሁልጊዜም ወደ መንደራቸውና ወደ ቤታቸው መመለስ ይመኙ ነበር። በ 12/09/2016 ዓ.ም የልጃቸውን የወርቁን ልጅ ሰርግ ለመታደም ወደ ሚናሬ ተጉዘው ተሳትፈዋል። እንዲሁም በ 25/11/2017 ዓ.ም ልጃቸው ዶ/ር ታደሰ በዳዳ የሰራውን ፎቅ ቤት ሲመርቅ 'የልጄን ቤት ምርቃት አልቀርም' በማለት ወደ ላቡ ከተማ በመጓዝ በአባትነት መርቀዋል።

ከምርቃቱ በኋላ ህመማቸው እየበረታ ሄደ። በስተመጨረሻም በ 07/04/2018 ዓ.ም በማክሰኞ ቀን ከቀኑ 7፡00 ሰዓት ላይ ከዚህ አለም በሞት ተለዩ (በቤተሰብ መዝገብ 16/12/2025 [7/04/2018] ተብሎ ተጽፏል)። እረፍታቸው በመላው ቤተሰብና ማህበረሰብ ዘንድ ታላቅ ሀዘንን ፈጠረ።`
    }
  },
  {
    id: "dhaala-jireenyaa",
    order: 12,
    title: {
      om: "12. Dhaala Jireenyaa",
      en: "12. Enduring Generational Legacy",
      am: "12. የተዉት ዘላለማዊ ቅርስ"
    },
    subtitle: {
      om: "Ijoollee 10, dhaloota itti aanu, gorsa barnootaa fi maqaa gaarii",
      en: "Ten Children, Generational Impact, Education, and an Honorable Name",
      am: "አስር ልጆች፣ የተማረ ትውልድ እና መልካም ስም"
    },
    content: {
      om: `Dhaalli Badhaadhaan maatii isaaf dhiise qabeenya qofa miti. Ijoollee kudhan (10), dhaloota itti aanu, gorsa barnootaa, wal kabajuu, tokkummaa fi hojii irratti hirmaachuu dhaala isaa keessaa muraasa. Ijoolleen isaa baratanii jireenya isaanii ijaaruu akka danda’an hawwuun isaa, dhaamsa maatii keessatti yeroo dheeraa turu dha.

Abbaan ijoollee isaa qabeenya dhiisuu danda’a; garuu beekumsa, naamusa, amanamummaa fi jaalala maatii barsiisuun dhaala caalaa turu dha. Badhaadhaan ijoollee isaa akka obbolootaatti wal ilaalan, wal gargaaran fi maatii hin daganne taasisuuf yaalii godhe.

Hawaasa keessattis nama kabaja qabu, nama nagaa jaallatu, nama araarsuufi gorsu ta’ee yaadatama. Maqaan gaariin qabeenyaan hin bitamu; gocha, amanamummaa fi haqa irraa madda. Badhaadhaan hawaasa keessatti jaalala horachuun, maqaa gaarii kana akka dhaalaatti dhiiseera.`,
      en: `The monument of Obbo Badhaadhaa is not measured in material possessions alone. His ten children, educated descendants, relentless push for literacy, brotherly solidarity, and peerless integrity constitute his true inheritance.

A parent may leave temporal wealth behind, but instilling knowledge, moral fiber, faithfulness, and family loyalty is an eternal inheritance. He molded his children to protect one another like limbs of a single body and never to forsake their family roots.

Within society, he left behind the legacy of a revered peacemaker who cherished equity. An honorable name cannot be bought; it is cultivated through decades of righteous conduct. Obbo Badhaadhaa lives on through this untarnished name.`,
      am: `አቶ በዳዳ ለቤተሰባቸው የተዉት ቅርስ ቁሳዊ ሀብት ብቻ አይደለም። አስሩ ልጆቻቸው፣ የተማረ ቀጣይ ትውልድ፣ የትምህርት ምክራቸው፣ የቤተሰብ አንድነት እና መልካም ስማቸው ዋነኛ ቅርሳቸው ነው።

አንድ አባት ለልጆቹ ገንዘብን ሊተው ይችላል፤ እውቀትን፣ ስነምግባርን፣ ታማኝነትን እና ፍቅርን ማውረስ ግን ከምንም በላይ ዘላቂ ቅርስ ነው። ልጆቻቸው እንደ አንድ ልብ ሆነው እንዲዋደዱና ቤተሰባቸውን እንዳይረሱ አድርገው አንጸዋቸዋል።

በማህበረሰቡም ዘንድ ሰላም አውራጅ፣ አስታራቂ እና መካሪ ሆነው ይታወሳሉ። መልካም ስም በገንዘብ አይገዛም፤ ከቅንነት እና ከእውነተኛነት የሚመነጭ ነው። አቶ በዳዳ ይህንን መልካም ስም ለትውልድ አውርሰው አልፈዋል።`
    }
  },
  {
    id: "yaadannoo-maatii",
    order: 13,
    title: {
      om: "13. Yaadannoo Maatii",
      en: "13. Family Remembrance and Benediction",
      am: "13. የቤተሰብ መታሰቢያ እና ጸሎት"
    },
    subtitle: {
      om: "Dhaamsa ijoollee, firoota, fi kadhannaa nagaa",
      en: "Tribute of Children, Kin, and Eternal Benediction",
      am: "የልጆችና የዘመዶች መታሰቢያ እና የክብር ቃል"
    },
    content: {
      om: `Obbo Badhaadha Raggaasaa Wayyeessaa seenaa jireenyaa isaanii keessatti ilma tokkicha maatii isaa tajaajilu irraa gara abbaa maatii ijoollee kudhanitti guddate. Godina Shawaa Lixaa, Aanaa Meettaa Walqixxee, Ganda Meexii Haroo, Gooxii Daadaa keessatti dhalatanii, maatii isaanii irraa naamusa fi itti gaafatamummaa baratan.

Jireenyi isaanii rakkoolee ulfaatoo, miidhaa, gadda ilma isaanii dhabuu fi dhukkuba keessa darbe. Haa ta’u malee, seenaa isaanii keessatti hojii maatii, jaalala barnootaa, tokkummaa, nagaa fi araaraaf qaban yaadannoo ta’ee hafeera.

Ijoolleen, firoonni, fi hiriyoonni isaanii yeroo mara jaalalaan isaan yaadatu.
'Abbaa keenya kabajamaa, maqaan kee seenaa maatii kee keessatti haa jiraatu. Hojii gaariin kee dhalootaaf fakkeenya haa ta'u. Nageenyaan boqodhu!'`,
      en: `From his humble beginnings as an only child in Daadaa, Meti Haro, Meta Walkite District of West Shewa, Obbo Badhaadhaa Raggaasaa Wayyeessaa rose to become the beloved patriarch of ten children and a respected champion of peace.

Though his journey witnessed trials, brutal persecution, the sorrow of losing his son Warquu, and lingering illness, his unshakeable love for family, education, peace, and truth endures as an unquenchable beacon.

His children, kin, grandchildren, and friends hold his memory in perpetual love.
"Our beloved father, may your noble name dwell forever in our family annals. May your deeds inspire generations. Rest in everlasting and peaceful slumber!"`,
      am: `አቶ በዳዳ ረጋሳ ወዬሳ በምዕራብ ሸዋ ዞን፣ ሜጣ ወልቂጤ ወረዳ፣ ሜጪ ሀሮ ቀበሌ፣ ዳዳ መንደር ውስጥ ለወላጆቻቸው ብቸኛ ልጅ ሆነው ተወልደው የአስር ልጆች አባትና የተከበሩ የማህበረሰብ ሽማግሌ ሆነው አልፈዋል።

ህይወታቸው ፈተናዎችን፣ መከራን፣ የልጃቸውን የወርቁን ሞት እና ህመምን ቢያስተናግድም፣ ለቤተሰብ፣ ለትምህርት፣ ለአንድነት እና ለሰላም የነበራቸው ፍቅር ህያው ሆኖ ይኖራል።

ልጆቻቸው፣ ዘመዶቻቸው፣ የልጅ ልጆቻቸው እና ወዳጆቻቸው ሁልጊዜም በፍቅር ያስታውሷቸዋል።
'ውድ አባታችን ሆይ፤ ስምህ በቤተሰብህ ታሪክ ውስጥ ለዘላለም ህያው ሆኖ ይኖራል። መልካም ስራህ ለትውልድ ሁሉ አርአያ ይሁን። በሰላም እረፍ!'`
    },
    quote: {
      om: "Abbaa keenya jaallatamaa, hojiin kee gaariin yoomiyyuu hin dagatamu! Nageenyaan boqodhaa.",
      en: "Our beloved father, your good deeds will never be forgotten! Rest in perfect peace.",
      am: "የተወደድክ አባታችን ሆይ፤ መልካም ስራህ ለዘላለም አይረሳም! በሰላም እረፍ።"
    }
  }
];

export const initialFamilyMembers: FamilyMember[] = [
  // Generation 1: Parents & Spouses
  {
    id: "f-1",
    fullName: "Obbo Badhaadhaa Raggaasaa Wayyeessaa",
    relationship: "Abbaa Maatii (Patriarch)",
    generation: 1,
    birthYear: "1943 - 07/04/2018",
    notes: "Dhaloota: Meexii Haroo (Gooxii Daadaa), Shawaa Lixaa. Abbaa ijoollee 10, jaarsa biyyaa fi nagaa jaallatu."
  },
  {
    id: "f-2",
    fullName: "Addee Ayeetuu Gammadaa",
    relationship: "Haadha Manootaa (Matriarch - Mother of 8)",
    generation: 1,
    notes: "Haadha ijoollee dhiiraa 5 fi shamarran 3. Gaaddisa jabaa fi jaallee jireenya Obbo Badhaadhaa."
  },
  {
    id: "f-3",
    fullName: "Obbo Raggaasaa Wayyeessaa",
    relationship: "Abbaa Obbo Badhaadhaa (Grandfather)",
    generation: 1,
    notes: "Abbaa Obbo Badhaadhaa, nama kabajamaa Meexii Haroo."
  },
  {
    id: "f-4",
    fullName: "Addee Fittaalee Sanbuuyyee",
    relationship: "Haadha Obbo Badhaadhaa (Grandmother)",
    generation: 1,
    notes: "Haadha Obbo Badhaadhaa, ilma tokkicha jaalalaan guddifte."
  },
  {
    id: "f-5",
    fullName: "Addee Sinqee Gorfu",
    relationship: "Haadha Geetachoo",
    generation: 1,
    notes: "Haadha Geetachoo Badhaadhaa."
  },
  {
    id: "f-6",
    fullName: "Addee Giddittuu",
    relationship: "Haadha Tafarii",
    generation: 1,
    notes: "Haadha Tafarii Badhaadhaa."
  },

  // Generation 2: The 10 Children
  {
    id: "f-c1",
    fullName: "Dr. Taaddasaa Badhaadha (PhD)",
    relationship: "Ilma Angafaa (Eldest Son)",
    generation: 2,
    notes: "Ilma angafaa, barnoota olaanaa PhD xumuree bakka hojii olaanaatti maatii fi biyya kan tajaajile."
  },
  {
    id: "f-c2",
    fullName: "Tolasa Badhaadha",
    relationship: "Ilma (Son)",
    generation: 2,
    notes: "Ilma Obbo Badhaadhaa fi Addee Ayeetuu Gammadaa."
  },
  {
    id: "f-c3",
    fullName: "Warquu Badhaadha",
    relationship: "Ilma (Son - In Loving Memory)",
    generation: 2,
    birthYear: "Boqote: 07/07/2014",
    notes: "Ilma jaallatamaa Obbo Badhaadhaa; bara 2014 gadda guddaan kan addunyaa kana irraa boqote."
  },
  {
    id: "f-c4",
    fullName: "Dheeressaa Badhaadha",
    relationship: "Ilma (Son)",
    generation: 2,
    notes: "Ilma Obbo Badhaadhaa fi Addee Ayeetuu Gammadaa."
  },
  {
    id: "f-c5",
    fullName: "Damissee Badhaadha",
    relationship: "Ilma (Son)",
    generation: 2,
    notes: "Ilma Obbo Badhaadhaa fi Addee Ayeetuu Gammadaa."
  },
  {
    id: "f-c6",
    fullName: "Sukkaare Badhaadha",
    relationship: "Intala (Daughter)",
    generation: 2,
    notes: "Intala Obbo Badhaadhaa fi Addee Ayeetuu Gammadaa."
  },
  {
    id: "f-c7",
    fullName: "Zabdituu Badhaadha",
    relationship: "Intala (Daughter)",
    generation: 2,
    notes: "Intala Obbo Badhaadhaa fi Addee Ayeetuu Gammadaa."
  },
  {
    id: "f-c8",
    fullName: "Maskaram Badhaadha",
    relationship: "Intala (Daughter)",
    generation: 2,
    notes: "Intala Obbo Badhaadhaa fi Addee Ayeetuu Gammadaa."
  },
  {
    id: "f-c9",
    fullName: "Geetachoo Badhaadha",
    relationship: "Ilma (Son)",
    generation: 2,
    notes: "Ilma Obbo Badhaadhaa fi Addee Sinqee Gorfu."
  },
  {
    id: "f-c10",
    fullName: "Tafarii Badhaadha",
    relationship: "Ilma (Son)",
    generation: 2,
    notes: "Ilma Obbo Badhaadhaa fi Addee Giddittuu."
  },

  // Generation 3: Grandchildren
  {
    id: "f-g1",
    fullName: "Intala Warquu Badhaadha",
    relationship: "Akaakayyuu (Granddaughter)",
    generation: 3,
    notes: "Intala Warquu, cidha ishee irratti Obbo Badhaadhaan bara 2016 Minaareetti hirmaataniiru."
  },
  {
    id: "f-g2",
    fullName: "Akaakayyuulee Obbo Badhaadhaa",
    relationship: "Akaakayyuulee (Grandchildren)",
    generation: 3,
    notes: "Dhaloota haaraa dhaala abbaa isaanii kabajaan eeggatan."
  }
];

export const initialTributes: TributeItem[] = [
  {
    id: "t-1",
    authorName: "Dr. Taaddasaa Badhaadha fi Obboloota",
    relationship: "Ijoollee Isaanii (Children)",
    location: "Finfinnee / Meettaa Walqixxee",
    message: "Abbaa keenya kabajamaa, aarsaan ati nu barsiisuuf baastee fi gorsi kee yoomiyyuu onnee keenya keessaa hin badu. Dhaadannoo kee 'Ijoolleen kiyya baratanii wallaalummaa keessaa haa bahan' jette sun nuuf ibsaa ta'eera. Nageenyaan boqodhu!",
    date: "2018-04-10",
    verified: true,
    approved: true
  },
  {
    id: "t-2",
    authorName: "Jaarsolii Biyyaa fi Hawaasa Meettaa Walqixxee",
    relationship: "Hawaasa Naannoo & Jaarsolii",
    location: "Meexii Haroo / Minaaree",
    message: "Obbo Badhaadha Raggaasaa abbaa nagaa, nama dhugaa fi jaarsa araaraa turan. Boqonnaan isaanii hawaasa keenyaaf gadda guddaa ture, garuu maqaan isaanii bara baraan yaadatama.",
    date: "2018-04-12",
    verified: true,
    approved: true
  },
  {
    id: "t-3",
    authorName: "Akaakayyuulee Obbo Badhaadhaa",
    relationship: "Akaakayyuu (Grandchildren)",
    location: "Biyya Keessa fi Alaa",
    message: "Akkoon keenya jaallatamaan nuuf fakkeenya gaarii turan. Seenaan isaanii nu boonsa, waadaa dhaala isaanii eeguu ni haaromsina!",
    date: "2020-07-04",
    verified: true,
    approved: true
  }
];

export const initialPhotos: PhotoItem[] = [
  {
    id: "p-portrait",
    url: "/hero-portrait.jpg",
    caption: {
      om: "Suuraa Dhugaa Obbo Badhaadhaa Raggaasaa Wayyeessaa (1943 — 2018)",
      en: "Authentic Portrait Photograph of Obbo Badhaadhaa Raggaasaa Wayyeessaa (1943 — 2018)",
      am: "የአቶ በዳዳ ረጋሳ ወዬሳ ትክክለኛ የቁም ፎቶ (1943 — 2018)"
    },
    date: "1943 — 2018",
    category: "jireenya",
    featured: true,
    uploadedAt: new Date().toISOString()
  },
  {
    id: "p-1",
    url: "/logo-tree.svg",
    caption: {
      om: "Mallattoo Seenaa fi Yaadannoo Obbo Badhaadhaa Raggaasaa Wayyeessaa (BRW)",
      en: "Emblem of Honor and Remembrance for Obbo Badhaadhaa Raggaasaa Wayyeessaa",
      am: "የአቶ በዳዳ ረጋሳ ወዬሳ መታሰቢያ አርማ እና ምልክት"
    },
    date: "1943 — 2018",
    category: "yaadannoo",
    featured: true,
    uploadedAt: new Date().toISOString()
  }
];
