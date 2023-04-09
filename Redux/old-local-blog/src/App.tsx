import Blog from 'pages/blog';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = 'Old blog';
  }, []);

  return (
    <div className='App'>
      <Blog />
    </div>
  );
}

export default App;
