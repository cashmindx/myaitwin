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
        Authorization: "Bearer YOUR_DID_API_KEY",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        source_url: imageUrl,
        script: {
          type: "text",
          input: "Hi! This is your myAITwin avatar speaking now.",
          provider: {
            type: "microsoft",
            voice_id: "en-US-JennyNeural"
          }
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
