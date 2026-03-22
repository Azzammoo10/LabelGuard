import { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  AlignmentType, 
  Header,
  Footer,
  PageBreak
} from 'docx'
import { saveAs } from 'file-saver'
import type { GeneratedData } from './index'
import type { VariantType } from '../../components/modules/TestDocuments/index'

const PRIMARY_COLOR = '00008F'
const RED_COLOR = 'CC0000'

function createLetterhead(department: string, title: string, dateStr: string, refStr: string, isFirst: boolean): Paragraph[] {
  const paras: Paragraph[] = []
  
  if (!isFirst) {
    paras.push(new Paragraph({ children: [new PageBreak()] }))
  }

  paras.push(
    new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({ text: `AXA — ${department}`, bold: true, color: PRIMARY_COLOR, size: 28 }),
      ],
      spacing: { after: 100 }
    }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [
        new TextRun({ text: 'Usage Interne — Confidentiel', bold: true, color: RED_COLOR, size: 20 }),
      ],
      spacing: { after: 400 }
    }),
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [
        new TextRun({ text: `Paris, le ${dateStr}`, size: 24 }),
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [
        new TextRun({ text: `Réf : ${refStr}`, size: 24 }),
      ],
      spacing: { after: 600 }
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: title, bold: true, size: 32, color: '333333' }),
      ],
      spacing: { after: 400 }
    })
  )

  return paras
}

export async function generateWordDoc(
  selectedSITs: string[], 
  dataArrays: GeneratedData, 
  language: 'fr' | 'en',
  variant: VariantType
): Promise<void> {
  const isFr = language === 'fr'
  const watermark = isFr ? 'TEST DOCUMENT — DONNÉES FICTIVES — CM16' : 'TEST DOCUMENT — FICTIONAL DATA — CM16'
  const dateStr = new Date().toLocaleDateString(isFr ? 'fr-FR' : 'en-US')
  const footerText = isFr 
    ? 'Document généré à des fins de test uniquement | Données synthétiques | OneTrust CM16 | AXA Interne' 
    : 'Generated for testing purposes only | Synthetic data | OneTrust CM16 | AXA Internal'

  const sections: Paragraph[] = []
  let isFirst = true

  const addSpacing = (after = 200) => new Paragraph({ text: '', spacing: { after } })

  // 1. IBAN
  if (selectedSITs.includes('iban') && dataArrays['iban']) {
    const data = dataArrays['iban']
    const refStr = `FIN-VB-${Math.floor(Math.random() * 9000) + 1000}`
    const scenario = isFr ? 'Règlement fournisseur trimestriel' : 'Quarterly supplier settlement'
    
    sections.push(...createLetterhead('Direction Financière', isFr ? 'ORDRE DE VIREMENT BANCAIRE' : 'WIRE TRANSFER ORDER', dateStr, refStr, isFirst))
    isFirst = false

    sections.push(
      new Paragraph({ children: [new TextRun({ text: isFr ? `Objet : Ordre de virement bancaire — ${scenario}` : `Subject: Wire transfer order — ${scenario}`, bold: true })] }),
      addSpacing(),
      new Paragraph({ text: isFr ? 'Madame, Monsieur,' : 'Dear Sir/Madam,' }),
      addSpacing(),
      new Paragraph({ text: isFr 
        ? 'Par la présente, la Direction Financière d\'AXA France transmet les instructions de virement suivantes pour traitement par le département comptabilité fournisseurs.'
        : 'The AXA Finance Department hereby submits the following wire transfer instructions for processing by the accounts payable department.' 
      }),
      addSpacing(400)
    )

    if (variant === 'A') {
      const item = data[0]
      sections.push(
        new Paragraph({ text: isFr ? 'Nous vous prions de bien vouloir procéder au virement bancaire ci-dessous :' : 'Please process the following wire transfer:' }),
        addSpacing(),
        new Paragraph({ text: `  Bénéficiaire : ${item.beneficiary}` }),
        new Paragraph({ text: `  Banque        : ${item.bank.name}` }),
        new Paragraph({ text: `  IBAN          : ${item.iban}` }),
        new Paragraph({ text: `  SWIFT/BIC     : ${item.swift}` }),
        new Paragraph({ text: `  Montant       : ${item.amount} EUR` }),
        new Paragraph({ text: `  Motif         : ${item.reference} — ${scenario}` }),
        new Paragraph({ text: `  Date d'effet  : ${dateStr}` }),
        addSpacing(400)
      )
    } else {
      sections.push(
        new Paragraph({ text: isFr ? 'Nous vous prions de bien vouloir procéder aux virements bancaires suivants :' : 'Please process the following wire transfers:' }),
        addSpacing()
      )
      data.forEach((item, idx) => {
        sections.push(
          new Paragraph({ children: [new TextRun({ text: `Virement ${idx + 1} — ${item.beneficiary}`, bold: true })] }),
          new Paragraph({ text: `  IBAN          : ${item.iban}` }),
          new Paragraph({ text: `  SWIFT/BIC     : ${item.swift}` }),
          new Paragraph({ text: `  Montant       : ${item.amount} EUR` }),
          new Paragraph({ text: `  Motif         : ${item.reference}` }),
          addSpacing()
        )
      })
    }

    sections.push(
      new Paragraph({ text: isFr ? 'Dans l\'attente de votre confirmation, nous restons à votre disposition.' : 'Awaiting your confirmation, we remain at your disposal.' }),
      addSpacing(),
      new Paragraph({ text: isFr ? 'Cordialement,' : 'Best regards,' }),
      addSpacing(600),
      new Paragraph({ text: 'Sophie Martin' }),
      new Paragraph({ text: isFr ? 'Directrice Financière' : 'Chief Financial Officer' }),
      new Paragraph({ text: isFr ? 'Direction Financière — AXA France' : 'Finance Department — AXA' })
    )
  }

  // 2. Credit Card
  if (selectedSITs.includes('credit-card') && dataArrays['credit-card']) {
    const data = dataArrays['credit-card']
    const refStr = `NDF-${Math.floor(Math.random() * 90000) + 10000}`
    
    sections.push(...createLetterhead('Note de Frais Professionnels', isFr ? 'DEMANDE DE REMBOURSEMENT DE FRAIS' : 'EXPENSE REIMBURSEMENT REQUEST', dateStr, refStr, isFirst))
    isFirst = false

    const pName = data[0].cardholder
    sections.push(
      new Paragraph({ text: `Collaborateur   : ${pName}` }),
      new Paragraph({ text: `Département     : IT & Systèmes` }),
      new Paragraph({ text: `Période         : ${new Date().toLocaleString(isFr ? 'fr-FR' : 'en-US', { month: 'long', year: 'numeric' })}` }),
      new Paragraph({ text: `Manager         : Thomas Dubois` }),
      addSpacing(400),
      new Paragraph({ children: [new TextRun({ text: isFr ? 'Détail des dépenses professionnelles :' : 'Professional expenses details:', bold: true })] }),
      addSpacing()
    )

    if (variant === 'A') {
      const item = data[0]
      sections.push(
        new Paragraph({ text: `Date       : ${item.date}` }),
        new Paragraph({ text: `Nature     : Déplacement professionnel` }),
        new Paragraph({ text: `Mode paiement : Carte de crédit` }),
        new Paragraph({ text: `Numéro de carte : ${item.cardNumber}` }),
        new Paragraph({ text: `Titulaire  : ${item.cardholder}` }),
        new Paragraph({ text: `Expiration : ${item.expiry}` }),
        new Paragraph({ text: `Montant    : ${item.amount} EUR` }),
        new Paragraph({ text: `Justificatif : Facture jointe` }),
        addSpacing()
      )
    } else {
      data.forEach((item, idx) => {
        sections.push(
          new Paragraph({ children: [new TextRun({ text: `Dépense ${idx + 1} :`, bold: true })] }),
          new Paragraph({ text: `  Date     : ${item.date}` }),
          new Paragraph({ text: `  Nature   : Repas client / Déplacement` }),
          new Paragraph({ text: `  Carte de crédit : ${item.cardNumber}` }),
          new Paragraph({ text: `  Montant  : ${item.amount} EUR` }),
          addSpacing()
        )
      })
    }

    sections.push(
      new Paragraph({ children: [new TextRun({ text: `Total à rembourser : 1250.00 EUR`, bold: true })] }),
      addSpacing(400),
      new Paragraph({ text: isFr ? 'Je certifie que ces dépenses ont été engagées dans le cadre de mon activité professionnelle.' : 'I certify these expenses were incurred for professional business purposes.' }),
      addSpacing(600),
      new Paragraph({ text: isFr ? 'Signature collaborateur : _______________' : 'Employee Signature : _______________' }),
      addSpacing(),
      new Paragraph({ text: isFr ? 'Signature manager       : _______________' : 'Manager Signature  : _______________' })
    )
  }

  // 3. EU Debit Card
  if (selectedSITs.includes('eu-debit-card') && dataArrays['eu-debit-card']) {
    const data = dataArrays['eu-debit-card']
    const refStr = `ACH-CB-${Math.floor(Math.random() * 900) + 100}`
    
    sections.push(...createLetterhead('Direction des Achats', isFr ? 'ATTRIBUTION DE CARTE DE DÉBIT PROFESSIONNELLE' : 'PROFESSIONAL DEBIT CARD ALLOCATION', dateStr, refStr, isFirst))
    isFirst = false

    if (variant === 'A') {
      const item = data[0]
      sections.push(
        new Paragraph({ text: isFr ? 'La présente atteste que la carte de débit professionnelle suivante a été attribuée au collaborateur désigné ci-dessous :' : 'This certifies that the following professional debit card has been allocated:' }),
        addSpacing(),
        new Paragraph({ text: `  Titulaire     : ${item.holder}` }),
        new Paragraph({ text: `  Département   : ${item.department}` }),
        new Paragraph({ text: `  Matricule     : MATR-${Math.floor(Math.random() * 9000)}` }),
        new Paragraph({ text: `  N° de carte   : ${item.cardNumber}` }),
        new Paragraph({ text: `  Validité      : ${item.expiry}` }),
        new Paragraph({ text: `  Plafond mensuel : ${item.limit} EUR` }),
        new Paragraph({ text: `  Usage autorisé : Dépenses fournisseurs approuvées uniquement` }),
        addSpacing()
      )
    } else {
      sections.push(
        new Paragraph({ text: isFr ? 'Les cartes de débit professionnelles suivantes ont été attribuées :' : 'The following debit cards were allocated:' }),
        addSpacing()
      )
      data.forEach((item, idx) => {
        sections.push(
          new Paragraph({ children: [new TextRun({ text: `Attribution ${idx + 1} :`, bold: true })] }),
          new Paragraph({ text: `  Titulaire : ${item.holder}` }),
          new Paragraph({ text: `  Carte     : ${item.cardNumber}` }),
          new Paragraph({ text: `  Validité  : ${item.expiry}` }),
          new Paragraph({ text: `  Plafond   : ${item.limit} EUR` }),
          addSpacing()
        )
      })
    }

    sections.push(
      new Paragraph({ text: isFr ? 'Le titulaire s\'engage à utiliser cette carte conformément à la politique AXA en vigueur.' : 'The cardholder agrees to use this card in compliance with AXA policies.' }),
      addSpacing(600),
      new Paragraph({ text: 'Responsable Achats : _______________' }),
      addSpacing(),
      new Paragraph({ text: 'DRH               : _______________' })
    )
  }

  // 4. SWIFT
  if (selectedSITs.includes('swift-code') && dataArrays['swift-code']) {
    const data = dataArrays['swift-code']
    const refStr = `TR-INT-${Math.floor(Math.random() * 90000) + 10000}`
    const scenario = isFr ? 'Règlement partenaire international' : 'International partner settlement'
    
    sections.push(...createLetterhead('Trésorerie Internationale', isFr ? 'INSTRUCTION DE PAIEMENT INTERNATIONAL' : 'INTERNATIONAL PAYMENT INSTRUCTION', dateStr, refStr, isFirst))
    isFirst = false

    if (variant === 'A') {
      const item = data[0]
      sections.push(
        new Paragraph({ text: isFr ? 'Dans le cadre de nos relations commerciales internationales, nous vous prions de traiter le paiement suivant :' : 'Please process the following international payment:' }),
        addSpacing(),
        new Paragraph({ children: [new TextRun({ text: `  Banque émettrice : AXA Banque France`, bold: true })] }),
        new Paragraph({ text: `  Code SWIFT/BIC   : AXABFRPP` }),
        addSpacing(),
        new Paragraph({ children: [new TextRun({ text: `  Banque bénéficiaire : ${item.bank.name}`, bold: true })] }),
        new Paragraph({ text: `  Code SWIFT/BIC      : ${item.swift}` }),
        new Paragraph({ text: `  Pays                : ${item.country}` }),
        new Paragraph({ text: `  Ville               : ${item.city}` }),
        addSpacing(),
        new Paragraph({ text: `  Bénéficiaire : Partenaire Corp` }),
        new Paragraph({ text: `  Montant      : 150000 EUR` }),
        new Paragraph({ text: `  Objet        : ${scenario}` }),
        new Paragraph({ text: `  Référence    : ${refStr}` }),
        addSpacing()
      )
    } else {
      sections.push(
        new Paragraph({ text: isFr ? `Tableau des correspondants bancaires à contacter pour les virements de la période ${new Date().toLocaleString('fr-FR', {month:'long'})} :` : 'Bank correspondents for current period:' }),
        addSpacing()
      )
      data.forEach((item, idx) => {
        sections.push(
          new Paragraph({ children: [new TextRun({ text: `Correspondant ${idx + 1} :`, bold: true })] }),
          new Paragraph({ text: `  Banque   : ${item.bank.name}` }),
          new Paragraph({ text: `  SWIFT    : ${item.swift}` }),
          new Paragraph({ text: `  Pays     : ${item.country}` }),
          new Paragraph({ text: `  Contact  : Représentant Local` }),
          addSpacing()
        )
      })
    }
  }

  // 5. ABA
  if (selectedSITs.includes('aba-routing') && dataArrays['aba-routing']) {
    const data = dataArrays['aba-routing']
    const refStr = `FED-${Math.floor(Math.random() * 90000) + 10000}`
    const scenario = 'Corporate Vendor Payment'
    
    // Always in English as per instructions
    sections.push(...createLetterhead('International Treasury', 'WIRE TRANSFER AUTHORIZATION', dateStr, refStr, isFirst))
    isFirst = false

    if (variant === 'A') {
      const item = data[0]
      sections.push(
        new Paragraph({ text: 'This document authorizes the following domestic wire transfer through the US Federal Reserve network:' }),
        addSpacing(),
        new Paragraph({ children: [new TextRun({ text: `  Originating Bank  : AXA Financial US`, bold: true })] }),
        addSpacing(),
        new Paragraph({ children: [new TextRun({ text: `  Receiving Bank    : ${item.bank.name}`, bold: true })] }),
        new Paragraph({ text: `  ABA Routing No.   : ${item.aba}` }),
        new Paragraph({ text: `  Account Number    : 000${Math.floor(Math.random() * 9000000)}` }),
        new Paragraph({ text: `  SWIFT/BIC         : ${item.swift}` }),
        new Paragraph({ text: `  City              : ${item.city}` }),
        addSpacing(),
        new Paragraph({ text: `  Beneficiary       : US Vendor LLC` }),
        new Paragraph({ text: `  Amount            : $ 45,000.00` }),
        new Paragraph({ text: `  Purpose           : ${scenario}` }),
        new Paragraph({ text: `  Authorization Ref : ${refStr}` }),
        addSpacing()
      )
    } else {
      sections.push(
        new Paragraph({ text: 'The following wire transfers are authorized for processing via ACH/Federal Reserve network:' }),
        addSpacing()
      )
      data.forEach((item, idx) => {
        sections.push(
          new Paragraph({ children: [new TextRun({ text: `Transfer ${idx + 1} :`, bold: true })] }),
          new Paragraph({ text: `  Receiving Bank    : ${item.bank.name}` }),
          new Paragraph({ text: `  ABA Routing No.   : ${item.aba}` }),
          new Paragraph({ text: `  Amount            : $ ${(Math.random() * 10000).toFixed(2)}` }),
          new Paragraph({ text: `  Purpose           : ${scenario}` }),
          addSpacing()
        )
      })
    }

    sections.push(
      new Paragraph({ text: 'Authorized by     : _______________' }),
      addSpacing(),
      new Paragraph({ text: 'Treasury Director : _______________' }),
      new Paragraph({ text: `Date              : ${dateStr}` })
    )
  }

  const doc = new Document({
    sections: [
      {
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: watermark, color: 'CCCCCC', size: 28, bold: true })
                ],
                spacing: { after: 400 }
              })
            ]
          })
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: footerText, color: '999999', size: 16 })
                ]
              })
            ]
          })
        },
        children: sections
      }
    ]
  })

  const blob = await Packer.toBlob(doc)
  saveAs(blob, `Test_Doc_${variant}_${selectedSITs.join('_')}.docx`)
}
