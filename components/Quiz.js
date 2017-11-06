import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Platform, Animated, TouchableOpacity, Modal } from 'react-native';
import * as colors from '../utils/colors';
import { getResultText, getAnswerText } from '../utils/helpers';
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';

class Quiz extends Component {
  state = {
    cardIndex: 1,
    view: 'question',
    isLast: false,
    isEnd: false,
    modalVisible: false,
    bounceValue: new Animated.Value(0)
  }

  score = 0

  cardsLength = null

  submittedAnswer = null

  setModalVisible ( visible ) {
    this.setState({ modalVisible: visible  });
  }

  getModalIcon = ( isCorrect ) => {
    if ( isCorrect ) {
      return (
        <Ionicons
          name={ 'ios' === Platform.OS ? 'ios-checkmark-circle-outline' : 'md-checkmark-circle-outline' }
          size={ 60 }
          color={ colors.success }
        />
      )
    } else {
      return (
        <Ionicons
          name={ 'ios' === Platform.OS ? 'ios-close-circle-outline' : 'md-close-circle' }
          size={ 60 }
          color={ colors.error }
        />
      )
    }
  }

  reset = () => {
    this.submittedAnswer = null;
    this.score = 0;
    this.setState( state => ({
      cardIndex: 1,
      view: 'question',
      modalVisible: false,
      isLast: false,
      isEnd: false,
      bounceValue: new Animated.Value(0)
    }));
  }

  submit = ( answer, cardAnswer ) => {
    this.submittedAnswer = answer;
    if ( answer === cardAnswer ) {
      this.score++;
    }
    this.setModalVisible( true );
  }

  switchToNextCard = () => {
    this.submittedAnswer = null;
    this.setState( state => ({
      cardIndex: (state.cardIndex + 1),
      view: 'question',
      modalVisible: false,
      isLast: (state.cardIndex + 1) === this.cardsLength ? true : false
    }));
  }

  render () {
    const { decks } = this.props;
    const { title } = this.props.navigation.state.params;
    const { cardIndex, view, isLast, isEnd, modalVisible, bounceValue } = this.state;
    const card = decks[ title ]['questions'][ cardIndex - 1 ];
    const text = 'question' === view ? card['question'] : getAnswerText( card['answer'] );
    const button = 'question' === view ? 'Answer' : 'Question';
    this.cardsLength = decks[ title ]['questions'].length;

    let resultText = '';
    if ( this.submittedAnswer === card['answer'] ) {
      resultText = getResultText( 1 );
    } else {
      resultText = getResultText( 0 );
    }

    const modalBtnText = isLast ? 'Show Results' : 'Next Card';

    if ( true === isEnd ) {
      Animated.sequence([
        Animated.timing( bounceValue, { duration: 200, toValue: 1.5, delay: 500 } ),
        Animated.spring( bounceValue, { toValue: 1, friction: 4 } )
      ]).start();
      return (
        <View style={ styles.outerContainer }>
          <View style={ styles.container }>
            <View>
              <Text style={ styles.title }>Your score is</Text>
              <Animated.Text style={{ fontSize: 100, textAlign: 'center', transform: [{ scale: bounceValue }] }}>{ this.score }</Animated.Text>
            </View>
            <View style={{ marginTop: 30 }}>
              <TouchableOpacity
                style={[ styles.btn, {
                  backgroundColor: colors.primary,
                  borderColor: colors.primary,
                  borderWidth: 2 }
                ]}
                onPress={ () => this.props.navigation.dispatch( NavigationActions.back() ) }
                ><Text style={ styles.btnText }>Back to Deck</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 10 }}>
              <TouchableOpacity
                style={[ styles.defaultBtn, { marginTop: 10 } ]}
                onPress={ () => this.reset() }
                ><Text style={ styles.defaultBtnText }>Reset Quiz</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }

    return (
      <View style={ styles.outerContainer }>
        <Modal
          animationType="fade"
          transparent={ false }
          visible={ modalVisible }
          onRequestClose={ () => { alert( "Modal has been closed." ) } }
          >
         <View style={ styles.modalContainer }>
          <View style={ styles.container }>
            { this.getModalIcon( this.submittedAnswer === card['answer'] ) }
            <Text
              style={[ styles.modalTitle, {
                color: this.submittedAnswer === card['answer'] ? colors.success : colors.error
              } ]}
            >{ resultText }</Text>
            <View style={{ marginTop: 30 }}>
              <TouchableOpacity
                style={[ styles.btn, { backgroundColor: colors.primary } ]}
                onPress={ () => {
                  if ( isLast ) {
                    this.setState({ isEnd: true });
                  } else {
                    this.switchToNextCard();
                  }
                }}
              ><Text style={ styles.btnText }>{ modalBtnText }</Text>
              </TouchableOpacity>
              { true !== isLast && (
                <TouchableOpacity
                  style={{ marginTop: 50 }}
                  onPress={ () => this.reset() }
                  ><Text style={ styles.resetBtn }>Reset Quiz</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
         </View>
        </Modal>
        <View style={{ marginTop: 20, marginLeft: 20 }}>
          <Text style={{ fontSize: 18 }}>{ cardIndex } / { this.cardsLength }</Text>
        </View>
        <View style={ styles.container }>
          <View>
            <Text style={ styles.title }>{ text }</Text>
          </View>
          <TouchableOpacity
            onPress={ () => this.setState( state => ({
              ...state,
              view: 'question' === view ? 'answer' : 'question'
            }))}>
            <Text
              style={[ styles.viewBtnText, {
              color: 'question' === view ? colors.error : colors.success
            } ]}>{ button }</Text>
          </TouchableOpacity>
          <View style={{ marginTop: 50 }}>
            <TouchableOpacity
              style={[ styles.btn, { backgroundColor: colors.success } ]}
              onPress={ () => this.submit( 1, card['answer'] ) }
            ><Text style={ styles.btnText }>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[ styles.btn, { backgroundColor: colors.error } ]}
              onPress={ () => this.submit( 0, card['answer'] ) }
            ><Text style={ styles.btnText }>Incorrect</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: colors.white
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    color: colors.primary,
    marginBottom: 50,
  },
  viewBtnText: {
    fontSize: 20
  },
  btn: {
    width: 200,
    padding: 15,
    borderRadius: 'ios' === Platform.OS ? 7 : 2,
    marginTop: 20
  },
  btnText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 18
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 32
  },
  defaultBtn: {
    borderColor: colors.primary,
    borderWidth: 2,
    width: 200,
    padding: 15,
    borderRadius: 'ios' === Platform.OS ? 7 : 2
  },
  defaultBtnText: {
    textAlign: 'center',
    fontSize: 18,
  },
  resetBtn: {
    fontSize: 20,
    color: colors.gray,
    textAlign: 'center'
  }

});

function mapStateToProps( decks ) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps
)( Quiz );
