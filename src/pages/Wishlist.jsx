import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, ShoppingBag, Trash2, Loader, ArrowLeft } from 'lucide-react'
import useAuthStore from '../store/useAuthStore'
import useCartStore from '../store/useCartStore'
import { wishlistAPI } from '../utils/api'
import toast from 'react-hot-toast'

const Wishlist = () => {
    const navigate = useNavigate()
    const { isAuthenticated } = useAuthStore()
    const { addItem } = useCartStore()
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
            return
        }
        fetchWishlist()
    }, [isAuthenticated, navigate])

    const fetchWishlist = async () => {
        try {
            const response = await wishlistAPI.get()
            setItems(response.data.items || [])
        } catch (error) {
            console.error('Failed to fetch wishlist', error)
            toast.error('Failed to load wishlist')
        } finally {
            setLoading(false)
        }
    }

    const handleRemove = async (productId) => {
        try {
            await wishlistAPI.remove(productId)
            setItems(items.filter(item => item.id !== productId))
            toast.success('Item removed')
        } catch (error) {
            toast.error('Failed to remove item')
        }
    }

    const handleAddToCart = async (product) => {
        await addItem(product, 1)
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
        }).format(price)
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader className="w-12 h-12 text-primary-600 animate-spin" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <Link to="/dashboard" className="text-gray-500 hover:text-primary-600 flex items-center mb-2">
                            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
                        </Link>
                        <h1 className="text-3xl font-serif font-bold text-gray-900">My Wishlist</h1>
                    </div>
                    <p className="text-gray-600">{items.length} items</p>
                </div>

                {items.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-2xl shadow-sm">
                        <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-xl font-medium text-gray-900 mb-2">Your wishlist is empty</h2>
                        <p className="text-gray-600 mb-8">Save items you love for later</p>
                        <Link to="/products" className="btn-primary">
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((item) => (
                            <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                <div className="relative aspect-square">
                                    <img
                                        src={item.image || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600'}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        onClick={() => handleRemove(item.id)}
                                        className="absolute top-4 right-4 p-2 bg-white/90 rounded-full text-red-500 hover:bg-red-50 transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="p-6">
                                    <Link to={`/products/${item.id}`}>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600">
                                            {item.name}
                                        </h3>
                                    </Link>
                                    <p className="text-xl font-bold text-primary-600 mb-4">{formatPrice(item.price)}</p>
                                    <button
                                        onClick={() => handleAddToCart(item)}
                                        className="w-full btn-primary flex items-center justify-center py-2"
                                    >
                                        <ShoppingBag className="w-4 h-4 mr-2" />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Wishlist
