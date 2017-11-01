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
import { addDeck } from '../actions';
import { submitDeck } from '../utils/api';

class AddDeck extends Component {
  state = {
    inputText: ''
  }

  submit = ( title ) => {
    if ( '' === title ) {
      return;
    }

    this.props.dispatch( addDeck( title ) );
    submitDeck( title );
    this.props.navigation.navigate( 'Decks' );
    this.setState({ inputText: '' });
  }

  render() {
    const { inputText } = this.state;

    return (
      <KeyboardAvoidingView behavior="padding" style={ styles.container }>
        <View>
          <Text style={ styles.title }>What is the title of your new deck?</Text>
        </View>
        <View style={{ marginBottom: 30 }}>
          <TextInput
            style={ styles.input }
            onChangeText={ ( inputText ) => this.setState({ inputText }) }
            value={ inputText }
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={ () => this.submit( inputText ) }
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.white
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    color: colors.primary,
    marginBottom: 50,
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

function mapStateToProps({ decks }) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps
)( AddDeck );
