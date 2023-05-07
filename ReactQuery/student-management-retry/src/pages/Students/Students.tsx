import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { studentApi } from 'api/students.api';
import classNames from 'classnames';
import Skeleton from 'components/Skeleton';
import { useQueryString } from 'hooks/useQueryString';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isAxiosError } from 'utils';

const LIMIT = 10;

export default function Students() {
  const { page } = useQueryString();

  const currentPage = Number(page) || 1;

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['studentList', currentPage],
    queryFn: ({ signal }) => {
      const controller = new AbortController();

      setTimeout(() => {
        controller.abort();
      }, 3000);

      return studentApi.getAll(currentPage, LIMIT, controller.signal);
    },
    keepPreviousData: true,
    retry: 0
  });

  const deleteStudentMutation = useMutation({
    mutationFn: (id: number) => {
      return studentApi.delete(id);
    }
  });

  const handleDeleteStudent = (id: number) => {
    deleteStudentMutation.mutate(id, {
      onSuccess: () => {
        toast.success(`Delete student with id ${id} successfully!`);
        queryClient.invalidateQueries({ queryKey: ['studentList', currentPage] });
      },
      onError: (error) => {
        if (isAxiosError<{ error: string }>(error)) {
          toast.success(error.response?.data.error);
        }
      }
    });
  };

  const handlePrefetchStudent = (id: number) => {
    queryClient.prefetchQuery({
      queryKey: ['student', String(id)],
      queryFn: () => {
        return studentApi.getOne(id);
      },
      staleTime: 10 * 1000
    });
  };

  const handleCancelRequest = () => {
    queryClient.cancelQueries({ queryKey: ['studentList', currentPage] });
  };

  const totalStudent = data?.headers['x-total-count'] || 0;

  const totalPage = Math.ceil(totalStudent / LIMIT);

  return (
    <div>
      <h1 className='text-lg'>Students</h1>

      <div className='mt-5'>
        <Link to={'/students/add'}>
          <button
            type='button'
            className='mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Add student
          </button>
        </Link>
      </div>

      <div className='mt-3'>
        <button onClick={handleCancelRequest} className='rounded-lg bg-red-500 px-5 py-2 text-white'>
          Cancel request
        </button>
      </div>

      {isLoading && <Skeleton />}
      {!isLoading && (
        <Fragment>
          <div className='relative mt-6 overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='w-full text-left text-sm text-gray-500'>
              <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700'>
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
                    <tr
                      onMouseEnter={() => handlePrefetchStudent(student.id)}
                      key={student.id}
                      className='border-b bg-white hover:bg-gray-50 dark:hover:bg-gray-600'
                    >
                      <td className='py-4 px-6'>{currentPage * LIMIT - LIMIT + index + 1}</td>
                      <td className='py-4 px-6'>
                        <img src={student.avatar} alt={student.last_name} className='h-5 w-5' />
                      </td>
                      <th scope='row' className='whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white'>
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
                        {deleteStudentMutation.isLoading && (
                          <span className='cursor-not-allowed font-medium text-red-600 dark:text-red-500'>Delete</span>
                        )}
                        {!deleteStudentMutation.isLoading && (
                          <button
                            className='font-medium text-red-600 dark:text-red-500'
                            onClick={() => handleDeleteStudent(student.id)}
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className='mt-6 flex justify-center'>
            <nav aria-label='Page navigation example'>
              <ul className='inline-flex -space-x-px'>
                <li>
                  {currentPage === 1 ? (
                    <span className='cursor-not-allowed rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-200 hover:text-gray-700'>
                      Previous
                    </span>
                  ) : (
                    <Link
                      to={`/students?page=${currentPage - 1}`}
                      className='rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-200 hover:text-gray-700'
                    >
                      Previous
                    </Link>
                  )}
                </li>
                <li>
                  {Array(totalPage)
                    .fill(0)
                    .map((_, index) => {
                      const page = index + 1;
                      return (
                        <Link
                          className={classNames(
                            'border border-gray-300  py-2 px-3 leading-tight text-gray-500 hover:bg-gray-200 hover:text-gray-700',
                            {
                              'bg-gray-200 text-gray-700': currentPage === page,
                              'bg-white': currentPage !== page
                            }
                          )}
                          to={`/students?page=${page}`}
                          key={page}
                        >
                          {page}
                        </Link>
                      );
                    })}
                </li>
                <li>
                  {currentPage === totalPage ? (
                    <span className='cursor-not-allowed rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-200 hover:text-gray-700'>
                      Next
                    </span>
                  ) : (
                    <Link
                      className='rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-200 hover:text-gray-700'
                      to={`/students?page=${currentPage + 1}`}
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
