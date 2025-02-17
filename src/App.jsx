import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Car } from './components/Car';
import { EnemyCar } from './components/EnemyCar';
import { RoadLine } from './components/RoadLine';
import { Score } from './components/Score';
import { StartScreen } from './components/StartScreen';
import { MobileControls } from './components/MobileControls';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [playerPosition, setPlayerPosition] = useState({ x: 175, y: 500 });
  const [enemyCars, setEnemyCars] = useState([]);
  const [roadLines, setRoadLines] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const gameAreaRef = useRef(null);
  const playerSpeed = 5;
  const animationFrameRef = useRef();
  const keysRef = useRef({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  });

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (Object.keys(keysRef.current).includes(e.key)) {
      e.preventDefault();
      keysRef.current[e.key] = true;
    }
  }, []);

  const handleKeyUp = useCallback((e) => {
    if (Object.keys(keysRef.current).includes(e.key)) {
      e.preventDefault();
      keysRef.current[e.key] = false;
    }
  }, []);

  // Mobile control handlers
  const handleMobileControl = useCallback((direction, isPressed) => {
    keysRef.current[`Arrow${direction}`] = isPressed;
  }, []);

  const isColliding = useCallback((rect1, rect2) => {
    return !(
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom ||
      rect1.right < rect2.left ||
      rect1.left > rect2.right
    );
  }, []);

  const checkCollision = useCallback(() => {
    if (!gameAreaRef.current) return false;
    
    const playerElement = gameAreaRef.current.querySelector('.player-car');
    const enemyElements = gameAreaRef.current.querySelectorAll('.enemy-car');
    
    if (!playerElement) return false;
    
    const playerRect = playerElement.getBoundingClientRect();
    
    for (const enemy of enemyElements) {
      const enemyRect = enemy.getBoundingClientRect();
      if (isColliding(playerRect, enemyRect)) {
        return true;
      }
    }
    
    return false;
  }, [isColliding]);

  const gameLoop = useCallback(() => {
    if (!gameStarted) return;

    // Update player position based on keys
    setPlayerPosition(prev => {
      const newPos = { ...prev };
      if (keysRef.current.ArrowUp) newPos.y -= playerSpeed;
      if (keysRef.current.ArrowDown) newPos.y += playerSpeed;
      if (keysRef.current.ArrowLeft) newPos.x -= playerSpeed;
      if (keysRef.current.ArrowRight) newPos.x += playerSpeed;

      // Constrain to game area
      newPos.x = Math.max(0, Math.min(newPos.x, 350));
      newPos.y = Math.max(100, Math.min(newPos.y, 550));
      return newPos;
    });

    // Update enemy cars
    setEnemyCars(prev => 
      prev.map(car => ({
        ...car,
        y: car.y >= 750 ? -300 : car.y + playerSpeed
      }))
    );

    // Update road lines
    setRoadLines(prev =>
      prev.map(line => ({
        ...line,
        y: line.y >= 650 ? -90 : line.y + playerSpeed
      }))
    );

    // Update score
    setScore(prev => prev + 1);

    // Check for collisions
    if (checkCollision()) {
      setGameStarted(false);
      return;
    }

    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, [gameStarted, playerSpeed, checkCollision]);

  const startGame = useCallback(() => {
    setGameStarted(true);
    setScore(0);
    setPlayerPosition({ x: 175, y: 500 });
    
    // Initialize enemy cars
    setEnemyCars(
      Array.from({ length: 3 }, (_, i) => ({
        id: i,
        x: Math.floor(Math.random() * 350),
        y: ((i + 1) * 350) * -1
      }))
    );

    // Initialize road lines
    setRoadLines(
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        y: i * 150
      }))
    );
  }, []);

  useEffect(() => {
    if (gameStarted) {
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameStarted, gameLoop]);

  useEffect(() => {
    if (!isMobile) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
      };
    }
  }, [handleKeyDown, handleKeyUp, isMobile]);

  return (
    <div className="w-full h-screen bg-green-800 relative overflow-hidden">
      <Score score={score} />
      {!gameStarted && <StartScreen onStart={startGame} finalScore={score} />}
      <div 
        ref={gameAreaRef}
        className="h-screen w-[400px] max-w-full bg-[#2c3456] mx-auto relative overflow-hidden border-r-[7px] border-l-[7px] border-dashed border-[#c8d6e5]"
      >
        {gameStarted && (
          <>
            {roadLines.map(line => (
              <RoadLine key={line.id} position={line.y} />
            ))}
            <Car position={playerPosition} />
            {enemyCars.map(car => (
              <EnemyCar key={car.id} position={{ x: car.x, y: car.y }} />
            ))}
          </>
        )}
      </div>
      {isMobile && gameStarted && (
        <MobileControls onControlChange={handleMobileControl} />
      )}
    </div>
  );
}

export default App;