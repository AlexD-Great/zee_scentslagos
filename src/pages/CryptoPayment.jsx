import { useState } from 'react'
import { Wallet, Check, AlertCircle, Copy, ExternalLink } from 'lucide-react'

const CryptoPayment = () => {
  const [selectedCrypto, setSelectedCrypto] = useState('USDT')
  const [walletConnected, setWalletConnected] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState('idle')
  const [transactionHash, setTransactionHash] = useState('')

  const cryptoOptions = [
    {
      symbol: 'USDT',
      name: 'Tether (USDT)',
      network: 'TRC20',
      icon: '₮',
      address: 'TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx',
      color: 'bg-green-500'
    },
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      network: 'Bitcoin',
      icon: '₿',
      address: 'bc1qXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      color: 'bg-orange-500'
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      network: 'ERC20',
      icon: 'Ξ',
      address: '0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      color: 'bg-blue-500'
    },
    {
      symbol: 'BNB',
      name: 'Binance Coin',
      network: 'BEP20',
      icon: 'BNB',
      address: '0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      color: 'bg-yellow-500'
    }
  ]

  const selectedCryptoData = cryptoOptions.find(c => c.symbol === selectedCrypto)

  const handleConnectWallet = () => {
    setWalletConnected(true)
    setTimeout(() => {
      alert('Wallet connected! (Demo mode - In production, this would connect to MetaMask, Trust Wallet, etc.)')
    }, 500)
  }

  const handlePayment = () => {
    setPaymentStatus('processing')
    setTimeout(() => {
      const mockHash = '0x' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      setTransactionHash(mockHash)
      setPaymentStatus('success')
    }, 3000)
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('Address copied to clipboard!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-4">
            <Wallet className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-center">
            Crypto Payment
          </h1>
          <p className="text-xl text-primary-100 text-center max-w-2xl mx-auto">
            Pay securely with cryptocurrency - Fast, secure, and borderless payments
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {paymentStatus === 'success' ? (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                Payment Successful!
              </h2>
              <p className="text-gray-600 mb-6">
                Your cryptocurrency payment has been received and is being processed.
              </p>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="text-sm text-gray-600 mb-2">Transaction Hash:</div>
                <div className="flex items-center justify-center gap-2">
                  <code className="text-sm bg-white px-4 py-2 rounded border border-gray-200">
                    {transactionHash}
                  </code>
                  <button
                    onClick={() => copyToClipboard(transactionHash)}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="space-y-3 text-left bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-3">What happens next?</h3>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
                    1
                  </div>
                  <p className="text-sm text-blue-800">
                    Your transaction is being confirmed on the blockchain (usually 3-6 confirmations)
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
                    2
                  </div>
                  <p className="text-sm text-blue-800">
                    You'll receive an email confirmation once payment is verified
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
                    3
                  </div>
                  <p className="text-sm text-blue-800">
                    Your order will be processed and shipped within 24 hours
                  </p>
                </div>
              </div>
              <button
                onClick={() => window.location.href = '/'}
                className="btn-primary mt-6"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2 text-center">
                Select Payment Method
              </h2>
              <p className="text-gray-600 mb-8 text-center">
                Choose your preferred cryptocurrency
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {cryptoOptions.map((crypto) => (
                  <button
                    key={crypto.symbol}
                    onClick={() => setSelectedCrypto(crypto.symbol)}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      selectedCrypto === crypto.symbol
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-12 h-12 ${crypto.color} text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3`}>
                      {crypto.icon}
                    </div>
                    <div className="font-semibold text-gray-900">{crypto.symbol}</div>
                    <div className="text-xs text-gray-500 mt-1">{crypto.network}</div>
                  </button>
                ))}
              </div>

              {selectedCryptoData && (
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {selectedCryptoData.name}
                    </h3>
                    <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                      {selectedCryptoData.network}
                    </span>
                  </div>

                  <div className="bg-white rounded-lg p-4 mb-4">
                    <div className="text-sm text-gray-600 mb-2">Wallet Address:</div>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-sm bg-gray-50 px-3 py-2 rounded border border-gray-200 overflow-x-auto">
                        {selectedCryptoData.address}
                      </code>
                      <button
                        onClick={() => copyToClipboard(selectedCryptoData.address)}
                        className="p-2 hover:bg-gray-100 rounded flex-shrink-0"
                        title="Copy address"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-yellow-800">
                        <strong>Important:</strong> Only send {selectedCryptoData.symbol} on the {selectedCryptoData.network} network to this address. Sending other tokens or using a different network may result in permanent loss of funds.
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-gray-600 mb-1">Order Total</div>
                      <div className="text-2xl font-bold text-gray-900">$125.00</div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-gray-600 mb-1">Amount to Send</div>
                      <div className="text-2xl font-bold text-primary-600">
                        {selectedCrypto === 'USDT' ? '125.00' : 
                         selectedCrypto === 'BTC' ? '0.00285' :
                         selectedCrypto === 'ETH' ? '0.0521' : '0.234'} {selectedCrypto}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {!walletConnected ? (
                <button
                  onClick={handleConnectWallet}
                  className="btn-primary w-full flex items-center justify-center text-lg"
                >
                  <Wallet className="w-5 h-5 mr-2" />
                  Connect Wallet
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-green-800 font-medium">Wallet Connected</span>
                  </div>
                  <button
                    onClick={handlePayment}
                    disabled={paymentStatus === 'processing'}
                    className="btn-primary w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {paymentStatus === 'processing' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing Payment...
                      </>
                    ) : (
                      'Confirm Payment'
                    )}
                  </button>
                </div>
              )}

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Why Pay with Crypto?</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      🔒
                    </div>
                    <h5 className="font-semibold mb-1">Secure</h5>
                    <p className="text-sm text-gray-600">Blockchain-verified transactions</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      ⚡
                    </div>
                    <h5 className="font-semibold mb-1">Fast</h5>
                    <p className="text-sm text-gray-600">Instant global payments</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      🌍
                    </div>
                    <h5 className="font-semibold mb-1">Borderless</h5>
                    <p className="text-sm text-gray-600">No currency conversion fees</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Supported Wallets</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                M
              </div>
              <span className="font-medium">MetaMask</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                T
              </div>
              <span className="font-medium">Trust Wallet</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                C
              </div>
              <span className="font-medium">Coinbase</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center text-white font-bold">
                B
              </div>
              <span className="font-medium">Binance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CryptoPayment
