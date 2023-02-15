import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      address: '',
      moto: 'Ducati',
      isCoder: false
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
  };

  handleChangeNameField = (event) => {
    this.setState({
      name: event.target.value
    });
  };

  handleChangeAddressField = (event) => {
    this.setState({
      address: event.target.value
    });
  };

  handleChangeMotoField = (event) => {
    this.setState({
      moto: event.target.value
    });
  };

  handleChangeIsCoderField = (event) => {
    this.setState({
      isCoder: event.target.checked
    });
  };

  handleChangeField = (event) => {
    const { target } = event;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value
    });
  };

  render() {
    const { name, address, moto, isCoder } = this.state;

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type='text'
              name='name'
              value={name}
              onChange={this.handleChangeField}
            />
          </div>
          <div>
            <textarea
              name='address'
              cols='30'
              rows='5'
              value={address}
              onChange={this.handleChangeField}
            />
          </div>
          <div>
            <select name='moto' value={moto} onChange={this.handleChangeField}>
              <option value='Honda'>Honda</option>
              <option value='Yamaha'>Yamaha</option>
              <option value='Ducati'>Ducati</option>
              <option value='Kawasaki'>Kawasaki</option>
            </select>
          </div>

          <div>
            <input
              type='checkbox'
              name='isCoder'
              checked={isCoder}
              onChange={this.handleChangeField}
            />
          </div>

          <div>
            <button type='Submit'>Submit</button>
          </div>
        </form>
      </>
    );
  }
}

export default Form;
