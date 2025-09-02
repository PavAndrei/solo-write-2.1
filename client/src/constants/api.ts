export const BASE_API_URL = 'http://localhost:5000/api';
export const GOOGLE_API_URL = 'https://www.googleapis.com/oauth2/v3/userinfo';

export type AiAction =
  | 'rephrase'
  | 'add_emoji'
  | 'exciting'
  | 'simplify'
  | 'formalize'
  | 'casual';

export const AiButtonConfig: Record<AiAction, { label: string }> = {
  rephrase: { label: 'Rephrase' },
  add_emoji: { label: 'Add emojis' },
  exciting: { label: 'Make it exciting' },
  simplify: { label: 'Simplify' },
  formalize: { label: 'Formalize' },
  casual: { label: 'Make it casual' },
};
