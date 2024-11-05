import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IAnimal } from '../interfaces/animals-response/animal.interface';
import { IAnimalsResponse } from '../interfaces/animals-response/animals-response.interface';
import { IClinicalReportsResponse } from '../interfaces/clinical-reports-response/clinical-reports-response.interface';
import { AnimalsList } from '../types/animals-list';
import { ClinicalReportsList } from '../types/clinical-reports-list';
import { API_URL } from '../utils/api-url';

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {
  constructor(
    private readonly _httpClient: HttpClient
  ) { }

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
    return this._httpClient.get<IAnimalsResponse>(url).pipe(
      map((animalsResponse) => animalsResponse.values)
    );
  }

  getAnimal(idAnimal: number): Observable<AnimalsList | undefined> {
    let url = API_URL + 'animal/' + idAnimal;
    return this._httpClient.get<IAnimalsResponse>(url).pipe(
      map((animalsResponse) => animalsResponse.values)
    );
  }

  getAnimalClinicalReports(idAnimal: number): Observable<ClinicalReportsList | undefined> {
    let url = API_URL + 'animal/' + idAnimal + '/clinical-report';
    return this._httpClient.get<IClinicalReportsResponse>(url).pipe(
      map((animalsResponse) => animalsResponse.values)
    );
  }

  postAnimal(objAnimal: IAnimal): Observable<IAnimalsResponse> {
    let url = API_URL + 'animal/';
    return this._httpClient.post<IAnimalsResponse>(url, objAnimal).pipe(
      map((animalsResponse) => animalsResponse)
    );
  }

  putAnimal(idAnimal: number, objAnimal: IAnimal): Observable<IAnimalsResponse> {
    let url = API_URL + 'animal/' + idAnimal;
    return this._httpClient.put<IAnimalsResponse>(url, objAnimal).pipe(
      map((animalsResponse) => animalsResponse)
    );
  }

  patchAnimalStatus(idAnimal: number, statusAnimal: string): Observable<IAnimalsResponse> {
    let url = API_URL + 'animal/' + idAnimal;
    return this._httpClient.patch<IAnimalsResponse>(url, { statusAnimal: statusAnimal }).pipe(
      map((animalsResponse) => animalsResponse)
    );
  }

  deleteAnimal(idAnimal: number): Observable<IAnimalsResponse> {
    let url = API_URL + 'animal/' + idAnimal;
    return this._httpClient.delete<IAnimalsResponse>(url).pipe(
      map((animalsResponse) => animalsResponse)
    );
  }
}
