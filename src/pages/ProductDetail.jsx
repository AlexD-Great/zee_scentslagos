import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingBag, Heart, Star, Minus, Plus, ArrowLeft, Truck, Shield, RefreshCw, Loader } from 'lucide-react'
import useCartStore from '../store/useCartStore'
import useAuthStore from '../store/useAuthStore' // Added import
import { productsAPI, wishlistAPI } from '../utils/api' // Added wishlistAPI
import toast from 'react-hot-toast'
import RecommendedProducts from '../components/RecommendedProducts'
import ProductReviews from '../components/ProductReviews' // Added import

const ProductDetail = () => {
  const { id } = useParams()
  const { addItem, loading: cartLoading } = useCartStore()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    setLoading(true)
    try {
      const response = await productsAPI.getById(id)
      setProduct(response.data || response.data.product) // Handle response format flexibility
      setError(null)
    } catch (err) {
      console.error('Error fetching product:', err)
      setError('Failed to load product. Please try again.')
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

  const handleAddToCart = async () => {
    await addItem(product, quantity)
  }

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1 && newQuantity <= (product?.stockQuantity || 10)) {
      setQuantity(newQuantity)
    }
  }

  /* Removed duplicate state declarations */

  const toggleWishlist = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to use wishlist');
      return;
    }

    try {
      if (isWishlisted) {
        await wishlistAPI.remove(product.id);
        toast.success('Removed from wishlist');
      } else {
        await wishlistAPI.add(product.id);
        toast.success('Added to wishlist');
      }
      setIsWishlisted(!isWishlisted);
    } catch (error) {
      toast.error('Failed to update wishlist');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-12 h-12 text-primary-600 animate-spin" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <Link to="/products" className="btn-primary">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Products
        </Link>
      </div>
    )
  }

  const images = product.images?.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600']

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/products"
          className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Products
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {images.length > 1 && (
                <div className="flex space-x-4">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index
                        ? 'border-primary-600'
                        : 'border-transparent hover:border-gray-300'
                        }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-primary-600 font-medium mb-2">{product.category}</p>
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.rating || 0)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                          }`}
                      />
                    ))}
                    <span className="ml-2 text-gray-600">
                      ({product.reviewCount || 0} reviews)
                    </span>
                  </div>
                </div>

                <div className="flex items-baseline space-x-4">
                  <span className="text-3xl font-bold text-primary-600">
                    {formatPrice(product.price)}
                  </span>
                  {product.comparePrice && product.comparePrice > product.price && (
                    <span className="text-xl text-gray-400 line-through">
                      {formatPrice(product.comparePrice)}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>

              {product.size && (
                <div>
                  <p className="font-medium text-gray-900 mb-2">Size</p>
                  <span className="inline-block px-4 py-2 border border-primary-600 text-primary-600 rounded-lg font-medium">
                    {product.size}
                  </span>
                </div>
              )}

              {product.notes && (
                <div className="space-y-3">
                  <p className="font-medium text-gray-900">Fragrance Notes</p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 mb-1">Top Notes</p>
                      <p className="text-gray-800">{product.notes.top?.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Heart Notes</p>
                      <p className="text-gray-800">{product.notes.middle?.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Base Notes</p>
                      <p className="text-gray-800">{product.notes.base?.join(', ')}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center space-x-4 mb-6">
                  <p className="font-medium text-gray-900">Quantity</p>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-6 py-3 font-semibold text-lg">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= (product.stockQuantity || 10)}
                      className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className={`text-sm ${product.inStock !== false ? 'text-green-600' : 'text-red-600'}`}>
                    {product.inStock !== false ? `${product.stockQuantity || 50} in stock` : 'Out of stock'}
                  </span>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={cartLoading || product.inStock === false}
                    className="flex-1 btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {cartLoading ? (
                      <Loader className="w-5 h-5 animate-spin mr-2" />
                    ) : (
                      <ShoppingBag className="w-5 h-5 mr-2" />
                    )}
                    Add to Cart
                  </button>
                  <button
                    onClick={toggleWishlist}
                    className={`p-4 rounded-lg border-2 transition-colors ${isWishlisted
                      ? 'bg-red-50 border-red-200 text-red-600'
                      : 'border-gray-300 text-gray-600 hover:border-red-200 hover:text-red-600'
                      }`}
                  >
                    <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <Truck className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Free Shipping</p>
                  <p className="text-xs text-gray-500">On orders over ₦50,000</p>
                </div>
                <div className="text-center">
                  <Shield className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Authentic</p>
                  <p className="text-xs text-gray-500">100% genuine products</p>
                </div>
                <div className="text-center">
                  <RefreshCw className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Easy Returns</p>
                  <p className="text-xs text-gray-500">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ProductReviews productId={id} />

        <RecommendedProducts />
      </div>
    </div>
  )
}
export default ProductDetail
