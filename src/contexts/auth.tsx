import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { auth, firestore } from '../config/firebase'

type AuthProviderProps = {
  children: ReactNode
}

type User = {
  email: string | null
  photoURL: string | null
  uid: string
  createdAt: string
  firstName: string
  lastName: string
}

type RegisterWithEmailAndPasswordParams = {
  firstName: string
  lastName: string
  email: string
  password: string
}

type SignInWithEmailAndPasswordParams = {
  email: string
  password: string
}

type AuthContextValue = {
  user: User | null
  registerWithEmailAndPassword({
    email,
    firstName,
    lastName,
    password,
  }: RegisterWithEmailAndPasswordParams): Promise<void>
  signInWithEmailAndPassword({
    email,
    password,
  }: SignInWithEmailAndPasswordParams): Promise<void>
}

const authContext = createContext({} as AuthContextValue)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  const registerWithEmailAndPassword = useCallback(
    async ({
      email,
      firstName,
      lastName,
      password,
    }: RegisterWithEmailAndPasswordParams) => {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const newUser: User = {
        email: credentials.user.email,
        uid: credentials.user.uid,
        photoURL: credentials.user.photoURL,
        firstName,
        lastName,
        createdAt: new Date().toISOString(),
      }

      const newUserRef = doc(firestore, `users/${newUser.uid}`)

      await setDoc(newUserRef, newUser)

      setUser(newUser)
    },
    []
  )

  const signInWithEmailAndPassword = useCallback(
    async ({ email, password }: SignInWithEmailAndPasswordParams) => {
      // eslint-disable-next-line no-console
      console.log(email, password)
    },
    []
  )

  const value = useMemo(
    () => ({
      user,
      registerWithEmailAndPassword,
      signInWithEmailAndPassword,
    }),
    [user, registerWithEmailAndPassword, signInWithEmailAndPassword]
  )

  return <authContext.Provider value={value}>{children}</authContext.Provider>
}

export const useAuth = () => useContext(authContext)
