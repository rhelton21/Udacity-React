import React, { Component } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { white, red, gray } from '../utils/colors';
import { resetDecks } from '../utils/api.js';

class SettingsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
    };
  }

  navigateToDecksView() {
    resetDecks();
    const { navigate } = this.props.navigation;
    return navigate('DecksView');
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.main}>
          Are you sure you want to reset your Decks?
        </Text>
        <View>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => this.navigateToDecksView()}>
            <Text style={[styles.text]}>Reset Data</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    color: white,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: red,
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
  main: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center',
  },
});

export default SettingsView;
