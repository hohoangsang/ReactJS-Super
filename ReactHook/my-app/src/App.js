import logo from "./logo.svg";
import "./App.css";
import UserClass from "./components/UserClass";
import { useState } from "react";
import ResizeComponent from "./components/ResizeComponent";
import Timer from "./components/Timer";
import PreviewAvatar from "./components/PreviewAvatar";
import FakeChatApp from "./components/FakeChatApp";

function App() {
  const [visible, setVisible] = useState(false);

  const handleToggle = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  return (
    <div className="App">
      <button onClick={handleToggle}>Toogle</button>
      {/* {visible && <UserClass />} */}
      {/* {visible && <ResizeComponent />} */}
      {/* {visible && <Timer />} */}
      {/* {visible && <PreviewAvatar />} */}
      {visible && <FakeChatApp />}
    </div>
  );
}

export default App;
