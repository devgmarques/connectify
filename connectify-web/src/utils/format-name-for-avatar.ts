type FormatNameForAvatarProps = {
  name: string
}

export function formatNameForAvatar({ name }: FormatNameForAvatarProps) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((item) => item[0].toUpperCase())
    .join('')
}
