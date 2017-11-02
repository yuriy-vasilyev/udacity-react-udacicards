import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native';
import * as colors from '../utils/colors';

export default function Results ({ deck, score, cardsLength }) {
  return (
    <View>
      <Text>{ `Your score is ${ score }!` }</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: colors.white
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    color: colors.primary,
    marginBottom: 50,
  },
  btn: {
    width: 200,
    padding: 15,
    borderRadius: 'ios' === Platform.OS ? 7 : 2,
    marginTop: 20
  },
  btnText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 18
  }
});
