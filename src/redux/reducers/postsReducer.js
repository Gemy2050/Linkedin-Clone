import { GET_POSTS, SET_LOADING } from "../actions/actionTypes";

const initialState = {
  loading: false,
  posts: [],
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.posts,
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

export default postsReducer;
