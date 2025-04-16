import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="mb-6 relative">
          <div className="text-9xl font-bold text-primary/10 dark:text-primary/5">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl font-bold text-surface-800 dark:text-surface-100">Page Not Found</div>
          </div>
        </div>
        
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <motion.button
              className="btn btn-primary w-full sm:w-auto flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home size={18} />
              <span>Go to Dashboard</span>
            </motion.button>
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="btn btn-outline w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound