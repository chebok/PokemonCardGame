import { GET_DECK, UPDATE_DECK } from '../actions/types';

export default function deck(state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case GET_DECK:
      return payload;

    case UPDATE_DECK:
      return payload;

    default:
      return state;
  }
};
