import * as actionTypes from './actionTypes.js';

export const saveResult = res => {
  return {
    type: actionTypes.STORE_RESULT,
    result: res
  };
}

export const storeResult = res => {
  return dispatch => {
    setTimeout(() => {
      dispatch(saveResult(res))
    }, 2000)
  };
};

export const deleteResult = id => {
  return {
    type: actionTypes.DELETE_RESULT,
    id: id
  }
};
