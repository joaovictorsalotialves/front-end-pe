import { ClinicalReportsList } from "../../types/clinical-reports-list";
import { IBaseResponse } from "../base-response.interface";

export interface IClinicalReportsResponse extends IBaseResponse {
  values?: ClinicalReportsList,
}
