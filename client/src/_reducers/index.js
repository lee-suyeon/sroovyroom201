import { combineReducers } from 'redux';
import user from './user_reducer';
import menu from './menu_reducer';

const rootReducer = combineReducers({
  user, 
  menu,
});

export default rootReducer;