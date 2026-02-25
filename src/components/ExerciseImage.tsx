import { useState, useEffect } from 'react';
import { getExerciseImages } from '../data/exercise-images';

interface ExerciseImageProps {
  exerciseId: string;
  className?: string;
}

export function ExerciseImage({ exerciseId, className = '' }: ExerciseImageProps) {
  const images = getExerciseImages(exerciseId);
  const [showEnd, setShowEnd] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Animate between start and end positions
  useEffect(() => {
    if (!images || !loaded) return;
    const interval = setInterval(() => setShowEnd((v) => !v), 1200);
    return () => clearInterval(interval);
  }, [images, loaded]);

  if (!images || error) return null;

  return (
    <div className={`relative overflow-hidden rounded-xl bg-cream-dark ${className}`}>
      <img
        src={images.start}
        alt=""
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          showEnd ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        loading="lazy"
      />
      <img
        src={images.end}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          showEnd ? 'opacity-100' : 'opacity-0'
        }`}
        loading="lazy"
      />
    </div>
  );
}
