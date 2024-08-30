import styles from "./controlpanelcomponent.module.css";

interface ControlPanelProps {
  // All of the necessary state attributes that the controlpanel will manipulate
  startAnimation: () => void;
  stopAnimation: () => void;
  clearCanvas: () => void;
  isAnimating: boolean;
  animationSpeed: number;
  setAnimationSpeed: (animationSpeed: number) => void;
  dotSize: number;
  setDotSize: (dotSize: number) => void;
  radius: number;
  setRadius: (radius: number) => void;
  numDots: number;
  setNumDots: (numDots: number) => void;
  color: string;
  setColor: (color: string) => void;
}

function ControlPanel(props: ControlPanelProps) {
  const {
    startAnimation,
    stopAnimation,
    clearCanvas,
    isAnimating,
    animationSpeed,
    setAnimationSpeed,
    dotSize,
    setDotSize,
    radius,
    setRadius,
    numDots,
    setNumDots,
    color,
    setColor,
  } = props;
  return (
    <div className={styles.controlPanel}>
      <div className={styles.buttonContainer}>
        <button
          className={styles.buttonStart}
          onClick={startAnimation}
          disabled={isAnimating}
        >
          Start Animation
        </button>
        <button
          className={styles.buttonStop}
          onClick={stopAnimation}
          disabled={!isAnimating}
        >
          Stop Animation
        </button>
        <button
          className={styles.buttonClear}
          onClick={clearCanvas}
          disabled={isAnimating}
        >
          Clear Canvas
        </button>
      </div>
      <div className={styles.sliderControl}>
        <div className={styles.sliders}>
          <label htmlFor="speedControl">
            Animation Speed: {animationSpeed}ms
          </label>
          <input
            id="speedControl"
            type="range"
            min="10"
            max="400"
            step="10"
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(Number(e.target.value))}
          />
        </div>
        <div className={styles.sliders}>
          <label htmlFor="dotSizeControl">Dot Size: {dotSize}px</label>
          <input
            id="dotSizeControl"
            type="range"
            min="1"
            max="30"
            step="1"
            value={dotSize}
            onChange={(e) => setDotSize(Number(e.target.value))}
          />
        </div>
        <div className={styles.sliders}>
          <label htmlFor="radiusSizeControl">Circle Radius: {radius}px</label>
          <input
            id="radiusSizeControl"
            type="range"
            min="5"
            max="275"
            step="1"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
          />
        </div>
        <div className={styles.sliders}>
          <label htmlFor="numDotsControl">Total Dots: {numDots}</label>
          <input
            id="numDotsControl"
            type="range"
            min="30"
            max="150"
            step="1"
            value={numDots}
            onChange={(e) => setNumDots(Number(e.target.value))}
          />
        </div>
        <div className={styles.sliders}>
          <label htmlFor="colorControl">Dot Color</label>
          <input
            id="colorControl"
            type="color"
            value={color}
            onChange={(e) => setColor(String(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;
