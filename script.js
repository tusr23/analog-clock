const $ = id => document.getElementById(id);
const hr = $('hour'), min = $('min'), sec = $('sec'), ticks = $('ticks');
const worldModalBackdrop = $('worldModalBackdrop'), worldModal = $('worldModal'), worldModalTrigger = $('worldModalTrigger');
const citySearchInput = $('citySearchInput'), searchClearBtn = $('searchClearBtn');
const searchResultsSection = $('searchResultsSection'), searchResultCount = $('searchResultCount');
const searchResultsGrid = $('searchResultsGrid'), pinnedGrid = $('pinnedGrid'), pinnedBadge = $('pinnedBadge');
const brandSub = $('brandSub'), headerLocDisplay = $('headerLocationDisplay');
const headerLocFlag = $('headerLocFlag'), headerLocName = $('headerLocName'), headerLocTime = $('headerLocTime');
const headerLocOffset = $('headerLocOffset'), headerLocDayNight = $('headerLocDayNight');

const CITIES = [
  ['local', 'Local Device Time', 'Current Location', '', '📍', 'Local'],
  ['ny', 'New York', 'United States', 'America/New_York', '🇺🇸'],
  ['london', 'London', 'United Kingdom', 'Europe/London', '🇬🇧'],
  ['paris', 'Paris', 'France', 'Europe/Paris', '🇫🇷'],
  ['tokyo', 'Tokyo', 'Japan', 'Asia/Tokyo', '🇯🇵'],
  ['dubai', 'Dubai', 'United Arab Emirates', 'Asia/Dubai', '🇦🇪'],
  ['sydney', 'Sydney', 'Australia', 'Australia/Sydney', '🇦🇺'],
  ['singapore', 'Singapore', 'Singapore', 'Asia/Singapore', '🇸🇬'],
  ['hongkong', 'Hong Kong', 'China', 'Asia/Hong_Kong', '🇭🇰'],
  ['losangeles', 'Los Angeles', 'United States', 'America/Los_Angeles', '🇺🇸'],
  ['chicago', 'Chicago', 'United States', 'America/Chicago', '🇺🇸'],
  ['toronto', 'Toronto', 'Canada', 'America/Toronto', '🇨🇦'],
  ['vancouver', 'Vancouver', 'Canada', 'America/Vancouver', '🇨🇦'],
  ['berlin', 'Berlin', 'Germany', 'Europe/Berlin', '🇩🇪'],
  ['rome', 'Rome', 'Italy', 'Europe/Rome', '🇮🇹'],
  ['madrid', 'Madrid', 'Spain', 'Europe/Madrid', '🇪🇸'],
  ['amsterdam', 'Amsterdam', 'Netherlands', 'Europe/Amsterdam', '🇳🇱'],
  ['zurich', 'Zurich', 'Switzerland', 'Europe/Zurich', '🇨🇭'],
  ['stockholm', 'Stockholm', 'Sweden', 'Europe/Stockholm', '🇸🇪'],
  ['athens', 'Athens', 'Greece', 'Europe/Athens', '🇬🇷'],
  ['istanbul', 'Istanbul', 'Turkey', 'Europe/Istanbul', '🇹🇷'],
  ['cairo', 'Cairo', 'Egypt', 'Africa/Cairo', '🇪🇬'],
  ['riyadh', 'Riyadh', 'Saudi Arabia', 'Asia/Riyadh', '🇸🇦'],
  ['mumbai', 'Mumbai / Delhi', 'India', 'Asia/Kolkata', '🇮🇳', 'Mumbai'],
  ['dhaka', 'Dhaka', 'Bangladesh', 'Asia/Dhaka', '🇧🇩'],
  ['bangkok', 'Bangkok', 'Thailand', 'Asia/Bangkok', '🇹🇭'],
  ['seoul', 'Seoul', 'South Korea', 'Asia/Seoul', '🇰🇷'],
  ['shanghai', 'Beijing / Shanghai', 'China', 'Asia/Shanghai', '🇨🇳', 'Shanghai'],
  ['melbourne', 'Melbourne', 'Australia', 'Australia/Melbourne', '🇦🇺'],
  ['auckland', 'Auckland', 'New Zealand', 'Pacific/Auckland', '🇳🇿'],
  ['honolulu', 'Honolulu', 'United States', 'Pacific/Honolulu', '🇺🇸'],
  ['anchorage', 'Anchorage', 'United States', 'America/Anchorage', '🇺🇸'],
  ['saopaulo', 'São Paulo', 'Brazil', 'America/Sao_Paulo', '🇧🇷'],
  ['buenosaires', 'Buenos Aires', 'Argentina', 'America/Argentina/Buenos_Aires', '🇦🇷'],
  ['mexicocity', 'Mexico City', 'Mexico', 'America/Mexico_City', '🇲🇽'],
  ['johannesburg', 'Johannesburg', 'South Africa', 'Africa/Johannesburg', '🇿🇦'],
  ['nairobi', 'Nairobi', 'Kenya', 'Africa/Nairobi', '🇰🇪'],
  ['jakarta', 'Jakarta', 'Indonesia', 'Asia/Jakarta', '🇮🇩'],
  ['kualalumpur', 'Kuala Lumpur', 'Malaysia', 'Asia/Kuala_Lumpur', '🇲🇾'],
  ['manila', 'Manila', 'Philippines', 'Asia/Manila', '🇵🇭'],
  ['qatar', 'Doha', 'Qatar', 'Asia/Qatar', '🇶🇦'],
  ['telaviv', 'Tel Aviv', 'Israel', 'Asia/Jerusalem', '🇮🇱'],
  ['prague', 'Prague', 'Czech Republic', 'Europe/Prague', '🇨🇿'],
  ['vienna', 'Vienna', 'Austria', 'Europe/Vienna', '🇦🇹'],
  ['dublin', 'Dublin', 'Ireland', 'Europe/Dublin', '🇮🇪'],
  ['lisbon', 'Lisbon', 'Portugal', 'Europe/Lisbon', '🇵🇹'],
  ['helsinki', 'Helsinki', 'Finland', 'Europe/Helsinki', '🇫🇮'],
  ['oslo', 'Oslo', 'Norway', 'Europe/Oslo', '🇳🇴'],
  ['warsaw', 'Warsaw', 'Poland', 'Europe/Warsaw', '🇵🇱'],
  ['brussels', 'Brussels', 'Belgium', 'Europe/Brussels', '🇧🇪'],
  ['santiago', 'Santiago', 'Chile', 'America/Santiago', '🇨🇱'],
  ['bogota', 'Bogotá', 'Colombia', 'America/Bogota', '🇨🇴'],
  ['lima', 'Lima', 'Peru', 'America/Lima', '🇵🇪'],
  ['reykjavik', 'Reykjavik', 'Iceland', 'Atlantic/Reykjavik', '🇮🇸']
].map(([id, name, country, tz, flag, shortName]) => ({
  id, name, country, tz: tz || null, flag, shortName: shortName || name,
  _q: `${name} ${shortName || ''} ${country} ${tz}`.toLowerCase()
}));

const CITY_MAP = new Map(CITIES.map(c => [c.id, c]));
const tzCache = {};

function getTzOffsetMin(tz) {
  if (!tz) return -new Date().getTimezoneOffset();
  if (tzCache[tz] === undefined) {
    try {
      const d = new Date();
      tzCache[tz] = Math.round((new Date(d.toLocaleString('en-US', { timeZone: tz })) - new Date(d.toLocaleString('en-US', { timeZone: 'UTC' }))) / 60000);
    } catch { tzCache[tz] = 0; }
  }
  return tzCache[tz];
}

const getCityDate = (tz, now = new Date()) => new Date(now.getTime() + (getTzOffsetMin(tz) - (-now.getTimezoneOffset())) * 60000);

function getUtcOffsetString(m) {
  const sign = m >= 0 ? '+' : '-';
  const abs = Math.abs(m), min = abs % 60;
  return `UTC${sign}${Math.floor(abs / 60)}${min ? ':' + String(min).padStart(2, '0') : ''}`;
}

function getRelativeDiffString(targetMin) {
  const diff = targetMin - (-new Date().getTimezoneOffset());
  if (!diff) return 'Same as local';
  const abs = Math.abs(diff), h = Math.floor(abs / 60), m = abs % 60;
  return `${diff > 0 ? '+' : '-'}${h ? h + (m ? `h ${m}m` : ' hrs') : m + 'm'} ${diff > 0 ? 'ahead' : 'behind'}`;
}

const getDayNight = d => ({ icon: d.getHours() >= 6 && d.getHours() < 18 ? '☀️' : '🌙', label: d.getHours() >= 6 && d.getHours() < 18 ? 'Daytime' : 'Night' });

function formatTime(d) {
  const pad = n => String(n).padStart(2, '0');
  const h = d.getHours();
  return { time: `${pad(h % 12 || 12)}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`, ampm: h >= 12 ? 'PM' : 'AM' };
}

let pinnedLocationIds = ['local', 'ny', 'london', 'tokyo', 'dubai', 'sydney'];
let activeLocationId = 'local';
let isModalOpen = false;

try {
  const sa = localStorage.getItem('aura_active_location');
  if (sa && CITY_MAP.has(sa)) activeLocationId = sa;
  const sp = JSON.parse(localStorage.getItem('aura_pinned_locations'));
  if (Array.isArray(sp)) pinnedLocationIds = sp.filter(id => CITY_MAP.has(id));
} catch {}
if (!pinnedLocationIds.includes(activeLocationId)) pinnedLocationIds.push(activeLocationId);
let activeCity = CITY_MAP.get(activeLocationId) || CITIES[0];

function saveState() {
  localStorage.setItem('aura_active_location', activeLocationId);
  localStorage.setItem('aura_pinned_locations', JSON.stringify(pinnedLocationIds));
}

function updateHeaderLocation(city, d = getCityDate(city.tz)) {
  headerLocName.textContent = city.id === 'local' ? 'LOCAL TIME' : city.shortName.toUpperCase();
  headerLocFlag.textContent = city.flag;
  const offset = getTzOffsetMin(city.tz);
  headerLocOffset.textContent = getUtcOffsetString(offset);
  const dn = getDayNight(d);
  headerLocDayNight.textContent = dn.icon;
  headerLocDayNight.title = dn.label;
  const f = formatTime(d);
  headerLocTime.textContent = `${f.time} ${f.ampm}`;
  headerLocDisplay.setAttribute('aria-label', `Active Location: ${city.name} (${getUtcOffsetString(offset)})`);
}

function cityCardHtml(city, isPinned = false) {
  const d = getCityDate(city.tz);
  const now = new Date();
  const f = formatTime(d);
  const dn = getDayNight(d);
  const offset = getTzOffsetMin(city.tz);
  const offsetStr = getUtcOffsetString(offset);
  const diffStr = getRelativeDiffString(offset);
  const isActive = city.id === activeLocationId;
  const lDate = now.getDate(), cDate = d.getDate();
  const dayStr = cDate > lDate || (cDate === 1 && lDate > 27) ? 'Tomorrow' : (cDate < lDate || (lDate === 1 && cDate > 27) ? 'Yesterday' : 'Today');

  return `
    <div class="city-card ${isActive ? 'active' : ''}" data-city-id="${city.id}" tabindex="0" role="button" aria-label="${city.name}">
      <div class="card-top">
        <div class="card-city-info">
          <span class="card-flag">${city.flag}</span>
          <div class="card-names"><span class="card-city-name">${city.name}</span><span class="card-country">${city.country}</span></div>
        </div>
        <div class="card-badges"><span class="card-dn-badge">${dn.icon} ${dn.label}</span></div>
      </div>
      <div class="card-time-row">
        <div class="card-digital-time" data-card-time="${city.id}">${f.time} ${f.ampm}</div>
        <span class="card-offset-badge">${offsetStr}</span>
      </div>
      <div class="card-meta-row">
        <span class="card-diff">${diffStr} • ${dayStr}</span>
        <div class="card-actions">
          ${isActive ? '<span class="card-active-pill">ACTIVE DIAL</span>' : `<button class="card-btn set-dial-btn" type="button" data-city-id="${city.id}">Set on Dial</button>`}
          ${isPinned && city.id !== 'local' ? `<button class="card-remove-btn" type="button" data-city-id="${city.id}" title="Unpin city">✕</button>` : ''}
          ${!isPinned ? `<button class="card-btn pin-city-btn" type="button" data-city-id="${city.id}">+ Pin & Switch</button>` : ''}
        </div>
      </div>
    </div>`;
}

function renderPinnedCards() {
  pinnedGrid.innerHTML = pinnedLocationIds.map(id => cityCardHtml(CITY_MAP.get(id), true)).join('');
}

function switchLocation(id) {
  activeLocationId = id;
  activeCity = CITY_MAP.get(id) || CITIES[0];
  if (!pinnedLocationIds.includes(id)) pinnedLocationIds.push(id);
  saveState();
  updateHeaderLocation(activeCity);
  renderPinnedCards();
  if (citySearchInput.value) handleSearch(citySearchInput.value);
  hr.style.transition = min.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
  setTimeout(() => { hr.style.transition = min.style.transition = ''; }, 500);
}

function pinCity(id) {
  if (!pinnedLocationIds.includes(id)) {
    pinnedLocationIds.push(id);
    saveState();
    pinnedBadge.textContent = pinnedLocationIds.length;
    renderPinnedCards();
  }
}

function unpinCity(id) {
  if (id === 'local') return;
  pinnedLocationIds = pinnedLocationIds.filter(x => x !== id);
  if (activeLocationId === id) switchLocation('local');
  saveState();
  pinnedBadge.textContent = pinnedLocationIds.length;
  renderPinnedCards();
}

function handleSearch(q) {
  const query = q.trim().toLowerCase();
  searchResultsSection.style.display = searchClearBtn.style.display = query ? 'block' : 'none';
  if (!query) return;
  const matches = CITIES.filter(c => c._q.includes(query));
  searchResultCount.textContent = matches.length;
  searchResultsGrid.innerHTML = matches.length
    ? matches.map(c => cityCardHtml(c, pinnedLocationIds.includes(c.id))).join('')
    : `<div class="search-empty-state" style="grid-column:1/-1;">No locations found matching "${q}".</div>`;
}

function updateLiveCardTimes() {
  document.querySelectorAll('[data-card-time]').forEach(el => {
    const c = CITY_MAP.get(el.dataset.cardTime);
    if (c) {
      const f = formatTime(getCityDate(c.tz));
      el.textContent = `${f.time} ${f.ampm}`;
    }
  });
}

worldModal.onclick = e => {
  const rm = e.target.closest('.card-remove-btn');
  if (rm) { e.stopPropagation(); return unpinCity(rm.dataset.cityId); }
  const pin = e.target.closest('.pin-city-btn');
  if (pin) { e.stopPropagation(); pinCity(pin.dataset.cityId); return switchLocation(pin.dataset.cityId); }
  const set = e.target.closest('.set-dial-btn');
  if (set) { e.stopPropagation(); return switchLocation(set.dataset.cityId); }
  const card = e.target.closest('.city-card');
  if (card && card.dataset.cityId) switchLocation(card.dataset.cityId);
};

worldModal.onkeydown = e => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('city-card')) {
    e.preventDefault();
    switchLocation(e.target.dataset.cityId);
  }
};

const toggleModal = open => {
  isModalOpen = open;
  worldModalBackdrop.classList.toggle('open', open);
  worldModalBackdrop.setAttribute('aria-hidden', !open);
  if (open) { renderPinnedCards(); citySearchInput.focus(); }
  else { citySearchInput.value = ''; handleSearch(''); }
};

worldModalTrigger.onclick = headerLocDisplay.onclick = () => toggleModal(true);
$('modalCloseBtn').onclick = () => toggleModal(false);
worldModalBackdrop.onclick = e => e.target === worldModalBackdrop && toggleModal(false);
window.onkeydown = e => e.key === 'Escape' && isModalOpen && toggleModal(false);
citySearchInput.oninput = e => handleSearch(e.target.value);
searchClearBtn.onclick = () => { citySearchInput.value = ''; handleSearch(''); citySearchInput.focus(); };

const themes = { cyber: 'AUTOMATIC', rosegold: 'CHRONOMETER', stealth: 'TACTICAL' };
const themeButtons = document.querySelectorAll('.theme-btn');
function setTheme(t) {
  document.body.dataset.theme = t in themes ? t : 'cyber';
  brandSub.textContent = themes[document.body.dataset.theme];
  themeButtons.forEach(b => {
    const active = b.dataset.theme === document.body.dataset.theme;
    b.classList.toggle('active', active);
    b.setAttribute('aria-checked', active);
  });
  localStorage.setItem('aura_watch_theme', document.body.dataset.theme);
}
themeButtons.forEach(b => b.onclick = () => setTheme(b.dataset.theme));
setTheme(localStorage.getItem('aura_watch_theme') || 'cyber');

if (ticks) {
  ticks.innerHTML = Array.from({length: 60}, (_, i) => `<div class="tick${i % 5 ? '' : ' major'}" style="transform:rotate(${i * 6}deg) translateY(${i % 5 ? 'calc(-0.5 * var(--size) + 11px)' : 'calc(-0.5 * var(--size) + 14px)'})"></div>`).join('');
}

updateHeaderLocation(activeCity);
pinnedBadge.textContent = pinnedLocationIds.length;
renderPinnedCards();

let lastSec = 0, hrDeg = 0, minDeg = 0;
const shortest = (cur, target) => cur + ((target - (cur % 360) + 540) % 360) - 180;

function updateClock() {
  const d = getCityDate(activeCity.tz);
  const ms = d.getMilliseconds(), s = d.getSeconds() + ms / 1000, m = d.getMinutes() + s / 60, h = (d.getHours() % 12) + m / 60;
  sec.style.setProperty('--sec', `${s * 6}deg`);
  minDeg = shortest(minDeg, m * 6);
  hrDeg = shortest(hrDeg, h * 30);
  min.style.setProperty('--min', `${minDeg}deg`);
  hr.style.setProperty('--hr', `${hrDeg}deg`);

  const secFloor = Math.floor(d.getTime() / 1000);
  if (secFloor !== lastSec) {
    lastSec = secFloor;
    const f = formatTime(d);
    headerLocTime.textContent = `${f.time} ${f.ampm}`;
    if (isModalOpen) updateLiveCardTimes();
  }
  requestAnimationFrame(updateClock);
}
requestAnimationFrame(updateClock);