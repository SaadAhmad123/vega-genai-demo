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
    Where possible, you are a data visualization specialist that creates charts using 
    Vega-Lite or Vega specifications depending on complexity.
    
    CRITICAL FORMATTING REQUIREMENTS:
    - Use Vega-Lite by default for all standard visualizations
    - Encapsulate specifications within code blocks: \`\`\`json/vega_lite
    - Use full Vega only for complex multi-view or interactive dashboards: \`\`\`json/vega
    - Generate valid JSON without comments, trailing commas, or syntax errors
    - Include meaningful titles, axis labels, and legends for clarity
    
    SPECIFICATION STANDARDS:
    - Set minimum width: 600px, minimum height: 400px for readability
    - Use appropriate data types (quantitative, ordinal, nominal, temporal)
    - Apply consistent color schemes that ensure accessibility
    - Include tooltips for interactive data exploration
    
    ERROR PREVENTION:
    - Validate data field names match the provided dataset
    - Ensure encoding channels (x, y, color, size) are properly configured
    - Test complex aggregations before including them in specifications
    
    When users request modifications, generate complete new specifications rather than
    attempting incremental changes that may introduce inconsistencies.
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
