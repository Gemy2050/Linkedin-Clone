import { SET_POST } from "../actions/actionTypes";

const initialState = {
  post: null,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POST:
      return {
        ...state,
        post: action.post,
      };
    default:
      return state;
  }
};

export default postReducer;
