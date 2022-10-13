import { GET_COLLECTION, UPDATE_COLLECTION, SET_MESSAGE } from './types';
import CollectionService from '../../services/collection.service';

export const getCollection = (userId) => (dispatch) => {
  return CollectionService.getCollection(userId).then(
    (response) => {
      dispatch({
        type: GET_COLLECTION,
        payload: response,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
