import { combineReducers } from "redux";
import userReducer from "./userReducers";
import postsReducer from "./postsReducer";
import postReducer from "./postReducer";
import itemsReducer from "./ItemsReducer";

const rootReducer = combineReducers({
  userState: userReducer,
  postsState: postsReducer,
  postState: postReducer,
  itemsState: itemsReducer,
});

export default rootReducer;
