import React from 'react';
import { Play, Zap, Users, Download, Volume2, VolumeX } from 'lucide-react';
import { VideoModal } from './VideoModal';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(true);
  const [showVideoModal, setShowVideoModal] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Video Section */}
          <div className="mb-12">
            <div className="relative max-w-3xl mx-auto">
              <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-4">See My AI Twin in Action</h2>
                <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    muted={isMuted}
                    loop
                    playsInline
                    poster="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=800"
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                    onClick={() => setShowVideoModal(true)}
                  >
                    {/* Add your video source here */}
                    <source src="/welcome-video.mp4" type="video/mp4" />
                    {/* Fallback for browsers that don't support MP4 */}
                    <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Video Controls Overlay */}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={toggleVideo}
                        className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                      >
                        {isVideoPlaying ? (
                          <div className="w-4 h-4 bg-white rounded-sm"></div>
                        ) : (
                          <Play className="h-8 w-8 text-white ml-1" />
                        )}
                      </button>
                      <button
                        onClick={toggleMute}
                        className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                      >
                        {isMuted ? (
                          <VolumeX className="h-5 w-5 text-white" />
                        ) : (
                          <Volume2 className="h-5 w-5 text-white" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {/* Video Loading State */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm cursor-pointer hover:bg-black/70 transition-colors">
                      Demo Video
                    </div>
                  </div>
                  
                  {/* Click to expand hint */}
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs opacity-70 hover:opacity-100 transition-opacity">
                      Click to expand
                    </div>
                  </div>
                </div>
                <p className="text-white/70 mt-4 text-sm">
                  Watch how easy it is to create your AI Twin in just a few steps
                </p>
              </div>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent animate-fade-in">
            Create Your
            <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              AI Twin
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your photo and voice into a lifelike digital persona. Create personalized videos that speak in your tone and style.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={onGetStarted}
              className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <Play className="inline-block w-5 h-5 mr-2 group-hover:animate-pulse" />
              Start Creating
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20">
              Watch Demo
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <Zap className="h-12 w-12 text-purple-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
              <p className="text-white/70">Generate your AI twin in minutes, not hours</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <Users className="h-12 w-12 text-blue-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-white mb-2">Personalized</h3>
              <p className="text-white/70">Speaks in your unique voice and style</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <Download className="h-12 w-12 text-green-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-white mb-2">Export & Share</h3>
              <p className="text-white/70">Download or share your videos anywhere</p>
            </div>
          </div>
        </div>
        
        {/* Video Modal */}
        <VideoModal
          isOpen={showVideoModal}
          onClose={() => setShowVideoModal(false)}
          videoSrc="/welcome-video.mp4"
          title="My AI Twin - Welcome Demo"
        />
      </div>
    </section>
  );
};