# RAG Chatbot Backend

This is the backend for a RAG-powered chatbot that allows users to query a set of news articles. It retrieves contextually relevant passages using vector similarity search and generates responses using Google Gemini Pro.

## 🛠️ Tech Stack

- **Backend Framework**: Node.js + Express
- **Embeddings**: [Jina AI Embeddings](https://jina.ai)
- **Vector Store**: [Qdrant Cloud](https://qdrant.tech)
- **Session Cache**: Redis
- **LLM API**: Google Gemini Pro (via REST API)
- **Storage**: Local file system (for PDFs/news uploads)

---

## 📁 Project Structure

backend/
├── controllers/
│ └── chatController.js
├── routes/
│ └── chatRoutes.js
├── services/
│ ├── embeddingService.js
│ ├── vectorStoreService.js
│ └── llmService.js
├── utils/
│ └── redisClient.js
├── app.js
├── server.js
└── .env

yaml
Copy
Edit

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/rag-chatbot-backend.git
cd rag-chatbot-backend
2. Install dependencies
bash
Copy
Edit
npm install
3. Create a .env file
bash
Copy
Edit
cp .env.example .env
Fill in the following variables in your .env:

env
Copy
Edit
PORT=8000

# Jina Embedding API
JINA_API_KEY=your_jina_api_key

# Qdrant Configuration
QDRANT_API_KEY=your_qdrant_api_key
QDRANT_URL=https://your-qdrant-instance-url

# Google Gemini
GEMINI_API_KEY=your_gemini_api_key

# Redis
REDIS_URL=redis://localhost:6379
🧪 Running the Server
bash
Copy
Edit
npm run dev
The server will start on http://localhost:8000.

🧩 API Endpoints
POST /api/chat/ask
Ask a question based on the ingested news articles.

Request Body:
json
Copy
Edit
{
  "sessionId": "uuid-value",
  "query": "What is the latest about electric vehicles?"
}
Response:
json
Copy
Edit
{
  "answer": "Electric vehicles are becoming more popular due to..."
}
🔁 Workflow
User uploads or queries content.

Query is embedded using Jina.

Qdrant retrieves top-k similar chunks.

Google Gemini generates a response using retrieved context.

Redis is used to store session-based chat history.

📦 Deployment
The backend is deployed on Render using the free tier (512MB RAM). Ensure CORS is properly configured for frontend communication.

🛡️ CORS Note
Make sure to whitelist your frontend domain:

js
Copy
Edit
const corsOptions = {
  origin: ['https://your-frontend.vercel.app', 'http://localhost:5173'],
  credentials: true,
};
app.use(cors(corsOptions));
📃 License
This project is licensed under the MIT License.

🙋‍♂️ Author
Nitesh Saini
Full Stack Developer

Portfolio: https://niteshdev.vercel.app

GitHub: https://github.com/niteshsainicoder

LinkedIn: https://linkedin.com/in/nitesh-saini-dev

yaml
Copy
Edit

---

Would you like a separate `README.md` for the **frontend** too?
