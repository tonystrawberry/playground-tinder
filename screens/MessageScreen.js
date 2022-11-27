import { Button, FlatList, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from "../components/Header"
import getMatchedUserInfo from "../lib/getMatchedUserInfo"
import useAuth from "../hooks/useAuth"
import { useRoute } from "@react-navigation/native"
import SenderMessage from "../components/SenderMessage"
import ReceiverMessage from "../components/ReceiverMessage"
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase"

const MessageScreen = () => {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([])
  const { user } = useAuth()
  const { params: { matchDetails } } = useRoute()

  useEffect(() =>
    onSnapshot(
      query(
        collection(db, "matches", matchDetails.id, "messages"),
        orderBy("timestamp", "desc"),
      ),
      snapshot => setMessages(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })))
    )
  , [matchDetails, db])

  const sendMessage = () => {
    addDoc(collection(db, "matches", matchDetails.id, "messages"), {
      timestamp: serverTimestamp(),
      userId: user.uid,
      displayName: user.displayName,
      photoUrl: matchDetails.users[user.uid].photoUrl,
      message: input
    })

    setInput("")
  }

  return (
    <SafeAreaView className="flex-1">
      <Header title={getMatchedUserInfo(matchDetails.users, user.uid).displayName} callEnabled />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            inverted={-1}
            className="pl-4 py-2"
            keyExtractor={item => item.id}
            renderItem={({ item: message }) =>
              message.userId === user.uid ? (
                <SenderMessage key={message.id} message={message} />
              ) : (
                <ReceiverMessage key={message.id} message={message} />
              )
            }
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <View
        className="flex-row justify-between bg-white items-center border-t border-gray-200 px-5 py-2"
      >
        <TextInput
          className="h-10 text-lg"
          placeholder="Send message..."
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
          value={input}
        />
        <Button onPress={sendMessage} title="Send" color="#FF5864" />
      </View>
    </SafeAreaView>
  )
}

export default MessageScreen
