import * as types from '../actions/types';

export default function decks( decks = {}, action ) {
  switch ( action.type ) {
    case types.GET_DECKS:
      return decks;

    default:
      return decks;
  }
}
