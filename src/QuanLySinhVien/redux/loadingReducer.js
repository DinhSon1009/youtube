import { BAT_LOADING, TAT_LOADING } from "../constants/loadingConstants";

let initialState = {
  isLoading: false,
};

export const loadingReducer = (state = initialState, { type }) => {
  switch (type) {
    case BAT_LOADING: {
      state.count++;
      state.isLoading = true;
      return { ...state };
    }
    case TAT_LOADING: {
      state.isLoading = false;

      return { ...state };
    }
    default:
      return state;
  }
};
