const { SET_USERID, SET_ISLOADING, SET_TOKEN } = require("./actionTypes");

export const setUserId = (data) => ({
  type: SET_USERID,
  payload: data,
});

export const setToken = (data) => ({
  type: SET_TOKEN,
  payload: data,
});

export const setIsLoading = (data) => ({
  type: SET_ISLOADING,
  payload: data,
});
