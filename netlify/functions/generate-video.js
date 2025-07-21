// netlify/functions/generate-video.js

export async function handler(event) {
  try {
    const { imageUrl } = JSON.parse(event.body);

    if (!imageUrl) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing imageUrl" })
      };
    }

    const response = await fetch("https://api.d-id.com/talks", {
      method: "POST",
      headers: {
        Authorization: "Bearer YOUR_DID_API_KEY",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        source_url: imageUrl,
        script: {
          type: "text",
          input: "Hey Herbert, your cinematic avatar is now talking!"
        }
      })
    });

    const data = await response.json();

    return {
      statusCode: response.ok ? 200 : response.status,
      body: JSON.stringify(data)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
