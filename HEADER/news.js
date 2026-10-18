// ---------- Тема ----------
const root = document.documentElement, themeBtn = document.getElementById('theme');
themeBtn.onclick = () => {
  const dark = root.dataset.theme === 'dark';
  root.dataset.theme = dark ? 'light' : 'dark';
  themeBtn.textContent = dark ? 'Темна тема' : 'Світла тема';
};

// ---------- Таблиця АПЛ (ПРИКЛАД ДАНИХ — замініть на свої) ----------
// [команда, перемоги, нічиї, поразки]
const teams = [
  ['Арсенал',6,1,0],['Ліверпуль',5,1,1],['Манчестер Сіті',5,1,1],['Челсі',4,2,1],
  ['Тоттенгем',4,1,2],['Ньюкасл',4,1,2],['Астон Вілла',3,3,1],['Манчестер Юнайтед',3,2,2],
  ['Брайтон',3,2,2],['Брентфорд',3,1,3],['Ноттінгем Форест',2,3,2],['Фулгем',2,3,2],
  ['Вест Гем',2,2,3],['Борнмут',2,2,3],['Крістал Пелас',2,1,4],['Евертон',1,3,3],
  ['Вулвергемптон',1,2,4],['Лідс',1,2,4],['Бернлі',0,3,4],['Сандерленд',0,2,5]
].map(([n,w,d,l]) => ({n,w,d,l,g:w+d+l,p:w*3+d}))
 .sort((a,b) => b.p - a.p || b.w - a.w);

document.getElementById('tbl').innerHTML = teams.map((t,i) =>
  `<tr class="${i<4?'cl':i>=teams.length-3?'rel':''}"><td>${i+1}</td><td>${t.n}</td><td>${t.g}</td><td>${t.w}</td><td>${t.d}</td><td>${t.l}</td><td>${t.p}</td></tr>`
).join('');

// ---------- Календар ----------
const months = ['Січень','Лютий','Березень','Квітень','Травень','Червень','Липень','Серпень','Вересень','Жовтень','Листопад','Грудень'];
const monthsGen = ['січня','лютого','березня','квітня','травня','червня','липня','серпня','вересня','жовтня','листопада','грудня'];
const wds = ['Пн','Вт','Ср','Чт','Пт','Сб','Нд'];
const now = new Date();
let year = now.getFullYear(), month = now.getMonth(), selected = null;
const cal = document.getElementById('cal');

function render() {
  document.getElementById('monthTitle').textContent = months[month] + ' ' + year;
  let html = wds.map(d => `<div class="wd">${d}</div>`).join('');
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;   // тиждень з понеділка
  const days = new Date(year, month + 1, 0).getDate();
  html += '<div></div>'.repeat(offset);
  for (let d = 1; d <= days; d++) {
    const isToday = d === now.getDate() && month === now.getMonth() && year === now.getFullYear();
    const isSel = selected && selected.d === d && selected.m === month && selected.y === year;
    html += `<button type="button" class="day${isToday?' today':''}${isSel?' sel':''}" data-d="${d}">${d}</button>`;
  }
  cal.innerHTML = html;
}
cal.onclick = e => {
  const b = e.target.closest('.day'); if (!b) return;
  selected = {d:+b.dataset.d, m:month, y:year};
  document.getElementById('picked').textContent = `Новини за ${selected.d} ${monthsGen[month]} ${year}`;
  render();
  // TODO: тут можна завантажити новини за обрану дату
};
document.getElementById('prev').onclick = () => { month--; if (month < 0) { month = 11; year--; } render(); };
document.getElementById('next').onclick = () => { month++; if (month > 11) { month = 0; year++; } render(); };
document.getElementById('todayBtn').onclick = () => {
  year = now.getFullYear(); month = now.getMonth(); selected = null;
  document.getElementById('picked').textContent = 'Сьогодні'; render();
};
render();