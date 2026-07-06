```javascript
/**
 * Vercel Serverless Function: api/analyze.js
 * Purpose: Secure, resilient interface to Gemini API with advanced error handling.
 */

export default async function handler(req, res) {
    // 1. Handle CORS Preflight (prevents 500 errors on browser security checks)
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(200).end();
    }

    // Set CORS headers for all responses
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'Server error: Configuration missing.' });
    }

    // 2. Validate request body (prevents 500 errors on missing data)
    const { prompt } = req.body || {};
    if (!prompt) {
        return res.status(400).json({ error: 'Bad Request: Missing prompt.' });
    }
    
    // 3. Use the explicit '-latest' model tag to resolve 404s
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
    
    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: { 
            parts: [{ text: "You are an expert machine learning mentor. Explain concepts clearly with real-world analogies." }] 
        }
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        // 4. Safely handle API failures and extract useful error messages
        if (!response.ok) {
            const errorData = await response.text();
            console.error("Google API Response Error:", errorData);
            return res.status(502).json({ error: `AI Provider Error: ${response.status}` });
        }
        
        const result = await response.json();
        const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
        
        return res.status(200).json({ text });
        
    } catch (error) {
        // 5. Catch runtime errors (network timeouts, JSON parsing) before they hit 500
        console.error("Critical Backend Error:", error);
        return res.status(500).json({ error: 'Internal Server Error during AI processing.' });
    }
}

```
