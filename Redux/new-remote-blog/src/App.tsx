import Blog from 'pages/blog';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = 'New-remote-blog';
  }, []);

  return <Blog />;
}

export default App;
