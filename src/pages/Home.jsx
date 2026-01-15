import { Link } from 'react-router-dom'
import { Sparkles, Truck, Shield, Heart, ArrowRight } from 'lucide-react'

const Home = () => {
  const featuredProducts = [
    {
      id: 1,
      name: 'Midnight Rose',
      category: 'Women',
      price: '₦45,000',
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=600&fit=crop',
      description: 'A captivating blend of rose and vanilla'
    },
    {
      id: 2,
      name: 'Ocean Breeze',
      category: 'Men',
      price: '₦50,000',
      image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500&h=600&fit=crop',
      description: 'Fresh aquatic notes with woody undertones'
    },
    {
      id: 3,
      name: 'Golden Amber',
      category: 'Unisex',
      price: '₦55,000',
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&h=600&fit=crop',
      description: 'Warm amber with hints of sandalwood'
    },
    {
      id: 4,
      name: 'Lavender Dreams',
      category: 'Women',
      price: '₦42,000',
      image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59bd9?w=500&h=600&fit=crop',
      description: 'Soothing lavender with citrus notes'
    }
  ]

  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Premium Quality',
      description: 'Only the finest ingredients from around the world'
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping across Nigeria'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Authentic Products',
      description: '100% genuine perfumes guaranteed'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Customer Care',
      description: 'Dedicated support for all your needs'
    }
  ]

  return (
    <div>
      <section className="relative h-[600px] bg-gradient-to-br from-primary-100 via-pink-50 to-purple-100 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
              Discover Your
              <span className="block bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                Signature Scent
              </span>
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Experience luxury with our curated collection of premium perfumes. Each fragrance tells a unique story.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="btn-primary inline-flex items-center">
                Shop Collection
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/about" className="btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Featured Collection
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our handpicked selection of the finest fragrances
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="card overflow-hidden group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-primary-600">
                    {product.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary-600">{product.price}</span>
                    <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products" className="btn-primary inline-flex items-center">
              View All Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-6">
                Why Choose Zee Scents?
              </h2>
              <p className="text-lg mb-6 text-primary-50">
                We are passionate about bringing you the finest fragrances from around the world. 
                Our commitment to quality and authenticity sets us apart.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Curated Selection</h4>
                    <p className="text-primary-100">Handpicked perfumes from renowned brands</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Expert Guidance</h4>
                    <p className="text-primary-100">Get personalized recommendations from our team</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Satisfaction Guaranteed</h4>
                    <p className="text-primary-100">Easy returns and exchanges within 7 days</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&h=700&fit=crop"
                alt="Perfume collection"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
            Join Our Newsletter
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Subscribe to get special offers, free giveaways, and exclusive deals.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Subscribe Now
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Home
