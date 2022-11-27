import { View, ImageBackground, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import useAuth from "../hooks/useAuth"
import { useNavigation } from "@react-navigation/native"

const LoginScreen = () => {
  const { login, loading } = useAuth()
  const navigation = useNavigation()

  return (
    <View className="flex-1">
      <ImageBackground resizeMode="cover" className="flex-1" source={{ uri: "https://tinder.com/static/tinder.png" }}>
        <TouchableOpacity className="absolute bottom-40 w-52 bg-white p-4 rounded-2xl" style={{ marginHorizontal: "25%" }} onPress={() => login()}>
          <Text className="font-semibold text-center">Sign in</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

export default LoginScreen
