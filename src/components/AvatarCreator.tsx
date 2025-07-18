import React, { useState } from 'react';
import { PhotoUpload } from './PhotoUpload';
import { VoiceInput } from './VoiceInput';
import { ScriptInput } from './ScriptInput';
import { VideoPreview } from './VideoPreview';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface AvatarCreatorProps {
  onUpgrade: () => void;
  onBack: () => void;
  freeVideoUsed?: boolean;
  onFreeVideoUsed?: () => void;
}

export const AvatarCreator: React.FC<AvatarCreatorProps> = ({ 
  onUpgrade, 
  onBack, 
  freeVideoUsed = false,
  onFreeVideoUsed 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [script, setScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [faceAnalysis, setFaceAnalysis] = useState<any>(null);

  const steps = [
    { id: 1, name: 'Upload Photo', component: PhotoUpload },
    { id: 2, name: 'Choose Voice', component: VoiceInput },
    { id: 3, name: 'Write Script', component: ScriptInput },
    { id: 4, name: 'Generate Video', component: VideoPreview },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Mark free video as used
    if (!freeVideoUsed && onFreeVideoUsed) {
      onFreeVideoUsed();
    }
    
    // Simulate video generation
    setTimeout(() => {
      setIsGenerating(false);
      setCurrentStep(4);
    }, 3000);
  };

  const getCurrentComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PhotoUpload 
            onPhotoUpload={setUploadedPhoto} 
            uploadedPhoto={uploadedPhoto}
          />
        );
      case 2:
        return (
          <VoiceInput 
            onVoiceSelect={setSelectedVoice} 
            selectedVoice={selectedVoice}
            faceAnalysis={faceAnalysis}
          />
        );
      case 3:
        return (
          <ScriptInput 
            script={script} 
            onScriptChange={setScript}
            faceAnalysis={faceAnalysis}
          />
        );
      case 4:
        return (
          <VideoPreview 
            isGenerating={isGenerating} 
            onUpgrade={onUpgrade} 
            freeVideoUsed={freeVideoUsed}
            faceAnalysis={faceAnalysis}
          />
        );
      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return uploadedPhoto !== null;
      case 2:
        return selectedVoice !== null;
      case 3:
        return script.trim().length > 0;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <button
              onClick={onBack}
              className={`flex items-center transition-colors ${
                freeVideoUsed 
                  ? 'text-red-400 hover:text-red-300' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              {freeVideoUsed ? 'Upgrade Required' : 'Back to Home'}
            </button>
          </div>

          {/* Free Video Used Warning */}
          {freeVideoUsed && currentStep < 4 && (
            <div className="mb-8 bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <div className="text-center">
                <h3 className="text-red-300 font-bold mb-2">🚨 Free Video Already Used!</h3>
                <p className="text-red-300/80 mb-4">
                  You've used your 1 free video. To create more videos, please upgrade to a paid plan.
                </p>
                <button
                  onClick={onUpgrade}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-300"
                >
                  View Pricing Plans
                </button>
              </div>
            </div>
          )}

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`flex items-center ${
                    step.id < steps.length ? 'flex-1' : ''
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold border-2 ${
                      currentStep >= step.id
                        ? freeVideoUsed 
                          ? 'bg-red-500 border-red-500 text-white'
                          : 'bg-purple-500 border-purple-500 text-white'
                        : 'border-white/30 text-white/50'
                    }`}
                  >
                    {step.id}
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      currentStep >= step.id ? 'text-white' : 'text-white/50'
                    }`}
                  >
                    {step.name}
                  </span>
                  {step.id < steps.length && (
                    <div
                      className={`flex-1 h-1 mx-4 rounded ${
                        currentStep > step.id 
                          ? freeVideoUsed ? 'bg-red-500' : 'bg-purple-500'
                          : 'bg-white/20'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Current Step Content */}
          <div className={`backdrop-blur-sm rounded-2xl p-8 border mb-8 ${
            freeVideoUsed 
              ? 'bg-red-500/5 border-red-500/20' 
              : 'bg-white/5 border-white/10'
          }`}>
            {getCurrentComponent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                currentStep === 1
                  ? 'bg-white/10 text-white/50 cursor-not-allowed'
                  : freeVideoUsed
                  ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Previous
            </button>

            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                disabled={!canProceed() || freeVideoUsed}
                className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  canProceed() && !freeVideoUsed
                    ? freeVideoUsed
                      ? 'bg-red-500/20 text-red-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600'
                    : 'bg-white/10 text-white/50 cursor-not-allowed'
                }`}
              >
                {freeVideoUsed ? 'Upgrade Required' : 'Next'}
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            ) : currentStep === 3 ? (
              <button
                onClick={handleGenerate}
                disabled={!canProceed() || isGenerating || freeVideoUsed}
                className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  canProceed() && !isGenerating && !freeVideoUsed
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600'
                    : 'bg-white/10 text-white/50 cursor-not-allowed'
                }`}
              >
                {freeVideoUsed 
                  ? 'Upgrade Required' 
                  : isGenerating 
                  ? 'Generating...' 
                  : 'Generate Free Video (5s)'
                }
                {!isGenerating && <ArrowRight className="h-5 w-5 ml-2" />}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};