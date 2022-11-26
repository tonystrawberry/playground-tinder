import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./screens/HomeScreen"
import ChatScreen from "./screens/ChatScreen"
import LoginScreen from "./screens/LoginScreen"
import useAuth from "./hooks/useAuth"
const Stack = createNativeStackNavigator()


const StackNavigator = () => {
  const { user } = useAuth()

  return (
    <Stack.Navigator>
      { user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  )
}

export default StackNavigator
