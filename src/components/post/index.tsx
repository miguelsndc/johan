import Image from 'next/image'
import { Post } from '../../types/index'

type Props = {
  post: Post
}

export default function PostPreview({ post }: Props) {
  return (
    <div>
      <h1>{post.name}</h1>
      <div>
        <Image
          src={post.author.photoURL || '/default-user.png'}
          width={48}
          height={48}
        />
        <div>
          <h2>{post.author.name}</h2>
          <h3>{post.createdAt}</h3>
        </div>
      </div>
    </div>
  )
}
