import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { IClinicalReportRequest } from '../interfaces/clinical-reports-response/clinical-report-request.interface';
import { IClinicalReport } from '../interfaces/clinical-reports-response/clinical-report.interface';
import { IClinicalReportsResponse } from '../interfaces/clinical-reports-response/clinical-reports-response.interface';
import { ClinicalReportsList } from '../types/clinical-reports-list';
import { API_URL } from '../utils/api-url';
import { handleError } from '../utils/handleError';

@Injectable({
  providedIn: 'root'
})
export class ClinicalReportService {
  constructor(
    private readonly _httpClient: HttpClient
  ) { }
  authToken: string = localStorage.getItem('authToken') as string;

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
    return this._httpClient.get<IClinicalReportsResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((clinicalReportsResponse) => clinicalReportsResponse.values as ClinicalReportsList),
      catchError(handleError)
    );
  }

  getClinicalReport(idClinicalReport: number): Observable<IClinicalReport | undefined> {
    let url = API_URL + 'clinical-report/' + idClinicalReport;
    return this._httpClient.get<IClinicalReportsResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((clinicalReportsResponse) => clinicalReportsResponse.values as IClinicalReport),
      catchError(handleError)
    );
  }

  postClinicalReport(objClinicalReport: IClinicalReportRequest): Observable<IClinicalReportsResponse> {
    let url = API_URL + 'clinical-report/';
    return this._httpClient.post<IClinicalReportsResponse>(url, objClinicalReport, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((clinicalReportsResponse) => clinicalReportsResponse),
      catchError(handleError)
    );
  }

  putClinicalReport(idClinicalReport: number, objClinicalReport: IClinicalReportRequest): Observable<IClinicalReportsResponse> {
    let url = API_URL + 'clinical-report/' + idClinicalReport;
    return this._httpClient.put<IClinicalReportsResponse>(url, objClinicalReport, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((clinicalReportsResponse) => clinicalReportsResponse),
      catchError(handleError)
    );
  }

  deleteClinicalReport(idClinicalReport: number): Observable<IClinicalReportsResponse> {
    let url = API_URL + 'clinical-report/' + idClinicalReport;
    return this._httpClient.delete<IClinicalReportsResponse>(url, {
      headers: { authorization: `Bearer ${this.authToken}` }
    }).pipe(
      map((clinicalReportsResponse) => clinicalReportsResponse),
      catchError(handleError)
    );
  }
}
