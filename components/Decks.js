import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { receiveDecks } from '../actions';
import { fetchDecks } from '../utils/api';

class Decks extends Component {
  state = {
    ready: false
  }

  componentDidMount () {
    const { dispatch } = this.props

    fetchDecks()
      .then( ( decks ) => dispatch( receiveDecks( JSON.parse( decks ) ) ) )
      .then( () => this.setState({ ready: true }) )
      .catch( ( error ) => console.warn( 'Fetching decks error: ' + error ) );
  }

  render() {

    const { decks } = this.props;

    return (
      <View>
        <Text>{ JSON.stringify( decks ) }</Text>
      </View>
    );
  }
}

function mapStateToProps( decks ) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps
)( Decks );
