import { DonationCategoryList } from "../../types/donation-category-list";
import { IBaseResponse } from "../base-response.interface";

export interface IDonationCategoryResponse extends IBaseResponse {
  values?: DonationCategoryList,
}
