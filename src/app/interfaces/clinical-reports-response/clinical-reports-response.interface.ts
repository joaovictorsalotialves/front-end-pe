import { ClinicalReportsList } from "../../types/clinical-reports-list";
import { IBaseResponse } from "../base-response.interface";
import { IClinicalReport } from "./clinical-report.interface";

export interface IClinicalReportsResponse extends IBaseResponse {
  values?: ClinicalReportsList | IClinicalReport,
}
