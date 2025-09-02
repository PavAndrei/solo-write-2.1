export const COHERE_API_KEY = process.env.COHERE_API_KEY;
export const COHERE_URL = 'https://api.cohere.com/v1/chat';

export const ACTION_PROMPTS = {
  // 1) Простое перефразирование
  rephrase: 'Rephrase the following text:\n\n',

  // 2) Добавить эмодзи
  add_emoji: 'Add appropriate emojis to the following text:\n\n',

  // 3) Сделать текст захватывающим
  exciting: 'Rewrite the following text in an exciting and engaging way:\n\n',

  // 4) Суммировать в 3 пункта
  summarize: 'Summarize the following text in 3 bullet points:\n\n',

  // 5) Упростить для 12-летнего
  simplify: 'Simplify the following text for a 12-year-old audience:\n\n',

  // 6) Расширить деталями
  extend: 'Extend the following text by adding more details:\n\n',

  // Дополнительные промпты

  // 7) Генерация заголовка
  generate_title: 'Generate a catchy article title for the following text:\n\n',

  // 8) Создать структуру (план)
  create_outline:
    'Create a structured outline with headings for the following text:\n\n',

  // 9) Мета-описание (max 160 символов)
  write_meta_desc:
    'Write a concise meta description (max 160 characters) for the following text:\n\n',

  // 10) SEO-ключевые слова
  generate_keywords:
    'Generate a list of SEO keywords based on the following text:\n\n',

  // 11) Переписать в формальном стиле
  formalize: 'Rewrite the following text in a more formal tone:\n\n',

  // 12) Переписать в дружеском стиле
  casual: 'Rewrite the following text in a casual and friendly tone:\n\n',

  // 13) Добавить призыв к действию
  call_to_action:
    'Add a persuasive call-to-action at the end of the following text:\n\n',

  // 14) Выделить ключевые пункты
  bullet_points:
    'Convert the key ideas of the following text into bullet points:\n\n',

  // 15) Проверка грамматики и стиля
  grammar_check:
    'Check the following text for grammatical errors and improve the style:\n\n',

  // 16) Оценка ясности и потока
  clarity_feedback:
    'Provide feedback on clarity, coherence, and flow of the following text:\n\n',
} as const;
