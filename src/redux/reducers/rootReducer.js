import { combineReducers } from "redux";
import userReducer from "./userReducers";
import postsReducer from "./postsReducer";
import postReducer from "./postReducer";

const rootReducer = combineReducers({
  userState: userReducer,
  postsState: postsReducer,
  postState: postReducer,
});

export default rootReducer;
