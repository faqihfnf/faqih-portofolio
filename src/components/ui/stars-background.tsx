"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

interface StarData {
  x: number;
  y: number;
  radius: number;
  baseOpacity: number;
  twinkleSpeed: number | null;
  twinklePhase: number;
}

interface StarBackgroundProps {
  starDensity?: number;
  allStarsTwinkle?: boolean;
  twinkleProbability?: number;
  minTwinkleSpeed?: number;
  maxTwinkleSpeed?: number;
  className?: string;
}

const TWINKLE_UPDATE_INTERVAL = 100;

export const StarsBackground: React.FC<StarBackgroundProps> = ({
  starDensity = 0.00015,
  allStarsTwinkle = true,
  twinkleProbability = 0.7,
  minTwinkleSpeed = 0.5,
  maxTwinkleSpeed = 1,
  className
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<StarData[]>([]);
  const lastTwinkleUpdateRef = useRef<number>(0);
  const dprRef = useRef<number>(window.devicePixelRatio || 1);

  // Generate stars function
  const generateStars = (width: number, height: number): StarData[] => {
    const area = width * height;
    const numStars = Math.floor(area * starDensity);
    return Array.from({ length: numStars }, () => {
      const shouldTwinkle = allStarsTwinkle || Math.random() < twinkleProbability;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 0.05 + 0.5,
        baseOpacity: Math.random() * 0.5 + 0.5,
        twinkleSpeed: shouldTwinkle ? minTwinkleSpeed + Math.random() * (maxTwinkleSpeed - minTwinkleSpeed) : null,
        twinklePhase: Math.random() * Math.PI * 2,
      };
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let logicalWidth = 0;
    let logicalHeight = 0;
    let animationFrameId: number;

    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      dprRef.current = dpr;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      logicalWidth = width;
      logicalHeight = height;

      starsRef.current = generateStars(width, height);
    };

    resizeCanvas();

    const render = (currentTime: number) => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, logicalWidth, logicalHeight);

      const shouldUpdateTwinkle = currentTime - lastTwinkleUpdateRef.current >= TWINKLE_UPDATE_INTERVAL;

      starsRef.current.forEach((star) => {
        let opacity = star.baseOpacity;

        if (star.twinkleSpeed !== null) {
          if (shouldUpdateTwinkle) {
            star.twinklePhase += 0.1;
          }
          opacity = 0.5 + Math.abs(Math.sin(star.twinklePhase / star.twinkleSpeed) * 0.5);
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      });

      if (shouldUpdateTwinkle) {
        lastTwinkleUpdateRef.current = currentTime;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });

    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [starDensity, allStarsTwinkle, twinkleProbability, minTwinkleSpeed, maxTwinkleSpeed]);

  return <canvas ref={canvasRef} className={cn("h-full w-full absolute inset-0", className)} />;
};
