import { useRouter } from 'next/router'
import Link from 'next/link'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { VscCircleLargeFilled } from 'react-icons/vsc'
import Image from 'next/image'
import Head from 'next/head'
import { firestore } from '../../config/firebase'
import { useAuth } from '../../contexts/auth'
import { Layout } from '../../components'
import type { User, Post, Draft } from '../../types'
import { styled } from '../../../stitches.config'

type LivePost = { live?: boolean } & Post

type Props = {
  posts: LivePost[]
}

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
})

const PostSection = styled('section', {
  display: 'flex',
  gap: '1rem',
  flexWrap: 'wrap',
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
    fontWeight: '$semi',
    transition: 'background .2s',
    background: '$gray300',
    color: '$black',
    '&:hover': {
      background: '$gray400',
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
    fontWeight: '$semi',
    letterSpacing: 1,
    fontSize: '0.75rem',
    opacity: '0.75',
  },
})

export default function UserPage({ posts }: Props) {
  const router = useRouter()
  const { user } = useAuth()
  const { name } = router.query

  return (
    <>
      <Head>
        <title>Johan | {user?.name || ''}</title>
      </Head>

      <Layout>
        <Container>
          <Image
            src={user?.photoURL || '/default-user.png'}
            width={100}
            height={100}
            priority
          />
          <div>{name}</div>
          <h1>Current Posts</h1>
          <PostSection>
            {posts.map((post) => (
              <PostCard key={post.id}>
                {post.thumbnailURL && (
                  <Image
                    src={post.thumbnailURL}
                    layout='responsive'
                    width={320}
                    height={180}
                  />
                )}
                <h1>{post.name}</h1>
                <Footer>
                  <Link href={`/article/edit/${post.id}`}>
                    {post.live ? 'UPDATE' : 'CONTINUE WRITING'}
                  </Link>
                  {post.live && (
                    <span>
                      <VscCircleLargeFilled /> live
                    </span>
                  )}
                </Footer>
              </PostCard>
            ))}
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
    (doc) => ({ ...doc?.data(), content: '' } as Post)
  )

  const userDrafts = (await getDocs(userDraftsCollection)).docs.map(
    (doc) => ({ ...doc?.data(), content: '' } as Draft)
  )

  const liveDrafts = userDrafts.map((draft) => {
    const live = userPosts.find((p) => p.draftId === draft.id)

    return {
      ...draft,
      live: Boolean(live),
    }
  })

  return {
    props: {
      posts: liveDrafts,
    },
  }
}
