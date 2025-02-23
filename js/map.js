let panel = document.querySelectorAll('.panel');

// 아코디언 기능 활성화 설정
for (let pl of panel) {
  pl.addEventListener('click', function(e) {
    click_panel = e.currentTarget;

    // 해당 패널을 클릭하면 펼쳐지고, 아닌 경우는 접힘
    click_panel.classList.toggle('active');
    for (let sib of panel) {
      if (sib !== click_panel) {
        sib.classList.remove('active');
      }
    }

    /* chatGPT를 통한 오류 수정 해결방안 질문 */
    // 클릭 후에 지도를 다시 그림 (아코디언 펼쳐질시)
    if (click_panel.classList.contains('active')) {
      let lat = click_panel.querySelector('h3').dataset.lat; //lat 재선언
      let lng = click_panel.querySelector('h3').dataset.lng; //lng 재선언
      let mmap = click_panel.querySelector('.g_map'); //출력위치 재선언
      kmap(lat, lng, mmap); //값 호출
    }
  });
}

// 각 구청 클릭 시 지도 표시 이벤트 처리
panel.forEach((menu) => {
  let titleElement = menu.querySelector('h3'); // h3 요소를 클릭하여 지도 불러오기 (chatGPT를 통한 오류 수정 해결방안 질문)
  titleElement.addEventListener('click', (ev) => {
    let lat = ev.target.dataset.lat; //data-lat 값 불러오기
    let lng = ev.target.dataset.lng; //data-lng 값 불러오기
    let title = ev.target.innerText; //h3의 내용 불러오기 (i태그 제외)
    let mmap = menu.querySelector('.g_map'); // 해당 패널 안의 지도 div를 찾음

    // console.log(lat, lng, title, mmap);

    // 지도 출력 함수 호출
    kmap(lat, lng, title, mmap);
  });
});


function kmap(lat, lng, title, mmap) {
  /* chatGPT를 통한 오류 수정 해결방안 질문 */
  // mmap 유효여부 확인
  if (!mmap) {
    // console.error('Invalid map container element.');
    return;
  }
  // 기존 지도 삭제 (아코디언 접힐시) - 존재할 경우 destroy() 호출 전 객체 확인
  if (mmap._kakaoMap && typeof mmap._kakaoMap.destroy === 'function') {
    mmap._kakaoMap.destroy();
  }

  /* Kakao Maps API Sample - '마커에 인포윈도우 표시하기' 기반 */
  var mapContainer = mmap, /* chatGPT를 통한 오류 수정 해결방안 질문 */
  mapOption = {
    center: new kakao.maps.LatLng(lat, lng),
    level: 3
  };

  var map = new kakao.maps.Map(mapContainer, mapOption);

  // 마커가 표시될 위치입니다 
  var markerPosition  = new kakao.maps.LatLng(lat, lng);

  // 마커를 생성합니다
  var marker = new kakao.maps.Marker({
    position: markerPosition
  });

  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);

  var iwContent = '<div style="g_map_marker">' + title + '</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    iwPosition = new kakao.maps.LatLng(lat, lng); //인포윈도우 표시 위치입니다

  // 인포윈도우를 생성합니다
  var infowindow = new kakao.maps.InfoWindow({
    position : iwPosition, 
    content : iwContent 
  });

  // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
  infowindow.open(map, marker); 

  mmap._kakaoMap = map; // 기존 맵 객체 저장
}
