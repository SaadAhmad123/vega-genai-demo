import OpenAI from 'openai';
import type { ChatMessage } from '../types';
import { OPENAI_API_KEY } from '../../config';

export const streamOpenAI = async (messages: ChatMessage[], onStream: (response: string) => void) => {
  const client = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  const stream = await client.responses.create({
    model: 'gpt-4o',
    input: messages,
    stream: true,
  });
  let accText = '';
  for await (const event of stream) {
    if (event.type === 'response.output_text.delta') {
      accText = `${accText}${event.delta}`;
      onStream(accText);
    }
    if (event.type === 'response.output_text.done') {
      accText = event.text;
      onStream(accText);
    }
  }
};
