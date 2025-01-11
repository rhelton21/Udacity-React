import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  View,
  Platform,
  Animated,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { addNewCard } from '../utils/api';
import { white, green, blue, gray, black } from '../utils/colors';

class AddCardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: '',
      title: '',
      opacity: new Animated.Value(0),
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.item,
  });

  componentDidMount() {
    const { opacity } = this.state;
  }

  addNewCard = (title) => {
    const content = {
      question: this.state.question,
      answer: this.state.answer,
    };
    console.log('------');
    console.log(this.state.question);
    console.log(this.state.answer);
    console.log(title);
    console.log('------');

    return addNewCard(title, content).then(() =>
      this.returnToDeckItem(title, content)
    );
  };

  returnToDeckItem = (item, content) => {
    const { navigate, dispatch } = this.props.navigation;
    return navigate('SingleDeckView', { item });
  };

  render() {
    const { opacity } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ marginBottom: 40 }}>
          <Text style={styles.main}>Question</Text>
          <View>
            <TextInput
              style={styles.input}
              onChangeText={(question) => this.setState({ question })}
              value={this.state.question}
              placeholder={'Create a new question'}
            />
          </View>
          <Text style={styles.main}>Answer</Text>
          <View style={{ marginBottom: 10 }}>
            <TextInput
              style={styles.input}
              onChangeText={(answer) => this.setState({ answer })}
              value={this.state.answer}
              placeholder={'Type the answer'}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <TouchableOpacity
              style={[styles.addButton]}
              onPress={() =>
                this.addNewCard(this.props.navigation.state.params.item)
              }>
              <Text style={[styles.text]}>Add New Card</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  main: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
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
  addButton: {
    backgroundColor: blue,
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
  text: {
    textAlign: 'center',
    color: white,
    fontWeight: 'bold',
  },
});

export default AddCardView;
