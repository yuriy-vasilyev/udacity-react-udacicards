import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import * as colors from '../utils/colors';
import { getCardsWord } from '../utils/helpers';

class SingleDeck extends Component {
  render() {
    const { title, cardsNumber } = this.props.navigation.state.params;
    const { navigation } = this.props;

    return (
      <View style={ styles.item }>
        <View style={ styles.itemContainer }>
          <Text style={ styles.itemTitle }>{ title }</Text>
          <Text style={ styles.itemSubTitle }>{ cardsNumber } { getCardsWord( cardsNumber ) }</Text>
        </View>
        <View style={[ styles.itemContainer, { marginTop: 40 } ]}>
          <TouchableOpacity
            style={ styles.btn }
            onPress={ () => navigation.navigate(
              'AddCard',
              { title }
            )}
          ><Text style={ styles.btnText }>Add Card</Text></TouchableOpacity>
          <TouchableOpacity
            style={[ styles.btnPrimary, { marginTop: 10 } ]}
            onPress={ () => navigation.navigate(
              'Quiz',
              { title }
            )}
          ><Text style={ styles.btnPrimaryText }>Start Quiz</Text></TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.white
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
  }
});

function mapStateToProps({ decks }) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps
)( SingleDeck );
