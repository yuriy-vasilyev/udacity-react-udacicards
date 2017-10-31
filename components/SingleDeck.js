import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

class SingleDeck extends Component {
  render() {
    return (
      <View>
        <Text>Single Deck</Text>
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
)( SingleDeck );
