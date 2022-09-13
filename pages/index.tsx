import {
  BackgroundImage,
  Box,
  Button,
  createStyles,
  Divider,
  SimpleGrid,
  Text,
  useMantineTheme,
} from '@mantine/core'
import type { NextPage } from 'next'
import KakaoMap from '../components/KakaoMap'
import heroImage from '../public/images/hero-image.jpg'

const useStyles = createStyles((theme) => ({
  container: {
    margin: '0 auto',
    width: theme.breakpoints.xs,
    height: '100vh',
    overflowX: 'hidden',
  },
  hero: {
    height: 400,
    textAlign: 'center',
    color: theme.colors.gray[0],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    heroSubTitle: {},
    heroDate: {
      fontSize: 10,
    },
  },
}))

const Home: NextPage = () => {
  const { classes } = useStyles()
  const theme = useMantineTheme()

  return (
    <div className={classes.container}>
      <BackgroundImage src={heroImage.src} radius='md'>
        <div className={classes.hero}>
          <Box
            sx={{
              textAlign: 'center',
            }}
          >
            <Text
              sx={{
                letterSpacing: 8,
              }}
            >
              Wedding Invitation
            </Text>
          </Box>
        </div>
      </BackgroundImage>
      <SimpleGrid
        cols={1}
        mt={20}
        spacing={20}
        sx={{
          backdropFilter: 'blur(1px)',
          color: theme.colors.gray[7],
          textAlign: 'center',
        }}
      >
        <Text sx={{ fontSize: theme.fontSizes.xl, fontWeight: 700 }}>
          한건희 & 이보라
        </Text>
        <Text sx={{ fontSize: theme.fontSizes.md, fontWeight: 400 }}>
          결혼합니다 !
        </Text>
        <Divider m='lg' variant='dashed' />
        <Text sx={{ fontSize: theme.fontSizes.sm, fontWeight: 300 }}>
          2022 . 11 . 12 . AM 11 : 00 아벤티움 웨딩홀
          <Text sx={{ fontSize: theme.fontSizes.xs, fontWeight: 300 }}>
            (서울 중구 청파로 464 브라운스톤서울 3층)
          </Text>
        </Text>
        <KakaoMap />
        <Button>Navigation</Button>
        <Box sx={{ height: 300 }} />
      </SimpleGrid>
    </div>
  )
}

export default Home
