// netlify/functions/generate-video.js

const fetch = require("node-fetch");

exports.handler = async function (event) {
  try {
    // Parse the image URL from the frontend request
    const { imageUrl } = JSON.parse(event.body);

    if (!imageUrl) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing imageUrl in request body." }),
      };
    }

    // Send request to D-ID API to create video
    const response = await fetch("https://api.d-id.com/talks", {
      method: "POST",
      headers: {
        Authorization: "Bearer dGhla25pZ2h0bWVudG9yQGdtYWlsLmNvbQ:yBOob8F_U3g7m1o18KqhW",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_url: imageUrl,
        script: {
          type: "text",
          input: "Hey Herbert, your cinematic avatar is now talking!",
        },
      }),
    });

    const data = await response.json();

    // Handle errors from D-ID API
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: data }),
      };
    }

    // Success: return the video data
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    // Handle internal errors
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
