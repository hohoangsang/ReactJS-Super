import logo from "./logo.svg";
import "./App.css";
import ProductList from "./ProductList/ProductList";
import Cart from "./Cart/Cart";
import About from "./About/About";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Cart />
      <ProductList />
      <About />
    </div>
  );
}

export default App;
