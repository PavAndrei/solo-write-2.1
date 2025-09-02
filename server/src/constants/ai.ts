export const COHERE_API_KEY = process.env.COHERE_API_KEY;
export const COHERE_URL = 'https://api.cohere.com/v1/chat';

export const ACTION_PROMPTS = {
  rephrase:
    'For the answer use only the same language as I used when I created the prompt. Do not write back "Of course! Here is a rephrased version of the text" or something like that. Rephrase the following text:\n\n',
  add_emoji:
    'For the answer use only the same language as I used when I created the prompt. Do not write back "Of course! Here is a version of the text with emojis" or something like that. Send only the text with emojies. Add appropriate emojis to the following text:\n\n',
  exciting:
    'For the answer use only the same language as I used when I created the prompt. Do not write back "Of course! Here is a exciting version of the text" or something like that. Send back only the text. Rewrite the following text in an exciting and engaging way:\n\n',
  simplify:
    'For the answer use only the same language as I used when I created the prompt. Do not write back "Of course! Here is a simplified version of the text: "or something like that. Send back only the text. Simplify the following text for a 12-year-old audience:\n\n',
  extend:
    'For the answer use only the same language as I used when I created the prompt. Do not write back "Of course! Here is an extended version of the text" or something like that. Send back only the text. Extend the following text by adding more details:\n\n',
  formalize:
    'For the answer use only the same language as I used when I created the prompt. Do not write back "Of course! Here is a formalized version of the text" or something like that. Send back only the text. And make it into HTML-format. Inside the proper tags, but not in html or body. Only use less important tags as li, ul, ol, b and so on. Rewrite the following text in a more formal tone:\n\n',
  casual:
    'For the answer use only the same language as I used when I created the prompt. Do not write back "Of course! Here is a casual version of the text" or something like that. Send back only the text. Rewrite the following text in a casual and friendly tone:\n\n',
} as const;
