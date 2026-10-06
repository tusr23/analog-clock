// Clock hands and ticks
const hr = document.getElementById('hour');
const min = document.getElementById('min');
const sec = document.getElementById('sec');
const ticks = document.getElementById('ticks');

// Complication elements
const compDay = document.getElementById('compDay');
const compDate = document.getElementById('compDate');
const compMonth = document.getElementById('compMonth');
const compTime = document.getElementById('compTime');
const compAmPm = document.getElementById('compAmPm');

// Brand & Theme elements
const brandSub = document.getElementById('brandSub');
const themeButtons = document.querySelectorAll('.theme-btn');

// Theme configurations
const THEME_SUBTITLES = {
  cyber: 'AUTOMATIC',
  rosegold: 'CHRONOMETER',
  stealth: 'TACTICAL'
};

const THEME_STORAGE_KEY = 'aura_watch_theme';

// Generate 60 Dial Ticks
for (let i = 0; i < 60; i++) {
  const t = document.createElement('div');
  const isMajor = i % 5 === 0;
  t.className = isMajor ? 'tick major' : 'tick';
  const dist = isMajor ? 'calc(-0.5 * var(--size) + 14px)' : 'calc(-0.5 * var(--size) + 11px)';
  t.style.transform = `rotate(${i * 6}deg) translateY(${dist})`;
  ticks.appendChild(t);
}

// Date & Digital Time Complication Tracker
const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

let lastDay = -1;
let lastDate = -1;
let lastMonth = -1;
let lastSecInt = -1;

function updateDateTimeComplication(dateObj) {
  const currentDay = dateObj.getDay();
  const currentDate = dateObj.getDate();
  const currentMonth = dateObj.getMonth();
  const currentSec = dateObj.getSeconds();

  // Update date chips only when calendar date changes
  if (currentDay !== lastDay && compDay) {
    compDay.textContent = DAYS[currentDay];
    lastDay = currentDay;
  }

  if (currentDate !== lastDate && compDate) {
    compDate.textContent = String(currentDate).padStart(2, '0');
    lastDate = currentDate;
  }

  if (currentMonth !== lastMonth && compMonth) {
    compMonth.textContent = MONTHS[currentMonth];
    lastMonth = currentMonth;
  }

  // Update digital time only once per second
  if (currentSec !== lastSecInt && compTime) {
    lastSecInt = currentSec;

    let hours = dateObj.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 hour format adjustment

    const hoursStr = String(hours).padStart(2, '0');
    const minsStr = String(dateObj.getMinutes()).padStart(2, '0');
    const secsStr = String(currentSec).padStart(2, '0');

    compTime.textContent = `${hoursStr}:${minsStr}:${secsStr}`;

    if (compAmPm && compAmPm.textContent !== ampm) {
      compAmPm.textContent = ampm;
    }
  }
}

// Theme Switcher Controller
function setTheme(themeName) {
  if (!THEME_SUBTITLES[themeName]) {
    themeName = 'cyber';
  }

  document.body.setAttribute('data-theme', themeName);

  if (brandSub) {
    brandSub.textContent = THEME_SUBTITLES[themeName];
  }

  themeButtons.forEach((btn) => {
    const isActive = btn.dataset.theme === themeName;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-checked', isActive ? 'true' : 'false');
  });

  try {
    localStorage.setItem(THEME_STORAGE_KEY, themeName);
  } catch (err) {
    // Graceful fallback if localStorage is disabled or restricted
  }
}

// Bind Theme Button Click Events
themeButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const selectedTheme = btn.dataset.theme;
    if (selectedTheme) {
      setTheme(selectedTheme);
    }
  });
});

// Restore Saved Theme on Load
let initialTheme = 'cyber';
try {
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  if (saved && THEME_SUBTITLES[saved]) {
    initialTheme = saved;
  }
} catch (err) {
  initialTheme = 'cyber';
}
setTheme(initialTheme);

// 60fps Smooth Sweep Animation Loop
function updateClock() {
  const d = new Date();
  const ms = d.getMilliseconds();
  const s = d.getSeconds() + ms / 1000;
  const m = d.getMinutes() + s / 60;
  const h = (d.getHours() % 12) + m / 60;

  sec.style.setProperty('--sec', `${s * 6}deg`);
  min.style.setProperty('--min', `${m * 6}deg`);
  hr.style.setProperty('--hr', `${h * 30}deg`);

  updateDateTimeComplication(d);

  requestAnimationFrame(updateClock);
}

requestAnimationFrame(updateClock);