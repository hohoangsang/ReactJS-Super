import React, { Component } from 'react';
import { createRef } from 'react';

class UncontrollComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.inputRef = createRef(); //dùng ref để truy cập vào DOM node để lấy dữ liệu của input
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.inputRef.current.value);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Input </label>
            <input type='text' name='name' ref={this.inputRef} />
          </div>

          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

export default UncontrollComponent;
