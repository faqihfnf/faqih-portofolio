"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

interface ShootingStarData {
  element: SVGRectElement;
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
  active: boolean;
}

interface ShootingStarsProps {
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;
  maxDelay?: number;
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
  className?: string;
}

const getRandomStartPoint = () => {
  const side = Math.floor(Math.random() * 4);
  const offset = Math.random() * window.innerWidth;

  switch (side) {
    case 0:
      return { x: offset, y: 0, angle: 45 };
    case 1:
      return { x: window.innerWidth, y: offset, angle: 135 };
    case 2:
      return { x: offset, y: window.innerHeight, angle: 225 };
    case 3:
      return { x: 0, y: offset, angle: 315 };
    default:
      return { x: 0, y: 0, angle: 45 };
  }
};

export const ShootingStars: React.FC<ShootingStarsProps> = ({
  minSpeed = 10,
  maxSpeed = 30,
  minDelay = 1200,
  maxDelay = 4200,
  starColor = "#9E00FF",
  trailColor = "#2EB9DF",
  starWidth = 10,
  starHeight = 1,
  className,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const currentStarRef = useRef<ShootingStarData | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const createTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Create SVG defs gradient once
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Check if gradient already exists
    if (svg.querySelector("#shooting-star-gradient")) return;

    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    gradient.setAttribute("id", "shooting-star-gradient");
    gradient.setAttribute("x1", "0%");
    gradient.setAttribute("y1", "0%");
    gradient.setAttribute("x2", "100%");
    gradient.setAttribute("y2", "100%");

    const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("style", `stop-color:${trailColor};stop-opacity:0`);

    const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop2.setAttribute("offset", "100%");
    stop2.setAttribute("style", `stop-color:${starColor};stop-opacity:1`);

    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.appendChild(defs);

    return () => {
      defs.remove();
    };
  }, [starColor, trailColor]);

  const createStar = () => {
    const svg = svgRef.current;
    if (!svg) return;

    // Remove previous star if exists
    if (currentStarRef.current?.element) {
      currentStarRef.current.element.remove();
    }

    const { x, y, angle } = getRandomStartPoint();
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("fill", "url(#shooting-star-gradient)");
    svg.appendChild(rect);

    currentStarRef.current = {
      element: rect,
      x,
      y,
      angle,
      scale: 1,
      speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
      distance: 0,
      active: true,
    };

    // Schedule next star
    const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;
    createTimeoutRef.current = setTimeout(createStar, randomDelay);
  };

  useEffect(() => {
    createStar();

    return () => {
      if (createTimeoutRef.current) {
        clearTimeout(createTimeoutRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (currentStarRef.current?.element) {
        currentStarRef.current.element.remove();
      }
    };
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const moveStar = () => {
      const star = currentStarRef.current;
      const svg = svgRef.current;

      if (!star || !svg) {
        animationFrameRef.current = requestAnimationFrame(moveStar);
        return;
      }

      if (!star.active) {
        animationFrameRef.current = requestAnimationFrame(moveStar);
        return;
      }

      // Calculate new position
      const newX = star.x + star.speed * Math.cos((star.angle * Math.PI) / 180);
      const newY = star.y + star.speed * Math.sin((star.angle * Math.PI) / 180);
      const newDistance = star.distance + star.speed;
      const newScale = 1 + newDistance / 100;

      // Check if out of bounds
      const outOfBounds =
        newX < -20 ||
        newX > window.innerWidth + 20 ||
        newY < -20 ||
        newY > window.innerHeight + 20;

      if (outOfBounds) {
        star.active = false;
        star.element.remove();
        currentStarRef.current = null;
      } else {
        star.x = newX;
        star.y = newY;
        star.distance = newDistance;
        star.scale = newScale;

        // Update DOM directly (no React re-render)
        star.element.setAttribute("x", String(star.x));
        star.element.setAttribute("y", String(star.y));
        star.element.setAttribute("width", String(starWidth * star.scale));
        star.element.setAttribute("height", String(starHeight));
        star.element.setAttribute(
          "transform",
          `rotate(${star.angle}, ${star.x + (starWidth * star.scale) / 2}, ${star.y + starHeight / 2})`
        );
      }

      animationFrameRef.current = requestAnimationFrame(moveStar);
    };

    animationFrameRef.current = requestAnimationFrame(moveStar);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [starWidth, starHeight]);

  return <svg ref={svgRef} className={cn("w-full h-full absolute inset-0", className)} />;
};
