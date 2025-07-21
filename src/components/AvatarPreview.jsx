import { useState } from "react";

export default function AvatarPreview() {
  const [imageFile, setImageFile] = useState(null);
  const [cloudinaryUrl, setCloudinaryUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function handleUpload() {
    if (!imageFile) return;
    setIsLoading(true);
    const base64 = await convertToBase64(imageFile);

    const uploadRes = await fetch("/.netlify/functions/upload-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileBase64: base64,
        publicId: "herbert-avatar"
      })
    });

    const uploadData = await uploadRes.json();
    setCloudinaryUrl(uploadData.secure_url);

    const videoRes = await fetch("/.netlify/functions/generate-video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl: uploadData.secure_url })
    });

    const videoData = await videoRes.json();
    setVideoUrl(videoData.result_url);
    setIsLoading(false);
  }

  return (
    <div className="max-w-lg mx-auto text-center p-6 bg-black rounded-xl text-white">
      <h2 className="text-2xl font-bold mb-4">🎬 STARMAKER: Avatar Preview</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
        className="mb-4 bg-gray-800 p-2 text-sm rounded"
      />

      <button
        onClick={handleUpload}
        disabled={!imageFile || isLoading}
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
      >
        {isLoading ? "Generating Scene..." : "Start Preview"}
      </button>

      {cloudinaryUrl && (
        <div className="mt-6">
          <h4 className="text-lg mb-2">🖼️ Original Photo</h4>
          <img src={cloudinaryUrl} alt="Avatar" className="rounded-md shadow-md" />
        </div>
      )}

      {videoUrl && (
        <div className="mt-6">
          <h4 className="text-lg mb-2">🎥 Lip-Sync Animation</h4>
          <video src={videoUrl} autoPlay muted controls className="rounded-md shadow-lg" />
        </div>
      )}
    </div>
  );
}
