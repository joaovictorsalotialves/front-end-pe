import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IExpense } from '../interfaces/expenses-response/expense.interface';
import { IExpensesResponse } from '../interfaces/expenses-response/expenses-response.interface';
import { ExpensesList } from '../types/expenses-list';
import { API_URL } from '../utils/api-url';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  getExpenses(dueDate: Date | undefined = undefined, statusExpense: string | undefined = undefined): Observable<ExpensesList | undefined> {
    let url = API_URL + 'expense';
    if (dueDate) {
      url += '?dueDate=' + dueDate
      if (statusExpense) url += '&statusExpense=' + statusExpense;
    }
    if (statusExpense) url += '?statusExpense=' + statusExpense;
    return this._httpClient.get<IExpensesResponse>(url).pipe(
      map((expensesResponse) => expensesResponse.values)
    );
  }

  getExpense(idExpense: number): Observable<ExpensesList | undefined> {
    let url = API_URL + 'expense/' + idExpense;
    return this._httpClient.get<IExpensesResponse>(url).pipe(
      map((expensesResponse) => expensesResponse.values)
    );
  }

  postExpense(objExpense: IExpense): Observable<IExpensesResponse> {
    let url = API_URL + 'expense';
    return this._httpClient.post<IExpensesResponse>(url, objExpense).pipe(
      map((expenseResponse) => expenseResponse)
    );
  }

  putExpense(idExpense: number, objExpense: IExpense): Observable<IExpensesResponse> {
    let url = API_URL + 'expense/' + idExpense;
    return this._httpClient.put<IExpensesResponse>(url, objExpense).pipe(
      map((expenseResponse) => expenseResponse)
    );
  }

  deleteExpense(idExpense: number): Observable<IExpensesResponse> {
    let url = API_URL + 'expense/' + idExpense;
    return this._httpClient.delete<IExpensesResponse>(url).pipe(
      map((expenseResponse) => expenseResponse)
    );
  }
}
