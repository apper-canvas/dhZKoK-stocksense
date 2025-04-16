import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Filter, 
  Plus,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import MainFeature from '../components/MainFeature'

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  
  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'furniture', name: 'Furniture' },
    { id: 'office', name: 'Office Supplies' },
    { id: 'clothing', name: 'Clothing' }
  ]
  
  const stats = [
    { 
      id: 1, 
      title: 'Total Items', 
      value: '1,248', 
      change: '+12%', 
      trend: 'up',
      icon: Package,
      color: 'primary'
    },
    { 
      id: 2, 
      title: 'Low Stock', 
      value: '28', 
      change: '-5%', 
      trend: 'down',
      icon: AlertTriangle,
      color: 'amber-500'
    },
    { 
      id: 3, 
      title: 'Incoming', 
      value: '156', 
      change: '+24%', 
      trend: 'up',
      icon: TrendingUp,
      color: 'secondary'
    },
    { 
      id: 4, 
      title: 'Outgoing', 
      value: '89', 
      change: '+7%', 
      trend: 'up',
      icon: TrendingDown,
      color: 'rose-500'
    }
  ]

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  const openAddItemModal = () => {
    setShowAddModal(true)
  }
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Inventory Dashboard</h1>
        <p className="text-surface-500 dark:text-surface-400">
          Track and manage your inventory across all locations
        </p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <motion.div 
            key={stat.id}
            className="card overflow-hidden"
            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: stat.id * 0.1 }}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-surface-500 dark:text-surface-400 text-sm mb-1">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <div className="flex items-center mt-2">
                  {stat.trend === 'up' ? (
                    <ArrowUpRight size={16} className="text-green-500 mr-1" />
                  ) : (
                    <ArrowDownRight size={16} className="text-red-500 mr-1" />
                  )}
                  <span className={`text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change} from last month
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}/10`}>
                <stat.icon size={24} className={`text-${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-surface-400" />
          </div>
          <input
            type="text"
            className="input-field pl-10"
            placeholder="Search inventory items..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <select 
              className="input-field appearance-none pr-10"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Filter size={18} className="text-surface-400" />
            </div>
          </div>
          
          <motion.button 
            className="btn btn-primary flex items-center gap-2"
            whileTap={{ scale: 0.95 }}
            onClick={openAddItemModal}
          >
            <Plus size={18} />
            <span>Add Item</span>
          </motion.button>
        </div>
      </div>
      
      {/* Main Feature */}
      <MainFeature 
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
      />
    </div>
  )
}

export default Home