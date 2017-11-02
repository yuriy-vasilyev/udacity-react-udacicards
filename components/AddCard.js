import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import * as colors from '../utils/colors';
import { addCard } from '../actions';
import { submitCard } from '../utils/api';
import { NavigationActions } from 'react-navigation';

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }

  submit = ( title, question, answer ) => {
    if ( '' === title || '' === question || '' === answer ) {
      return;
    }

    this.props.dispatch( addCard( title, question, answer ) );
    submitCard( this.props.decks, title, question, answer );
    this.props.navigation.navigate( 'SingleDeck', { title } );
    this.setState({ question: '', answer: '' });
  }

  render () {
    const { question, answer } = this.state;
    const { title } = this.props.navigation.state.params;

    return (
      <KeyboardAvoidingView behavior="padding" style={ styles.container }>
        <View>
          <Text style={ styles.label }>Question</Text>
        </View>
        <View style={{ marginBottom: 30 }}>
          <TextInput
            style={ styles.input }
            onChangeText={ ( question ) => this.setState({ question }) }
            value={ question }
          />
        </View>
        <View>
          <Text style={ styles.label }>Answer</Text>
        </View>
        <View style={{ marginBottom: 30 }}>
          <TextInput
            style={ styles.input }
            onChangeText={ ( answer ) => this.setState({ answer }) }
            value={ answer }
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={ () => this.submit( title, question, answer ) }
            style={ styles.btn }
          >
            <Text style={ styles.btnText }>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 10,
    backgroundColor: colors.white
  },
  label: {
    fontSize: 20,
    color: colors.primary,
    marginBottom: 10,
    textAlign: 'left'
  },
  input: {
    width: 300,
    height: 40,
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 'ios' === Platform.OS ? 7 : 2,
    padding: 5
  },
  btn: {
    backgroundColor: colors.primary,
    width: 200,
    padding: 15,
    borderRadius: 'ios' === Platform.OS ? 7 : 2
  },
  btnText: {
    color: colors.white,
    fontSize: 18,
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
)( AddCard );
