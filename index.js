import dotenv from 'dotenv';
import express from 'express';
import { chatRouter } from './src/routes/chatRoute.js';
import { createClient } from 'redis';
import { ingestRoute } from './src/routes/ingestRoute.js';
import { QdrantClient } from '@qdrant/js-client-rest';

dotenv.config();

const app = express();

 export const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

export const qdrant = new QdrantClient({
  url: process.env.QDRANT_CLOUD_URL,
  apiKey: process.env.QDRANT_CLOUD_KEY,
});

await redisClient.connect();

app.use(express.json());

app.use('/api/chat', chatRouter);

app.use('/api/add_article',ingestRoute)

// Start server
app.listen(process.env.PORT || 3000, () => {
    console.log(process.env.PORT);
    })