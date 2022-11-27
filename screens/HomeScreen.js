import { View, Text, Button, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigation } from "@react-navigation/native"
import useAuth from "../hooks/useAuth"
import Ionicons from '@expo/vector-icons/Ionicons'
import Swiper from 'react-native-deck-swiper'
import Entypo from '@expo/vector-icons/Entypo'
import AntDesign from '@expo/vector-icons/AntDesign'
import { setDoc, doc, collection, onSnapshot, query, getDocs, where, serverTimestamp, getDoc } from '@firebase/firestore'
import { db } from "../firebase"
import generateId from "../lib/generateId"

const HomeScreen = () => {
  const navigation = useNavigation()
  const { user, logout } = useAuth()
  const [profiles, setProfiles] = useState([])
  const swipeRef = useRef(null)

  useLayoutEffect(() => onSnapshot(doc(db, "users", user.uid), snapshot => {
      if (!snapshot.exists()) {
        navigation.navigate("Modal")
      }
    }
  ), [])

  useEffect(() => {
    let unsub

    const fetchCards = async () => {
      const passes = await getDocs(collection(db, "users", user.uid, "passes")).then(snapshot => snapshot.docs.map(doc => (doc.id)))
      const swipes = await getDocs(collection(db, "users", user.uid, "swipes")).then(snapshot => snapshot.docs.map(doc => (doc.id)))

      // Use an array with "test" instead of empty array to prevent the error below
      // FirebaseError: Invalid Query. A non-empty array is required for 'not-in' filters.]
      const passedUserIds = passes.length > 0 ? passes : ["test"]
      const swipedUserIds = swipes.length > 0 ? swipes : ["test"]

      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where('id', 'not-in', [...passedUserIds, ...swipedUserIds])
        ), snapshot => {
            setProfiles(
              snapshot.docs
                .filter(doc => (doc.id !== user.uid))
                .map(doc => ({
                    id: doc.id,
                    ...doc.data()
                  })
                )
            )
          }
      )
    }

    fetchCards()

    return unsub
  }, [])

  const swipeLeft = async (cardIndex) => {
    const userSwiped = profiles[cardIndex]

    if (!userSwiped) return

    setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped)
  }

  const swipeRight = async (cardIndex) => {
    const userSwiped = profiles[cardIndex]

    if (!userSwiped) return
    const loggedInProfile = await (await getDoc(doc(db, "users", user.uid))).data()

    // Check if the user swiped on you...
    getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
      (documentSnapshot) => {
        if (documentSnapshot.exists()) {
          // Match
          setDoc(doc(db, "users", user.uid, "swipes", userSwiped.id), userSwiped)

          setDoc(doc(db, "matches", generateId(user.uid, userSwiped.id)), {
            users: {
              [user.uid]: loggedInProfile,
              [userSwiped.id]: userSwiped
            },
            usersMatched: [user.uid, userSwiped.id],
            timestamp: serverTimestamp()
          })

          // Navigate to the match screen
          navigation.navigate("Match", {
            loggedInProfile, userSwiped
          })
        } else {
          // No match
          setDoc(doc(db, "users", user.uid, "swipes", userSwiped.id), userSwiped)
        }
      }
    )


  }

  return (
    <SafeAreaView className="flex-1">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5">
        <TouchableOpacity onPress={() => logout()}>
          <Image source={{ uri: user.photoURL }} className="w-10 h-10 rounded-full" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
          <Image className="h-14 w-14" source={require("../assets/logo.png")} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864"/>
        </TouchableOpacity>
      </View>
      {/* End of Header */}

      <View className="flex-1 -mt-6">
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={(cardIndex) => {
            swipeLeft(cardIndex)
          }}
          onSwipedRight={(cardIndex) => {
            swipeRight(cardIndex)
          }}
          backgroundColor={"#4FD0E9"}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red"
                }
              }
            }, right: {
              title: "MATCH",
              style: {
                label: {
                  color: "#4DED30"
                }
              }
            }
          }}
          cards={profiles}
          renderCard={ card => card ? (
            <View key={card.id} className="bg-white h-3/4 rounded-xl">
              <Image className="absolute top-0 h-full w-full rounded-xl" source={{ uri: card.photoUrl }} />

              <View className="absolute bottom-0 bg-white w-full flex-row justify-between items-center h-20 px-6 py-2 rounded-b-xl shadow-xl">
                <View>
                  <Text className="text-xl font-bold">
                    { card.displayName }
                  </Text>
                  <Text>{ card.occupation }</Text>
                </View>

                <Text className="text-2xl font-bold">{ card.age }</Text>
              </View>
            </View>
          ) : (

            <View className="relative bg-white h-3/4 rounded-xl justify-center items-center shadow-xl">
              <Text className="font-bold pb-5">No more profiles</Text>
              <Image
                className="h-20 w-full"
                height={100}
                width={100}
                source={{ uri: "https://links.papareact.com/6gb" }}
              />
            </View>
          )}
        />
      </View>

      <View className="flex flex-row justify-evenly">
        <TouchableOpacity className="items-center justify-center rounded-full w-16 h-16 bg-red-200"
          onPress={() => swipeRef.current.swipeLeft()}
        >
          <Entypo name="cross" size={24} color="red"/>
        </TouchableOpacity>

        <TouchableOpacity className="items-center justify-center rounded-full w-16 h-16 bg-green-200"
          onPress={() => swipeRef.current.swipeRight()}
        >
          <AntDesign name="heart" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
