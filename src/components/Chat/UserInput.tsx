import { useRef, useState } from 'react';
import type { UsePromiseState } from '../../hooks/usePromise';
import { AutoTextArea } from '../AutoTextArea';
import { useMount } from '../../hooks/useMount';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { Spinner } from '../Spinner';

type UserInputProps = {
  value?: string;
  onChange?: (e: string) => void;
  onSubmit?: (e: string) => void;
  state?: UsePromiseState;
};

export const UserInput: React.FC<UserInputProps> = ({ value, onChange, onSubmit, state }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [messageBoxMaxHeight, setMessageBoxMaxHeight] = useState(100);

  // Set initial state based on display screen
  useMount(() => {
    try {
      if (window.innerWidth > 768) {
        setMessageBoxMaxHeight(300);
      } else {
        setMessageBoxMaxHeight(100);
      }
    } catch (e) {
      console.error(e);
    }
  });

  return (
    <div className='max-w-[1200px] w-screen px-2 sm:px-4 mx-auto'>
      <form className='flex w-full shadow-lg border border-gray-200 px-4 py-3 rounded-3xl gap-2 items-end bg-white'>
        <div className='min-h-12 flex items-center flex-1'>
          <AutoTextArea
            ref={textareaRef}
            placeholder='Write here...'
            className='flex-1 lg:text-lg outline-none focus:outline-none focus:ring-0'
            maxHeight={messageBoxMaxHeight}
            value={value}
            onChange={(e) => {
              onChange?.(e.target.value);
            }}
          />
        </div>
        <button
          type='button'
          className='w-12 h-12 bg-red-800 text-white flex items-center justify-center rounded-full cursor-pointer'
          onClick={() => {
            if (state === 'loading') return;
            if (!value) return;
            onSubmit?.(value);
          }}
        >
          {state === 'loading' ? <Spinner size={20} /> : <HiOutlineSparkles size={24} />}
        </button>
      </form>
    </div>
  );
};
