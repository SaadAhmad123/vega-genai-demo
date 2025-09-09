import { CopyButton } from '../../buttons/Copy';
import { ReMark } from '../../ReMark';

type AIChatBubble = {
  content: string;
};

export const AIChatBubble: React.FC<AIChatBubble> = ({ content }) => {
  return (
    <div>
      <ReMark content={content} vegaPlaceholderOnly={false} />
      <div className='flex mt-1'>
        <CopyButton content={content} />
      </div>
    </div>
  );
};
