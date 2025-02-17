import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

export const MobileControls = ({ onControlChange }) => {
  const handleTouchStart = (direction) => {
    onControlChange(direction, true);
  };

  const handleTouchEnd = (direction) => {
    onControlChange(direction, false);
  };

  const buttonClass = "w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm active:bg-white/40 touch-none";

  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center items-center gap-4 p-4">
      <div className="grid grid-cols-3 gap-2">
        <div className="col-start-2">
          <button
            className={buttonClass}
            onTouchStart={() => handleTouchStart('Up')}
            onTouchEnd={() => handleTouchEnd('Up')}
            onMouseDown={() => handleTouchStart('Up')}
            onMouseUp={() => handleTouchEnd('Up')}
            onMouseLeave={() => handleTouchEnd('Up')}
          >
            <ArrowUp className="w-8 h-8 text-white" />
          </button>
        </div>
        <div className="col-start-1 row-start-2">
          <button
            className={buttonClass}
            onTouchStart={() => handleTouchStart('Left')}
            onTouchEnd={() => handleTouchEnd('Left')}
            onMouseDown={() => handleTouchStart('Left')}
            onMouseUp={() => handleTouchEnd('Left')}
            onMouseLeave={() => handleTouchEnd('Left')}
          >
            <ArrowLeft className="w-8 h-8 text-white" />
          </button>
        </div>
        <div className="col-start-3 row-start-2">
          <button
            className={buttonClass}
            onTouchStart={() => handleTouchStart('Right')}
            onTouchEnd={() => handleTouchEnd('Right')}
            onMouseDown={() => handleTouchStart('Right')}
            onMouseUp={() => handleTouchEnd('Right')}
            onMouseLeave={() => handleTouchEnd('Right')}
          >
            <ArrowRight className="w-8 h-8 text-white" />
          </button>
        </div>
        <div className="col-start-2 row-start-3">
          <button
            className={buttonClass}
            onTouchStart={() => handleTouchStart('Down')}
            onTouchEnd={() => handleTouchEnd('Down')}
            onMouseDown={() => handleTouchStart('Down')}
            onMouseUp={() => handleTouchEnd('Down')}
            onMouseLeave={() => handleTouchEnd('Down')}
          >
            <ArrowDown className="w-8 h-8 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};