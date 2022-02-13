import Head from 'next/head'
import { useCallback, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Layout, MdEditorContainer } from '../../../components'
import { firestore } from '../../../config/firebase'
import { useAuth } from '../../../contexts/auth'
import { styled, theme } from '../../../../stitches.config'
import Spinner from '../../../components/spinner'

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
  background: '$gray300',
  opacity: 0.5,
  filter: 'blur(16px)',

  '& + div': {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    p: {
      fontSize: '1.25rem',
      color: '$gray600',
      marginTop: '1rem',
    },
  },
})

export default function CreateArticlePage() {
  const [draft, setDraft] = useState<Draft | null>(null)
  const [doc, setDoc] = useState('')
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()
  const { id } = router.query

  const handleSave = useCallback(
    async (docSnapshot: string) => console.log(docSnapshot),
    []
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
      const [collection, getDocs, query, where] = await Promise.all([
        (await import('firebase/firestore')).collection,
        (await import('firebase/firestore')).getDocs,
        (await import('firebase/firestore')).query,
        (await import('firebase/firestore')).where,
      ])

      const getDraftById = query(
        collection(firestore, `users/${user?.uid}/drafts`),
        where('id', '==', id)
      )

      const querySnapshot = await getDocs(getDraftById)

      const [draftData] = querySnapshot.docs.map(
        (snapshot) => snapshot.data() as Draft
      )

      if (draftData) {
        setDraft(draftData)
        setDoc(draftData.content)
        setLoading(false)
      }
    }

    if (router.isReady) setup()
  }, [id, user, router.isReady])

  return (
    <>
      <Head>
        <title>Johan | {draft?.name}</title>
      </Head>
      <Layout>
        {!loading ? (
          <MdEditorContainer
            doc={doc}
            onSave={handleSave}
            onPost={handlePostSubmit}
            onDocChange={handleDocChange}
          />
        ) : (
          <>
            <Overlay />
            <div>
              <Spinner size={64} color={String(theme.colors.gray700)} />
              <p>Getting everything up and running for you...</p>
            </div>
          </>
        )}
      </Layout>
    </>
  )
}
