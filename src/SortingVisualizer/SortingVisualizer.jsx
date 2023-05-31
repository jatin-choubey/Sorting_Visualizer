import React from "react";
import { getMergeSortAnimations } from "./sortingAlgorithms/sortingAlgorithms.js";
import "./SortingVisualizer.css";

const PRIMARY_COLOR = "turquoise";
const SECONDARY_COLOR = "red";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      animationSpeed: 100, // Initial animation speed value
      NUMBER_OF_ARRAY_BARS: 100,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const { NUMBER_OF_ARRAY_BARS } = this.state;
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(this.randomIntFromInterval(5, 500));
    }
    this.setState({ array });
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");
    const animationSpeed = this.state.animationSpeed;

    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;

      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * animationSpeed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * animationSpeed);
      }
    }
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  handleSpeedChange = (event) => {
    const speed = event.target.value;
    this.setState({ animationSpeed: speed });
  };

  handleArrayBarChange = (event) => {
    const bars = event.target.value;
    this.setState({ NUMBER_OF_ARRAY_BARS: bars });
  };

  render() {
    const { array, animationSpeed, NUMBER_OF_ARRAY_BARS } = this.state;

    return (
      <div className="container">
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
              }}
            ></div>
          ))}
          <br />
          <input
            className="custom-slider"
            type="range"
            min="1"
            max="500"
            value={animationSpeed}
            onChange={this.handleSpeedChange}
          />
          <input
            // className="custom-slider"
            type="range"
            min="2"
            max="120"
            value={NUMBER_OF_ARRAY_BARS}
            onChange={this.handleArrayBarChange}
          />
          <br />
          <button onClick={() => this.resetArray()}>Generate New Array</button>
          <button onClick={() => this.mergeSort()}>Merge Sort</button>
        </div>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
// function randomIntFromInterval(min, max) {
//   // min and max included
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

// function arraysAreEqual(arrayOne, arrayTwo) {
//   if (arrayOne.length !== arrayTwo.length) return false;
//   for (let i = 0; i < arrayOne.length; i++) {
//     if (arrayOne[i] !== arrayTwo[i]) {
//       return false;
//     }
//   }
//   return true;
// }
