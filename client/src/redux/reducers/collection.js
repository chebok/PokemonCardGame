import { GET_COLLECTION, UPDATE_COLLECTION } from '../actions/types';

const initialState = {};

export default function collection(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_COLLECTION:
      return payload;

    case UPDATE_COLLECTION:
      return payload;

    default:
      return state;
  }
};
