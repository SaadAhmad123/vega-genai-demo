import { forwardRef, useImperativeHandle } from 'react';
import { ReMark } from '../../ReMark';
import { useReactiveState } from '../../../hooks/useReactiveState';

export type StreamChatBubbleRef = {
  setContent: (content: string) => void;
};

export const StreamChatBubble = forwardRef<StreamChatBubbleRef, unknown>((_props, ref) => {
  const content = useReactiveState('');

  useImperativeHandle(ref, () => ({
    setContent: content.set,
  }));

  if (!content.state) return <></>;
  return <ReMark content={content.state} vegaPlaceholderOnly />;
});
