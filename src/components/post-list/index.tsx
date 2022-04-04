/* eslint-disable jsx-a11y/anchor-is-valid */
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
        <Link href={`/article/${post.id}`} key={post.id}>
          <a>
            <PostContainer>
              <h1>{post.name}</h1>
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
          </a>
        </Link>
      ))}
    </Container>
  )
}
