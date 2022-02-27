import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineHome, AiOutlinePlus } from 'react-icons/ai'
import { IoLogOutOutline } from 'react-icons/io5'
import { theme } from '../../../stitches.config'

import {
  RoundedButton,
  Container,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ProfileDetails,
  Separator,
  ControlButton,
  Menu,
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
  onStartPostCreationFlow: () => void
}

export default function Header({
  user,
  onSignOut,
  onStartPostCreationFlow,
}: HeaderProps) {
  return (
    <Container data-testid='header'>
      <div>
        <h1>Johan</h1>
        <Menu>
          <RoundedButton>
            <AiOutlineHome size={24} color='#fff' />
          </RoundedButton>

          <RoundedButton onClick={onStartPostCreationFlow}>
            <AiOutlinePlus size={24} color='#fff' />
          </RoundedButton>

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
                  color={String(theme.colors.gray400)}
                />
                Sign out
              </ControlButton>
            </PopoverContent>
          </Popover>
        </Menu>
      </div>
    </Container>
  )
}
