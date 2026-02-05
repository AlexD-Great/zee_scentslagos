import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Check, X, Loader, Download } from 'lucide-react'
import { paymentsAPI } from '../utils/api'
import useCartStore from '../store/useCartStore'
import toast from 'react-hot-toast'

const CheckoutSuccess = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { clearCart } = useCartStore()

    const reference = searchParams.get('reference') || searchParams.get('trxref')
    const [verifying, setVerifying] = useState(true)
    const [verified, setVerified] = useState(false)
    const [order, setOrder] = useState(null)

    useEffect(() => {
        if (!reference) {
            navigate('/products')
            return
        }
        verifyPayment()
    }, [reference])

    const verifyPayment = async () => {
        try {
            const response = await paymentsAPI.verifyPaystack(reference)
            setVerified(true)
            setOrder(response.data)
            clearCart()
            toast.success('Payment successful!')
        } catch (error) {
            console.error('Verification error:', error)
            toast.error('Payment verification failed')
        } finally {
            setVerifying(false)
        }
    }

    const handleDownloadReceipt = () => {
        if (order?.orderId) {
            window.open(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/payments/receipt/${order.orderId}`, '_blank')
        }
    }

    if (verifying) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <Loader className="w-12 h-12 text-primary-600 animate-spin mb-4" />
                <p className="text-gray-600">Verifying your payment...</p>
            </div>
        )
    }

    if (!verified) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md mx-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <X className="w-8 h-8 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h2>
                    <p className="text-gray-600 mb-6">We couldn't verify your payment. Please contact support.</p>
                    <button onClick={() => navigate('/contact')} className="btn-primary w-full">
                        Contact Support
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-16">
            <div className="max-w-2xl mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                        Order Confirmed!
                    </h2>
                    <p className="text-gray-600 mb-2">
                        Thank you for your purchase. Your order has been placed successfully.
                    </p>
                    {order?.orderId && (
                        <p className="text-primary-600 font-semibold mb-6">
                            Order ID: {order.orderId}
                        </p>
                    )}

                    <button
                        onClick={handleDownloadReceipt}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 mb-8"
                    >
                        <Download className="w-5 h-5 mr-2" />
                        Download Receipt
                    </button>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button onClick={() => navigate('/products')} className="btn-primary">
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutSuccess
