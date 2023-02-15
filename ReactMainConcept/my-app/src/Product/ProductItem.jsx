import React, { Component } from 'react';

class ProductItem extends Component {
  render() {
    const { product } = this.props;

    return (
      <div className='product-item'>
        <input type='text' />
        <label>
          {product.name} - {product.avatar}
        </label>
      </div>
    );
  }
}

export default ProductItem;
