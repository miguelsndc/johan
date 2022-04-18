import { collection, getDocs } from 'firebase/firestore'
import { GetServerSideProps } from 'next'
import { format } from 'date-fns'
import { Layout, PostList } from '../components'
import { firestore } from '../config/firebase'
import { Post } from '../types'
import { styled } from '../../stitches.config'

type Props = {
  posts: Post[]
}

const Container = styled('div', {
  paddingTop: '3rem',
  paddingBottom: '4rem',

  '& > h1': {
    textAlign: 'center',
    fontSize: 'clamp(3.5rem, 5vw, 5rem)',
  },
  '& > h2': {
    textAlign: 'center',
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    color: '$gray300',
  },
})

function Home({ posts }: Props) {
  return (
    <Layout>
      <Container>
        <h1>Welcome to Johan !</h1>
        <h2>See What&apos;s new:</h2>
        <PostList posts={posts} />
      </Container>
    </Layout>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const querySnapshot = await getDocs(collection(firestore, 'posts'))

  const posts = querySnapshot.docs.map((doc) => doc.data() as Post)

  const formattedPosts = posts.map((post) => ({
    ...post,
    createdAt: format(new Date(post.createdAt), 'MMM d yyyy'),
  }))

  return {
    props: {
      posts: formattedPosts || [],
    },
  }
}
