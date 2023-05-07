import { Student, StudentList } from 'types/student.type';
import api from './api';

export const studentApi = {
  getAll: (page: number, limit: number, signal?: AbortSignal) => {
    return api.get<StudentList>('students', {
      params: {
        _page: page,
        _limit: limit
      },
      signal
    });
  },

  getOne: (id: string | number) => {
    return api.get<Student>(`students/${id}`);
  },

  update: (id: string, body: Student) => {
    return api.put<Student>(`students/${id}`, body);
  },

  add: (body: Omit<Student, 'id'>) => {
    return api.post<Student>('students', body);
  },

  delete: (id: number) => {
    return api.delete<{}>(`students/${id}`);
  }
};
