import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Loader } from 'lucide-react'
import { aiAPI } from '../utils/api'
import useCartStore from '../store/useCartStore'

const RecommendedProducts = () => {
    const { items } = useCartStore()
    const [recommendations, setRecommendations] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchRecommendations()
    }, [items.length]) // Refetch when cart changes

    const fetchRecommendations = async () => {
        setLoading(true)
        try {
            const response = await aiAPI.getRecommendations({
                currentCart: items.map(item => ({ name: item.name, id: item.id }))
            })
            setRecommendations(response.data.recommendations || [])
        } catch (error) {
            console.error('Error fetching recommendations:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="py-8 flex justify-center">
                <Loader className="w-8 h-8 text-primary-600 animate-spin" />
            </div>
        )
    }

    if (recommendations.length === 0) return null

    return (
        <div className="mt-16">
            <div className="flex items-center space-x-2 mb-6">
                <Sparkles className="w-6 h-6 text-yellow-500" />
                <h2 className="text-2xl font-serif font-bold text-gray-900">Recommended for You</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {recommendations.map((product) => (
                    <div key={product.id} className="card group">
                        <Link to={`/product/${product.id}`}>
                            <div className="relative h-48 overflow-hidden rounded-t-xl">
                                <img
                                    src={product.images?.[0] || 'https://via.placeholder.com/400'}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                                <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RecommendedProducts
