const fs = require("fs");
// const fetch = require("node-fetch");

async function query(imageUrl) {
  try {
    // First fetch the image from URL
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Image fetch failed: ${imageResponse.status}`);
    }

    // Get image buffer
    const arrayBuffer = await imageResponse.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer); // Convert to Node.js Buffer

    // Send to detection API
    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/haywoodsloan/ai-image-detector-dev-deploy",
      {
        headers: {
          Authorization: "Bearer ",
          "Content-Type": "application/octet-stream",
        },
        method: "POST",
        body: imageBuffer,
      }
    );

    // Check for HTML responses
    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      const text = await response.text();
      throw new Error(`Unexpected response: ${text.slice(0, 100)}`);
    }

    // const res = await response.json()
    // console.log(res[0].label);
    return response.json();
  } catch (error) {
    console.error("Detection failed:", error.message);
    throw error;
  }
}

function getTopResult(response) {
  return response.reduce(
    (top, current) => (current.score > top.score ? current : top),
    { score: -Infinity }
  );
}

// Example usage with URL
query("https://pbs.twimg.com/media/F9CzN8LWwAAIW-R?format=jpg&name=medium")
  .then((response) => {
    const top = getTopResult(response);
    console.log(
      `Most confident result: ${top.label} (${(top.score * 100).toFixed(1)}%)`
    );
  })
  .catch(console.error);
