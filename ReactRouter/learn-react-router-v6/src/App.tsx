import AddStaff from 'components/AddStaff';
import StaffItem from 'components/StaffItem';
import StaffList from 'components/StaffList';
import MainLayout from 'layouts/MainLayout';
import About from 'pages/About';
import Dashboard from 'pages/Dashboard';
import NotFound from 'pages/NotFound';
import Staff from 'pages/Staff';
import { Routes, Route, useRoutes } from 'react-router-dom';

function App() {
  // const elements = useRoutes([
  //   {
  //     path: '/',
  //     element: <Dashboard />
  //   },
  //   {
  //     path: '/about',
  //     element: <About />
  //   },
  //   {
  //     path: '/staff',
  //     element: <Staff />,
  //     children: [
  //       {
  //         path: ':idStaff',
  //         element: <StaffItem />
  //       },
  //       {
  //         path: 'add',
  //         element: <AddStaff />
  //       },
  //       {
  //         index: true,
  //         element: <StaffList />
  //       }
  //     ]
  //   },
  //   {
  //     path: '/*',
  //     element: <NotFound />
  //   }
  // ]);

  return (
    <div className='App'>
      <MainLayout>
        {/* Cách 1  */}
        {/* {elements} */}

        {/* Cách 2 */}
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/about' element={<About />} />
          <Route path='/staff/*' element={<Staff />}>
            <Route path=':idStaff' element={<StaffItem />} />
            <Route path='add' element={<AddStaff />} />
            <Route index element={<StaffList />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </MainLayout>
    </div>
  );
}

export default App;
