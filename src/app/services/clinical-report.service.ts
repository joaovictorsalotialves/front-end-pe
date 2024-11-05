import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IClinicalReport } from '../interfaces/clinical-reports-response/clinical-report.interface';
import { IClinicalReportsResponse } from '../interfaces/clinical-reports-response/clinical-reports-response.interface';
import { ClinicalReportsList } from '../types/clinical-reports-list';
import { API_URL } from '../utils/api-url';

@Injectable({
  providedIn: 'root'
})
export class ClinicalReportService {
  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  getClinicalReports(
    nameEmployee: string | undefined = undefined, nameAnimal: string | undefined = undefined,
    registrationDate: string | undefined = undefined
  ): Observable<ClinicalReportsList | undefined> {
    let url = API_URL + 'clinical-report';
    if (nameEmployee) {
      url += '?nameEmployee=' + nameEmployee;
      if (nameAnimal) url += '&nameAnimal=' + nameAnimal;
      if (registrationDate) url += '&registrationDate=' + registrationDate;
    } else if (nameAnimal) {
      url += '?nameAnimal=' + nameAnimal;
      if (registrationDate) url += '&registrationDate=' + registrationDate;
    } else if (registrationDate) url += '?registrationDate=' + registrationDate;
    return this._httpClient.get<IClinicalReportsResponse>(url).pipe(
      map((clinicalReportsResponse) => clinicalReportsResponse.values)
    );
  }

  getClinicalReport(idClinicalReport: number): Observable<ClinicalReportsList | undefined> {
    let url = API_URL + 'clinical-report/' + idClinicalReport;
    return this._httpClient.get<IClinicalReportsResponse>(url).pipe(
      map((clinicalReportsResponse) => clinicalReportsResponse.values)
    );
  }

  postClinicalReport(objClinicalReport: IClinicalReport): Observable<IClinicalReportsResponse> {
    let url = API_URL + 'clinical-report/';
    return this._httpClient.post<IClinicalReportsResponse>(url, objClinicalReport).pipe(
      map((clinicalReportsResponse) => clinicalReportsResponse)
    );
  }

  putClinicalReport(idClinicalReport: number, objClinicalReport: IClinicalReport): Observable<IClinicalReportsResponse> {
    let url = API_URL + 'clinical-report/' + idClinicalReport;
    return this._httpClient.put<IClinicalReportsResponse>(url, objClinicalReport).pipe(
      map((clinicalReportsResponse) => clinicalReportsResponse)
    );
  }

  deleteClinicalReport(idClinicalReport: number): Observable<IClinicalReportsResponse> {
    let url = API_URL + 'clinical-report/' + idClinicalReport;
    return this._httpClient.delete<IClinicalReportsResponse>(url).pipe(
      map((clinicalReportsResponse) => clinicalReportsResponse)
    );
  }
}
