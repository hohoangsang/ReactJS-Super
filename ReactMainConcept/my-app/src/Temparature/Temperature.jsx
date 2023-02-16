import React, { Component } from 'react';
import BoilingVerdict from './BoilingVerdict';
import TemperatureInput from './TemperatureInput';

const unitName = {
  f: 'Fahrenheit',
  c: 'Celsius'
};

const calculateTemperature = (temperature, funcCalculate) => {
  if (!funcCalculate || !temperature) return '';

  const value = parseFloat(temperature);

  if (Number.isNaN(value)) return '';

  let result;

  result = funcCalculate(temperature);

  return result.toString();
};

const calculateCelsius = (value) => {
  const result = (value - 32) / 1.8;
  return Math.round(result * 1000) / 1000;
};

const calculateFahrenheit = (value) => {
  const result = 1.8 * value + 32;
  return Math.round(result * 1000) / 1000;
};

export default class Temperature extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scale: 'c',
      temperature: ''
    };
  }

  //currying
  handleChange = (scale) => (value) => {
    this.setState({
      temperature: value,
      scale
    });
  };

  render() {
    const { scale, temperature } = this.state;

    const celsius =
      scale === 'f'
        ? calculateTemperature(temperature, calculateCelsius)
        : temperature;

    const fahrenheit =
      scale === 'c'
        ? calculateTemperature(temperature, calculateFahrenheit)
        : temperature;

    return (
      <div>
        <TemperatureInput
          title={unitName.c}
          temperature={celsius}
          handleChangeTemperature={this.handleChange('c')}
        />
        <TemperatureInput
          title={unitName.f}
          temperature={fahrenheit}
          handleChangeTemperature={this.handleChange('f')}
        />
        <BoilingVerdict celsius={Number(celsius)} />
      </div>
    );
  }
}
