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

class AddCard extends Component {
  render () {
    return (
      <View>
        <Text>Add Card</Text>
      </View>
    );
  }
}

function mapStateToProps({ decks }) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps
)( AddCard );
