import { useState } from 'react'
import { Sparkles, ArrowRight, RefreshCw } from 'lucide-react'

const AIFragranceFinder = () => {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState({
    occasion: '',
    personality: '',
    season: '',
    preference: ''
  })
  const [recommendations, setRecommendations] = useState([])

  const questions = {
    1: {
      question: "What's the occasion?",
      options: [
        { value: 'daily', label: 'Daily Wear', icon: '☀️' },
        { value: 'work', label: 'Work/Office', icon: '💼' },
        { value: 'evening', label: 'Evening/Date', icon: '🌙' },
        { value: 'special', label: 'Special Event', icon: '✨' }
      ]
    },
    2: {
      question: "How would you describe your personality?",
      options: [
        { value: 'bold', label: 'Bold & Confident', icon: '🔥' },
        { value: 'elegant', label: 'Elegant & Sophisticated', icon: '👑' },
        { value: 'fresh', label: 'Fresh & Energetic', icon: '🌿' },
        { value: 'romantic', label: 'Romantic & Gentle', icon: '🌸' }
      ]
    },
    3: {
      question: "What season do you prefer?",
      options: [
        { value: 'spring', label: 'Spring', icon: '🌺' },
        { value: 'summer', label: 'Summer', icon: '🏖️' },
        { value: 'fall', label: 'Fall', icon: '🍂' },
        { value: 'winter', label: 'Winter', icon: '❄️' }
      ]
    },
    4: {
      question: "Which scent family appeals to you?",
      options: [
        { value: 'floral', label: 'Floral', icon: '🌹' },
        { value: 'woody', label: 'Woody', icon: '🌲' },
        { value: 'fresh', label: 'Fresh/Citrus', icon: '🍋' },
        { value: 'oriental', label: 'Oriental/Spicy', icon: '🌶️' }
      ]
    }
  }

  const handleAnswer = (field, value) => {
    setAnswers({ ...answers, [field]: value })
    if (step < 4) {
      setStep(step + 1)
    } else {
      generateRecommendations({ ...answers, [field]: value })
    }
  }

  const generateRecommendations = (userAnswers) => {
    const mockRecommendations = [
      {
        id: 1,
        name: 'Midnight Rose',
        match: 95,
        reason: 'Perfect for romantic evenings with elegant floral notes',
        price: '₦45,000',
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=400&fit=crop',
        inStock: true
      },
      {
        id: 2,
        name: 'Golden Amber',
        match: 88,
        reason: 'Warm and sophisticated, ideal for special occasions',
        price: '₦55,000',
        image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=300&h=400&fit=crop',
        inStock: true
      },
      {
        id: 3,
        name: 'Lavender Dreams',
        match: 82,
        reason: 'Fresh and gentle, great for daily wear',
        price: '₦42,000',
        image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59bd9?w=300&h=400&fit=crop',
        inStock: true
      }
    ]
    setRecommendations(mockRecommendations)
    setStep(5)
  }

  const resetQuiz = () => {
    setStep(1)
    setAnswers({
      occasion: '',
      personality: '',
      season: '',
      preference: ''
    })
    setRecommendations([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-pink-50 to-purple-50">
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            AI Fragrance Finder
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Let our intelligent system help you discover your perfect scent in just 4 questions
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {step <= 4 ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-primary-600">
                  Question {step} of 4
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round((step / 4) * 100)}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary-600 to-primary-800 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(step / 4) * 100}%` }}
                ></div>
              </div>
            </div>

            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
              {questions[step].question}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questions[step].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(Object.keys(answers)[step - 1], option.value)}
                  className="group relative p-6 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:shadow-lg transition-all duration-300 text-left"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{option.icon}</div>
                    <div>
                      <div className="font-semibold text-lg text-gray-900 group-hover:text-primary-600 transition-colors">
                        {option.label}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="absolute right-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>

            {step > 1 && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setStep(step - 1)}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  ← Go Back
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-800 rounded-full mb-4">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                  Your Perfect Matches
                </h2>
                <p className="text-gray-600">
                  Based on your preferences, we've found these fragrances just for you
                </p>
              </div>

              <div className="space-y-6">
                {recommendations.map((product, index) => (
                  <div
                    key={product.id}
                    className="flex flex-col md:flex-row gap-6 p-6 border-2 border-gray-200 rounded-xl hover:border-primary-500 transition-all"
                  >
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full md:w-32 h-48 md:h-32 object-cover rounded-lg"
                      />
                      <div className="absolute -top-3 -right-3 bg-gradient-to-br from-primary-600 to-primary-800 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold shadow-lg">
                        {product.match}%
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-2xl font-serif font-bold text-gray-900">
                            {product.name}
                          </h3>
                          {index === 0 && (
                            <span className="inline-block bg-gold-100 text-gold-800 text-xs font-semibold px-3 py-1 rounded-full mt-1">
                              Best Match
                            </span>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary-600">
                            {product.price}
                          </div>
                          {product.inStock && (
                            <span className="text-sm text-green-600 font-medium">In Stock</span>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{product.reason}</p>
                      <button className="btn-primary">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={resetQuiz}
                className="inline-flex items-center btn-secondary"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div>
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h4 className="font-semibold mb-2">Answer Questions</h4>
              <p className="text-gray-600 text-sm">
                Tell us about your preferences and personality
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h4 className="font-semibold mb-2">AI Analysis</h4>
              <p className="text-gray-600 text-sm">
                Our algorithm matches you with perfect fragrances
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h4 className="font-semibold mb-2">Get Recommendations</h4>
              <p className="text-gray-600 text-sm">
                Receive personalized suggestions from available stock
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIFragranceFinder
