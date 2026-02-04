import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, Filter, Star, ShoppingBag, Loader, Heart } from 'lucide-react'
import useCartStore from '../store/useCartStore'
import toast from 'react-hot-toast'

const Products = () => {
  const [searchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [addingToCart, setAddingToCart] = useState(null)
  
  const { addItem } = useCartStore()

  const categories = ['All', 'Men', 'Women', 'Unisex']

  const defaultProducts = [
    {
      id: '1',
      name: 'Midnight Rose',
      category: 'Women',
      price: 45000,
      rating: 4.8,
      reviewCount: 124,
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=600&fit=crop',
      images: ['https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=600&fit=crop'],
      description: 'A captivating blend of rose and vanilla',
      inStock: true,
      stockQuantity: 25
    },
    {
      id: '2',
      name: 'Ocean Breeze',
      category: 'Men',
      price: 50000,
      rating: 4.9,
      reviewCount: 98,
      image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500&h=600&fit=crop',
      images: ['https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500&h=600&fit=crop'],
      description: 'Fresh aquatic notes with woody undertones',
      inStock: true,
      stockQuantity: 30
    },
    {
      id: '3',
      name: 'Golden Amber',
      category: 'Unisex',
      price: 55000,
      rating: 4.7,
      reviewCount: 156,
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&h=600&fit=crop',
      images: ['https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&h=600&fit=crop'],
      description: 'Warm amber with hints of sandalwood',
      inStock: true,
      stockQuantity: 40
    },
    {
      id: '4',
      name: 'Lavender Dreams',
      category: 'Women',
      price: 42000,
      rating: 4.6,
      reviewCount: 87,
      image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59bd9?w=500&h=600&fit=crop',
      images: ['https://images.unsplash.com/photo-1588405748880-12d1d2a59bd9?w=500&h=600&fit=crop'],
      description: 'Soothing lavender with citrus notes',
      inStock: true,
      stockQuantity: 20
    },
    {
      id: '5',
      name: 'Black Oud',
      category: 'Men',
      price: 65000,
      rating: 5.0,
      reviewCount: 203,
      image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=500&h=600&fit=crop',
      images: ['https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=500&h=600&fit=crop'],
      description: 'Rich oud with spicy accents',
      inStock: true,
      stockQuantity: 15
    },
    {
      id: '6',
      name: 'Cherry Blossom',
      category: 'Women',
      price: 48000,
      rating: 4.8,
      reviewCount: 142,
      image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=500&h=600&fit=crop',
      images: ['https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=500&h=600&fit=crop'],
      description: 'Delicate floral with fruity notes',
      inStock: true,
      stockQuantity: 35
    },
    {
      id: '7',
      name: 'Leather & Spice',
      category: 'Men',
      price: 58000,
      rating: 4.7,
      reviewCount: 91,
      image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&h=600&fit=crop',
      images: ['https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&h=600&fit=crop'],
      description: 'Bold leather with warm spices',
      inStock: true,
      stockQuantity: 28
    },
    {
      id: '8',
      name: 'Citrus Burst',
      category: 'Unisex',
      price: 40000,
      rating: 4.5,
      reviewCount: 76,
      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&h=600&fit=crop',
      images: ['https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&h=600&fit=crop'],
      description: 'Energizing citrus blend',
      inStock: true,
      stockQuantity: 50
    }
  ]

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    const search = searchParams.get('search')
    if (search) {
      setSearchQuery(search)
    }
  }, [searchParams])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      // Try API first
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      const response = await fetch(`${API_URL}/products`)
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products || data || [])
      } else {
        throw new Error('API not available')
      }
    } catch (error) {
      // Use localStorage (admin products) or defaults
      const storedProducts = localStorage.getItem('adminProducts')
      if (storedProducts) {
        const adminProducts = JSON.parse(storedProducts)
        // Merge admin products with defaults, admin products take priority
        const merged = [...adminProducts]
        defaultProducts.forEach(dp => {
          if (!merged.find(p => p.id === dp.id)) {
            merged.push(dp)
          }
        })
        setProducts(merged.filter(p => p.inStock !== false))
      } else {
        setProducts(defaultProducts)
      }
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleAddToCart = async (product) => {
    setAddingToCart(product.id)
    await addItem({
      ...product,
      image: product.image || product.images?.[0]
    }, 1)
    setAddingToCart(null)
  }

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Collection</h1>
          <p className="text-xl text-primary-100">Discover your perfect fragrance</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search perfumes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 rounded-lg hover:border-primary-500 transition-colors">
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 text-gray-600">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader className="w-12 h-12 text-primary-600 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="card overflow-hidden group">
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.image || product.images?.[0] || 'https://via.placeholder.com/500'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.inStock === false && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold">
                          Out of Stock
                        </span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-primary-600">
                      {product.category}
                    </div>
                    {product.comparePrice && product.comparePrice > product.price && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Sale
                      </div>
                    )}
                  </div>
                </Link>
                <div className="p-6">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-xl font-semibold mb-2 hover:text-primary-600 transition-colors">{product.name}</h3>
                  </Link>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="ml-1 text-sm font-medium">{product.rating || 0}</span>
                    </div>
                    <span className="ml-2 text-sm text-gray-500">({product.reviewCount || 0} reviews)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-primary-600">{formatPrice(product.price)}</span>
                      {product.comparePrice && product.comparePrice > product.price && (
                        <span className="ml-2 text-sm text-gray-400 line-through">{formatPrice(product.comparePrice)}</span>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handleAddToCart(product)
                      }}
                      disabled={product.inStock === false || addingToCart === product.id}
                      className={`p-3 rounded-lg transition-colors ${
                        product.inStock !== false
                          ? 'bg-primary-600 text-white hover:bg-primary-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {addingToCart === product.id ? (
                        <Loader className="w-5 h-5 animate-spin" />
                      ) : (
                        <ShoppingBag className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 mb-4">No products found matching your criteria.</p>
            <button 
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All')
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Products
