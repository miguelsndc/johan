import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react'
import nookies from 'nookies'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  UserCredential,
  signOut as firebaseSignOut,
  onIdTokenChanged,
  getIdToken,
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
  signOut: () => Promise<void>
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
      const getUserByFirstNameQuery = query(
        collection(firestore, 'users'),
        where('firstName', '==', firstName)
      )
      const querySnapshot = (await getDocs(getUserByFirstNameQuery)).docs[0]

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
    const unsubscribe = onIdTokenChanged(auth, (persistedUser) => {
      if (persistedUser) {
        const userDoc = doc(firestore, `users/${persistedUser.uid}`)

        getIdToken(persistedUser).then((token) => {
          nookies.set(undefined, 'token', token, { path: '/' })
        })

        getDoc(userDoc).then((docSnapshot) =>
          setUser(docSnapshot.data() as User)
        )
      } else {
        nookies.set(undefined, 'token', '', { path: '/' })
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  console.log(user)

  useEffect(() => {
    const handle = setInterval(async () => {
      const { currentUser } = auth

      if (currentUser) await getIdToken(currentUser, true)
    }, 10 * 60 * 1000)

    return () => clearInterval(handle)
  }, [])

  return <authContext.Provider value={value}>{children}</authContext.Provider>
}

export const useAuth = () => useContext(authContext)
