import { UsersList } from "../../types/users-list";
import { IBaseResponse } from "../base-response.interface";

export interface IUsersResponse extends IBaseResponse {
  values?: UsersList
}
