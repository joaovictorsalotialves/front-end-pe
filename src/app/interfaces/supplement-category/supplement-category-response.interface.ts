import { SupplementCategoryList } from "../../types/supplement-category-list";
import { IBaseResponse } from "../base-response.interface";
import { ISupplementCategory } from "./supplement-category.interface";

export interface ISupplementCategoryResponse extends IBaseResponse {
  values?: SupplementCategoryList | ISupplementCategory;
}
