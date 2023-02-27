import logo from "./logo.svg";
import "./App.css";
import UserClass from "./components/UserClass";
import { useState } from "react";

function App() {
  const [visible, setVisible] = useState(false);

  const handleToggle = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  return (
    <div className="App">
      <button onClick={handleToggle}>Toogle</button>
      {visible && <UserClass />}
    </div>
  );
}

export default App;
