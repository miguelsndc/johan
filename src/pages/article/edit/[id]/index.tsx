import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Layout, MarkdownEditorContainer } from '../../../../components'
import { useEditor } from '../../../../contexts/editor'
import { useAuth } from '../../../../contexts/auth'

export default function CreateArticlePage() {
  const {
    alreadyExistingPost,
    draft,
    handleDocChange,
    handlePostSubmit,
    handleSave,
    loading,
  } = useEditor()
  const { user } = useAuth()
  const router = useRouter()
  const [isHeaderHidden, setIsHeaderHidden] = useState(true)

  useEffect(() => {
    if (draft?.author?.uid && draft.author.uid !== user?.uid) router.push(`/`)
  }, [draft?.author?.uid, user?.uid, router])

  return (
    <>
      <Head>
        <title>Johan | {draft?.name || 'Setting up...'}</title>
      </Head>
      <Layout isHeaderHidden={isHeaderHidden}>
        {loading || (
          <MarkdownEditorContainer
            draftInfo={draft}
            doc={draft!.content}
            onSave={handleSave}
            onToggleHeaderVisibility={setIsHeaderHidden}
            isHeaderHidden={isHeaderHidden}
            onPost={handlePostSubmit}
            onDocChange={handleDocChange}
            alreadyExistingPost={!!alreadyExistingPost}
            editMode
          />
        )}
      </Layout>
    </>
  )
}
