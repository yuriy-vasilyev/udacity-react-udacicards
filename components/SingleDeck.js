import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, Platform, Alert } from 'react-native';
import * as colors from '../utils/colors';
import { getCardsWord } from '../utils/helpers';
import { removeDeck } from '../actions';
import { deleteDeck } from '../utils/api';
import { NavigationActions } from 'react-navigation';

class SingleDeck extends Component {

  remove = ( decks, title ) => {
    Alert.alert(
      'Deck Removal',
      `Do you really want to remove "${ title }" deck?`,
      [
        {
          text: 'Remove',
          onPress: () => {
            removeDeck( title );
            deleteDeck( decks, title );
            this.props.navigation.dispatch( NavigationActions.back() );
          },
          style: 'destructive'
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  }

  render() {
    const { title } = this.props.navigation.state.params;
    const { navigation, decks } = this.props;
    const cardsLength = decks[ title ].questions.length;


    return (
      <View style={ styles.container }>
        <View style={ styles.item }>
          <View style={ styles.itemContainer }>
            <Text style={ styles.itemTitle }>{ title }</Text>
            <Text style={ styles.itemSubTitle }>{ cardsLength } { getCardsWord( cardsLength ) }</Text>
          </View>
          <View style={[ styles.itemContainer, { marginTop: 40 } ]}>
            <TouchableOpacity
              style={ styles.btn }
              onPress={ () => navigation.navigate(
                'AddCard',
                { title }
              )}
            ><Text style={ styles.btnText }>Add Card</Text></TouchableOpacity>
            { cardsLength > 0 && (
              <TouchableOpacity
                style={[ styles.btnPrimary, { marginTop: 10 } ]}
                onPress={ () => navigation.navigate(
                  'Quiz',
                  { title }
                )}>
              <Text style={ styles.btnPrimaryText }>Start Quiz</Text></TouchableOpacity>
            )}
            { cardsLength === 0 && (
              <Text style={{ marginTop: 20, color: colors.gray, fontSize: 16 }}>Add at least 1 card to start a quiz!</Text>
            )}
          </View>
        </View>
        <View style={ styles.remove }>
          <TouchableOpacity
            onPress={ () => this.remove( decks, title ) }
            ><Text style={ styles.removeText }>remove deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  item: {
    flex: 1,
    justifyContent: 'center',
  },
  itemContainer: {
    alignItems: 'center'
  },
  itemTitle: {
    fontSize: 30,
    color: colors.black
  },
  itemSubTitle: {
    fontSize: 20,
    color: colors.gray
  },
  btnPrimary: {
    backgroundColor: colors.primary,
    width: 200,
    padding: 15,
    borderRadius: 'ios' === Platform.OS ? 7 : 2
  },
  btnPrimaryText: {
    color: colors.white,
    fontSize: 18,
    textAlign: 'center'
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
  remove: {
    paddingBottom: 30
  },
  removeText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'red'
  }
});

function mapStateToProps( decks ) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps
)( SingleDeck );
