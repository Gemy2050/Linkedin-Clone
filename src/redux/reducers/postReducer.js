import { SET_DETAILS, SET_POST } from "../actions/actionTypes";

const initialState = {
  post: null,
  details: null,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POST:
      return {
        ...state,
        post: action.post,
      };
    case SET_DETAILS:
      return { ...state, details: action.details };
    default:
      return state;
  }
};

export default postReducer;
