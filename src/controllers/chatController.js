import { v4 as uuidv4 } from 'uuid';
import { getGeminiResponse } from '../utils/gemini.js';
import { getTopPassages } from '../utils/getTopPassage.js';
import { redisClient } from '../../index.js';


export const startSession = (req, res) => {
  const sessionId = uuidv4();
  res.status(200).json({ sessionId });
};

export const handleQuery = async (req, res) => {
  const { sessionId, query } = req.body;
  if (!sessionId || !query) {
    return res.status(400).json({ error: 'Missing sessionId or query' });
  }

  try {
    const sessionHistory = await redisClient.get(sessionId);
    const history = sessionHistory ? JSON.parse(sessionHistory) : [];

    history.push({ role: 'user', message: query });

    const topPassages = await getTopPassages(query);

    const answer = await getGeminiResponse(topPassages, query);

    history.push({ role: 'bot', message: answer });

    await redisClient.set(sessionId, JSON.stringify(history));

    res.status(200).json({ answer });
  } catch (error) {
    console.error('handleQuery error:', error);
    res.status(500).json({ error: 'Server error while processing query' });
  }
};

export const getHistory = async (req, res) => {
  const { sessionId } = req.params;
  try {
    const history = await redisClient.get(sessionId);
    res.status(200).json({ history: JSON.parse(history || '[]') });
  } catch (err) {
    console.error('getHistory error:', err);
    res.status(500).json({ error: 'Could not fetch session history' });
  }
};

export const resetSession = async (req, res) => {
  const { sessionId } = req.params;
  try {
    await redisClient.del(sessionId);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('resetSession error:', err);
    res.status(500).json({ error: 'Failed to reset session' });
  }
};
