import React from 'react';

export const StartScreen = ({ onStart, finalScore }) => {
  return (
    <div 
      onClick={onStart}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                 bg-[#00CED1] text-white z-10 text-center border border-[#ff6b6b] 
                 p-4 w-[90%] md:w-1/2 cursor-pointer shadow-md rounded-lg"
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-4">CAR RACING GAME</h1>
      <p className="text-lg md:text-xl">
        {finalScore > 0 ? (
          <>
            Game Over<br />
            Final Score: {finalScore}<br />
            Tap to restart
          </>
        ) : (
          <>
            Tap here to start<br />
            If you hit another car, you lose...<br />
            {window.innerWidth <= 768 ? "Use on-screen controls to play" : "Use arrow keys to play"}
          </>
        )}
      </p>
    </div>
  );
};