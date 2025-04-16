import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Package, 
  Truck, 
  ArrowRight, 
  Plus, 
  Minus, 
  X, 
  Check, 
  AlertCircle, 
  Loader2,
  BarChart3,
  Calendar,
  Clock
} from 'lucide-react'
import { format } from 'date-fns'

const MainFeature = () => {
  // State for inventory items
  const [inventoryItems, setInventoryItems] = useState([
    { 
      id: 1, 
      name: 'Wireless Keyboard', 
      sku: 'KB-WL-001', 
      category: 'Electronics',
      quantity: 24,
      location: 'Warehouse A',
      status: 'In Stock',
      lastUpdated: new Date('2023-11-15')
    },
    { 
      id: 2, 
      name: 'Office Chair', 
      sku: 'FN-CH-102', 
      category: 'Furniture',
      quantity: 8,
      location: 'Warehouse B',
      status: 'Low Stock',
      lastUpdated: new Date('2023-11-20')
    },
    { 
      id: 3, 
      name: 'Laptop Stand', 
      sku: 'AC-LS-034', 
      category: 'Office Supplies',
      quantity: 15,
      location: 'Warehouse A',
      status: 'In Stock',
      lastUpdated: new Date('2023-11-18')
    },
    { 
      id: 4, 
      name: 'Wireless Mouse', 
      sku: 'KB-WM-022', 
      category: 'Electronics',
      quantity: 5,
      location: 'Warehouse C',
      status: 'Low Stock',
      lastUpdated: new Date('2023-11-22')
    },
    { 
      id: 5, 
      name: 'Monitor 24"', 
      sku: 'EL-MN-056', 
      category: 'Electronics',
      quantity: 12,
      location: 'Warehouse A',
      status: 'In Stock',
      lastUpdated: new Date('2023-11-10')
    }
  ])
  
  // State for transaction modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [transactionType, setTransactionType] = useState('add')
  const [transactionQuantity, setTransactionQuantity] = useState(1)
  const [transactionLocation, setTransactionLocation] = useState('')
  const [transactionNotes, setTransactionNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [transactionSuccess, setTransactionSuccess] = useState(false)
  
  // Locations list
  const locations = ['Warehouse A', 'Warehouse B', 'Warehouse C', 'Store Front']
  
  // Open transaction modal
  const openTransactionModal = (item, type) => {
    setSelectedItem(item)
    setTransactionType(type)
    setTransactionQuantity(1)
    setTransactionLocation(item.location)
    setTransactionNotes('')
    setFormErrors({})
    setTransactionSuccess(false)
    setIsModalOpen(true)
  }
  
  // Close transaction modal
  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => {
      setSelectedItem(null)
    }, 300)
  }
  
  // Validate form
  const validateForm = () => {
    const errors = {}
    
    if (transactionQuantity <= 0) {
      errors.quantity = 'Quantity must be greater than 0'
    }
    
    if (transactionType === 'remove' && transactionQuantity > selectedItem.quantity) {
      errors.quantity = `Cannot remove more than available quantity (${selectedItem.quantity})`
    }
    
    if (!transactionLocation) {
      errors.location = 'Please select a location'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }
  
  // Handle transaction submission
  const handleSubmitTransaction = (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      const updatedItems = inventoryItems.map(item => {
        if (item.id === selectedItem.id) {
          const newQuantity = transactionType === 'add' 
            ? item.quantity + transactionQuantity 
            : item.quantity - transactionQuantity
          
          const newStatus = newQuantity <= 10 ? 'Low Stock' : 'In Stock'
          
          return {
            ...item,
            quantity: newQuantity,
            location: transactionLocation,
            status: newStatus,
            lastUpdated: new Date()
          }
        }
        return item
      })
      
      setInventoryItems(updatedItems)
      setIsSubmitting(false)
      setTransactionSuccess(true)
      
      // Close modal after showing success message
      setTimeout(() => {
        closeModal()
      }, 1500)
    }, 1000)
  }
  
  // Get status badge class
  const getStatusBadge = (status) => {
    switch(status) {
      case 'In Stock':
        return 'badge-secondary'
      case 'Low Stock':
        return 'badge-warning'
      case 'Out of Stock':
        return 'badge-danger'
      default:
        return 'badge-primary'
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Current Inventory</h2>
        <div className="flex items-center gap-2 text-sm text-surface-500">
          <Clock size={14} />
          <span>Last updated: {format(new Date(), 'MMM d, yyyy h:mm a')}</span>
        </div>
      </div>
      
      {/* Inventory Table */}
      <div className="overflow-x-auto rounded-xl border border-surface-200 dark:border-surface-700">
        <table className="w-full">
          <thead className="bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Item</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">SKU</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Category</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Quantity</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Location</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Last Updated</th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-surface-800 divide-y divide-surface-200 dark:divide-surface-700">
            {inventoryItems.map((item) => (
              <motion.tr 
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="hover:bg-surface-50 dark:hover:bg-surface-700/50"
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                      <Package size={18} className="text-primary" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium">{item.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">{item.sku}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">{item.category}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{item.quantity}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">{item.location}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`badge ${getStatusBadge(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-surface-500 dark:text-surface-400">
                  {format(item.lastUpdated, 'MMM d, yyyy')}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-1.5 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                      onClick={() => openTransactionModal(item, 'add')}
                    >
                      <Plus size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                      onClick={() => openTransactionModal(item, 'remove')}
                      disabled={item.quantity <= 0}
                    >
                      <Minus size={16} />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Transaction Modal */}
      <AnimatePresence>
        {isModalOpen && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-900/50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-surface-800 rounded-xl shadow-soft max-w-md w-full p-0 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-primary text-white p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">
                    {transactionType === 'add' ? 'Add Stock' : 'Remove Stock'}
                  </h3>
                  <button 
                    onClick={closeModal}
                    className="p-1 rounded-full hover:bg-white/20"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              
              {/* Modal Content */}
              <div className="p-6">
                {transactionSuccess ? (
                  <div className="text-center py-6">
                    <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                      <Check size={32} className="text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Transaction Complete</h3>
                    <p className="text-surface-500 dark:text-surface-400">
                      Inventory has been successfully updated
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitTransaction}>
                    <div className="mb-6">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-100 dark:bg-surface-700/50 mb-4">
                        <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                          <Package size={18} className="text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{selectedItem.name}</div>
                          <div className="text-sm text-surface-500 dark:text-surface-400">
                            {selectedItem.sku} • Current Qty: {selectedItem.quantity}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Quantity to {transactionType === 'add' ? 'Add' : 'Remove'}
                          </label>
                          <div className="flex">
                            <button
                              type="button"
                              className="px-3 py-2 bg-surface-200 dark:bg-surface-700 rounded-l-lg"
                              onClick={() => setTransactionQuantity(Math.max(1, transactionQuantity - 1))}
                            >
                              <Minus size={16} />
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={transactionQuantity}
                              onChange={(e) => setTransactionQuantity(parseInt(e.target.value) || 0)}
                              className="input-field rounded-none text-center w-20"
                            />
                            <button
                              type="button"
                              className="px-3 py-2 bg-surface-200 dark:bg-surface-700 rounded-r-lg"
                              onClick={() => setTransactionQuantity(transactionQuantity + 1)}
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          {formErrors.quantity && (
                            <p className="mt-1 text-sm text-red-500">{formErrors.quantity}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Location
                          </label>
                          <select
                            value={transactionLocation}
                            onChange={(e) => setTransactionLocation(e.target.value)}
                            className="input-field"
                          >
                            <option value="">Select location</option>
                            {locations.map((location) => (
                              <option key={location} value={location}>
                                {location}
                              </option>
                            ))}
                          </select>
                          {formErrors.location && (
                            <p className="mt-1 text-sm text-red-500">{formErrors.location}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Notes (Optional)
                          </label>
                          <textarea
                            value={transactionNotes}
                            onChange={(e) => setTransactionNotes(e.target.value)}
                            className="input-field min-h-[80px]"
                            placeholder="Add any additional information..."
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="btn btn-outline"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className={`btn ${transactionType === 'add' ? 'bg-green-600 hover:bg-green-700' : 'bg-amber-600 hover:bg-amber-700'} text-white`}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <Loader2 size={16} className="animate-spin" />
                            <span>Processing...</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            {transactionType === 'add' ? <Plus size={16} /> : <Minus size={16} />}
                            <span>
                              {transactionType === 'add' ? 'Add Stock' : 'Remove Stock'}
                            </span>
                          </div>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Empty State (shown when no inventory items) */}
      {inventoryItems.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-surface-200 dark:border-surface-700 rounded-xl">
          <div className="mx-auto w-16 h-16 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center mb-4">
            <Package size={24} className="text-surface-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">No inventory items</h3>
          <p className="text-surface-500 dark:text-surface-400 max-w-md mx-auto mb-6">
            You haven't added any inventory items yet. Start by adding your first item to track.
          </p>
          <button className="btn btn-primary">
            <Plus size={18} className="mr-2" />
            Add First Item
          </button>
        </div>
      )}
    </div>
  )
}

export default MainFeature