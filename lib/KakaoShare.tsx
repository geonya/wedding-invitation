export function kakaoShare() {
  window.Kakao.Share.sendDefault({
    objectType: 'location',
    address: '서울 중구 청파로 464 브라운스톤서울 3층',
    addressTitle: '아벤티움 웨딩홀',
    content: {
      title: '한건희 ❤️ 이보라 우리 결혼합니다!',
      description: '11월 12일 (토) 11시 아벤티움 웨딩홀',
      imageUrl: 'https://geony-bora.vercel.app/pictures/10.jpg',
      link: {
        mobileWebUrl: 'https://geony-bora.vercel.app/',
        webUrl: 'https://geony-bora.vercel.app/',
      },
    },
    social: {
      likeCount: 1112,
      commentCount: 629,
      sharedCount: 604,
    },
    buttons: [
      {
        title: '청첩장 보기',
        link: {
          mobileWebUrl: 'https://geony-bora.vercel.app/',
          webUrl: 'https://geony-bora.vercel.app/',
        },
      },
    ],
    installTalk: true,
  })
}
