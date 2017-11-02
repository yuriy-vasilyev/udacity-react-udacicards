import { AsyncStorage } from 'react-native';

const APP_STORAGE_KEY = '@udacicards:decks';

export function fetchDecks () {
  return AsyncStorage.getItem( APP_STORAGE_KEY );
}

export function submitDeck ( title ) {
  return AsyncStorage.mergeItem( APP_STORAGE_KEY, JSON.stringify({
    [ title ]: {
      title,
      questions: []
    }
  }));
}

export function submitCard ( decks, deckTitle, question, answer ) {
  return AsyncStorage.mergeItem( APP_STORAGE_KEY, JSON.stringify({
    ...decks,
    [ deckTitle ]: {
      deckTitle,
      questions: [
        ...decks[ deckTitle ]['questions'],
        {
          question,
          answer
        }
      ]
    }
  }))
}
