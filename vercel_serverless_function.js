export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Securely access the API key from Vercel's Environment Variables
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
        return res.status(500).json({ error: 'Server configuration error: API key missing.' });
    }

    const { prompt } = req.body;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    
    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: { 
            parts: [{ text: "You are an energetic, thrilling cricket commentator and expert tactician." }] 
        }
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            throw new Error(`Google API responded with status: ${response.status}`);
        }
        
        const result = await response.json();
        const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "Analysis unavailable.";
        
        // Send the secure response back to our frontend
        res.status(200).json({ text });
    } catch (error) {
        console.error("LLM Fetch Error:", error);
        res.status(500).json({ error: 'Failed to fetch from Gemini LLM.' });
    }
}