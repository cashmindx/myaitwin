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
      method: "POST",
      headers: {
        Authorization: "Bearer dGhla25pZ2h0bWVudG9yQGdtYWlsLmNvbQ:yBOob8F_U3g7m1o18KqhW",
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

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: data })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
