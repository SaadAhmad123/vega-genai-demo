import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { VegaRenderer } from './VegaRenderer';
import { CopyButton } from '../buttons/Copy';
import { ToggleSwitch } from '../buttons/Toggle';

const isValidMarkdown = (text: string) => {
  try {
    unified().use(remarkParse).use(remarkGfm).parse(text);
    return true;
  } catch {
    return false;
  }
};

export const ReMark: React.FC<{ content: string | null; vegaPlaceholderOnly?: boolean }> = ({
  content,
  vegaPlaceholderOnly,
}) => {
  const [showCode, setShowCode] = useState(false);

  if (!content) return <></>;

  const toggleView = () => {
    setShowCode((prevShowCode) => !prevShowCode);
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        table: ({ node, ...props }) => (
          <div className='grid grid-cols-1 overflow-auto'>
            <div className='flex'>
              <table className='my-4 border-collapse border border-outline bg-white' {...props} />
            </div>
          </div>
        ),
        thead: ({ node, ...props }) => <thead className='bg-gray-300 text-black' {...props} />,
        th: ({ node, ...props }) => (
          <th className='px-2 sm:!px-4 py-2 text-left border border-outline font-semibold' {...props} />
        ),
        td: ({ node, ...props }) => (
          <td className='px-2 sm:!px-4 py-2 border border-outline whitespace-normal' {...props} />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote className='border-l-4 border-gray-500 bg-gray-300 text-gray-900 p-2 my-2' {...props} />
        ),
        ul: ({ node, ...props }) => <ul className='list-disc ml-5 my-2' {...props} />,
        ol: ({ node, ...props }) => <ol className='list-decimal ml-5 my-2' {...props} />,
        li: ({ node, ...props }) => <li className='my-1' {...props} />,
        hr: () => <hr className='bg-gray-200 mt-2 mb-4 h-[1px] border-none' />,
        code: ({ children, className }) => {
          if (!className) return <code className='inline-block bg-gray-100 px-1 py-1 rounded'>{children}</code>;
          const isVega = className === 'language-json/vega_lite' || className === 'language-json/vega';
          if (isVega) {
            return (
              <div className='my-4 font-sans'>
                {vegaPlaceholderOnly ? (
                  <></>
                ) : (
                  <ToggleSwitch isToggled={showCode} onToggle={toggleView} label='Show Vega JSON' />
                )}
                {vegaPlaceholderOnly || showCode ? (
                  <>
                    {vegaPlaceholderOnly ? (
                      <div className='max-w-[1200px] overflow-auto p-4 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-900 font-sans'>
                        <h1 className='text-base font-bold mb-1'>Preparing data visualization</h1>
                        <p className='text-wrap'>
                          Waiting for the response to conclude before the rendering the visualization. This
                          visualization uses Vega to define and render the requested charts
                        </p>
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className='relative grid grid-col-1 mt-2 px-4 py-2 border border-gray-400 bg-gray-200 text-base rounded-xl'>
                      <div className='overflow-auto'>
                        <code>
                          <span className='!font-sans text-xs'>{className?.replace('language-', '')}</span>
                          <br />
                          {children}
                        </code>
                      </div>
                      <div className='absolute top-2 right-2'>
                        <CopyButton content={children as string} />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className='mt-2'>
                    <VegaRenderer spec={children as string} />
                  </div>
                )}
              </div>
            );
          }

          return (
            <div className='relative grid grid-col-1 my-4 px-4 py-2 border border-gray-400 bg-gray-200 text-base rounded-xl'>
              <div className='overflow-auto'>
                <code>
                  <span className='!font-sans text-xs'>{className?.replace('language-', '')}</span>
                  <br />
                  {children}
                </code>
              </div>
              <div className='absolute top-2 right-2'>
                <CopyButton content={children as string} />
              </div>
            </div>
          );
        },
      }}
    >
      {isValidMarkdown(content) ? content : content.toString()}
    </ReactMarkdown>
  );
};
