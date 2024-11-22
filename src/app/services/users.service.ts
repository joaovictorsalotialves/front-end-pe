import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { IAdoptionsResponse } from '../interfaces/adoptions/adoptions-response.interface';
import { IBaseResponse } from '../interfaces/base-response.interface';
import { IDonationsResponse } from '../interfaces/donations/donations-response.interface';
import { IUserRequest } from '../interfaces/users/user-request.interface';
import { IUser } from '../interfaces/users/user.interface';
import { IUsersResponse } from '../interfaces/users/users-reponse';
import { AdoptionsList } from '../types/adoptions-list';
import { DonationsList } from '../types/donations-list';
import { UsersList } from '../types/users-list';
import { API_URL } from '../utils/api-url';
import { handleError } from '../utils/handleError';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(
    private readonly _httpClient: HttpClient
  ) { }
  authToken: string = localStorage.getItem('authToken') as string;

  getUsers(nameUser: string | null | undefined = undefined): Observable<UsersList | undefined> {
    let url = API_URL + 'user';
    if (nameUser) url += '?nameUser=' + nameUser;
    return this._httpClient.get<IUsersResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((statesResponse) => statesResponse.values as UsersList),
      catchError(handleError)
    );
  }

  getUser(idUser: number): Observable<IUser | undefined> {
    let url = API_URL + 'user/' + idUser;
    return this._httpClient.get<IUsersResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((usersResponse) => usersResponse.values as IUser),
      catchError(handleError)
    );
  }

  getAdoptionUser(idUser: number, dateAdoption: string | undefined = undefined): Observable<AdoptionsList | undefined> {
    let url = API_URL + 'user/' + idUser + '/adoption';
    return this._httpClient.get<IAdoptionsResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((usersResponse) => usersResponse.values as AdoptionsList),
      catchError(handleError)
    );
  }

  getDonationUser(idUser: number, donationDate: string | undefined = undefined): Observable<DonationsList | undefined> {
    let url = API_URL + 'user/' + idUser + '/donation';
    return this._httpClient.get<IDonationsResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((usersResponse) => usersResponse.values as DonationsList),
      catchError(handleError)
    );
  }

  postUser(objUser: IUserRequest): Observable<IUsersResponse> {
    let url = API_URL + 'user/';
    return this._httpClient.post<IUsersResponse>(url, objUser, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((usersResponse) => usersResponse),
      catchError(handleError)
    );
  }

  putUser(idUser: number, objUser: IUserRequest): Observable<IBaseResponse> {
    let url = API_URL + 'user/' + idUser;
    return this._httpClient.put<IBaseResponse>(url, objUser, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((usersResponse) => usersResponse),
      catchError(handleError)
    );
  }

  deleteUser(idUser: number): Observable<IUsersResponse> {
    let url = API_URL + 'user/' + idUser;
    return this._httpClient.delete<IUsersResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((usersResponse) => usersResponse),
      catchError(handleError)
    );
  }

  deleteAddressUser(idUser: number): Observable<IUsersResponse> {
    let url = API_URL + 'user/' + idUser + '/address';
    return this._httpClient.delete<IUsersResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((usersResponse) => usersResponse),
      catchError(handleError)
    );
  }
}
