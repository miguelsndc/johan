import { GetStaticPropsContext, GetStaticProps, GetStaticPaths } from 'next'
import { doc, getDoc } from 'firebase/firestore'
import Head from 'next/head'
import Image from 'next/image'
import { format } from 'date-fns'
import { firestore } from '../../config/firebase'
import type { Post } from '../../types'
import { styled } from '../../../stitches.config'
import { Layout, MarkdownRenderer } from '../../components'

const REVALIDATE_INTERVAL_IN_SECONDS = 60 * 10

type Props = {
  post: Post
}

const Article = styled('article', {
  width: 'min(100% - 2rem, 50rem)',
  marginInline: 'auto',
  backgroundColor: '#0d1117',

  '& > h1': {
    fontSize: '2.75rem',
    fontWeight: '$semi',
    fontFamily: '$mono',
    lineHeight: 1,
    paddingTop: '8rem',
    '@md': {
      fontSize: '4rem',
    },
  },

  '& > p': {
    marginTop: '0.75rem',
    marginBottom: '1.25rem',
    color: '$gray400',
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

const Author = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  margin: '1rem 0 2rem 0',
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

const ThumbnailWrapper = styled('div', {
  position: 'relative',
  width: '100%',
  aspectRatio: '16 / 9',

  img: {
    borderRadius: 8,
  },
})

export default function ArticlePage({ post }: Props) {
  return (
    <Layout>
      <Head>
        <title>{post.name}</title>
      </Head>

      <Container>
        <Article>
          <h1>{post?.name}</h1>
          <p>{post?.description}</p>
          {post?.thumbnailURL && (
            <ThumbnailWrapper>
              <Image src={post.thumbnailURL} layout='fill' priority />
            </ThumbnailWrapper>
          )}
          <Author>
            <Image
              src={post?.author.photoURL || '/default-user.png'}
              width={40}
              height={40}
            />
            <div>
              <h2>{post.author.name}</h2>
              <p>{post.createdAt}</p>
            </div>
          </Author>

          <MarkdownRenderer doc={post.content} disableDebounce />
        </Article>
      </Container>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
})

export const getStaticProps: GetStaticProps = async (
  ctx: GetStaticPropsContext
) => {
  const { id } = ctx.params!

  const newPostRef = doc(firestore, `posts/${id}`)

  const docSnapshot = await getDoc(newPostRef)

  const data = docSnapshot.data() as Post

  const formatted = {
    ...data,
    createdAt: format(new Date(data.createdAt), 'MMM d yyyy'),
  }

  return {
    props: { post: formatted },
    revalidate: REVALIDATE_INTERVAL_IN_SECONDS,
  }
}
