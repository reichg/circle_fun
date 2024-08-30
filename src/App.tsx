import styles from "./app.module.css";
import CircleCanvas from "./components/canvascomponent/CircleCanvas";

function App() {
  

  return (
    <div className={styles.app}>
      <h1>Animated Circle Dots on Canvas</h1>
      <div className={styles.canvasContainer}>
        <CircleCanvas
        />
      </div>   
    </div>
  );
}

export default App;
