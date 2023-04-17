import Blog from 'pages/Blog';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = 'Remote-blog';
  }, []);

  return (
    <div className='App'>
      <Blog />
    </div>
  );
}

export default App;
