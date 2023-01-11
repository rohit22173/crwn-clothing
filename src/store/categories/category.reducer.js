import { CATEGORIES_ACATION_TYPE } from "./category.types";

export const CATEGORIES_INITIAL_STATE = {
    categories: []
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case CATEGORIES_ACATION_TYPE.SET_CATEGORIES:
            return {...CATEGORIES_INITIAL_STATE.state, categories: payload };
        default:
            return state;
    }

}