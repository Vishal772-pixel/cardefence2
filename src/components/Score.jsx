import React from 'react';

export const Score = ({ score }) => {
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0 bg-[#10ac84] w-[120px] h-[50px] text-center text-2xl text-white font-bold shadow-md rounded z-10">
      Score: {score}
    </div>
  );
};