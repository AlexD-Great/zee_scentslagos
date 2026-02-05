import { Link } from 'react-router-dom'
import { Wallet, ArrowLeft } from 'lucide-react'

const CryptoPayment = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-20 h-20 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Wallet className="w-10 h-10" />
        </div>

        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
          Coming Soon
        </h1>

        <p className="text-gray-600 mb-8">
          We are working hard to bring you secure and fast cryptocurrency payments. This feature will be available shortly.
        </p>

        <div className="space-y-4">
          <Link
            to="/cart"
            className="btn-primary w-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Return to Cart
          </Link>

          <Link
            to="/"
            className="block text-primary-600 font-medium hover:text-primary-700 hover:underline"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CryptoPayment
