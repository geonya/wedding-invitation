import { Modal } from '@mantine/core'
import { useEffect, useState } from 'react'
import LocationModal from './LocationModal'
export default function KakaoMap() {
  const [opened, setOpened] = useState(false)
  useEffect(() => {
    const mapScript = document.createElement('script')
    mapScript.async = true
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&autoload=false&libr/aries=services`
    document.head.appendChild(mapScript)
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map')
        if (!mapContainer) return
        const mapOptions = {
          center: new window.kakao.maps.LatLng(
            37.5608187887289,
            126.968225883547,
          ),
          level: 3,
        }
        const map = new window.kakao.maps.Map(mapContainer, mapOptions)
        const markerPosition = new window.kakao.maps.LatLng(
          37.5608187887289,
          126.968225883547,
        )
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        })
        marker.setMap(map)

        window.kakao.maps.event.addListener(marker, 'click', function () {
          // 마커 위에 인포윈도우를 표시합니다
          setOpened(true)
        })

        const zoomControl = new window.kakao.maps.ZoomControl()
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT)
      })
    }
    mapScript.addEventListener('load', onLoadKakaoMap)
  }, [])
  return (
    <>
      <div
        id='map'
        style={{ width: '100%', height: 300, backgroundColor: 'gray' }}
      />
      <Modal
        title='아벤티움 웨딩홀 오시는 길'
        opened={opened}
        onClose={() => setOpened(false)}
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
    </>
  )
}
