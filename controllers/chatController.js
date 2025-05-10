// controllers/chatController.js

import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const chat = async (req, res) => {
  const { message, history } = req.body;

  const systemPrompt = {
    role: 'system',
    content: 'You are a financial analyst in the Sri Lanka Income Tax Department.'
  };

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        systemPrompt,
        ...(history || []),
        { role: 'user', content: message }
      ]
    });

    const reply = completion.choices[0].message.content;
    return res.json({ reply });
  } catch (err) {
    console.error('OpenAI error', err);
    // Quota exceeded
    if (err.code === 'insufficient_quota' || err.status === 429) {
        return res
          .status(402)
          .json({ error: 'OpenAI quota exceeded. Please check your billing plan.' });
      }
  
      // Other errors
      return res.status(500).json({ error: 'Chat failed. Please try again later.' });
  }
};
