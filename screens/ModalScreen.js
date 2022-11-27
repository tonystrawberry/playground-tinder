import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import useAuth from "../hooks/useAuth"
import { doc, setDoc, serverTimestamp } from '@firebase/firestore'
import { db } from "../firebase"
import { useNavigation } from "@react-navigation/native"

const ModalScreen = () => {
  const { user } = useAuth()
  const navigation = useNavigation()

  const [image, setImage] = useState(null)
  const [occupation, setOccupation] = useState(null)
  const [age, setAge] = useState(null)

  const incompleteForm = !image || !occupation || !age

  const updateUserProfile = () => {
    setDoc(doc(db, 'users', user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoUrl: image,
      occupation: occupation,
      age: age,
      timestamp: serverTimestamp()
    }).then(() => {
      navigation.navigate("Home")
    }).catch((error) => [
      alert(error.message)
    ])
  }

  return (
    <View className="flex-1 items-center pt-1">
      <Image
        className="h-20 w-full"
        resizeMode="contain"
        source={{ uri: "https://links.papareact.com/2pf" }}
      />

      <Text className="text-xl text-gray-500 p-2 font-bold">
        Welcome { user.displayName }
      </Text>

      <Text className="text-center p-4 font-bold text-red-400">
        Step 1: the profile picture
      </Text>

      <TextInput
        value={image}
        onChangeText={setImage}
        className="text-center text-xl pb-2"
        placeholder="Enter a Profile Pic URL"
      />


      <Text className="text-center p-4 font-bold text-red-400">
        Step 2: the job
      </Text>

      <TextInput
        value={occupation}
        onChangeText={setOccupation}
        className="text-center text-xl pb-2"
        placeholder="Enter your occupation"
      />


      <Text className="text-center p-4 font-bold text-red-400">
        Step 3: the age
      </Text>

      <TextInput
        value={age}
        onChangeText={setAge}
        className="text-center text-xl pb-2"
        placeholder="Enter your age"
        maxLength={2}
        numeric
        keyboardType="numeric"
      />

      <TouchableOpacity className={`w-64 p-3 rounded-xl absolute bottom-10 ${incompleteForm ? "bg-gray-400" : "bg-red-400"}`} disabled={incompleteForm} onPress={updateUserProfile}>
        <Text className="text-center text-white text-xl">Update profile</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ModalScreen
