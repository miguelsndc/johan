import { collection, doc, getDoc } from 'firebase/firestore'
import Image from 'next/image'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { IoMdArrowBack } from 'react-icons/io'
import { styled, theme } from '../../../../../stitches.config'
import MdRenderer from '../../../../components/md-renderer'
import { firestore } from '../../../../config/firebase'
import { useAuth } from '../../../../contexts/auth'
import Spinner from '../../../../components/spinner'

type User = {
  email: string | null
  photoURL: string | null
  uid: string
  createdAt: string
  firstName: string
  lastName: string
}

type Draft = {
  id: string
  name: string
  author: User
  createdAt: string
  content: string
}

const Article = styled('article', {
  width: 'min(100% - 2rem, 50rem)',
  marginInline: 'auto',
  backgroundColor: '#0d1117',

  '& > h1': {
    fontSize: '4rem',
    fontWeight: '$semi',
    fontFamily: '$mono',
    lineHeight: 1,
    paddingTop: '8rem',
  },
})

const Container = styled('div', {
  backgroundColor: '#0d1117',
  color: '#c9d1d9',

  variants: {
    loading: {
      true: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  },
})

const GoBackBtn = styled('button', {
  all: 'unset',
  position: 'fixed',
  borderRadius: '50%',
  padding: '0.75rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  top: '3vh',
  left: '3vw',
  cursor: 'pointer',
  background: '$gray700',
  transition: 'background .2s',
  '&:focus': {
    outlineStyle: 'auto',
  },
  '&:hover': {
    background: '$gray600',
  },
})

const Author = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  margin: '2.5rem 0',
  img: {
    borderRadius: '50%',
  },
  h2: {
    fontSize: '1.35rem',
    fontWeight: '$medium',
  },
  p: {
    fontSize: '0.875rem',
    color: '$gray400',
  },
})

export default function PreviewArticlePage() {
  const router = useRouter()
  const [draft, setDraft] = useState<Draft | null>(null)
  const { user } = useAuth()

  const { id } = router.query

  useEffect(() => {
    const setup = async () => {
      const currentUserDraftsCollection = collection(
        firestore,
        `users/${user?.uid}/drafts`
      )

      const docRef = doc(currentUserDraftsCollection, String(id))

      const docSnapshot = await getDoc(docRef)

      const draftData = docSnapshot.data() as Draft

      if (draftData) {
        setDraft(draftData)
      }
    }

    if (router.isReady) setup()
  }, [id, user, router.isReady])

  if (!draft)
    return (
      <Container loading>
        <Spinner color={String(theme.colors.gray400)} size={48} />
      </Container>
    )

  return (
    <>
      <Head>
        <title>Johan | {draft?.name}</title>
      </Head>

      <Container>
        <GoBackBtn onClick={() => router.back()}>
          <IoMdArrowBack size={24} />
        </GoBackBtn>
        <Article>
          <h1>{draft?.name}</h1>
          <Author>
            <Image
              src={draft?.author.photoURL || '/default-user.png'}
              width={40}
              height={40}
            />
            <div>
              <h2>{`${draft?.author.firstName} ${draft?.author.lastName}`}</h2>
              <p>{draft?.author.createdAt}</p>
            </div>
          </Author>

          {draft && <MdRenderer doc={draft.content} />}
        </Article>
      </Container>
    </>
  )
}
