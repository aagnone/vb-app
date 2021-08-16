import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import TeamStateProvider from './state/TeamStateContext'
import MyDrawer from './components/MyDrawer'
import LeagueInfoProvider from './state/LeagueInfoContext'
import AnnouncementsProvider from './state/AnnouncementsContext'
import UserProvider from './state/UserProvider'
import { LogBox } from 'react-native';



export default function App() {
  LogBox.ignoreLogs(['Setting a timer', 'VirtualizedLists']);
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <TeamStateProvider>
          <LeagueInfoProvider>
            <AnnouncementsProvider>
              <UserProvider>
                <MyDrawer />
              </UserProvider>
            </AnnouncementsProvider>
          </LeagueInfoProvider>
        </TeamStateProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  )
}
