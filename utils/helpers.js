import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = '@udacicards:notifications';

export function getCardsWord ( length ) {
  return ( 1 === length ? 'card' : 'cards' );
}

function getRandomInt( min, max ) {
  return Math.floor( Math.random() * ( max - min ) ) + min;
}

export function getResultText( answer ) {
  const rightAnswers = [
    'Yes!',
    'Indeed!',
    'Exactly!',
    'True!',
    'Correct!',
    'Yep',
    'Affirmative',
    "You're awesome!",
    "You're right!"
  ];

  const wrongAnswers = [
    'No!',
    'Not this time!',
    'Nope',
    'Negative',
    'Not at all',
    'Try next time!'
  ];

  switch ( answer ) {
    case 1:
      return rightAnswers[ getRandomInt( 0, rightAnswers.length - 1 ) ];

    case 0:
      return wrongAnswers[ getRandomInt( 0, wrongAnswers.length - 1 ) ]

    default:
      return 'You provided neither 1, nor 0.';
  }
}

export function getAnswerText( answer ) {
  switch ( answer ) {
    case 1:
      return 'Yes';

    case 0:
      return 'No';

    default:
      return 'You provided neither 1, nor 0.';
  }
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem( NOTIFICATION_KEY )
    .then( Notifications.cancelAllScheduledNotificationsAsync )
}

function createNotification () {
  return {
    title: 'Take a quiz!',
    body: "Don't forget to take a quiz today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }

  }
}

export function setLocalNotification () {
  AsyncStorage.getItem( NOTIFICATION_KEY )
    .then( JSON.parse )
    .then( data => {
      if ( null === data ) {
        Permissions.askAsync( Permissions.NOTIFICATIONS )
          .then( ({ status }) => {
              if ( 'granted' === status ) {
                Notifications.cancelAllScheduledNotificationsAsync()

                let tomorrow = new Date()
                tomorrow.setDate( tomorrow.getDate() + 1 )
                tomorrow.setHours(13)
                tomorrow.setMinutes(0)

                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day'
                  }
                )

                AsyncStorage.setItem( NOTIFICATION_KEY, JSON.stringify(true) )
              }
          })
      }
    })
}
