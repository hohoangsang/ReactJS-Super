import { useState } from 'react';
import './App.css';
import Clock from './components/Clock';
import BareInput from './components/BareInput';
import Layout from './components/Layout';

function App() {
  // const [visible, setVisible] = useState(true);

  return (
    <div className='App'>
      <Layout>
        <h1>Layout</h1>
        <BareInput
          value={'100'}
          onChange={() => {}}
          autoFocus
          className='input'
        />
      </Layout>
      {/* <button onClick={() => setVisible(false)}>Hide Clocks</button>
      {visible && <Clock />} */}
    </div>
  );
}

export default App;
