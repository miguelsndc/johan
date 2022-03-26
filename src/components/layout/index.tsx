import { ReactNode, useState } from 'react'
import { doc, setDoc } from 'firebase/firestore'
import dynamic from 'next/dynamic'
import { v4 as uuid } from 'uuid'
import { useRouter } from 'next/router'
import Header from '../header'
import { toKebabCase } from '../../helpers/to-kebab-case'
import { useAuth } from '../../contexts/auth'
import { firestore } from '../../config/firebase'
import type { NewDraftData } from '../article-creation-dialog'

type LayoutProps = {
  children: ReactNode
  isHeaderHidden?: boolean
}

const DynamicArticleCreationDialog = dynamic(
  () => import('../article-creation-dialog'),
  { ssr: false }
)

const DynamicWarnUnsignedDialog = dynamic(
  () => import('../warn-unsigned-dialog'),
  { ssr: false }
)

export default function Layout({
  children,
  isHeaderHidden = false,
}: LayoutProps) {
  const { user, signOut } = useAuth()
  const [isArticleCreationDialogOpened, setIsArticleCreationDialogOpened] =
    useState(false)
  const [isWarnUnsignedDialogOpened, setIsWarnUnsignedDialogOpened] =
    useState(false)
  const router = useRouter()

  const handlePostCreationFlow = () => {
    if (user) setIsArticleCreationDialogOpened(true)
    else setIsWarnUnsignedDialogOpened(true)
  }

  const handleCreateDraft = async ({ name, description }: NewDraftData) => {
    const newDraft = {
      id: `${toKebabCase(name)}-${uuid()}`,
      name,
      description,
      author: user,
      createdAt: new Date().toISOString(),
      content: `Start writing here...`,
    }

    await setDoc(
      doc(firestore, 'users', user!.uid, 'drafts', newDraft.id),
      newDraft
    )

    setIsArticleCreationDialogOpened(false)

    router.push(`/article/edit/${newDraft.id}`)
  }

  return (
    <>
      {isHeaderHidden || (
        <Header
          user={user}
          onSignOut={signOut}
          onStartPostCreationFlow={handlePostCreationFlow}
        />
      )}
      <DynamicArticleCreationDialog
        open={isArticleCreationDialogOpened}
        onOpenChange={setIsArticleCreationDialogOpened}
        onConfirm={handleCreateDraft}
      />
      <DynamicWarnUnsignedDialog
        onOpenChange={setIsWarnUnsignedDialogOpened}
        open={isWarnUnsignedDialogOpened}
      />
      <main>{children}</main>
    </>
  )
}
