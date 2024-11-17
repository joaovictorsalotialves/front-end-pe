import { DonationCategoryList } from "../../types/donation-category-list";
import { IBaseResponse } from "../base-response.interface";
import { IDonationCategory } from "./donation-category.interface";

export interface IDonationCategoryResponse extends IBaseResponse {
  values?: DonationCategoryList | IDonationCategory;
}
