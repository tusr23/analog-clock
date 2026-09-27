const hr = document.getElementById('hour');
const min = document.getElementById('min');
const sec = document.getElementById('sec');
const ticks = document.getElementById('ticks');

const dayEl = document.getElementById('day');
const dateEl = document.getElementById('date');
const monthEl = document.getElementById('month');
const digitalTime = document.getElementById('digitalTime');
const digitalAmPm = document.getElementById('digitalAmPm');

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

// 60 Dial Ticks
for (let i = 0; i < 60; i++) {
  const t = document.createElement('div');
  const isMajor = i % 5 === 0;
  t.className = isMajor ? 'tick major' : 'tick';
  const dist = isMajor ? 'calc(-0.5 * var(--size) + 14px)' : 'calc(-0.5 * var(--size) + 11px)';
  t.style.transform = `rotate(${i * 6}deg) translateY(${dist})`;
  ticks.appendChild(t);
}

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

  // Complications
  dayEl.textContent = DAYS[d.getDay()];
  dateEl.textContent = String(d.getDate()).padStart(2, '0');
  monthEl.textContent = MONTHS[d.getMonth()];

  const h12 = d.getHours() % 12 || 12;
  const mm = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');
  digitalTime.textContent = `${String(h12).padStart(2, '0')}:${mm}:${ss}`;
  digitalAmPm.textContent = d.getHours() >= 12 ? 'PM' : 'AM';

  requestAnimationFrame(updateClock);
}

requestAnimationFrame(updateClock);