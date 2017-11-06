import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Platform } from 'react-native';
import { receiveDecks } from '../actions';
import { fetchDecks } from '../utils/api';
import * as colors from '../utils/colors';
import { getCardsWord } from '../utils/helpers';

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

  keyExtractor = ( item, index ) => item.title;

  renderItem = ({ item }) => {
    const cardsNumber = item.questions.length;
    return (
      <TouchableOpacity
        style={ styles.item }
        onPress={ () => this.props.navigation.navigate(
          'SingleDeck',
          {
            title: item.title,
            cardsNumber
          }
        )}
        >
          <Text style={ styles.itemTitle }>{ item.title }</Text>
          <Text style={ styles.itemSubTitle }>{ cardsNumber } { getCardsWord( cardsNumber ) }</Text>
        </TouchableOpacity>
    );
  }

  render() {

    const { ready } = this.state;

    if ( false === ready ) {
      return (
        <View style={ styles.container }>
          <Text>Loading...</Text>
        </View>
      );
    }

    const { decks } = this.props;
    const decksArray = Object.keys( decks ).reduce( ( items, deckTitle ) => {
      items.push( decks[ deckTitle ] );

      return items;
    }, [] );

    if ( 0 === decksArray.length ) {
      return (
        <View style={ styles.container }>
          <Text style={{ fontSize: 18, marginBottom: 20 }}>You have no decks yet.</Text>
          <TouchableOpacity style={ styles.btn } onPress={ () => this.props.navigation.navigate( 'AddDeck' ) }>
            <Text style={ styles.btnText }>Create First Deck</Text>
          </TouchableOpacity>
        </View>
      );
    }


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
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
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
  },
  btn: {
    borderColor: colors.primary,
    borderWidth: 2,
    width: 200,
    padding: 15,
    borderRadius: 'ios' === Platform.OS ? 7 : 2
  },
  btnText: {
    color: colors.primary,
    fontSize: 18,
    textAlign: 'center'
  },
});

function mapStateToProps( decks ) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps
)( Decks );
