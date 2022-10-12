import { combineReducers } from 'redux';
import auth from './auth';
import message from './message';
import collection from './collection';

export default combineReducers({
  auth,
  message,
  collection,
});
