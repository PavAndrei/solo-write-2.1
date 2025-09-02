export interface CohereChatResponse {
  text: string;
  generation_id: string;
  token_count: number;
  meta: {
    api_version: {
      version: string;
    };
    billed_units: {
      input_tokens: number;
      output_tokens: number;
    };
  };
}
