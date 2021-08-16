import React from 'react'
import tailwind from 'tailwind-rn'
import AnimatedHeader from '../AnimatedHeader'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SafeAreaView from 'react-native-safe-area-view'
import { LinearGradient } from 'expo-linear-gradient'
import { themeColor } from '../../styles'
import {View, Text} from 'react-native'

const About = (props) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: themeColor.color2 }} forceInset={{ top: 'always' }}>
        <AnimatedHeader route={props.route} navigation={props.navigation} />
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0.31, y: 1 }}
          style={tailwind('z-40 flex-1 rounded-t-3xl')}
          colors={[themeColor.color5, themeColor.color4, themeColor.color3]}
        >
          <LinearGradient
            start={[0, 1]}
            end={[1, 0]}
            style={tailwind('z-50 m-2 mb-0 mt-2 flex-1 rounded-t-3xl p-6')}
            colors={[themeColor.color5, themeColor.color4, themeColor.color3]}
          >
            <View>
              <Text>About our League</Text>
            </View>
          </LinearGradient>
        </LinearGradient>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default About
