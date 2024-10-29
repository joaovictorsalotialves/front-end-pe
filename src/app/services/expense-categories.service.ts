import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IExpenseCategoryResponse } from '../interfaces/expense-category-response/expense-category-response.interface';
import { IExpenseCategory } from '../interfaces/expense-category-response/expense-category.interface';
import { ExpenseCategoryList } from '../types/expense-category-list';
import { API_URL } from '../utils/api-url';

@Injectable({
  providedIn: 'root'
})
export class ExpenseCategoriesService {
  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  getExpenseCategories(nameExpenseCategory: string | undefined = undefined): Observable<ExpenseCategoryList | undefined> {
    let url = API_URL + 'expense-category';
    if (nameExpenseCategory) url += '?nameExpenseCategory=' + nameExpenseCategory;
    return this._httpClient.get<IExpenseCategoryResponse>(url).pipe(
      map((expenseCategoriesResponse) => expenseCategoriesResponse.values)
    );
  }

  getExpenseCategory(idExpenseCategory: number): Observable<ExpenseCategoryList | undefined> {
    let url = API_URL + 'expense-category/' + idExpenseCategory;
    return this._httpClient.get<IExpenseCategoryResponse>(url).pipe(
      map((expenseCategoriesResponse) => expenseCategoriesResponse.values)
    );
  }

  postExpenseCategory(objExpenseCategory: IExpenseCategory): Observable<IExpenseCategoryResponse> {
    let url = API_URL + 'expense-category/';
    return this._httpClient.post<IExpenseCategoryResponse>(url, objExpenseCategory).pipe(
      map((expenseCategoriesResponse) => expenseCategoriesResponse)
    );
  }

  putExpenseCategory(idExpenseCategory: number, objExpenseCategory: IExpenseCategory): Observable<IExpenseCategoryResponse> {
    let url = API_URL + 'expense-category/' + idExpenseCategory;
    return this._httpClient.put<IExpenseCategoryResponse>(url, objExpenseCategory).pipe(
      map((expenseCategoriesResponse) => expenseCategoriesResponse)
    );
  }

  deleteExpenseCategory(idExpenseCategory: number): Observable<IExpenseCategoryResponse> {
    let url = API_URL + 'expense-category/' + idExpenseCategory;
    return this._httpClient.delete<IExpenseCategoryResponse>(url).pipe(
      map((expenseCategoriesResponse) => expenseCategoriesResponse)
    );
  }
}
