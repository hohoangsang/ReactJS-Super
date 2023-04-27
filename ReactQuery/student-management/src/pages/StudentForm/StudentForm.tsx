import { useMutation, useQuery } from '@tanstack/react-query';
import { studentApi } from 'apis/students.api.';
import classNames from 'classnames';
import LoadingBtn from 'common/LoadingBtn';
import { useMemo, useState } from 'react';
import { useMatch, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Student } from 'types/student.type';
import { isAxiosError } from 'utils/utils';

type FormStateType = Omit<Student, 'id'> | Student;

type FormErrorType =
  | {
      [key in keyof FormStateType]: string;
    }
  | null;

const initialState: FormStateType = {
  avatar: '',
  btc_address: '',
  country: '',
  email: '',
  first_name: '',
  gender: '',
  last_name: ''
};

export default function AddStudent() {
  const isAddMatch = useMatch('/students/add');
  const [formState, setFormState] = useState<FormStateType>(initialState);
  const { id } = useParams();

  const {} = useQuery({
    queryKey: ['student', id],
    queryFn: () => {
      return studentApi.getOne(id as string);
    },
    enabled: id !== undefined,
    onSuccess: (data) => {
      setFormState(data.data);
    }
  });

  const addStudentMutation = useMutation({
    mutationFn: (body: FormStateType) => {
      return studentApi.addStudent(body);
    }
  });

  const updateStudentMutation = useMutation({
    mutationFn: (body: FormStateType) => {
      return studentApi.updateStudent(id as string, body as Student);
    },
    onSuccess: () => {
      toast.success('Update student successfully!');
    }
  });

  const formError: FormErrorType = useMemo(() => {
    const error = isAddMatch ? addStudentMutation.error : updateStudentMutation.error;

    if (isAxiosError<{ error: FormErrorType }>(error) && error.response?.status === 422) {
      return error.response.data.error;
    }

    return null;
  }, [isAddMatch, addStudentMutation.error, updateStudentMutation.error]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isAddMatch) {
      //async function
      addStudentMutation.mutate(formState, {
        onSuccess: (data) => {
          setFormState(initialState);
        },
        onError: (error) => {
          console.log(error);
        }
      });
    } else {
      updateStudentMutation.mutate(formState);
    }
  };

  const handleChangeValue = (key: keyof FormStateType) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, [key]: event.target.value }));

    if (formError) {
      isAddMatch && addStudentMutation.reset();
      !isAddMatch && updateStudentMutation.reset();
    }
  };

  return (
    <div>
      <h1 className='text-lg'>{isAddMatch ? 'Add' : 'Edit'} Student</h1>
      <form className='mt-6' onSubmit={handleSubmit}>
        <div className='group relative z-0 mb-6 w-full'>
          <input
            type='text'
            name='floating_email'
            id='floating_email'
            className={classNames(
              'peer block w-full appearance-none border-0 border-b-2  py-2 px-2 text-sm focus:outline-none focus:ring-0',
              {
                'border-gray-300 bg-transparent text-gray-900 focus:border-blue-600': !formError?.email,
                'border-red-500 bg-red-200 text-red-900 focus:border-red-500': formError?.email
              }
            )}
            placeholder=' '
            required
            value={formState.email}
            onChange={handleChangeValue('email')}
          />
          <label
            htmlFor='floating_email'
            className={classNames(
              'absolute top-2 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium ',
              {
                'text-gray-500 peer-focus:text-blue-600': !formError?.email,
                'text-red-500 peer-focus:text-red-500': formError?.email
              }
            )}
          >
            Email address
          </label>
          {formError?.email && (
            <p className='mt-2 text-sm text-red-600'>
              <span className='font-medium'>Lỗi!</span> {formError.email}
            </p>
          )}
        </div>

        <div className='group relative z-0 mb-6 w-full'>
          <div>
            <div>
              <div className='mb-4 flex items-center'>
                <input
                  id='gender-1'
                  type='radio'
                  name='gender'
                  value='Male'
                  checked={formState.gender === 'Male'}
                  className='h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600'
                  onChange={handleChangeValue('gender')}
                />
                <label htmlFor='gender-1' className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                  Male
                </label>
              </div>
              <div className='mb-4 flex items-center'>
                <input
                  id='gender-2'
                  type='radio'
                  name='gender'
                  className='h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600'
                  value='Female'
                  checked={formState.gender === 'Female'}
                  onChange={handleChangeValue('gender')}
                />
                <label htmlFor='gender-2' className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                  Female
                </label>
              </div>
              <div className='flex items-center'>
                <input
                  id='gender-3'
                  type='radio'
                  name='gender'
                  className='h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600'
                  value='Other'
                  checked={formState.gender === 'Other'}
                  onChange={handleChangeValue('gender')}
                />
                <label htmlFor='gender-3' className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                  Other
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className='group relative z-0 mb-6 w-full'>
          <input
            type='text'
            name='country'
            id='country'
            className='peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-2 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500'
            placeholder=' '
            required
            value={formState.country}
            onChange={handleChangeValue('country')}
          />
          <label
            htmlFor='country'
            className='absolute top-2 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500'
          >
            Country
          </label>
        </div>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <div className='group relative z-0 mb-6 w-full'>
            <input
              type='text'
              name='first_name'
              id='first_name'
              className='peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-2 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500'
              placeholder=' '
              required
              value={formState.first_name}
              onChange={handleChangeValue('first_name')}
            />
            <label
              htmlFor='first_name'
              className='absolute top-2 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500'
            >
              First Name
            </label>
          </div>
          <div className='group relative z-0 mb-6 w-full'>
            <input
              type='text'
              name='last_name'
              id='last_name'
              className='peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-2 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500'
              placeholder=' '
              required
              value={formState.last_name}
              onChange={handleChangeValue('last_name')}
            />
            <label
              htmlFor='last_name'
              className='absolute top-2 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500'
            >
              Last Name
            </label>
          </div>
        </div>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <div className='group relative z-0 mb-6 w-full'>
            <input
              type='text'
              name='avatar'
              id='avatar'
              className='peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-2 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500'
              placeholder=' '
              required
              value={formState.avatar}
              onChange={handleChangeValue('avatar')}
            />
            <label
              htmlFor='avatar'
              className='absolute top-2 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500'
            >
              Avatar Base64
            </label>
          </div>
          <div className='group relative z-0 mb-6 w-full'>
            <input
              type='text'
              name='btc_address'
              id='btc_address'
              className='peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-2 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500'
              placeholder=' '
              required
              value={formState.btc_address}
              onChange={handleChangeValue('btc_address')}
            />
            <label
              htmlFor='btc_address'
              className='absolute top-2 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500'
            >
              BTC Address
            </label>
          </div>
        </div>

        {addStudentMutation.isLoading && <LoadingBtn text='Submiting...' />}

        {!addStudentMutation.isLoading && (
          <button
            type='submit'
            className='w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto'
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
}
