import { usePromise } from '../hooks/usePromise';
import { streamOpenAI } from './API/streamOpenAI';
import type { ChatMessage } from './types';
import { useReactiveState } from '../hooks/useReactiveState';

export const Chat = () => {
  const messages = useReactiveState<ChatMessage[]>([]);
  const streamingMessage = useReactiveState<string>('');
  const userInput = useReactiveState<string>('');

  const stream = usePromise(async (messages: ChatMessage[]) => {
    await streamOpenAI(messages, console.log);
  });

  return (
    <div>
      {stream.error?.message}
      <button
        type='button'
        onClick={() => {
          stream.retry([
            {
              role: 'user',
              content: 'Hello World',
            },
          ]);
        }}
      >
        Send message
      </button>
    </div>
  );
};
