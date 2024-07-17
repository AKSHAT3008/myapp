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
      shareLink:"", // Stores the target time 120 minutes earlier
    };
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      const { value, time, targetTime } = this.state;
      
      const timeDiffInMinutes = Math.floor((targetTime - time) / (1000 ));

      // Adjust time based on slider value (speed) and direction (anticlockwise)
      const adjustedTime = new Date(time.getTime() - (value * 1000));

      // Ensure time doesn't go past 120 minutes before targetTime
      if (adjustedTime < targetTime) {
        this.setState({ time: adjustedTime });
      } else {
        this.setState({ time: this.state.time });
        clearInterval(this.timerId); // Stop timer when target time is reached
      }
    }, 1000);

    // Set the target time 120 minutes earlier on initial render
    
  }
 

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
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
    const { isDarkMode } = this.props;
    const slideStyle = genSlideStyle(this.state.value);
    const clockClass = isDarkMode ? "dark-mode" : "light-mode";

    return (
      <div className={`parent ${clockClass}`}>
        <Dashboard />
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
          <span className="twelve">XII</span>
          <span className="one">I</span>
          <span className="two">II</span>
          <span className="three">III</span>
          <span className="four">IV</span>
          <span className="five">V</span>
          <span className="six">VI</span>
          <span className="seven">VII</span>
          <span className="eight">VIII</span>
          <span className="nine">IX</span>
          <span className="ten">X</span>
          <span className="eleven">XI</span>
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
        <Button className="btn btn-primary mt-4" onClick={this.generateShareLink} style={{ backgroundColor:'#FE8C00',borderColor:'transparent ',textDecoration: 'none', fontFamily:'sans-serif', fontWeight:'400', fontSize:'16px' }}>Share</Button>
      </div>
    );
  }
}

export default Clock;
