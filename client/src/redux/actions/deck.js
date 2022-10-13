import { GET_DECK, UPDATE_DECK, SET_MESSAGE } from './types';
import DeckService from '../../services/deck.service';

export const getDeck = (userId) => (dispatch) => {
  return DeckService.getDeck(userId).then(
    (response) => {
      dispatch({
        type: GET_DECK,
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
