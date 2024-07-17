import React, { Component } from "react";
import "./styles/Clock.css";
import Dashboard from "./Dashboard";
import { Button } from "react-bootstrap";

const genSlideStyle = (value) => {
  return {
    point: {
      left: `calc(${value * 20}% - ${5 + 3 * value}px)`,
    },
    range: {
      width: `${value * 20}%`,
    },
  };
};

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1, // Initial speed (1x normal speed)
      time: new Date(),
      targetTime: new Date(),
      shareLink: "", // Stores the target time 120 minutes earlier
    };
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const time = urlParams.get('time');
    const speed = urlParams.get('speed');

    console.log('Time from URL:', time);
    console.log('Speed from URL:', speed);

    if (time) this.setState({ time: new Date(time), targetTime: new Date(time) });
    if (speed) this.setState({ value: Number(speed) });

    this.timerId = setInterval(() => {
      const { targetTime, value } = this.state;
      const timeDiffInMinutes = Math.floor((targetTime - this.state.time) / (1000 * 60));

      // Adjust time based on slider value (speed) and direction (anticlockwise)
      const adjustedTime = new Date(this.state.time.getTime() - (value * 1000 * 60));

      // Ensure time doesn't go past 120 minutes before targetTime
      if (adjustedTime < targetTime) {
        this.setState({ time: adjustedTime });
      } else {
        this.setState({ time: this.state.time });
        clearInterval(this.timerId); // Stop timer when target time is reached
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  handleChange = (e) => {
    this.setState({ value: Number(e.target.value) });
  }

  generateShareLink = () => {
    const { time, value } = this.state;
    const shareLink = `${window.location.origin}${window.location.pathname}?time=${time.toISOString()}&speed=${value}`;
    this.setState({ shareLink });
    navigator.clipboard.writeText(shareLink).then(() => {
      alert('Link copied to clipboard!');
    });
  };

  render() {
    const slideStyle = genSlideStyle(this.state.value);

    return (
      <div className="parent">
        <Dashboard/>

        <div className="clock">
          <div
            className="hour_hand"
            style={{
              transform: `rotateZ(${this.state.time.getHours() * 30}deg)`,
            }}
          />
          <div
            className="min_hand"
            style={{
              transform: `rotateZ(${this.state.time.getMinutes() * 6}deg)`,
            }}
          />
          <div
            className="sec_hand"
            style={{
              transform: `rotateZ(${this.state.time.getSeconds() * 6}deg)`,
            }}
          />
          <span className="twelve">12</span>
          <span className="one">1</span>
          <span className="two">2</span>
          <span className="three">3</span>
          <span className="four">4</span>
          <span className="five">5</span>
          <span className="six">6</span>
          <span className="seven">7</span>
          <span className="eight">8</span>
          <span className="nine">9</span>
          <span className="ten">10</span>
          <span className="eleven">11</span>
        </div>
        <div className="range">
          <span className="bullet" />
          <span className="bullet-1" />
          <span className="bullet-2" />
          <span className="bullet-3" />
          <span className="range-value" style={slideStyle.range} />
          <span className="circle" style={slideStyle.point} />
          <input
            className="range-slide"
            name="range"
            type="range"
            min="0"
            max="5" // Adjust max value for desired speed range
            value={this.state.value}
            step="1"
            onChange={this.handleChange}
          />
        </div>
        <Button className="btn btn-primary mt-4" onClick={this.generateShareLink}>Share</Button>
      </div>
    );
  }
}

export default Clock;
