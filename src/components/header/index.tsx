import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { AiOutlineHome, AiOutlinePlus } from 'react-icons/ai'
import { IoLogOutOutline } from 'react-icons/io5'
import { theme } from '../../../stitches.config'
import CreatePostDialog from '../create-post-dialog'

import {
  RoundedButton,
  Container,
  ButtonWrapper,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ProfileDetails,
  Separator,
  ControlButton,
} from './styles'

type User = {
  email: string | null
  photoURL: string | null
  uid: string
  createdAt: string
  firstName: string
  lastName: string
}

type HeaderProps = {
  user: User | null
  onSignOut: () => Promise<void>
}

export default function Header({ user, onSignOut }: HeaderProps) {
  const [isDialogOpened, setIsDialogOpened] = useState(false)

  const handleOpenDialog = () => setIsDialogOpened(true)

  return (
    <Container>
      <div>
        <h1>Johan</h1>
        <ButtonWrapper>
          <RoundedButton>
            <AiOutlineHome size={24} color='#fff' />
          </RoundedButton>

          <RoundedButton onClick={handleOpenDialog}>
            <AiOutlinePlus size={24} color='#fff' />
          </RoundedButton>

          <CreatePostDialog
            user={user}
            isOpened={isDialogOpened}
            onOpenChange={setIsDialogOpened}
          />

          <Popover>
            <PopoverTrigger>
              <Image src='/default-user.png' width={24} height={24} />
            </PopoverTrigger>
            <PopoverContent align='end' sideOffset={8}>
              <ProfileDetails>
                <Image
                  src={user?.photoURL ? user.photoURL : '/default-user.png'}
                  width={48}
                  height={48}
                />
                <div>
                  <h1>Miguel Nogueira</h1>
                  <Link href='/'>See profile</Link>
                </div>
              </ProfileDetails>
              <Separator />
              <ControlButton type='button' onClick={onSignOut}>
                <IoLogOutOutline
                  size={28}
                  color={String(theme.colors.gray500)}
                />
                Sign out
              </ControlButton>
            </PopoverContent>
          </Popover>
        </ButtonWrapper>
      </div>
    </Container>
  )
}
