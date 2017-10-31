import { StyleSheet, Platform } from 'react-native';
import * as colors from './colors';

export const Buttons = StyleSheet.create({
  Primary: {
    backgroundColor: colors.primary,
    width: 200,
    padding: 5
  },
  Default: {
    backgroundColor: colors.white,
    width: 200,
    padding: 5
  }
});
