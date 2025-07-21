// src/components/AvatarPreview.tsx
import React from 'react';
import { AvatarCreator } from './AvatarCreator';

const AvatarPreview: React.FC = () => {
  const handleUpgrade = () => {
    console.log("Upgrade clicked");
  };

  const handleBack = () => {
    console.log("Back clicked");
  };

  return (
    <AvatarCreator
      onUpgrade={handleUpgrade}
      onBack={handleBack}
    />
  );
};

export default AvatarPreview;
