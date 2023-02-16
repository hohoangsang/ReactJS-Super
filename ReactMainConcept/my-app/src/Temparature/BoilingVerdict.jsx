import { Component } from 'react';
import PropTypes from 'prop-types';

class BoilingVerdict extends Component {
  render() {
    const { celsius } = this.props;

    return (
      <h4>
        {celsius >= 100 ? 'The water would boild' : 'The water would not boild'}
      </h4>
    );
  }
}

BoilingVerdict.propTypes = {
  celsius: PropTypes.number
};

export default BoilingVerdict;
