/* ===== ДАНІ (заміни на свої) ===== */
// st: 'fin' — завершено, 'live' — йде, 'soon' — ще не почався
const MATCHES = [
  {d:'2026-09-29', t:'Ліга націй', r:'2 тур', time:'19:00', h:'Молдова', a:'Фарерські острови', hs:1, as:1, st:'fin', info:'Голи: 23′ Ракіцький, 67′ Мікаелсен'},
  {d:'2026-09-29', t:'Ліга націй', r:'2 тур', time:'19:00', h:'Фінляндія', a:'Білорусь', hs:0, as:0, st:'fin', info:'Без голів'},
  {d:'2026-09-29', t:'Ліга націй', r:'2 тур', time:'21:45', h:'Іспанія', a:'Хорватія', hs:4, as:1, st:'fin', info:'Голи: 12′, 34′, 58′, 81′ — Іспанія; 46′ — Хорватія'},
  {d:'2026-09-29', t:'Ліга націй', r:'2 тур', time:'21:45', h:'Чехія', a:'Англія', hs:0, as:2, st:'fin', info:'Голи: 29′, 73′ — Англія'},
  {d:'2026-09-29', t:'Ліга націй', r:'2 тур', time:'21:45', h:'Шотландія', a:'Швейцарія', hs:0, as:3, st:'fin', info:'Голи: 18′, 52′, 88′ — Швейцарія'},
  {d:'2026-09-29', t:'Ліга націй', r:'2 тур', time:'21:45', h:'Словенія', a:'Північна Македонія', hs:2, as:0, st:'fin', info:'Голи: 31′, 77′ — Словенія'},
  {d:'2026-09-29', t:'Ліга націй', r:'2 тур', time:'21:45', h:'Словаччина', a:'Казахстан', hs:2, as:1, st:'fin', info:'Голи: 9′, 64′ — Словаччина; 70′ — Казахстан'},
  {d:'2026-09-30', t:'Кубок України', r:'1/8 фіналу', time:'15:00', h:'Динамо Київ', a:'Оболонь', hs:null, as:null, st:'soon', info:'Початок о 15:00. Стадіон уточнюється.'},
  {d:'2026-09-30', t:'Кубок України', r:'1/8 фіналу', time:'17:30', h:'Шахтар Донецьк', a:'Карпати Львів', hs:null, as:null, st:'soon', info:'Початок о 17:30.'},
  {d:'2026-09-30', t:'Ліга Європи', r:'2 тур', time:'19:45', h:'Рома', a:'Лілль', hs:1, as:0, st:'live', min:"61′", info:'Гол: 44′ — Рома'},
  {d:'2026-09-30', t:'Ліга Європи', r:'2 тур', time:'22:00', h:'Астон Вілла', a:'Бранн', hs:null, as:null, st:'soon', info:'Початок о 22:00.'},
  {d:'2026-10-01', t:'Ліга чемпіонів', r:'2 тур', time:'19:45', h:'Барселона', a:'Інтер', hs:null, as:null, st:'soon', info:'Початок о 19:45.'},
  {d:'2026-10-01', t:'Ліга чемпіонів', r:'2 тур', time:'22:00', h:'Ліверпуль', a:'Баварія', hs:null, as:null, st:'soon', info:'Початок о 22:00.'}
];

const FEED = [
  {t:'19:17', hot:0, x:'Футбольна асоціація звинуватила арбітра у неправомірних діях через критику суддів'},
  {t:'18:59', hot:1, x:'Долю півфіналу Кубка Перської затоки вирішив жереб'},
  {t:'18:28', hot:1, x:'Ван Гекке травмувався в матчі за збірну та повертається до клубу'},
  {t:'17:59', hot:0, x:'Смоллінг близький до підписання контракту з Порту'},
  {t:'17:24', hot:0, x:'Бордо уникне ліквідації: французький клуб отримав нового власника'},
  {t:'17:00', hot:1, x:'Стало відомо, скільки Довбик заробляє в Болоньї'},
  {t:'16:45', hot:0, x:'Шахтар зіграє з Кривбасом під час міжнародної перерви'},
  {t:'16:29', hot:0, x:'Кін заявив, що викинув би свої медалі у сміттик, якби грав за Манчестер Сіті'},
  {t:'15:44', hot:0, x:'Ноттінгем Форест підписав молодого нападника'}
];

/* ===== УТИЛІТИ ===== */
const $ = id => document.getElementById(id);
const iso = d => new Date(d.getTime() - d.getTimezoneOffset()*60000).toISOString().slice(0,10);
let current = new Date();

function badge(name){
  let h = 0;
  for (const c of name) h = (h*31 + c.charCodeAt(0)) % 360;
  const ini = name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
  return `<span class="badge" style="background:hsl(${h} 45% 34%)">${ini}</span>`;
}

/* ===== РЕНДЕР ===== */
function render(){
  const day = iso(current);
  $('datePick').value = day;
  $('dateTitle').textContent = current.toLocaleDateString('uk-UA', {weekday:'long', day:'numeric', month:'long', year:'numeric'});

  const dayMatches = MATCHES.filter(m => m.d === day);

  // Список турнірів на цей день
  const sel = $('tournament');
  const prev = sel.value;
  const tours = [...new Set(dayMatches.map(m => m.t))];
  sel.innerHTML = '<option value="">Усі актуальні</option>' + tours.map(t => `<option>${t}</option>`).join('');
  if (tours.includes(prev)) sel.value = prev;

  const list = dayMatches.filter(m => !sel.value || m.t === sel.value);
  if (!list.length){
    $('matches').innerHTML = '<div class="empty">На цей день матчів немає. Оберіть іншу дату.</div>';
    return;
  }

  // Групуємо за турніром і туром
  const groups = {};
  list.forEach(m => (groups[m.t + '|' + m.r] ||= []).push(m));

  $('matches').innerHTML = Object.entries(groups).map(([key, ms]) => {
    const [t, r] = key.split('|');
    const rows = ms.map(m => {
      const score = m.st === 'soon' ? '–:–' : `${m.hs}:${m.as}`;
      const cls = m.st === 'soon' ? 'soon' : m.st === 'live' ? 'live' : '';
      const tag = m.st === 'live' ? `<span class="live-tag">${m.min}</span>` : '';
      return `<div class="match">
        <button class="row" type="button" aria-expanded="false">
          <span class="time">${m.time}</span>
          <span class="team home"><span>${m.h}</span>${badge(m.h)}</span>
          <span class="score ${cls}">${score}${tag}</span>
          <span class="team">${badge(m.a)}<span>${m.a}</span></span>
          <span class="arrow">⌄</span>
        </button>
        <div class="details"><b>${m.h} — ${m.a}</b><br>${m.info}</div>
      </div>`;
    }).join('');
    return `<section class="group"><div class="group-head">${t}<small>${r}</small></div>${rows}</section>`;
  }).join('');
}

/* ===== ПОДІЇ ===== */
$('matches').addEventListener('click', e => {
  const btn = e.target.closest('.row');
  if (!btn) return;
  const box = btn.parentElement;
  box.classList.toggle('open');
  btn.setAttribute('aria-expanded', box.classList.contains('open'));
});

const shift = n => { current.setDate(current.getDate() + n); render(); };
$('prevDay').onclick = () => shift(-1);
$('nextDay').onclick = () => shift(1);
$('todayBtn').onclick = () => { current = new Date(); render(); };
$('datePick').onchange = e => { if (e.target.value) { current = new Date(e.target.value + 'T12:00:00'); render(); } };
$('tournament').onchange = render;

/* ===== СТРІЧКА НОВИН ===== */
$('feed').innerHTML = FEED.map(n =>
  `<li class="${n.hot ? 'hot' : ''}"><time>${n.t}</time><a href="#">${n.x}</a></li>`
).join('');

/* ===== ТЕМА ===== */
const root = document.documentElement;
const themeBtn = $('theme');
function setTheme(dark){
  root.dataset.theme = dark ? 'dark' : 'light';
  themeBtn.textContent = dark ? 'Світла тема' : 'Темна тема';
  try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch(e){}
}
let saved = null;
try { saved = localStorage.getItem('theme'); } catch(e){}
setTheme(saved === 'dark');
themeBtn.onclick = () => setTheme(root.dataset.theme !== 'dark');

render();