// reducers.js
import { TOGGLE_DARK_MODE } from './actions';

const initialState = {
  isDarkModeEnabled: false,
};

export const darkModeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      return {
        ...state,
        isDarkModeEnabled: !state.isDarkModeEnabled,
      };
    default:
      return state;
  }
};
