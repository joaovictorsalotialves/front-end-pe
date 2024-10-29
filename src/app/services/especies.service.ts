import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ISpeciesResponse } from '../interfaces/species-response/species-response.interface';
import { ISpecies } from '../interfaces/species-response/species.interface';
import { SpeciesList } from '../types/species-list';
import { API_URL } from '../utils/api-url';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {
  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  getSpecies(nameSpecies: string | undefined = undefined): Observable<SpeciesList | undefined> {
    let url = API_URL + 'species';
    if (nameSpecies) url += '?nameSpecies=' + nameSpecies;
    return this._httpClient.get<ISpeciesResponse>(url).pipe(
      map((speciesResponse) => speciesResponse.values)
    );
  }

  getOneSpecies(idSpecies: number): Observable<SpeciesList | undefined> {
    let url = API_URL + 'species/' + idSpecies;
    return this._httpClient.get<ISpeciesResponse>(url).pipe(
      map((speciesResponse) => speciesResponse.values)
    );
  }

  postSpecies(objSpecies: ISpecies): Observable<ISpeciesResponse> {
    let url = API_URL + 'species/';
    return this._httpClient.post<ISpeciesResponse>(url, objSpecies).pipe(
      map((speciesResponse) => speciesResponse)
    );
  }

  putSpecies(idSpecies: number, objSpecies: ISpecies): Observable<ISpeciesResponse> {
    let url = API_URL + 'species/' + idSpecies;
    return this._httpClient.put<ISpeciesResponse>(url, objSpecies).pipe(
      map((speciesResponse) => speciesResponse)
    );
  }

  deleteSpecies(idSpecies: number): Observable<ISpeciesResponse> {
    let url = API_URL + 'species/' + idSpecies;
    return this._httpClient.delete<ISpeciesResponse>(url).pipe(
      map((speciesResponse) => speciesResponse)
    );
  }
}
