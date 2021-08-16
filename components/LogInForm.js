import React from 'react'
import { auth } from '../firebase'
import { VStack, FormControl, Input, Button, View } from 'native-base'
import { themeColor } from '../styles'
import { LinearGradient } from 'expo-linear-gradient'
import { Pressable, Text } from 'react-native'
import tailwind from 'tailwind-rn'

const LogInForm = () => {
  const [formData, setData] = React.useState({})
  const [errors, setErrors] = React.useState({})
  const [show, setShow] = React.useState(false)
  const [isFocusEmail, setIsFocusEmail] = React.useState(false)
  const [isFocusPassword, setIsFocusPassword] = React.useState(false)
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
    <VStack width="90%" mx={3}>
      <FormControl isRequired>
        <FormControl.Label _text={{ bold: true }}>Email</FormControl.Label>
        <LinearGradient
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          colors={isFocusEmail ? [themeColor.color5, themeColor.color4] : [themeColor.color4, themeColor.color5]}
          style={tailwind('overflow-hidden rounded-md')}
        >
          <View style={[{ backgroundColor: 'white', margin: 3 }, tailwind('overflow-hidden')]}>
            <Input
              onBlur={() => setIsFocusEmail(false)}
              onFocus={() => setIsFocusEmail(true)}
              variant="unstyled"
              placeholder="email"
              placeholderTextColor={themeColor.color5}
              onChangeText={(value) => setData({ ...formData, email: value })}
            />
          </View>
        </LinearGradient>
      </FormControl>
      <FormControl isRequired>
        <FormControl.Label _text={{ bold: true }}>Password</FormControl.Label>
        <LinearGradient
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          colors={isFocusPassword ? [themeColor.color5, themeColor.color4] : [themeColor.color4, themeColor.color5]}
          style={tailwind('overflow-hidden rounded-md')}
        >
          <View style={[{ backgroundColor: 'white', margin: 3 }, tailwind('overflow-hidden')]}>
            <Input
              type={show ? 'text' : 'password'}
              onChangeText={(value) => setData({ ...formData, email: value })}
              InputRightElement={
                <Pressable style={[tailwind('mr-1 p-1 rounded-md'), {backgroundColor: themeColor.color1}]} onPress={handleClick}>
                  <Text style={{color: themeColor.color4}}>{show ? 'Hide' : 'Show'}</Text>
                </Pressable>
              }
              onBlur={() => setIsFocusPassword(false)}
              onFocus={() => setIsFocusPassword(true)}
              variant="unstyled"
              placeholder="password"
              placeholderTextColor={themeColor.color5}
              onChangeText={(value) => setData({ ...formData, password: value })}
            />
          </View>
        </LinearGradient>
      </FormControl>
      <Button bg={themeColor.color4} _text={{color: 'white'}} onPress={onSubmit} mt={5} colorScheme="cyan">
        Submit
      </Button>
    </VStack>
  )
}

export default LogInForm
