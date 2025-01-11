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
import { addNewDeck } from '../utils/api';
import { NavigationActions } from 'react-navigation';
import { white, green, gray } from '../utils/colors';

class AddDeckView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
    };
  }

  navigateToSingleDeckView(item) {
    addNewDeck(item);
    const { navigate } = this.props.navigation;
    return navigate('SingleDeckView', { item });
  }

  render() {
    const { inputText } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.main}>What is the title of your new deck?</Text>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={(inputText) => this.setState({ inputText })}
            value={inputText}
            placeholder={'An awesome title!'}
          />
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => this.navigateToSingleDeckView(inputText)}>
            <Text style={[styles.text]}>Create Deck</Text>
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
  main: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: 300,
    backgroundColor: Platform.OS === 'ios' ? white : 'transparent',
    borderColor: Platform.OS === 'ios' ? gray : white,
    borderRadius: Platform.OS === 'ios' ? 3 : 0,
    borderWidth: Platform.OS === 'ios' ? 1 : 0,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
  },
  button: {
    backgroundColor: green,
    marginLeft: 40,
    marginRight: 40,
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

export default AddDeckView;
