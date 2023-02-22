import { useState } from 'react';
import './App.css';
import Clock from './components/Clock';
import BareInput from './components/BareInput';
import Layout from './components/Layout';
import BareButton from './components/BareButton';
import CorrectlyState from './components/CorrectlyState';
import ProductList from './Product/ProductList';
import Form from './Form/Form';
import UncontrollComponent from './Form/UncontrollComponent';
import Temperature from './Temparature/Temperature';
import FilterableProductList from './ThinkingInReact/FilterableProductList';

function App() {
  // const [visible, setVisible] = useState(true);

  return (
    <div className='App'>
      <Layout>
        {/* <h1>Layout</h1>
        <BareInput
          value={'100'}
          onChange={() => {}}
          autoFocus
          className='input'
        />
        <br />
        <BareButton /> */}
        {/* <CorrectlyState /> */}
        {/* <ProductList /> */}
        {/* <Form /> */}
        {/* <UncontrollComponent /> */}
        {/* <Temperature /> */}
        <FilterableProductList />
      </Layout>
      {/* <button onClick={() => setVisible(false)}>Hide Clocks</button>
      {visible && <Clock />} */}
    </div>
  );
}

export default App;
