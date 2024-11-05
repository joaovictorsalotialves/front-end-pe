import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IAdoptionsResponse } from '../interfaces/adoptions-response/adoptions-response.interface';
import { IDonationsResponse } from '../interfaces/donations-response/donations-response.interface';
import { IUser } from '../interfaces/users-response/user.interface';
import { IUsersResponse } from '../interfaces/users-response/users-reponse';
import { AdoptionsList } from '../types/adoptions-list';
import { DonationsList } from '../types/donations-list';
import { UsersList } from '../types/users-list';
import { API_URL } from '../utils/api-url';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  getUsers(nameUser: string | undefined = undefined): Observable<UsersList | undefined> {
    let url = API_URL + 'user';
    if (nameUser) url += '?nameUser=' + nameUser;
    return this._httpClient.get<IUsersResponse>(url).pipe(
      map((statesResponse) => statesResponse.values)
    );
  }

  getUser(idUser: number): Observable<UsersList | undefined> {
    let url = API_URL + 'user/' + idUser;
    return this._httpClient.get<IUsersResponse>(url).pipe(
      map((usersResponse) => usersResponse.values)
    );
  }

  getAdoptionUser(idUser: number, dateAdoption: string | undefined = undefined): Observable<AdoptionsList | undefined> {
    let url = API_URL + 'user/' + idUser + '/adoption';
    return this._httpClient.get<IAdoptionsResponse>(url).pipe(
      map((usersResponse) => usersResponse.values)
    );
  }

  getDonationUser(idUser: number, donationDate: string | undefined = undefined): Observable<DonationsList | undefined> {
    let url = API_URL + 'user/' + idUser + '/donation';
    return this._httpClient.get<IDonationsResponse>(url).pipe(
      map((usersResponse) => usersResponse.values)
    );
  }

  postUser(objUser: IUser): Observable<IUsersResponse> {
    let url = API_URL + 'user/';
    return this._httpClient.post<IUsersResponse>(url, objUser).pipe(
      map((usersResponse) => usersResponse)
    );
  }

  putUser(idUser: number, objUser: IUser): Observable<IUsersResponse> {
    let url = API_URL + 'user/' + idUser;
    return this._httpClient.put<IUsersResponse>(url, objUser).pipe(
      map((usersResponse) => usersResponse)
    );
  }

  deleteUser(idUser: number): Observable<IUsersResponse> {
    let url = API_URL + 'user/' + idUser;
    return this._httpClient.delete<IUsersResponse>(url).pipe(
      map((usersResponse) => usersResponse)
    );
  }

  deleteAddressUser(idUser: number): Observable<IUsersResponse> {
    let url = API_URL + 'user/' + idUser + '/address';
    return this._httpClient.delete<IUsersResponse>(url).pipe(
      map((usersResponse) => usersResponse)
    );
  }
}
