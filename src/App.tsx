// src/App.tsx
import React from "react";
import AvatarPreview from "./components/AvatarPreview";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <AvatarPreview />
      </div>
    </div>
  );
};

export default App;


// src/components/AvatarPreview.tsx
import React from "react";
import AvatarCreator from "./AvatarCreator";

const AvatarPreview: React.FC = () => {
  const handleUpgrade = () => {
    console.log("Upgrade clicked");
  };

  const handleBack = () => {
    console.log("Back clicked");
  };

  return (
    <AvatarCreator onUpgrade={handleUpgrade} onBack={handleBack} />
  );
};

export default AvatarPreview;


// src/components/AvatarCreator.tsx
import React from "react";
import PhotoUpload from "./PhotoUpload";
import VoiceInput from "./VoiceInput";

interface AvatarCreatorProps {
  onUpgrade: () => void;
  onBack: () => void;
}

const AvatarCreator: React.FC<AvatarCreatorProps> = ({ onUpgrade, onBack }) => {
  return (
    <div className="p-6 rounded-xl shadow-xl bg-gray-900">
      <h1 className="text-2xl font-bold mb-4 text-center">Create Your AI Twin</h1>
      <PhotoUpload />
      <VoiceInput />
      <div className="mt-6 flex justify-between">
        <button onClick={onBack} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl">Back</button>
        <button onClick={onUpgrade} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl">Upgrade</button>
      </div>
    </div>
  );
};

export default AvatarCreator;


// src/components/PhotoUpload.tsx
import React from "react";

const PhotoUpload: React.FC = () => {
  return (
    <div className="mb-4">
      <label className="block text-sm mb-2">Upload Photo</label>
      <input type="file" accept="image/*" className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded" />
    </div>
  );
};

export default PhotoUpload;


// src/components/VoiceInput.tsx
import React from "react";

const VoiceInput: React.FC = () => {
  return (
    <div className="mb-4">
      <label className="block text-sm mb-2">Record or Upload Voice</label>
      <input type="file" accept="audio/*" className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded" />
    </div>
  );
};

export default VoiceInput;
