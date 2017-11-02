export function getCardsWord ( length ) {
  return ( 1 === length ? 'card' : 'cards' );
}

function getRandomInt( min, max ) {
  return Math.floor( Math.random() * ( max - min ) ) + min;
}

export function getAnswerText( answer ) {
  const rightAnswers = [
    'Yes!',
    'Indeed!',
    'Exactly!',
    'True!',
    'Correct!',
    'Yep',
    'Affirmative'
  ];

  const wrongAnswers = [
    'No!',
    'Not this time!',
    'Nope',
    'Negative',
    'Not at all'
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
