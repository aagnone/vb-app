import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import tailwind from 'tailwind-rn'
import { themeColor } from '../styles'

const Border = (props) => {
  return (
    <LinearGradient
      start={{ x: 1, y: 0 }}
      end={{ x: 0.31, y: 1 }}
      style={tailwind('z-40 flex-1 rounded-t-3xl')}
      colors={['#fff', themeColor.color1, themeColor.color5]}
    >
      <LinearGradient
        start={[0, 1]}
        end={[1, 0]}
        style={tailwind('z-50 m-2 mb-0 mt-2 flex-1 rounded-t-3xl overflow-hidden')}
        colors={[themeColor.color5, themeColor.color4, themeColor.color3]}
      >
        {props.children}
      </LinearGradient>
    </LinearGradient>
  )
}

export default Border
