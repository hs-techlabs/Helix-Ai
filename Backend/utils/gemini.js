import "dotenv/config";

const getGeminiResponse = async (message) => {
    const apiKey = process.env.GEMINI_API_KEY;
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": apiKey
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [
                        {
                            text: message
                        }
                    ]
                }
            ]
        })
    };

    try {
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent", options);
        const data = await response.json();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
            return data.candidates[0].content.parts[0].text;
        } else {
            console.error("Unexpected Gemini API response structure:", JSON.stringify(data));
            if (data.error) {
                return `Error from Gemini API: ${data.error.message}`;
            }
            return "Error: Received unexpected response structure from Gemini API.";
        }
    } catch (err) {
        console.error("Gemini API call failed:", err);
        throw err;
    }
}

export default getGeminiResponse;
