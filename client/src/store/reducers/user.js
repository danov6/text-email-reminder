import { SET_USER, REMOVE_USER } from '../actions/user';

const INITIAL_STATE = {
  user: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: {} };
    default:
      return state;
  }
};