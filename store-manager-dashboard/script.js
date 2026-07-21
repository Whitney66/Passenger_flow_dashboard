const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const dateBtn = $('#dateBtn');
const storeBtn = $('#storeBtn');
const metricBtn = $('#metricBtn');
const datePanel = $('#datePanel');
const storePanel = $('#storePanel');
const metricPanel = $('#metricPanel');

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

dateBtn.addEventListener('click', () => toggle(datePanel));
storeBtn.addEventListener('click', () => toggle(storePanel));
metricBtn.addEventListener('click', () => toggle(metricPanel));

$$('.date-options button').forEach((button) => {
  button.addEventListener('click', () => {
    $$('.date-options button').forEach((item) => item.classList.remove('selected'));
    button.classList.add('selected');
    dateBtn.innerHTML = `${button.textContent} <span>▼</span>`;
    dateBtn.classList.add('active');
  });
});

$$('.date-panel footer button').forEach((button) => {
  button.addEventListener('click', hidePanels);
});

$$('.store-panel button').forEach((button) => {
  button.addEventListener('click', () => {
    $$('.store-panel button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    storeBtn.innerHTML = `${button.textContent} <span>▼</span>`;
    storeBtn.classList.add('active');
    hidePanels();
  });
});

$$('.sheet button').forEach((button) => {
  button.addEventListener('click', () => {
    if (!button.classList.contains('cancel')) {
      metricBtn.innerHTML = `${button.textContent} <span>▼</span>`;
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
