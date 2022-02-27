import Link from 'next/link'
import Dialog from '../dialog'
import { CustomLink, Spacer } from './styles'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function WarnUnsignedDialog({ onOpenChange, open }: Props) {
  return (
    <Dialog
      onClose={() => onOpenChange(false)}
      onOpenChange={onOpenChange}
      open={open}
      title='You must be signed to create a new post !'
      description="Hmmm... looks like you're trying to create a post without being signed in..."
    >
      <Spacer>
        <span>Try: </span>
        <Link href='/register' passHref>
          <CustomLink>Creating an account</CustomLink>
        </Link>
      </Spacer>
      <span>Or if you already have one: </span>
      <Link href='/login' passHref>
        <CustomLink>Sign in</CustomLink>
      </Link>
    </Dialog>
  )
}
