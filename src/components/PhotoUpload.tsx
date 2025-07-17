import React, { useRef, useState } from 'react';
import { Upload, Camera, X } from 'lucide-react';

interface PhotoUploadProps {
  onPhotoUpload: (photo: string) => void;
  uploadedPhoto: string | null;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({ onPhotoUpload, uploadedPhoto }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onPhotoUpload(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    onPhotoUpload('');
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">Upload Your Photo</h2>
      <p className="text-white/70 mb-8">
        Choose a clear, front-facing photo for the best results
      </p>

      {uploadedPhoto ? (
        <div className="relative inline-block">
          <img
            src={uploadedPhoto}
            alt="Uploaded"
            className="w-64 h-64 object-cover rounded-2xl border-4 border-purple-500/50"
          />
          <button
            onClick={handleRemovePhoto}
            className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-12 transition-all duration-300 cursor-pointer ${
            isDragging
              ? 'border-purple-400 bg-purple-500/20'
              : 'border-white/30 hover:border-purple-400 hover:bg-white/5'
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center">
              <Upload className="h-8 w-8 text-purple-400" />
            </div>
            <div>
              <p className="text-white text-lg font-medium mb-2">
                {isDragging ? 'Drop your photo here' : 'Drag & drop your photo here'}
              </p>
              <p className="text-white/60 text-sm">
                or click to browse files
              </p>
            </div>
            <div className="flex items-center space-x-2 text-white/50 text-sm">
              <Camera className="h-4 w-4" />
              <span>JPG, PNG, or WebP (Max 10MB)</span>
            </div>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};