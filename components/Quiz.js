import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Platform, Animated, TouchableOpacity, Modal } from 'react-native';
import * as colors from '../utils/colors';
import { getAnswerText } from '../utils/helpers';
import Results from './Results';

class Quiz extends Component {
  state = {
    cardIndex: 1,
    score: 0,
    view: 'question',
    isEnd: false
  }

  submit = ( answer ) => {

  }

  render () {
    const { decks } = this.props;
    const { title } = this.props.navigation.state.params;
    const { cardIndex, score, view, isEnd } = this.state;
    const cardsLength = decks[ title ]['questions'].length;
    const card = decks[ title ]['questions'][ cardIndex - 1 ];
    const text = 'question' === view ? card['question'] : getAnswerText( card['answer'] );
    const button = 'question' === view ? 'Answer' : 'Question';

    if ( true === isEnd ) {
      return <Results score={ score } cardsLength={ cardsLength } deck={ title } />
    }

    return (
      <View style={ styles.outerContainer }>
        <View style={{ marginTop: 20, marginLeft: 20 }}>
          <Text style={{ fontSize: 18 }}>{ cardIndex } / { cardsLength }</Text>
        </View>
        <View style={ styles.container }>
          <View>
            <Text style={ styles.title }>{ text }</Text>
          </View>
          <TouchableOpacity
            onPress={ () => this.setState( state => ({
              ...state,
              view: 'question' === view ? 'answer' : 'question'
            }))}
          >
            <Text
              style={[ styles.viewBtnText, {
                color: 'question' === view ? colors.error : colors.success
              } ]}
            >{ button }</Text>
          </TouchableOpacity>
          <View style={{ marginTop: 50 }}>
            <TouchableOpacity
              style={[ styles.btn, { backgroundColor: colors.success } ]}
              onPress={ () => this.submit( 1 ) }
            ><Text style={ styles.btnText }>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[ styles.btn, { backgroundColor: colors.error } ]}
              onPress={ () => this.submit( 0 ) }
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
