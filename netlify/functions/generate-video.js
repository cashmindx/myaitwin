// netlify/functions/generate-video.js

export async function handler(event) {
  try {
    const { imageUrl } = JSON.parse(event.body);

    if (!imageUrl) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing imageUrl in request body." })
      };
    }

    const response = await fetch("https://api.d-id.com/talks", {
      method
