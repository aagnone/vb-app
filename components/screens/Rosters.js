import React, { useContext, useState, useRef } from 'react'
import { TeamStateContext } from '../../state/TeamStateContext'
import tailwind from 'tailwind-rn'
import AnimatedHeader from '../AnimatedHeader'
import { TouchableOpacity, View, Text } from 'react-native'
import { Transition, Transitioning } from 'react-native-reanimated'
import { themeColor } from '../../styles'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SafeAreaView from 'react-native-safe-area-view'
import Border from '../Border'

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
)

const colors = [
  { bg: '#3B8686', color: '#CFF09E' },
  { bg: '#0B486B', color: '#CFF09E' },
  { bg: '#A8DBA8', color: '#0B486B' },
  { bg: '#79BD9A', color: '#0B486B' },
  { bg: '#CFF09E', color: '#0B486B' },
  { bg: '#0B486B', color: '#CFF09E' },
  { bg: '#CFF09E', color: '#0B486B' },
  { bg: '#A8DBA8', color: '#0B486B' },
  { bg: '#79BD9A', color: '#0B486B' },
  { bg: '#3B8686', color: '#CFF09E' },
]

const Rosters = (props) => {
  const teams = useContext(TeamStateContext)
  const [currentIndex, setCurrentIndex] = useState(null)
  const ref = useRef()
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: themeColor.color2 }} forceInset={{ top: 'always' }}>
        <AnimatedHeader route={props.route} navigation={props.navigation} />
        <Border>
          <Transitioning.View ref={ref} transition={transition} style={tailwind('flex-1')}>
            {teams.map(({ teamName, roster }, index) => {
              return (
                <TouchableOpacity
                  key={teamName}
                  onPress={() => {
                    ref.current.animateNextTransition()
                    setCurrentIndex(index === currentIndex ? null : index)
                  }}
                  style={tailwind('justify-center')}
                  activeOpacity={0.9}
                >
                  <View style={[tailwind('pl-6 flex justify-center'), { backgroundColor: colors[index].bg }]}>
                    <Text
                      style={[
                        tailwind('uppercase text-2xl font-bold p-2 tracking-tight'),
                        { color: colors[index].color },
                      ]}
                    >
                      {teamName}
                    </Text>
                    {index === currentIndex && (
                      <View style={tailwind('mt-2 pb-4')}>
                        {roster.map((e) => (
                          <Text key={e} style={[tailwind('text-base ml-6'), { color: colors[index].color }]}>
                            {e}
                          </Text>
                        ))}
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              )
            })}
          </Transitioning.View>
        </Border>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Rosters
