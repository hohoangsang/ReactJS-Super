import React, { Component } from 'react';

class BareButton extends Component {
  constructor(props) {
    super(props);
  }

  // //currying function
  // handleButton = (value) => () => {
  //   console.log(value);
  // };

  handleButton = (event, value) => {
    console.log(value);
  };

  render() {
    return (
      <>
        <button
          onClick={(event) => {
            this.handleButton(event, 'Add');
          }}
        >
          Add
        </button>
        <button onClick={this.handleButton('Edit')}>Edit</button>
        <button onClick={this.handleButton('Delete')}>Delete</button>
      </>
    );
  }
}

export default BareButton;
