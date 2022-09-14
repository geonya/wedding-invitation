import { Anchor, Box, Image, Text } from '@mantine/core'

export default function LocationModal() {
  return (
    <Box sx={(theme) => ({ fontSize: theme.fontSizes.sm })}>
      <Text>
        ✔️ 서울 중구 청파로 464 브라운스톤서울 3층 <br />
        (지번) 중림동 355
      </Text>
      <Anchor href='tel:02-313-2480'>☎️ 02-313-2480</Anchor>
      <br />
      <Anchor href='http://www.aventium.co.kr/' target='_blank'>
        http://www.aventium.co.kr/
      </Anchor>
      <Image
        src='http://www.aventium.co.kr/img/map2.gif'
        width='100%'
        alt='map'
        my={20}
      />
      <dl className='mapUse'>
        <dt>
          <strong>서울역 이용시</strong>
        </dt>
        <dd className='color'>
          ▶ KTX서울역 3번출구 (서울역 서부광장 / 롯데마트 후문) 직진 후
          한국경제신문사 맞은편 (도보 10분){' '}
        </dd>
        <dt>
          <strong>지하철 이용시</strong>
        </dt>
        <dd className='color'>
          ▶ 2, 5호선 충정로역 4번 출구 (도보5분)
          <br />
          <span>
            &rarr; 출구방향으로 70M 직진 후 횡단보도 건너편 브라운스톤서울 3층
          </span>
        </dd>
        <dd className='color'>
          ▶ 1, 4호선 KTX서울역 3번출구 / 서울역 서부광장 방향 (도보10분)
          <br />
          <span>
            &rarr; 서부광장 방향으로 나오신 후 한국경제신문사 방향 이동 후
            맞은편
          </span>
        </dd>
        <dt>
          <strong>버스 이용시</strong>
        </dt>
        <dd>
          <li>
            - 한국경제신문사 :<br />
            &nbsp;(02516, 02109)
            <span>
              [마을] 서대문06
              <br />
              [간선] 370, 603
              <br />
              [지선] 7011, 7013A, 7013B, 7017
            </span>
          </li>
          <li>
            - 경찰청.동북아역사재단 :<br />
            &nbsp;(13039)
            <span>
              [간선] 103, 150, 701, 704, 708, 750A, 750B, 751, 752 <br />
              [지선] 7021, 7024
            </span>
          </li>
          <li>
            - 서울역서부 :<br />
            &nbsp;(02105)
            <span>
              [간선] 173, 261, 262, 463, 503, 604
              <br />
              [지선] 7021, 7024{' '}
            </span>
          </li>
          <li>
            - 종근당.충정로역 :<br />
            &nbsp;(02107)
            <span>
              [간선] 172, 472, 603
              <br />
              [광역] 1000인천, 1100인천, 1101인천, 1200인천, 1300인천, 1301인천,
              <br />
              1302인천, 1400인천, 1500인천, 1601인천{' '}
            </span>
          </li>
        </dd>
        <dt>
          <strong>KTX(서울역)</strong>
        </dt>
        <dd className='color'>
          ▶ KTX서울역 3번출구 (서울역 서부광장방향 / 롯데마트 후문)
          <br />
          <span>
            &rarr; 서대문 06번 탑승 → 한국경제 신문사 건너편 하차 (한정거장)
          </span>
        </dd>
      </dl>
    </Box>
  )
}
