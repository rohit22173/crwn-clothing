import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACATION_TYPE } from "./category.types";

export const setCategories = (categoriesArray) => createAction(CATEGORIES_ACATION_TYPE.SET_CATEGORIES, categoriesArray);