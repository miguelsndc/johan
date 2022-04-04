import Image from 'next/image'
import Head from 'next/head'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import { IoMdArrowBack } from 'react-icons/io'
import { useEffect } from 'react'
import { styled, theme } from '../../../../../stitches.config'
import { useEditor } from '../../../../contexts/editor'
import { useAuth } from '../../../../contexts/auth'
import { Spinner, MarkdownRenderer } from '../../../../components'

const Article = styled('article', {
  width: 'min(100% - 2rem, 50rem)',
  marginInline: 'auto',
  backgroundColor: '#0d1117',

  '& > h1': {
    fontSize: '4rem',
    fontWeight: '$semi',
    fontFamily: '$mono',
    lineHeight: 1,
    paddingTop: '4rem',
    paddingBottom: '0.25rem',
  },

  '& > p': {
    marginTop: '0.75rem',
    marginBottom: '1.5rem',
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

export default function PreviewArticlePage() {
  const router = useRouter()
  const { draft, loading } = useEditor()
  const { user } = useAuth()

  useEffect(() => {
    if (draft?.author.uid !== user?.uid) router.push(`/`)
  }, [draft?.author.uid, user?.uid, router])

  if (loading)
    return (
      <Container loading>
        <Spinner color={String(theme.colors.gray400)} size={48} />
      </Container>
    )

  return (
    <>
      <Head>
        <title>Preview | {draft?.name}</title>
      </Head>

      <Container>
        <GoBackBtn onClick={() => router.back()}>
          <IoMdArrowBack size={24} />
        </GoBackBtn>
        <Article>
          <h1>{draft?.name}</h1>
          <p>{draft?.description}</p>
          {draft?.thumbnailURL && (
            <ThumbnailWrapper>
              <Image src={draft.thumbnailURL} layout='fill' priority />
            </ThumbnailWrapper>
          )}

          <Author>
            <Image
              src={draft?.author.photoURL || '/default-user.png'}
              width={40}
              height={40}
            />
            <div>
              <h2>{draft?.author.name}</h2>
              <p>
                {draft?.createdAt &&
                  format(new Date(draft?.createdAt), 'MMM d yyyy')}
              </p>
            </div>
          </Author>
          <MarkdownRenderer doc={draft!.content} />
        </Article>
      </Container>
    </>
  )
}
