import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AvatarCreator } from './components/AvatarCreator';
import { Features } from './components/Features';
import { Pricing } from './components/Pricing';
import { YocoPayment } from './components/YocoPayment';
import { Footer } from './components/Footer';

function App() {
  const [currentStep, setCurrentStep] = useState<'hero' | 'create' | 'features' | 'pricing' | 'payment'>('hero');
  const [selectedPlan, setSelectedPlan] = useState<{name: string, price: string} | null>(null);

  const handleGetStarted = () => {
    setCurrentStep('create');
  };

  const handleViewFeatures = () => {
    setCurrentStep('features');
  };

  const handleUpgrade = () => {
    setCurrentStep('pricing');
  };

  const handlePayment = (plan: string, price: string) => {
    setSelectedPlan({ name: plan, price });
    setCurrentStep('payment');
  };

  const handlePaymentSuccess = () => {
    setCurrentStep('create');
  };

  const handleBack = () => {
    if (currentStep === 'payment') {
      setCurrentStep('pricing');
    } else if (currentStep === 'pricing') {
      setCurrentStep('create');
    } else if (currentStep === 'features') {
      setCurrentStep('hero');
    } else {
      setCurrentStep('hero');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header onGetStarted={handleGetStarted} onViewFeatures={handleViewFeatures} />
      
      {currentStep === 'hero' && (
        <Hero onGetStarted={handleGetStarted} onViewFeatures={handleViewFeatures} />
      )}
      
      {currentStep === 'features' && (
        <>
          <Features />
          <div className="text-center pb-12">
            <button
              onClick={handleGetStarted}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Start Creating Your AI Twin
            </button>
          </div>
        </>
      )}
      
      {currentStep === 'create' && (
        <AvatarCreator onUpgrade={handleUpgrade} onBack={handleBack} />
      )}
      
      {currentStep === 'pricing' && (
        <Pricing onBack={handleBack} onPayment={handlePayment} />
      )}
      
      {currentStep === 'payment' && selectedPlan && (
        <YocoPayment 
          plan={selectedPlan.name}
          price={selectedPlan.price}
          onBack={handleBack}
          onSuccess={handlePaymentSuccess}
        />
      )}
      
      <Footer />
    </div>
  );
}

export default App;