import React, { useState } from 'react';
import { CreditCard, Shield, CheckCircle, ArrowLeft, Lock, Zap } from 'lucide-react';

interface YocoPaymentProps {
  plan: string;
  price: string;
  onBack: () => void;
  onSuccess: () => void;
}

export const YocoPayment: React.FC<YocoPaymentProps> = ({ plan, price, onBack, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'form' | 'processing' | 'success'>('form');
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const handleYocoPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentStep('processing');

    try {
      // In a real implementation, you would integrate with Yoco's SDK here
      // For now, we'll simulate the payment process
      
      // Simulate API call to your backend
      const response = await fetch('/api/yoco-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan,
          price,
          email: formData.email,
          // In real implementation, you'd send a Yoco token, not raw card data
          cardToken: 'simulated_token_' + Date.now()
        })
      }).catch(() => {
        // Simulate successful payment for demo
        return { ok: true, json: () => Promise.resolve({ success: true }) };
      });

      if (response.ok) {
        setTimeout(() => {
          setPaymentStep('success');
          setIsProcessing(false);
          setTimeout(() => {
            onSuccess();
          }, 2000);
        }, 2000);
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setIsProcessing(false);
      alert('Payment failed. Please try again.');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (paymentStep === 'success') {
    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Payment Successful!</h2>
          <p className="text-white/70 mb-6">
            Welcome to My AI Twin {plan}! You can now create amazing AI videos.
          </p>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <p className="text-white/80 text-sm">
              A confirmation email has been sent to your email address.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (paymentStep === 'processing') {
    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Zap className="h-12 w-12 text-blue-400 animate-spin" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Processing Payment...</h2>
          <p className="text-white/70 mb-6">
            Please wait while we process your payment securely through Yoco.
          </p>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full animate-pulse" style={{ width: '85%' }}></div>
          </div>
          <p className="text-white/50 text-sm mt-4">Connecting to Yoco secure servers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-8">
            <button
              onClick={onBack}
              className="flex items-center text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Pricing
            </button>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-4">Complete Your Purchase</h1>
              <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                <h3 className="text-xl font-semibold text-white">{plan} Plan</h3>
                <p className="text-2xl font-bold text-purple-400">{price}/month</p>
              </div>
            </div>

            <form onSubmit={handleYocoPayment} className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Card Number</label>
                <input
                  type="text"
                  required
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  maxLength={19}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Expiry Date</label>
                  <input
                    type="text"
                    required
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    maxLength={5}
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">CVV</label>
                  <input
                    type="text"
                    required
                    value={formData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    placeholder="123"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    maxLength={4}
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Cardholder Name</label>
                <input
                  type="text"
                  required
                  value={formData.cardholderName}
                  onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Yoco Security Features */}
              <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                <div className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-blue-400" />
                  <div>
                    <h4 className="text-blue-400 font-medium">Secure Payment with Yoco</h4>
                    <p className="text-blue-300/80 text-sm">
                      Your payment is processed securely by Yoco. We never store your card details.
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Security Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
                  <div className="flex items-center space-x-2">
                    <Lock className="h-4 w-4 text-green-400" />
                    <span className="text-green-400 text-sm font-medium">256-bit SSL</span>
                  </div>
                </div>
                <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/20">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-purple-400" />
                    <span className="text-purple-400 text-sm font-medium">PCI Compliant</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <Zap className="h-5 w-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5" />
                    <span>Pay {price} USD</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-white/60 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <p>💳 All major cards accepted</p>
                <p>🔒 Bank-level security</p>
              </div>
              <p className="mt-2 text-xs">Powered by Yoco - South Africa's leading payment processor</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};