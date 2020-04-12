export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';

export const setUser = data => dispatch => {  
  return dispatch({
    type: SET_USER,
    payload: data
  });
}
export const removeUser = () => dispatch => {
  return dispatch({
    type: REMOVE_USER
  });
}