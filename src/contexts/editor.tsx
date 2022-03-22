import {
  createContext,
  ReactNode,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useContext,
} from 'react'
import { v4 as uuid } from 'uuid'
import { useRouter } from 'next/router'
import {
  collection,
  updateDoc,
  doc as firestoreDoc,
  setDoc as setFirestoreDoc,
  getDoc,
  query,
  getDocs,
  where,
} from 'firebase/firestore'
import { useAuth } from './auth'
import type { Post, User } from '../types'
import { toKebabCase } from '../helpers/to-kebab-case'
import { firestore } from '../config/firebase'

type ProviderProps = {
  children: ReactNode
}

type Draft = {
  id: string
  name: string
  author: User
  createdAt: string
  description?: string
  content: string
}

type ContextValue = {
  draft: Draft | null
  loading: boolean
  alreadyExistingPost: Post | null
  handleSave: (docSnapshot: string) => Promise<void>
  handlePostSubmit: (docSnapshot: string) => Promise<Post>
  handleDocChange: (newDoc: string) => Promise<void>
}

export const editorContext = createContext({} as ContextValue)

export function EditorProvider({ children }: ProviderProps) {
  const [draft, setDraft] = useState<Draft | null>({ content: '' } as Draft)
  const [loading, setLoading] = useState(true)
  const [alreadyExistingPost, setAlreadyExistingPost] = useState<Post | null>(
    null
  )
  const { user } = useAuth()
  const router = useRouter()

  const { id } = router.query

  const handleSave = useCallback(
    async (docSnapshot: string) => {
      const newDraft = { ...draft, content: docSnapshot }

      const currentUserDraftsCollection = collection(
        firestore,
        `users/${user?.uid}/drafts`
      )

      const docRef = firestoreDoc(currentUserDraftsCollection, String(id))

      await updateDoc(docRef, newDraft)
    },
    [draft, id, user?.uid]
  )

  const handlePostSubmit = useCallback(
    async (docSnapshot: string) => {
      const postsCollection = collection(firestore, 'posts')

      if (alreadyExistingPost) {
        const existingPostRef = firestoreDoc(
          firestore,
          'posts',
          alreadyExistingPost.id
        )

        await updateDoc(existingPostRef, {
          content: docSnapshot,
        })

        return alreadyExistingPost
      }

      const postId = `${toKebabCase(draft!.name)}-${uuid()}`

      const newPost = {
        id: postId,
        name: draft!.name,
        description: draft?.description ?? null,
        author: user!,
        draftId: draft!.id,
        createdAt: new Date().toISOString(),
        content: docSnapshot,
      }

      const newPostRef = firestoreDoc(postsCollection, newPost.id)

      await setFirestoreDoc(newPostRef, newPost)

      return newPost
    },
    [user, draft, alreadyExistingPost]
  )

  const handleDocChange = useCallback(async (newDoc: string) => {
    setDraft((prevState) => ({ ...prevState!, content: newDoc }))
  }, [])

  useEffect(() => {
    const setup = async () => {
      const currentUserDraftsCollection = collection(
        firestore,
        `users/${user?.uid}/drafts`
      )
      const postsCollection = collection(firestore, 'posts')

      const docRef = firestoreDoc(currentUserDraftsCollection, String(id))

      const docSnapshot = await getDoc(docRef)

      const draftData = docSnapshot.data() as Draft

      if (!draftData) return

      const isAlreadyPostedQuery = query(
        postsCollection,
        where('draftId', '==', draftData.id)
      )

      const existingPost = (
        await getDocs(isAlreadyPostedQuery)
      ).docs[0]?.data() as Post

      if (existingPost) {
        setAlreadyExistingPost(existingPost)
      }

      if (draftData) {
        setDraft(draftData)
        setLoading(false)
      }
    }

    if (router.isReady && user) setup()
  }, [id, user, router.isReady])

  const memoized = useMemo(
    () => ({
      draft,
      loading,
      alreadyExistingPost,
      handleSave,
      handlePostSubmit,
      handleDocChange,
    }),
    [
      alreadyExistingPost,
      draft,
      handleDocChange,
      handlePostSubmit,
      handleSave,
      loading,
    ]
  )

  return (
    <editorContext.Provider value={memoized}>{children}</editorContext.Provider>
  )
}

export const useEditor = () => useContext(editorContext)
