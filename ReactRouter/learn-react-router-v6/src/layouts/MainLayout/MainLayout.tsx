import React from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
interface Props {
  children?: React.ReactNode;
}
export default function MainLayout({ children }: Props) {
  return (
    <div className='grid min-h-screen grid-cols-4'>
      <aside className='col-span-1' aria-label='Sidebar'>
        <div className='h-full overflow-y-auto bg-gray-100 py-4 px-3 shadow-lg'>
          <ul className='space-y-2'>
            <li>
              <NavLink
                to='/'
                end
                replace
                className={({ isActive }) => {
                  const activeClass = isActive ? ' bg-gray-300 ' : '';
                  return (
                    'flex items-center rounded-lg p-2 text-base font-normal hover:bg-gray-300 text-gray-900' +
                    activeClass
                  );
                }}
              >
                {({ isActive }) => (
                  <span className='ml-3' style={{ fontWeight: isActive ? 700 : 400 }}>
                    Dashboard
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/staff'
                className={({ isActive }) => {
                  const activeClass = isActive ? ' bg-gray-300 ' : '';
                  return (
                    'flex items-center rounded-lg p-2 text-base font-normal hover:bg-gray-300 text-gray-900' +
                    activeClass
                  );
                }}
              >
                {({ isActive }) => (
                  <span className='ml-3' style={{ fontWeight: isActive ? 700 : 400 }}>
                    Staff
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/about'
                className={({ isActive }) => {
                  const activeClass = isActive ? ' bg-gray-300 ' : '';
                  return (
                    'flex items-center rounded-lg p-2 text-base font-normal hover:bg-gray-300 text-gray-900' +
                    activeClass
                  );
                }}
              >
                {({ isActive }) => (
                  <span className='ml-3' style={{ fontWeight: isActive ? 700 : 400 }}>
                    About
                  </span>
                )}
              </NavLink>
              <Routes>
                <Route path='/about' element={<ExtraComponent />} />
              </Routes>
            </li>
          </ul>
        </div>
      </aside>
      <main className='col-span-3 h-full py-4 px-3'>{children}</main>
    </div>
  );
}

function ExtraComponent() {
  const location = useLocation();
  console.log(location);

  return <div className='text-red-700'>this is /about location</div>;
}
