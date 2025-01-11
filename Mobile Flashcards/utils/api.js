import { AsyncStorage } from 'react-native';

const STORAGE_KEY = 'flashcards:decks'


let initData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces',
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event',
      },
    ],
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer:
          'The combination of a function and the lexical environment within which that function was declared.',
      },
    ],
  },
};

function finalDeck(results) {
  return results === null ? setInitData() : JSON.parse(results);
}

export function getAll() {
  return AsyncStorage.getItem(STORAGE_KEY).then(finalDeck);
}

export function getDeckByKey(key) {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then(finalDeck)
    .then(results => results[key]);
}

export function addNewDeck(title, key) {
  return AsyncStorage.mergeItem(
    STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title,
        questions: [],
      },
    }),
  );
}

export function addNewCard(title, content) {
  return AsyncStorage.getItem(STORAGE_KEY).then(data => {
    const decks = JSON.parse(data);
    decks[title].questions.push(content);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
  });
}

function setInitData() {
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initData));
  return initData;
}

export async function resetDecks() {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initData));
  } catch (err) {
    console.log(err);
  }
}
