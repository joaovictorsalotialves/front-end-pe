import { ExpensesList } from "../../types/expenses-list";
import { IBaseResponse } from "../base-response.interface";
import { IExpense } from "./expense.interface";

export interface IExpensesResponse extends IBaseResponse {
  values?: ExpensesList | IExpense;
}
