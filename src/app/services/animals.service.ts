import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { IAnimal } from '../interfaces/animals-response/animal.interface';
import { IAnimalsResponse } from '../interfaces/animals-response/animals-response.interface';
import { IClinicalReportsResponse } from '../interfaces/clinical-reports-response/clinical-reports-response.interface';
import { AnimalsList } from '../types/animals-list';
import { ClinicalReportsList } from '../types/clinical-reports-list';
import { API_URL } from '../utils/api-url';
import { handleError } from '../utils/handleError';

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {
  constructor(
    private readonly _httpClient: HttpClient
  ) { }
  authToken: string = localStorage.getItem('authToken') as string;

  getAnimals(
    nameAnimal: string | undefined = undefined,
    statusAnimal: string | undefined = undefined,
    size: string | undefined = undefined,
    nameSpecies: string | undefined = undefined,
    nameRace: string | undefined = undefined
  ): Observable<AnimalsList | undefined> {
    let url = API_URL + 'animal';
    if (nameAnimal) {
      url += '?nameAnimal=' + nameAnimal;
      if (statusAnimal) url += '&statusAnimal=' + statusAnimal;
      if (size) url += '&size=' + size;
      if (nameSpecies) url += '&nameSpecies=' + nameSpecies;
      if (nameRace) url += '&nameRace=' + nameRace;
    } else if (statusAnimal) {
      url += '?statusAnimal=' + statusAnimal;
      if (size) url += '&size=' + size;
      if (nameSpecies) url += '&nameSpecies=' + nameSpecies;
      if (nameRace) url += '&nameRace=' + nameRace;
    } else if (size) {
      url += '?size=' + size;
      if (nameSpecies) url += '&nameSpecies=' + nameSpecies;
      if (nameRace) url += '&nameRace=' + nameRace;
    } else if (nameSpecies) {
      url += '?nameSpecies=' + nameSpecies;
      if (nameRace) url += '&nameRace=' + nameRace;
    } else if (nameRace) url += '?nameRace=' + nameRace;
    return this._httpClient.get<IAnimalsResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((animalsResponse) => animalsResponse.values as AnimalsList),
      catchError(handleError)
    );
  }

  getAnimal(idAnimal: number): Observable<IAnimal | undefined> {
    let url = API_URL + 'animal/' + idAnimal;
    return this._httpClient.get<IAnimalsResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((animalsResponse) => animalsResponse.values as IAnimal),
      catchError(handleError)
    );
  }

  getAnimalClinicalReports(idAnimal: number): Observable<ClinicalReportsList | undefined> {
    let url = API_URL + 'animal/' + idAnimal + '/clinical-report';
    return this._httpClient.get<IClinicalReportsResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((animalsResponse) => animalsResponse.values),
      catchError(handleError)
    );
  }

  postAnimal(objAnimal: IAnimal): Observable<IAnimalsResponse> {
    let url = API_URL + 'animal/';
    return this._httpClient.post<IAnimalsResponse>(url, objAnimal, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((animalsResponse) => animalsResponse),
      catchError(handleError)
    );
  }

  putAnimal(idAnimal: number, objAnimal: IAnimal): Observable<IAnimalsResponse> {
    let url = API_URL + 'animal/' + idAnimal;
    return this._httpClient.put<IAnimalsResponse>(url, objAnimal, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((animalsResponse) => animalsResponse),
      catchError(handleError)
    );
  }

  patchAnimalStatus(idAnimal: number, statusAnimal: string): Observable<IAnimalsResponse> {
    let url = API_URL + 'animal/' + idAnimal;
    return this._httpClient.patch<IAnimalsResponse>(url, { statusAnimal: statusAnimal }, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((animalsResponse) => animalsResponse),
      catchError(handleError)
    );
  }

  deleteAnimal(idAnimal: number): Observable<IAnimalsResponse> {
    let url = API_URL + 'animal/' + idAnimal;
    return this._httpClient.delete<IAnimalsResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((animalsResponse) => animalsResponse),
      catchError(handleError)
    );
  }
}
