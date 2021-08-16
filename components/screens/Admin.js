import React, { useContext } from 'react'
import { HamburgerIcon, Pressable, Heading, VStack, Center, HStack, Text, Stack, Box } from 'native-base'
import tailwind from 'tailwind-rn'
import { UserContext } from '../../state/UserProvider'
import TeamForm from '../TeamForm'
import AnnouncementsForm from '../AnnouncementsForm'
import { ScrollView } from 'react-native'

const Home = (props) => {
  const user = useContext(UserContext)
  return (
    <ScrollView>
      <HStack style={tailwind('bg-green-400 p-6 mt-0 items-center')}>
        <Pressable onPress={() => props.navigation.toggleDrawer()} position="absolute" ml={2} zIndex={1}>
          <HamburgerIcon style={tailwind('ml-2')} size="sm" />
        </Pressable>
        <Center flex={1}>
          <Heading size="sm">{props.route.name}</Heading>
        </Center>
      </HStack>
      <Heading size="md">Hello, {user.email} </Heading>
      <VStack style={tailwind('pb-12')}>
        <TeamForm />
        <AnnouncementsForm />
      </VStack>
    </ScrollView>
  )
}

export default Home
