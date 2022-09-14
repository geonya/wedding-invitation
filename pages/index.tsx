import {
  Avatar,
  BackgroundImage,
  Box,
  Divider,
  Group,
  Image,
  Modal,
  Paper,
  SimpleGrid,
  Space,
  Stack,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core'
import {
  IconArrowDownCircle,
  IconBrandMessenger,
  IconCash,
  IconCashBanknote,
  IconCurrencyWon,
  IconHeart,
  IconHomeDollar,
  IconMessage,
  IconPhone,
  IconPigMoney,
  IconZoomMoney,
} from '@tabler/icons'
import type { GetStaticProps, NextPage } from 'next'
import KakaoMap from '../components/KakaoMap'
import heroImage from '../public/images/hero-image.jpg'
import geonyAvatar from '../public/images/geony-profile.jpeg'
import boraAvatar from '../public/images/bora-edit.jpeg'
import { Carousel } from '@mantine/carousel'
import Fs from 'fs'
import path from 'path'
import { useState } from 'react'
import { useScrollIntoView } from '@mantine/hooks'

export const getStaticProps: GetStaticProps = () => {
  const images = Fs.readdirSync(path.join(process.cwd(), 'public/pictures'))
  return {
    props: { images },
  }
}

const Home: NextPage<{ images: string[] }> = ({ images }) => {
  const { scrollIntoView, targetRef, scrollableRef } =
    useScrollIntoView<HTMLDivElement>()
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const theme = useMantineTheme()
  const slidePictureHeight = 650
  const slides = images.map((image, i) => (
    <Carousel.Slide key={i}>
      <BackgroundImage src={`/pictures/${image}`} radius='md'>
        <Box sx={{ width: '100%', height: slidePictureHeight }} />
      </BackgroundImage>
    </Carousel.Slide>
  ))
  return (
    <Stack
      pb={30}
      spacing='sm'
      sx={{
        margin: '0 auto',
        maxWidth: theme.breakpoints.xs,
        width: '100%',
        overflowX: 'hidden',
        overflowY: 'scroll',
        fontWeight: 400,
        color: theme.colors.dark[4],
      }}
    >
      <BackgroundImage src={heroImage.src}>
        <Stack
          id='hero'
          m={0}
          py={10}
          align='center'
          justify='space-between'
          sx={{
            width: '100%',
            height: '100vh',
            maxHeight: 700,
            color: theme.colors.gray[0],
          }}
        >
          <Stack
            justify='space-between'
            sx={{
              flex: 1,
            }}
          >
            <Text
              align='center'
              sx={{
                fontSize: theme.fontSizes.lg,
                letterSpacing: 8,
                fontWeight: 600,
              }}
            >
              Wedding Invitation
            </Text>
            <Stack align='center' spacing='xs'>
              <Text
                align='center'
                sx={{
                  fontSize: theme.fontSizes.sm,
                  fontWeight: 400,
                  letterSpacing: 10,
                }}
              >
                우리 결혼합니다
              </Text>
              <Text
                align='center'
                sx={{
                  fontSize: theme.fontSizes.xl,
                  fontWeight: 700,
                  letterSpacing: 12,
                }}
              >
                이보라 & 한건희
              </Text>
              <Text
                align='center'
                sx={{
                  fontSize: theme.fontSizes.sm,
                  fontWeight: 300,
                  letterSpacing: 3,
                }}
              >
                2022 . 11 . 12 . AM 11 : 00
              </Text>
              <Text
                mt={-8}
                align='center'
                sx={{
                  fontSize: theme.fontSizes.xs,
                  fontWeight: 300,
                  letterSpacing: 9,
                }}
              >
                아벤티움 웨딩홀
              </Text>
            </Stack>
          </Stack>
          <UnstyledButton
            sx={{
              color: theme.colors.gray[0],
            }}
            onClick={() => scrollIntoView({ alignment: 'start' })}
          >
            <IconArrowDownCircle size={30} opacity={0.8} />
          </UnstyledButton>
        </Stack>
      </BackgroundImage>
      <SimpleGrid
        m={0}
        cols={1}
        spacing={20}
        sx={{
          backdropFilter: 'blur(1px)',
          textAlign: 'center',
        }}
      >
        <Paper
          ref={targetRef}
          shadow='sm'
          p='sm'
          py='md'
          radius='md'
          withBorder
          sx={{
            height: '100vh',
            maxHeight: 680,
            backgroundColor: theme.colors.gray[0],
            color: theme.colors.dark[4],
          }}
        >
          <Text
            align='center'
            sx={(theme) => ({
              fontSize: theme.fontSizes.sm,
            })}
          >
            평생을 함께 할 사람을 만났습니다. <br />
            지금까지 살아온 모습도 걸어온 길도 달랐지만 <br /> 이제 같은 곳을
            바라보며 함께 걸아가고 싶습니다. <br />
            <br />
            손을 맞잡은 이 순간부터 <br />
            아름답고 소중한 기쁨으로 채워나갈 <br /> 저희의 여정을 지켜봐주세요.{' '}
            <br />
            <br />
            언젠가 &apos;서로 사랑하며 살아도 너무 짧은 삶이었다&apos;고 <br />
            말할 수 있도록 함께 노력하며 살겠습니다.
          </Text>
          <Space h='xl' />
          <Divider variant='dashed' />
          <Space h='xl' />
          <Group id='avatarWrapper' position='apart' px={40}>
            <Stack align='center' spacing='xs'>
              <Avatar
                mx='auto'
                src={geonyAvatar.src}
                size='lg'
                sx={{ borderRadius: '50%' }}
                alt='geony'
              />
              <Text align='center' size='xs'>
                Han GeonHee
              </Text>
              <Group>
                <IconPhone size={20} />
                <IconBrandMessenger size={20} />
                <IconCurrencyWon size={20} />
              </Group>
            </Stack>
            <Box>
              <IconHeart size={25} opacity={0.3} />
            </Box>
            <Stack align='center' spacing='xs'>
              <Avatar
                src={boraAvatar.src}
                size='lg'
                sx={{ borderRadius: '50%' }}
                alt='geony'
              />
              <Text align='center' size='xs'>
                Lee Bora
              </Text>
              <Group>
                <IconPhone size={20} />
                <IconBrandMessenger size={20} />
                <IconCurrencyWon size={20} />
              </Group>
            </Stack>
          </Group>
        </Paper>
        <BackgroundImage src={'/images/wide1.jpg'} radius='md'>
          <Box
            sx={{ width: '100%', height: 200, cursor: 'pointer' }}
            onClick={() => setImageUrl('/images/wide1.jpg')}
          />
        </BackgroundImage>
        <Image
          src={'/images/wide2.jpg'}
          alt='wedding'
          sx={{ width: '100%', cursor: 'pointer' }}
          radius='md'
          onClick={() => setImageUrl('/images/wide2.jpg')}
        />
        <Carousel
          loop
          dragFree
          height={slidePictureHeight}
          sx={{ maxWidth: 380 }}
          slideSize='100%'
        >
          {slides}
        </Carousel>
        <Text sx={{ fontSize: theme.fontSizes.sm, fontWeight: 300 }}>
          2022 . 11 . 12 . AM 11 : 00 아벤티움 웨딩홀
          <Text sx={{ fontSize: theme.fontSizes.xs, fontWeight: 300 }}>
            (서울 중구 청파로 464 브라운스톤서울 3층)
          </Text>
        </Text>
        <KakaoMap />
      </SimpleGrid>
      <Modal
        opened={Boolean(imageUrl)}
        onClose={() => setImageUrl(null)}
        centered
        size='100%'
        sx={{ backgroundColor: 'none' }}
      >
        {imageUrl ? <Image src={imageUrl} alt='wedding picture' /> : null}
      </Modal>
    </Stack>
  )
}

export default Home
