import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { white, green } from '../utils/colors';

export function QuizButton({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.text, style]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: white,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: green,
    borderRadius: 3,
    borderWidth: 0,
    overflow: 'hidden',
    marginTop: 15,
    marginBottom: 0,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 12,
    paddingBottom: 12,
  },
});
