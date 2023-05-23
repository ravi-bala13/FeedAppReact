const { SET_USERID, SET_ISLOADING } = require("./actionTypes");

export const setUserId = (data) => ({
  type: SET_USERID,
  payload: data,
});

export const setIsLoading = (data) => ({
  type: SET_ISLOADING,
  payload: data,
});
