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

export function submitCard ( deckTitle, question, answer ) {
  return AsyncStorage.mergeItem( APP_STORAGE_KEY, JSON.stringify({
    [ deckTitle ]: {
      title,
      questions: []
    }
  }))
}
