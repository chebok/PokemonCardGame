import { combineReducers } from 'redux';
import auth from './auth';
import message from './message';
import collection from './collection';
import deck from './deck';

export default combineReducers({
  auth,
  message,
  collection,
  deck,
});
