import { format } from 'date-fns'
import Image from 'next/image'
import MdRenderer from '../md-renderer'
import MdEditor from '../md-editor'
import ArticleControls from '../article-controls'
import type { Post, Draft } from '../../types'
import {
  Title,
  Wrapper,
  Header,
  Author,
  RendererWrapper,
  Description,
} from './styles'

type Props = {
  draftInfo?: Draft | null
  doc: string
  onDocChange: (newDoc: string) => void
  onSave: (doc: string) => Promise<void>
  onPost: (doc: string) => Promise<Post>
  onToggleHeaderVisibility: (current: boolean) => void
  editMode?: boolean
  isHeaderHidden: boolean
  alreadyExistingPost?: boolean
}

export default function MarkdownEditorContainer({
  doc,
  onDocChange,
  onPost,
  onSave,
  isHeaderHidden,
  onToggleHeaderVisibility,
  editMode,
  alreadyExistingPost,
  draftInfo,
}: Props) {
  return (
    <Wrapper>
      <ArticleControls
        onSave={onSave}
        onPost={onPost}
        doc={doc}
        onToggleHeaderVisibility={onToggleHeaderVisibility}
        isHeaderHidden={isHeaderHidden}
        alreadyExistingPost={alreadyExistingPost}
      />
      <MdEditor
        initialDoc={doc}
        onChange={onDocChange}
        fullHeight={isHeaderHidden}
      />
      <RendererWrapper isHeaderVisible={!isHeaderHidden}>
        <Header>
          <Title reduceFontSize={draftInfo?.name.length! > 40}>
            {draftInfo?.name}
          </Title>
          <Description>{draftInfo?.description}</Description>
          <Author>
            <Image
              src={draftInfo?.author.photoURL || '/default-user.png'}
              width={40}
              height={40}
            />
            <div>
              <h2>{draftInfo?.author.name}</h2>
              <p>
                {draftInfo?.createdAt &&
                  format(new Date(draftInfo?.createdAt), 'MMM d yyyy')}
              </p>
            </div>
          </Author>
        </Header>
        <MdRenderer doc={doc} editMode={editMode} />
      </RendererWrapper>
    </Wrapper>
  )
}
