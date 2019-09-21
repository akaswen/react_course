import * as actionTypes from '../actions/actionTypes.js';

const initialState = {
  results: []
}

const reducer = (state = initialState, action) =>{
  switch (action.type) {
    case actionTypes.STORE_RESULT:
      return {
        ...state,
        results: state.results.concat({id: new Date(), value: action.result})
      }
    case actionTypes.DELETE_RESULT:
      // const id = 2;
      // const newAray = [...state.results]
      // newArray.splice(id, 1);
      return {
        ...state,
        results: state.results.filter(result => result.id !== action.id)
      }
    default:
      return state;
  }
}

export default reducer;
