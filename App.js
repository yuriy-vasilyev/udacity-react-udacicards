import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { Constants } from 'expo';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import * as colors from './utils/colors';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import SingleDeck from './components/SingleDeck';
import Decks from './components/Decks';
import AddDeck from './components/AddDeck';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function UdaciStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={ backgroundColor } { ...props } />
    </View>
  )
}

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name={ 'ios' === Platform.OS ? 'ios-albums-outline' : 'md-albums' } size={30} color={tintColor} />
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <Ionicons name={ 'ios' === Platform.OS ? 'ios-add-circle-outline' : 'md-add-circle' } size={30} color={tintColor} />
    },
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: 'ios' === Platform.OS ? colors.primary : colors.white,
    style: {
      height: 56,
      backgroundColor: 'ios' === Platform.OS ? colors.white : colors.primary,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1,
      paddingBottom: 5
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  SingleDeck: {
    screen: SingleDeck,
    navigationOptions: {
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: colors.primary
      }
    }
  }
})

export default class App extends Component {
  render() {
    return (
      <Provider store={ createStore( reducer ) }>
        <View style={{ flex: 1, backgroundColor: colors.white }}>
          <UdaciStatusBar backgroundColor={ colors.black } barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
