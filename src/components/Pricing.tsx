import React from 'react';
import { Check, ArrowLeft, Crown, Zap, Star, X } from 'lucide-react';

interface PricingProps {
  onBack: () => void;
  onPayment?: (plan: string, price: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onBack, onPayment }) => {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      period: '',
      description: 'For trying things out',
      features: [
        '5 Generations / month',
        'Standard Resolution (HD)',
        'Watermarked Images',
      ],
      popular: false,
      icon: Zap,
      buttonText: 'Get Started',
      highlight: '5 generations monthly',
    },
    {
      name: 'Pro',
      price: '$15',
      period: '',
      description: 'For aspiring creators',
      features: [
        '50 Generations / month',
        'High Resolution (4K)',
        'No Watermarks',
        'Priority Support',
      ],
      popular: true,
      icon: Crown,
      buttonText: 'Get Started',
      highlight: '50 generations monthly',
    },
    {
      name: 'Studio',
      price: '$40',
      period: '',
      description: 'For power users',
      features: [
        '200 Generations / month',
        'Highest Resolution (8K)',
        'All Pro features',
        'Early access to new features',
      ],
      popular: false,
      icon: Star,
      buttonText: 'Get Started',
      highlight: '200 generations monthly',
    },
  ];

  const handlePayment = (planName: string, price: string) => {
    if (planName === 'Starter') {
      // For free plan, just close pricing and go back to creator
      onBack();
      return;
    }
    
    // For paid plans, trigger payment flow
    if (onPayment) {
      onPayment(planName, price);
    } else {
      console.log(`Initiating payment for ${planName} plan - ${price}`);
      window.open(`/payment/yoco?plan=${planName}&price=${price}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <button
              onClick={onBack}
              className="flex items-center text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Creator
            </button>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              Choose Your Epic Experience
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-6">
              Start for free and upgrade for higher resolution and more generations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => {
              const IconComponent = plan.icon;
              return (
                <div
                  key={plan.name}
                  className={`relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:bg-white/10 ${
                    plan.popular
                      ? 'border-purple-500 scale-105 shadow-2xl shadow-purple-500/20'
                      : 'border-white/10'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </div>
                    </div>
                  )}

                  {/* Plan Highlight */}
                  <div className="absolute -top-2 -right-2">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      plan.name === 'Free' 
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                        : 'bg-green-500/20 text-green-400 border border-green-500/30'
                    }`}>
                      {plan.highlight}
                    </div>
                  </div>

                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-purple-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-white/70 mb-4">{plan.description}</p>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      {plan.period && <span className="text-white/60">/{plan.period}</span>}
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-white/80">
                        <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                        <span>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePayment(plan.name, plan.price)}
                    className={`w-full py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600'
                        : 'bg-white/20 text-white hover:bg-white/30 border border-white/20'
                    }`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Payment Methods */}
          <div className="mt-12 text-center">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Secure Payment with Yoco</h3>
              <p className="text-white/70 mb-4">
                Pay securely with your credit or debit card. All payments processed securely.
              </p>
              <div className="flex justify-center items-center space-x-4 text-white/60">
                <span>💳 Visa</span>
                <span>💳 Mastercard</span>
                <span>💳 American Express</span>
                <span>🔒 SSL Secured</span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-white/60 text-sm">
              All plans include 14-day money-back guarantee • Cancel anytime • No hidden fees
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};