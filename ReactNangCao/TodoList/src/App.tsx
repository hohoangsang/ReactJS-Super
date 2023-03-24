import Count from './components/Count';
import Counter from './components/Counter';
import Slider from './components/Slider';
import TodoList from './TodoListApp/TodoList';
import Watch from './components/Watch';
import Form from './components/Form';
import AutoInput from './components/AutoInput';
import Student from './components/Student';
import MouseTracker from './components/MouseTracker';
import Ads from './components/MouseTracker/Ads';

function App() {
  return (
    <div>
      {/* <TodoList /> */}
      {/* <Watch /> */}
      {/* <Slider /> */}
      {/* <Count /> */}
      {/* <Counter /> */}
      {/* <Form /> */}
      {/* <AutoInput /> */}
      {/* <Student /> */}
      <MouseTracker children={(value) => <Ads {...value} />} />
    </div>
  );
}

export default App;
