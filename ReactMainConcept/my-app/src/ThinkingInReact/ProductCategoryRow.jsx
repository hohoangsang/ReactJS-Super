import React, { Component } from 'react';

class ProductCategoryRow extends Component {
  render() {
    const { category } = this.props;

    return (
      <>
        <tr aria-colspan={2} className='category-row'>
          <td>{category}</td>
        </tr>
      </>
    );
  }
}

export default ProductCategoryRow;
