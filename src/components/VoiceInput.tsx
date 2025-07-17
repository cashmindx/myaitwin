import React, { useState, useRef } from 'react';
import { Mic, Upload, Play, Pause, Volume2 } from 'lucide-react';

interface VoiceInputProps {
  onVoiceSelect: (voice: string) => void;
  selectedVoice: string | null;
  faceAnalysis?: any;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({ onVoiceSelect, selectedVoice, faceAnalysis }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const prebuiltVoices = [
    { id: 'sarah', name: 'Sarah', description: 'Professional, clear voice', gender: 'female' },
    { id: 'emma', name: 'Emma', description: 'Energetic, youthful', gender: 'female' },
    { id: 'sophia', name: 'Sophia', description: 'Warm, friendly tone', gender: 'female' },
    { id: 'isabella', name: 'Isabella', description: 'Confident, articulate', gender: 'female' },
    { id: 'david', name: 'David', description: 'Warm, friendly tone', gender: 'male' },
    { id: 'james', name: 'James', description: 'Deep, authoritative', gender: 'male' },
  ];

  // Filter voices based on detected gender
  const recommendedVoices = faceAnalysis 
    ? prebuiltVoices.filter(voice => voice.gender === faceAnalysis.gender)
    : prebuiltVoices;

  const otherVoices = faceAnalysis 
    ? prebuiltVoices.filter(voice => voice.gender !== faceAnalysis.gender)
    : [];
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        onVoiceSelect('recorded');
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playAudio = () => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current = new Audio(audioUrl);
      audioRef.current.play();
      setIsPlaying(true);
      audioRef.current.onended = () => setIsPlaying(false);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">Choose Your Voice</h2>
      <p className="text-white/70 mb-8">
        Select a prebuilt voice, record your own, or upload an audio file
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Prebuilt Voices */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            {faceAnalysis ? `Recommended ${faceAnalysis.gender} Voices` : 'Prebuilt Voices'}
          </h3>
          
          {faceAnalysis && (
            <div className="mb-4 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <p className="text-purple-300 text-sm">
                🎯 Based on your photo analysis, we recommend these {faceAnalysis.gender} voices for the most realistic result.
              </p>
            </div>
          )}
          
          <div className="space-y-3">
            {recommendedVoices.map((voice) => (
              <div
                key={voice.id}
                onClick={() => onVoiceSelect(voice.id)}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                  selectedVoice === voice.id
                    ? 'bg-purple-500/30 border-2 border-purple-400'
                    : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className="font-medium text-white">{voice.name}</div>
                    <div className="text-sm text-white/70">{voice.description}</div>
                  </div>
                  <button className="p-2 bg-purple-500/20 rounded-full hover:bg-purple-500/30 transition-colors">
                    <Play className="h-4 w-4 text-purple-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Other Gender Voices */}
          {otherVoices.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-medium text-white/80 mb-3">Other Voices</h4>
              <div className="space-y-2">
                {otherVoices.map((voice) => (
                  <div
                    key={voice.id}
                    onClick={() => onVoiceSelect(voice.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-300 opacity-70 ${
                      selectedVoice === voice.id
                        ? 'bg-purple-500/20 border border-purple-400/50'
                        : 'bg-white/5 border border-transparent hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <div className="font-medium text-white text-sm">{voice.name}</div>
                        <div className="text-xs text-white/60">{voice.description}</div>
                      </div>
                      <button className="p-1 bg-purple-500/20 rounded-full hover:bg-purple-500/30 transition-colors">
                        <Play className="h-3 w-3 text-purple-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Recording and Upload */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Custom Voice</h3>
          
          {/* Voice Recording */}
          <div className="bg-white/5 rounded-lg p-6 mb-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                <Mic className="h-8 w-8 text-red-400" />
              </div>
              <div className="text-center">
                <p className="text-white font-medium mb-2">Record Your Voice</p>
                <p className="text-white/60 text-sm">Click and speak for 10-30 seconds</p>
              </div>
              
              {audioBlob && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={isPlaying ? pauseAudio : playAudio}
                    className="p-2 bg-purple-500/20 rounded-full hover:bg-purple-500/30 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4 text-purple-400" />
                    ) : (
                      <Play className="h-4 w-4 text-purple-400" />
                    )}
                  </button>
                  <span className="text-white/70 text-sm">Recording ready</span>
                </div>
              )}
              
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  isRecording
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-purple-500 hover:bg-purple-600 text-white'
                }`}
              >
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </button>
            </div>
          </div>

          {/* File Upload */}
          <div className="bg-white/5 rounded-lg p-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Upload className="h-8 w-8 text-blue-400" />
              </div>
              <div className="text-center">
                <p className="text-white font-medium mb-2">Upload Audio File</p>
                <p className="text-white/60 text-sm">MP3, WAV, or M4A (Max 50MB)</p>
              </div>
              <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium transition-all duration-300">
                Choose File
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};