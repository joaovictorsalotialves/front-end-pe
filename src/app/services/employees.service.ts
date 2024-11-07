import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { IBaseResponse } from '../interfaces/base-response.interface';
import { IEmployeeRequest } from '../interfaces/employees/employee-request.interface';
import { IEmployeeResponse } from '../interfaces/employees/employees-response.interface';
import { ILoginResponse } from '../interfaces/employees/login-response.interface';
import { EmployeesList } from '../types/employees-list';
import { API_URL } from '../utils/api-url';
import { handleError } from '../utils/handleError';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  getEmployees(nameEmployee: string | undefined = undefined, position: string | undefined = undefined): Observable<EmployeesList | undefined> {
    let url = API_URL + 'employee';
    if (nameEmployee) {
      url += '?nameEmployee=' + nameEmployee;
      if (position) url += '&position=' + position;
    } else if (position) url += '?position=' + position;
    return this._httpClient.get<IEmployeeResponse>(url).pipe(
      map((employeesResponse) => employeesResponse.values)
    );
  }

  getEmployee(idEmployee: number): Observable<EmployeesList | undefined> {
    let url = API_URL + 'employee/' + idEmployee;
    return this._httpClient.get<IEmployeeResponse>(url).pipe(
      map((employeeResponse) => employeeResponse.values)
    );
  }

  postEmployee(objEmployee: IEmployeeRequest): Observable<IEmployeeResponse> {
    let url = API_URL + 'employee/';
    return this._httpClient.post<IEmployeeResponse>(url, objEmployee).pipe(
      map((employeeResponse) => employeeResponse)
    );
  }

  putEmployee(idEmployee: number, objEmployee: IEmployeeRequest): Observable<IEmployeeResponse> {
    let url = API_URL + 'employee/' + idEmployee;
    return this._httpClient.put<IEmployeeResponse>(url, objEmployee).pipe(
      map((employeeResponse) => employeeResponse)
    );
  }

  patchPasswordEmployee(
    idEmployee: number, oldPassword: string, newPassword: string, passwordCheck: string
  ): Observable<IEmployeeResponse> {
    let url = API_URL + 'employee/' + idEmployee;
    return this._httpClient.patch<IEmployeeResponse>(url, {
      oldPassword: oldPassword,
      newPassword: newPassword,
      passwordCheck: passwordCheck
    }).pipe(
      map((employeeResponse) => employeeResponse)
    );
  }

  deleteEmployee(idEmployee: number): Observable<IEmployeeResponse> {
    let url = API_URL + 'employee/' + idEmployee;
    return this._httpClient.delete<IEmployeeResponse>(url).pipe(
      map((employeeResponse) => employeeResponse)
    );
  }

  deleteEmployeeAddress(idEmployee: number): Observable<IEmployeeResponse> {
    let url = API_URL + 'employee/' + idEmployee + '/address';
    return this._httpClient.delete<IEmployeeResponse>(url).pipe(
      map((employeeResponse) => employeeResponse)
    );
  }

  loginEmployee(email: string, password: string): Observable<string | undefined> {
    let url = API_URL + 'employee/login';
    return this._httpClient.post<ILoginResponse>(url, {
      email: email,
      password: password,
    }).pipe(
      map((loginResponse) => loginResponse.token),
      catchError(handleError)
    );
  }

  forgotPasswordEmployee(email: string): Observable<string | undefined> {
    let url = API_URL + 'employee/forgot-password';
    return this._httpClient.post<ILoginResponse>(url, {
      email: email
    }).pipe(
      map((forgotPasswordResponse) => forgotPasswordResponse.token),
      catchError(handleError)
    );
  }

  resetPasswordEmployee(newPassword: string, passwordCheck: string, code: string, token: string): Observable<boolean> {
    let url = API_URL + 'employee/reset-password';
    return this._httpClient.post<ILoginResponse>(url, {
      newPassword: newPassword,
      passwordCheck: passwordCheck,
      code: code
    }, {
      headers: { authorization: `Bearer ${token}` }
    }).pipe(
      map((resetPasswordResponse) => resetPasswordResponse.sucess),
      catchError(handleError)
    );
  }

  logoutEmployee(idEmployee: number): Observable<boolean> {
    let url = API_URL + 'employee/logout/' + idEmployee;
    return this._httpClient.post<IBaseResponse>(url, {}).pipe(
      map((logoutResponse) => logoutResponse.sucess)
    );
  }
}
