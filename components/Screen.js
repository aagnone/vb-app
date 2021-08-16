import React from 'react';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import {
  createStackNavigator
} from '@react-navigation/stack';

import Animated from 'react-native-reanimated';

import Icon from 'react-native-vector-icons/FontAwesome';

import {
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';

const Stack = createStackNavigator();

const MainComponent = props => {
  const { item } = props;

  return (
    <View style={[styles.container, {
      backgroundColor: item.backgroundColor
    }]}>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );
};

export default props => {
  const { item, style, navigation } = props;

  return (
    <Animated.View style={[styles.animatedView, style]}>
      <Stack.Navigator>
        <Stack.Screen
          name={item.name}
          options={{
            headerTransparent: true,
            headerBackground: () => <View style={styles.transparentHeader} />,
            headerTintColor: 'white',
            headerLeft: () => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.iconBtn}
                  onPress={() => navigation.toggleDrawer()}
                >
                  <Icon name='bars' size={20} color='white' />
                </TouchableOpacity>
              );
            }
          }}
        >
          {props => <MainComponent {...props} item={{ ...item }} />}
        </Stack.Screen>
      </Stack.Navigator>
    </Animated.View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  animatedView: {
    flex: 1,
    overflow: 'hidden'
  },

  text: {
    color: 'white',
    fontSize: wp(5.33)
  },

  transparentHeader: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.3)'
  },

  iconBtn: {
    marginLeft: wp(1.33),
    padding: wp(2.66)
  }
});