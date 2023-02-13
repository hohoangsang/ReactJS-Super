import { clearConfigCache } from 'prettier';
import { Fragment } from 'react';
import { Component } from 'react';

const lists = ['Winner', 'Exciter', 'Air Blade', 'SH'];

const fetchApi = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(lists);
    }, 1000);
  });
};

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: {
        time: new Date().toLocaleTimeString()
      },
      seconds: {
        second: new Date().getSeconds()
      },
      lists: []
    };
    this.changeTimes = this.changeTimes.bind(this);
  }

  changeTimes() {
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
  }

  componentDidMount() {
    //access DOM node
    const h2Element = document.getElementById('second');
    console.log(h2Element);

    //Call api and setState
    fetchApi().then((res) => {
      this.setState((prev) => ({
        ...prev,
        lists: res
      }));
    });
  }

  render() {
    console.log(this.state.lists);
    const { first, seconds } = this.state;
    return (
      <Fragment>
        <h1>Hello Worlds</h1>
        <h2>It is {first.time} o'clock</h2>
        <h2 id='second'>Is is {seconds.second} seconds</h2>

        <button onClick={this.changeTimes}>Change Times</button>
      </Fragment>
    );
  }
}

export default Clock;
