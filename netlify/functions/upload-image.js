import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function handler(event) {
  try {
    const { imageUrl } = JSON.parse(event.body); // assuming URL is already uploaded

    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: "avatars",
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ imageUrl: result.secure_url }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
