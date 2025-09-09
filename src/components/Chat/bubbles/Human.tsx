import { CopyButton } from '../../buttons/Copy';
import { ReMark } from '../../ReMark';

type HumanChatBubble = {
  content: string;
};

export const HumanChatBubble: React.FC<HumanChatBubble> = ({ content }) => {
  return (
    <div className='flex items-start justify-end gap-2'>
      <div className='flex-1'>
        <div className='flex justify-end'>
          <div className='bg-gray-50 p-4 rounded-xl border border-gray-200'>
            <ReMark content={content} />
          </div>
        </div>
        <div className='flex justify-end'>
          <CopyButton content={content} />
        </div>
      </div>
      <div className='block size-10 bg-gray-700 text-white rounded-full flex items-center justify-center text-xs'>
        <div>YOU</div>
      </div>
    </div>
  );
};
