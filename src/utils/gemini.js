import axios from 'axios';
import { embedQuery } from "./getTopPassage.js"


export const getGeminiResponse = async (passages, query) => {
  ;

  const prompt = `
You are a helpful assistant answering questions from a news database. and also modify little bit if you find some improvement.

Context:
${passages}

Question:
${query}

Answer:
`;


  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const answer = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not understand that.';
 
    return answer;
  } catch (error) {
    console.error('Error in getGeminiResponse:', error.response?.data || error);
    throw error;
  }
};
