import logo from "./logo.svg";
import "./App.css";
import UserClass from "./components/useEffect/UserClass";
import { useState } from "react";
import ResizeComponent from "./components/useEffect/ResizeComponent";
import Timer from "./components/useEffect/Timer";
import PreviewAvatar from "./components/useEffect/PreviewAvatar";
import FakeChatApp from "./components/useEffect/FakeChatApp";
import UserClassContext from "./components/useContext/UserClassContext";
import AutoBatching from "./components/AutoBatching";

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
      {/* {visible && <FakeChatApp />} */}

      {/* <UserClassContext /> */}
      <AutoBatching />
    </div>
  );
}

export default App;
