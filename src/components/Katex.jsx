import React from 'react';
import { InlineMath, BlockMath } from 'react-katex'; // Import KaTeX components

const KaTeXComponent = ({ expression, block = true }) => {
  return (
    <div className='container katex text-3xl'>
      <div className="px-6 bg-[#0c0c0c] border border-[#7A76FF] rounded-md shadow-md text-nowrap">
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