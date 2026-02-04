import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  BarChart3, Users, ShoppingBag, TrendingUp, Eye, 
  Package, DollarSign, Calendar, Upload, Plus, Edit, Trash2, ArrowRight
} from 'lucide-react'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    {
      icon: <Users className="w-6 h-6" />,
      label: 'Total Visitors',
      value: '12,458',
      change: '+12.5%',
      positive: true
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      label: 'Total Orders',
      value: '1,247',
      change: '+8.2%',
      positive: true
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      label: 'Revenue',
      value: '₦5.2M',
      change: '+15.3%',
      positive: true
    },
    {
      icon: <Package className="w-6 h-6" />,
      label: 'Products',
      value: '87',
      change: '+5',
      positive: true
    }
  ]

  const recentVisitors = [
    { date: 'Today', visitors: 342, pageViews: 1205, avgTime: '3m 24s' },
    { date: 'Yesterday', visitors: 298, pageViews: 1089, avgTime: '3m 12s' },
    { date: 'Jan 13', visitors: 415, pageViews: 1456, avgTime: '4m 02s' },
    { date: 'Jan 12', visitors: 387, pageViews: 1334, avgTime: '3m 45s' },
    { date: 'Jan 11', visitors: 356, pageViews: 1198, avgTime: '3m 18s' }
  ]

  const topProducts = [
    { name: 'Midnight Rose', sales: 145, revenue: '₦6.5M', stock: 23 },
    { name: 'Ocean Breeze', sales: 132, revenue: '₦6.6M', stock: 18 },
    { name: 'Golden Amber', sales: 98, revenue: '₦5.4M', stock: 31 },
    { name: 'Black Oud', sales: 87, revenue: '₦5.7M', stock: 12 },
    { name: 'Lavender Dreams', sales: 76, revenue: '₦3.2M', stock: 45 }
  ]

  const inventory = [
    { id: 1, name: 'Midnight Rose', category: 'Women', stock: 23, price: '₦45,000', status: 'In Stock' },
    { id: 2, name: 'Ocean Breeze', category: 'Men', stock: 18, price: '₦50,000', status: 'Low Stock' },
    { id: 3, name: 'Golden Amber', category: 'Unisex', stock: 31, price: '₦55,000', status: 'In Stock' },
    { id: 4, name: 'Cherry Blossom', category: 'Women', stock: 0, price: '₦48,000', status: 'Out of Stock' },
    { id: 5, name: 'Black Oud', category: 'Men', stock: 12, price: '₦65,000', status: 'Low Stock' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif font-bold mb-2">Admin Dashboard</h1>
              <p className="text-gray-300">Welcome back! Here's what's happening with your store.</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Last updated</div>
              <div className="text-lg font-semibold">Just now</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center">
                  {stat.icon}
                </div>
                <span className={`text-sm font-semibold ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-md mb-8">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 border-b-2 font-medium transition-colors ${
                  activeTab === 'overview'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('visitors')}
                className={`py-4 border-b-2 font-medium transition-colors ${
                  activeTab === 'visitors'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Visitor Analytics
              </button>
              <button
                onClick={() => setActiveTab('inventory')}
                className={`py-4 border-b-2 font-medium transition-colors ${
                  activeTab === 'inventory'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Inventory Management
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Top Selling Products</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Product</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Sales</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Revenue</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Stock</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topProducts.map((product, index) => (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">{product.name}</td>
                            <td className="py-3 px-4">{product.sales}</td>
                            <td className="py-3 px-4 font-semibold text-primary-600">{product.revenue}</td>
                            <td className="py-3 px-4">
                              <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                                product.stock > 20 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {product.stock} units
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold mb-4 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
                      Sales Trend
                    </h4>
                    <div className="h-48 flex items-end justify-between space-x-2">
                      {[65, 78, 85, 72, 90, 88, 95].map((height, i) => (
                        <div key={i} className="flex-1 bg-primary-600 rounded-t" style={{ height: `${height}%` }}></div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-600">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold mb-4 flex items-center">
                      <Eye className="w-5 h-5 mr-2 text-primary-600" />
                      Traffic Sources
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Direct</span>
                          <span className="text-sm font-semibold">45%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-primary-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Social Media</span>
                          <span className="text-sm font-semibold">30%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-primary-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Search Engines</span>
                          <span className="text-sm font-semibold">25%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-primary-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'visitors' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Visitor Analytics</h3>
                  <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>Last 3 Months</option>
                  </select>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Visitors</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Page Views</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Avg. Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentVisitors.map((day, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{day.date}</td>
                          <td className="py-3 px-4">{day.visitors}</td>
                          <td className="py-3 px-4">{day.pageViews}</td>
                          <td className="py-3 px-4">{day.avgTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <div className="text-blue-600 font-semibold mb-2">Most Viewed Page</div>
                    <div className="text-2xl font-bold text-gray-900">Products</div>
                    <div className="text-sm text-gray-600 mt-1">4,523 views this week</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-6">
                    <div className="text-green-600 font-semibold mb-2">Conversion Rate</div>
                    <div className="text-2xl font-bold text-gray-900">12.8%</div>
                    <div className="text-sm text-gray-600 mt-1">+2.3% from last week</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-6">
                    <div className="text-purple-600 font-semibold mb-2">Bounce Rate</div>
                    <div className="text-2xl font-bold text-gray-900">32.5%</div>
                    <div className="text-sm text-gray-600 mt-1">-1.8% from last week</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'inventory' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Manage Inventory</h3>
                  <Link to="/admin/products" className="btn-primary flex items-center">
                    <Package className="w-5 h-5 mr-2" />
                    Manage Products
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <h4 className="font-semibold text-blue-900 mb-2">Full Product Management</h4>
                  <p className="text-blue-800 mb-4">
                    Upload product images, set prices, manage stock levels, and more from the dedicated product management page.
                  </p>
                  <Link 
                    to="/admin/products" 
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
                  >
                    Go to Product Management
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Product Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Stock</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventory.map((item) => (
                        <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{item.name}</td>
                          <td className="py-3 px-4">{item.category}</td>
                          <td className="py-3 px-4">{item.stock}</td>
                          <td className="py-3 px-4 font-semibold">{item.price}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              item.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                              item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-8 bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Bulk Upload Products</h4>
                      <p className="text-primary-100">Upload multiple products at once using CSV or Excel file</p>
                    </div>
                    <button className="bg-white text-primary-700 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors flex items-center">
                      <Upload className="w-5 h-5 mr-2" />
                      Upload File
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
