import MainLayout from 'layouts/MainLayout';
import About from 'pages/About';
import StudentForm from 'pages/StudentForm';
import Dashboard from 'pages/Dashboard';
import NotFound from 'pages/NotFound';
import Students from 'pages/Students';
import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const elements = useRoutes([
    {
      path: '/',
      element: <Dashboard />
    },
    {
      path: '/students',
      element: <Students />
    },
    {
      path: '/students/:id',
      element: <StudentForm />
    },
    {
      path: '/students/add',
      element: <StudentForm />
    },
    {
      path: '/about',
      element: <About />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ]);

  return (
    <div className='App'>
      <ToastContainer />
      <MainLayout>{elements}</MainLayout>
    </div>
  );
}

export default App;
