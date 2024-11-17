import { UsersList } from "../../types/users-list";
import { IBaseResponse } from "../base-response.interface";
import { IUser } from "./user.interface";

export interface IUsersResponse extends IBaseResponse {
  values?: UsersList | IUser;
}
