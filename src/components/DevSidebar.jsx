import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Menu, X, Home, ShoppingBag, Package, Info, Phone, 
  Sparkles, LayoutDashboard, CreditCard, LogIn, UserPlus,
  ShoppingCart, CreditCard as CheckoutIcon, User, Settings,
  ChevronRight, ChevronLeft
} from 'lucide-react'

const DevSidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const pages = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Products', path: '/products', icon: ShoppingBag },
    { name: 'Product Detail', path: '/product/1', icon: Package, note: '(Example)' },
    { name: 'Cart', path: '/cart', icon: ShoppingCart },
    { name: 'Checkout', path: '/checkout', icon: CheckoutIcon },
    { name: 'Login', path: '/login', icon: LogIn },
    { name: 'Register', path: '/register', icon: UserPlus },
    { name: 'Dashboard', path: '/dashboard', icon: User },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: Phone },
    { name: 'AI Finder', path: '/ai-finder', icon: Sparkles },
    { name: 'Crypto Payment', path: '/crypto-payment', icon: CreditCard },
    { divider: true, label: 'Admin Pages' },
    { name: 'Admin Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Admin Products', path: '/admin/products', icon: Settings },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-1/2 -translate-y-1/2 z-50 bg-primary-600 text-white p-2 rounded-r-lg shadow-lg hover:bg-primary-700 transition-all ${
          isOpen ? 'left-64' : 'left-0'
        }`}
        title="Toggle Navigation Sidebar"
      >
        {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-40 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b bg-primary-600 text-white">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg">Site Navigation</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-primary-700 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-primary-100 mt-1">Quick access to all pages</p>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {pages.map((page, index) => {
                if (page.divider) {
                  return (
                    <li key={index} className="pt-4 pb-2">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {page.label}
                      </span>
                    </li>
                  )
                }

                const Icon = page.icon
                return (
                  <li key={page.path}>
                    <Link
                      to={page.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive(page.path)
                          ? 'bg-primary-100 text-primary-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{page.name}</span>
                      {page.note && (
                        <span className="text-xs text-gray-400">{page.note}</span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t bg-gray-50">
            <p className="text-xs text-gray-500 text-center">
              Zee Scents Lagos
            </p>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default DevSidebar
