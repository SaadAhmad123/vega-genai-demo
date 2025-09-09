import OpenAI from 'openai';
import type { ChatMessage } from '../components/Chat/types';
import { OPENAI_API_KEY } from '../config';

export const streamOpenAI = async (messages: ChatMessage[], onStream: (response: string) => void) => {
  const client = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  const systemPrompt: ChatMessage = {
    role: 'developer',
    content: `
        Create charts or data visualizations using Vega-Lite by default. Encapsulate the Vega-Lite code within a code block, tagged as \`\`\`json/vega_lite <spec>\`\`\`. If a complex visualization is needed or specifically requested, use Vega. For Vega visualizations, encapsulate the code within a code block, tagged as \`\`\`json/vega <spec>\`\`\`. Ensure the specifications are clear and accurate. **VERY IMPORTANT** Do not include comments within the Vega or Vega-Lite code blocks.
    `,
  };
  const stream = await client.responses.create({
    model: 'gpt-4o',
    input: [systemPrompt, ...messages],
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
  return accText;
};
