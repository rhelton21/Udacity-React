import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  createStackNavigator
} from 'react-navigation-stack';
import {
  createBottomTabNavigator
} from 'react-navigation-tabs';
import {
  createAppContainer,
} from 'react-navigation';
import DecksView from './components/DecksView';
import SingleDeckView from './components/SingleDeckView';
import QuizView from './components/QuizView';
import AddCardView from './components/AddCardView';
import AddDeckView from './components/AddDeckView';
import SettingsView from './components/SettingsView';
import { setLocalNotification, clearLocalNotification } from './utils/helpers';

const DecksStack = createStackNavigator({
  DecksView: { screen: DecksView },
  SingleDeckView: { screen: SingleDeckView },
  QuizView: { screen: QuizView },
  AddCardView: { screen: AddCardView },
  SingleView: { screen: SingleDeckView }
});

const AddDeckStack = createStackNavigator({
 AddDeckView: { screen: AddDeckView },
  DecksView: { screen: DecksView },
  SingleDeckView: { screen: SingleDeckView },
  QuizView: { screen: QuizView },
  AddCardView: { screen: AddCardView },
});

const SettingsStack = createStackNavigator({
  SettingsView: { screen: SettingsView },
  DecksView: { screen: DecksView },
  SingleDeckView: { screen: SingleDeckView },
  QuizView: { screen: QuizView },
  AddCardView: { screen: AddCardView },
});

export default class App extends React.Component {
  componentDidMount() {
   setLocalNotification();
  }
  render() {
    return <AppContainer />;
  }
}

const AppContainer = createAppContainer(
  createBottomTabNavigator(
    {
      Decks: { screen: DecksStack },
      AddDeck: { screen: AddDeckStack },
      Settings: { screen: SettingsStack },
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'Decks') {
            iconName = `ios-albums`;
          } else if (routeName === 'AddDeck') {
            iconName = `ios-add-circle`;
          } else if (routeName === 'Settings') {
            iconName = `ios-options`;
          }
          // icons -- https://ionicframework.com/docs/v3/ionicons/
          // You can return any component that you like here! We usually use an
          // icon component from react-native-vector-icons
          return <Ionicons name={iconName} size={25} color={tintColor} />;
        },
      }),
      tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      },
    }
  )
);
