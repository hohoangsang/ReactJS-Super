import React, { Component } from 'react';

const fetchMoto = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(['RSV4', 'CBR1000', 'H2', 'Winner']);
    }, 1000);
  });

export default class CorrectlyState extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      motoList: []
    };
  }

  componentDidMount() {
    console.log('componentDidMount');
    // //count === 0
    // this.setState({
    //   count: this.state.count + 2
    // });
    // //count vẫn bằng 0
    // this.setState({
    //   count: this.state.count + 1
    // });
    // // setState là 1 hàm bất đồng bộ => Ấp dụng kiến thức bất đồng bộ trong javascript
    this.setState((prevState) => ({
      ...prevState,
      count: prevState.count + 2
    }));

    this.setState((prevState) => ({
      ...prevState,
      count: prevState.count + 1
    }));

    fetchMoto().then((res) => {
      this.setState({
        motoList: res
      });
    });
  }

  render() {
    const { count } = this.state;
    console.log('render');
    console.log(this.state);
    return (
      <div>
        <h1>Counter {count}</h1>;
      </div>
    );
  }
}

// import React, { useEffect, useState } from 'react';

// export default function CorrectlyState() {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     console.log('componentDidMount');

//     //count === 0
//     setCount(count + 1);

//     //count === 0
//     setCount(count + 1);
//     // setState là 1 hàm bất đồng bộ => Ấp dụng kiến thức bất đồng bộ trong javascript
//   }, []);

//   console.log('render');

//   return <h1>CorrectlyState. Counter: {count}</h1>;
// }
