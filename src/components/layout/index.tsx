import { ReactNode, useState } from 'react'
import { doc, setDoc } from 'firebase/firestore'
import { v4 as uuid } from 'uuid'
import { useRouter } from 'next/router'
import Header from '../header'
import ArticleCreationDialog from '../article-creation-dialog'

import { useAuth } from '../../contexts/auth'
import { firestore } from '../../config/firebase'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { user, signOut } = useAuth()
  const [isArticleCreationDialogOpened, setIsArticleCreationDialogOpened] =
    useState(false)
  const router = useRouter()

  const handleShowArticleCreationDialog = () =>
    setIsArticleCreationDialogOpened(true)

  const handleCloseArticleCreationDialog = () =>
    setIsArticleCreationDialogOpened(false)

  const handleCreatePost = async (draftName: string) => {
    if (!user) return

    const newDraft = {
      id: `${draftName.trim().split(' ').join('-').toLowerCase()}-${uuid()}`,
      name: draftName,
      authorId: user?.uid,
      createdAt: new Date().toISOString(),
      content: `# ${draftName.trim()} 
Start writing here...`,
    }

    await setDoc(
      doc(firestore, 'users', user.uid, 'drafts', newDraft.id),
      newDraft
    )

    handleCloseArticleCreationDialog()

    router.push(`/article/edit/${newDraft.id}`)
  }

  return (
    <>
      <Header
        user={user}
        onSignOut={signOut}
        onStartPostCreationFlow={handleShowArticleCreationDialog}
      />
      <ArticleCreationDialog
        open={isArticleCreationDialogOpened}
        onClose={handleCloseArticleCreationDialog}
        onOpenChange={setIsArticleCreationDialogOpened}
        onConfirm={handleCreatePost}
      />
      <main>{children}</main>
    </>
  )
}
