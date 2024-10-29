import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ISupplementsResponse } from '../interfaces/supplements-response/supplements-response.interface';
import { SupplementsList } from '../types/supplements-list';
import { API_URL } from '../utils/api-url';

@Injectable({
  providedIn: 'root'
})
export class SupplementsService {
  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  getSupplements(nameSupplement: string | undefined = undefined): Observable<SupplementsList | undefined> {
    let url = API_URL + 'supplement';
    if (nameSupplement) url += '?nameSupplement=' + nameSupplement;
    return this._httpClient.get<ISupplementsResponse>(url).pipe(
      map((supplementsResponse) => supplementsResponse.values)
    );
  }

  getSupplement(idSupplement: number): Observable<SupplementsList | undefined> {
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
