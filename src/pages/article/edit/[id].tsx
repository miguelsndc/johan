import { collection, getDocs, query, where } from 'firebase/firestore'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useCallback, useState } from 'react'
import nookies from 'nookies'
import { Layout, MdEditorContainer } from '../../../components'
import { firestore } from '../../../config/firebase'
import { admin } from '../../../config/firebase-admin'

type Draft = {
  id: string
  name: string
  authorId: string
  createdAt: string
  content: string
}

type Props = {
  draft: Draft
}

export default function CreateArticlePage({ draft }: Props) {
  const [doc, setDoc] = useState(draft.content)

  const handleDocChange = useCallback((newDoc: string) => {
    setDoc(newDoc)
  }, [])

  const handleDocSave = useCallback(async (docToBeSaved: string) => {
    console.log(docToBeSaved)
  }, [])

  const handleDocPost = useCallback((docToBeSubmitted: string) => {
    console.log(docToBeSubmitted)
  }, [])

  return (
    <>
      <Head>
        <title>Drafts | {draft.name}</title>
      </Head>
      <Layout>
        <MdEditorContainer
          doc={doc}
          onDocChange={handleDocChange}
          onPost={handleDocPost}
          onSave={handleDocSave}
        />
      </Layout>
    </>
  )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const cookies = nookies.get(ctx)
  const { id } = ctx.query

  const token = await admin.auth().verifyIdToken(cookies.token)
  const { uid } = token

  const getDraftById = query(
    collection(firestore, `users/${uid}/drafts`),
    where('id', '==', id)
  )

  const draft = (await getDocs(getDraftById)).docs[0].data() as Draft

  return {
    props: {
      draft,
    },
  }
}
