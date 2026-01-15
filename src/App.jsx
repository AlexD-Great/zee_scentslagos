import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import AIFragranceFinder from './pages/AIFragranceFinder'
import AdminDashboard from './pages/AdminDashboard'
import CryptoPayment from './pages/CryptoPayment'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/ai-finder" element={<AIFragranceFinder />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/crypto-payment" element={<CryptoPayment />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
