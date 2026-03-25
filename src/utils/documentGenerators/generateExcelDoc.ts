import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import type { GeneratedData } from './index'
import type { VariantType } from '../../components/modules/TestDocuments/index'

function styleHeaderRow(row: ExcelJS.Row) {
  row.font = { bold: true, color: { argb: 'FFFFFFFF' } }
  row.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF00008F' } // AXA Blue
  }
  row.alignment = { vertical: 'middle', horizontal: 'center' }
}

export async function generateExcelDoc(
  selectedSITs: string[], 
  dataArrays: GeneratedData, 
  language: 'fr' | 'en',
  variant: VariantType
): Promise<void> {
  const isFr = language === 'fr'
  const workbook = new ExcelJS.Workbook()
  
  // README Sheet
  const readmeSheet = workbook.addWorksheet('README')
  readmeSheet.getColumn(1).width = 80
  
  readmeSheet.addRow(['===== AXA — OneTrust CM16 =====']).font = { bold: true, size: 16 }
  readmeSheet.addRow([''])
  readmeSheet.addRow(['=== TEST DOCUMENT — FICTIONAL DATA ===']).font = { bold: true, color: { argb: 'FFCC0000' } }
  readmeSheet.addRow([''])
  readmeSheet.addRow([isFr ? 'Ce fichier contient uniquement des données synthétiques générées pour valider Microsoft Purview.' : 'This file contains only synthetic data generated to validate Microsoft Purview.'])
  readmeSheet.addRow([isFr ? 'Aucune donnée réelle n\'est incluse.' : 'No real data is included.'])
  
  // IBAN Sheet
  if (selectedSITs.includes('iban') && dataArrays['iban']) {
    const sheet = workbook.addWorksheet('Virements_IBAN')
    sheet.columns = [
      { header: '#', key: 'index', width: 5 },
      { header: isFr ? 'Bénéficiaire' : 'Beneficiary', key: 'beneficiary', width: 30 },
      { header: isFr ? 'Banque' : 'Bank', key: 'bank_name', width: 25 },
      { header: 'IBAN :', key: 'iban', width: 35 }, // Keyword label
      { header: 'SWIFT/BIC', key: 'swift', width: 15 },
      { header: isFr ? 'Montant' : 'Amount', key: 'amount', width: 15 }
    ]
    styleHeaderRow(sheet.getRow(1))
    
    dataArrays['iban'].forEach(d => sheet.addRow({ ...d, bank_name: d.bank.name }))
    sheet.views = [{ state: 'frozen', ySplit: 1 }]
  }

  // Credit Card Sheet
  if (selectedSITs.includes('credit-card') && dataArrays['credit-card']) {
    const sheet = workbook.addWorksheet('Cartes_Credit')
    sheet.columns = [
      { header: '#', key: 'index', width: 5 },
      { header: isFr ? 'Titulaire' : 'Cardholder', key: 'cardholder', width: 25 },
      { header: isFr ? 'Carte de crédit :' : 'Credit card:', key: 'cardNumber', width: 25 }, // Keyword label
      { header: isFr ? 'Expiration' : 'Expiry', key: 'expiry', width: 12 },
      { header: isFr ? 'Montant' : 'Amount', key: 'amount', width: 15 }
    ]
    styleHeaderRow(sheet.getRow(1))
    
    dataArrays['credit-card'].forEach(d => sheet.addRow(d))
    sheet.views = [{ state: 'frozen', ySplit: 1 }]
  }

  // EU Debit Card Sheet
  if (selectedSITs.includes('eu-debit-card') && dataArrays['eu-debit-card']) {
    const sheet = workbook.addWorksheet('Plf_Debit_UE')
    sheet.columns = [
      { header: '#', key: 'index', width: 5 },
      { header: isFr ? 'Employé' : 'Employee', key: 'holder', width: 25 },
      { header: isFr ? 'Carte de débit :' : 'Debit card:', key: 'cardNumber', width: 25 }, // Keyword label
      { header: isFr ? 'Plafond' : 'Limit', key: 'limit', width: 15 }
    ]
    styleHeaderRow(sheet.getRow(1))
    
    dataArrays['eu-debit-card'].forEach(d => sheet.addRow(d))
    sheet.views = [{ state: 'frozen', ySplit: 1 }]
  }

  // SWIFT Sheet
  if (selectedSITs.includes('swift-code') && dataArrays['swift-code']) {
    const sheet = workbook.addWorksheet('SWIFT_BIC')
    sheet.columns = [
      { header: '#', key: 'index', width: 5 },
      { header: isFr ? 'Banque' : 'Bank', key: 'bank_name', width: 25 },
      { header: isFr ? 'Pays' : 'Country', key: 'country', width: 20 },
      { header: isFr ? 'SWIFT/BIC :' : 'BIC:', key: 'swift', width: 15 } // Keyword label
    ]
    styleHeaderRow(sheet.getRow(1))
    
    dataArrays['swift-code'].forEach(d => sheet.addRow({ ...d, bank_name: d.bank.name }))
    sheet.views = [{ state: 'frozen', ySplit: 1 }]
  }

  // ABA Sheet
  if (selectedSITs.includes('aba-routing') && dataArrays['aba-routing']) {
    const sheet = workbook.addWorksheet('ABA_Routing')
    sheet.columns = [
      { header: '#', key: 'index', width: 5 },
      { header: isFr ? 'Banque' : 'Bank', key: 'bank_name', width: 25 },
      { header: isFr ? 'Ville' : 'City', key: 'city', width: 20 },
      { header: 'ABA Routing Number :', key: 'aba', width: 20 } // Keyword label
    ]
    styleHeaderRow(sheet.getRow(1))
    
    dataArrays['aba-routing'].forEach(d => sheet.addRow({ ...d, bank_name: d.bank.name }))
    sheet.views = [{ state: 'frozen', ySplit: 1 }]
  }

  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  saveAs(blob, `Test_Doc_${variant}_${selectedSITs.join('_')}.xlsx`)
}
