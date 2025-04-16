import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sun, Moon, Package, BarChart3, Truck, Settings, LogOut, Menu, X } from 'lucide-react'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode')
    return savedMode ? JSON.parse(savedMode) : window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])
  
  const toggleDarkMode = () => setDarkMode(!darkMode)
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 lg:hidden"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold text-xl">Stock<span className="text-accent">Sense</span></span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
              whileTap={{ scale: 0.9 }}
              whileHover={{ rotate: 15 }}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
              JS
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <motion.aside 
          className={`fixed lg:static inset-0 z-20 w-64 bg-white dark:bg-surface-800 border-r border-surface-200 dark:border-surface-700 transform transition-transform duration-200 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
          initial={false}
        >
          <div className="flex flex-col h-full">
            <div className="p-4 flex justify-between items-center lg:hidden">
              <span className="text-primary font-bold text-xl">Stock<span className="text-accent">Sense</span></span>
              <button 
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <nav className="flex-1 p-4 space-y-1">
              <a href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary dark:bg-primary/20">
                <BarChart3 size={20} />
                <span>Dashboard</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700">
                <Package size={20} />
                <span>Inventory</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700">
                <Truck size={20} />
                <span>Transactions</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700">
                <Settings size={20} />
                <span>Settings</span>
              </a>
            </nav>
            
            <div className="p-4 border-t border-surface-200 dark:border-surface-700">
              <button className="flex w-full items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 text-red-500">
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </motion.aside>
        
        {/* Backdrop for mobile sidebar */}
        {isSidebarOpen && (
          <motion.div 
            className="fixed inset-0 z-10 bg-surface-900/50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
          />
        )}
        
        {/* Main content */}
        <main className="flex-1 overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App