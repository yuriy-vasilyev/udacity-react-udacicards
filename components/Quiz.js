import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Platform } from 'react-native';
import * as colors from '../utils/colors';

class Quiz extends Component {
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
)( Quiz );
