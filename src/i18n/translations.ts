import { useLanguage } from '../hooks/useLanguage'

type TranslationsShape = {
  generateBtn: string
  regenerateBtn: string
  generating: string
  copyBtn: string
  copied: string
  variantA: string
  variantAPlus: string
  variantB: string
  variantAOcc: string
  variantAPlusOcc: string
  variantBOcc: string
  variantALabel: string
  variantBLabel: string
  expectedLabel: string
  confidentiel: string
  secret: string
  variantADesc: string
  variantAPlusDesc: string
  variantBDesc: string
  instruction: string
  testResult: string
  pending: string
  passed: string
  failed: string
  generatePromptA: (name: string) => string
  generatePromptB: (name: string) => string
  purviewDetection: string
  confidence: string
  high: string
  medium: string
  exportBtn: string
  exporting: string
  globalReport: string
  generateNewDoc: string
  resultSaved: string
  testResultLabel: string
  downloadReport: string
  aboutTitle: string
  aboutProject: string
  aboutMilestone: string
  aboutEnv: string
  aboutObjective: string
  aboutTeam: string
  aboutOwnerRole: string
  aboutCollab1Role: string
  aboutCollab2Role: string
  aboutSecurity: string
  aboutSec1: string
  aboutSec2: string
  aboutSec3: string
  aboutSec4: string
  aboutDisclaimer: string
  aboutLabel: string
  aboutEnvLabel: string
  aboutObjLabel: string
  aboutProjLabel: string
  confidentialNote: string
  confidentialDetail: string
  // About subtitle
  internalPlatform: string
  // SIT page breadcrumb
  autoLabelingTest: string
  // Nav labels
  navIban: string
  navCreditCard: string
  navEuDebit: string
  navSwift: string
  navAba: string
  navAbout: string
  // Sidebar sub-labels
  navIbanDesc: string
  navCreditDesc: string
  navEuDebitDesc: string
  navSwiftDesc: string
  navAbaDesc: string
  navAboutDesc: string
  navTestDocs: string
  navTestDocsDesc: string

  // Test Documents Module
  tdTitle: string
  tdSubtitle: string
  tdDisclaimer: string
  tdStep1Title: string
  tdStep1Subtitle: string
  tdCardIBANDesc: string
  tdCardCCDesc: string
  tdCardDebitDesc: string
  tdCardSWIFTDesc: string
  tdCardABADesc: string
  tdSelectedCount: (n: number) => string
  tdStep2Title: string
  tdOccurrences: string
  tdVariantA: string
  tdVariantB: string
  tdFormat: string
  tdLanguage: string
  tdLanguageSynced: string
  tdStep3Title: string
  tdSummaryTitle: string
  tdFormatLabel: string
  tdLanguageLabel: string
  tdVariantLabel: string
  tdExpectedLabel: string
  tdDataIncluded: string
  tdTotalOccurrences: string
  tdNotice: string
  tdGenerateBtn: string
  tdGenerating: string
  tdDocWatermark: string
  tdDocFooter: string
  tdDocConfidentialityTitle: string
  tdDocConfidentialityText: string
  bottomBannerText: string
  email: string
  password: string
  signIn: string
  signingIn: string
  invalidCredentials: string
  restrictedAccess: string
  showPassword: string
  hidePassword: string
  signOut: string
}

const translations: Record<'fr' | 'en', TranslationsShape> = {
  fr: {
    // Generate / Content
    generateBtn: 'Générer le contenu',
    regenerateBtn: 'Régénérer',
    generating: 'Génération en cours...',
    copyBtn: 'Copier',
    copied: 'Copié !',
    // Variants
    variantA: 'Variante A',
    variantAPlus: 'Variante A+',
    variantB: 'Variante B',
    variantAOcc: '1 occurrence',
    variantAPlusOcc: '5 occurrences',
    variantBOcc: '10 occurrences',
    variantALabel: '→ Confidentiel',
    variantBLabel: '→ Secret',
    // Labels
    expectedLabel: 'Label attendu',
    confidentiel: 'Confidentiel',
    secret: 'Secret',
    variantADesc: '1 occurrence — cas limite',
    variantAPlusDesc: '5 occurrences — déclenchement fiable',
    variantBDesc: '10 occurrences — Secret',
    // Instruction
    instruction: 'Copiez ce contenu dans Word, Outlook ou Excel, puis vérifiez le label appliqué par Purview.',
    // Result tracker
    testResult: 'Résultat de ce test :',
    pending: 'En attente',
    passed: 'Réussi',
    failed: 'Échoué',
    // Generate prompt
    generatePromptA: (name: string) => `Cliquez pour générer un document de test professionnel contenant 1 occurrence de ${name}`,
    generatePromptB: (name: string) => `Cliquez pour générer un document de test professionnel contenant 10 occurrences de ${name}`,
    // Purview detection
    purviewDetection: 'Détection Purview',
    confidence: 'Niveau de confiance',
    high: 'Élevé',
    medium: 'Moyen',
    // TopBar
    exportBtn: 'Exporter le Rapport',
    exporting: 'Génération...',
    globalReport: 'Rapport Global',
    // SIT page new keys
    generateNewDoc: 'Générer un nouveau document',
    resultSaved: 'Résultat enregistré',
    testResultLabel: 'Résultat du test — Test ID :',
    downloadReport: 'Télécharger le rapport',
    // About
    aboutTitle: 'À propos de la plateforme',
    aboutProject: 'OneTrust — AXA',
    aboutMilestone: 'CM16 — Financial SITs Validation',
    aboutEnv: 'Microsoft Purview — Auto-Labeling',
    aboutObjective: 'Valider le bon fonctionnement de l\'auto-labeling Microsoft Purview sur les types d\'informations sensibles financiers définis dans le cadre du projet OneTrust CM16.',
    aboutTeam: 'Équipe',
    aboutOwnerRole: 'Propriétaire de la plateforme — Analyste DLP',
    aboutCollab1Role: 'Collaboratrice — Projet OneTrust CM16',
    aboutCollab2Role: 'Collaboratrice — Projet OneTrust CM16',
    aboutSecurity: 'Garanties de Sécurité',
    aboutSec1: '100% client-side — aucun appel serveur',
    aboutSec2: 'Zéro rétention de données — pas de cookies',
    aboutSec3: 'Traitement en moins de 200 ms',
    aboutSec4: 'Aucune analytics, aucun script externe',
    aboutDisclaimer: 'Toutes les données générées sont synthétiques et fictives. Aucune donnée réelle n\'est utilisée.',
    aboutLabel: 'Jalon',
    aboutEnvLabel: 'Environnement',
    aboutObjLabel: 'Objectif',
    aboutProjLabel: 'Projet',
    confidentialNote: 'Confidentiel — Usage Interne Uniquement.',
    confidentialDetail: 'Ne pas partager les résultats en dehors de l\'équipe DLP autorisée.',
    // About subtitle
    internalPlatform: 'AXA — Plateforme Interne',
    // SIT page breadcrumb
    autoLabelingTest: 'Test Auto-Labeling',
    // Nav labels
    navIban: 'IBAN',
    navCreditCard: 'Carte Bancaire',
    navEuDebit: 'Carte Débit UE',
    navSwift: 'Code SWIFT',
    navAba: 'ABA Routing',
    navAbout: 'À propos',
    // Sidebar sub-labels
    navIbanDesc: 'IBAN international',
    navCreditDesc: 'Réseau mondial',
    navEuDebitDesc: 'Débit européen',
    navSwiftDesc: 'Communication bancaire',
    navAbaDesc: 'Routing US',
    navTestDocs: 'Documents de Test',
    navTestDocsDesc: 'Générateur de fichiers',
    navAboutDesc: 'Infos plateforme',

    // Test Documents Module
    tdTitle: 'Générateur de Documents de Test',
    tdSubtitle: 'Créez des documents professionnels contenant des données synthétiques pour valider la détection Microsoft Purview.',
    tdDisclaimer: '⚠ Ce module génère des documents contenant exclusivement des données fictives et synthétiques. Aucune information réelle n\'est utilisée. Ces fichiers sont destinés uniquement à des fins de test dans le cadre du projet OneTrust CM16. Ne pas utiliser en dehors du périmètre de test autorisé.',
    tdStep1Title: 'Étape 1 — Sélectionnez les types de données à inclure',
    tdStep1Subtitle: 'Choisissez entre 1 et 5 types d\'informations sensibles.',
    tdCardIBANDesc: 'International Banking Account',
    tdCardCCDesc: 'Worldwide detection',
    tdCardDebitDesc: 'Europe debit detection',
    tdCardSWIFTDesc: 'Bank comm. data',
    tdCardABADesc: 'US bank routing data',
    tdSelectedCount: (n: number) => `${n} type(s) sélectionné(s)`,
    tdStep2Title: 'Étape 2 — Configurez le document',
    tdOccurrences: 'Nombre d\'occurrences par type',
    tdVariantA: '1 occurrence/type → Label: Confidentiel',
    tdVariantB: '10 occurrences/type → Label: Secret',
    tdFormat: 'Format du document',
    tdLanguage: 'Langue du document',
    tdLanguageSynced: 'Synchronisé avec la langue de la plateforme',
    tdStep3Title: 'Étape 3 — Aperçu et téléchargement',
    tdSummaryTitle: 'Récapitulatif du document',
    tdFormatLabel: 'Format :',
    tdLanguageLabel: 'Langue :',
    tdVariantLabel: 'Variante :',
    tdExpectedLabel: 'Label attendu :',
    tdDataIncluded: 'Données incluses :',
    tdTotalOccurrences: 'Total occurrences :',
    tdNotice: 'Ce document sera automatiquement marqué comme fichier de test. Un en-tête et un pied de page indiquent clairement qu\'il s\'agit de données fictives.',
    tdGenerateBtn: 'Générer et télécharger',
    tdGenerating: 'Génération en cours...',
    tdDocWatermark: 'DOCUMENT DE TEST — DONNÉES FICTIVES — PROJET ONETRUST CM16 — AXA INTERNE',
    tdDocFooter: 'Document généré à des fins de test uniquement | Données synthétiques | OneTrust CM16 | AXA Usage Interne',
    tdDocConfidentialityTitle: 'Notice de confidentialité',
    tdDocConfidentialityText: 'Les données présentées dans ce document sont entièrement fictives et synthétiques. Elles ont été générées algorithmiquement dans le cadre du projet OneTrust CM16 d\'AXA pour valider le bon fonctionnement de Microsoft Purview Auto-Labeling. Toute ressemblance avec des données réelles serait purement fortuite. Ce document ne doit pas quitter le périmètre de test autorisé.',
    bottomBannerText: 'Plateforme de Test : Zéro risque de fuite de données',
    email: "Email ou Nom d'utilisateur",
    password: "Mot de passe",
    signIn: "Se connecter",
    signingIn: "Connexion...",
    invalidCredentials: "Email ou mot de passe incorrect.",
    restrictedAccess: "Accès réservé — AXA Interne",
    showPassword: "Afficher",
    hidePassword: "Masquer",
    signOut: "Déconnexion",
  },
  en: {
    generateBtn: 'Generate Content',
    regenerateBtn: 'Regenerate',
    generating: 'Generating...',
    copyBtn: 'Copy',
    copied: 'Copied!',
    variantA: 'Variant A',
    variantAPlus: 'Variant A+',
    variantB: 'Variant B',
    variantAOcc: '1 occurrence',
    variantAPlusOcc: '5 occurrences',
    variantBOcc: '10 occurrences',
    variantALabel: '→ Confidentiel',
    variantBLabel: '→ Secret',
    expectedLabel: 'Expected Label',
    confidentiel: 'Confidentiel',
    secret: 'Secret',
    variantADesc: '1 occurrence — edge case',
    variantAPlusDesc: '5 occurrences — reliable trigger',
    variantBDesc: '10 occurrences — Secret',
    instruction: 'Copy this content and paste it into a Word, Outlook or Excel document. Then verify the label applied by Purview.',
    testResult: 'Test result:',
    pending: 'Pending',
    passed: 'Passed',
    failed: 'Failed',
    generatePromptA: (name: string) => `Click to generate a professional test document containing 1 occurrence of ${name}`,
    generatePromptB: (name: string) => `Click to generate a professional test document containing 10 occurrences of ${name}`,
    purviewDetection: 'Purview Detection',
    confidence: 'Confidence',
    high: 'High',
    medium: 'Medium',
    exportBtn: 'Export Report',
    exporting: 'Generating...',
    globalReport: 'Global Report',
    // SIT page new keys
    generateNewDoc: 'Generate new document',
    resultSaved: 'Result saved',
    testResultLabel: 'Test Result — Test ID:',
    downloadReport: 'Download Report',
    aboutTitle: 'About this Platform',
    aboutProject: 'OneTrust — AXA',
    aboutMilestone: 'CM16 — Financial SITs Validation',
    aboutEnv: 'Microsoft Purview — Auto-Labeling',
    aboutObjective: 'Validate the correct behavior of Microsoft Purview auto-labeling on financial Sensitive Information Types defined within the AXA OneTrust CM16 project scope.',
    aboutTeam: 'Team',
    aboutOwnerRole: 'Platform Owner — DLP Analyst',
    aboutCollab1Role: 'Collaborator — DLP Analyst',
    aboutCollab2Role: 'Collaborator — DLP Analyst',
    aboutSecurity: 'Security Guarantees',
    aboutSec1: '100% client-side — no server calls',
    aboutSec2: 'Zero data retention — no cookies',
    aboutSec3: 'All processing under 200ms',
    aboutSec4: 'No analytics, no external scripts',
    aboutDisclaimer: 'All generated data is synthetic and fictional. No real personal or financial data is used.',
    aboutLabel: 'Milestone',
    aboutEnvLabel: 'Environment',
    aboutObjLabel: 'Objective',
    aboutProjLabel: 'Project',
    confidentialNote: 'Confidential — Internal Use Only.',
    confidentialDetail: 'Do not share outputs outside the authorized DLP team.',
    // About subtitle
    internalPlatform: 'AXA — Internal Platform',
    // SIT page breadcrumb
    autoLabelingTest: 'Auto-Labeling Test',
    // Nav labels
    navIban: 'IBAN',
    navCreditCard: 'Credit Card',
    navEuDebit: 'EU Debit Card',
    navSwift: 'SWIFT Code',
    navAba: 'ABA Routing',
    navAbout: 'About',
    // Sidebar sub-labels
    navIbanDesc: 'International banking',
    navCreditDesc: 'Worldwide detection',
    navEuDebitDesc: 'European debit',
    navSwiftDesc: 'Bank communication',
    navAbaDesc: 'US routing',
    navTestDocs: 'Test Documents',
    navTestDocsDesc: 'File generator',
    navAboutDesc: 'Platform info',

    // Test Documents Module
    tdTitle: 'Test Document Generator',
    tdSubtitle: 'Generate professional documents containing synthetic data to validate Microsoft Purview detection.',
    tdDisclaimer: ' This module generates documents containing exclusively fictional and synthetic data. No real information is used. These files are intended solely for testing purposes within the AXA OneTrust CM16 project. Do not use outside the authorized test perimeter.',
    tdStep1Title: 'Step 1 — Select the data types to include',
    tdStep1Subtitle: 'Choose between 1 and 5 sensitive information types.',
    tdCardIBANDesc: 'International Banking Account',
    tdCardCCDesc: 'Worldwide detection',
    tdCardDebitDesc: 'Europe debit detection',
    tdCardSWIFTDesc: 'Bank comm. data',
    tdCardABADesc: 'US bank routing data',
    tdSelectedCount: (n: number) => `${n} type(s) selected`,
    tdStep2Title: 'Step 2 — Configure the document',
    tdOccurrences: 'Number of occurrences per type',
    tdVariantA: '1 occurrence/type → Label: Confidentiel',
    tdVariantB: '10 occurrences/type → Label: Secret',
    tdFormat: 'Document format',
    tdLanguage: 'Document language',
    tdLanguageSynced: 'Synced with platform language',
    tdStep3Title: 'Step 3 — Preview & Download',
    tdSummaryTitle: 'Document Summary',
    tdFormatLabel: 'Format:',
    tdLanguageLabel: 'Language:',
    tdVariantLabel: 'Variant:',
    tdExpectedLabel: 'Expected label:',
    tdDataIncluded: 'Data included:',
    tdTotalOccurrences: 'Total occurrences:',
    tdNotice: 'This document will be automatically marked as a test file. A header and footer clearly indicate that it contains fictional data.',
    tdGenerateBtn: 'Generate & Download',
    tdGenerating: 'Generating...',
    tdDocWatermark: 'TEST DOCUMENT — FICTIONAL DATA — ONETRUST CM16 PROJECT — AXA INTERNAL',
    tdDocFooter: 'Generated for testing purposes only | Synthetic data | OneTrust CM16 | AXA Internal Use',
    tdDocConfidentialityTitle: 'Confidentiality Notice',
    tdDocConfidentialityText: 'The data presented in this document is entirely fictional and synthetic. It was algorithmically generated as part of AXA\'s OneTrust CM16 project to validate Microsoft Purview Auto-Labeling. Any resemblance to real data is purely coincidental. This document must not leave the authorized test perimeter.',
    bottomBannerText: ' Test Platform: No data leakage risk',
    email: "Email or Username",
    password: "Password",
    signIn: "Sign In",
    signingIn: "Signing in...",
    invalidCredentials: "Invalid email or password.",
    restrictedAccess: "Restricted Access — AXA Internal",
    showPassword: "Show",
    hidePassword: "Hide",
    signOut: "Sign Out",
  }
}

export type Translations = TranslationsShape

export function useTranslations(): TranslationsShape {
  const { language } = useLanguage()
  return translations[language]
}
