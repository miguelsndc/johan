import { collection, getDocs } from 'firebase/firestore'
import { GetServerSideProps } from 'next'
import { format } from 'date-fns'
import { Layout, PostPreview } from '../components'
import { firestore } from '../config/firebase'
import { Post } from '../types'

type Props = {
  posts: Post[]
}

function Home({ posts }: Props) {
  return (
    <Layout>
      <div>
        {posts.map((post) => (
          <PostPreview key={post.id} post={post} />
        ))}
      </div>
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
