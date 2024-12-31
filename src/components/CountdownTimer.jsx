import React, { useState, useEffect } from 'react';

const Firework = ({ x, y, color }) => {
  return (
    <div className="absolute animate-firework">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full animate-particle"
          style={{
            backgroundColor: color,
            transform: `rotate(${i * 30}deg) translate(0, -20px)`
          }}
        />
      ))}
    </div>
  );
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [showFireworks, setShowFireworks] = useState(false);
  const [fireworks, setFireworks] = useState([]);

  const createFirework = () => {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    return {
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
  };

  useEffect(() => {
    const calculateTimeLeft = () => {
      const newYear = new Date(2025, 0, 1);
      const difference = newYear - new Date();

      if (difference <= 0) {
        setShowFireworks(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (showFireworks) {
      const launchFireworks = setInterval(() => {
        setFireworks(prev => [...prev, createFirework()]);
      }, 300);

      setTimeout(() => {
        clearInterval(launchFireworks);
      }, 5000);

      return () => clearInterval(launchFireworks);
    }
  }, [showFireworks]);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="relative w-full h-full">
        {showFireworks && fireworks.map(fw => (
          <Firework key={fw.id} x={fw.x} y={fw.y} color={fw.color} />
        ))}
        
        <div className="absolute bottom-4 left-4 bg-black/20 backdrop-blur-sm rounded-lg p-4 text-white">
          <div className="text-sm mb-1">Countdown to 2025</div>
          <div className="grid grid-flow-col gap-2 text-center">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="flex flex-col">
                <span className="text-xl font-bold">
                  {String(value).padStart(2, '0')}
                </span>
                <span className="text-xs">{unit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes firework {
          0% { transform: translate(0, 100vh); }
          50% { transform: translate(0, 40vh); }
          100% { transform: translate(0, 50vh); }
        }

        @keyframes particle {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(0); opacity: 0; }
        }

        .animate-firework {
          animation: firework 1s ease-out forwards;
        }

        .animate-particle {
          animation: particle 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CountdownTimer;