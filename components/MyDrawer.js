import React, { useContext } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { Box, Button } from 'native-base'
import CustomDrawerContent from './CustomDrawerContent'
import { LeagueInfoContext } from '../state/LeagueInfoContext'

// screens
import Home from './screens/Home'
import Rosters from './screens/Rosters'
import Schedule from './screens/Schedule'
import Standings from './screens/Standings'
import FreeAgents from './screens/FreeAgents'
import About from './screens/About'
import Admin from './screens/Admin'
import { UserContext } from '../state/UserProvider'

const Drawer = createDrawerNavigator()

const MyDrawer = () => {
  const info = useContext(LeagueInfoContext)
  const user = useContext(UserContext)
  return (
    <Box safeArea flex={1}>
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Rosters" component={Rosters} />
        <Drawer.Screen name="Schedule" component={Schedule} />
        <Drawer.Screen name="Standings" component={Standings} />
        <Drawer.Screen name="Free Agents" component={FreeAgents} />
        <Drawer.Screen name="About" component={About} />
        {info.map((e) => e.playoffs && <Drawer.Screen key={e.id} name="Playoff Bracket" component={FreeAgents} />)}
        {user && <Drawer.Screen name="Admin" component={Admin} />}
      </Drawer.Navigator>
    </Box>
  )
}

export default MyDrawer
