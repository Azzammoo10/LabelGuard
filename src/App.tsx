import { useState } from 'react'
import Layout from './components/layout/Layout'
import About from './components/modules/About/About'
import SITPage from './components/modules/AutoLabeling/SITPage'
import TestDocuments from './components/modules/TestDocuments/index'
import type { ModuleId } from './types/index'

function App() {
  const [activeModule, setActiveModule] = useState<ModuleId>('iban')

  const isSITModule = ['iban', 'credit-card', 'eu-debit-card', 'swift-code', 'aba-routing'].includes(activeModule)

  return (
    <Layout activeModule={activeModule} onModuleChange={setActiveModule}>
      {isSITModule && <SITPage key={activeModule} sitId={activeModule} />}
      {activeModule === 'test-documents' && <TestDocuments />}
      {activeModule === 'about' && <About />}
    </Layout>
  )
}

export default App
