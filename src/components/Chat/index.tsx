import { usePromise } from '../../hooks/usePromise';
import { streamOpenAI } from '../../API/streamOpenAI';
import type { ChatMessage } from './types';
import { useReactiveState } from '../../hooks/useReactiveState';
import { UserInput } from './UserInput';
import React, { useRef } from 'react';
import { AIChatBubble } from './bubbles/AI';
import { HumanChatBubble } from './bubbles/Human';
import { StreamChatBubble, type StreamChatBubbleRef } from './bubbles/Stream';
import { clampText } from '../../helpers';
import { samplePrompts } from './samplePrompts';

export const Chat = () => {
  const messages = useReactiveState<ChatMessage[]>([]);
  const streamingMessageRef = useRef<StreamChatBubbleRef | null>(null);
  const userInput = useReactiveState<string>('');

  const stream = usePromise(async (_messages: ChatMessage[]) => {
    const response = await streamOpenAI(_messages, (content) => {
      streamingMessageRef.current?.setContent(content);
    });
    const responseMessage: ChatMessage = {
      role: 'assistant',
      content: response,
    };
    messages.set([...messages.get(), responseMessage]);
    streamingMessageRef.current?.setContent('');
  });

  const onClickSubmit = () => {
    const userMessage: ChatMessage = {
      role: 'user',
      content: userInput.get(),
    };
    messages.set([...messages.get(), userMessage]);
    stream.retry(messages.get());
    userInput.set('');
  };

  return (
    <>
      <section className='px-2 sm:px-4'>
        <div className='max-w-[1200px] mx-auto'>
          {!messages.state.length ? (
            <div className='h-screen w-full flex items-center justify-center'>
              <div>
                <h1 className='text-center text-2xl font-bold text-gray-700 mb-2'>Vege GenAI Demo</h1>
                <h1 className='text-center text-base text-gray-500'>
                  This is a demo chatbot to showcase Vega's potential in a chatbot. <br /> Try sample prompts
                </h1>
                <div className='flex items-start gap-2 flex-wrap justify-center mt-4'>
                  {samplePrompts.map((item, index) => (
                    <button
                      type='button'
                      key={index.toString()}
                      className='bg-gray-100 p-2 rounded-lg max-w-[300px] sm:max-w-[200px] text-sm text-center cursor-pointer hover:bg-gray-200 border border-gray-300'
                      onClick={() => {
                        userInput.set(item);
                        onClickSubmit();
                      }}
                    >
                      {clampText(item, 100)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className='h-12' />
          )}
          {messages.state.map((item, index) => (
            <React.Fragment key={index.toString()}>
              {(() => {
                if (item.role === 'assistant') return <AIChatBubble content={item.content.toString()} />;
                if (item.role === 'user') return <HumanChatBubble content={item.content.toString()} />;
                return <></>;
              })()}
              <div className='h-4' />
            </React.Fragment>
          ))}
          <StreamChatBubble ref={streamingMessageRef} />
        </div>
        {messages.state.length ? <div className='h-[500px]' /> : <></>}
      </section>
      <div className='fixed bottom-0 left-0 w-screen pb-6 bg-gray-100/1 backdrop-blur-xs'>
        <UserInput value={userInput.state} onChange={userInput.set} state={stream.state} onSubmit={onClickSubmit} />
      </div>
    </>
  );
};
