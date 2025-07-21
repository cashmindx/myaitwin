import React, { useState } from "react";

// Named export for AvatarPreview
export function AvatarPreview({ photo }: { photo: string | null }) {
  if (!photo) {
    return <div>No avatar photo uploaded yet.</div>;
  }
  return (
    <div>
      <img
        src={photo}
        alt="Avatar Preview"
        style={{ maxWidth: "200px", borderRadius: "8px" }}
      />
    </div>
  );
}

// Named export for VoiceInput
export function VoiceInput({
  voiceText,
  setVoiceText,
}: {
  voiceText: string;
  setVoiceText: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div style={{ marginTop: "20px" }}>
      <label htmlFor="voice-input" style={{ fontWeight: "bold" }}>
        Enter Voice Text / Script for Voice:
      </label>
      <textarea
        id="voice-input"
        rows={4}
        style={{ width: "100%", marginTop: "5px" }}
        placeholder="Type what the avatar should say..."
        value={voiceText}
        onChange={(e) => setVoiceText(e.target.value)}
      />
    </div>
  );
}

// Named export for ScriptInput
export function ScriptInput({
  script,
  setScript,
}: {
  script: string;
  setScript: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div style={{ marginTop: "20px" }}>
      <label htmlFor="script-input" style={{ fontWeight: "bold" }}>
        Enter Your Script / Story:
      </label>
      <textarea
        id="script-input"
        rows={6}
        style={{ width: "100%", marginTop: "5px" }}
        placeholder="Write your story or script here..."
        value={script}
        onChange={(e) => setScript(e.target.value)}
      />
    </div>
  );
}

// Named export for PhotoUpload
export function PhotoUpload({
  photo,
  setPhoto,
}: {
  photo: string | null;
  setPhoto: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <label htmlFor="photo-upload" style={{ fontWeight: "bold" }}>
        Upload Your Photo:
      </label>
      <input
        id="photo-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      {photo && (
        <div style={{ marginTop: "10px" }}>
          <img
            src={photo}
            alt="Uploaded Avatar"
            style={{ maxWidth: "200px", borderRadius: "8px" }}
          />
        </div>
      )}
    </div>
  );
}

// Named export for VideoPreview
export function VideoPreview({ videoUrl }: { videoUrl: string | null }) {
  if (!videoUrl) {
    return (
      <div style={{ marginTop: "20px", fontStyle: "italic", color: "#555" }}>
        Video preview will appear here after generation.
      </div>
    );
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <label style={{ fontWeight: "bold" }}>Video Preview:</label>
      <video
        src={videoUrl}
        controls
        style={{ width: "100%", maxWidth: "500px", borderRadius: "8px" }}
      />
    </div>
  );
}

// Default export for the main App component
export default function App() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [voiceText, setVoiceText] = useState("");
  const [script, setScript] = useState("");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleGenerateVideo = () => {
    if (!photo || !voiceText || !script) {
      alert("Please upload photo, enter voice text, and write script.");
      return;
    }
    // Simulate video generation
    setVideoUrl(
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
    );
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Create Your AI Avatar Video</h1>
      <PhotoUpload photo={photo} setPhoto={setPhoto} />
      <VoiceInput voiceText={voiceText} setVoiceText={setVoiceText} />
      <ScriptInput script={script} setScript={setScript} />

      <button
        onClick={handleGenerateVideo}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Generate Video
      </button>

      <VideoPreview videoUrl={videoUrl} />
    </div>
  );
}
