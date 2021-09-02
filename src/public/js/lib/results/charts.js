import ApexCharts from 'apexcharts';

import { newElement } from '../utils/utils';
import { readResultsData } from './results';
import { getOptions } from './results.utils';

export async function drawChart() {
  const resultsData = await readResultsData();
  const options = {
    bar: {
      xaxis: { categories: resultsData.names },
      chart: { type: 'bar' },
      series: resultsData.votes,
      theme: { palette: 'palette7' },
    },
    donut: {
      series: resultsData.votes[0].data,
      chartOptions: { labels: resultsData.names },
      chart: { type: 'donut' },
      theme: { palette: 'palette7' },
    },
  };
  handleBtnTabClick(options);

  await draw({
    opt: options.donut,
    chartContainer: document.querySelector('#chart'),
  });
}

async function draw({ opt, chartContainer }) {
  const options = getOptions({
    theme: { palette: 'palette7' },
    title: {
      text: 'Vote results',
      floating: false,
      offsetY: 20,
      align: 'center',
      style: { color: '#444', fontSize: '1rem' },
    },
    ...opt,
  });

  const chart = new ApexCharts(chartContainer, options);
  chart.render();
}

function handleBtnTabClick(options) {
  const btnsTabs = document.querySelectorAll('.btn-tab');

  const chartContainerParent = document.querySelector('.chart-tab-container');
  if (!btnsTabs || !chartContainerParent) return;

  const getActiveTab = () => document.querySelector('.active-tab');
  const createNewChartContainer = () => newElement('div', { id: 'chart' });
  const removeOldChartContainer = () => chartContainerParent?.replaceChildren();
  const getChartTypeFrom = (el) => el.dataset.chart || 'bar';
  const setActiveTabTo = (el) => el.classList.add('active-tab');
  const unsetActiveTabTo = (el) => el.classList.remove('active-tab');
  const changeActiveTab = (oldTab, newTab) => {
    unsetActiveTabTo(oldTab);
    setActiveTabTo(newTab);
  };

  btnsTabs.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      const activeTab = getActiveTab();
      changeActiveTab(activeTab, e.target);
      removeOldChartContainer();
      const div = createNewChartContainer();
      chartContainerParent?.append(div);
      const chartType = getChartTypeFrom(e.target);
      await draw({ opt: options[chartType], chartContainer: div });
    });
  });
}
