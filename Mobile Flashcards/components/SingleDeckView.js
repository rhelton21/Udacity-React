import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { getDeckByKey } from '../utils/api';
import { NavigationActions } from 'react-navigation';
import { white, blue, green, textGray, gray, black } from '../utils/colors';

class SingleDeckView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: { questions: [] },
      opacity: new Animated.Value(0),
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.item,
  });


  componentDidMount() {
    const { opacity } = this.state;
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      getDeckByKey(this.props.navigation.state.params.item)
      .then((results) => this.setState(() => ({ deck: results })))
      .then(() =>
        Animated.timing(opacity, { toValue: 1, useNativeDriver: true, duration: 800 }).start()
      );      
    });
  }


  startQuiz = (item) => {
    const { navigate } = this.props.navigation;
    return navigate('QuizView', { item });
  };

  getCardsLen = (questions) => {
    if (questions.length === 0) {
      return <Text>0 cards</Text>;
    } else if (questions.length > 1) {
      return <Text>{questions.length} cards</Text>;
    } else {
      return <Text>1 card</Text>;
    }
  };

  goBackToItem = (content) => {
    const newDeck = this.state.deck;
    newDeck.questions.push(content);
    this.setState(() => ({ deck: newDeck }));
  };

  addNewCard = (item) => {
    const { navigate } = this.props.navigation;

    return navigate('AddCardView', {
      item,
      navBack: this.goBackToItem,
    });
  };

  render() {
    const { deck, opacity } = this.state;

    return (
      <ScrollView>
        <Animated.View style={[styles.container, { opacity }]}>
          <Text style={styles.cards}>
            {deck.questions ? this.getCardsLen(deck.questions) : null}
          </Text>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => this.addNewCard(deck.title)}>
            <Text style={[styles.text]}>Add Card</Text>
          </TouchableOpacity>
          {deck.questions.length > 0 ? (
            <TouchableOpacity
              style={styles.startquizButton}
              onPress={() => this.startQuiz(deck.title)}>
              <Text style={[styles.text]}>Start Quiz</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.message}>
              There is no cards in this deck yet. To start a quiz, please add
              one or more cards.
            </Text>
          )}
        </Animated.View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  cards: {
    fontSize: 18,
    textAlign: 'center',
    color: textGray,
    marginBottom: 20,
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
  startquizButton: {
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
  text: {
    textAlign: 'center',
    color: white,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 40,
    marginLeft: 40,
    marginRight: 40,
  },
});

export default SingleDeckView;
