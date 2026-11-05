import { Language } from '../types';

export interface TranslationStrings {
  siteTitle: string;
  siteSubtitle: string;
  navHome: string;
  navBiography: string;
  navGallery: string;
  navTributes: string;
  navFamily: string;
  navAdmin: string;
  heroBirthYear: string;
  heroDeathDate: string;
  heroBtnBiography: string;
  heroBtnGallery: string;
  heroUploadPortraitPrompt: string;
  heroVerifyDatesBadge: string;
  candleAction: string;
  candlesLit: string;
  candleBlessing: string;
  candleLitSuccess: string;
  candleThankYou: string;
  bioHeading: string;
  bioSubheading: string;
  bioSearchPlaceholder: string;
  bioExpandAll: string;
  bioCollapseAll: string;
  bioJumpTo: string;
  bioReadMode: string;
  galleryHeading: string;
  gallerySubheading: string;
  galleryCategoryAll: string;
  galleryCategoryFamily: string;
  galleryCategoryLife: string;
  galleryCategoryCommunity: string;
  galleryCategoryMemorial: string;
  galleryAddPhoto: string;
  galleryEmpty: string;
  galleryClickToEnlarge: string;
  tributesHeading: string;
  tributesSubheading: string;
  tributesLeaveMessage: string;
  tributesFormName: string;
  tributesFormRelation: string;
  tributesFormLocation: string;
  tributesFormMessage: string;
  tributesFormSubmit: string;
  tributesFormSuccess: string;
  tributesFormError: string;
  familyHeading: string;
  familySubheading: string;
  familyTreeTitle: string;
  familyGeneration1: string;
  familyGeneration2: string;
  familyGeneration3: string;
  adminTitle: string;
  adminLoginTitle: string;
  adminPasswordLabel: string;
  adminLoginBtn: string;
  adminLogoutBtn: string;
  adminTabOverview: string;
  adminTabHeroPortrait: string;
  adminTabLogo: string;
  adminTabBiography: string;
  adminTabGallery: string;
  adminTabFamily: string;
  adminTabTributes: string;
  adminTabFirebase: string;
  saveChanges: string;
  cancel: string;
  savedSuccess: string;
  errorSaving: string;
  footerRights: string;
  footerInMemoriam: string;
  changeLanguage: string;
}

export const translations: Record<Language, TranslationStrings> = {
  om: {
    siteTitle: "BADHAADHAA RAGGAASAA WAYYEESSAA",
    siteSubtitle: "Weebsaayitii Seenaa fi Yaadannoo Jireenyaa",
    navHome: "Fuula Dura",
    navBiography: "Seenaa Isaa",
    navGallery: "Suuraalee",
    navTributes: "Yaadannoo fi Dhaamsa",
    navFamily: "Maatii",
    navAdmin: "Bulchiinsa",
    heroBirthYear: "Bara Dhalootaa: 1943",
    heroDeathDate: "Guyyaa Boqonnaa: 07/04/2018",
    heroBtnBiography: "Seenaa Isaa Dubbisi",
    heroBtnGallery: "Suuraalee Ilaali",
    heroUploadPortraitPrompt: "Suuraa dhugaa Obbo Badhaadhaa olkaa'aa",
    heroVerifyDatesBadge: "Bara dhaloota fi guyyaa boqonnaa calandaraan mirkaneessaa",
    candleAction: "Shandama Qabsiisi",
    candlesLit: "Shandama qabsiifame",
    candleBlessing: "Eebbi fi nageenyi isaan dhalootaaf dhiisan haa jiraatu!",
    candleLitSuccess: "Galatoomaa! Shandama yaadannoo qabsiistaniittu.",
    candleThankYou: "Waaqayyo lubbuu isaanii haa boqochiisu.",
    bioHeading: "Seenaa Jireenya Obbo Badhaadhaa Raggaasaa",
    bioSubheading: "Kutaa 13 Seenaa Jireenyaa Guutuu - Dhalootaa Hanga Boqonnaatti",
    bioSearchPlaceholder: "Seenaa keessaa barbaadaa...",
    bioExpandAll: "Hunda Bani",
    bioCollapseAll: "Hunda Cufi",
    bioJumpTo: "Kutaa Seenaatti Ce'i",
    bioReadMode: "Akka Kitaabaatti Dubbisi",
    galleryHeading: "Suuraalee Yaadannoo Maatii",
    gallerySubheading: "Suuraalee Dhugaa Seenaa Jireenyaa, Maatii, fi Hawaasaa",
    galleryCategoryAll: "Hunda",
    galleryCategoryFamily: "Maatii",
    galleryCategoryLife: "Jireenya",
    galleryCategoryCommunity: "Hawaasa",
    galleryCategoryMemorial: "Yaadannoo",
    galleryAddPhoto: "Suuraa Dabali",
    galleryEmpty: "Suuraan ammaaf hin jiru. Suuraa maatii olkaa'aa.",
    galleryClickToEnlarge: "Bal'isanii ilaaluuf cuqqaalaa",
    tributesHeading: "Yaadannoo fi Dhaamsa Jireenyaa",
    tributesSubheading: "Dhaamsa Maatii, Hiriyoota, fi Jaallattoota Isaanii",
    tributesLeaveMessage: "Dhaamsa Keessan Barreessaa",
    tributesFormName: "Maqaa Keessan",
    tributesFormRelation: "Walitti dhufeenya (fakkeenyaaf: Ilma, Fira, Hiriyaa)",
    tributesFormLocation: "Bakka (Magaalaa / Biyya)",
    tributesFormMessage: "Dhaamsa ykn Yaadannoo keessan asitti barreessaa...",
    tributesFormSubmit: "Ergaa Ergi",
    tributesFormSuccess: "Ergaan yaadannoo keessan milkaa'inaan ergameera. Galatoomaa.",
    tributesFormError: "Ergaa erguun hin milkoofne. Maaloo irra deebi'aa yaalaa.",
    familyHeading: "Hidda Dhalootaa fi Maatii",
    familySubheading: "Gaaddisa Maatii, Ijoollee, fi Akaakayyuulee Isaanii",
    familyTreeTitle: "Muka Dhalootaa (Family Tree)",
    familyGeneration1: "Dhaloota 1ffaa: Abbaa fi Haadha Maatii",
    familyGeneration2: "Dhaloota 2ffaa: Ijoollee Isaanii",
    familyGeneration3: "Dhaloota 3ffaa: Akaakayyuulee",
    adminTitle: "Giddugala Bulchiinsa Weebsaayitii",
    adminLoginTitle: "Galmee Bulchaa (Admin Login)",
    adminPasswordLabel: "Jecha Icchiitii / Password",
    adminLoginBtn: "Seeni",
    adminLogoutBtn: "Ba'i",
    adminTabOverview: "Ilaalcha Waliigalaa",
    adminTabHeroPortrait: "Suuraa Fuula Duraa",
    adminTabLogo: "Mallattoo (Logo)",
    adminTabBiography: "Seenaa Jireenyaa",
    adminTabGallery: "Suuraalee Galchuu",
    adminTabFamily: "Odeeffannoo Maatii",
    adminTabTributes: "Dhaamsa Yaadannoo",
    adminTabFirebase: "Qindaa'ina Firebase",
    saveChanges: "Jijjiirama Galmeessi",
    cancel: "Dhiisi",
    savedSuccess: "Milkaa'inaan galmaa'eera!",
    errorSaving: "Rakkoon uumameera, irra deebi'aa yaalaa.",
    footerRights: "Mirgi hunduu eeggamaadha. Weebsaayitii Yaadannoo Obbo Badhaadhaa Raggaasaa Wayyeessaa.",
    footerInMemoriam: "Bara baraan kabajaan yaadatamta!",
    changeLanguage: "Afaan Jijjiiri"
  },
  en: {
    siteTitle: "BADHAADHAA RAGGAASAA WAYYEESSAA",
    siteSubtitle: "Official Memorial Biography & Legacy Website",
    navHome: "Home",
    navBiography: "Biography",
    navGallery: "Photo Gallery",
    navTributes: "Memorial Tributes",
    navFamily: "Family Legacy",
    navAdmin: "Admin",
    heroBirthYear: "Birth Year: 1943",
    heroDeathDate: "Date of Passing: 07/04/2018",
    heroBtnBiography: "Read His Biography",
    heroBtnGallery: "View Photographs",
    heroUploadPortraitPrompt: "Upload verified family portrait of Obbo Badhaadhaa",
    heroVerifyDatesBadge: "Birth and passing dates to be verified with family calendar",
    candleAction: "Light a Candle",
    candlesLit: "Memorial Candles Lit",
    candleBlessing: "May his noble soul rest in eternal peace and love!",
    candleLitSuccess: "Thank you! You have lit a virtual memorial candle.",
    candleThankYou: "May his memory be a timeless blessing to all.",
    bioHeading: "The Life Story of Obbo Badhaadhaa Raggaasaa",
    bioSubheading: "Complete 13-Chapter Official Biography – From Roots to Heavenly Rest",
    bioSearchPlaceholder: "Search across biography chapters...",
    bioExpandAll: "Expand All",
    bioCollapseAll: "Collapse All",
    bioJumpTo: "Jump to Chapter",
    bioReadMode: "Book Reading Mode",
    galleryHeading: "Family Memorial Gallery",
    gallerySubheading: "Authentic Family Photographs, Milestones, and Cherished Moments",
    galleryCategoryAll: "All Photos",
    galleryCategoryFamily: "Family",
    galleryCategoryLife: "Life Journey",
    galleryCategoryCommunity: "Community",
    galleryCategoryMemorial: "Memorial",
    galleryAddPhoto: "Add Photograph",
    galleryEmpty: "No photos uploaded yet. Family can upload authentic photos here.",
    galleryClickToEnlarge: "Click to open full view",
    tributesHeading: "Tributes & Life Reflections",
    tributesSubheading: "Words of Love, Condolence, and Memories from Family and Friends",
    tributesLeaveMessage: "Leave a Memorial Tribute",
    tributesFormName: "Your Full Name",
    tributesFormRelation: "Relationship (e.g. Child, Relative, Friend, Colleague)",
    tributesFormLocation: "Location / City / Country",
    tributesFormMessage: "Write your heartfelt message or memory...",
    tributesFormSubmit: "Ergaa Ergi",
    tributesFormSuccess: "Ergaan yaadannoo keessan milkaa'inaan ergameera. Galatoomaa.",
    tributesFormError: "Ergaa erguun hin milkoofne. Maaloo irra deebi'aa yaalaa.",
    familyHeading: "Family Lineage & Kinship",
    familySubheading: "The Pillars of His Household, Children, and Grandchildren",
    familyTreeTitle: "Visual Family Tree",
    familyGeneration1: "Generation 1: Patriarch & Matriarch",
    familyGeneration2: "Generation 2: Children",
    familyGeneration3: "Generation 3: Grandchildren",
    adminTitle: "Website Management Control Panel",
    adminLoginTitle: "Administrator Authentication",
    adminPasswordLabel: "Security Passcode / Password",
    adminLoginBtn: "Access Dashboard",
    adminLogoutBtn: "Sign Out",
    adminTabOverview: "Overview",
    adminTabHeroPortrait: "Hero Portrait",
    adminTabLogo: "Website Logo",
    adminTabBiography: "Biography Editor",
    adminTabGallery: "Gallery Manager",
    adminTabFamily: "Family Records",
    adminTabTributes: "Manage Tributes",
    adminTabFirebase: "Firebase Cloud Settings",
    saveChanges: "Save Changes",
    cancel: "Cancel",
    savedSuccess: "Modifications saved successfully!",
    errorSaving: "An error occurred while saving. Please try again.",
    footerRights: "All Rights Reserved. Dedicated to the eternal memory of Obbo Badhaadhaa Raggaasaa Wayyeessaa.",
    footerInMemoriam: "Forever honored, forever remembered in our hearts.",
    changeLanguage: "Change Language"
  },
  am: {
    siteTitle: "በዳዳ ረጋሳ ወዬሳ",
    siteSubtitle: "የህይወት ታሪክ እና መታሰቢያ ድረ-ገጽ",
    navHome: "መነሻ",
    navBiography: "የህይወት ታሪክ",
    navGallery: "ፎቶዎች",
    navTributes: "መታሰቢያ እና ምስክርነት",
    navFamily: "ቤተሰብ",
    navAdmin: "አስተዳዳሪ",
    heroBirthYear: "የትውልድ ዘመን፡ 1943",
    heroDeathDate: "የእረፍት ቀን፡ 07/04/2018",
    heroBtnBiography: "የህይወት ታሪኩን አንብብ",
    heroBtnGallery: "ፎቶዎችን ተመልከት",
    heroUploadPortraitPrompt: "ትክክለኛውን የአቶ በዳዳ ፎቶ ይስቀሉ",
    heroVerifyDatesBadge: "የትውልድ እና የእረፍት ቀን በቤተሰብ ካላንደር ይረጋገጣል",
    candleAction: "ሻማ አብራ",
    candlesLit: "የተበሩ መታሰቢያ ሻማዎች",
    candleBlessing: "ነፍሳቸውን በአጸደ ገነት ያኑርልን!",
    candleLitSuccess: "እናመሰግናለን! የመታሰቢያ ሻማ አብርተዋል።",
    candleThankYou: "የመልካም ስራቸው አሻራ ለዘላለም በልባችን ይኖራል።",
    bioHeading: "የአቶ በዳዳ ረጋሳ ወዬሳ የህይወት ታሪክ",
    bioSubheading: "ሙሉ 13 ክፍሎች ያሉት ይፋዊ የህይወት ታሪክ - ከልደት እስከ እረፍት",
    bioSearchPlaceholder: "በህይወት ታሪክ ውስጥ ይፈልጉ...",
    bioExpandAll: "ሁሉንም ክፈት",
    bioCollapseAll: "ሁሉንም ዝጋ",
    bioJumpTo: "ወደ ምዕራፍ ሂድ",
    bioReadMode: "የንባብ ሁነታ",
    galleryHeading: "የቤተሰብ መታሰቢያ ፎቶዎች",
    gallerySubheading: "እውነተኛ የቤተሰብ፣ የህይወት እና የማህበረሰብ ፎቶዎች",
    galleryCategoryAll: "ሁሉም",
    galleryCategoryFamily: "ቤተሰብ",
    galleryCategoryLife: "የህይወት ጉዞ",
    galleryCategoryCommunity: "ማህበረሰብ",
    galleryCategoryMemorial: "መታሰቢያ",
    galleryAddPhoto: "ፎቶ ጨምር",
    galleryEmpty: "እስካሁን የተሰቀለ ፎቶ የለም። እውነተኛ የቤተሰብ ፎቶዎችን እዚህ መስቀል ይችላሉ።",
    galleryClickToEnlarge: "በሙሉ ገጽ ለማየት ይጫኑ",
    tributesHeading: "መታሰቢያ እና የህይወት ምስክርነት",
    tributesSubheading: "ከቤተሰብ፣ ከጓደኞች እና ከወዳጆች የተላኩ መልእክቶች",
    tributesLeaveMessage: "የመታሰቢያ መልእክትዎን ያስቀምጡ",
    tributesFormName: "ሙሉ ስምዎ",
    tributesFormRelation: "ዝምድና (ለምሳሌ፡ ልጅ፣ ዘመድ፣ ጓደኛ)",
    tributesFormLocation: "ቦታ / ከተማ / ሀገር",
    tributesFormMessage: "የልብዎን መልእክት ወይም መታሰቢያ እዚህ ይጻፉ...",
    tributesFormSubmit: "Ergaa Ergi",
    tributesFormSuccess: "Ergaan yaadannoo keessan milkaa'inaan ergameera. Galatoomaa.",
    tributesFormError: "Ergaa erguun hin milkoofne. Maaloo irra deebi'aa yaalaa.",
    familyHeading: "የትውልድ ሀረግ እና ቤተሰብ",
    familySubheading: "የቤተሰባቸው መሰረት፣ ልጆቻቸው እና የልጅ ልጆቻቸው",
    familyTreeTitle: "የቤተሰብ የዘር ሀረግ (Family Tree)",
    familyGeneration1: "1ኛ ትውልድ፡ አባትና እናት",
    familyGeneration2: "2ኛ ትውልድ፡ ልጆቻቸው",
    familyGeneration3: "3ኛ ትውልድ፡ የልጅ ልጆች",
    adminTitle: "የድረ-ገጽ አስተዳዳሪ ክፍል",
    adminLoginTitle: "የአስተዳዳሪ መግቢያ (Admin Login)",
    adminPasswordLabel: "የይለፍ ቃል / Password",
    adminLoginBtn: "ግባ",
    adminLogoutBtn: "ውጣ",
    adminTabOverview: "አጠቃላይ እይታ",
    adminTabHeroPortrait: "ዋናው ፎቶ",
    adminTabLogo: "አርማ (Logo)",
    adminTabBiography: "የህይወት ታሪክ አርታዒ",
    adminTabGallery: "ፎቶዎችን ማስተዳደር",
    adminTabFamily: "የቤተሰብ መረጃ",
    adminTabTributes: "የመታሰቢያ መልእክቶች",
    adminTabFirebase: "የፋየርቤዝ (Firebase) ማስተካከያ",
    saveChanges: "ለውጦችን መዝግብ",
    cancel: "ተመለስ",
    savedSuccess: "በተሳካ ሁኔታ ተመዝግቧል!",
    errorSaving: "ስህተት ተከስቷል፣ እባክዎ እንደገና ይሞክሩ።",
    footerRights: "መብቱ በህግ የተጠበቀ ነው። ለአቶ በዳዳ ረጋሳ ወዬሳ መታሰቢያ የተዘጋጀ።",
    footerInMemoriam: "ሁሌም በክብር እና በፍቅር ይታወሳሉ!",
    changeLanguage: "ቋንቋ ቀይር"
  }
};

