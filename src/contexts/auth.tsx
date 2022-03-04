import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  UserCredential,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth'
import {
  setDoc,
  doc,
  getDoc,
  query,
  where,
  collection,
  getDocs,
} from 'firebase/firestore'
import { FirebaseError } from 'firebase/app'
import toast from 'react-hot-toast'
import { auth, firestore } from '../config/firebase'
import { User } from '../types'

export type AuthProviderProps = {
  children: ReactNode
}

export type RegisterWithEmailAndPasswordParams = {
  name: string
  email: string
  password: string
}

export type SignInWithEmailAndPasswordParams = {
  email: string
  password: string
}

export type AuthContextValue = {
  user: User | null
  registerWithEmailAndPassword({
    email,
    name,
    password,
  }: RegisterWithEmailAndPasswordParams): Promise<void>
  signInWithEmailAndPassword({
    email,
    password,
  }: SignInWithEmailAndPasswordParams): Promise<void>
  signOut: () => Promise<void>
}

export const authContext = createContext({} as AuthContextValue)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  const registerWithEmailAndPassword = useCallback(
    async ({ email, name, password }: RegisterWithEmailAndPasswordParams) => {
      const getUserByNameQuery = query(
        collection(firestore, 'users'),
        where('name', '==', name)
      )
      const querySnapshot = (await getDocs(getUserByNameQuery)).docs[0]

      const firstMatched = querySnapshot.data() as User

      if (firstMatched) {
        toast.error(
          'The specified first name is already being used by another account.'
        )
        return
      }

      let credentials = {} as UserCredential

      try {
        credentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )
      } catch (e) {
        const error = e as FirebaseError

        switch (error.code) {
          case 'auth/auth/email-already-in-use':
            toast.error(
              'The specified email is already being used by another account.'
            )
            return
          case 'auth/email-already-exists':
            toast.error(
              'The specified email is already being used by another account.'
            )
            return
          case 'auth/invalid-email':
            toast.error('The specified email is invalid.')
            return
          default:
            toast.error(
              'An error happened while trying to register your account, try again later.'
            )
            return
        }
      }

      const newUser: User = {
        email: credentials.user.email,
        uid: credentials.user.uid,
        photoURL: credentials.user.photoURL,
        name,
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
      let credentials = {} as UserCredential

      try {
        credentials = await firebaseSignInWithEmailAndPassword(
          auth,
          email,
          password
        )
      } catch (e) {
        const error = e as FirebaseError

        switch (error.code) {
          case 'auth/wrong-password':
            toast.error('Password or email incorrect.')
            return
          case 'auth/user-not-found':
            toast.error('A user with the specified email does not exist.')
            return
          default:
            toast.error(
              'An error happened while trying to log you in, try again later.'
            )
            return
        }
      }

      const userDoc = doc(firestore, `users/${credentials.user.uid}`)

      const docSnapshot = await getDoc(userDoc)

      const userData = docSnapshot.data() as User

      setUser(userData)
    },
    []
  )

  const signOut = useCallback(() => firebaseSignOut(auth), [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      registerWithEmailAndPassword,
      signInWithEmailAndPassword,
      signOut,
    }),
    [user, registerWithEmailAndPassword, signInWithEmailAndPassword, signOut]
  )

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (persistedUser) => {
      if (persistedUser) {
        const userDoc = doc(firestore, `users/${persistedUser.uid}`)

        getDoc(userDoc).then((docSnapshot) =>
          setUser(docSnapshot.data() as User)
        )
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  return <authContext.Provider value={value}>{children}</authContext.Provider>
}

export const useAuth = () => useContext(authContext)
