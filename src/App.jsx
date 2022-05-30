import React, { useCallback, useEffect, useState } from "react";
import {
  bubbleSortAlgorithm,
  heapSortAlgorithm,
  mergeSortAlgorithm,
  quickSortAlgorithm,
} from "./algorithms";
import "./styles.scss";

export default function App() {
  const MAX_BAR_HEIGHT_IN_PX = 600;
  const ANIMATION_SPEED_MS = 2;
  const NUMBER_OF_BARS = Math.floor(window.innerWidth / 5.5);
  const PRIMARY_COLOR = "rgb(45, 183, 170)";
  const SECONDARY_COLOR = "rgb(213, 77, 65)";

  const [currentAlgorithm, setCurrentAlgorithm] = useState("Bubble Sort");
  const [array, setArray] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Helper Functions
  const randomRange = (min, max) => {
    return Math.floor(
      Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min)
    );
  };

  const generateArray = useCallback(() => {
    const arr = [];

    for (let i = 0; i < NUMBER_OF_BARS; i++) {
      arr.push(randomRange(5, 1000));
    }

    setArray(arr);
  }, [setArray, NUMBER_OF_BARS])

  const heightFromValue = (val) => {
    let asPercent = (val * 100) / 1000;
    let height = MAX_BAR_HEIGHT_IN_PX * (asPercent / 100);
    return height;
  };

  const flattenAnimations = (animations) => {
    const flattenedAnimations = [];

    for (let i = 0; i < animations.length; i++) {
      const element = animations[i];

      if (element.comparison != null) {
        flattenedAnimations.push({
          idx: element.comparison,
          isComparison: true,
          scan: true,
        });
        flattenedAnimations.push({
          idx: element.comparison,
          isComparison: true,
          scan: false,
        });
      }
      if (element.swap != null) {
        flattenedAnimations.push({ idx: element.swap, isComparison: false });
      }
    }

    return flattenedAnimations;
  };

  // Algorithms
  const bubbleSort = () => {
    let animations = bubbleSortAlgorithm(array, 0, array.length - 1);
    let flattenedAnimations = flattenAnimations(animations);

    for (let i = 0; i < flattenedAnimations.length; i++) {
      const element = flattenedAnimations[i];
      let bars = document.querySelectorAll(".bar");

      if (element.isComparison) {
        setTimeout(() => {
          bars[element.idx[0]].style.backgroundColor = !element.scan
            ? PRIMARY_COLOR
            : SECONDARY_COLOR;
          bars[element.idx[1]].style.backgroundColor = !element.scan
            ? PRIMARY_COLOR
            : SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          let temp = bars[element.idx[0]].style.height;
          bars[element.idx[0]].style.height = bars[element.idx[1]].style.height;
          bars[element.idx[1]].style.height = temp;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  };

  const quickSort = () => {
    let animations = quickSortAlgorithm(array);
    let flattenedAnimations = flattenAnimations(animations);

    for (let i = 0; i < flattenedAnimations.length; i++) {
      const element = flattenedAnimations[i];
      let bars = document.querySelectorAll(".bar");

      if (element.isComparison) {
        setTimeout(() => {
          bars[element.idx[0]].style.backgroundColor = !element.scan
            ? PRIMARY_COLOR
            : SECONDARY_COLOR;
          bars[element.idx[1]].style.backgroundColor = !element.scan
            ? PRIMARY_COLOR
            : SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          let temp = bars[element.idx[0]].style.height;
          bars[element.idx[0]].style.height = bars[element.idx[1]].style.height;
          bars[element.idx[1]].style.height = temp;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  };

  const heapSort = () => {
    let animations = heapSortAlgorithm(array);
    let flattenedAnimations = flattenAnimations(animations);

    for (let i = 0; i < flattenedAnimations.length; i++) {
      const element = flattenedAnimations[i];
      let bars = document.querySelectorAll(".bar");

      if (element.isComparison) {
        setTimeout(() => {
          bars[element.idx[0]].style.backgroundColor = !element.scan
            ? PRIMARY_COLOR
            : SECONDARY_COLOR;
          bars[element.idx[1]].style.backgroundColor = !element.scan
            ? PRIMARY_COLOR
            : SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          let temp = bars[element.idx[0]].style.height;
          bars[element.idx[0]].style.height = bars[element.idx[1]].style.height;
          bars[element.idx[1]].style.height = temp;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  };

  const mergeSort = () => {
    const animations = mergeSortAlgorithm(array);
    for (let i = 0; i < animations.length; i++) {
      const bars = document.querySelectorAll(".bar");
      const isColorChange = i % 3 !== 2;

      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = bars[barOneIdx].style;
        const barTwoStyle = bars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = bars[barOneIdx].style;
          barOneStyle.height = `${heightFromValue(newHeight)}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  };

  const visualize = () => {
    if (currentAlgorithm === "Bubble Sort") {
      bubbleSort();
    } else if (currentAlgorithm === "Merge Sort") {
      mergeSort();
    } else if (currentAlgorithm === "Quick Sort") {
      quickSort();
    } else if (currentAlgorithm === "Heap Sort") {
      heapSort();
    }
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      generateArray();
      setIsLoaded(false);
    }
  }, [isLoaded, generateArray]);


  // Components
  const AlgorithmItem = (props) => {
    return (
      <p
        className={`noselect algorithm ${
          currentAlgorithm === props.name ? "selected" : "deselected"
        }`}
        onClick={() => setCurrentAlgorithm(props.name)}
      >
        {props.name}
      </p>
    );
  };

  const Controls = () => {
    return (
      <div className="ctrls">
        <p className="visualizeSort clickable noselect" onClick={visualize}>
          Visualize
        </p>
        <div className="iseperator"></div>
        <p
          className="generateNew clickable noselect"
          onClick={() => generateArray()}
        >
          Randomize
        </p>

        <div className="seperator"></div>

        <div className="algorithms">
          <AlgorithmItem name="Bubble Sort"></AlgorithmItem>
          <AlgorithmItem name="Heap Sort"></AlgorithmItem>
          <AlgorithmItem name="Merge Sort"></AlgorithmItem>
          <AlgorithmItem name="Quick Sort"></AlgorithmItem>
        </div>

        <div className="seperator"></div>

        <p className="noselect">
          By <a href="https://github.com/AzracStudios">@AzracStudios</a>
        </p>
      </div>
    );
  };

  const SortingVisualizer = () => {
    return (
      <div className="App">
        <Controls></Controls>

        <div className="root">
          {array.map((val, idx) => {
            return (
              <div
                className="bar"
                key={idx}
                style={{
                  height: `${heightFromValue(val)}px`,
                }}
              ></div>
            );
          })}
        </div>
      </div>
    );
  };

  return <SortingVisualizer></SortingVisualizer>;
}
