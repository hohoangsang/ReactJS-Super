import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { studentApi } from 'apis/students.api';
import classNames from 'classnames';
import Skeleton from 'common/Skeleton';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQueryString } from 'utils/utils';

const LIMIT = 10;

export default function Students() {
  const queryString = useQueryString();
  const page = Number(queryString?.page) || 1;
  const queryClient = useQueryClient();

  const deleteStudentMutation = useMutation({
    mutationFn: (id: number) => {
      return studentApi.deleteStudent(id);
    }
  });

  const { data, isLoading } = useQuery({
    queryKey: ['students', page],
    queryFn: () => {
      const controller = new AbortController();

      setTimeout(() => {
        controller.abort();
      }, 3000);

      return studentApi.getAll(page, LIMIT, controller.signal);
    },
    keepPreviousData: true,
    retry: 0
  });

  const totalRecord = Number(data?.headers['x-total-count']) || 0;

  const totalPage = Math.ceil(totalRecord / LIMIT);

  const handleDelete = (id: number) => {
    deleteStudentMutation.mutate(id, {
      onSuccess: (_, id) => {
        toast.success(`Deleted student with id: ${id}`);
        queryClient.invalidateQueries({ queryKey: ['students', page], exact: true });
      }
    });
  };

  const prefetchStudent = (id: number) => {
    queryClient.prefetchQuery({
      queryKey: ['student', String(id)],
      queryFn: () => {
        return studentApi.getOne(id);
      },
      staleTime: 10 * 1000 //10 second
    });
  };

  const handleFetchStudent = (delay: number) => {
    queryClient.prefetchQuery({
      queryKey: ['students', page],
      queryFn: () => {
        return studentApi.getAll(page, LIMIT);
      },
      staleTime: delay * 1000
    });
  };

  const cancelRequest = () => {
    queryClient.cancelQueries({
      queryKey: ['students', page]
    });
  };

  return (
    <div>
      <h1 className='text-lg'>Students</h1>

      <div>
        <button className='mt-6 rounded-lg bg-blue-300 py-2.5 px-5' onClick={() => handleFetchStudent(10)}>
          Click 10s
        </button>
      </div>

      <div>
        <button className='mt-6 rounded-lg bg-blue-300 py-2.5 px-5' onClick={() => handleFetchStudent(2)}>
          Click 2s
        </button>
      </div>

      <div>
        <button className='mt-6 rounded-lg bg-red-600 py-2.5 px-5 text-white' onClick={cancelRequest}>
          Cancel request
        </button>
      </div>

      <div className='mt-5'>
        <Link
          type='button'
          className='rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'
          to={'/students/add'}
        >
          Add student
        </Link>
      </div>

      {isLoading && <Skeleton />}
      {!isLoading && (
        <Fragment>
          <div className='relative mt-6 overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
              <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='py-3 px-6'>
                    #
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Avatar
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Name
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Email
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    <span className='sr-only'>Action</span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {data?.data &&
                  data.data.map((student, index) => (
                    <Fragment key={student.id}>
                      <tr
                        className='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'
                        onMouseEnter={() => prefetchStudent(student.id)}
                      >
                        <td className='py-4 px-6'>{page * LIMIT - LIMIT + index + 1}</td>
                        <td className='py-4 px-6'>
                          <img src={student.avatar} alt='student' className='h-5 w-5' />
                        </td>
                        <th
                          scope='row'
                          className='whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white'
                        >
                          {student.last_name}
                        </th>
                        <td className='py-4 px-6'>{student.email}</td>
                        <td className='py-4 px-6 text-right'>
                          <Link
                            to={`/students/${student.id}`}
                            className='mr-5 font-medium text-blue-600 hover:underline dark:text-blue-500'
                          >
                            Edit
                          </Link>
                          <button
                            className='font-medium text-red-600 dark:text-red-500'
                            onClick={() => handleDelete(student.id)}
                            type='button'
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </Fragment>
                  ))}
              </tbody>
            </table>
          </div>

          <div className='mt-6 flex justify-center'>
            <nav aria-label='Page navigation example'>
              <ul className='inline-flex -space-x-px'>
                <li>
                  {page === 1 ? (
                    <span className='cursor-not-allowed rounded-l-lg border border-gray-400 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-300 hover:text-gray-700'>
                      Previous
                    </span>
                  ) : (
                    <Link
                      to={`/students?page=${page - 1}`}
                      className='rounded-l-lg border border-gray-400 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-300 hover:text-gray-700'
                    >
                      Previous
                    </Link>
                  )}
                </li>
                <li>
                  {Array(totalPage)
                    .fill(0)
                    .map((_, index) => {
                      const pageNumber = index + 1;
                      const isActive = pageNumber === page;
                      return (
                        <Link
                          className={classNames(
                            'border border-gray-400 py-2 px-3 leading-tight  hover:bg-gray-300  hover:text-gray-700',
                            {
                              'bg-gray-300 text-gray-700': isActive,
                              'bg-white text-gray-500': !isActive
                            }
                          )}
                          to={`/students?page=${pageNumber}`}
                          key={index}
                        >
                          {pageNumber}
                        </Link>
                      );
                    })}
                </li>
                <li>
                  {page === totalPage ? (
                    <span className='cursor-not-allowed rounded-r-lg border border-gray-400 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-300 hover:text-gray-700'>
                      Next
                    </span>
                  ) : (
                    <Link
                      className='rounded-r-lg border border-gray-400 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-300 hover:text-gray-700'
                      to={`/students?page=${page + 1}`}
                    >
                      Next
                    </Link>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </Fragment>
      )}
    </div>
  );
}
