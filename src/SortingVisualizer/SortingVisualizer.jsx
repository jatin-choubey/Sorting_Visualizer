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
      animationSpeed: 50, // Initial animation speed value
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
        <div className="elements">
          <div className="custom-slider1">
            <span class="span">Speed </span>
            <input
              className="custom-slider"
              type="range"
              min="1"
              max="500"
              value={animationSpeed}
              onChange={this.handleSpeedChange}
            />
            <div class="slider-label"> Speed: {animationSpeed}</div>
          </div>
          <div>
            <div className="custom-slider2">
              <span class="span"> Array Size </span>
              <input
                className="custom-slider"
                type="range"
                min="2"
                max="120"
                value={NUMBER_OF_ARRAY_BARS}
                onChange={this.handleArrayBarChange}
              />
              <div class="slider-label2">
                Size : {NUMBER_OF_ARRAY_BARS} Bars
              </div>
            </div>
            <br />
            <button onClick={() => this.resetArray()}>
              Generate New Array
            </button>
            <button onClick={() => this.mergeSort()}>Merge Sort</button>
          </div>
        </div>
        <div className="nums">
          <div className="block">
            500________________________________________________________________________________________________________________________
          </div>
          <div className="block">
            480________________________________________________________________________________________________________________________
          </div>
          <div className="block">
            460________________________________________________________________________________________________________________________
          </div>
          <div className="block">
            440________________________________________________________________________________________________________________________
          </div>
          <div className="block">
            420________________________________________________________________________________________________________________________
          </div>
          <div className="block">
            400________________________________________________________________________________________________________________________
          </div>
          <div className="block">
            380________________________________________________________________________________________________________________________
          </div>
          <div className="block">
            360________________________________________________________________________________________________________________________
          </div>
          <div className="block">
            340________________________________________________________________________________________________________________________
          </div>
          <div className="block">
            320________________________________________________________________________________________________________________________
          </div>
          <div className="block">
            300________________________________________________________________________________________________________________________
          </div>
          <div className="block">
            280________________________________________________________________________________________________________________________
          </div>
          <div className="block">
            260________________________________________________________________________________________________________________________
          </div>
          <div className="block">
            240________________________________________________________________________________________________________________________
          </div>
          <div className="block">
            220________________________________________________________________________________________________________________________
          </div>
          <div className="block">
            200________________________________________________________________________________________________________________________
          </div>
          <div className="block">
            180________________________________________________________________________________________________________________________
          </div>
          <div className="block">
            160________________________________________________________________________________________________________________________
          </div>
          <div className="block">
            140________________________________________________________________________________________________________________________
          </div>
          <div className="block">
            120________________________________________________________________________________________________________________________
          </div>
          <div className="block">
            100________________________________________________________________________________________________________________________
          </div>
          <div className="block">
            80_________________________________________________________________________________________________________________________
          </div>
          <div className="block">
            60_________________________________________________________________________________________________________________________
          </div>
          <div className="block">
            40_________________________________________________________________________________________________________________________
          </div>
          <div className="block">
            20_________________________________________________________________________________________________________________________
          </div>
          <div className="block">
            ....0__________________________________________________________________________________________________________________________
          </div>
        </div>
        <div className="line"></div>
        <div className="l2"></div>

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
        </div>
        {/* elements */}
      </div>
    );
  }
}
