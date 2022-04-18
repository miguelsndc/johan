import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { VscCircleLargeFilled } from 'react-icons/vsc'
import Image from 'next/image'
import Head from 'next/head'
import { firestore } from '../../config/firebase'
import { useAuth } from '../../contexts/auth'
import { Layout } from '../../components'
import type { User, Post, Draft } from '../../types'
import { styled } from '../../../stitches.config'

type LiveDraft = { live?: boolean; postId: string | null } & Draft

type Props = {
  user: User
  serverDrafts: LiveDraft[]
}

const Profile = styled('div', {
  textAlign: 'center',
  img: {
    borderRadius: '50%',
  },
  h1: {
    marginTop: '1rem',
    fontWeight: '$semi',
  },
})

const PostCard = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: 330,
  padding: '1rem',
  borderRadius: 4,
  border: '1px solid #27272a',
  img: {
    display: 'block',
    borderRadius: 4,
  },
  h1: {
    marginTop: '0.75rem',
  },
})

const Container = styled('div', {
  maxWidth: 1100,
  width: '100%',
  marginInline: 'auto',
  marginTop: '2rem',
  h2: {
    fontWeight: '$semi',
  },
})

const PostSection = styled('section', {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  justifyItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  '@media (max-width: 1100px)': {
    gridTemplateColumns: '1fr 1fr',
  },
  '@media (max-width: 696px)': {
    gridTemplateColumns: '1fr',
  },
})

const Footer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '1rem',
  marginTop: '1rem',
  a: {
    position: 'relative',
    textDecoration: 'none',
    textAlign: 'right',
    padding: '0.35rem',
    borderRadius: 4,
    textTransform: 'uppercase',
    fontWeight: '$medium',
    transition: 'background .2s',
    background: '$gray200',
    color: '$black',
    '&:hover': {
      background: '$gray300',
    },
  },
  span: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    position: 'relative',
    color: '$green500',
    border: '1px solid #22c55e',
    textAlign: 'right',
    padding: '0.35rem',
    borderRadius: 4,
    textTransform: 'uppercase',
    fontWeight: '$medium',
    letterSpacing: 1,
    fontSize: '0.75rem',
  },
  button: {
    background: '$red500',
    color: '$gray50',
    border: '2px solid #ef4444',
    textTransform: 'capitalize',
    fontWeight: '$medium',
    padding: '0.25rem 0.35rem',
    borderRadius: 4,
    cursor: 'pointer',
  },
  '& > div': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
})

export default function UserPage({ user, serverDrafts }: Props) {
  const router = useRouter()
  const { user: authenticatedUser } = useAuth()
  const { name } = router.query

  const [drafts, setDrafts] = useState(serverDrafts)

  const handleDeletePost = async (postId: string | null, draftId: string) => {
    const draftRef = doc(
      firestore,
      'users',
      authenticatedUser!.uid,
      'drafts',
      draftId
    )

    await deleteDoc(draftRef)

    if (postId) {
      const postRef = doc(firestore, 'posts', postId)

      await deleteDoc(postRef)
    }

    setDrafts((prevState) => prevState.filter((draft) => draft.id !== draftId))
  }

  return (
    <>
      <Head>
        <title>Johan | {user.name}</title>
      </Head>

      <Layout>
        <Container>
          <Profile>
            <Image
              src={user.photoURL || '/default-user.png'}
              width={100}
              height={100}
              priority
            />
            <h1>{name}</h1>
          </Profile>
          <h2>
            {authenticatedUser?.uid === user.uid ? 'Your' : `${user.name}'s`}{' '}
            Posts
          </h2>
          <PostSection>
            {drafts.map((draft) =>
              draft.author.uid === authenticatedUser?.uid ? (
                <PostCard key={draft.id}>
                  {draft.thumbnailURL && (
                    <div>
                      <Image
                        src={draft.thumbnailURL}
                        layout='responsive'
                        width={320}
                        height={180}
                      />
                    </div>
                  )}
                  <h1>{draft.name}</h1>

                  <Footer>
                    <div>
                      <Link href={`/article/edit/${draft.id}`}>
                        {draft.live ? 'UPDATE' : 'CONTINUE WRITING'}
                      </Link>
                      <button
                        type='button'
                        onClick={() => handleDeletePost(draft.postId, draft.id)}
                      >
                        delete
                      </button>
                    </div>
                    {draft.live && (
                      <span>
                        <VscCircleLargeFilled /> live
                      </span>
                    )}
                  </Footer>
                </PostCard>
              ) : (
                draft.postId && (
                  <PostCard key={draft.id}>
                    {draft.thumbnailURL && (
                      <div>
                        <Image
                          src={draft.thumbnailURL}
                          layout='responsive'
                          width={320}
                          height={180}
                        />
                      </div>
                    )}
                    <h1>{draft.name}</h1>
                  </PostCard>
                )
              )
            )}
          </PostSection>
        </Container>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { name } = ctx.query

  const usersCollection = collection(firestore, 'users')
  const postsCollection = collection(firestore, 'posts')

  const userQuery = query(usersCollection, where('name', '==', name))

  const user = (await getDocs(userQuery)).docs[0]?.data() as User

  const userPostsQuery = query(
    postsCollection,
    where('author.uid', '==', user.uid)
  )

  const userDraftsCollection = collection(
    firestore,
    'users',
    user.uid,
    'drafts'
  )

  const userPosts = (await getDocs(userPostsQuery)).docs.map(
    (post) => ({ ...post?.data(), content: '' } as Post)
  )

  const userDrafts = (await getDocs(userDraftsCollection)).docs.map(
    (draft) => ({ ...draft?.data(), content: '' } as Draft)
  )

  const liveDrafts = userDrafts.map((draft) => {
    const live = userPosts.find((p) => p.draftId === draft.id)

    return {
      ...draft,
      live: Boolean(live),
      postId: live?.id || null,
    }
  })

  return {
    props: {
      user,
      serverDrafts: liveDrafts,
    },
  }
}
