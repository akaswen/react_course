import * as actionTypes from './actions.js';

const initialState = {
  persons: []
};

const reducer = (state = initialState, action) => {
  console.log("action", action);
  console.log("state", state);

  switch (action.type) {
    case actionTypes.addPerson:
      return { persons: state.persons.concat(action.newPerson) }
    case actionTypes.deletePerson:
      return { persons: state.persons.filter(person => person.id !== action.personId) }
    default:
      return state;
  }
};

export default reducer;
