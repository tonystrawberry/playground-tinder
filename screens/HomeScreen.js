import { View, Text, Button, SafeAreaView } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native"
import useAuth from "../hooks/useAuth"

const HomeScreen = () => {
  const navigation = useNavigation()
  const { logout } = useAuth()

  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
      <Button title="Go to Chat Screen" onPress={() => { navigation.navigate("Chat") }}/>

      <Button title="Logout" onPress={() => { logout() }} />
    </SafeAreaView>
  )
}

export default HomeScreen
