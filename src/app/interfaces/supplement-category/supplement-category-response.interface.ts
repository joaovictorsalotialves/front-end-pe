import { SupplementCategoryList } from "../../types/supplement-category-list";
import { IBaseResponse } from "../base-response.interface";

export interface ISupplementCategoryResponse extends IBaseResponse {
  values?: SupplementCategoryList;
}
