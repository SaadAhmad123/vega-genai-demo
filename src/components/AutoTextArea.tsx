import type React from 'react';
import { useRef, forwardRef, useEffect } from 'react';
import { useReactiveRef } from '../hooks/useReactiveRef';

type AutoTextAreaProps = {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onChangeHeight?: (param: {
    height: number;
    delta: number;
  }) => void;
  maxHeight?: number;
};

export const AutoTextArea = forwardRef<HTMLTextAreaElement, AutoTextAreaProps>(
  ({ className, value, onChange, onChangeHeight, placeholder, maxHeight = 100, onKeyDown }, ref) => {
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const textAreaHeightRef = useReactiveRef<number>(0, (newValue, oldValue) => {
      onChangeHeight?.({
        height: newValue,
        delta: newValue - (oldValue ?? 0),
      });
    });

    const resizeTextArea = () => {
      if (!textAreaRef.current) return;
      textAreaRef.current.style.height = '0px';
      let newHeight = textAreaRef.current.scrollHeight;
      if (maxHeight) {
        newHeight = Math.min(textAreaRef.current.scrollHeight, maxHeight);
      }
      textAreaRef.current.style.height = `${newHeight}px`;
      textAreaHeightRef.set(newHeight);
    };

    // biome-ignore lint/correctness/useExhaustiveDependencies: The rest don't need to be a dependency
    useEffect(() => {
      if (!value) {
        resizeTextArea();
      }
    }, [value]);

    return (
      <textarea
        ref={(node) => {
          textAreaRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        placeholder={placeholder}
        style={{ resize: 'none' }}
        value={value}
        className={className}
        onChange={(e) => {
          resizeTextArea();
          onChange?.(e);
        }}
        onKeyDown={onKeyDown}
      />
    );
  },
);
