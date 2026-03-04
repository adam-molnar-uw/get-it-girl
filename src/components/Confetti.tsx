import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  delay: number;
  duration: number;
  drift: number;
}

const COLORS = ['#FFAD9E', '#A8E6CF', '#C3B1E1', '#FFD1C9', '#7DD4AE', '#DDD1F0'];

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 40 + Math.random() * 20, // center-ish horizontally
    y: 30 + Math.random() * 10,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: 6 + Math.random() * 6,
    rotation: Math.random() * 360,
    delay: Math.random() * 0.3,
    duration: 1.2 + Math.random() * 0.8,
    drift: -50 + Math.random() * 100,
  }));
}

export function Confetti() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(createParticles(40));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size * (Math.random() > 0.5 ? 1 : 0.6),
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            transform: `rotate(${p.rotation}deg)`,
            animation: `confetti-fall ${p.duration}s ease-out ${p.delay}s forwards`,
            ['--drift' as string]: `${p.drift}px`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}
