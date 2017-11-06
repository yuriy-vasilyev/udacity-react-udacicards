import * as types from '../actions/types';

function decks ( state = {}, action ) {
  switch ( action.type ) {
    case types.RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }

    case types.ADD_DECK:
      return {
        ...state,
        [ action.deckTitle ]: {
          title: action.deckTitle,
          questions: []
        }
      }

    case types.REMOVE_DECK:
      alert( JSON.stringify(
        {
          ...state,
          [ action.deckTitle ]: undefined
        }
      ));
      return {
        ...state,
        [ action.deckTitle ]: undefined
      }

    case types.ADD_CARD:
      return {
        ...state,
        [ action.deckTitle ]: {
          ...state[ action.deckTitle ],
          questions: [
            ...state[ action.deckTitle ]['questions'],
            {
              question: action.question,
              answer: action.answer
            }
          ]
        }
      }

    default :
      return state;
  }
}

export default decks;
