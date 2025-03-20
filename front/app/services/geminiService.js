export const analyzeBusinessDataWithGemini = async (businessData) => {
  try {
    const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    // Helper function to create business-specific prompts
    const createBusinessPrompt = (businessType) => {
      const prompts = {
        "Real Estate": {
          strengths:
            "Analyze marketing channels, property metrics, sales figures",
          weaknesses:
            "Property vacancy rates, challenges in portfolio management",
          focus: "property marketing strategies, client acquisition",
        },
        Automotive: {
          strengths: "Inventory management, sales performance",
          weaknesses: "Inventory turnover, service quality",
          focus: "showroom strategies, customer experience",
        },
        // Add prompts for other business types...
      };

      return (
        prompts[businessType] || {
          strengths: "general business metrics",
          weaknesses: "common operational challenges",
          focus: "industry best practices",
        }
      );
    };

    const promptConfig = createBusinessPrompt(businessData.business_type);

    const prompt = `[Optimized prompt structure...]`;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          topP: 0.9,
          topK: 40,
          maxOutputTokens: 1024,
        },
      }),
    });

    // Improved error handling
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Gemini API Error: ${errorData.error.message}`);
    }

    // Rest of the response handling...
  } catch (error) {
    console.error("Gemini Service Error:", error);
    throw new Error(`Business analysis failed: ${error.message}`);
  }
};
