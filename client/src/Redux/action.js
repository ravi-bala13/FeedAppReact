const { SET_USERID } = require("./actionTypes");

export const setUserId = (data) => ({
  type: SET_USERID,
  payload: data,
});
