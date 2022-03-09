import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineHome, AiOutlinePlus } from 'react-icons/ai'
import { IoLogOutOutline } from 'react-icons/io5'
import { theme } from '../../../stitches.config'
import { User } from '../../types'

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
  LinkWrapper,
  LinkButton,
} from './styles'

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
          <Link href='/' passHref>
            <RoundedButton as='a'>
              <AiOutlineHome size={24} color='#fff' />
            </RoundedButton>
          </Link>

          <RoundedButton
            onClick={onStartPostCreationFlow}
            aria-label='create post'
          >
            <AiOutlinePlus size={24} color='#fff' />
          </RoundedButton>

          {user ? (
            <Popover>
              <PopoverTrigger aria-label='show profile details'>
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
                    <h1>{user?.name}</h1>
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
          ) : (
            <LinkWrapper>
              <Link href='/register' passHref>
                <LinkButton variant='outlined'>Register</LinkButton>
              </Link>
              <Link href='/login' passHref>
                <LinkButton variant='filled'>Sign in</LinkButton>
              </Link>
            </LinkWrapper>
          )}
        </Menu>
      </div>
    </Container>
  )
}
