/**
 * Service for handling Gemini API calls
 */

const GEMINI_API_KEY = "AIzaSyA9V95TvXuhcKYgWF4Rbfzo8DjGwTs0_S4";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

// Function to transform business data using Gemini API
export const analyzeBusinessDataWithGemini = async (businessData) => {
  try {
    const prompt = `
    Analyze this business data and provide insights.
    
    Business Data:
    ${JSON.stringify(businessData, null, 2)}
    
    Ensure the response follows this exact JSON format:
    {
      "business_name": "string",
      "business_type": "string",
      "location": "string",
      "strengths": {
        "key_areas": ["string"],
        "detailed_explanation": "string"
      },
      "weaknesses": {
        "key_areas": ["string"],
        "detailed_explanation": "string"
      },
      "improvement_suggestions": [
        {
          "suggestion": "string",
          "impact_level": "Low/Medium/High",
          "expected_outcome": "string"
        }
      ]
    }
    
    Additional Notes:
    - Follow the JSON format exactly.
    - Do not omit any fields.
    - If data is missing, return an empty array or null.
    - Ensure impact_level is always one of: 'Low', 'Medium', 'High'.
    - Use the business_name, business_type, and location from the input data.
    - For strengths, analyze the marketing_channels_used, customer_demographics, and any positive metrics.
    - For weaknesses, analyze the biggest_challenges_faced and any metrics that are below target.
    - Provide at least 3-7 improvement suggestions with varying impact levels (Low, Medium, High).
    - Each suggestion should address a specific weakness.
    - Be creative with the suggestions, and provide different improvement ideas each time analysis is performed.
    - Each suggestion should be unique and address a different aspect of the business.
    `;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 1024,
      },
    };

    console.log("Sending request to Gemini API...");
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(
        `Gemini API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;

    // Extract the JSON from the response
    const jsonMatch =
      generatedText.match(/```json\n([\s\S]*?)```/) ||
      generatedText.match(/{[\s\S]*}/) ||
      null;

    if (jsonMatch) {
      let jsonStr = jsonMatch[1] || jsonMatch[0];
      // Clean up any unexpected characters
      jsonStr = jsonStr.replace(/^```json\s*|```\s*$/g, "").trim();

      const analyzedData = JSON.parse(jsonStr);
      console.log("Successfully processed data with Gemini:", analyzedData);

      // Ensure we have the right format
      const validatedData = {
        business_name: analyzedData.business_name || businessData.business_name,
        business_type: (
          analyzedData.business_type || businessData.business_type
        ).toString(),
        location: analyzedData.location || businessData.location,
        strengths: {
          key_areas: Array.isArray(analyzedData.strengths?.key_areas)
            ? analyzedData.strengths.key_areas
            : businessData.marketing_channels_used || [],
          detailed_explanation:
            analyzedData.strengths?.detailed_explanation ||
            "Leveraging existing strengths for business growth.",
        },
        weaknesses: {
          key_areas: Array.isArray(analyzedData.weaknesses?.key_areas)
            ? analyzedData.weaknesses.key_areas
            : businessData.biggest_challenges_faced || [],
          detailed_explanation:
            analyzedData.weaknesses?.detailed_explanation ||
            "Current challenges need to be addressed with strategic interventions.",
        },
        improvement_suggestions: Array.isArray(
          analyzedData.improvement_suggestions
        )
          ? analyzedData.improvement_suggestions
              .filter((suggestion) => suggestion && suggestion.suggestion)
              .map((suggestion) => ({
                suggestion: suggestion.suggestion,
                impact_level: ["Low", "Medium", "High"].includes(
                  suggestion.impact_level
                )
                  ? suggestion.impact_level
                  : "Medium",
                expected_outcome:
                  suggestion.expected_outcome ||
                  "Improved business performance",
              }))
          : [],
      };

      return validatedData;
    } else {
      console.error(
        "Failed to extract JSON from Gemini response:",
        generatedText
      );
      throw new Error("Failed to parse Gemini response");
    }
  } catch (error) {
    console.error("Error analyzing business data with Gemini:", error);
    throw new Error(`Failed to analyze business data: ${error.message}`);
  }
};
