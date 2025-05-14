# RAG Chatbot Backend

This is the backend for a RAG-powered chatbot that allows users to query a set of news articles. It retrieves contextually relevant passages using vector similarity search and generates responses using Google Gemini Pro.

---

## 🛠️ Tech Stack

- **Backend Framework:** Node.js + Express
- **Embeddings:** [Jina AI Embeddings](https://jina.ai)
- **Vector Store:** [Qdrant Cloud](https://qdrant.tech)
- **Session Cache:** Redis
- **LLM API:** Google Gemini  (via REST API)


---

## 📁 Project Structure

```
backend/
├── controllers/
│   |── chatController.js
│   |── ingestController.js
│
├── routes/
│   |── chatRoutes.js
│   |── ingestRoutes.js
│
├── utils/
│   |── gemini.js
│   |── getTopPassege.js 
├── 
├── index.js
└── .env
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/niteshsainicoder/rag_chatBot_backend
cd rag-chatbot-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

```bash
cp .env.example .env
```

Fill in the following variables in your `.env`:

```
PORT=8000

# Jina Embedding API
JINA_API_KEY=your_jina_api_key
JINA_URL=https://your-jina-instance-url

# Qdrant Configuration
QDRANT_CLOUD_KEY=your_qdrant_api_key
QDRANT_CLOUD_URL=https://your-qdrant-instance-url

# Google Gemini
GEMINI_API_KEY=your_gemini_api_key

# Redis
REDIS_URL=redis://localhost:6379

PORT=3000
```

---

## 🧪 Running the Server

```bash
npm run dev
```

The server will start on [http://localhost:3000](http://localhost:3000).

---

## 🧩 API Endpoints

### `POST /api/chat/ask`

Ask a question based on the ingested news articles.

**Request Body:**
```json
{
  "sessionId": "uuid-value",
  "query": "What is the latest about electric vehicles?"
}
```

**Response:**
```json
{
  "answer": "Electric vehicles are becoming more popular due to..."
}
```

---

## 🔁 Workflow

1. User uploads or queries content.
2. Query is embedded using Jina.
3. Qdrant retrieves top-k similar chunks.
4. Google Gemini generates a response using retrieved context.
5. Redis is used to store session-based chat history.

---

## 📦 Deployment

The backend is deployed on Render using the free tier (512MB RAM). Ensure CORS is properly configured for frontend communication.

---

## 🛡️ CORS Note

Make sure to whitelist your frontend domain:

```js
const corsOptions = {
  origin: ['https://your-frontend.vercel.app', 'http://localhost:5173'],
  credentials: true,
};
app.use(cors(corsOptions));
```

---

## 📃 License

This project is licensed under the MIT License.

---

## 🙋‍♂️ Author

**Nitesh Saini**  
Full Stack Developer

- Portfolio: [https://niteshdev.vercel.app](https://niteshdev.vercel.app)
- GitHub: [https://github.com/niteshsainicoder](https://github.com/niteshsainicoder)
- LinkedIn: [https://linkedin.com/in/nitesh-saini-dev](https://linkedin.com/in/nitesh-saini-dev)
