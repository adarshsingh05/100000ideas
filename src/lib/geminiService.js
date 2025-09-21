const GEMINI_API_KEY = "AIzaSyCoa0mbar6P4pbs7GCEeCW0njIfInMU8LA";
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

class GeminiService {
  constructor() {
    this.apiKey = GEMINI_API_KEY;
    this.apiUrl = GEMINI_API_URL;
  }

  // Generate context about the idea for the AI
  generateIdeaContext(idea) {
    return `
You are an AI assistant helping users understand and explore business ideas. Here's the information about the current idea:

**Idea Title:** ${idea.title}
**Category:** ${idea.category}
**Description:** ${idea.description}
**Investment Range:** ${idea.investmentRange}
**Time to Start:** ${idea.timeToStart}
**Target Audience:** ${idea.targetAudience}
**Business Model:** ${idea.businessModel}
**Market Size:** ${idea.marketSize}
**Key Features:** ${idea.keyFeatures?.join(", ") || "Not specified"}
**Revenue Streams:** ${idea.revenueStreams?.join(", ") || "Not specified"}
**Required Skills:** ${idea.requiredSkills?.join(", ") || "Not specified"}
**Competitive Advantage:** ${idea.competitiveAdvantage || "Not specified"}
**Challenges:** ${idea.challenges || "Not specified"}

You should help users understand this business idea, provide insights, answer questions about implementation, market potential, challenges, and any other aspects they might be curious about. Be helpful, informative, and encouraging while being realistic about potential challenges.
`;
  }

  // Get default welcome message
  getWelcomeMessage(ideaTitle) {
    return `Hello! I'm here to help you explore the "${ideaTitle}" business idea. I have all the details about this opportunity and can answer questions about:

• Implementation strategies
• Market analysis and potential
• Investment requirements and ROI
• Required skills and resources
• Potential challenges and solutions
• Competitive landscape
• Revenue projections
• And much more!

What would you like to know about this idea?`;
  }

  // Generate business ideas based on user preferences
  async generateIdeas(prompt) {
    try {
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
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
      };

      console.log("Sending idea generation request to Gemini API");

      const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Gemini API Error Response:", errorText);
        throw new Error(
          `Gemini API error: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Gemini API Response:", data);

      if (data.candidates && data.candidates[0]) {
        const candidate = data.candidates[0];
        console.log("Candidate data:", candidate);

        if (
          candidate.content &&
          candidate.content.parts &&
          candidate.content.parts[0]
        ) {
          const text = candidate.content.parts[0].text;
          console.log("Extracted text:", text);
          return text;
        } else if (candidate.text) {
          console.log("Using candidate.text:", candidate.text);
          return candidate.text;
        } else {
          console.error("Unexpected candidate structure:", candidate);
          throw new Error(
            "Invalid response format from Gemini API - no text found"
          );
        }
      } else {
        console.error("No candidates found in response:", data);
        throw new Error(
          "Invalid response format from Gemini API - no candidates"
        );
      }
    } catch (error) {
      console.error("Error calling Gemini API for idea generation:", error);
      throw error;
    }
  }

  // Send message to Gemini API
  async sendMessage(idea, userMessage, conversationHistory = []) {
    try {
      const ideaContext = this.generateIdeaContext(idea);

      // Build conversation history for context
      let conversationContext = ideaContext + "\n\nConversation History:\n";
      conversationHistory.forEach((msg) => {
        conversationContext += `${msg.role === "user" ? "User" : "AI"}: ${
          msg.content
        }\n`;
      });
      conversationContext += `User: ${userMessage}\nAI:`;

      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: conversationContext,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
      };

      console.log("Sending request to Gemini API:", {
        url: `${this.apiUrl}?key=${this.apiKey.substring(0, 10)}...`,
        body: requestBody,
      });

      const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Gemini API Error Response:", errorText);
        throw new Error(
          `Gemini API error: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Gemini API Response:", data);

      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return {
          success: true,
          message: data.candidates[0].content.parts[0].text,
        };
      } else {
        throw new Error("Invalid response format from Gemini API");
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

export const geminiService = new GeminiService();
