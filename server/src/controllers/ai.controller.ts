import { Request, Response, NextFunction } from 'express';
import fetch from 'node-fetch';
import { ACTION_PROMPTS, COHERE_API_KEY, COHERE_URL } from '../constants/ai';
import { CohereChatResponse } from '../types/ai.types';

export type AiAction = keyof typeof ACTION_PROMPTS;

export const editText = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { action, text } = req.body as { action: AiAction; text: string };

    if (!(action in ACTION_PROMPTS) || typeof text !== 'string') {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    if (!COHERE_API_KEY) {
      throw new Error('COHERE_API_KEY not set');
    }

    const body = {
      model: 'command-r-plus',
      temperature: 0.7,
      max_tokens: 300,
      chat_history: [],
      message: `${ACTION_PROMPTS[action]}\n\n${text}`,
    };

    const response = await fetch(COHERE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${COHERE_API_KEY}`,
        'Content-Type': 'application/json',
        'Cohere-Version': '2022-12-06', // обязательный заголовок
      },
      body: JSON.stringify(body),
    });

    const data = (await response.json()) as CohereChatResponse;
    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    const output = data.text?.trim();
    if (!output) {
      throw new Error('Empty response from Cohere');
    }

    return res.json({ result: output });
  } catch (err) {
    next(err);
  }
};
