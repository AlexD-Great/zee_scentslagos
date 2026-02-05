import { useState, useEffect } from 'react'
import { Star, User } from 'lucide-react'
import { reviewsAPI } from '../utils/api'
import useAuthStore from '../store/useAuthStore'
import toast from 'react-hot-toast'

const ProductReviews = ({ productId }) => {
    const { isAuthenticated, user } = useAuthStore()
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)
    const [newReview, setNewReview] = useState({ rating: 5, comment: '' })
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        fetchReviews()
    }, [productId])

    const fetchReviews = async () => {
        try {
            const response = await reviewsAPI.getByProduct(productId)
            setReviews(response.data.reviews || [])
        } catch (error) {
            console.error('Failed to fetch reviews:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!isAuthenticated) {
            toast.error('Please login to write a review')
            return
        }

        setSubmitting(true)
        try {
            await reviewsAPI.create(productId, {
                ...newReview,
                userName: user?.firstName || 'Anonymous'
            })
            toast.success('Review submitted successfully')
            setNewReview({ rating: 5, comment: '' })
            fetchReviews() // Refresh reviews
        } catch (error) {
            toast.error('Failed to submit review')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">Customer Reviews</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Review Form */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
                    {isAuthenticated ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                                <div className="flex space-x-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setNewReview({ ...newReview, rating: star })}
                                            className="focus:outline-none"
                                        >
                                            <Star
                                                className={`w-6 h-6 ${star <= newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
                                <textarea
                                    required
                                    value={newReview.comment}
                                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                    rows={4}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                    placeholder="Share your thoughts..."
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="btn-primary w-full disabled:opacity-50"
                            >
                                {submitting ? 'Submitting...' : 'Submit Review'}
                            </button>
                        </form>
                    ) : (
                        <div className="bg-gray-50 rounded-lg p-6 text-center">
                            <p className="text-gray-600 mb-4">Please log in to write a review.</p>
                            {/* Link to login could go here */}
                        </div>
                    )}
                </div>

                {/* Reviews List */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">
                        {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
                    </h3>

                    {loading ? (
                        <p>Loading reviews...</p>
                    ) : reviews.length === 0 ? (
                        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                    ) : (
                        <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
                            {reviews.map((review) => (
                                <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                                                <User className="w-4 h-4 text-primary-600" />
                                            </div>
                                            <span className="font-medium text-gray-900">{review.userName}</span>
                                        </div>
                                        <span className="text-sm text-gray-400">
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-gray-600">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductReviews
