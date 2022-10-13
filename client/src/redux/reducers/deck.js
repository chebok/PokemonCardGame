import { GET_DECK, GET_RANDOM_DECK, UPDATE_DECK } from '../actions/types';

export default function deck(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_DECK:
      return {
        ...state,
        userDeck: payload,
      };

    case GET_RANDOM_DECK:
      return {
        ...state,
        randomDeck: payload,
      };

    case UPDATE_DECK:
      return {
        ...state,
        userDeck: payload,
      };

    default:
      return state;
  }
};
