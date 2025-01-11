import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { getAll } from '../utils/api';
import { SingleDeckView } from './SingleDeckView';
import { white, black, gray, textGray, lightGray } from '../utils/colors';
import { setLocalNotification } from '../utils/helpers';
import { clearLocalNotification } from '../utils/helpers';

class DecksView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: {},
    };
  }

  getCardsLen = (questions) => {
    if (questions.length === 0) {
      return <Text>0 cards</Text>;
    } else if (questions.length > 1) {
      return <Text>{questions.length} cards</Text>;
    } else {
      return <Text>1 card</Text>;
    }
  };

  componentDidMount() {
 // 	setLocalNotification();
 // 	clearLocalNotification();
     const { navigation } = this.props;
     this.focusListener = navigation.addListener('didFocus', () => {
     	getAll().then((results) => {
      	this.setState(() => ({ decks: results }));
    	});          
    });

  }

  navigateToSingleDeckView(item) {
    const { navigate } = this.props.navigation;
    return navigate('SingleDeckView', { item });
  }

  render() {
    const { decks } = this.state;

    return (
      <ScrollView style={styles.container}>
        <View style={{ marginBottom: 40 }}>
          <Text style={styles.title}>mobile-flashcards</Text>
          {Object.keys(decks).map((item) => {
            return (
              <View key={decks[item].title}>
                <TouchableOpacity
                  onPress={() =>
                    this.navigateToSingleDeckView(decks[item].title)
                  }>
                  <View style={styles.deck}>
                    <Text style={styles.title}>{decks[item].title}</Text>
                    <Text style={styles.cards}>
                      {decks[item].questions
                        ? this.getCardsLen(decks[item].questions)
                        : null}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightGray,
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  deck: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#dddae2',
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: black,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center',
  },
  cards: {
    fontSize: 18,
    textAlign: 'center',
    color: textGray,
  },
});

export default DecksView;
