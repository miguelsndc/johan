export const toKebabCase = (text: string) =>
  text.trim().toLowerCase().split(' ').join('-')
