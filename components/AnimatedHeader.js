import React from 'react'
import { Animated, ImageBackground, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'; 
import { HamburgerIcon, Pressable, Heading, Center, HStack, Box, Text } from 'native-base'
import tailwind from 'tailwind-rn'
import { themeColor } from '../styles'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AnimatedHeader = (props) => {
  return (
    <View style={[tailwind('flex items-center justify-between flex-row'), {backgroundColor: themeColor.color2}]}>
      <View style={tailwind('flex flex-row justify-start items-center ml-8')}>
        <MaterialCommunityIcons style={tailwind('pt-1 mr-2')} name="volleyball" size={36} color={themeColor.color5} />
        <Heading style={[tailwind('font-bold text-gray-900'), { fontSize: 36, color: themeColor.color5 }]}>{props.route.name}</Heading>
      </View>
      <Pressable onPress={() => props.navigation.toggleDrawer()} style={[tailwind('rounded-l-full p-2 mr-4')]} zIndex={1}>
        <MaterialIcons name="menu-open" size={40} color={themeColor.color5} />
      </Pressable>
    </View>
  )
}

export default AnimatedHeader
