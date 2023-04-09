import AddStaff from 'components/AddStaff';
import StaffItem from 'components/StaffItem';
import StaffList from 'components/StaffList';
import { useEffect } from 'react';
import { Link, NavLink, Outlet, Route, Routes, useLocation } from 'react-router-dom';

export default function Staff() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/staff') document.title = 'React App - Staff';

    return () => {
      document.title = 'React App';
    };
  }, [location]);

  return (
    <div>
      <h1 className='mb-6 text-lg'>Staff List</h1>
      <div className='border-b border-gray-200 text-center text-sm font-medium text-gray-500  '>
        <ul className='-mb-px flex flex-wrap'>
          <li className='mr-2'>
            <NavLink
              to='/staff'
              end
              className={({ isActive }) => {
                const activeClass = isActive
                  ? 'border-blue-600 p-4 text-blue-600'
                  : 'border-transparent p-4 hover:border-gray-300 hover:text-gray-600';
                return `inline-block rounded-t-lg border-b-2 ${activeClass} `;
              }}
            >
              List
            </NavLink>
          </li>
          <li className='mr-2'>
            <NavLink
              to='/staff/add'
              className={({ isActive }) => {
                const activeClass = isActive
                  ? 'border-blue-600 p-4 text-blue-600'
                  : 'border-transparent p-4 hover:border-gray-300 hover:text-gray-600';
                return `inline-block rounded-t-lg border-b-2 ${activeClass} `;
              }}
            >
              Add
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet context={{ profile: { name: 'Sang' } }} />
    </div>
  );
}
