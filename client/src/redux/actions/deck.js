import { GET_DECK, GET_RANDOM_DECK, UPDATE_DECK, SET_MESSAGE } from './types';
import DeckService from '../../services/deck.service';

export const getDeck = (userId) => async (dispatch) => {
  const response = await DeckService.getDeck(userId);
  dispatch({
    type: GET_DECK,
    payload: response,
  });
  return await Promise.resolve();
};

export const getRandomDeck = () => async (dispatch) => {
  const response = await DeckService.getRandomDeck();
  // console.log('response', response);
  dispatch({
    type: GET_RANDOM_DECK,
    payload: response,
  });
  return await Promise.resolve();
};
