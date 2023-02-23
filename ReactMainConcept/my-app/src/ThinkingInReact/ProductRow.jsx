import React, { Component } from 'react';

class ProductRow extends Component {
  render() {
    const { name, price, stocked } = this.props.product;

    return (
      <>
        <tr className={`${!stocked ? 'out-stock' : ''}`}>
          <td>{name}</td>
          <td>{price}</td>
        </tr>
      </>
    );
  }
}

export default ProductRow;
