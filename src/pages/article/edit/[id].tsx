import Head from 'next/head'
import { useCallback, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { createPortal } from 'react-dom'
import {
  collection,
  updateDoc,
  getDoc,
  doc as getDocRef,
} from 'firebase/firestore'
import { Layout, MdEditorContainer } from '../../../components'
import { firestore } from '../../../config/firebase'
import { useAuth } from '../../../contexts/auth'
import { styled, theme } from '../../../../stitches.config'
import Spinner from '../../../components/spinner'
import useMounted from '../../../hooks/use-mounted'

type Draft = {
  id: string
  name: string
  authorId: string
  createdAt: string
  content: string
}

const Overlay = styled('div', {
  position: 'absolute',
  inset: 0,
  background: '$gray800',
  opacity: 0.85,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',

  p: {
    color: '$gray300',
    marginTop: '0.75rem',
    fontFamily: '$mono',
    fontSize: '1.25rem',
  },
})

export default function CreateArticlePage() {
  const [draft, setDraft] = useState<Draft | null>(null)
  const [doc, setDoc] = useState('')
  const [loading, setLoading] = useState(true)
  const [isHeaderHidden, setIsHeaderHidden] = useState(false)
  const { user } = useAuth()
  const mounted = useMounted()
  const router = useRouter()
  const { id } = router.query

  const handleSave = useCallback(
    async (docSnapshot: string) => {
      const newDraft = { ...draft, content: docSnapshot }

      const currentUserDraftsCollection = collection(
        firestore,
        `users/${user?.uid}/drafts`
      )

      const docRef = getDocRef(currentUserDraftsCollection, String(id))

      await updateDoc(docRef, newDraft)
    },
    [draft, id, user?.uid]
  )

  const handlePostSubmit = useCallback(
    async (docSnapshot: string) => console.log(docSnapshot),
    []
  )

  const handleDocChange = useCallback(
    async (newDoc: string) => setDoc(newDoc),
    []
  )

  useEffect(() => {
    const setup = async () => {
      const currentUserDraftsCollection = collection(
        firestore,
        `users/${user?.uid}/drafts`
      )

      const docRef = getDocRef(currentUserDraftsCollection, String(id))

      const docSnapshot = await getDoc(docRef)

      const draftData = docSnapshot.data() as Draft

      if (draftData) {
        setDraft(draftData)
        setDoc(draftData.content)

        setTimeout(() => {
          setLoading(false)
        }, 1000)
      }
    }

    if (router.isReady) setup()
  }, [id, user, router.isReady])

  return (
    <>
      <Head>
        <title>Johan | {draft?.name || 'Setting up...'}</title>
      </Head>
      <Layout isHeaderHidden={isHeaderHidden}>
        {!loading ? (
          <MdEditorContainer
            doc={doc}
            onSave={handleSave}
            onToggleHeaderVisibility={setIsHeaderHidden}
            isHeaderHidden={isHeaderHidden}
            onPost={handlePostSubmit}
            onDocChange={handleDocChange}
          />
        ) : (
          <div aria-modal='true'>
            {mounted &&
              createPortal(
                <Overlay>
                  <Spinner size={64} color={String(theme.colors.gray300)} />
                  <p>Getting everything up and running for you...</p>
                </Overlay>,
                document.body
              )}
          </div>
        )}
      </Layout>
    </>
  )
}
