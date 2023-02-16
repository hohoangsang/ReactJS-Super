import { Component } from 'react';
import PropTypes from 'prop-types';

class TemparatureInput extends Component {
  handleChangeInput = (event) => {
    this.props.handleChangeTemperature(event.target.value);
  };

  render() {
    const { title, temperature } = this.props;

    return (
      <fieldset>
        <legend>Enter temperature in {title}</legend>

        <input
          type='text'
          value={temperature}
          onChange={this.handleChangeInput}
        />
      </fieldset>
    );
  }
}

TemparatureInput.propTypes = {
  title: PropTypes.string.isRequired,
  temperature: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleChangeTemperature: PropTypes.func.isRequired
};

export default TemparatureInput;
