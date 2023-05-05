import { Student, StudentList } from 'types/student.type';
import http from './api';
import { sign } from 'crypto';

export const studentApi = {
  getAll: (page: string | number, limit: string | number, signal?: AbortSignal) => {
    return http.get<StudentList>('students', {
      params: {
        _page: page,
        _limit: limit
      },
      signal
    });
  },

  addStudent: (body: Omit<Student, 'id'>) => {
    return http.post<Student>('students', body);
  },

  getOne: (id: string | number) => {
    return http.get<Student>(`students/${id}`);
  },

  updateStudent: (id: string | number, body: Student) => {
    return http.put<Student>(`students/${id}`, body);
  },

  deleteStudent: (id: number) => {
    return http.delete<{}>(`students/${id}`);
  }
};
