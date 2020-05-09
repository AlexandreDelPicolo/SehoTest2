export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export class User implements User {

}

export interface Query {
  getUsers: [User];
  getUser(id: number): User;
}
