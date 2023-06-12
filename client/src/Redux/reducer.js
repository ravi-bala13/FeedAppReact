import { SET_ISLOADING, SET_TOKEN, SET_USERID } from "./actionTypes";

const initState = {
  userId: null,
  userName: null,
  isLoading: false,
  token: null,
  role: null,
};

export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case SET_USERID:
      return {
        ...state,
        userId: payload,
      };

    case SET_TOKEN:
      if (payload) {
        let decodeToken = JSON.parse(atob(payload.split(".")[1]));
        console.log("decodeToken:", decodeToken);
        var { _id, user_name, role } = decodeToken.user;
      }
      return {
        ...state,
        userId: _id,
        userName: user_name,
        role,
        token: payload,
      };

    case SET_ISLOADING:
      return {
        ...state,
        isLoading: payload,
      };

    default:
      return state;
  }
};
