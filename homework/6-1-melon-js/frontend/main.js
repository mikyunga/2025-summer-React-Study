// import { stringify } from 'querystring';
import { API } from './api.js';
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

// 쿼리파라미터로 URL에서 Id뽑아오기
// const paramsString = window.location.search;
// const searchParams = new URLSearchParams(paramsString);
// const chartId = searchParams.get('chartId');

// chartsData fetch하는 함수
async function fetchChartsData() {
  try {
    const response = await fetch(`${API}/charts`);
    const chartsData = await response.json();

    return chartsData;
  } catch (e) {
    console.log(e);
  }
}

// musicsData fetch하는 함수
async function fetchMusicsData() {
  try {
    const response = await fetch(`${API}/musics`);
    const musicsData = await response.json();

    return musicsData;
  } catch (e) {
    console.log(e);
  }
}

function refreshChartTabs(copyChartsData, musicsData) {
  if (copyChartsData) {
    copyChartsData.reverse().forEach(({ id, title }) => {
      const newButton = document.createElement('button');
      newButton.innerText = title;

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
        event.target.classList.add('active');

        refreshChart(copyChartsData, musicsData);
      });
      chartTabs.prepend(newButton);
    });
  }
}

// 탭버튼을 누를때마다 실행됨 = 재활용가능 => 함수로만들자!
function refreshChart(copyChartsData, musicsData) {
  console.log('copyChartsData: ', copyChartsData);
  if (copyChartsData) {
    const currentChart = copyChartsData.find(({ id }) => id === currentTab);
    const { musics } = currentChart;
    console.log('currentChart:', currentChart);

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
}

function refreshTime() {
  timeText.innerText = `오늘 ${new Date()
    .getHours()
    .toString()
    .padStart(2, '0')}:00 기준`;
}

// 맨 처음 실행되어야하는 함수들을 호출하는 함수
async function init() {
  const chartsData = await fetchChartsData();
  const copyChartsData = Object.values(chartsData);
  const musicsData = await fetchMusicsData();
  refreshChartTabs(copyChartsData, musicsData);
  refreshChart(copyChartsData, musicsData);
  refreshTime();
}

init();
