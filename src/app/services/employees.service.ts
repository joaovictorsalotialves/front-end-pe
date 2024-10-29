import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IEmployeeResponse } from '../interfaces/employees-response/employees-response.interface';
import { ILoginResponse } from '../interfaces/employees-response/login-response.interface';
import { EmployeesList } from '../types/employees-list';
import { API_URL } from '../utils/api-url';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  getEmployees(): Observable<EmployeesList | undefined> {
    return this._httpClient.get<IEmployeeResponse>(API_URL + 'employee').pipe(
      map((employeesResponse) => employeesResponse.values)
    );
  }

  loginEmployee(): Observable<string | undefined> {
    return this._httpClient.post<ILoginResponse>(API_URL + 'employee/login', {
      email: "jsalotialves@gmail.com",
      password: "123",
    }).pipe(
      map((loginResponse) => loginResponse.token)
    );
  }
}
