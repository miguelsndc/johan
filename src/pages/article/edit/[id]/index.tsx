import Head from 'next/head'
import { useCallback, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { v4 as uuid } from 'uuid'
import {
  collection,
  updateDoc,
  getDoc,
  doc as firestoreDoc,
  setDoc as setFirestoreDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore'
import { toKebabCase } from '../../../../helpers/to-kebab-case'
import { Layout, MarkdownEditorContainer } from '../../../../components'
import { firestore } from '../../../../config/firebase'
import { useAuth } from '../../../../contexts/auth'
import { Post, User } from '../../../../types'

type Draft = {
  id: string
  name: string
  author: User
  createdAt: string
  content: string
}

export default function CreateArticlePage() {
  const [draft, setDraft] = useState<Draft | null>(null)
  const [doc, setDoc] = useState('')
  const [loading, setLoading] = useState(true)
  const [alreadyExistingPost, setAlreadyExistingPost] = useState<Post | null>(
    null
  )
  const [isHeaderHidden, setIsHeaderHidden] = useState(true)
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
    setDoc(newDoc)
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

      const isAlreadyPostedQuery = query(
        postsCollection,
        where('draftId', '==', draftData!.id)
      )

      const existingPost = (
        await getDocs(isAlreadyPostedQuery)
      ).docs[0]?.data() as Post

      if (existingPost) {
        setAlreadyExistingPost(existingPost)
      }

      if (draftData) {
        setDraft(draftData)
        setDoc(draftData.content)
        setLoading(false)
      }
    }

    if (router.isReady && user) setup()
  }, [id, user, router.isReady])

  return (
    <>
      <Head>
        <title>Johan | {draft?.name || 'Setting up...'}</title>
      </Head>
      <Layout isHeaderHidden={isHeaderHidden}>
        {!loading && (
          <MarkdownEditorContainer
            doc={doc}
            onSave={handleSave}
            onToggleHeaderVisibility={setIsHeaderHidden}
            isHeaderHidden={isHeaderHidden}
            onPost={handlePostSubmit}
            onDocChange={handleDocChange}
            alreadyExistingPost={!!alreadyExistingPost}
            editMode
          />
        )}
      </Layout>
    </>
  )
}
