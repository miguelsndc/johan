import Image from 'next/image'
import Link from 'next/link'
import { PostContainer, AuthorInformation, Container } from './styles'
import { Post } from '../../types/index'

type Props = {
  posts: Post[]
}

export default function PostList({ posts }: Props) {
  return (
    <Container>
      {posts.map((post) => (
        <PostContainer key={post.id}>
          <h1>
            <Link href={`/article/${post.id}`}>{post.name}</Link>
          </h1>
          <p>{post.description}</p>
          <AuthorInformation>
            <Image
              src={post.author.photoURL || '/default-user.png'}
              width={36}
              height={36}
            />
            <div>
              <h2>{post.author.name}</h2>
              <h3>{post.createdAt}</h3>
            </div>
          </AuthorInformation>
        </PostContainer>
      ))}
    </Container>
  )
}
