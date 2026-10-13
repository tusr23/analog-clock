const hr = document.getElementById('hour');
const min = document.getElementById('min');
const sec = document.getElementById('sec');
const ticks = document.getElementById('ticks');

const worldModalTrigger = document.getElementById('worldModalTrigger');
const pinnedBadge = document.getElementById('pinnedBadge');
const headerLocationDisplay = document.getElementById('headerLocationDisplay');
const headerLocFlag = document.getElementById('headerLocFlag');
const headerLocName = document.getElementById('headerLocName');
const headerLocTime = document.getElementById('headerLocTime');
const headerLocOffset = document.getElementById('headerLocOffset');
const headerLocDayNight = document.getElementById('headerLocDayNight');

const worldModalBackdrop = document.getElementById('worldModalBackdrop');
const worldModal = document.getElementById('worldModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const citySearchInput = document.getElementById('citySearchInput');
const searchClearBtn = document.getElementById('searchClearBtn');
const searchResultsSection = document.getElementById('searchResultsSection');
const searchResultCount = document.getElementById('searchResultCount');
const searchResultsGrid = document.getElementById('searchResultsGrid');
const pinnedGrid = document.getElementById('pinnedGrid');

const brandSub = document.getElementById('brandSub');
const themeButtons = document.querySelectorAll('.theme-btn');

const THEME_SUBTITLES = { cyber: 'AUTOMATIC', rosegold: 'CHRONOMETER', stealth: 'TACTICAL' };
const THEME_STORAGE_KEY = 'aura_watch_theme';
const LOCATION_STORAGE_KEY = 'aura_active_location';
const PINNED_STORAGE_KEY = 'aura_pinned_locations';

const WORLD_CITIES = [
  { id: 'local', name: 'Local Device Time', shortName: 'Local', country: 'Current Location', tz: null, flag: '📍' },
  { id: 'ny', name: 'New York', shortName: 'New York', country: 'United States', tz: 'America/New_York', flag: '🇺🇸' },
  { id: 'london', name: 'London', shortName: 'London', country: 'United Kingdom', tz: 'Europe/London', flag: '🇬🇧' },
  { id: 'paris', name: 'Paris', shortName: 'Paris', country: 'France', tz: 'Europe/Paris', flag: '🇫🇷' },
  { id: 'tokyo', name: 'Tokyo', shortName: 'Tokyo', country: 'Japan', tz: 'Asia/Tokyo', flag: '🇯🇵' },
  { id: 'dubai', name: 'Dubai', shortName: 'Dubai', country: 'United Arab Emirates', tz: 'Asia/Dubai', flag: '🇦🇪' },
  { id: 'sydney', name: 'Sydney', shortName: 'Sydney', country: 'Australia', tz: 'Australia/Sydney', flag: '🇦🇺' },
  { id: 'singapore', name: 'Singapore', shortName: 'Singapore', country: 'Singapore', tz: 'Asia/Singapore', flag: '🇸🇬' },
  { id: 'hongkong', name: 'Hong Kong', shortName: 'Hong Kong', country: 'China', tz: 'Asia/Hong_Kong', flag: '🇭🇰' },
  { id: 'losangeles', name: 'Los Angeles', shortName: 'Los Angeles', country: 'United States', tz: 'America/Los_Angeles', flag: '🇺🇸' },
  { id: 'chicago', name: 'Chicago', shortName: 'Chicago', country: 'United States', tz: 'America/Chicago', flag: '🇺🇸' },
  { id: 'toronto', name: 'Toronto', shortName: 'Toronto', country: 'Canada', tz: 'America/Toronto', flag: '🇨🇦' },
  { id: 'vancouver', name: 'Vancouver', shortName: 'Vancouver', country: 'Canada', tz: 'America/Vancouver', flag: '🇨🇦' },
  { id: 'berlin', name: 'Berlin', shortName: 'Berlin', country: 'Germany', tz: 'Europe/Berlin', flag: '🇩🇪' },
  { id: 'rome', name: 'Rome', shortName: 'Rome', country: 'Italy', tz: 'Europe/Rome', flag: '🇮🇹' },
  { id: 'madrid', name: 'Madrid', shortName: 'Madrid', country: 'Spain', tz: 'Europe/Madrid', flag: '🇪🇸' },
  { id: 'amsterdam', name: 'Amsterdam', shortName: 'Amsterdam', country: 'Netherlands', tz: 'Europe/Amsterdam', flag: '🇳🇱' },
  { id: 'zurich', name: 'Zurich', shortName: 'Zurich', country: 'Switzerland', tz: 'Europe/Zurich', flag: '🇨🇭' },
  { id: 'stockholm', name: 'Stockholm', shortName: 'Stockholm', country: 'Sweden', tz: 'Europe/Stockholm', flag: '🇸🇪' },
  { id: 'athens', name: 'Athens', shortName: 'Athens', country: 'Greece', tz: 'Europe/Athens', flag: '🇬🇷' },
  { id: 'istanbul', name: 'Istanbul', shortName: 'Istanbul', country: 'Turkey', tz: 'Europe/Istanbul', flag: '🇹🇷' },
  { id: 'cairo', name: 'Cairo', shortName: 'Cairo', country: 'Egypt', tz: 'Africa/Cairo', flag: '🇪🇬' },
  { id: 'riyadh', name: 'Riyadh', shortName: 'Riyadh', country: 'Saudi Arabia', tz: 'Asia/Riyadh', flag: '🇸🇦' },
  { id: 'mumbai', name: 'Mumbai / Delhi', shortName: 'Mumbai', country: 'India', tz: 'Asia/Kolkata', flag: '🇮🇳' },
  { id: 'dhaka', name: 'Dhaka', shortName: 'Dhaka', country: 'Bangladesh', tz: 'Asia/Dhaka', flag: '🇧🇩' },
  { id: 'bangkok', name: 'Bangkok', shortName: 'Bangkok', country: 'Thailand', tz: 'Asia/Bangkok', flag: '🇹🇭' },
  { id: 'seoul', name: 'Seoul', shortName: 'Seoul', country: 'South Korea', tz: 'Asia/Seoul', flag: '🇰🇷' },
  { id: 'shanghai', name: 'Beijing / Shanghai', shortName: 'Shanghai', country: 'China', tz: 'Asia/Shanghai', flag: '🇨🇳' },
  { id: 'melbourne', name: 'Melbourne', shortName: 'Melbourne', country: 'Australia', tz: 'Australia/Melbourne', flag: '🇦🇺' },
  { id: 'auckland', name: 'Auckland', shortName: 'Auckland', country: 'New Zealand', tz: 'Pacific/Auckland', flag: '🇳🇿' },
  { id: 'honolulu', name: 'Honolulu', shortName: 'Honolulu', country: 'United States', tz: 'Pacific/Honolulu', flag: '🇺🇸' },
  { id: 'anchorage', name: 'Anchorage', shortName: 'Anchorage', country: 'United States', tz: 'America/Anchorage', flag: '🇺🇸' },
  { id: 'saopaulo', name: 'São Paulo', shortName: 'São Paulo', country: 'Brazil', tz: 'America/Sao_Paulo', flag: '🇧🇷' },
  { id: 'buenosaires', name: 'Buenos Aires', shortName: 'Buenos Aires', country: 'Argentina', tz: 'America/Argentina/Buenos_Aires', flag: '🇦🇷' },
  { id: 'mexicocity', name: 'Mexico City', shortName: 'Mexico City', country: 'Mexico', tz: 'America/Mexico_City', flag: '🇲🇽' },
  { id: 'johannesburg', name: 'Johannesburg', shortName: 'Johannesburg', country: 'South Africa', tz: 'Africa/Johannesburg', flag: '🇿🇦' },
  { id: 'nairobi', name: 'Nairobi', shortName: 'Nairobi', country: 'Kenya', tz: 'Africa/Nairobi', flag: '🇰🇪' },
  { id: 'jakarta', name: 'Jakarta', shortName: 'Jakarta', country: 'Indonesia', tz: 'Asia/Jakarta', flag: '🇮🇩' },
  { id: 'kualalumpur', name: 'Kuala Lumpur', shortName: 'Kuala Lumpur', country: 'Malaysia', tz: 'Asia/Kuala_Lumpur', flag: '🇲🇾' },
  { id: 'manila', name: 'Manila', shortName: 'Manila', country: 'Philippines', tz: 'Asia/Manila', flag: '🇵🇭' },
  { id: 'qatar', name: 'Doha', shortName: 'Doha', country: 'Qatar', tz: 'Asia/Qatar', flag: '🇶🇦' },
  { id: 'telaviv', name: 'Tel Aviv', shortName: 'Tel Aviv', country: 'Israel', tz: 'Asia/Jerusalem', flag: '🇮🇱' },
  { id: 'prague', name: 'Prague', shortName: 'Prague', country: 'Czech Republic', tz: 'Europe/Prague', flag: '🇨🇿' },
  { id: 'vienna', name: 'Vienna', shortName: 'Vienna', country: 'Austria', tz: 'Europe/Vienna', flag: '🇦🇹' },
  { id: 'dublin', name: 'Dublin', shortName: 'Dublin', country: 'Ireland', tz: 'Europe/Dublin', flag: '🇮🇪' },
  { id: 'lisbon', name: 'Lisbon', shortName: 'Lisbon', country: 'Portugal', tz: 'Europe/Lisbon', flag: '🇵🇹' },
  { id: 'helsinki', name: 'Helsinki', shortName: 'Helsinki', country: 'Finland', tz: 'Europe/Helsinki', flag: '🇫🇮' },
  { id: 'oslo', name: 'Oslo', shortName: 'Oslo', country: 'Norway', tz: 'Europe/Oslo', flag: '🇳🇴' },
  { id: 'warsaw', name: 'Warsaw', shortName: 'Warsaw', country: 'Poland', tz: 'Europe/Warsaw', flag: '🇵🇱' },
  { id: 'brussels', name: 'Brussels', shortName: 'Brussels', country: 'Belgium', tz: 'Europe/Brussels', flag: '🇧🇪' },
  { id: 'santiago', name: 'Santiago', shortName: 'Santiago', country: 'Chile', tz: 'America/Santiago', flag: '🇨🇱' },
  { id: 'bogota', name: 'Bogotá', shortName: 'Bogotá', country: 'Colombia', tz: 'America/Bogota', flag: '🇨🇴' },
  { id: 'lima', name: 'Lima', shortName: 'Lima', country: 'Peru', tz: 'America/Lima', flag: '🇵🇪' },
  { id: 'reykjavik', name: 'Reykjavik', shortName: 'Reykjavik', country: 'Iceland', tz: 'Atlantic/Reykjavik', flag: '🇮🇸' }
];

const CITY_MAP = new Map();
WORLD_CITIES.forEach(c => {
  CITY_MAP.set(c.id, c);
  c._searchStr = `${c.name} ${c.shortName} ${c.country} ${c.tz || ''}`.toLowerCase();
});

const DEFAULT_PINNED_IDS = ['local', 'ny', 'london', 'tokyo', 'dubai', 'sydney'];
let activeLocationId = 'local';
let pinnedLocationIds = [...DEFAULT_PINNED_IDS];
let isModalOpen = false;

try {
  const savedActive = localStorage.getItem(LOCATION_STORAGE_KEY);
  if (savedActive && CITY_MAP.has(savedActive)) activeLocationId = savedActive;
  const savedPinned = JSON.parse(localStorage.getItem(PINNED_STORAGE_KEY));
  if (Array.isArray(savedPinned) && savedPinned.length) {
    pinnedLocationIds = savedPinned.filter(id => CITY_MAP.has(id));
    if (!pinnedLocationIds.includes('local')) pinnedLocationIds.unshift('local');
  }
} catch (e) {}

if (!pinnedLocationIds.includes(activeLocationId)) pinnedLocationIds.push(activeLocationId);

function saveState() {
  try {
    localStorage.setItem(LOCATION_STORAGE_KEY, activeLocationId);
    localStorage.setItem(PINNED_STORAGE_KEY, JSON.stringify(pinnedLocationIds));
  } catch (e) {}
}

const getCityById = id => CITY_MAP.get(id) || WORLD_CITIES[0];
let activeCity = getCityById(activeLocationId);
let activeCityOffsetMs = 0;

if (ticks) {
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 60; i++) {
    const t = document.createElement('div');
    const isMajor = i % 5 === 0;
    t.className = isMajor ? 'tick major' : 'tick';
    t.style.transform = `rotate(${i * 6}deg) translateY(${isMajor ? 'calc(-0.5 * var(--size) + 14px)' : 'calc(-0.5 * var(--size) + 11px)'})`;
    frag.appendChild(t);
  }
  ticks.appendChild(frag);
}

const offsetCache = new Map();
let lastCacheRefresh = 0;

function getCityOffsetFromLocalMs(tz) {
  if (!tz) return 0;
  const now = Date.now();
  if (now - lastCacheRefresh > 600000) {
    offsetCache.clear();
    lastCacheRefresh = now;
  }
  if (offsetCache.has(tz)) return offsetCache.get(tz);
  try {
    const d = new Date();
    const utc = new Date(d.toLocaleString('en-US', { timeZone: 'UTC' }));
    const target = new Date(d.toLocaleString('en-US', { timeZone: tz }));
    const diffMs = (target.getTime() - utc.getTime()) - (-d.getTimezoneOffset() * 60000);
    offsetCache.set(tz, diffMs);
    return diffMs;
  } catch (e) {
    return 0;
  }
}

const recycledDate = new Date();
const getCityDate = (tz, base = new Date()) => new Date(base.getTime() + getCityOffsetFromLocalMs(tz));

function getUtcOffsetString(tz) {
  if (!tz) {
    const min = -new Date().getTimezoneOffset();
    const sign = min >= 0 ? '+' : '-';
    const h = Math.floor(Math.abs(min) / 60);
    const m = Math.abs(min) % 60;
    return m ? `UTC${sign}${h}:${m < 10 ? '0' + m : m}` : `UTC${sign}${h}`;
  }
  try {
    const d = new Date();
    const utc = new Date(d.toLocaleString('en-US', { timeZone: 'UTC' }));
    const target = new Date(d.toLocaleString('en-US', { timeZone: tz }));
    const diffMin = Math.round((target.getTime() - utc.getTime()) / 60000);
    const sign = diffMin >= 0 ? '+' : '-';
    const h = Math.floor(Math.abs(diffMin) / 60);
    const m = Math.abs(diffMin) % 60;
    return m ? `UTC${sign}${h}:${m < 10 ? '0' + m : m}` : `UTC${sign}${h}`;
  } catch (e) {
    return 'UTC+0';
  }
}

function getRelativeDiffString(tz) {
  const diffMin = Math.round(getCityOffsetFromLocalMs(tz) / 60000);
  if (!diffMin) return 'Same as local';
  const abs = Math.abs(diffMin);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  const unit = diffMin > 0 ? 'ahead' : 'behind';
  return `${diffMin > 0 ? '+' : '-'}${h ? h + (m ? `h ${m}m` : ' hrs') : m + 'm'} ${unit}`;
}

function getDayNight(d) {
  const isDay = d.getHours() >= 6 && d.getHours() < 18;
  return { icon: isDay ? '☀️' : '🌙', label: isDay ? 'Daytime' : 'Night' };
}

function formatDigitalTime(d, includeSeconds = true) {
  const h24 = d.getHours();
  const h12 = h24 % 12 || 12;
  const m = d.getMinutes();
  const hStr = h12 < 10 ? '0' + h12 : '' + h12;
  const mStr = m < 10 ? '0' + m : '' + m;
  const ampm = h24 >= 12 ? 'PM' : 'AM';
  if (!includeSeconds) return `${hStr}:${mStr} ${ampm}`;
  const s = d.getSeconds();
  return { time: `${hStr}:${mStr}:${s < 10 ? '0' + s : s}`, ampm };
}

let isTransitioning = false;
let transitionStartTime = 0;
const TRANSITION_DURATION = 550;
let transitionStartHr = 0, transitionEndHr = 0;
let transitionStartMin = 0, transitionEndMin = 0;
let currentRenderedHr = 0, currentRenderedMin = 0;

const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
const shortestAngleDelta = (cur, target) => ((target - (cur % 360) + 540) % 360) - 180;

function switchLocation(newLocationId, animate = true) {
  const oldCity = activeCity;
  const newCity = getCityById(newLocationId);
  activeLocationId = newCity.id;
  activeCity = newCity;
  activeCityOffsetMs = getCityOffsetFromLocalMs(newCity.tz);

  if (!pinnedLocationIds.includes(activeLocationId)) pinnedLocationIds.push(activeLocationId);
  saveState();

  updateHeaderLocationDisplay(newCity);
  updateModalCardStates();

  if (animate) {
    const now = new Date();
    const oldDate = getCityDate(oldCity.tz, now);
    const newDate = getCityDate(newCity.tz, now);
    const oldHrDeg = ((oldDate.getHours() % 12) + oldDate.getMinutes() / 60 + oldDate.getSeconds() / 3600) * 30;
    const newHrDeg = ((newDate.getHours() % 12) + newDate.getMinutes() / 60 + newDate.getSeconds() / 3600) * 30;
    const oldMinDeg = (oldDate.getMinutes() + oldDate.getSeconds() / 60) * 6;
    const newMinDeg = (newDate.getMinutes() + newDate.getSeconds() / 60) * 6;

    transitionStartHr = currentRenderedHr || oldHrDeg;
    transitionEndHr = transitionStartHr + shortestAngleDelta(transitionStartHr, newHrDeg);
    transitionStartMin = currentRenderedMin || oldMinDeg;
    transitionEndMin = transitionStartMin + shortestAngleDelta(transitionStartMin, newMinDeg);
    transitionStartTime = performance.now();
    isTransitioning = true;
  } else {
    isTransitioning = false;
  }
}

activeCityOffsetMs = getCityOffsetFromLocalMs(activeCity.tz);

function updateHeaderLocationDisplay(city, now = new Date()) {
  if (!headerLocName) return;
  headerLocName.textContent = city.id === 'local' ? 'LOCAL TIME' : city.shortName.toUpperCase();
  if (headerLocFlag) headerLocFlag.textContent = city.flag;
  const offsetStr = getUtcOffsetString(city.tz);
  if (headerLocOffset) headerLocOffset.textContent = offsetStr;

  const cityDate = getCityDate(city.tz, now);
  const dn = getDayNight(cityDate);
  if (headerLocDayNight) {
    headerLocDayNight.textContent = dn.icon;
    headerLocDayNight.title = dn.label;
  }
  const formatted = formatDigitalTime(cityDate, true);
  if (headerLocTime) headerLocTime.textContent = `${formatted.time} ${formatted.ampm}`;
  if (headerLocationDisplay) headerLocationDisplay.setAttribute('aria-label', `Active Location: ${city.name} (${offsetStr})`);
}

function updateHeaderLiveTime() {
  if (!headerLocTime) return;
  recycledDate.setTime(Date.now() + activeCityOffsetMs);
  const f = formatDigitalTime(recycledDate, true);
  headerLocTime.textContent = `${f.time} ${f.ampm}`;
}

if (headerLocationDisplay) headerLocationDisplay.addEventListener('click', openWorldModal);

function renderPinnedCards() {
  if (!pinnedGrid) return;
  const frag = document.createDocumentFragment();
  const now = new Date();
  pinnedLocationIds.forEach(id => frag.appendChild(createCityCard(getCityById(id), now, true)));
  pinnedGrid.replaceChildren(frag);
}

function createCityCard(city, now = new Date(), isPinned = false) {
  const card = document.createElement('div');
  const isActive = city.id === activeLocationId;
  card.className = `city-card ${isActive ? 'active' : ''}`;
  card.dataset.cardLocId = city.id;
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `${city.name}, ${city.country}. Click to set on primary dial`);

  const cityDate = getCityDate(city.tz, now);
  const formatted = formatDigitalTime(cityDate, true);
  const offsetStr = getUtcOffsetString(city.tz);
  const diffStr = getRelativeDiffString(city.tz);
  const dn = getDayNight(cityDate);

  const localDate = now.getDate(), cDate = cityDate.getDate();
  let dayDiffStr = 'Today';
  if (cDate > localDate || (cDate === 1 && localDate > 27)) dayDiffStr = 'Tomorrow';
  else if (cDate < localDate || (localDate === 1 && cDate > 27)) dayDiffStr = 'Yesterday';

  card.innerHTML = `
    <div class="card-top">
      <div class="card-city-info">
        <span class="card-flag">${city.flag}</span>
        <div class="card-names">
          <span class="card-city-name">${city.name}</span>
          <span class="card-country">${city.country}</span>
        </div>
      </div>
      <div class="card-badges"><span class="card-dn-badge">${dn.icon} ${dn.label}</span></div>
    </div>
    <div class="card-time-row">
      <div class="card-digital-time" data-card-time="${city.id}">${formatted.time} ${formatted.ampm}</div>
      <span class="card-offset-badge">${offsetStr}</span>
    </div>
    <div class="card-meta-row">
      <span class="card-diff">${diffStr} • ${dayDiffStr}</span>
      <div class="card-actions">
        ${isActive ? '<span class="card-active-pill">ACTIVE DIAL</span>' : `<button class="card-btn set-dial-btn" type="button" data-city-id="${city.id}">Set on Dial</button>`}
        ${isPinned && city.id !== 'local' ? `<button class="card-remove-btn" type="button" data-city-id="${city.id}" title="Unpin city" aria-label="Unpin ${city.name}">✕</button>` : ''}
        ${!isPinned ? `<button class="card-btn pin-city-btn" type="button" data-city-id="${city.id}">+ Pin & Switch</button>` : ''}
      </div>
    </div>
  `;
  return card;
}

if (worldModal) {
  worldModal.addEventListener('click', e => {
    const removeBtn = e.target.closest('.card-remove-btn');
    if (removeBtn) {
      e.stopPropagation();
      return unpinCity(removeBtn.dataset.cityId);
    }
    const pinBtn = e.target.closest('.pin-city-btn');
    if (pinBtn) {
      e.stopPropagation();
      pinCity(pinBtn.dataset.cityId);
      return switchLocation(pinBtn.dataset.cityId, true);
    }
    const setDialBtn = e.target.closest('.set-dial-btn');
    if (setDialBtn) {
      e.stopPropagation();
      return switchLocation(setDialBtn.dataset.cityId, true);
    }
    const card = e.target.closest('.city-card');
    if (card && card.dataset.cardLocId) switchLocation(card.dataset.cardLocId, true);
  });

  worldModal.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('city-card')) {
      e.preventDefault();
      switchLocation(e.target.dataset.cardLocId, true);
    }
  });
}

function updateModalCardStates() {
  document.querySelectorAll('.city-card').forEach(card => {
    const cardId = card.dataset.cardLocId;
    if (!cardId) return;
    const isNowActive = cardId === activeLocationId;
    card.classList.toggle('active', isNowActive);
    const actionDiv = card.querySelector('.card-actions');
    if (actionDiv && card.closest('.pinned-grid')) {
      actionDiv.innerHTML = `
        ${isNowActive ? '<span class="card-active-pill">ACTIVE DIAL</span>' : `<button class="card-btn set-dial-btn" type="button" data-city-id="${cardId}">Set on Dial</button>`}
        ${pinnedLocationIds.includes(cardId) && cardId !== 'local' ? `<button class="card-remove-btn" type="button" data-city-id="${cardId}" title="Unpin city" aria-label="Unpin city">✕</button>` : ''}
      `;
    }
  });
}

function updateLiveCardTimes() {
  const now = new Date();
  document.querySelectorAll('[data-card-time]').forEach(el => {
    const cityId = el.getAttribute('data-card-time');
    if (cityId) {
      const f = formatDigitalTime(getCityDate(getCityById(cityId).tz, now), true);
      el.textContent = `${f.time} ${f.ampm}`;
    }
  });
}

function pinCity(cityId) {
  if (!pinnedLocationIds.includes(cityId)) {
    pinnedLocationIds.push(cityId);
    saveState();
    if (pinnedBadge) pinnedBadge.textContent = pinnedLocationIds.length;
    renderPinnedCards();
  }
}

function unpinCity(cityId) {
  if (cityId === 'local') return;
  pinnedLocationIds = pinnedLocationIds.filter(id => id !== cityId);
  if (activeLocationId === cityId) switchLocation('local', true);
  saveState();
  if (pinnedBadge) pinnedBadge.textContent = pinnedLocationIds.length;
  renderPinnedCards();
}

let searchDebounce = null;
function handleSearch(query) {
  const clean = query.trim().toLowerCase();
  if (!clean) {
    searchResultsSection.style.display = 'none';
    searchClearBtn.style.display = 'none';
    return;
  }
  searchClearBtn.style.display = 'block';
  searchResultsSection.style.display = 'block';
  const matches = WORLD_CITIES.filter(c => c._searchStr.includes(clean));
  searchResultCount.textContent = matches.length;

  if (!matches.length) {
    searchResultsGrid.innerHTML = `<div class="search-empty-state" style="grid-column:1/-1;">No locations found matching "${query}".</div>`;
    return;
  }
  const frag = document.createDocumentFragment();
  const now = new Date();
  matches.forEach(city => frag.appendChild(createCityCard(city, now, pinnedLocationIds.includes(city.id))));
  searchResultsGrid.replaceChildren(frag);
}

if (citySearchInput) {
  citySearchInput.addEventListener('input', e => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => handleSearch(e.target.value), 80);
  });
}

if (searchClearBtn) {
  searchClearBtn.addEventListener('click', () => {
    citySearchInput.value = '';
    handleSearch('');
    citySearchInput.focus();
  });
}

function openWorldModal() {
  if (!worldModalBackdrop) return;
  isModalOpen = true;
  renderPinnedCards();
  worldModalBackdrop.classList.add('open');
  worldModalBackdrop.setAttribute('aria-hidden', 'false');
  setTimeout(() => citySearchInput && citySearchInput.focus(), 100);
}

function closeWorldModal() {
  if (!worldModalBackdrop) return;
  isModalOpen = false;
  worldModalBackdrop.classList.remove('open');
  worldModalBackdrop.setAttribute('aria-hidden', 'true');
  if (citySearchInput) {
    citySearchInput.value = '';
    handleSearch('');
  }
}

if (worldModalTrigger) worldModalTrigger.addEventListener('click', openWorldModal);
if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeWorldModal);
if (worldModalBackdrop) {
  worldModalBackdrop.addEventListener('click', e => {
    if (e.target === worldModalBackdrop) closeWorldModal();
  });
}
window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && isModalOpen) closeWorldModal();
});

function setTheme(name) {
  if (!THEME_SUBTITLES[name]) name = 'cyber';
  document.body.setAttribute('data-theme', name);
  if (brandSub) brandSub.textContent = THEME_SUBTITLES[name];
  themeButtons.forEach(btn => {
    const active = btn.dataset.theme === name;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-checked', active ? 'true' : 'false');
  });
  try { localStorage.setItem(THEME_STORAGE_KEY, name); } catch (e) {}
}

themeButtons.forEach(btn => {
  btn.addEventListener('click', () => btn.dataset.theme && setTheme(btn.dataset.theme));
});

let initialTheme = 'cyber';
try {
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  if (saved && THEME_SUBTITLES[saved]) initialTheme = saved;
} catch (e) {}
setTheme(initialTheme);

updateHeaderLocationDisplay(activeCity);
if (pinnedBadge) pinnedBadge.textContent = pinnedLocationIds.length;
renderPinnedCards();

let lastLiveSecondTick = 0;

function updateClock(timestamp) {
  const nowMs = Date.now();
  recycledDate.setTime(nowMs + activeCityOffsetMs);

  const ms = recycledDate.getMilliseconds();
  const s = recycledDate.getSeconds() + ms / 1000;
  const m = recycledDate.getMinutes() + s / 60;
  const h = (recycledDate.getHours() % 12) + m / 60;

  sec.style.setProperty('--sec', `${s * 6}deg`);

  if (isTransitioning) {
    const elapsed = timestamp - transitionStartTime;
    if (elapsed >= TRANSITION_DURATION) {
      isTransitioning = false;
      currentRenderedHr = h * 30;
      currentRenderedMin = m * 6;
      hr.style.setProperty('--hr', `${currentRenderedHr}deg`);
      min.style.setProperty('--min', `${currentRenderedMin}deg`);
    } else {
      const p = easeOutCubic(elapsed / TRANSITION_DURATION);
      currentRenderedHr = transitionStartHr + (transitionEndHr - transitionStartHr) * p;
      currentRenderedMin = transitionStartMin + (transitionEndMin - transitionStartMin) * p;
      hr.style.setProperty('--hr', `${currentRenderedHr}deg`);
      min.style.setProperty('--min', `${currentRenderedMin}deg`);
    }
  } else {
    const targetHr = h * 30, targetMin = m * 6;
    if (Math.abs(targetMin - currentRenderedMin) > 0.04) {
      currentRenderedMin = targetMin;
      min.style.setProperty('--min', `${targetMin}deg`);
    }
    if (Math.abs(targetHr - currentRenderedHr) > 0.02) {
      currentRenderedHr = targetHr;
      hr.style.setProperty('--hr', `${targetHr}deg`);
    }
  }

  const secFloor = Math.floor(nowMs / 1000);
  if (secFloor !== lastLiveSecondTick) {
    lastLiveSecondTick = secFloor;
    updateHeaderLiveTime();
    if (isModalOpen) updateLiveCardTimes();
  }

  requestAnimationFrame(updateClock);
}

requestAnimationFrame(updateClock);