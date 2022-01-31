import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
} from 'firebase/auth'
import { setDoc, doc, getDoc } from 'firebase/firestore'
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
      const credentials = await firebaseSignInWithEmailAndPassword(
        auth,
        email,
        password
      )

      const userDoc = doc(firestore, `users/${credentials.user.uid}`)

      const docSnapshot = await getDoc(userDoc)

      const userData = docSnapshot.data() as User

      setUser(userData)
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
