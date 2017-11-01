import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { receiveDecks } from '../actions';
import { fetchDecks } from '../utils/api';
import * as colors from '../utils/colors';

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

  getCardsWord ( length ) {
    return ( 1 === length ? 'card' : 'cards' );
  }

  keyExtractor = ( item, index ) => item.title;

  renderItem = ({ item }) => (
    <TouchableOpacity style={ styles.item }>
      <Text style={ styles.itemTitle }>{ item.title }</Text>
      <Text style={ styles.itemSubTitle }>{ item.questions.length } { this.getCardsWord( item.questions.length ) }</Text>
    </TouchableOpacity>
  )

  render() {

    const { decks } = this.props;
    const decksArray = Object.keys( decks ).reduce( ( items, deckTitle ) => {
      items.push( decks[ deckTitle ] );

      return items;
    }, [] );

    return (
      <FlatList
        data={ decksArray }
        keyExtractor={ this.keyExtractor }
        renderItem={ this.renderItem }
        style={{ backgroundColor: colors.white }}
      />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    paddingTop: 40,
    padding: 40,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray
  },
  itemTitle: {
    fontSize: 30,
    color: colors.black
  },
  itemSubTitle: {
    fontSize: 20,
    color: colors.gray
  }
});

function mapStateToProps( decks ) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps
)( Decks );
