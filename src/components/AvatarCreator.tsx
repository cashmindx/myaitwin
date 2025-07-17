import React, { useState } from 'react';
import { PhotoUpload } from './PhotoUpload';
import { VoiceInput } from './VoiceInput';
import { ScriptInput } from './ScriptInput';
import { VideoPreview } from './VideoPreview';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface AvatarCreatorProps {
  onUpgrade: () => void;
  onBack: () => void;
}

export const AvatarCreator: React.FC<AvatarCreatorProps> = ({ onUpgrade, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [script, setScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

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
    // Simulate video generation
    setTimeout(() => {
      setIsGenerating(false);
      setCurrentStep(4);
    }, 3000);
  };

  const getCurrentComponent = () => {
    switch (currentStep) {
      case 1:
        return <PhotoUpload onPhotoUpload={setUploadedPhoto} uploadedPhoto={uploadedPhoto} />;
      case 2:
        return <VoiceInput onVoiceSelect={setSelectedVoice} selectedVoice={selectedVoice} />;
      case 3:
        return <ScriptInput script={script} onScriptChange={setScript} />;
      case 4:
        return <VideoPreview isGenerating={isGenerating} onUpgrade={onUpgrade} />;
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
              className="flex items-center text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </button>
          </div>

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
                        ? 'bg-purple-500 border-purple-500 text-white'
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
                        currentStep > step.id ? 'bg-purple-500' : 'bg-white/20'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Current Step Content */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
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
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Previous
            </button>

            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  canProceed()
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600'
                    : 'bg-white/10 text-white/50 cursor-not-allowed'
                }`}
              >
                Next
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            ) : currentStep === 3 ? (
              <button
                onClick={handleGenerate}
                disabled={!canProceed() || isGenerating}
                className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  canProceed() && !isGenerating
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600'
                    : 'bg-white/10 text-white/50 cursor-not-allowed'
                }`}
              >
                {isGenerating ? 'Generating...' : 'Generate Video'}
                {!isGenerating && <ArrowRight className="h-5 w-5 ml-2" />}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};