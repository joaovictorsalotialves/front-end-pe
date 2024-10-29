import { ExpenseCategoryList } from "../../types/expense-category-list";
import { IBaseResponse } from "../base-response.interface";

export interface IExpenseCategoryResponse extends IBaseResponse {
  values?: ExpenseCategoryList;
}
