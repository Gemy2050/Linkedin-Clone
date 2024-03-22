import { combineReducers } from "redux";
import userReducer from "./userReducers";
import postsReducer from "./postsReducer";

const rootReducer = combineReducers({
  userState: userReducer,
  postsState: postsReducer,
});

export default rootReducer;
