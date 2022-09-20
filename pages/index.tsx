import {
  ActionIcon,
  Alert,
  Anchor,
  Avatar,
  BackgroundImage,
  Box,
  Button,
  Center,
  CloseButton,
  CopyButton,
  Divider,
  Grid,
  Group,
  Image,
  Modal,
  Notification,
  Overlay,
  Paper,
  PasswordInput,
  Popover,
  Space,
  Stack,
  Text,
  Textarea,
  TextInput,
  Transition,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core'
import {
  IconAlertCircle,
  IconArrowDownCircle,
  IconBrandMessenger,
  IconCheck,
  IconClipboard,
  IconClipboardCheck,
  IconCurrencyWon,
  IconEdit,
  IconHeart,
  IconLink,
  IconPhone,
  IconShare,
  IconUser,
  IconWriting,
  IconX,
} from '@tabler/icons'
import type { GetStaticProps, NextPage } from 'next'
import KakaoMap from '../components/KakaoMap'
import heroImage from '../public/images/hero-image.jpg'
import geonyAvatar from '../public/images/geony-profile.jpeg'
import boraAvatar from '../public/images/bora-edit.jpeg'
import Fs from 'fs'
import path from 'path'
import { useEffect, useState } from 'react'
import { useScrollIntoView } from '@mantine/hooks'
import { useRouter } from 'next/router'
import LocationModal from '../components/LocationModal'
import { NextLink } from '@mantine/next'
import { kakaoShare } from '../lib/KakaoShare'
import { useForm } from '@mantine/form'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../lib/firebaseConfig'
import getRandomEmoji from '../lib/randomEmojis'
import { Carousel } from '@mantine/carousel'

interface CommentFormValues {
  name: string
  password: string
  payload: string
}
interface IComment extends CommentFormValues {
  id: string
  createdAt: number
  avatar: string
}

interface EditPwFormValues {
  password: string
}

export const getStaticProps: GetStaticProps = () => {
  const images = Fs.readdirSync(path.join(process.cwd(), 'public/pictures'))
  return {
    props: { images },
  }
}

const isMatchCommentPassword = (password: string, comment: IComment) => {
  if (comment.password === password) {
    return true
  }
  return false
}

const COMMENT = 'comment'

const Home: NextPage<{ images: string[] }> = ({ images }) => {
  const theme = useMantineTheme()
  const router = useRouter()
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>()
  const [photoModalOpened, setPhotoModalOpened] = useState(false)
  const [navigation, setNavigation] = useState(false)
  const [locationInfo, setLocationInfo] = useState(false)
  const [share, setShare] = useState(false)
  const [commentInputOpened, setCommentInputOpened] = useState(true)
  const [loading, setLoading] = useState(false)
  const [commentsArray, setCommentsArray] = useState<IComment[] | null>(null)
  const [selectedComment, setSelectedComment] = useState<IComment | null>(null)
  const [commentPasswordError, setCommentPasswordError] = useState(false)
  const [commentPwModalOpened, setCommentPwModalOpened] = useState(false)
  const [commentEditModalOpened, setCommentEditModalOpened] = useState(false)
  const [imagesArray, setImagesArray] = useState<string[]>(images)

  const selectImage = (image: string) => {
    const copiedImages = [...images]
    const index = copiedImages.findIndex((item) => item === image)
    const previousImages = copiedImages.splice(0, index)
    const sortedImages = [...copiedImages, ...previousImages]
    setImagesArray(sortedImages)
    setPhotoModalOpened(true)
  }

  const slides = imagesArray.map((image, i) => (
    <Carousel.Slide
      key={i}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image
        src={`/pictures/${image}`}
        alt='wedding'
        width={600}
        sx={{ objectFit: 'cover' }}
      />
    </Carousel.Slide>
  ))

  const imagesGrid = images.map((image, i) => {
    const IMAGE = (
      <Image
        src={`/pictures/${image}`}
        alt='wedding'
        sx={{ width: '100%', cursor: 'pointer' }}
        radius='sm'
        onClick={() => {
          selectImage(image)
        }}
      />
    )
    if (i === 0) {
      return (
        <Grid.Col key={i} span={12}>
          {IMAGE}
        </Grid.Col>
      )
    }

    if (image.includes('wide')) {
      return (
        <Grid.Col
          key={i}
          span={6}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          {IMAGE}
        </Grid.Col>
      )
    }

    return (
      <Grid.Col key={i} span={4}>
        {IMAGE}
      </Grid.Col>
    )
  })

  const form = useForm<CommentFormValues>({
    initialValues: {
      name: '',
      password: '',
      payload: '',
    },
    validate: {
      name: (value) => {
        if (!value) {
          return '이름을 입력해주세요.'
        }
        if (value.length < 2) {
          return '이름을 2자 이상 입력해주세요.'
        }
        if (value.length > 10) {
          return '이름은 10자 이하만 가능합니다.'
        }
        return null
      },
      password: (value) => {
        if (!value) {
          return '비밀번호를 입력해주세요. '
        }
        if (value.length < 4) {
          return '비밀번호는 4자 이상 입력해주세요.'
        }
        if (value.length > 8) {
          return '비밀번호는 8자 이하로 입력해주세요.'
        }
        return null
      },
      payload: (value) => {
        if (!value) {
          return '내용을 입력해주세요.'
        }
        if (value.length > 100) {
          return '100자 이하까지 작성 가능합니다.'
        }
        return null
      },
    },
  })

  const commentOnSubmit = async (data: CommentFormValues) => {
    const currentDate = Date.now()
    const commentData = {
      ...data,
      createdAt: currentDate,
      avatar: getRandomEmoji(),
    }
    setLoading(true)
    await addDoc(collection(db, COMMENT), commentData)
    setLoading(false)
    setCommentInputOpened(false)
  }

  const editPwForm = useForm({
    initialValues: {
      password: '',
    },
  })

  const editPwFormOnSubmit = ({ password }: EditPwFormValues) => {
    if (!commentsArray || !selectedComment) return
    if (!isMatchCommentPassword(password, selectedComment)) {
      setCommentPasswordError(true)
      return
    }
    setCommentPwModalOpened(false)
    setCommentEditModalOpened(true)
    editForm.setValues({
      ...selectedComment,
    })
  }

  const editForm = useForm<CommentFormValues>({
    initialValues: {
      name: selectedComment?.name || '',
      password: selectedComment?.password || '',
      payload: selectedComment?.payload || '',
    },
    validate: {
      name: (value) => {
        if (!value) {
          return '이름을 입력해주세요.'
        }
        if (value.length < 2) {
          return '이름을 2자 이상 입력해주세요.'
        }
        if (value.length > 10) {
          return '이름은 10자 이하만 가능합니다.'
        }
        return null
      },
      password: (value) => {
        if (!value) {
          return '비밀번호를 입력해주세요. '
        }
        if (value.length < 4) {
          return '비밀번호는 4자 이상 입력해주세요.'
        }
        if (value.length > 8) {
          return '비밀번호는 8자 이하로 입력해주세요.'
        }
        return null
      },
      payload: (value) => {
        if (!value) {
          return '내용을 입력해주세요.'
        }
        if (value.length > 100) {
          return '100자 이하까지 작성 가능합니다.'
        }
        return null
      },
    },
  })

  const editFormOnSubmit = async (data: CommentFormValues) => {
    if (!selectedComment) return
    setLoading(true)
    await updateDoc(doc(db, COMMENT, selectedComment.id), {
      selectedComment,
      ...data,
      avatar: getRandomEmoji(),
    })
    setLoading(false)
    setCommentEditModalOpened(false)
  }

  const onDeleteComment = async (id?: string) => {
    if (!id) return
    const ok = window.confirm('정말 삭제하시겠습니까? ')
    if (ok) {
      setLoading(true)
      await deleteDoc(doc(db, COMMENT, id))
      setLoading(false)
      setCommentEditModalOpened(false)
      setCommentInputOpened(true)
    }
  }

  useEffect(() => {
    const commentQuery = query(
      collection(db, COMMENT),
      orderBy('createdAt', 'desc'),
    )
    onSnapshot(commentQuery, (snapshot) => {
      const docsArray = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setCommentsArray(docsArray)
    })
  }, [])

  return (
    <Stack
      p={0}
      justify='center'
      spacing='sm'
      sx={{
        margin: '0 auto',
        maxWidth: theme.breakpoints.xs,
        width: '100%',
        overflowY: 'scroll',
        overflowX: 'hidden',
      }}
    >
      {/* Hero */}
      <BackgroundImage src={heroImage.src}>
        <Stack
          id='hero'
          m={0}
          p={0}
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
              py={10}
              sx={{
                fontSize: theme.fontSizes.md,
                letterSpacing: 8,
                fontWeight: 600,
                background:
                  'linear-gradient(to bottom,rgba(0,0,0,.5) 10%,rgba(0,0,0,0.01))',
              }}
            >
              Wedding Invitation
            </Text>
            <Stack
              id='heroBottom'
              align='center'
              spacing='xs'
              pb={5}
              sx={{
                width: theme.breakpoints.xs,
                background:
                  'linear-gradient(to top,rgba(0,0,0,.5) 10%,rgba(0,0,0,0.01))',
              }}
            >
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
              <UnstyledButton
                sx={{
                  color: theme.colors.gray[0],
                }}
                onClick={() => scrollIntoView({ alignment: 'start' })}
              >
                <IconArrowDownCircle size={30} opacity={0.8} />
              </UnstyledButton>
            </Stack>
          </Stack>
        </Stack>
      </BackgroundImage>

      <Divider variant='dotted' mx={10} ref={targetRef} />

      {/* Avatar Info */}
      <Paper
        shadow='sm'
        px='sm'
        mx={5}
        py={5}
        radius='md'
        withBorder
        sx={{
          height: '100%',
          backgroundColor: theme.colors.gray[0],
          color: theme.colors.dark[4],
        }}
      >
        <Image src='/flower.svg' alt='flower' width={250} mx='auto' mb='xl' />
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
          position='center'
          spacing={8}
          sx={{ flexWrap: 'nowrap' }}
        >
          <Stack align='center' spacing='xs'>
            <Avatar
              src={geonyAvatar.src}
              size='lg'
              sx={{ borderRadius: '50%' }}
              alt='geony'
            />

            <Group id='name' spacing={5} align='flex-end'>
              <Text size='xs'>장남</Text>
              <Text size='sm'>한건희</Text>
            </Group>
            <Group spacing={7} sx={{ flexWrap: 'nowrap' }}>
              <ActionIcon component={NextLink} href='tel:010-8291-8410'>
                <IconPhone size={20} />
              </ActionIcon>
              <ActionIcon
                component='a'
                href='http://qr.kakao.com/talk/Mm4aPLwBR24Be2z78zCmsWJvZ9o-'
                target='_blank'
              >
                <IconBrandMessenger size={20} />
              </ActionIcon>
              <Popover
                width={140}
                position='bottom'
                withArrow
                shadow='md'
                radius='md'
              >
                <Popover.Target>
                  <ActionIcon>
                    <IconCurrencyWon size={20} />
                  </ActionIcon>
                </Popover.Target>
                <Popover.Dropdown p={5} px={10}>
                  <Stack
                    spacing={2}
                    sx={{ position: 'relative' }}
                    align='flex-end'
                  >
                    <Text size={theme.fontSizes.xs}>3333016916848 </Text>
                    <Text size={theme.fontSizes.xs}>카카오뱅크 한건희</Text>
                  </Stack>
                  <Box sx={{ position: 'absolute', top: 10, left: 5 }}>
                    <CopyButton value='3333016916848 카카오뱅크'>
                      {({ copied, copy }) =>
                        copied ? (
                          <ActionIcon onClick={copy} color='teal'>
                            <IconClipboardCheck size={20} />
                          </ActionIcon>
                        ) : (
                          <ActionIcon onClick={copy} color='blue'>
                            <IconClipboard size={20} />
                          </ActionIcon>
                        )
                      }
                    </CopyButton>
                  </Box>
                </Popover.Dropdown>
              </Popover>
            </Group>
            <Stack spacing={0}>
              <Group spacing={5} sx={{ flexWrap: 'nowrap' }}>
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
            <Group id='name' spacing={5} align='flex-end'>
              <Text size='xs'>차녀</Text>
              <Text size='sm'>이보라</Text>
            </Group>
            <Group spacing={7} sx={{ flexWrap: 'nowrap' }}>
              <ActionIcon component={NextLink} href='tel:010-5053-1676'>
                <IconPhone size={20} />
              </ActionIcon>
              <ActionIcon
                component='a'
                href='http://qr.kakao.com/talk/2ctFYX5Xt_Y2GB90Wn5MUJAI0L0-'
                target='_blank'
              >
                <IconBrandMessenger size={20} />
              </ActionIcon>
              <Popover
                width={140}
                position='bottom'
                withArrow
                shadow='md'
                radius='md'
              >
                <Popover.Target>
                  <ActionIcon>
                    <IconCurrencyWon size={20} />
                  </ActionIcon>
                </Popover.Target>
                <Popover.Dropdown p={5} px={10}>
                  <Stack
                    spacing={2}
                    sx={{ position: 'relative' }}
                    align='flex-end'
                  >
                    <Text size={theme.fontSizes.xs}>110-356-446903</Text>
                    <Text size={theme.fontSizes.xs}>신한은행 이보라</Text>
                  </Stack>
                  <Box sx={{ position: 'absolute', top: 10, left: 5 }}>
                    <CopyButton value='110-356-446903 신한은행'>
                      {({ copied, copy }) =>
                        copied ? (
                          <ActionIcon onClick={copy} color='teal'>
                            <IconClipboardCheck size={20} />
                          </ActionIcon>
                        ) : (
                          <ActionIcon onClick={copy} color='blue'>
                            <IconClipboard size={20} />
                          </ActionIcon>
                        )
                      }
                    </CopyButton>
                  </Box>
                </Popover.Dropdown>
              </Popover>
            </Group>
            <Stack spacing={0}>
              <Group spacing={5}>
                <Text size='xs'>아버지 : 이호명</Text>
                <ActionIcon component={NextLink} href='tel:010-6810-0662'>
                  <IconPhone size={15} />
                </ActionIcon>
              </Group>
              <Group spacing={5}>
                <Text size='xs'>어머니 : 김미자</Text>
                <ActionIcon component={NextLink} href='tel:010-6754-0654'>
                  <IconPhone size={15} />
                </ActionIcon>
              </Group>
            </Stack>
          </Stack>
        </Group>
        <Image src='/flower2.svg' alt='flower' width={250} mx='auto' mt={9} />
      </Paper>

      <Divider variant='dotted' mx={10} />

      {/* Photo Grid */}
      <Paper
        shadow='sm'
        mx={5}
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

      <Divider variant='dotted' mx={10} />

      {/* Photo Modal */}
      {photoModalOpened && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 990,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CloseButton
            size={35}
            p={5}
            sx={{
              position: 'absolute',
              top: 30,
              right: 30,
              zIndex: 999,
              backgroundColor: theme.fn.rgba(theme.white, 0.5),
              borderRadius: '50%',
              cursor: 'pointer',
            }}
            onClick={() => setPhotoModalOpened(false)}
          />
          <Carousel
            loop
            sx={{
              width: '100%',
              zIndex: 998,
            }}
            styles={{
              control: {
                width: 35,
                height: 35,
              },
            }}
          >
            {slides}
          </Carousel>
          <Overlay
            color='black'
            onClick={() => {
              setPhotoModalOpened(false)
            }}
          />
        </div>
      )}

      {/* Bottom */}
      <Paper
        mx={5}
        shadow='sm'
        p='sm'
        py='md'
        mb={10}
        radius='md'
        withBorder
        sx={{
          backgroundColor: theme.colors.gray[0],
          color: theme.colors.dark[4],
        }}
      >
        <Stack align='center'>
          <Text sx={{ fontSize: theme.fontSizes.md, fontWeight: 400 }}>
            2022 . 11 . 12 (토) AM 11 : 00
          </Text>
          <Text
            align='center'
            id='location'
            sx={{ fontSize: theme.fontSizes.md, fontWeight: 400 }}
          >
            아벤티움 웨딩홀
            <Text sx={{ fontSize: theme.fontSizes.sm, fontWeight: 300 }}>
              (서울 중구 청파로 464 브라운스톤서울 3층)
            </Text>
          </Text>
          <KakaoMap />
          <Alert
            icon={<IconAlertCircle size={16} />}
            px={15}
            py={7}
            title='주차 안내'
            sx={{ width: '90%' }}
          >
            <Text
              sx={(theme) => ({
                fontSize: theme.fontSizes.xs,
              })}
            >
              건물 지하에 주차 가능하며 <br />
              별관(서소문공원)주차장을 이용하시면 <br /> 더욱 여유롭게 주차장을
              이용하실 수 있습니다.
            </Text>
          </Alert>
          <Group sx={{ width: '100%' }} position='center'>
            <Button
              color='blue.5'
              sx={{ width: '40%' }}
              onClick={() => setLocationInfo(true)}
            >
              🚍 오시는길
            </Button>
            <Button
              color='green.5'
              sx={{ width: '40%' }}
              onClick={() => setNavigation(true)}
            >
              🚘 네비게이션
            </Button>
          </Group>
          <Button
            color='yellow.5'
            sx={{ width: '84%' }}
            onClick={() => setShare(true)}
          >
            <IconShare size={15} /> <Text ml={5}>공유하기</Text>
          </Button>
        </Stack>
      </Paper>

      {/* Comment Section*/}
      <Paper
        shadow='sm'
        px='sm'
        mx={5}
        py={5}
        radius='md'
        withBorder
        sx={{
          height: '100%',
          backgroundColor: theme.colors.gray[0],
          color: theme.colors.dark[4],
          position: 'relative',
        }}
      >
        <ActionIcon
          hidden={commentInputOpened}
          color='blue'
          sx={{ position: 'absolute', top: 10, right: 20 }}
          onClick={() => setCommentInputOpened(true)}
        >
          <IconWriting size={30} />
        </ActionIcon>
        <Text my={10} size='md' align='center' sx={{ fontWeight: 300 }}>
          Celebrations 🎉
        </Text>
        <Stack spacing={10} mb={5}>
          <Transition
            mounted={commentInputOpened}
            transition='fade'
            duration={500}
            timingFunction='ease'
          >
            {(styles) => (
              <Box
                style={styles}
                p={5}
                py={20}
                sx={{
                  backgroundColor: theme.colors.gray[2],
                  borderRadius: theme.radius.md,
                  position: 'relative',
                }}
              >
                <form onSubmit={form.onSubmit(commentOnSubmit)}>
                  <Stack spacing={10}>
                    <Group spacing={0} position='center'>
                      <TextInput
                        placeholder='성함을 입력해주세요.'
                        label='성함'
                        minLength={2}
                        maxLength={10}
                        withAsterisk
                        {...form.getInputProps('name')}
                        sx={{
                          width: 180,
                        }}
                      />
                      <PasswordInput
                        label='비밀번호'
                        withAsterisk
                        ml={10}
                        minLength={4}
                        maxLength={8}
                        sx={{ width: 98 }}
                        {...form.getInputProps('password')}
                      />
                      <CloseButton
                        size='lg'
                        sx={{ position: 'absolute', top: 5, right: 5 }}
                        onClick={() => setCommentInputOpened(false)}
                      />
                    </Group>
                    <Stack align='center' spacing={10}>
                      <Textarea
                        placeholder='축하 인사말을 작성해주세요.'
                        withAsterisk
                        {...form.getInputProps('payload')}
                        sx={{
                          width: 290,
                        }}
                        m={0}
                      />

                      <Button
                        disabled={loading}
                        type='submit'
                        mr={20}
                        sx={{
                          alignSelf: 'flex-end',
                          width: 90,
                          height: 35,
                        }}
                      >
                        입력
                      </Button>
                    </Stack>
                  </Stack>
                </form>
              </Box>
            )}
          </Transition>
          {commentsArray?.map((comment, i) => (
            <Box
              key={i}
              id='aComment'
              p={5}
              style={{
                height: '100%',
                position: 'relative',
                backgroundColor: theme.colors.gray[2],
                borderRadius: theme.radius.md,
              }}
            >
              <Group noWrap>
                <Avatar color='blue' radius='xl'>
                  {comment.avatar ? (
                    <Text size='xl'>{comment.avatar}</Text>
                  ) : (
                    <IconUser size={25} />
                  )}
                </Avatar>
                <Stack spacing={0}>
                  <Group>
                    <Text size='sm' sx={{ fontWeight: 500 }}>
                      {comment.name}
                    </Text>
                    <Text size={10} color='dimmed'>
                      {new Date(comment.createdAt).toLocaleDateString('ko')}
                    </Text>
                  </Group>
                  <Text size='sm' mt={5} sx={{ lineBreak: 'anywhere' }}>
                    {comment.payload}
                  </Text>
                </Stack>
              </Group>
              <Group
                sx={{ position: 'absolute', top: 5, right: 5 }}
                spacing='xs'
              >
                <ActionIcon
                  color='blue'
                  onClick={() => {
                    setSelectedComment(comment)
                    setCommentPwModalOpened(true)
                  }}
                >
                  <IconEdit size={20} />
                </ActionIcon>
              </Group>
            </Box>
          ))}
        </Stack>
      </Paper>

      {/* Navigation Modal */}
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
          <ActionIcon sx={{ width: 50 }}>
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
          </ActionIcon>
          <ActionIcon sx={{ width: 50 }}>
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
          </ActionIcon>
        </Group>
      </Modal>

      {/* 오시는 길 Modal */}
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

      {/* Share Modal */}
      <Modal
        opened={share}
        onClose={() => setShare(false)}
        centered
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
          <ActionIcon
            sx={{ width: 50 }}
            data-href='https://geony-bora.vercel.app'
          >
            <a
              target='_blank'
              rel='noreferrer'
              href='https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse'
            >
              <Image
                src='/facebook.png'
                width={50}
                alt='facebook'
                onClick={() => router.push('/')}
              />
            </a>
          </ActionIcon>
          <ActionIcon sx={{ width: 50 }} onClick={() => kakaoShare()}>
            <Image
              src='/kakaotalk.png'
              width={50}
              alt='kakaotalk'
              onClick={() => router.push('/')}
            />
          </ActionIcon>

          <CopyButton value='https://geony-bora.vercel.app/'>
            {({ copied, copy }) => {
              if (copied) {
                return (
                  <>
                    <Notification
                      icon={<IconCheck size={18} />}
                      color='teal'
                      sx={{
                        width: 200,
                        position: 'absolute',
                        top: -60,
                        left: 0,
                        right: 0,
                        margin: '0 auto',
                        zIndex: 999,
                      }}
                    >
                      주소 복사 완료
                    </Notification>
                    <ActionIcon
                      sx={{
                        width: 50,
                        height: 50,
                        backgroundColor: theme.colors.red[5],
                      }}
                      onClick={copy}
                    >
                      <IconLink size={40} color='white' />
                    </ActionIcon>
                  </>
                )
              } else {
                return (
                  <ActionIcon
                    sx={{
                      width: 50,
                      height: 50,
                      backgroundColor: theme.colors.green[5],
                    }}
                    onClick={copy}
                  >
                    <IconLink size={40} color='white' />
                  </ActionIcon>
                )
              }
            }}
          </CopyButton>
        </Group>
      </Modal>

      {/* Comment PW Modal */}
      <Modal
        opened={commentPwModalOpened}
        centered
        withCloseButton={false}
        onClose={() => setCommentPwModalOpened(false)}
        size={240}
        styles={{
          modal: {
            background: theme.fn.rgba(theme.white, 0.8),
          },
        }}
      >
        <form onSubmit={editPwForm.onSubmit(editPwFormOnSubmit)}>
          <Group spacing={5} align='flex-end'>
            <PasswordInput
              data-autofocus
              label='비밀번호'
              withAsterisk
              minLength={4}
              maxLength={8}
              sx={{ width: 160 }}
              {...editPwForm.getInputProps('password')}
            />
            <Button
              type='submit'
              p={0}
              sx={{
                width: 35,
                height: 35,
              }}
            >
              입력
            </Button>
          </Group>
        </form>
        {commentPasswordError && (
          <Notification
            icon={<IconX size={18} />}
            color='red'
            onClose={() => setCommentPasswordError(false)}
          >
            비밀번호가 틀렸습니다.
          </Notification>
        )}
      </Modal>

      {/* Comment Edit Modal */}
      <Modal
        centered
        size={340}
        opened={commentEditModalOpened}
        onClose={() => {
          setCommentEditModalOpened(false)
          setSelectedComment(null)
        }}
        styles={{
          header: {
            height: 0,
          },
        }}
      >
        <form onSubmit={editForm.onSubmit(editFormOnSubmit)}>
          <Stack spacing={0} align='center'>
            <Group
              sx={{ width: 350, height: 80 }}
              spacing={0}
              position='center'
            >
              <TextInput
                placeholder='성함을 입력해주세요.'
                label='성함'
                minLength={2}
                maxLength={10}
                withAsterisk
                {...editForm.getInputProps('name')}
                sx={{
                  width: 140,
                }}
              />
              <PasswordInput
                label='비밀번호'
                withAsterisk
                ml={10}
                minLength={4}
                maxLength={8}
                sx={{ width: 98 }}
                {...editForm.getInputProps('password')}
              />
            </Group>
            <Stack spacing={10}>
              <Textarea
                placeholder='축하 인사말을 작성해주세요.'
                withAsterisk
                {...editForm.getInputProps('payload')}
                sx={{
                  width: 250,
                }}
                m={0}
              />
              <Group position='apart' px={20}>
                <Button
                  color='red'
                  disabled={loading}
                  p={0}
                  sx={{
                    width: 90,
                    height: 35,
                  }}
                  onClick={() => onDeleteComment(selectedComment?.id)}
                >
                  삭제 하기
                </Button>
                <Button
                  disabled={loading}
                  type='submit'
                  p={0}
                  sx={{
                    width: 90,
                    height: 35,
                  }}
                >
                  수정 완료
                </Button>
              </Group>
            </Stack>
          </Stack>
        </form>
      </Modal>

      {/* Footer */}
      <Anchor
        align='center'
        href='https://github.com/geonya'
        mb={30}
        color='gray'
      >
        Made by Geony 🚀
      </Anchor>
    </Stack>
  )
}

export default Home
