Add a NEW standalone module to the platform called
"Test Documents" accessible from the sidebar.

This is completely separate from the SIT pages.

---

## 1. SIDEBAR NAVIGATION

Add new item in sidebar:

  Icon: FolderDown (lucide-react)
  FR: "Documents de Test"
  EN: "Test Documents"
  Position: Below the 5 SIT items,
             above About

---

## 2. MODULE OVERVIEW PAGE

Page title:
  FR: "Générateur de Documents de Test"
  EN: "Test Document Generator"

Subtitle:
  FR: "Créez des documents professionnels
       contenant des données synthétiques
       pour valider la détection
       Microsoft Purview."
  EN: "Generate professional documents
       containing synthetic data to validate
       Microsoft Purview detection."

---

## 3. DISCLAIMER BANNER

Show a prominent banner at the top of the page.
Style: blue border left, light blue background.

FR:
"⚠ Ce module génère des documents contenant
exclusivement des données fictives et synthétiques.
Aucune information réelle n'est utilisée.
Ces fichiers sont destinés uniquement à des
fins de test dans le cadre du projet
OneTrust CM16. Ne pas utiliser en dehors
du périmètre de test autorisé."

EN:
"⚠ This module generates documents containing
exclusively fictional and synthetic data.
No real information is used.
These files are intended solely for testing
purposes within the AXA OneTrust CM16 project.
Do not use outside the authorized test perimeter."

---

## 4. STEP 1 — SIT SELECTOR

Title:
  FR: "Étape 1 — Sélectionnez les types
       de données à inclure"
  EN: "Step 1 — Select the data types
       to include"

Subtitle:
  FR: "Choisissez entre 1 et 5 types
       d'informations sensibles."
  EN: "Choose between 1 and 5 sensitive
       information types."

Show 5 selectable cards in a grid (2-3 per row):

┌─────────────────┐  ┌─────────────────┐
│  ☐  IBAN        │  │  ☐  Credit Card │
│  International  │  │  Worldwide      │
│  Banking Account│  │  detection      │
└─────────────────┘  └─────────────────┘
┌─────────────────┐  ┌─────────────────┐
│  ☐  EU Debit   │  │  ☐  SWIFT Code  │
│  Europe debit   │  │  Bank comm.     │
│  detection      │  │  data           │
└─────────────────┘  └─────────────────┘
         ┌─────────────────┐
         │  ☐  ABA Routing │
         │  US bank        │
         │  routing data   │
         └─────────────────┘

Card selected state:

- Border: 2px solid #CC0000
- Background: #FFF5F5
- Checkbox becomes: filled red checkmark

Validation rule:

- Minimum 1 SIT required
- Maximum 5 SITs (all selected)
- Show counter:
  FR: "{N} type(s) sélectionné(s)"
  EN: "{N} type(s) selected"
- If 0 selected → disable Step 2 and generate button

---

## 5. STEP 2 — DOCUMENT CONFIGURATION

Title:
  FR: "Étape 2 — Configurez le document"
  EN: "Step 2 — Configure the document"

### 2A — Variant selector

FR: "Nombre d'occurrences par type"
EN: "Number of occurrences per type"

Two options as radio cards:

┌────────────────────────┐
│  ○  Variante A         │
│     1 occurrence/type  │
│     → Label: Confidentiel│
└────────────────────────┘
┌────────────────────────┐
│  ○  Variante B         │
│     10 occurrences/type│
│     → Label: Secret    │
└────────────────────────┘

### 2B — Format selector

FR: "Format du document"
EN: "Document format"

3 format cards:

┌──────────┐ ┌──────────┐ ┌──────────┐
│ FileText │ │  Table2  │ │Presentation│
│          │ │          │ │          │
│   DOCX   │ │   XLSX   │ │   PPTX   │
│   Word   │ │  Excel   │ │PowerPoint│
└──────────┘ └──────────┘ └──────────┘

One format selectable at a time.
Selected: red border + red icon.

### 2C — Language (auto-synced)

FR: "Langue du document"
EN: "Document language"

Auto-synced with global platform language.
Show current language as read-only badge:
  "FR — Français" or "EN — English"
With a note:
  FR: "Synchronisé avec la langue
       de la plateforme"
  EN: "Synced with platform language"

---

## 6. STEP 3 — PREVIEW & GENERATE

Title:
  FR: "Étape 3 — Aperçu et téléchargement"
  EN: "Step 3 — Preview & Download"

### Preview panel

Show a summary of what will be generated:

┌─────────────────────────────────────┐
│ FR: "Récapitulatif du document"     │
│ EN: "Document Summary"              │
│                                     │
│ Format:    Word (.docx)             │
│ Langue:    Français                 │
│ Variante:  B — 10 occurrences       │
│ Label attendu: 🔴 Secret            │
│                                     │
│ Données incluses:                   │
│  • IBAN — 10 occurrences            │
│  • Credit Card — 10 occurrences     │
│  • SWIFT Code — 10 occurrences      │
│                                     │
│ Total occurrences: 30               │
└─────────────────────────────────────┘

### Data notice inside preview:

FR: "Ce document sera automatiquement
     marqué comme fichier de test.
     Un en-tête et un pied de page
     indiquent clairement qu'il s'agit
     de données fictives."

EN: "This document will be automatically
     marked as a test file.
     A header and footer clearly indicate
     that it contains fictional data."

### Generate button:

  FR: "Générer et télécharger"
  EN: "Generate & Download"
  Icon: Download
  Style: full width, solid AXA red #CC0000
  Loading: spinner +
    FR: "Génération en cours..."
    EN: "Generating..."

---

## 7. DOCUMENT CONTENT RULES

### ALL formats must include:

WATERMARK / NOTICE text on every page/sheet/slide:
  FR: "DOCUMENT DE TEST — DONNÉES FICTIVES —
       PROJET ONETRUST CM16 — AXA INTERNE"
  EN: "TEST DOCUMENT — FICTIONAL DATA —
       ONETRUST CM16 PROJECT — AXA INTERNAL"

HEADER on every page:
  Left:  AXA logo reference or "AXA"
  Center: Document title
  Right: "TEST — CM16"

FOOTER on every page:
  FR: "Document généré à des fins de test
       uniquement | Données synthétiques
       | OneTrust CM16 | AXA Usage Interne"
  EN: "Generated for testing purposes only
       | Synthetic data | OneTrust CM16
       | AXA Internal Use"

---

## 8. WORD (.docx) DOCUMENT STRUCTURE

Use `docx` npm library.

Title page section:

- Big title: name of document type
- Subtitle: "Données synthétiques — Test CM16"
- Date, reference number, department

For EACH selected SIT, add a section:
  Section heading: SIT name
  Subheading: Purview detection description
  Table with data:
    Header row: #CC0000, white text, bold
    Alternating rows: white / #FAFAFA
    Borders: #E0E0E0

After all SIT sections, add a final section:
  Title FR: "Notice de confidentialité"
  Title EN: "Confidentiality Notice"
  Content FR:
    "Les données présentées dans ce document
     sont entièrement fictives et synthétiques.
     Elles ont été générées algorithmiquement
     dans le cadre du projet OneTrust CM16
     d'AXA pour valider le bon fonctionnement
     de Microsoft Purview Auto-Labeling.
     Toute ressemblance avec des données
     réelles serait purement fortuite.
     Ce document ne doit pas quitter
     le périmètre de test autorisé."
  Content EN:
    "The data presented in this document
     is entirely fictional and synthetic.
     It was algorithmically generated as
     part of AXA's OneTrust CM16 project
     to validate Microsoft Purview
     Auto-Labeling. Any resemblance to
     real data is purely coincidental.
     This document must not leave
     the authorized test perimeter."

Filename:
  AXA_TestDoc_{SITs}_{variant}_{timestamp}.docx
  Example: AXA_TestDoc_IBAN-CC-SWIFT_B_1234567890.docx

---

## 9. EXCEL (.xlsx) DOCUMENT STRUCTURE

Use `xlsx` (SheetJS) library.

Sheet 1 — "README":
  Row 1: "AXA — OneTrust CM16 — Test Document"
  Row 2: "DOCUMENT DE TEST — DONNÉES FICTIVES"
  Row 3: Generation date
  Row 4: "Ce fichier contient des données
          synthétiques générées à des
          fins de test uniquement."
  Row 5: SITs included list
  Row 6: Variant and expected label

One sheet per selected SIT:
  Sheet name: SIT abbreviation
  (IBAN, CC, DEBIT, SWIFT, ABA)

  Row 1 (notice):
    merged cells, bold,
    "TEST DATA — FICTIONAL — CM16"
    background: #FFF3CD, text: #856404

  Row 2: column headers
    background: #CC0000, white text, bold

  Rows 3+: data rows
    alternating white / #FAFAFA

Freeze row 2 on each data sheet.

Filename:
  AXA_TestDoc_{SITs}_{variant}_{timestamp}.xlsx

---

## 10. POWERPOINT (.pptx) DOCUMENT STRUCTURE

Use `pptxgenjs` library.

Slide 1 — Cover:
  Red bar top 25% height: #CC0000
  Title: "Document de Test — CM16"
  Subtitle: SIT names listed
  Bottom left: AXA / Date
  Bottom right: "DONNÉES FICTIVES"
  Diagonal watermark center:
    "TEST DOCUMENT" 40pt #EEEEEE

Slide 2 — Notice slide:
  Title: "Notice importante"
  Content: Full fictional data disclaimer
  Style: clean, professional

One slide per selected SIT:
  Title: SIT full name
  Subtitle: Purview detection description
  Table: data for this SIT
    Header: #CC0000, white
    Rows: alternating white/#FAFAFA
  Bottom note: "Données synthétiques"

Last slide — Summary:
  Title: "Récapitulatif du Test"
  Table: SIT | Occurrences | Label attendu
  Footer: "OneTrust CM16 — AXA Interne"

Filename:
  AXA_TestDoc_{SITs}_{variant}_{timestamp}.pptx

---

## 11. NEW FILES TO CREATE

[NEW] src/modules/TestDocuments/
  index.tsx              — main page
  SITSelector.tsx        — step 1 cards
  DocumentConfig.tsx     — step 2 options
  PreviewPanel.tsx       — step 3 summary

[NEW] src/utils/documentGenerators/
  generateWordDoc.ts
  generateExcelDoc.ts
  generatePPTDoc.ts
  index.ts               — main dispatcher

[MODIFY] navigation.ts
  → Add "Test Documents" module

[MODIFY] index.ts (ModuleId)
  → Add 'test-documents'

[MODIFY] App.tsx
  → Add routing for test-documents

[MODIFY] translations.ts
  → Add all new translation keys

---

## 12. INSTALL

npm install docx xlsx pptxgenjs

---

## 13. VERIFICATION

- Navigate to "Test Documents" in sidebar
- Disclaimer banner visible at top
- Select 2 SITs (IBAN + Credit Card)
- Choose Variant B
- Choose DOCX format
- Preview shows: 2 SITs, 10 occ each,
  total 20 occurrences, label Secret
- Click Generate → Word file downloads
- Open Word file →
  Header shows "TEST — CM16"
  Footer shows synthetic data notice
  2 sections: IBAN table + Credit Card table
  Final confidentiality notice section
- Repeat with XLSX → README sheet + 2 data sheets
- Repeat with PPTX → Cover + Notice + 2 data slides
  + Summary slide
- Switch to EN → all document content in English
