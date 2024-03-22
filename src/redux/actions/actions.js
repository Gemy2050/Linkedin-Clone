import * as all from "./actionTypes";

export const setUser = (payload) => {
  return {
    type: all.SET_USER,
    user: payload,
  };
};

export const setLoading = (payload) => {
  return {
    type: all.SET_LOADING,
    loading: payload,
  };
};
export const getPosts = (payload) => {
  return {
    type: all.GET_POSTS,
    posts: payload,
  };
};
