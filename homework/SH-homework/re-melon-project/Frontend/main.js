import { api } from "./api.js";

const chartTabs = document.getElementById("chartTabs");
const chartContainer = document.getElementById("chartContainer");
const timeText = document.getElementById("timeText");
let currentTab = 1;

// 음악 데이터 GET
async function fetchMusics() {
  try {
    const response = await fetch(`${api}/musics`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

// 차트 데이터 GET
async function fetchCharts() {
  try {
    const response = await fetch(`${api}/charts`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

// 단일 차트 데이터 GET
async function fetchChart(chartId) {
  try {
    const response = await fetch(`${api}/charts/${chartId}`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

// 첫번째 기능 - 차트 탭 구현하기
function refreshChartTabs(chartsData, musicsData) {
  chartsData.reverse().forEach(({ id, title }) => {
    const newButton = document.createElement("button"); // DOM 객체, 노드
    newButton.innerText = title;
    newButton.classList.add("tab-btn");

    if (id === currentTab) newButton.classList.add("active");

    // 클릭 이벤트 부여
    newButton.addEventListener("click", async (event) => {
      currentTab = id;
      const tabs = chartTabs.getElementsByClassName("tab-btn"); // chartTabs의 탭 버튼
      const chartData = await fetchChart(currentTab);

      const tabsArr = [...tabs];
      tabsArr.forEach((tabNode) => {
        tabNode.classList.remove("active");
      });

      event.target.classList.add("active");

      refreshChart(chartData.data, musicsData);
    });

    chartTabs.prepend(newButton);
  });
}

// 두번쨰 기능 - 차트 구현하기
function refreshChart(chartData, musicsData) {
  console.log(currentTab, chartData.musics);

  // musics: 차트 데이터 배열
  const { musics } = chartData;

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
      ${authors.join(", ")}
      </span>
      </div>
      
      <!-- 재생 버튼 -->
      <button class="chart-item__play">
      <img src="img/play.png" alt="" />
      </button>
      </div>
      `
    );
  }, "");
}

function refreshTime() {
  timeText.innerText = `오늘 ${new Date()
    .getHours()
    .toString()
    .padStart(2, "0")}:00 기준`;
}

async function init() {
  const musicsData = await fetchMusics();
  const chartsData = await fetchCharts();
  const chartData = await fetchChart(currentTab);

  refreshChartTabs(chartsData.data, musicsData.data);
  refreshChart(chartData.data, musicsData.data);

  refreshTime();
}

init();
