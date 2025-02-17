import React from 'react';

export const RoadLine = ({ position }) => {
  return (
    <div
      className="absolute w-[10px] h-[100px] bg-white"
      style={{
        left: '190px',
        top: `${position}px`
      }}
    />
  );
};