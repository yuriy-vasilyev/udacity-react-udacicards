import { AsyncStorage } from 'react-native';

const APP_STORAGE_KEY = '@udacicards:decks';

export function fetchDecks () {
  // AsyncStorage.getItem( APP_STORAGE_KEY );
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

export function deleteDeck ( decks, title ) {
  return AsyncStorage.setItem( APP_STORAGE_KEY, JSON.stringify({
    ...decks,
    [ title ]: undefined
  }))
}

export function submitCard ( decks, title, question, answer ) {
  return AsyncStorage.setItem( APP_STORAGE_KEY, JSON.stringify({
    ...decks,
    [ title ]: {
      title,
      questions: [
        ...decks[ title ]['questions'],
        {
          question,
          answer
        }
      ]
    }
  }))
}
