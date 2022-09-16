import { Global } from '@mantine/core'

export default function GlobalStyles() {
  return (
    <Global
      styles={(theme) => ({
        '*, *::before, *::after': { boxSizing: 'border-box' },
        html: {
          overflowX: 'hidden',
          /* Prevent font scaling in landscape */
          '-webkit-text-size-adjust':
            'none' /*Chrome, Safari, newer versions of Opera*/,
          '-moz-text-size-adjust': 'none' /*Firefox*/,
          '-ms-text-size-adjust': 'none' /*Ie*/,
          '-o-text-size-adjust': 'none' /*old versions of Opera*/,
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
