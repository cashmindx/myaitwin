// netlify/functions/upload-image.js

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.handler = async function(event) {
  try {
    const { imageUrl } = JSON.parse(event.body); // or use file buffer if uploading directly

    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: "avatars",
      use_filename: true,
      unique_filename: false,
      overwrite: true
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ imageUrl: result.secure_url })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
