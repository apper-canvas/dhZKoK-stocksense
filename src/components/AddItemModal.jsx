import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Plus, 
  Loader2, 
  Check, 
  AlertTriangle, 
  Package,
  Tag
} from 'lucide-react'

const AddItemModal = ({ isOpen, onClose, onAddItem, categories, locations }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    quantity: 1,
    location: ''
  })
  
  // Loading and error states
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState({})
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    let processedValue = value
    
    // Convert quantity to number
    if (name === 'quantity') {
      processedValue = parseInt(value) || 0
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }))
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }
  
  // Generate a SKU based on category and name
  const generateSKU = () => {
    if (!formData.category || !formData.name) {
      return
    }
    
    const categoryPrefix = formData.category.substring(0, 2).toUpperCase()
    const namePrefix = formData.name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2)
    const randomNum = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0')
      
    const newSKU = `${categoryPrefix}-${namePrefix}-${randomNum}`
    
    setFormData(prev => ({
      ...prev,
      sku: newSKU
    }))
  }
  
  // Validate form
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Item name is required'
    }
    
    if (!formData.sku.trim()) {
      newErrors.sku = 'SKU is required'
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category'
    }
    
    if (formData.quantity <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0'
    }
    
    if (!formData.location) {
      newErrors.location = 'Please select a location'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      onAddItem(formData)
      setIsSubmitting(false)
      setSuccess(true)
      
      // Reset and close after showing success
      setTimeout(() => {
        resetForm()
        onClose()
      }, 1500)
    }, 1000)
  }
  
  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      name: '',
      sku: '',
      category: '',
      quantity: 1,
      location: ''
    })
    setErrors({})
    setSuccess(false)
  }
  
  // Close modal and reset form
  const handleClose = () => {
    if (!isSubmitting) {
      onClose()
      setTimeout(resetForm, 300)
    }
  }
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-900/50"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-surface-800 rounded-xl shadow-soft max-w-lg w-full p-0 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-primary text-white p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Add New Inventory Item</h3>
                <button 
                  onClick={handleClose}
                  className="p-1 rounded-full hover:bg-white/20"
                  disabled={isSubmitting}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-6">
              {success ? (
                <div className="text-center py-6">
                  <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                    <Check size={32} className="text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Item Added Successfully</h3>
                  <p className="text-surface-500 dark:text-surface-400">
                    The new item has been added to your inventory
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Item Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`input-field ${errors.name ? 'border-red-500 dark:border-red-500' : ''}`}
                        placeholder="Enter item name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                          <AlertTriangle size={14} />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        SKU (Stock Keeping Unit) *
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          name="sku"
                          value={formData.sku}
                          onChange={handleChange}
                          className={`input-field flex-1 ${errors.sku ? 'border-red-500 dark:border-red-500' : ''}`}
                          placeholder="e.g. EL-KB-001"
                        />
                        <button
                          type="button"
                          onClick={generateSKU}
                          className="btn btn-outline flex items-center gap-1 text-sm"
                        >
                          <Tag size={14} />
                          <span>Generate</span>
                        </button>
                      </div>
                      {errors.sku ? (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                          <AlertTriangle size={14} />
                          <span>{errors.sku}</span>
                        </p>
                      ) : (
                        <p className="mt-1 text-xs text-surface-500">
                          Unique identifier for inventory tracking
                        </p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Category *
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className={`input-field ${errors.category ? 'border-red-500 dark:border-red-500' : ''}`}
                        >
                          <option value="">Select category</option>
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                        {errors.category && (
                          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                            <AlertTriangle size={14} />
                            <span>{errors.category}</span>
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Initial Quantity *
                        </label>
                        <input
                          type="number"
                          name="quantity"
                          min="1"
                          value={formData.quantity}
                          onChange={handleChange}
                          className={`input-field ${errors.quantity ? 'border-red-500 dark:border-red-500' : ''}`}
                        />
                        {errors.quantity && (
                          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                            <AlertTriangle size={14} />
                            <span>{errors.quantity}</span>
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Storage Location *
                      </label>
                      <select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className={`input-field ${errors.location ? 'border-red-500 dark:border-red-500' : ''}`}
                      >
                        <option value="">Select location</option>
                        {locations.map((location) => (
                          <option key={location} value={location}>
                            {location}
                          </option>
                        ))}
                      </select>
                      {errors.location && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                          <AlertTriangle size={14} />
                          <span>{errors.location}</span>
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="btn btn-outline"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <Loader2 size={16} className="animate-spin" />
                          <span>Processing...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Plus size={16} />
                          <span>Add Item</span>
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
  )
}

export default AddItemModal