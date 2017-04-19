/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import {
  AppRegistry,
  Text,
  View,
  StatusBar,
  Image,
  Button,
  StyleSheet
}from 'react-native';

import {TabNavigator, DrawerNavigator} from 'react-navigation';

// class RecentChatsScreen extends Component {
//   render() {
//     return (
//       <View>
//         <StatusBar
//           backgroundColor="skyblue"
//           barStyle="light-content"
//         />
//         <Text>List of recent chats</Text>
//       </View>
//     )
//   }
// }
//
// class AllContactsScreen extends Component {
//   render() {
//     return (
//       <Text>List of all contacts</Text>
//     )
//   }
// }
class MyHomeScreen extends Component {
  static navigationOptions = {
    drawer: () => ({
      label: 'Home',
      icon: ({tintColor}) => (
        <Image
          source={require('./img/1.jpg')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    }),
  }

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    );
  }
}

class MyNotificationsScreen extends Component {
  static navigationOptions = {
    drawer: () => ({
      label: 'Notifications',
      icon: ({tintColor}) => (
        <Image
          source={require('./img/1.jpg')}
          style={[styles.tabIcon, {tintColor: tintColor}]}
        />
      ),
    }),
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.goBack()}
        title="Go back home"
      />
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  }
});

const Music = DrawerNavigator({
  Home: {screen: MyHomeScreen},
  Notifications: {screen: MyNotificationsScreen}
});

AppRegistry.registerComponent('Music', ()=>Music);

