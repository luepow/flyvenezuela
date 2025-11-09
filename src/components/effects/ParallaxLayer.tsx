'use client';

import { useEffect, useState, ReactNode } from 'react';

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export default function ParallaxLayer({ children, speed = 0.5, className = '' }: ParallaxLayerProps) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset * speed);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      className={className}
      style={{
        transform: `translateY(${offset}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {children}
    </div>
  );
}
