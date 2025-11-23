import express from 'express';
import { invokeLLM } from '../services/base44Service.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

/**
 * POST /api/integrations/llm
 * Invoke Base44 Core LLM Integration
 * 
 * Request body:
 * {
 *   "prompt": "Your prompt here",
 *   "response_json_schema": { ... } (optional),
 *   "options": { ... } (optional)
 * }
 */
router.post('/llm', authenticate, async (req, res) => {
  try {
    const { prompt, response_json_schema, options } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: 'Prompt is required'
      });
    }

    const result = await invokeLLM({
      prompt,
      response_json_schema,
      options
    });

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('LLM Integration Error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data,
      status: error.response?.status
    });
    res.status(500).json({
      error: error.message || 'Failed to invoke LLM',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});


router.get('/health', authenticate, (req, res) => {
  const hasApiKey = !!process.env.BASE44_API_KEY;
  const hasAppId = !!process.env.BASE44_APP_ID;

  res.json({
    configured: hasApiKey && hasAppId,
    hasApiKey,
    hasAppId,
    apiBase: process.env.BASE44_API_BASE || 'https://api.base44.com'
  });
});

export default router;

