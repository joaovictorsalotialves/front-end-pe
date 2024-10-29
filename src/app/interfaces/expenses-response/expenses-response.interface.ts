import { ExpensesList } from "../../types/expenses-list";
import { IBaseResponse } from "../base-response.interface";

export interface IExpensesResponse extends IBaseResponse {
  values?: ExpensesList,
}
