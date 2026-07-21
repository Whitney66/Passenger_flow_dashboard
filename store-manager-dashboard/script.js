const state = {
  period: '今日',
  team: '团队',
  valueMode: '含免值品',
  collapsed: new Set(),
};

const periodText = document.getElementById('periodText');
const salesValue = document.getElementById('salesValue');
const targetValue = document.getElementById('targetValue');
const remainValue = document.getElementById('remainValue');
const progressBar = document.getElementById('progressBar');
const monthRemain = document.getElementById('monthRemain');

const data = {
  昨日: { periodText: '2022-10-29 0:00:00~23:59:59', sales: '4,260', target: '43%', remain: '5,740', progress: '43%', monthRemain: '262' },
  今日: { periodText: '2022-10-30 0:00:00~23:59:59', sales: '5,000', target: '50%', remain: '5,000', progress: '50%', monthRemain: '253' },
  本月: { periodText: '2022-10-01 0:00:00~2022-10-30 23:59:59', sales: '128,300', target: '68%', remain: '61,700', progress: '68%', monthRemain: '12,300' },
  本年: { periodText: '2022-01-01 0:00:00~2022-10-30 23:59:59', sales: '1,480,000', target: '82%', remain: '320,000', progress: '82%', monthRemain: '—' },
};

function sync() {
  const next = data[state.period];
  periodText.textContent = next.periodText;
  salesValue.textContent = next.sales;
  targetValue.textContent = next.target;
  remainValue.textContent = next.remain;
  progressBar.textContent = next.progress;
  progressBar.style.width = next.progress;
  monthRemain.textContent = next.monthRemain;
}

function setActive(group, value) {
  document.querySelectorAll(group).forEach((button) => {
    button.classList.toggle('active', button.dataset.period === value || button.dataset.team === value || button.textContent.trim() === value);
  });
}

document.querySelectorAll('.period-tabs button').forEach((button) => {
  button.addEventListener('click', () => {
    state.period = button.dataset.period;
    setActive('.period-tabs button', state.period);
    sync();
  });
});

document.querySelectorAll('.team-toggle button').forEach((button) => {
  button.addEventListener('click', () => {
    state.team = button.dataset.team;
    setActive('.team-toggle button', state.team);
  });
});

document.querySelectorAll('.value-toggle button').forEach((button) => {
  button.addEventListener('click', () => {
    state.valueMode = button.textContent.trim();
    setActive('.value-toggle button', state.valueMode);
  });
});

document.querySelectorAll('.note header button').forEach((button) => {
  button.addEventListener('click', () => {
    const note = button.closest('.note');
    const collapsed = note.classList.toggle('collapsed');
    button.textContent = collapsed ? '点击展开' : '点击收起';
  });
});

sync();
