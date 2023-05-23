import { SET_USERID } from "./actionTypes";

const initState = {
  userId: null,
  userName: null,
};

export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case SET_USERID:
      return {
        ...state,
        userId: payload,
      };

    default:
      return state;
  }
};
