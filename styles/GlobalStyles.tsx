import { Global } from '@mantine/core'

export default function GlobalStyles() {
  return (
    <Global
      styles={(theme) => ({
        '*, *::before, *::after': { boxSizing: 'border-box' },
        html: {
          overflowX: 'hidden',
        },
        body: {
          position: 'relative',
          overflowX: 'hidden',
          ...theme.fn.fontStyles(),
          fontSize: theme.fontSizes.md,
          lineHeight: theme.lineHeight,
          color: theme.colors.gray[4],
        },
        a: {
          all: 'unset',
        },
      })}
    />
  )
}
