import React, { Component, Fragment } from 'react';
import ProductCategoryRow from './ProductCategoryRow';
import ProductRow from './ProductRow';

class ProductList extends Component {
  render() {
    const { productList, searchText, inStock } = this.props;

    let category = null;

    //for each
    const rows = [];

    productList.forEach((product) => {
      if (!product.stocked && inStock) return;

      if (product.name.toLowerCase().indexOf(searchText) === -1) return;

      if (product.category !== category) {
        rows.push(
          <ProductCategoryRow
            key={product.category}
            category={product.category}
          />
        );
        category = product.category;
      }

      rows.push(<ProductRow key={product.name} product={product} />);
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export default ProductList;
