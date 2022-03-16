import Image from 'next/image'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { IoMdArrowBack } from 'react-icons/io'
import { format } from 'date-fns'
import { styled, theme } from '../../../../../stitches.config'
import { useEditor } from '../../../../contexts/editor'
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
    paddingTop: '8rem',
  },

  '& > p': {
    marginTop: '0.75rem',
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
  const { draft } = useEditor()

  const formattedDraft = {
    ...draft!,
    createdAt: format(new Date(draft!.createdAt), 'MMM d yyyy'),
  }

  if (!draft)
    return (
      <Container loading>
        <Spinner color={String(theme.colors.gray400)} size={48} />
      </Container>
    )

  return (
    <>
      <Head>
        <title>Preview | {formattedDraft?.name}</title>
      </Head>

      <Container>
        <GoBackBtn onClick={() => router.back()}>
          <IoMdArrowBack size={24} />
        </GoBackBtn>
        <Article>
          <h1>{formattedDraft?.name}</h1>
          <p>{formattedDraft?.description}</p>
          <Author>
            <Image
              src={formattedDraft?.author.photoURL || '/default-user.png'}
              width={40}
              height={40}
            />
            <div>
              <h2>{formattedDraft.author.name}</h2>
              <p>{formattedDraft.createdAt}</p>
            </div>
          </Author>

          <MarkdownRenderer doc={formattedDraft.content} />
        </Article>
      </Container>
    </>
  )
}
