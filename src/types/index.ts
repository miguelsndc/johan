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
  content: string
}
