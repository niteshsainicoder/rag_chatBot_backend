import axios from "axios";
import { qdrant } from "../../index.js";


export const embedQuery = async (query) => {
  try {
    const response = await axios.post(
      process.env.JINA_URL,
      {
        model: "jina-embeddings-v3",
        task: "text-matching",
        input: Array.isArray(query) ? query : [query]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.JINA_API_KEY}`
        }
      }
    );

    return response.data?.data[0]?.embedding;
  } catch (error) {
    console.error("Error embedding query:", error.response?.data || error.message);
    throw error;
  }
};
export const getTopPassages = async (query) => {
  try {
    const queryEmbedding = await embedQuery(query);

        const searchResult = await qdrant.search("news_articles", { 
      vector: { 
        name: "text", 
        vector: queryEmbedding,
      },
      limit: 5,
      with_payload: true, 
    });
    
    return JSON.stringify(searchResult);

  } catch (error) {
    console.error("Error performing vector search:", error);
    return [];
  }
};
