import React, { Component } from 'react';
import { createRef } from 'react';

class UncontrollComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.inputRef = createRef(); //dùng ref để truy cập vào DOM node để lấy dữ liệu của input
    this.fileInputRef = createRef();
    this.state = {
      fileSelected: null
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.inputRef.current.value);

    const formData = new FormData();

    formData.append('myFile', this.state.fileSelected, 'bienBanGiaoNhan');
  }

  handleFileChange(event) {
    this.setState({
      fileSelected: event.target.files[0]
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Input </label>
            <input type='text' name='name' ref={this.inputRef} />
          </div>

          <div>
            <input
              type='file'
              name=''
              ref={this.fileInputRef}
              onChange={this.handleFileChange}
            />
          </div>

          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

export default UncontrollComponent;
