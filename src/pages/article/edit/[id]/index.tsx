import Head from 'next/head'
import { useState } from 'react'
import { Layout, MarkdownEditorContainer } from '../../../../components'
import { useEditor } from '../../../../contexts/editor'

export default function CreateArticlePage() {
  const {
    alreadyExistingPost,
    doc,
    draft,
    handleDocChange,
    handlePostSubmit,
    handleSave,
    loading,
  } = useEditor()
  const [isHeaderHidden, setIsHeaderHidden] = useState(true)

  return (
    <>
      <Head>
        <title>Johan | {draft?.name || 'Setting up...'}</title>
      </Head>
      <Layout isHeaderHidden={isHeaderHidden}>
        {loading || (
          <MarkdownEditorContainer
            doc={doc}
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
