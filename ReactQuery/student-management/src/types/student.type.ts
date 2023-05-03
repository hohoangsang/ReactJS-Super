export interface Student {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  country: string;
  avatar: string;
  btc_address: string;
}

export type StudentItem = Pick<Student, 'id' | 'avatar' | 'last_name' | 'email'>;
export type StudentList = StudentItem[];
