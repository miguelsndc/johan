import { ReactNode } from 'react'
import { GrClose } from 'react-icons/gr'

import {
  Dialog as DialogRoot,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from './styles'

type Props = {
  open: boolean
  onClose: () => void
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  children?: ReactNode
}

export default function Dialog({
  onClose,
  onOpenChange,
  open,
  description,
  title,
  children,
}: Props) {
  return (
    <DialogRoot open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          <DialogClose onClick={onClose}>
            <GrClose size={16} />
          </DialogClose>
          <div>{children}</div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  )
}
