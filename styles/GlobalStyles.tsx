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
          ...theme.fn.fontStyles(),
          overflowX: 'hidden',
          fontSize: theme.fontSizes.sm,
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
