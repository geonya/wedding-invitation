import {
  ActionIcon,
  Avatar,
  BackgroundImage,
  Box,
  Button,
  Divider,
  Grid,
  Group,
  Image,
  Modal,
  Paper,
  Space,
  Stack,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core'
import {
  IconArrowDownCircle,
  IconBrandMessenger,
  IconCurrencyWon,
  IconHeart,
  IconPhone,
} from '@tabler/icons'
import type { GetStaticProps, NextPage } from 'next'
import KakaoMap from '../components/KakaoMap'
import heroImage from '../public/images/hero-image.jpg'
import geonyAvatar from '../public/images/geony-profile.jpeg'
import boraAvatar from '../public/images/bora-edit.jpeg'
import { Carousel, Embla, useAnimationOffsetEffect } from '@mantine/carousel'
import Fs from 'fs'
import path from 'path'
import { useState } from 'react'
import { useScrollIntoView } from '@mantine/hooks'
import { useRouter } from 'next/router'
import LocationModal from '../components/LocationModal'
import { NextLink } from '@mantine/next'

const TRANSITION_DURATION = 200

export const getStaticProps: GetStaticProps = () => {
  const images = Fs.readdirSync(path.join(process.cwd(), 'public/pictures'))
  return {
    props: { images },
  }
}

const Home: NextPage<{ images: string[] }> = ({ images }) => {
  const theme = useMantineTheme()
  const router = useRouter()
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [imagesArray, setImagesArray] = useState<string[]>(images)
  const [embla, setEmbla] = useState<Embla | null>(null)
  const [navigation, setNavigation] = useState(false)
  const [locationInfo, setLocationInfo] = useState(false)
  const selectImage = (image: string) => {
    const copiedImages = [...images]
    const index = copiedImages.findIndex((item) => item === image)
    const previousImages = copiedImages.splice(0, index)
    const sortedImages = [...copiedImages, ...previousImages]
    setImagesArray(sortedImages)
    setSelectedImage(image)
  }
  const imagesGrid = images.map((image, i) => {
    if (i === 0) {
      return (
        <Grid.Col key={i} span={12}>
          <Image
            src={`/pictures/${image}`}
            alt='wedding'
            sx={{ width: '100%', cursor: 'pointer' }}
            radius='sm'
            onClick={() => selectImage(image)}
          />
        </Grid.Col>
      )
    }
    if (i === 1 || i === 2) {
      return (
        <Grid.Col key={i} span={6}>
          <Image
            src={`/pictures/${image}`}
            alt='wedding'
            sx={{ width: '100%', cursor: 'pointer' }}
            radius='sm'
            onClick={() => selectImage(image)}
          />
        </Grid.Col>
      )
    }
    if (i >= images.length - 4) {
      return (
        <Grid.Col key={i} span={6}>
          <Image
            src={`/pictures/${image}`}
            alt='wedding'
            sx={{ width: '100%', cursor: 'pointer' }}
            radius='sm'
            onClick={() => selectImage(image)}
          />
        </Grid.Col>
      )
    }
    return (
      <Grid.Col key={i} span={4}>
        <Image
          src={`/pictures/${image}`}
          alt='wedding'
          sx={{ width: '100%', cursor: 'pointer' }}
          radius='sm'
          onClick={() => selectImage(image)}
        />
      </Grid.Col>
    )
  })
  const slides = imagesArray.map((image, i) => (
    <Carousel.Slide key={i} sx={{ display: 'flex', alignItems: 'center' }}>
      <Image
        src={`/pictures/${image}`}
        alt='wedding'
        sx={{ width: '100%', objectFit: 'cover' }}
      />
    </Carousel.Slide>
  ))
  useAnimationOffsetEffect(embla, TRANSITION_DURATION)
  return (
    <Stack
      pb={30}
      spacing='sm'
      sx={{
        position: 'relative',
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

      <Paper
        ref={targetRef}
        shadow='sm'
        px='sm'
        py={5}
        radius='md'
        withBorder
        sx={{
          height: '100vh',
          maxHeight: 680,
          backgroundColor: theme.colors.gray[0],
          color: theme.colors.dark[4],
        }}
      >
        <Image src='/flower.svg' alt='flower' width={300} mx='auto' mb='xl' />
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
        <Space h='md' />
        <Divider variant='dashed' />
        <Space h='md' />
        <Group
          id='avatarWrapper'
          position='apart'
          px={15}
          sx={{ flexWrap: 'nowrap' }}
        >
          <Stack align='center' spacing='xs'>
            <Avatar
              mx='auto'
              src={geonyAvatar.src}
              size='lg'
              sx={{ borderRadius: '50%' }}
              alt='geony'
            />
            <Text align='center' size='sm'>
              Han GeonHee
            </Text>
            <Group spacing={7}>
              <ActionIcon component={NextLink} href='tel:010-8291-8410'>
                <IconPhone size={20} />
              </ActionIcon>
              <ActionIcon>
                <IconBrandMessenger size={20} />
              </ActionIcon>
              <ActionIcon>
                <IconCurrencyWon size={20} />
              </ActionIcon>
            </Group>
            <Stack spacing={0}>
              <Group spacing={5}>
                <Text size='xs'>아버지 : 한상기</Text>
                <ActionIcon component={NextLink} href='tel:010-2248-8410'>
                  <IconPhone size={15} />
                </ActionIcon>
              </Group>
              <Group spacing={5}>
                <Text size='xs'>어머니 : 임민옥</Text>
                <ActionIcon component={NextLink} href='tel:010-9155-8410'>
                  <IconPhone size={15} />
                </ActionIcon>
              </Group>
            </Stack>
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
            <Text align='center' size='sm'>
              Lee Bora
            </Text>
            <Group spacing={7}>
              <ActionIcon component={NextLink} href='tel:010-5053-1676'>
                <IconPhone size={20} />
              </ActionIcon>
              <ActionIcon>
                <IconBrandMessenger size={20} />
              </ActionIcon>
              <ActionIcon>
                <IconCurrencyWon size={20} />
              </ActionIcon>
            </Group>
            <Stack spacing={0}>
              <Group spacing={5}>
                <Text size='xs'>아버지 : 이호성</Text>
                <ActionIcon component={NextLink} href='tel:010-2248-8410'>
                  <IconPhone size={15} />
                </ActionIcon>
              </Group>
              <Group spacing={5}>
                <Text size='xs'>어머니 : </Text>
                <ActionIcon component={NextLink} href='tel:010-9243-8410'>
                  <IconPhone size={15} />
                </ActionIcon>
              </Group>
            </Stack>
          </Stack>
        </Group>
        <Image src='/flower2.svg' alt='flower' width={300} mx='auto' mt={9} />
      </Paper>
      <Paper
        shadow='sm'
        p='sm'
        py='md'
        radius='md'
        withBorder
        sx={{
          backgroundColor: theme.colors.gray[0],
          color: theme.colors.dark[4],
        }}
      >
        <Grid grow gutter={3}>
          {imagesGrid}
        </Grid>
      </Paper>

      <Modal
        opened={Boolean(selectedImage)}
        size='370px'
        padding={0}
        centered
        transitionDuration={TRANSITION_DURATION}
        onClose={() => setSelectedImage(null)}
        styles={{
          modal: {
            background: 'none',
          },
          close: {
            backgroundColor: theme.fn.rgba(theme.white, 0.5),
            color: theme.colors.dark[4],
            borderRadius: '50%',
          },
        }}
      >
        <Carousel loop getEmblaApi={setEmbla}>
          {slides}
        </Carousel>
      </Modal>
      <Stack align='center'>
        <Text
          align='center'
          id='location'
          sx={{ fontSize: theme.fontSizes.sm, fontWeight: 300 }}
        >
          2022 . 11 . 12 . AM 11 : 00 아벤티움 웨딩홀
          <Text sx={{ fontSize: theme.fontSizes.xs, fontWeight: 300 }}>
            (서울 중구 청파로 464 브라운스톤서울 3층)
          </Text>
        </Text>
        <KakaoMap />
        <Text
          align='center'
          sx={(theme) => ({
            fontSize: theme.fontSizes.xs,
          })}
        >
          별관(서소문공원)주차장을 이용하시면 <br /> 더욱 여유롭게 주차장을
          이용하실 수 있습니다.
        </Text>

        <Button
          color='cyan'
          sx={{ width: '80%' }}
          mb={-10}
          onClick={() => setLocationInfo(true)}
        >
          🚍 오시는길
        </Button>
        <Button
          color='green'
          sx={{ width: '80%' }}
          onClick={() => setNavigation(true)}
        >
          🚘 네비게이션
        </Button>

        <Modal
          opened={navigation}
          onClose={() => setNavigation(false)}
          centered
          size={200}
          withCloseButton={false}
          styles={{
            modal: {
              background: theme.fn.rgba(theme.white, 0.5),
            },
            close: {
              backgroundColor: theme.fn.rgba(theme.white, 0.5),
              color: theme.colors.dark[4],
              borderRadius: '50%',
            },
            title: {
              margin: '0 auto',
            },
          }}
        >
          <Group position='center' spacing='xl'>
            <Image
              src='/kakaomap.png'
              width={50}
              alt='kakaomap'
              onClick={() =>
                router.push(
                  'https://map.kakao.com/link/to/아벤티움웨딩홀,37.5608187887289,126.968225883547',
                )
              }
            />
            <Image
              src='/navermap.png'
              width={50}
              alt='navermap'
              onClick={() =>
                router.push(
                  'nmap://navigation?dlat=37.5608187887289&dlng=126.968225883547&dname=아벤티움웨딩홀&appname=http://localhost:3000',
                )
              }
            />
          </Group>
        </Modal>
        <Modal
          title='아벤티움 웨딩홀 오시는 길'
          opened={locationInfo}
          onClose={() => setLocationInfo(false)}
          size='sm'
          overflow='inside'
          styles={{
            title: {
              margin: '0 auto',
            },
          }}
        >
          <LocationModal />
        </Modal>
      </Stack>
    </Stack>
  )
}

export default Home
