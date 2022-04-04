import { format } from 'date-fns'
import Image from 'next/image'
import { useState, ChangeEvent } from 'react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { updateDoc, doc as docRef } from 'firebase/firestore'
import MdRenderer from '../md-renderer'
import MdEditor from '../md-editor'
import ArticleControls from '../article-controls'
import type { Post, Draft } from '../../types'
import { bucket, firestore } from '../../config/firebase'
import {
  Title,
  Wrapper,
  Header,
  Author,
  RendererWrapper,
  Description,
  ThumbnailWrapper,
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
  const [thumbnail, setThumbnail] = useState('')

  const handleChooseThumbnail = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return

    const file = e.target.files[0]

    const thumbnailStorageRef = ref(bucket, `thumbnail-${draftInfo?.id}`)

    const snapshot = await uploadBytes(thumbnailStorageRef, file)

    const url = await getDownloadURL(snapshot.ref)

    const draftRef = docRef(
      firestore,
      'users',
      draftInfo!.author.uid,
      'drafts',
      draftInfo!.id
    )

    await updateDoc(draftRef, {
      thumbnailURL: url,
    })

    setThumbnail(url)
  }

  return (
    <Wrapper>
      <ArticleControls
        onSave={onSave}
        onPost={onPost}
        doc={doc}
        onToggleHeaderVisibility={onToggleHeaderVisibility}
        isHeaderHidden={isHeaderHidden}
        alreadyExistingPost={alreadyExistingPost}
        handleChooseThumbnail={handleChooseThumbnail}
        thumbnail={draftInfo?.thumbnailURL || thumbnail}
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

          {(draftInfo?.thumbnailURL || thumbnail) && (
            <ThumbnailWrapper>
              <Image
                src={draftInfo?.thumbnailURL || thumbnail}
                layout='fill'
                priority
              />
            </ThumbnailWrapper>
          )}

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
