export type User = {
  email: string | null
  photoURL: string | null
  uid: string
  createdAt: string
  name: string
}

export type Post = {
  id: string
  name: string
  description: string | null
  author: User
  createdAt: string
  thumbnailURL?: string
  content: string
  draftId: string
}

export type Draft = {
  id: string
  name: string
  author: User
  createdAt: string
  description?: string
  content: string
  thumbnailURL?: string
}
