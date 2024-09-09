import React from 'react';
import { InlineMath, BlockMath } from 'react-katex'; // Import KaTeX components

const KaTeXComponent = ({ expression, block = true }) => {
  return (
    <div className='container bg-[#0c0c0c] katex text-3xl border border-lightBlue rounded-lg'>
      <div className="h-full text-nowrap">
        {block ? (
          <BlockMath>{expression}</BlockMath>
        ) : (
          <InlineMath>{expression}</InlineMath>
        )}
      </div>
    </div>
  );
};

export default KaTeXComponent;