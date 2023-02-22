import React, { Component } from 'react';
import SearchBar from './SearchBar';
import './FilterableProductList.css';
import ProductList from './ProductList';

const ProductListMock = [
  {
    category: 'Sporting Goods',
    price: '$49.99',
    stocked: true,
    name: 'Football'
  },
  {
    category: 'Sporting Goods',
    price: '$9.99',
    stocked: true,
    name: 'Baseball'
  },
  {
    category: 'Sporting Goods',
    price: '$29.99',
    stocked: false,
    name: 'Basketball'
  },
  {
    category: 'Electronics',
    price: '$99.99',
    stocked: true,
    name: 'iPod Touch'
  },
  {
    category: 'Electronics',
    price: '$399.99',
    stocked: false,
    name: 'iPhone 5'
  },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
];

const fetchProductList = new Promise((resolve) => {
  return setTimeout(() => {
    resolve(ProductListMock);
  }, 500);
});

class FilterableProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productList: [],
      searchText: '',
      inStock: false
    };
  }

  componentDidMount() {
    fetchProductList.then((res) => {
      this.setState({ productList: res });
    });
  }

  handleFilterProduct = (event) => {
    const fieldName = event.target.name;

    if (fieldName === 'searchText') {
      this.setState({
        searchText: event.target.value
      });
    } else if (fieldName === 'inStock') {
      this.setState({
        inStock: event.target.checked
      });
    }
  };

  render() {
    const { productList, searchText, inStock } = this.state;

    return (
      <div className='FilterableProductList'>
        <div className='container'>
          <SearchBar
            searchText={searchText}
            inStock={inStock}
            handleChangeFilter={this.handleFilterProduct}
          />
          <ProductList
            searchText={searchText}
            inStock={inStock}
            productList={productList}
          />
        </div>
      </div>
    );
  }
}

export default FilterableProductList;
