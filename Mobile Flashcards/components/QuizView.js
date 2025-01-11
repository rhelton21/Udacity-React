import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Animated } from 'react-native';
import { QuizButton } from './QuizButton';
import { getDeckByKey } from '../utils/api';
import { setLocalNotification, clearLocalNotification } from '../utils/helpers';
import { NavigationActions } from 'react-navigation';
import { white, green, red, blue } from '../utils/colors';

class QuizView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: {
        questions: [
          {
            question: '',
            answer: '',
          },
        ],
      },
      toggleAnswer: false,
      cardCurrentNumber: 0,
      counter: 0,
      endOfQuiz: false,
      opacity: new Animated.Value(0),
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.item,
  });

  componentDidMount() {
    const { opacity } = this.state;

    getDeckByKey(this.props.navigation.state.params.item)
      .then((results) => this.setState(() => ({ deck: results })))
      .then(() =>
        Animated.timing(opacity, { toValue: 1, useNativeDriver: true, duration: 800 }).start()
      );
   }

  nextCard = (cardCurrentNumber, deck) => {
  	this.setState({toggleAnswer: false});
    cardCurrentNumber++;

    if (cardCurrentNumber < deck.questions.length) {
      this.setState(() => ({ cardCurrentNumber: cardCurrentNumber }));
    } else {
      this.setState(() => ({ endOfQuiz: true }));
  		clearLocalNotification();
  		setLocalNotification();
    }
  };

  invertCardSide = (toggleAnswer) =>
    this.setState(() => ({ toggleAnswer: !toggleAnswer }));

  restartQuiz = () => {
    this.setState(() => ({
      endOfQuiz: false,
      counter: 0,
      cardCurrentNumber: 0,
    }));
  };

  incrementCounter = (cardCurrentNumber, deck) => {
    this.setState(() => ({ counter: this.state.counter + 1 }));


    this.nextCard(cardCurrentNumber, deck);
  };

  render() {
    const {
      deck,
      toggleAnswer,
      cardCurrentNumber,
      endOfQuiz,
      counter,
      opacity,
    } = this.state;

    return endOfQuiz ? (
      <Animated.View style={[styles.container, { opacity }]}>
        <View style={styles.score}>
          <Text style={styles.scoreContent}>
            You scored{' '}
            {`${parseFloat(
              ((counter / deck.questions.length) * 100).toFixed(2)
            )}%`}
          </Text>
          <Text style={styles.scoreMessage}>
            {(counter / deck.questions.length) * 100 >= 75
              ? "Good Job"
              : 'Keep trying'}
          </Text>
        </View>
        <QuizButton
          style={styles.restartButton}
          onPress={() => this.restartQuiz()}>
          Restart Quiz
        </QuizButton>
      </Animated.View>
    ) : (
      <ScrollView>
        <Animated.View style={[styles.container, { opacity }]}>
          <Text style={styles.displayCounter}>
            {`${cardCurrentNumber + 1} of ${deck.questions.length}`}
          </Text>
          <View style={styles.card}>
            <Text style={styles.cardContent}>
              {toggleAnswer
                ? deck.questions[cardCurrentNumber].answer
                : deck.questions[cardCurrentNumber].question}
            </Text>
          </View>
          <QuizButton
            style={styles.toggleButton}
            onPress={() => this.invertCardSide(toggleAnswer)}>
            {!toggleAnswer ? 'Show Answer' : 'Show Question'}
          </QuizButton>
          <View style={styles.options}>
            <Text style={{ textAlign: 'center' }}>Your answer is:</Text>
            <QuizButton
              style={styles.correctButton}
              onPress={() =>
                this.incrementCounter(cardCurrentNumber, deck)
              }>
              Correct
            </QuizButton>
            <QuizButton
              style={styles.wrongButton}
              onPress={() => this.nextCard(cardCurrentNumber, deck)}>
              Wrong
            </QuizButton>
          </View>
        </Animated.View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  displayCounter: {
    paddingTop: 20,
    paddingBottom: 10,
    fontSize: 22,
    textAlign: 'center',
  },
  card: {
    backgroundColor: white,
    justifyContent: 'center',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#dddae2',
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 40,
    marginRight: 40,
    paddingTop: 15,
    paddingBottom: 15,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 5,
    shadowOpacity: 0.7,
  },
  cardContent: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  score: {
    marginBottom: 10,
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  scoreContent: {
    fontSize: 26,
    fontWeight: 'bold',
    color: red,
    textAlign: 'center',
  },
  scoreMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: blue,
    textAlign: 'center',
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
  },
  options: {
    marginTop: 40,
    marginBottom: 40,
  },

  restartButton: {
    backgroundColor: blue,
    marginLeft: 40,
    marginRight: 40,
  },
  toggleButton: {
    backgroundColor: blue,
    marginLeft: 40,
    marginRight: 40,
  },
  correctButton: {
    backgroundColor: green,
    marginLeft: 40,
    marginRight: 40,
  },
  wrongButton: {
    backgroundColor: red,
    marginLeft: 40,
    marginRight: 40,
  },
});

export default QuizView;
