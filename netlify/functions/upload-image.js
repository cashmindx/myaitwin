// netlify/functions/upload-image.js

export async function handler(event) {
  try {
    const { fileBase64, publicId } = JSON.parse(event.body);

    const formData = new FormData();
    formData.append("file", fileBase64);
    formData.append("upload_preset", "YOUR_UPLOAD_PRESET");
    formData.append("public_id", publicId);

    const res = await fetch("https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    return {
      statusCode: res.ok ? 200 : res.status,
      body: JSON.stringify(data)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
