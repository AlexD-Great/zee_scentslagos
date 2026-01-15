import { Award, Users, Globe, Heart } from 'lucide-react'

const About = () => {
  const stats = [
    { number: '5000+', label: 'Happy Customers' },
    { number: '100+', label: 'Premium Fragrances' },
    { number: '5+', label: 'Years Experience' },
    { number: '99%', label: 'Satisfaction Rate' }
  ]

  const values = [
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Quality First',
      description: 'We source only authentic, premium perfumes from trusted suppliers worldwide.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Customer Focus',
      description: 'Your satisfaction is our priority. We provide personalized service and expert advice.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Reach',
      description: 'Access to international brands and exclusive fragrances not easily found locally.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Passion Driven',
      description: 'We love perfumes and are dedicated to sharing that passion with our customers.'
    }
  ]

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">About Zee Scents</h1>
          <p className="text-xl text-primary-100">Your trusted partner in luxury fragrances</p>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Founded in Lagos, Nigeria, Zee Scents was born from a passion for luxury fragrances 
                  and a desire to make premium perfumes accessible to everyone. We recognized the 
                  challenge many faced in finding authentic, high-quality perfumes locally.
                </p>
                <p>
                  What started as a small collection has grown into a curated selection of over 100 
                  premium fragrances from renowned international brands. We pride ourselves on offering 
                  only genuine products, backed by our authenticity guarantee.
                </p>
                <p>
                  Today, we serve thousands of satisfied customers across Nigeria, helping them discover 
                  their signature scents and express their unique personalities through fragrance.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&h=700&fit=crop"
                alt="Perfume store"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary-600 text-white p-6 rounded-xl shadow-2xl">
                <p className="text-4xl font-bold mb-1">5000+</p>
                <p className="text-primary-100">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-gray-600">
              Numbers that speak to our commitment
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-primary-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-primary-100 leading-relaxed">
            To provide authentic, premium fragrances that empower individuals to express their 
            unique identity and create lasting impressions. We strive to make luxury accessible 
            while maintaining the highest standards of quality and customer service.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Authenticity Guaranteed</h3>
              <p className="text-gray-600">
                Every product is 100% genuine. We work directly with authorized distributors 
                and provide certificates of authenticity.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Expert Consultation</h3>
              <p className="text-gray-600">
                Our fragrance experts are here to help you find the perfect scent based on 
                your preferences and personality.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Hassle-Free Returns</h3>
              <p className="text-gray-600">
                Not satisfied? We offer easy returns and exchanges within 7 days of purchase, 
                no questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
