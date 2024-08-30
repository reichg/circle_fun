import { useEffect, useRef, useState } from "react";
import styles from "./circle.module.css";
import ControlPanel from "../controlpanelcomponent/ControlPanel";

function CircleCanvas() {
  // All of the controls
  const [radius, setRadius] = useState<number>(20);
  const [numDots, setNumdots] = useState<number>(50);
  const [color, setColor] = useState<string>("#2866c9");
  const [dotSize, setDotSize] = useState<number>(10);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [animationSpeed, setAnimationSpeed] = useState<number>(60);
  const [scale, setScale] = useState<number>(10);

  // Refs for canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestIdRef = useRef<number | null>(null);
  const currentDotRef = useRef<number>(0);
  const lastTimestampRef = useRef<number>(0);

  // Static canvas size
  const canvasSize = {
    width: 700,
    height: 700,
  };

  const startAnimation = () => {
    clearCanvas(); // Clear the canvas before starting a new animation
    currentDotRef.current = 0; // Reset dot counter
    setIsAnimating(true);
  };

  const stopAnimation = () => {
    setIsAnimating(false);
    if (requestIdRef.current) {
      cancelAnimationFrame(requestIdRef.current);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
      drawGrid();
    }
  };

  // Draws grid lines 
  const drawGrid = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      const step = 20; // Distance between grid lines
      ctx.strokeStyle = "#ddd";
      ctx.lineWidth = 1;

      // Draw vertical grid lines
      for (let x = 0; x <= canvasSize.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasSize.height);
        ctx.stroke();
      }

      // Draw horizontal grid lines
      for (let y = 0; y <= canvasSize.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvasSize.width, y);
        ctx.stroke();
      }

      // Draw X and Y axes
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;

      // X-axis
      ctx.beginPath();
      ctx.moveTo(0, canvasSize.height / 2);
      ctx.lineTo(canvasSize.width, canvasSize.height / 2);
      ctx.stroke();

      // Y-axis
      ctx.beginPath();
      ctx.moveTo(canvasSize.width / 2, 0);
      ctx.lineTo(canvasSize.width / 2, canvasSize.height);
      ctx.stroke();

      addAxisLabels(ctx, canvas!.width, canvas!.height);
    }
  };

  // Label with the canvas width and height
  const addAxisLabels = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";

    // X-axis label
    ctx.fillText(`${canvasSize.width}px`, width / 2 + 2, height - 5);

    // Y-axis label - rotated for vertical text
    ctx.save(); // Save the current state
    ctx.translate(0, height / 2 - 5);
    ctx.fillText(`${canvasSize.height}px`, 0, 0);
    ctx.restore(); // Restore to the original state
  };

  // Draws each dot
  const drawDot = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string
  ) => {
    const centerX = canvasSize.width / 2;
    const centerY = canvasSize.height / 2;
    ctx.fillStyle = color;
    ctx.fillRect(
      centerX + x - dotSize / 2,
      centerY - y - dotSize / 2,
      dotSize,
      dotSize
    ); // Center the square
  };

  // Animation loop
  const animate = (timestamp: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (ctx && canvas && isAnimating) {
      if (timestamp - lastTimestampRef.current >= animationSpeed) {
        if (currentDotRef.current < numDots) {
          // calculate where the dot coordinates are. 2PI radians in a full circle
          const angle = (currentDotRef.current * 2 * Math.PI) / numDots;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
          drawDot(ctx, x * scale, y * scale, color); // Active color, scale coordinates for larger display
          currentDotRef.current += 1;
          lastTimestampRef.current = timestamp;
        } else {
          stopAnimation(); // Stop the animation once all dots are drawn
        }
      }
      requestIdRef.current = requestAnimationFrame(animate);
    }
  };

  // Want to draw this first and only once.
  useEffect(() => {
    drawGrid();
  }, []);

  useEffect(() => {
    if (isAnimating) {
      requestIdRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
      }
    };
  }, [isAnimating, animationSpeed]);

  return (
    <div className={styles.componentContainer}>
      <div className={styles.canvasContainer}>
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
        />
      </div>

      <ControlPanel
        animationSpeed={animationSpeed}
        isAnimating={isAnimating}
        radius={radius}
        setRadius={setRadius}
        numDots={numDots}
        setNumDots={setNumdots}
        color={color}
        setColor={setColor}
        scale={scale}
        dotSize={dotSize}
        setDotSize={setDotSize}
        setAnimationSpeed={setAnimationSpeed}
        setScale={setScale}
        startAnimation={startAnimation}
        stopAnimation={stopAnimation}
        clearCanvas={clearCanvas}
      />
    </div>
  );
}

export default CircleCanvas;
