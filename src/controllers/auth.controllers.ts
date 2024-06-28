import { Effect } from "effect";

interface IUser  {
      id : string;
      name : string;
      email : string;
      role: "user" | "admin" | "manager";
      createdAt: Date;
      updatedAt: Date;
      password?: string; 

}

interface Response   {
      success: boolean;
      message: string;
      statusCode : 200 | 201 | 400 | 401 | 403 | 404 | 500;

}
interface ICreateUserResponse extends Response {
      data: IUser;
}


export async function createUser() {
}