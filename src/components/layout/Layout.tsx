import React, { useState } from 'react'
import TopBar from './TopBar'
import Sidebar from './Sidebar'
import BottomBanner from './BottomBanner'
import type { ModuleId } from '../../types/index'

// ─── Props ────────────────────────────────────────────────────────────────────
interface LayoutProps {
  activeModule: ModuleId
  onModuleChange: (id: ModuleId) => void
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({
  activeModule,
  onModuleChange,
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleModuleChange = (id: ModuleId) => {
    onModuleChange(id)
    setSidebarOpen(false)
  }

  return (
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      {/* ── Top Bar ────────────────────────────────────────────────────────── */}
      <TopBar onMenuToggle={() => setSidebarOpen((o) => !o)} menuOpen={sidebarOpen} />

      {/* ── Body: Sidebar + Content ────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Mobile backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 md:hidden"
            style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <Sidebar
          activeModule={activeModule}
          onModuleChange={handleModuleChange}
          isOpen={sidebarOpen}
        />

        {/* Main content area */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <main
            className="flex-1 overflow-y-auto"
            style={{ backgroundColor: 'var(--bg-base)' }}
            id="main-content"
            tabIndex={-1}
            aria-label="Main content"
          >
            <div className="max-w-[900px] mx-auto px-4 md:px-6 py-6">
              {children}
            </div>
          </main>
          <BottomBanner />
        </div>
      </div>
    </div>
  )
}

export default Layout
