import React from 'react';
import { 
  Brain, 
  Mic, 
  Video, 
  Palette, 
  Globe, 
  Shield, 
  Zap, 
  Users, 
  Heart,
  Eye,
  Sparkles,
  MessageSquare,
  Camera,
  Music,
  Smile,
  Target
} from 'lucide-react';

export const Features: React.FC = () => {
  const revolutionaryFeatures = [
    {
      icon: Brain,
      title: 'Emotion Intelligence',
      description: 'AI analyzes your facial expressions and matches emotions to your script automatically',
      category: 'AI Innovation',
      color: 'purple'
    },
    {
      icon: Eye,
      title: 'Micro-Expression Control',
      description: 'Fine-tune eyebrow movements, eye contact, and subtle facial expressions',
      category: 'Advanced Control',
      color: 'blue'
    },
    {
      icon: Heart,
      title: 'Confidence Booster Mode',
      description: 'Special algorithm that enhances your natural charisma and speaking confidence',
      category: 'Psychology',
      color: 'red'
    },
    {
      icon: Music,
      title: 'Voice Emotion Matching',
      description: 'AI matches your voice tone to facial expressions for perfect synchronization',
      category: 'Audio Innovation',
      color: 'green'
    },
    {
      icon: Palette,
      title: 'Dynamic Background AI',
      description: 'AI generates contextual backgrounds that match your speech content',
      category: 'Visual AI',
      color: 'yellow'
    },
    {
      icon: MessageSquare,
      title: 'Real-time Script Optimization',
      description: 'AI suggests improvements to your script for maximum impact',
      category: 'Content AI',
      color: 'indigo'
    },
    {
      icon: Target,
      title: 'Audience Adaptation',
      description: 'Customize your AI Twin for different audiences (professional, casual, educational)',
      category: 'Personalization',
      color: 'pink'
    },
    {
      icon: Sparkles,
      title: 'Holographic Mode',
      description: 'Generate hologram-style videos for futuristic presentations',
      category: 'Future Tech',
      color: 'cyan'
    }
  ];

  const coreFeatures = [
    {
      icon: Camera,
      title: 'Advanced Face Analysis',
      description: 'Deep learning facial recognition with 99.9% accuracy',
      color: 'purple'
    },
    {
      icon: Mic,
      title: 'Voice Cloning Technology',
      description: 'Perfect voice replication with emotional nuances',
      color: 'blue'
    },
    {
      icon: Video,
      title: 'Ultra-HD Video Generation',
      description: 'Up to 8K resolution with cinematic quality',
      color: 'green'
    },
    {
      icon: Globe,
      title: 'Multi-Language Support',
      description: 'Speak in 50+ languages with native pronunciation',
      color: 'red'
    },
    {
      icon: Shield,
      title: 'Privacy Protection',
      description: 'End-to-end encryption and secure data handling',
      color: 'yellow'
    },
    {
      icon: Zap,
      title: 'Lightning Fast Processing',
      description: 'Generate videos in under 60 seconds',
      color: 'indigo'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      green: 'bg-green-500/20 text-green-400 border-green-500/30',
      red: 'bg-red-500/20 text-red-400 border-red-500/30',
      yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      indigo: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      pink: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      cyan: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
    };
    return colors[color as keyof typeof colors] || colors.purple;
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900/50 to-purple-900/50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Revolutionary Features */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">
              Revolutionary Features
              <span className="block text-2xl font-normal text-purple-400 mt-2">
                Never Before Created Technology
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Experience the future of AI avatars with groundbreaking features that don't exist anywhere else
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {revolutionaryFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border hover:bg-white/10 transition-all duration-300 transform hover:scale-105 ${getColorClasses(feature.color)}`}
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-3 ${getColorClasses(feature.color)}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="text-xs font-medium text-white/60 bg-white/10 px-2 py-1 rounded-full">
                      {feature.category}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>

          {/* Core Features */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Core Technology</h3>
            <p className="text-white/70">Built on cutting-edge AI and machine learning</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className={`bg-white/5 backdrop-blur-sm rounded-2xl p-8 border hover:bg-white/10 transition-all duration-300 ${getColorClasses(feature.color)}`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto ${getColorClasses(feature.color)}`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 text-center">{feature.title}</h3>
                  <p className="text-white/70 text-center leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>

          {/* Special Features for Shy People */}
          <div className="mt-20 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-3xl p-8 border border-purple-500/20">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">
                🎯 Designed for Shy Individuals
              </h3>
              <p className="text-white/70 text-lg">
                Overcome social anxiety and deliver confident presentations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smile className="h-8 w-8 text-green-400" />
                </div>
                <h4 className="text-white font-semibold mb-2">Confidence Builder</h4>
                <p className="text-white/70 text-sm">Practice in private, present with confidence</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-400" />
                </div>
                <h4 className="text-white font-semibold mb-2">Social Anxiety Relief</h4>
                <p className="text-white/70 text-sm">No more fear of public speaking</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-purple-400" />
                </div>
                <h4 className="text-white font-semibold mb-2">Perfect Delivery</h4>
                <p className="text-white/70 text-sm">Your message, delivered flawlessly</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-yellow-400" />
                </div>
                <h4 className="text-white font-semibold mb-2">Professional Impact</h4>
                <p className="text-white/70 text-sm">Make lasting impressions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};