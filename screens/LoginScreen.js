import { View, Text, Button, SafeAreaView } from 'react-native'
import React from 'react'
import useAuth from "../hooks/useAuth"

const LoginScreen = () => {
  const { promptAsync } = useAuth()

  return (
    <SafeAreaView>
      <Text>LoginScreen</Text>
      <Button title="Login" onPress={() => { promptAsync() }} />
    </SafeAreaView>
  )
}

export default LoginScreen
