import { combineReducers } from "redux";
import { qlsvReducer } from "./qlsvReducer";
import { loadingReducer } from "./loadingReducer";
export const rootReducer = combineReducers({
  qlsvReducer,
  loadingReducer,
});
