// 차트 탭 구현하기
const chartTabs = document.getElementById("chartTabs");
const chartContainer = document.getElementById("chartContainer");
const timeText = document.getElementById("timeText");
let currentTab;

async function fetchChartTitles() {
  try {
    const response = await fetch("/api/charts/title");
    const chartTitlesData = await response.json();

    return chartTitlesData.data;
  } catch (err) {
    alert(err.message);
  }
}

async function fetchChart(chartId) {
  try {
    const response = await fetch(`/api/charts/${chartId}`);
    const chartData = await response.json();

    return chartData.data;
  } catch (err) {
    alert(err.message);
  }
}

function refreshChartTabs(chartTitlesData) {
  chartTitlesData.reverse().forEach(({ id, title }) => {
    const newButton = document.createElement("button");

    newButton.innerText = title;

    newButton.classList.add("tab-btn");
    currentTab === id && newButton.classList.add("active");

    // 클릭 이벤트 부여
    newButton.addEventListener("click", async (event) => {
      currentTab = id; // 동기화 작업

      const tabs = chartTabs.getElementsByClassName("tab-btn");
      const tabsArr = [...tabs];
      tabsArr.forEach((tabNode) => {
        tabNode.classList.remove("active");
      });

      event.target.classList.add("active");

      const currentChart = await fetchChart(currentTab);
      refreshChart(currentChart);
    });

    chartTabs.prepend(newButton);
  });
}

// 차트 구현하기
function refreshChart(currentChart) {
  const { musics } = currentChart;

  chartContainer.innerHTML = musics.reduce(
    (acc, { title, authors, coverImg }, index) =>
      acc +
      `
      <div class="chart-item">
          <!-- 앨범 커버 이미지 -->
          <img class="chart-item__img" src="${coverImg}" alt="${title}" />
  
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
            <img src="/img/play.png" alt="" />
          </button>
        </div>
    `,
    ""
  );
}

function refreshTime() {
  timeText.innerText = `오늘 ${new Date()
    .getHours()
    .toString()
    .padStart(2, "0")}:00 기준`;
}

async function init() {
  const chartTitlesData = await fetchChartTitles();
  currentTab = chartTitlesData && chartTitlesData[0].id;

  refreshChartTabs(chartTitlesData);

  const currentChart = await fetchChart(currentTab);
  refreshChart(currentChart);

  refreshTime();
}

init();
