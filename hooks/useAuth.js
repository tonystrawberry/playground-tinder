import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential, signOut } from '@firebase/auth'
import { auth } from "../firebase"

const AuthContext = createContext({})

WebBrowser.maybeCompleteAuthSession();

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const [loadingInitial, setLoadingInitial] = useState(true)
  const [loading, setLoading] = useState(false)

  const [_request, response, promptAsync] = Google.useAuthRequest(
    {
      expoClientId: '787923097093-7jj643que85aidebqi89u1uek6mesm05.apps.googleusercontent.com',
    },
  )

  async function login(){
    setLoading(true)
    await promptAsync()
  }

  async function logout() {
    setLoading(true)
    signOut(auth).catch((error) => setError(error)).finally(() => setLoading(false))
  }


  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        setLoading(true)

        if (user) {
          setUser(user)
        } else {
          setUser(null)
        }

        setLoadingInitial(false)
      }),
    []
  )

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication: { idToken, accessToken } } = response;
      signInWithCredential(auth, GoogleAuthProvider.credential(idToken, accessToken)).catch((error) => setError(error)).finally(() => setLoading(false))
    }
  }, [response])

  const memoedValue = useMemo(() => ({
    user,
    loading,
    error,
    login,
    logout
  }), [user, loading, error])

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
