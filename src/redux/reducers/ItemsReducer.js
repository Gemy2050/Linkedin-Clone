import { GET_ITEMS, SET_LOADING } from "../actions/actionTypes";

const initialState = {
  loading: false,
  items: [],
};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.items,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export default itemsReducer;
