import express from 'express';
import { processAgentRequest } from '../services/ai-agent';

const router = express.Router();

router.post('/ai/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    
    // Basic security check - ensure user is admin
    // if (!req.user || req.user.role !== 'admin') return res.status(403).send('Unauthorized');

    const response = await processAgentRequest(message, history);
    
    res.json({ response });
  } catch (error) {
    console.error('AI Agent Error:', error);
    res.status(500).json({ error: 'Internal Agent Error' });
  }
});

export default router;