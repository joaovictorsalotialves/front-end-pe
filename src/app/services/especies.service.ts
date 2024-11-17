import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { ISpeciesRequest } from '../interfaces/species/species-request.interface';
import { ISpeciesResponse } from '../interfaces/species/species-response.interface';
import { ISpecies } from '../interfaces/species/species.interface';
import { SpeciesList } from '../types/species-list';
import { API_URL } from '../utils/api-url';
import { handleError } from '../utils/handleError';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {
  constructor(
    private readonly _httpClient: HttpClient
  ) { }
  authToken: string = localStorage.getItem('authToken') as string;

  getSpecies(nameSpecies: string | undefined = undefined): Observable<SpeciesList | undefined> {
    let url = API_URL + 'species';
    if (nameSpecies) url += '?nameSpecies=' + nameSpecies;
    return this._httpClient.get<ISpeciesResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((speciesResponse) => speciesResponse.values as SpeciesList),
      catchError(handleError)
    );
  }

  getOneSpecies(idSpecies: number): Observable<ISpecies | undefined> {
    let url = API_URL + 'species/' + idSpecies;
    return this._httpClient.get<ISpeciesResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((speciesResponse) => speciesResponse.values as ISpecies),
      catchError(handleError)
    );
  }

  postSpecies(objSpecies: ISpeciesRequest): Observable<ISpeciesResponse> {
    let url = API_URL + 'species/';
    return this._httpClient.post<ISpeciesResponse>(url, objSpecies, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((speciesResponse) => speciesResponse),
      catchError(handleError)
    );
  }

  putSpecies(idSpecies: number, objSpecies: ISpeciesRequest): Observable<ISpeciesResponse> {
    let url = API_URL + 'species/' + idSpecies;
    return this._httpClient.put<ISpeciesResponse>(url, objSpecies, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((speciesResponse) => speciesResponse),
      catchError(handleError)
    );
  }

  deleteSpecies(idSpecies: number): Observable<ISpeciesResponse> {
    let url = API_URL + 'species/' + idSpecies;
    return this._httpClient.delete<ISpeciesResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((speciesResponse) => speciesResponse),
      catchError(handleError)
    );
  }
}
