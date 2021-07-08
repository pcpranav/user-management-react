import {
  ADD_USER,
  DELETE_USER,
  UPDATE_USER,
  GET_USER,
} from "../constants/userConstants";

//reducer logic
export const userReducers = (state = { userList: [], user: [] }, action) => {
  switch (action.type) {
    case ADD_USER:
      const user = action.payload;
      return {
        ...state,
        userList: [...state.userList, user],
      };
    case DELETE_USER:
      return {
        ...state,
        userList: state.userList.filter((x) => x.id !== action.payload),
      };
    case GET_USER:
      return {
        ...state,
        user: state.userList.filter((x) => x.id === action.payload),
      };
    case UPDATE_USER:
      const id = action.payload.id;
      const index = state.userList.findIndex((x) => x.id === id);
      const newUserList = [...state.userList];
      newUserList[index] = action.payload;
      return {
        ...state,
        userList: newUserList,
        user: [],
      };
    default:
      return state;
  }
};
