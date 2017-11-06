import * as types from './types';

export function receiveDecks ( decks ) {
  return {
    type: types.RECEIVE_DECKS,
    decks,
  }
}

export function addDeck ( deckTitle ) {
  return {
    type: types.ADD_DECK,
    deckTitle,
  }
}

export function addCard ( deckTitle, question, answer ) {
  return {
    type: types.ADD_CARD,
    deckTitle,
    question,
    answer
  }
}
