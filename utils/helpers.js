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
