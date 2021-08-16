import React, { useContext, useState } from 'react'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Box, Pressable, VStack, Text, HStack, Divider, Icon, FlatList, FormControl, Input, Button } from 'native-base'
import { LeagueInfoContext } from '../state/LeagueInfoContext'
import { auth } from '../firebase'
import { UserContext } from '../state/UserProvider'
import { LinearGradient } from 'expo-linear-gradient'
import tailwind from 'tailwind-rn'
import { themeColor } from '../styles'
import LogInForm from './LogInForm'

const getIcon = (screenName) => {
  switch (screenName) {
    case 'Home':
      return 'home'
    case 'Rosters':
      return 'handball'
    case 'Schedule':
      return 'calendar-week'
    case 'Standings':
      return 'trophy'
    case 'About':
      return 'book'
    case 'Free Agents':
      return 'human-male-female'
    case 'Playoff Bracket':
      return 'trophy'
    case 'Admin':
      return 'account-arrow-right'
    default:
      return undefined
  }
}

const CustomDrawerContent = (props) => {
  const info = useContext(LeagueInfoContext)
  const user = useContext(UserContext)
  
  const [formData, setData] = React.useState({})
  const [errors, setErrors] = React.useState({})
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const validate = () => {
    if (formData.email === undefined) {
      setErrors({
        ...errors,
        email: 'Email is required',
      })
      return false
    } else if (formData.email.length < 6) {
      setErrors({
        ...errors,
        email: 'Email is too short',
      })
      return false
    }
    return true
  }

  const onSubmit = () => {
    validate() ? auth.signInWithEmailAndPassword(formData.email, formData.password) : console.log('Validation Failed')
  }

  return (
      <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0.31, y: 1 }}
          style={tailwind('z-40 flex-1 rounded-t-3xl')}
          colors={['#fff', themeColor.color1]}
      >
    <DrawerContentScrollView {...props} safeArea>
        <VStack space={6} my={2} mx={1}>
          <FlatList
            p={3}
            mt={4}
            style={{ width: '100%' }}
            data={info}
            renderItem={({ item }) => (
              <>
                <Box px={4}>
                  <Text bold color={themeColor.color5}>
                    {item.name}
                  </Text>
                  <Text fontSize={14} mt={1} color="gray.500" fontWeight={500}>
                    {item.contact}
                  </Text>
                </Box>
                <VStack mt={4} divider={<Divider bg={themeColor.color5} />} space={4}>
                  <VStack space={3}>
                    {props.state.routeNames.map((name, index) => (
                      <Pressable
                        px={5}
                        py={3}
                        rounded="md"
                        bg={index === props.state.index ? themeColor.color4 : 'transparent'}
                        onPress={(event) => {
                          props.navigation.navigate(name)
                        }}
                        key={name + index}
                      >
                        <HStack space={7} alignItems="center">
                          <Icon
                            color={index === props.state.index ? '#fff': themeColor.color5}
                            size={5}
                            as={<MaterialCommunityIcons name={getIcon(name)} />}
                          />
                          <Text fontWeight={500} color={index === props.state.index ? '#fff' : themeColor.color5}>
                            {name}
                          </Text>
                        </HStack>
                      </Pressable>
                    ))}
                  </VStack>

                  {user ? (
                    <Button bg={themeColor.color4} _text={{color: 'white'}} onPress={() => auth.signOut()}>Log Out</Button>
                  ) : (
                    <LogInForm />
                  )}
                </VStack>
              </>
            )}
            keyExtractor={(item) => item.id}
          />
        </VStack>
    </DrawerContentScrollView>
      </LinearGradient>
  )
}

export default CustomDrawerContent
