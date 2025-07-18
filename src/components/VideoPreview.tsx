import React, { useState } from 'react';
import { Play, Download, Share2, Crown, Zap } from 'lucide-react';

interface VideoPreviewProps {
  isGenerating: boolean;
  onUpgrade: () => void;
  freeVideoUsed?: boolean;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({ isGenerating, onUpgrade, freeVideoUsed = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isGenerating) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <Zap className="h-12 w-12 text-white animate-bounce" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Creating Your AI Twin</h2>
        <p className="text-white/70 mb-8">
          Our AI is processing your photo, voice, and script...
        </p>
        <div className="max-w-md mx-auto">
          <div className="bg-white/10 rounded-full h-3 mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full animate-pulse" style={{ width: '75%' }}></div>
          </div>
          <p className="text-white/60 text-sm">This usually takes 2-3 minutes</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">Your AI Twin is Ready!</h2>
      <p className="text-white/70 mb-8">
        Preview your generated video and share it with the world
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Video Preview */}
        <div>
          <div className="bg-black/50 rounded-2xl p-8 border border-white/20">
            <div className="aspect-video bg-gradient-to-br from-purple-900 to-blue-900 rounded-lg flex items-center justify-center relative overflow-hidden">
              <video
                className="w-full h-full object-cover"
                controls
                poster="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=400"
                onLoadedData={() => {
                  console.log('Video loaded successfully');
                }}
                onError={(e) => {
                  console.error('Video loading error:', e);
                }}
              >
                <source src="/generated-ai-twin-video.mp4" type="video/mp4" />
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {!isPlaying && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                >
                  <Play className="h-10 w-10 text-white ml-1" />
                </button>
                </div>
              )}
              
              {/* Gender-appropriate avatar indicator */}
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="text-white text-sm">👩 Female Avatar</span>
              </div>
            </div>
          </div>

          {/* Free Video Used Warning */}
          {freeVideoUsed && (
            <div className="mt-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
              <div className="text-center">
                <h4 className="text-yellow-300 font-bold mb-2">⚡ Monthly Limit Reached!</h4>
                <p className="text-yellow-300/80 text-sm mb-4">
                  You've reached your monthly generation limit. Upgrade to continue creating amazing AI videos.
                </p>
                <button
                  onClick={onUpgrade}
                  className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300"
                >
                  Upgrade Now to Continue
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-center space-x-4">
            <button 
              className={`flex items-center px-6 py-3 rounded-full transition-all duration-300 ${
                freeVideoUsed 
                  ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600'
              }`}
              disabled={freeVideoUsed}
            >
              <Download className="h-5 w-5 mr-2" />
              Download Video
            </button>
            <button 
              className={`flex items-center px-6 py-3 rounded-full transition-all duration-300 ${
                freeVideoUsed 
                  ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              disabled={freeVideoUsed}
            >
              <Share2 className="h-5 w-5 mr-2" />
              Share
            </button>
          </div>
        </div>

        {/* Upgrade Options */}
        <div>
          <div className={`rounded-2xl p-6 border ${
            freeVideoUsed 
              ? 'bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/20' 
              : 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20'
          }`}>
            <div className="text-center mb-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                freeVideoUsed ? 'bg-yellow-500/20' : 'bg-purple-500/20'
              }`}>
               <Crown className={`h-8 w-8 ${freeVideoUsed ? 'text-yellow-400' : 'text-purple-400'}`} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {freeVideoUsed ? 'Upgrade Required!' : 'Upgrade to Pro'}
              </h3>
              <p className="text-white/70">
                {freeVideoUsed 
                  ? 'Monthly limit reached. Upgrade to continue creating!' 
                  : 'Unlock premium features and higher quality'
                }
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center text-white/80">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                <span>4K Video Resolution</span>
              </div>
              <div className="flex items-center text-white/80">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                <span>Unlimited Video Length</span>
              </div>
              <div className="flex items-center text-white/80">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                <span>Premium Voice Models</span>
              </div>
              <div className="flex items-center text-white/80">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                <span>Advanced Facial Animation</span>
              </div>
              <div className="flex items-center text-white/80">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                <span>Commercial License</span>
              </div>
            </div>

            <button
              onClick={onUpgrade}
              className={`w-full px-6 py-4 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                freeVideoUsed
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 animate-pulse'
                  : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600'
              }`}
            >
              {freeVideoUsed ? 'Upgrade Now - Required!' : 'Upgrade Now - $15/month'}
            </button>
          </div>

          <div className="mt-6 bg-white/5 rounded-lg p-4 border border-white/10">
            <h4 className="text-white font-medium mb-2">Video Details</h4>
            <div className="space-y-2 text-sm text-white/70">
              <div className="flex justify-between">
                <span>Plan:</span>
                <span className={freeVideoUsed ? 'text-red-400 font-bold' : 'text-green-400'}>
                  {freeVideoUsed ? 'Starter (Limit Reached)' : 'Starter Plan'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Resolution:</span>
                <span>720p HD</span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="text-green-400">Up to 60 seconds</span>
              </div>
              <div className="flex justify-between">
                <span>Format:</span>
                <span>MP4</span>
              </div>
              <div className="flex justify-between">
                <span>Quality:</span>
                <span>Standard (HD)</span>
              </div>
              <div className="flex justify-between">
                <span>Watermark:</span>
                <span className="text-yellow-400">Yes (Starter)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};