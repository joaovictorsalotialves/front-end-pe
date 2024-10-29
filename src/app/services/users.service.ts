import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IUsersResponse } from '../interfaces/users-response/users-reponse';
import { UsersList } from '../types/users-list';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  getUsers(): Observable<UsersList | undefined> {
    return this._httpClient.get<IUsersResponse>('http://localhost:4040/user').pipe(
      map((statesResponse) => statesResponse.values)
    );
  }
}
