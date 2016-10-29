import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import users from './users';
import layout from './layout';

const rootReducer = combineReducers({
  users,
  layout,
  routing: routerReducer
});

export default rootReducer;
