import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer as formReducer } from "redux-form";

import { userReducers } from "./reducers/usersReducer";

//combine reducers
const reducer = combineReducers({ form: formReducer, users: userReducers });

//get user list from localstorage
const usersFromStorage = localStorage.getItem("userList")
  ? JSON.parse(localStorage.getItem("userList"))
  : [];

//get specific user from localstorage
const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : [];

//intial state
const initialState = {
  users: { userList: usersFromStorage, user: userFromStorage },
};

const middleware = [thunk];

//store logic
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
