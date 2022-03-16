import { useRouter } from 'next/router'

export default function UserPage() {
  const router = useRouter()
  const { name } = router.query

  console.log(name)

  return <div />
}
