import React, { useState } from 'react';
import { CreditCard, Shield, CheckCircle, ArrowLeft } from 'lucide-react';

interface YocoPaymentProps {
  plan: string;
  price: string;
  onBack: () => void;
  onSuccess: () => void;
}

export const YocoPayment: React.FC<YocoPaymentProps> = ({ plan, price, onBack, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'form' | 'processing' | 'success'>('form');

  const handleYocoPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentStep('processing');

    // Simulate Yoco payment processing
    setTimeout(() => {
      setPaymentStep('success');
      setIsProcessing(false);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }, 3000);
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
            <CreditCard className="h-12 w-12 text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Processing Payment...</h2>
          <p className="text-white/70 mb-6">
            Please wait while we process your payment securely through Yoco.
          </p>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
          </div>
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
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Card Number</label>
                <input
                  type="text"
                  required
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Expiry Date</label>
                  <input
                    type="text"
                    required
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">CVV</label>
                  <input
                    type="text"
                    required
                    placeholder="123"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Cardholder Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                <div className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-blue-400" />
                  <div>
                    <h4 className="text-blue-400 font-medium">Secure Payment with Yoco</h4>
                    <p className="text-blue-300/80 text-sm">
                      Your payment is processed securely. We never store your card details.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : `Pay ${price} USD`}
              </button>
            </form>

            <div className="mt-6 text-center text-white/60 text-sm">
              <p>💳 Visa, Mastercard, American Express accepted</p>
              <p>🔒 256-bit SSL encryption • PCI DSS compliant</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};