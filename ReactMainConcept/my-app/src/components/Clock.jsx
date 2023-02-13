import { Fragment } from 'react';
import { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: {
        time: new Date().toLocaleTimeString()
      },
      seconds: {
        second: new Date().getSeconds()
      }
    };
  }

  changeTimes = () => {
    this.setState((prev) => {
      return {
        ...prev,
        first: {
          ...prev.first,
          time: new Date().toLocaleTimeString()
        },
        seconds: {
          ...prev.seconds,
          second: new Date().getSeconds()
        }
      };
    });
  };

  render() {
    const { first, seconds } = this.state;
    return (
      <Fragment>
        <h1>Hello Worlds</h1>
        <p>It is {first.time} o'clock</p>
        <p>Is is {seconds.second} seconds</p>

        <button onClick={this.changeTimes}>Change Times</button>
      </Fragment>
    );
  }
}

export default Clock;
