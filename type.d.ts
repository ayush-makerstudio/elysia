export interface IUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "manager";
  createdAt: Date;
  updatedAt: Date;
  password?: string;
}

export interface Response {
  success: "true" | "false";
  message: string;
  statusCode: 200 | 201 | 400 | 401 | 403 | 404 | 500;
}
export interface ICreateUserResponse extends Response {
  data: IUser;
}
