import React from 'react';
import { FileText, Sparkles } from 'lucide-react';

interface ScriptInputProps {
  script: string;
  onScriptChange: (script: string) => void;
}

export const ScriptInput: React.FC<ScriptInputProps> = ({ script, onScriptChange }) => {
  const maxLength = 500;
  const sampleScripts = [
    "Hi, I'm excited to share my latest project with you. This AI Twin technology represents the future of personalized communication.",
    "Welcome to my presentation. Today, I'll walk you through our innovative solution that's changing how we connect with our audience.",
    "Thank you for joining me. I'm passionate about creating meaningful experiences through technology, and I can't wait to show you what we've built.",
  ];

  const handleSampleScript = (sample: string) => {
    onScriptChange(sample);
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">Write Your Script</h2>
      <p className="text-white/70 mb-8">
        Create a personalized message that your AI Twin will deliver
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Script Input */}
        <div>
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <div className="flex items-center mb-4">
              <FileText className="h-5 w-5 text-purple-400 mr-2" />
              <span className="text-white font-medium">Your Script</span>
            </div>
            
            <textarea
              value={script}
              onChange={(e) => onScriptChange(e.target.value)}
              placeholder="Enter your message here..."
              className="w-full h-64 bg-white/10 border border-white/20 rounded-lg p-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              maxLength={maxLength}
            />
            
            <div className="flex justify-between items-center mt-4">
              <span className="text-white/60 text-sm">
                {script.length}/{maxLength} characters
              </span>
              <div className={`text-sm ${
                script.length > maxLength * 0.9 ? 'text-red-400' : 'text-white/60'
              }`}>
                {script.length > maxLength * 0.9 && 'Character limit approaching'}
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full text-sm hover:bg-purple-500/30 transition-colors">
              Add Emoji
            </button>
            <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm hover:bg-blue-500/30 transition-colors">
              Check Grammar
            </button>
            <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm hover:bg-green-500/30 transition-colors">
              Improve Tone
            </button>
          </div>
        </div>

        {/* Sample Scripts */}
        <div>
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <div className="flex items-center mb-4">
              <Sparkles className="h-5 w-5 text-yellow-400 mr-2" />
              <span className="text-white font-medium">Sample Scripts</span>
            </div>
            
            <div className="space-y-4">
              {sampleScripts.map((sample, index) => (
                <div
                  key={index}
                  className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  onClick={() => handleSampleScript(sample)}
                >
                  <p className="text-white/80 text-sm leading-relaxed">
                    {sample}
                  </p>
                  <button className="mt-2 text-purple-400 text-sm hover:text-purple-300 transition-colors">
                    Use this script
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-400 text-xs font-bold">!</span>
              </div>
              <div>
                <h4 className="text-blue-400 font-medium mb-1">Tips for Better Results</h4>
                <ul className="text-blue-300/80 text-sm space-y-1">
                  <li>• Keep sentences short and clear</li>
                  <li>• Use natural, conversational language</li>
                  <li>• Add pauses with commas and periods</li>
                  <li>• Practice reading it aloud first</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};