import React, { Component } from 'react';

class SearchBar extends Component {
  handleChange = (event) => {
    this.props.handleChangeFilter(event);
  };

  render() {
    const { searchText, inStock } = this.props;

    return (
      <form>
        <input
          type='text'
          name='searchText'
          placeholder='Search...'
          className='search-text'
          value={searchText}
          onChange={this.handleChange}
        />
        <div>
          <input
            type='checkbox'
            name='inStock'
            checked={inStock}
            onChange={this.handleChange}
          />
          <label> Only show products in stock</label>
        </div>
      </form>
    );
  }
}

export default SearchBar;
