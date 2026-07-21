const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const dateBtn = $('#dateBtn');
const storeBtn = $('#storeBtn');
const metricBtn = $('#metricBtn');
const datePanel = $('#datePanel');
const storePanel = $('#storePanel');
const metricPanel = $('#metricPanel');
const periodLabel = $('#periodLabel');
const salesModeLabel = $('#salesModeLabel');
const trafficMetricLabel = $('#trafficMetricLabel');

const now = new Date();
const pad = (value) => String(value).padStart(2, '0');
const fmt = (date) => `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`;
const monthLabel = `${now.getFullYear()}.${pad(now.getMonth() + 1)}`;
const defaultDay = fmt(now);

function hidePanels() {
  datePanel.classList.add('hidden');
  storePanel.classList.add('hidden');
  metricPanel.classList.add('hidden');
}

function toggle(panel) {
  const willShow = panel.classList.contains('hidden');
  hidePanels();
  if (willShow) panel.classList.remove('hidden');
}

function setDateLabel(label) {
  dateBtn.innerHTML = `${label} <span>▼</span>`;
  dateBtn.classList.add('active');
  periodLabel.textContent = label === '今日' ? defaultDay : label;
  salesModeLabel.textContent = label.includes('年') ? '本年' : label.includes('月') ? '本月' : '本月';
}

function setStoreLabel(label) {
  const shortLabel = label.length > 13 ? `${label.slice(0, 13)}…` : label;
  storeBtn.innerHTML = `${shortLabel} <span>▼</span>`;
  storeBtn.title = label;
  storeBtn.classList.toggle('active', label !== '所有门店');
}

setDateLabel('今日');

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
metricBtn.addEventListener('click', () => toggle(metricPanel));

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
    if (!button.classList.contains('cancel')) {
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
  });
});

$$('.tabs button').forEach((button) => {
  button.addEventListener('click', () => {
    $$('.tabs button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
  });
});

$$('.overlay').forEach((overlay) => {
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) hidePanels();
  });
});
