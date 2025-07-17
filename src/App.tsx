import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AvatarCreator } from './components/AvatarCreator';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';

function App() {
  const [currentStep, setCurrentStep] = useState<'hero' | 'create' | 'pricing'>('hero');

  const handleGetStarted = () => {
    setCurrentStep('create');
  };

  const handleUpgrade = () => {
    setCurrentStep('pricing');
  };

  const handleBack = () => {
    setCurrentStep('hero');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header onGetStarted={handleGetStarted} />
      
      {currentStep === 'hero' && (
        <Hero onGetStarted={handleGetStarted} />
      )}
      
      {currentStep === 'create' && (
        <AvatarCreator onUpgrade={handleUpgrade} onBack={handleBack} />
      )}
      
      {currentStep === 'pricing' && (
        <Pricing onBack={handleBack} />
      )}
      
      <Footer />
    </div>
  );
}

export default App;