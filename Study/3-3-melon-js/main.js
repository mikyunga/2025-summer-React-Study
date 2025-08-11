// 즉시 실행 vs 예약 구분하기
// 1단계: 요소를 가져오는 것
// 2단계: 요소를 조작하는 것

//차트 탭 구현하기
//요소 가져오기
const chartTabs = document.getElementById('chartTabs');
const chartContainer = document.getElementById('chartContainer');
const timeText = document.getElementById('timeText');
// 현재 열린 창
let currentTab = 1;

function refrestChartTabs() {
  chartsData.reverse().forEach(({ id, title }) => {
    const newButton = document.createElement('button');
    newButton.innerText = title;

    // 스타일 조작
    // newButton.style.all = 'unset';

    // 클래스 조작
    // newButton.className = 'tab-btn';
    // newButton.className = 'asfsdds';

    // 클래스 리스트
    newButton.classList.add('tab-btn');
    if (currentTab === id) {
      newButton.classList.add('active');
    }

    // 클릭 이벤트 부여
    // 코드 예약
    newButton.addEventListener('click', () => {
      currentTab = id;

      // document가 아닌 chartTabs에서의 className tab-btn을 찾음
      const tabs = chartTabs.getElementsByClassName('tab-btn');
      const tabsArr = [...tabs];
      tabsArr.forEach((tabNode) => {
        tabNode.classList.remove('active');
      });
      // event를 쓰지 않았는데 이걸 넣는건 괜찮은건가?
      event.target.classList.add('active');

      refreshChart();
    });
    chartTabs.prepend(newButton);
  });
}

// 자바스크립트로 hover하는법 (비추천)
// newButton.addEventListener('mouseenter', (event) => {
//   event.target.classList.add('active');
// });
// newButton.addEventListener('mouseleave', (event) => {
//   event.target.classList.remove('active');
// });

// 탭버튼을 누를때마다 실행됨 = 재활용가능 => 함수로만들자!
function refreshChart() {
  const currentChart = chartsData.find(({ id }) => id === currentTab);
  const { musics } = currentChart;

  chartContainer.innerHTML = musics.reduce((acc, musicId, index) => {
    const { title, authors, coverImg } = musicsData.find(
      ({ id }) => id === musicId
    );

    return (
      acc +
      `
        <div class="chart-item">

          <!-- 앨범 커버 이미지 -->
          <img class="chart-item__img" src="img/${coverImg}" alt="${title}" />

          <!-- 순위, 순위변동 -->
          <div class="chart-item__rank-group">
            <span class="chart-item__rank">${index + 1}</span>
            <div class="rank-same">-</div>
          </div>

          <!-- 앨범 정보(노래 제목, 아티스트명) -->
          <div class="chart-item__album">
            <p class="chart-item__title">${title}</p>
            <span class="chart-item__artist">
              ${authors.join(', ')}
            </span>
          </div>

          <!-- 재생 버튼 -->
          <button class="chart-item__play">
            <img src="img/play.png" alt="" />
          </button>
        </div>
    `
    );
  }, '');
}

function refreshTime() {
  timeText.innerText = `오늘 ${new Date()
    .getHours()
    .toString()
    .padStart(2, '0')}:00 기준`;
}

// 맨 처음 실행되어야하는 함수들을 호출하는 함수
function init() {
  refrestChartTabs();
  refreshChart();
  refreshTime();
}

init();

// 차트목록생성하기 (복잡)
// musics.forEach((musicId, index) => {
//   const foundMusic = musicsData.find(({ id }) => id === musicId);

//   const chartItem = document.createElement('div');
//   chartItem.classList.add('chart-item');

//   const chartItemImg = document.createElement('img');
//   chartItemImg.classList.add('chart-item__img');
//   chartItemImg.setAttribute('src', `img/${foundMusic.coverImg}`);
//   chartItemImg.setAttribute('alt', foundMusic.title);
//   console.log(chartItemImg.attributes);

//   const chartItemRankGroup = document.createElement('div');
//   chartItemRankGroup.classList.add('chart-item__rank-group');

//   const chartItemRank = document.createElement('span');
//   chartItemRank.classList.add('chart-item__rank');
//   chartItemRank.innerText = index + 1;

//   const chartItemRankSame = document.createElement('div');
//   chartItemRankSame.classList.add('rank-same');
//   chartItemRankSame.innerText = '-';

//   const chartItemAlbum = document.createElement('div');
//   chartItemAlbum.classList.add('chart-item__album');

//   const chartItemTitle = document.createElement('p');
//   chartItemTitle.classList.add('chart-item__title');
//   chartItemTitle.innerText = foundMusic.title;

//   const chartItemArtist = document.createElement('span');
//   chartItemArtist.classList.add('chart-item__artist');
//   // chartItemArtist.innerText = foundMusic.authors.reduce(
//   //   (acc, author, index) =>
//   //     acc + author + (foundMusic.authors.length === index + 1 ? '' : ', '),
//   //   ''
//   // );
//   chartItemArtist.innerText = foundMusic.authors.join(', ');
//   console.log(chartItemArtist.innerText);

//   const chartItemPlay = document.createElement('button');
//   chartItemPlay.classList.add('chart-item__play');

//   const chartItemPlayImg = document.createElement('img');
//   chartItemPlayImg.setAttribute('src', 'img/play.png');
//   chartItemPlayImg.setAttribute('alt', 'play button');

//   chartItemRankGroup.append(chartItemRank);
//   chartItemRankGroup.append(chartItemRankSame);

//   chartItemAlbum.append(chartItemTitle);
//   chartItemAlbum.append(chartItemArtist);

//   chartItemPlay.append(chartItemPlayImg);

//   chartItem.append(chartItemImg);
//   chartItem.append(chartItemRankGroup);
//   chartItem.append(chartItemAlbum);
//   chartItem.append(chartItemPlay);

//   chartContainer.append(chartItem);
// });
