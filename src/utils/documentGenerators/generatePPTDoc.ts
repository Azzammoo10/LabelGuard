import pptxgen from 'pptxgenjs'
import type { GeneratedData } from './index'
import type { VariantType } from '../../components/modules/TestDocuments/index'

const PRIMARY_COLOR = '00008F'
const RED_COLOR = 'CC0000'

const SIT_META: Record<string, { name: string, desc: string, label: string }> = {
  'iban': { name: 'IBAN (International Bank Account Number)', desc: 'Recherche de formats IBAN standards', label: 'Confidentiel' },
  'credit-card': { name: 'Credit Card Number', desc: 'Détection de numéros de cartes de crédit via algorithme de Luhn', label: 'Secret' },
  'eu-debit-card': { name: 'EU Debit Card Number', desc: 'Détection de cartes de débit européennes', label: 'Secret' },
  'swift-code': { name: 'SWIFT Code', desc: 'Codes d\'identification bancaire internationale', label: 'Confidentiel' },
  'aba-routing': { name: 'ABA Routing Number', desc: 'Numéros de routage bancaire américains', label: 'Confidentiel' }
}

export async function generatePPTDoc(
  selectedSITs: string[], 
  dataArrays: GeneratedData, 
  language: 'fr' | 'en',
  variant: VariantType
): Promise<void> {
  const isFr = language === 'fr'
  const pptx = new pptxgen()
  
  pptx.layout = 'LAYOUT_16x9'
  
  const watermark = isFr ? 'DOCUMENT DE TEST — DONNÉES FICTIVES' : 'TEST DOCUMENT — FICTIONAL DATA'
  const footerText = `OneTrust CM16 | ${watermark}`

  // Helper for Slide Backgrounds & Footers
  const addSlideMaster = (slide: any) => {
    slide.addText(footerText, { x: 0.5, y: '92%', w: '90%', fontSize: 10, color: '999999', align: 'center' })
  }

  // Cover Slide
  const coverSlide = pptx.addSlide()
  coverSlide.addText('AXA OneTrust', { x: 1, y: 2, w: '80%', fontSize: 44, bold: true, color: PRIMARY_COLOR })
  coverSlide.addText('CM16 Microsoft Purview Auto-Labeling Test', { x: 1, y: 3, w: '80%', fontSize: 24, color: '666666' })
  coverSlide.addText(watermark, { x: 1, y: 4.5, w: '80%', fontSize: 20, bold: true, color: RED_COLOR })
  addSlideMaster(coverSlide)

  // Notice Slide
  const noticeSlide = pptx.addSlide()
  addSlideMaster(noticeSlide)
  noticeSlide.addText(isFr ? 'Notice de Confidentialité' : 'Confidentiality Notice', { x: 0.5, y: 0.5, w: '90%', fontSize: 28, bold: true, color: PRIMARY_COLOR })
  noticeSlide.addText(
    isFr 
      ? 'Les données présentées dans ce document sont entièrement fictives et synthétiques. Elles ont été générées algorithmiquement dans le cadre du projet OneTrust CM16 d\'AXA pour valider le bon fonctionnement de Microsoft Purview Auto-Labeling. Aucune donnée réelle n\'est utilisée.'
      : 'The data presented in this document is entirely fictional and synthetic. It was algorithmically generated as part of AXA\'s OneTrust CM16 project to validate Microsoft Purview Auto-Labeling. No real data is used.',
    { x: 0.5, y: 2.0, w: '90%', fontSize: 18, color: '333333' }
  )

  const occurrences = variant === 'A' ? 1 : 10

  for (const sit of selectedSITs) {
    const meta = SIT_META[sit]
    const data = dataArrays[sit as keyof GeneratedData]
    if (!data) continue

    // Slide A - Context
    const ctxSlide = pptx.addSlide()
    addSlideMaster(ctxSlide)
    ctxSlide.addText(meta.name, { x: 0.5, y: 0.5, w: '90%', fontSize: 28, bold: true, color: PRIMARY_COLOR })
    
    ctxSlide.addText('Contexte', { x: 0.5, y: 1.5, w: '90%', fontSize: 16, bold: true, color: '333333' })
    ctxSlide.addText(
      `Dans le cadre du projet OneTrust CM16, ce document présente les données de test pour la validation de la détection automatique de ${meta.name} par Microsoft Purview.`,
      { x: 0.5, y: 1.9, w: '90%', fontSize: 14, color: '555555' }
    )

    ctxSlide.addText('Politique appliquée', { x: 0.5, y: 2.7, w: '90%', fontSize: 16, bold: true, color: '333333' })
    ctxSlide.addText(
      `• Détection : ${meta.desc}\n• Niveau de confiance : High\n• Occurrence(s) incluse(s) : ${occurrences}\n• Label attendu : ${meta.label}`,
      { x: 0.5, y: 3.1, w: '90%', fontSize: 14, color: '555555' }
    )

    ctxSlide.addText('Instruction de test', { x: 0.5, y: 4.2, w: '90%', fontSize: 16, bold: true, color: '333333' })
    ctxSlide.addText(
      `Copiez les données de la slide suivante dans un document Word ou Outlook, puis vérifiez que Purview applique automatiquement le label ${meta.label}.`,
      { x: 0.5, y: 4.6, w: '90%', fontSize: 14, color: '555555' }
    )

    // Slide B - Data
    const dataSlide = pptx.addSlide()
    addSlideMaster(dataSlide)
    dataSlide.addText(`Données de Test — ${meta.name}`, { x: 0.5, y: 0.5, w: '90%', fontSize: 28, bold: true, color: PRIMARY_COLOR })
    
    // Bottom Disclaimer
    dataSlide.addText('Données synthétiques — Test CM16 — Ne pas utiliser hors périmètre autorisé', { x: 0.5, y: 5.0, w: '90%', fontSize: 11, italic: true, color: '888888' })

    const formatSITText = (item: any): string => {
      if (sit === 'iban') return `IBAN: ${item.iban}\nBénéf: ${item.beneficiary}`
      if (sit === 'credit-card') return `Carte de crédit: ${item.cardNumber}\nExpire: ${item.expiry}`
      if (sit === 'eu-debit-card') return `Carte de débit: ${item.cardNumber}\nEmployé: ${item.holder}`
      if (sit === 'swift-code') return `Code SWIFT/BIC: ${item.swift}\nBanque: ${item.bank.name}`
      if (sit === 'aba-routing') return `ABA Routing Number: ${item.aba}\nBanque: ${item.bank.name}`
      return ''
    }

    if (variant === 'A') {
      const item = data[0]
      let text = `Occurrence 1 de 1 :\n─────────────────────────────\n`
      if (sit === 'iban') text += `Bénéficiaire : ${(item as any).beneficiary}\nIBAN          : ${(item as any).iban}\nSWIFT         : ${(item as any).swift}\nMontant       : ${(item as any).amount} EUR\nRéférence     : ${(item as any).reference}`
      else if (sit === 'credit-card') text += `Titulaire     : ${(item as any).cardholder}\nCarte de crédit : ${(item as any).cardNumber}\nExpiration    : ${(item as any).expiry}\nMontant       : ${(item as any).amount} EUR`
      else if (sit === 'eu-debit-card') text += `Titulaire     : ${(item as any).holder}\nCarte de débit : ${(item as any).cardNumber}\nPlafond       : ${(item as any).limit} EUR`
      else if (sit === 'swift-code') text += `Banque        : ${(item as any).bank.name}\nPays          : ${(item as any).country}\nCode SWIFT/BIC: ${(item as any).swift}`
      else if (sit === 'aba-routing') text += `Banque        : ${(item as any).bank.name}\nABA Routing Number: ${(item as any).aba}\nVille         : ${(item as any).city}`
      
      text += `\n─────────────────────────────`
      
      dataSlide.addText(text, { x: 0.5, y: 1.5, w: '80%', h: 3, fontSize: 14, color: '333333', fontFace: 'Courier New', fill: { color: 'F5F5F5' }, fit: 'shrink' })
    } else {
      // Variant B - 10 occurrences in 2 columns
      const leftItems = data.slice(0, 5)
      const rightItems = data.slice(5, 10)

      let leftText = ''
      leftItems.forEach((item, idx) => {
        leftText += `Occurrence ${idx + 1}\n──────────\n${formatSITText(item)}\n\n`
      })

      let rightText = ''
      rightItems.forEach((item, idx) => {
        rightText += `Occurrence ${idx + 6}\n──────────\n${formatSITText(item)}\n\n`
      })

      dataSlide.addText(leftText, { x: 0.5, y: 1.2, w: '45%', h: 4.0, fontSize: 12, color: '333333', fontFace: 'Courier New', fit: 'shrink' })
      dataSlide.addText(rightText, { x: 5.2, y: 1.2, w: '45%', h: 4.0, fontSize: 12, color: '333333', fontFace: 'Courier New', fit: 'shrink' })
    }
  }

  // Summary Slide
  const summarySlide = pptx.addSlide()
  addSlideMaster(summarySlide)
  summarySlide.addText('Récapitulatif', { x: 0.5, y: 0.5, w: '90%', fontSize: 28, bold: true, color: PRIMARY_COLOR })
  
  const siteNames = selectedSITs.map(s => SIT_META[s]?.name).join(', ')
  const expectedLabels = selectedSITs.map(s => SIT_META[s]?.label)
  const isSecret = expectedLabels.includes('Secret')
  const finalLabel = isSecret ? 'Secret' : 'Confidentiel'

  const summText = `Types testés : ${siteNames}\nVariante     : ${variant}\nOccurrences  : ${occurrences} par type\nLabel attendu: ${finalLabel}\n\nRéférence projet : OneTrust CM16\nÉquipe           : AXA DLP Team\nDate             : ${new Date().toLocaleDateString('fr-FR')}`
  summarySlide.addText(summText, { x: 0.5, y: 1.5, w: '90%', fontSize: 16, color: '333333', lineSpacing: 24 })

  summarySlide.addText('Ce document a été généré automatiquement par la plateforme de test AXA CM16.\nToutes les données sont fictives.', { x: 0.5, y: 4.5, w: '90%', fontSize: 12, italic: true, color: '666666' })

  await pptx.writeFile({ fileName: `Test_Doc_${variant}_${selectedSITs.join('_')}.pptx` })
}
