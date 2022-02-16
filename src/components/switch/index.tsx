import { SwitchThumb, Switch as SwitchRoot, Label, Container } from './styles'

type Props = {
  defaultChecked: boolean
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  disabled?: boolean
  required?: boolean
  name?: string
  value?: string
  label?: string
}

export default function Switch({
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  name,
  required,
  value,
  label,
}: Props) {
  return (
    <Container>
      <Label>{label}</Label>
      <SwitchRoot
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        name={name}
        required={required}
        value={value}
        aria-label='Toggle zen mode'
      >
        <SwitchThumb />
      </SwitchRoot>
    </Container>
  )
}
