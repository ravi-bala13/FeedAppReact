import { SET_ISLOADING, SET_TOKEN, SET_USERID } from "./actionTypes";

const initState = {
  userId: null,
  userName: null,
  isLoading: false,
  token: null,
};

export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case SET_USERID:
      return {
        ...state,
        userId: payload,
      };

    case SET_TOKEN:
      return {
        ...state,
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
