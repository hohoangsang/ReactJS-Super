import React, { Component } from 'react';
import ProductItem from './ProductItem';

const mockData = [
  {
    id: Math.random() * 10000,
    name: 'Honda',
    avatar: '❤'
  },
  {
    id: Math.random() * 10000,
    name: 'Yamaha',
    avatar: '✌'
  },
  {
    id: Math.random() * 10000,
    name: 'Kawasaki',
    avatar: '👍'
  }
];

class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: mockData
    };
  }

  sortProduct = () => {
    this.setState({
      list: this.state.list.sort((a, b) => {
        if (a.name > b.name) return -1;
        if (a.name < b.name) return 1;
        return 0;
      })
    });
  };

  addProduct = () => {
    this.setState({
      list: [
        {
          id: Math.random() * 10000,
          name: 'Ducati',
          avatar: '✔'
        },
        ...this.state.list
      ]
    });
  };

  render() {
    console.log('render');
    const listProduct = this.state.list;

    const list = listProduct.map((product, index) => (
      <ProductItem product={product} key={product.id} />
    ));

    return (
      <div>
        <h2>Product List</h2>

        <button onClick={this.sortProduct}>Sort product</button>
        <button onClick={this.addProduct}>Add product</button>

        <div className='product-list'>{list}</div>
      </div>
    );
  }
}

export default ProductList;
