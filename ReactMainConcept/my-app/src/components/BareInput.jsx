import { Component } from 'react';
import PropTypes from 'prop-types';

class BareInput extends Component {
  constructor(props) {
    super(props);
    this.type = 'abc';
  }

  render() {
    const { type: typeInput, ...rest } = this.props;

    return <input {...rest} type={typeInput} />;
  }
}

BareInput.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onchange: PropTypes.func,
  className: PropTypes.string,
  autoFocus: PropTypes.bool
};

BareInput.defaultProps = {
  type: 'text'
};

export default BareInput;
