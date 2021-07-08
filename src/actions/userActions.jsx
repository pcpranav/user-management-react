import {
  ADD_USER,
  DELETE_USER,
  GET_USER,
  UPDATE_USER,
} from "../constants/userConstants";

//adding-user action
export const addUser = (user) => async (dispatch, getState) => {
  const { fullName, gender, email, phone, pincode } = user;
  dispatch({
    type: ADD_USER,
    payload: {
      id: Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, ""),//generate random id 
      fullName: fullName,
      gender: gender,
      email: email,
      phone: phone,
      pincode: pincode,
    },
  });

  localStorage.setItem("userList", JSON.stringify(getState().users.userList));
};

//removing-user action
export const removeUser = (id) => (dispatch, getState) => {
  dispatch({
    type: DELETE_USER,
    payload: id,
  });

  localStorage.setItem("userList", JSON.stringify(getState().users.userList));
};

//get a specific user action
export const getUser = (id) => (dispatch, getState) => {
  dispatch({ type: GET_USER, payload: id });
  localStorage.setItem("user", JSON.stringify(getState().users.user));
};

//updating a specific user action
export const updateUser = (user, id) => async (dispatch, getState) => {
  const { fullName, gender, email, phone, pincode } = user;
  dispatch({
    type: UPDATE_USER,
    payload: {
      id: id,
      fullName: fullName,
      gender: gender,
      email: email,
      phone: phone,
      pincode: pincode,
    },
  });
  localStorage.setItem("userList", JSON.stringify(getState().users.userList));
};
