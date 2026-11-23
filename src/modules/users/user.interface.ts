export interface IUser {
    name: string;
    email: string;
    password: string;
    age?: number | null;
    is_Active?: boolean;
}

// export interface UpdateUser {
//   name?: string;
//   password?: string;
//   age?: number;
//   is_Active?: boolean;
// }