import React, { useRef, useContext } from 'react'
import { TeamStateContext } from '../../state/TeamStateContext'
import { AntDesign } from '@expo/vector-icons'
import { UserContext } from '../../state/UserProvider'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SafeAreaView from 'react-native-safe-area-view'
import { LinearGradient } from 'expo-linear-gradient'
import { themeColor } from '../../styles'
import { Pressable, Box, Text } from 'native-base'
import tailwind from 'tailwind-rn'
import AnimatedHeader from '../AnimatedHeader'

import db from '../../firebase'
import Border from '../Border'

const Standings = (props) => {
  const teams = useContext(TeamStateContext)
  const user = useContext(UserContext)
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: themeColor.color2 }} forceInset={{ top: 'always' }}>
        <AnimatedHeader route={props.route} navigation={props.navigation} />
        <Border>
          <Box style={tailwind('mt-8 p-4')}>
            <Box style={tailwind('flex flex-wrap flex-row mb-2 pb-1')}>
              <Box style={tailwind('flex-1')}>
                <Text style={[tailwind('pl-3'), { color: themeColor.color1 }]}>Team</Text>
              </Box>
              <Box style={tailwind('flex-1')}>
                <Text style={[tailwind('text-right pr-10'), { color: themeColor.color1 }]}>Wins</Text>
              </Box>
              <Box style={tailwind('flex-1')}>
                <Text style={[tailwind('text-right pr-10'), { color: themeColor.color1 }]}>Losses</Text>
              </Box>
            </Box>
            <Box style={tailwind('overflow-hidden rounded-lg')}>
              {teams.map((e, i) => {
                return (
                  <Box
                    key={e + i + 'key'}
                    style={[
                      tailwind(`flex flex-wrap flex-row mb-0 px-2 py-3`),
                      { backgroundColor: (i % 2 === 0 && themeColor.color1) || (i % 2 != 0 && themeColor.color5) },
                    ]}
                  >
                    <Box style={tailwind('flex-1')}>
                      <Text style={{ color: (i % 2 === 0 && themeColor.color5) || (i % 2 != 0 && themeColor.color1) }}>
                        {e.teamName}
                      </Text>
                    </Box>
                    <Box style={tailwind(`flex-1 ${user ? 'flex flex-row justify-between' : ''}`)}>
                      {user && (
                        <Pressable
                          onPress={() => {
                            const teamRef = db.collection('teams').doc(e.teamName)
                            teamRef.update({
                              wins: e.wins + 1,
                            })
                          }}
                        >
                          <AntDesign style={tailwind('px-1')} name="pluscircle" size={24} color="black" />
                        </Pressable>
                      )}
                      <Text
                        style={[
                          tailwind(`${user ? '' : 'text-right pr-6'}`),
                          { color: (i % 2 === 0 && themeColor.color5) || (i % 2 != 0 && themeColor.color1) },
                        ]}
                      >
                        {e.wins}
                      </Text>
                      {user && (
                        <Pressable
                          onPress={() => {
                            const teamRef = db.collection('teams').doc(e.teamName)
                            teamRef.update({
                              wins: e.wins - 1,
                            })
                          }}
                        >
                          <AntDesign style={tailwind('px-1')} name="minuscircle" size={24} color="black" />
                        </Pressable>
                      )}
                    </Box>
                    <Box style={tailwind(`flex-1 ${user ? 'flex flex-row justify-between' : ''}`)}>
                      {user && (
                        <Pressable
                          onPress={() => {
                            const teamRef = db.collection('teams').doc(e.teamName)
                            teamRef.update({
                              losses: e.losses + 1,
                            })
                          }}
                        >
                          <AntDesign style={tailwind('px-1')} name="pluscircle" size={24} color="black" />
                        </Pressable>
                      )}
                      <Text
                        style={[
                          tailwind(`${user ? '' : 'text-right pr-6'}`),
                          { color: (i % 2 === 0 && themeColor.color5) || (i % 2 != 0 && themeColor.color1) },
                        ]}
                      >
                        {e.losses}
                      </Text>
                      {user && (
                        <Pressable
                          onPress={() => {
                            const teamRef = db.collection('teams').doc(e.teamName)
                            teamRef.update({
                              losses: e.losses - 1,
                            })
                          }}
                        >
                          <AntDesign style={tailwind('px-1')} name="minuscircle" size={24} color="black" />
                        </Pressable>
                      )}
                    </Box>
                  </Box>
                )
              })}
            </Box>
          </Box>
        </Border>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Standings
