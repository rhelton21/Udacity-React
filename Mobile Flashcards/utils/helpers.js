import React from 'react';
import { AsyncStorage } from 'react-native';
import * as Notifications from 'expo-notifications';

import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'flashcard:notifications';

// Local Notification

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY);
 
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
    	console.log('data');
    	console.log(data);
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
						Notifications.scheduleNotificationAsync({
  							content: {
  								title: "Don't forget your UdaciCards!",
  							  body: '👋 study any of your flashcards today!',
    								ios: {
      								sound: true,
    								},
    								android: {
      								sound: true,
      								priority: 'high',
      								sticky: false,
      								vibrate: true,
    								},
    							},
    							trigger: {
    								hour: 24,
    								repeats: true
 								},
							});
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
