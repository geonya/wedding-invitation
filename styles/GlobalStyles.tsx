import { Global } from '@mantine/core'

export default function GlobalStyles() {
  return (
    <Global
      styles={(theme) => ({
        '*, *::before, *::after': { boxSizing: 'border-box' },
        html: {
          overflowX: 'hidden',
          /* Prevent font scaling in landscape */
          WebkitTextSizeAdjust:
            'none' /*Chrome, Safari, newer versions of Opera*/,
          MozTextSizeAdjust: 'none' /*Firefox*/,
          msTextSizeAdjust: 'none' /*Ie*/,
          OTextSizeAdjust: 'none' /*old versions of Opera*/,
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
