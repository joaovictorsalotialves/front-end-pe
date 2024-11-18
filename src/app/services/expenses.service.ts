import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { IExpense } from '../interfaces/expenses/expense.interface';
import { IExpenseRequest } from '../interfaces/expenses/expense.interface-request';
import { IExpensesResponse } from '../interfaces/expenses/expenses-response.interface';
import { ExpensesList } from '../types/expenses-list';
import { API_URL } from '../utils/api-url';
import { handleError } from '../utils/handleError';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  constructor(
    private readonly _httpClient: HttpClient
  ) { }
  authToken: string = localStorage.getItem('authToken') as string;

  getExpenses(dueDate: string | undefined = undefined, statusExpense: string | undefined = undefined): Observable<ExpensesList | undefined> {
    let url = API_URL + 'expense';
    if (dueDate) {
      url += '?dueDate=' + dueDate
      if (statusExpense) url += '&statusExpense=' + statusExpense;
    } else if (statusExpense) url += '?statusExpense=' + statusExpense;
    return this._httpClient.get<IExpensesResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((expensesResponse) => expensesResponse.values as ExpensesList),
      catchError(handleError)
    );
  }

  getExpense(idExpense: number): Observable<IExpense | undefined> {
    let url = API_URL + 'expense/' + idExpense;
    return this._httpClient.get<IExpensesResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((expensesResponse) => expensesResponse.values as IExpense),
      catchError(handleError)
    );
  }

  postExpense(objExpense: IExpenseRequest): Observable<IExpensesResponse> {
    let url = API_URL + 'expense';
    return this._httpClient.post<IExpensesResponse>(url, objExpense, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((expensesResponse) => expensesResponse),
      catchError(handleError)
    );
  }

  putExpense(idExpense: number, objExpense: IExpenseRequest): Observable<IExpensesResponse> {
    let url = API_URL + 'expense/' + idExpense;
    return this._httpClient.put<IExpensesResponse>(url, objExpense, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((expensesResponse) => expensesResponse),
      catchError(handleError)
    );
  }

  patchExpense(idExpense: number, paymentDate: string): Observable<IExpensesResponse> {
    let url = API_URL + 'expense/' + idExpense;
    return this._httpClient.patch<IExpensesResponse>(url, {
      paymentDate: paymentDate
    }, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((expensesResponse) => expensesResponse),
      catchError(handleError)
    );
  }

  deleteExpense(idExpense: number): Observable<IExpensesResponse> {
    let url = API_URL + 'expense/' + idExpense;
    return this._httpClient.delete<IExpensesResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((expensesResponse) => expensesResponse),
      catchError(handleError)
    );
  }
}
