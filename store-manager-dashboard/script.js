const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const dateBtn = $('#dateBtn');
const storeBtn = $('#storeBtn');
const areaBtn = $('#areaBtn');
const searchBtn = $('#searchBtn');
const metricBtn = $('#metricBtn');
const salesPeriodBtn = $('#salesPeriodBtn');
const datePanel = $('#datePanel');
const storePanel = $('#storePanel');
const areaPanel = $('#areaPanel');
const searchPanel = $('#searchPanel');
const metricPanel = $('#metricPanel');
const salesPeriodPanel = $('#salesPeriodPanel');
const salesPeriodOptions = $('#salesPeriodOptions');
const dimensionPanel = $('#dimensionPanel');
const periodLabel = $('#periodLabel');
const salesModeLabel = $('#salesModeLabel');
const trafficMetricLabel = $('#trafficMetricLabel');
const searchDimBtn = $('#searchDimBtn');
const searchInput = $('#searchInput');
const searchSubmit = $('#searchSubmit');
const detailTable = $('#detailTable');
const trafficChart = $('#trafficChart');
const chartTooltip = $('#chartTooltip');

const now = new Date();
const pad = (value) => String(value).padStart(2, '0');
const fmt = (date) => `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`;
const defaultDay = fmt(now);

const state = {
  date: '昨日',
  store: '所有门店',
  dimension: '品牌',
  area: '全部',
  query: '',
  salesGranularity: '按月',
  salesPeriod: '本月',
};

const inboundGroups = [
  '[72225101]T3CI1', '[72225102]T3CI2', '[72225103]T3CI3', '[72225104]T3CI4',
];

const outboundGroups = [
  '[72222201]T3E14香化', '[72222401]T3E18香化', '[72221301]T3E03', '[72222501]T3E19',
  '[72221201]T3E02烟酒', '[72221501]T3E07', '[72222301]T3E15', '[72222901]T3E23',
  '[72221601]T3E0801精品Chloe', '[72221602]T3E0802精品Kenzo', '[72221603]T3E0803精品MCM', '[72221604]T3E0804精品Coach',
  '[72221605]T3E0805精品TB', '[72221607]T3E0807精品Fashion', '[72221801]T3E1001精品', '[72221704]T3E0904精品',
  '[72222801]T3E2201精品BV', '[72222802]T3E2202精品YSL', '[72222803]巴黎世家', '[72222804]T3E2204精品Burberry',
  '[72222805]T3E2205精品Moncler', '[72222806]T3E2206精品Ferragamo', '[72221401]T3E05精品太阳镜', '[72221606]T3E0806精品Montblanc',
  '[72221701]T3E0901精品', '[72221702]T3E0902精品', '[72221802]T3E1002精品', '[72221901]T3E1101精品TUMI',
  '[72221902]T3E1102', '[72222601]T3E2001精品Chopard', '[72222602]T3E2002精品Bvlgari', '[72222603]T3E2003精品Qeelin',
  '[72222604]T3E2004精品Omega', '[72222701]T3E2101', '[72222702]T3E2102', '[72223001]T3E24',
];

const columns = {
  柜组: ['序号', '柜组', '销售额', '进店人数', '顾客人数', '转化率', '客单价', '毛利率', '连带率'],
  品牌: ['序号', '品牌', '销售额', '顾客人数', '转化率', '客单价', '毛利率', '连带率'],
  品类: ['序号', '商品大类', '销售额', '顾客人数', '转化率', '客单价', '毛利率', '连带率'],
  商品: ['序号', '商品编码', '商品名称', '销售额', '销售数量', '顾客人数', '折扣率', '营收占比'],
};

const baseRows = {
  品牌: [
    ['1', '[030017]Lancome 兰蔻', '16,489,332.9', '16,641', '1.16%', '990.89', '1.16%', '1.33'],
    ['2', '[030113]La Mer 海蓝之谜', '9,025,709.75', '5,632', '9.28%', '1,602.58', '9.28%', '1.36'],
    ['3', '[030108]HR/赫莲娜', '8,883,833.66', '4,333', '10.63%', '2,050.27', '10.63%', '1.39'],
    ['4', '[030025]Estee Lauder 雅诗兰黛', '8,404,883.92', '9,690', '8.99%', '867.38', '8.99%', '1.37'],
    ['5', '[030037]YSL 圣罗兰', '8,216,332.96', '15,963', '20.65%', '514.71', '20.65%', '1.45'],
    ['6', '[030031]Chanel香奈儿', '6,944,290', '9,469', '44.48%', '733.37', '44.48%', '1.28'],
    ['7', '[030224]Skin Ceuticals 修丽可', '4,398,207.14', '3,971', '2.32%', '1,107.58', '2.32%', '1.61'],
    ['8', '[030052]Clarins 娇韵诗', '3,678,841.85', '5,936', '27.09%', '619.75', '27.09%', '1.44'],
  ],
  品类: [
    ['1', '[01]香化', '28,391,284.78', '20,970', '15.84%', '1,348.49', '15.84%', '1.99'],
    ['2', '[04]精品时尚品', '11,797,771.31', '1,950', '35.68%', '5,820.65', '35.68%', '1.52'],
    ['3', '[03]精品首饰', '8,921,959.4', '507', '20.15%', '17,597.55', '20.15%', '1.29'],
    ['4', '[11]电子产品', '5,352,727.35', '784', '5.6%', '6,817.56', '5.6%', '1.19'],
    ['5', '[02]精品手表', '2,508,282.24', '198', '28.23%', '12,392.84', '28.23%', '1.09'],
    ['6', '[05]食品百货', '1,654,043.11', '1,615', '34.94%', '744.88', '34.94%', '2.82'],
    ['7', '[06]进口酒', '1,434,637.91', '1,089', '32.42%', '1,185.21', '32.42%', '1.55'],
    ['8', '[07]国产酒', '704,125.4', '344', '25.04%', '559.26', '25.04%', '2.49'],
  ],
  商品: [
    ['1', 'C105133', '雅诗兰黛夜间密集修护套装', '1,280,082.5', '705', '296', '68.53%', '15.84%'],
    ['2', 'M142694', '苹果手机 iPhone 17 Pro Max 256GB 银色', '855,300', '103', '90', '90.26%', '35.68%'],
    ['3', 'C050100', '阿玛尼贵族清新香水（玉龙茶香）', '803,228.61', '1,032', '207', '51.92%', '20.15%'],
    ['4', 'M142691', '苹果手机 iPhone 17 Pro Max 512GB 银色', '748,960', '74', '92', '90.85%', '5.6%'],
    ['5', 'C051261', '雅诗兰黛特润修护精华', '657,534.45', '426', '363', '63.88%', '28.23%'],
  ],
};

function buildGroupRows() {
  const source = state.area === '入境' ? inboundGroups : state.area === '出境' ? outboundGroups : [...inboundGroups, ...outboundGroups];
  return source.map((name, index) => [
    String(index + 1),
    name,
    (2840000 - index * 63750).toLocaleString('en-US'),
    String(21000 - index * 286),
    String(16641 - index * 219),
    `${(20.24 - index * 0.27).toFixed(2)}%`,
    (990.89 + index * 18.6).toLocaleString('en-US', { maximumFractionDigits: 2 }),
    `${(15.84 + index * 0.31).toFixed(2)}%`,
    (1.99 - index * 0.01).toFixed(2),
  ]);
}

function rowsForDimension() {
  const rows = state.dimension === '柜组' ? buildGroupRows() : baseRows[state.dimension];
  if (!state.query) return rows;
  return rows.filter((row) => row.join('').toLowerCase().includes(state.query.toLowerCase()));
}

function renderSalesPeriodOptions() {
  const options = state.salesGranularity === '按年' ? ['今年', '去年'] : ['本月', '1月', '2月', '3月', '4月', '5月', '6月'];
  salesPeriodOptions.innerHTML = `${options.map((item) => `<button data-sales-period="${item}">${item}</button>`).join('')}<button class="cancel">取消</button>`;
  salesPeriodOptions.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      if (button.dataset.salesPeriod) {
        state.salesPeriod = button.dataset.salesPeriod;
        salesModeLabel.textContent = state.salesPeriod;
        salesPeriodBtn.classList.add('active');
      }
      hidePanels();
    });
  });
}

function renderTable() {
  areaBtn.classList.toggle('active', state.area !== '全部');
  areaBtn.innerHTML = `${state.area === '全部' ? '区域类型' : state.area} <span>▼</span>`;
  const head = columns[state.dimension].map((item) => `<th>${item}</th>`).join('');
  const body = rowsForDimension().map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('');
  detailTable.innerHTML = `<thead><tr>${head}</tr></thead><tbody>${body}</tbody>`;
}

function hidePanels() {
  datePanel.classList.add('hidden');
  storePanel.classList.add('hidden');
  areaPanel.classList.add('hidden');
  searchPanel.classList.add('hidden');
  metricPanel.classList.add('hidden');
  salesPeriodPanel.classList.add('hidden');
  dimensionPanel.classList.add('hidden');
}

function toggle(panel) {
  const willShow = panel.classList.contains('hidden');
  hidePanels();
  if (willShow) panel.classList.remove('hidden');
}

function setDateLabel(label) {
  state.date = label;
  dateBtn.innerHTML = `${label} <span>▼</span>`;
  dateBtn.classList.add('active');
  periodLabel.textContent = label;
  salesModeLabel.textContent = label.includes('年') ? '本年' : label.includes('月') ? '本月' : '本月';
}

function setStoreLabel(label) {
  state.store = label;
  let shortLabel = label;
  if (label.includes('[7222]')) shortLabel = '[7222]中免...';
  else if (label.length > 6) shortLabel = `${label.slice(0, 6)}...`;
  storeBtn.innerHTML = `${shortLabel} <span>▼</span>`;
  storeBtn.title = label;
  storeBtn.classList.toggle('active', label !== '所有门店');
  if (label.includes('[7222]')) setDimension('柜组');
  renderTable();
}

function setDimension(dimension) {
  state.dimension = dimension;
  searchDimBtn.innerHTML = `${dimension} <span>▼</span>`;
  $$('.tabs button').forEach((item) => item.classList.toggle('active', item.dataset.dim === dimension));
  renderTable();
}

setDateLabel('昨日');
salesPeriodBtn.hidden = false;
salesPeriodBtn.style.display = '';
renderSalesPeriodOptions();
renderTable();

const dateButtons = $$('.date-options button');
dateButtons.forEach((button) => {
  button.addEventListener('click', () => {
    dateButtons.forEach((item) => item.classList.remove('selected'));
    button.classList.add('selected');
    setDateLabel(button.dataset.value || button.textContent.trim());
  });
});

dateBtn.addEventListener('click', () => toggle(datePanel));
storeBtn.addEventListener('click', () => toggle(storePanel));
areaBtn.addEventListener('click', () => toggle(areaPanel));
searchBtn.addEventListener('click', () => toggle(searchPanel));
metricBtn.addEventListener('click', () => toggle(metricPanel));
salesPeriodBtn.addEventListener('click', () => toggle(salesPeriodPanel));
searchDimBtn.addEventListener('click', () => toggle(dimensionPanel));
searchSubmit.addEventListener('click', () => {
  state.query = searchInput.value.trim();
  renderTable();
  hidePanels();
});
searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') searchSubmit.click();
});

$$('.date-panel footer button').forEach((button) => button.addEventListener('click', hidePanels));

$$('.store-panel button').forEach((button) => {
  button.addEventListener('click', () => {
    $$('.store-panel button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    setStoreLabel(button.textContent.trim());
    hidePanels();
  });
});

$$('.sheet button').forEach((button) => {
  button.addEventListener('click', () => {
    if (button.dataset.dim) setDimension(button.dataset.dim);
    if (!button.classList.contains('cancel') && !button.dataset.dim && !button.dataset.salesPeriod) {
      const label = button.textContent.trim();
      metricBtn.innerHTML = `${label} <span>▼</span>`;
      trafficMetricLabel.textContent = label;
    }
    hidePanels();
  });
});

$$('.seg button').forEach((button) => {
  button.addEventListener('click', () => {
    $$('.seg button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    state.salesGranularity = button.dataset.granularity || button.textContent.trim();
    const yearly = state.salesGranularity === '按年';
    state.salesPeriod = yearly ? '' : '本月';
    salesPeriodBtn.hidden = yearly;
    salesPeriodBtn.classList.toggle('hidden', yearly);
    salesPeriodBtn.style.display = yearly ? 'none' : '';
    salesModeLabel.textContent = state.salesPeriod;
    renderSalesPeriodOptions();
  });
});

$$('.tabs button').forEach((button) => {
  button.addEventListener('click', () => setDimension(button.dataset.dim));
});

$$('.area-panel button').forEach((button) => {
  button.addEventListener('click', () => {
    $$('.area-panel button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    state.area = button.dataset.area;
    if (state.store.includes('[7222]')) setDimension('柜组');
    renderTable();
    hidePanels();
  });
});

trafficChart.addEventListener('pointermove', (event) => {
  const box = trafficChart.getBoundingClientRect();
  chartTooltip.style.display = 'block';
  chartTooltip.style.left = `${Math.min(event.clientX - box.left + 12, box.width - 140)}px`;
  chartTooltip.style.top = `${Math.max(event.clientY - box.top - 80, 48)}px`;
});
trafficChart.addEventListener('pointerleave', () => {
  chartTooltip.style.display = 'none';
});
trafficChart.addEventListener('click', (event) => {
  const box = trafficChart.getBoundingClientRect();
  chartTooltip.style.display = 'block';
  chartTooltip.style.left = `${Math.min(event.clientX - box.left + 12, box.width - 140)}px`;
  chartTooltip.style.top = `${Math.max(event.clientY - box.top - 80, 48)}px`;
});

$$('.overlay').forEach((overlay) => {
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) hidePanels();
  });
});
