import { combineReducers } from 'redux';
import userReducer from './userReducer';

const reducerWrapper = (reducer) => (state, action) => {
  return reducer(state, action);
};

export default combineReducers({
  user: reducerWrapper(userReducer),
});
