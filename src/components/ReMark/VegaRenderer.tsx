import type { VisualizationSpec } from 'vega-embed';
import { useState } from 'react';
import { VegaEmbed } from 'react-vega';

const parseSpec = (
  _spec: object | string,
):
  | { value: VisualizationSpec & { width?: number | null; height?: number | null }; error: null }
  | { value: null; error: Error } => {
  try {
    return {
      value: (typeof _spec === 'string' ? JSON.parse(_spec) : _spec) as unknown as VisualizationSpec & {
        width?: number | null;
        height?: number | null;
      },
      error: null,
    };
  } catch (e) {
    return {
      value: null,
      error: e as Error,
    };
  }
};

export const VegaRenderer: React.FC<{ spec: object | string }> = ({ spec }) => {
  const [parsedSpec] = useState(parseSpec(spec));

  return (
    <div className='grid grid-cols-1'>
      <div className='flex'>
        {parsedSpec.value ? (
          <div className='max-w-[1200px] overflow-auto max-h-[500px] md:max-h-[800px] p-4 border border-gray-300 rounded-xl shadow-sm bg-white'>
            <VegaEmbed
              spec={{
                ...parsedSpec.value,
                width: Math.max(parsedSpec.value.width ?? 0, 600),
                height: Math.max(parsedSpec.value.height ?? 0, 400),
              }}
              options={{
                mode: 'vega-lite',
                theme: 'carbonwhite',
                renderer: 'svg',
              }}
              onError={console.error}
            />
          </div>
        ) : (
          <p className='max-w-[1200px] overflow-auto py-2 px-4 border border-gray-300 rounded-xl shadow-sm bg-red-600 text-white font-sans'>
            {parsedSpec.error?.message || 'Error rendering chart'}
          </p>
        )}
      </div>
    </div>
  );
};
