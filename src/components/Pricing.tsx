import React from 'react';
import { Check, ArrowLeft, Crown, Zap, Star } from 'lucide-react';

interface PricingProps {
  onBack: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onBack }) => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out AI Twin',
      features: [
        '3 videos per month',
        '720p resolution',
        'Basic voice models',
        'Standard processing',
        'Community support',
      ],
      limitations: [
        'Watermark included',
        'Limited to 30 seconds',
        'Basic facial animation',
      ],
      popular: false,
      icon: Zap,
    },
    {
      name: 'Pro',
      price: '$29',
      period: 'month',
      description: 'Ideal for creators and professionals',
      features: [
        'Unlimited videos',
        '4K resolution',
        'Premium voice models',
        'Advanced facial animation',
        'Priority processing',
        'Commercial license',
        'No watermark',
        'Up to 5 minutes per video',
      ],
      popular: true,
      icon: Crown,
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: 'month',
      description: 'For teams and businesses',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Custom branding',
        'API access',
        'Priority support',
        'Custom voice training',
        'Batch processing',
        'Advanced analytics',
      ],
      popular: false,
      icon: Star,
    },
  ];

  const handlePayment = (planName: string) => {
    // Here you would integrate with Stripe or another payment provider
    console.log(`Payment for ${planName} plan`);
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
              Choose Your Plan
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Select the perfect plan for your AI Twin needs. Upgrade or downgrade anytime.
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

                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-purple-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-white/70 mb-4">{plan.description}</p>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      <span className="text-white/60">/{plan.period}</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-white/80">
                        <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                    
                    {plan.limitations?.map((limitation, index) => (
                      <div key={index} className="flex items-center text-white/60">
                        <div className="w-5 h-5 mr-3 flex-shrink-0 flex items-center justify-center">
                          <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                        </div>
                        <span className="text-sm">{limitation}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePayment(plan.name)}
                    className={`w-full py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {plan.name === 'Free' ? 'Get Started' : `Choose ${plan.name}`}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">
                Need a Custom Solution?
              </h3>
              <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                We offer tailored solutions for large enterprises with specific requirements.
                Contact our team to discuss your needs.
              </p>
              <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105">
                Contact Sales
              </button>
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