import { Student, StudentList } from 'types/student.type';
import http from './api';

export const studentApi = {
  getAll: (page: string | number, limit: string | number) => {
    return http.get<StudentList>('students', {
      params: {
        _page: page,
        _limit: limit
      }
    });
  },

  addStudent: (body: Omit<Student, "id">) => {
    return http.post<Student>("students", body)
  }
};
