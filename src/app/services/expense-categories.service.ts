import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { IExpenseCategoryRequest } from '../interfaces/expense-category/expense-category-request.interface';
import { IExpenseCategoryResponse } from '../interfaces/expense-category/expense-category-response.interface';
import { ExpenseCategoryList } from '../types/expense-category-list';
import { API_URL } from '../utils/api-url';
import { handleError } from '../utils/handleError';

@Injectable({
  providedIn: 'root'
})
export class ExpenseCategoriesService {
  constructor(
    private readonly _httpClient: HttpClient
  ) { }
  authToken: string = localStorage.getItem('authToken') as string;

  getExpenseCategories(nameExpenseCategory: string | undefined = undefined): Observable<ExpenseCategoryList | undefined> {
    let url = API_URL + 'expense-category';
    if (nameExpenseCategory) url += '?nameExpenseCategory=' + nameExpenseCategory;
    return this._httpClient.get<IExpenseCategoryResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((expenseCategoriesResponse) => expenseCategoriesResponse.values),
      catchError(handleError)
    );
  }

  getExpenseCategory(idExpenseCategory: number): Observable<ExpenseCategoryList | undefined> {
    let url = API_URL + 'expense-category/' + idExpenseCategory;
    return this._httpClient.get<IExpenseCategoryResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((expenseCategoriesResponse) => expenseCategoriesResponse.values),
      catchError(handleError)
    );
  }

  postExpenseCategory(objExpenseCategory: IExpenseCategoryRequest): Observable<IExpenseCategoryResponse> {
    let url = API_URL + 'expense-category/';
    return this._httpClient.post<IExpenseCategoryResponse>(url, objExpenseCategory, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((expenseCategoriesResponse) => expenseCategoriesResponse),
      catchError(handleError)
    );
  }

  putExpenseCategory(idExpenseCategory: number, objExpenseCategory: IExpenseCategoryRequest): Observable<IExpenseCategoryResponse> {
    let url = API_URL + 'expense-category/' + idExpenseCategory;
    return this._httpClient.put<IExpenseCategoryResponse>(url, objExpenseCategory, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((expenseCategoriesResponse) => expenseCategoriesResponse),
      catchError(handleError)
    );
  }

  deleteExpenseCategory(idExpenseCategory: number): Observable<IExpenseCategoryResponse> {
    let url = API_URL + 'expense-category/' + idExpenseCategory;
    return this._httpClient.delete<IExpenseCategoryResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((expenseCategoriesResponse) => expenseCategoriesResponse),
      catchError(handleError)
    );
  }
}
