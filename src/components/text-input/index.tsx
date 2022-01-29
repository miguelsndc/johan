import {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
} from 'react';

import { ErrorMessage, Field, Input, Title } from './styles';

type TextInputProps = {
  label: string;
  errorMessage?: string;
  shouldShowErrorMessage: boolean;
  required?: boolean;
  id: string;
  type: HTMLInputTypeAttribute;
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
} & InputHTMLAttributes<HTMLInputElement>;

export default function TextInput({
  errorMessage,
  label,
  required,
  id,
  name,
  onChange,
  type,
  value,
  shouldShowErrorMessage,
  ...rest
}: TextInputProps) {
  return (
    <Field
      isInvalid={!!(errorMessage && shouldShowErrorMessage)}
      required={required}
    >
      <Title>{label}</Title>
      <Input
        id={id}
        name={name}
        onChange={onChange}
        type={type}
        value={value}
        {...rest}
      />
      {shouldShowErrorMessage && errorMessage && (
        <ErrorMessage role='alert'>{errorMessage}</ErrorMessage>
      )}
    </Field>
  );
}
