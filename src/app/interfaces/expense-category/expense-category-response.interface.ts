import { ExpenseCategoryList } from "../../types/expense-category-list";
import { IBaseResponse } from "../base-response.interface";
import { IExpenseCategory } from "./expense-category.interface";

export interface IExpenseCategoryResponse extends IBaseResponse {
  values?: ExpenseCategoryList | IExpenseCategory;
}
