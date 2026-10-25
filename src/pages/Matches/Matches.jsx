import React, { useState } from 'react';
import styles from './Matches.module.css';

const MATCHES = [
  { d: '2026-09-29', t: 'Ліга націй', r: '2 тур', time: '19:00', h: 'Молдова', a: 'Фарерські острови', hs: 1, as: 1, st: 'fin', info: 'Голи: 23′ Ракіцький, 67′ Мікаелсен' },
  { d: '2026-09-29', t: 'Ліга націй', r: '2 тур', time: '19:00', h: 'Фінляндія', a: 'Білорусь', hs: 0, as: 0, st: 'fin', info: 'Без голів' },
  { d: '2026-09-29', t: 'Ліга націй', r: '2 тур', time: '21:45', h: 'Іспанія', a: 'Хорватія', hs: 4, as: 1, st: 'fin', info: 'Голи: 12′, 34′, 58′, 81′ — Іспанія; 46′ — Хорватія' },
  { d: '2026-09-29', t: 'Ліга націй', r: '2 тур', time: '21:45', h: 'Чехія', a: 'Англія', hs: 0, as: 2, st: 'fin', info: 'Голи: 29′, 73′ — Англія' },
  { d: '2026-09-29', t: 'Ліга націй', r: '2 тур', time: '21:45', h: 'Шотландія', a: 'Швейцарія', hs: 0, as: 3, st: 'fin', info: 'Голи: 18′, 52′, 88′ — Швейцарія' },
  { d: '2026-09-29', t: 'Ліга націй', r: '2 тур', time: '21:45', h: 'Словенія', a: 'Північна Македонія', hs: 2, as: 0, st: 'fin', info: 'Голи: 31′, 77′ — Словенія' },
  { d: '2026-09-29', t: 'Ліга націй', r: '2 тур', time: '21:45', h: 'Словаччина', a: 'Казахстан', hs: 2, as: 1, st: 'fin', info: 'Голи: 9′, 64′ — Словаччина; 70′ — Казахстан' },
  { d: '2026-09-30', t: 'Кубок України', r: '1/8 фіналу', time: '15:00', h: 'Динамо Київ', a: 'Оболонь', hs: null, as: null, st: 'soon', info: 'Початок о 15:00. Стадіон уточнюється.' },
  { d: '2026-09-30', t: 'Кубок України', r: '1/8 фіналу', time: '17:30', h: 'Шахтар Донецьк', a: 'Карпати Львів', hs: null, as: null, st: 'soon', info: 'Початок о 17:30.' },
  { d: '2026-09-30', t: 'Ліга Європи', r: '2 тур', time: '19:45', h: 'Рома', a: 'Лілль', hs: 1, as: 0, st: 'live', min: '61′', info: 'Гол: 44′ — Рома' },
  { d: '2026-09-30', t: 'Ліга Європи', r: '2 тур', time: '22:00', h: 'Астон Вілла', a: 'Бранн', hs: null, as: null, st: 'soon', info: 'Початок о 22:00.' },
  { d: '2026-10-01', t: 'Ліга чемпіонів', r: '2 тур', time: '19:45', h: 'Барселона', a: 'Інтер', hs: null, as: null, st: 'soon', info: 'Початок о 19:45.' },
  { d: '2026-10-01', t: 'Ліга чемпіонів', r: '2 тур', time: '22:00', h: 'Ліверпуль', a: 'Баварія', hs: null, as: null, st: 'soon', info: 'Початок о 22:00.' }
];

const FEED = [
  { t: '19:17', hot: 0, x: 'Футбольна асоціація звинуватила арбітра у неправомірних діях через критику суддів' },
  { t: '18:59', hot: 1, x: 'Долю півфіналу Кубка Перської затоки вирішив жереб' },
  { t: '18:28', hot: 1, x: 'Ван Гекке травмувався в матчі за збірну та повертається до клубу' },
  { t: '17:59', hot: 0, x: 'Смоллінг близький до підписання контракту з Порту' },
  { t: '17:24', hot: 0, x: 'Бордо уникне ліквідації: французький клуб отримав нового власника' },
  { t: '17:00', hot: 1, x: 'Стало відомо, скільки Довбик заробляє в Болоньї' },
  { t: '16:45', hot: 0, x: 'Шахтар зіграє з Кривбасом під час міжнародної перерви' },
  { t: '16:29', hot: 0, x: 'Кін заявив, що викинув би свої медалі у смітник, якби грав за Манчестер Сіті' },
  { t: '15:44', hot: 0, x: 'Ноттінгем Форест підписав молодого нападника' }
];

const iso = d => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);

function renderBadge(name) {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) % 360;
  const ini = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <span className={styles.badge} style={{ background: `hsl(${h} 45% 34%)` }}>
      {ini}
    </span>
  );
}

export function Matches() {
  const [currentDate, setCurrentDate] = useState(() => new Date('2026-09-30T12:00:00'));
  const [selectedTournament, setSelectedTournament] = useState('');
  const [openMatches, setOpenMatches] = useState({});

  const dayStr = iso(currentDate);
  const dayMatches = MATCHES.filter(m => m.d === dayStr);
  const availableTournaments = [...new Set(dayMatches.map(m => m.t))];

  const filteredMatches = dayMatches.filter(
    m => !selectedTournament || m.t === selectedTournament
  );

  const groups = {};
  filteredMatches.forEach(m => {
    const key = `${m.t}|${m.r}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(m);
  });

  const shiftDays = n => {
    setCurrentDate(prev => {
      const next = new Date(prev);
      next.setDate(next.getDate() + n);
      return next;
    });
  };

  const handleDateChange = e => {
    if (e.target.value) {
      setCurrentDate(new Date(`${e.target.value}T12:00:00`));
    }
  };

  const toggleMatchDetails = matchId => {
    setOpenMatches(prev => ({ ...prev, [matchId]: !prev[matchId] }));
  };

  return (
    <div className={styles.matchesContainer}>
      <div className={styles.layout}>
        <main>
          <h1 className={styles.title}>
            Розклад та результати матчів
            <small>
              {currentDate.toLocaleDateString('uk-UA', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </small>
          </h1>

          <div className={styles.filters}>
            <label className={styles.field}>
              <span>Турнір</span>
              <select
                className={styles.select}
                value={selectedTournament}
                onChange={e => setSelectedTournament(e.target.value)}
              >
                <option value="">Усі актуальні</option>
                {availableTournaments.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </label>

            <div className={styles.datebar}>
              <button type="button" onClick={() => shiftDays(-1)} aria-label="Попередній день">‹</button>
              <input
                type="date"
                className={styles.dateInput}
                value={dayStr}
                onChange={handleDateChange}
                aria-label="Обрати дату"
              />
              <button type="button" onClick={() => shiftDays(1)} aria-label="Наступний день">›</button>
              <button
                type="button"
                className={styles.todayBtn}
                onClick={() => setCurrentDate(new Date())}
              >
                Сьогодні
              </button>
            </div>
          </div>

          <div id="matches">
            {Object.keys(groups).length === 0 ? (
              <div className={styles.empty}>
                На цей день матчів немає. Оберіть іншу дату.
              </div>
            ) : (
              Object.entries(groups).map(([key, ms]) => {
                const [t, r] = key.split('|');
                return (
                  <section key={key} className={styles.group}>
                    <div className={styles.groupHead}>
                      {t}
                      <small>{r}</small>
                    </div>
                    {ms.map((m, idx) => {
                      const matchId = `${m.d}-${m.h}-${m.a}-${idx}`;
                      const isOpen = !!openMatches[matchId];
                      const score = m.st === 'soon' ? '–:–' : `${m.hs}:${m.as}`;
                      const scoreClass = m.st === 'soon' ? styles.soon : m.st === 'live' ? styles.live : '';

                      return (
                        <div
                          key={matchId}
                          className={`${styles.match} ${isOpen ? styles.open : ''}`}
                        >
                          <button
                            className={styles.row}
                            type="button"
                            aria-expanded={isOpen}
                            onClick={() => toggleMatchDetails(matchId)}
                          >
                            <span className={styles.time}>{m.time}</span>
                            <span className={`${styles.team} ${styles.home}`}>
                              <span>{m.h}</span>
                              {renderBadge(m.h)}
                            </span>
                            <span className={`${styles.score} ${scoreClass}`}>
                              {score}
                              {m.st === 'live' && (
                                <span className={styles.liveTag}>{m.min}</span>
                              )}
                            </span>
                            <span className={styles.team}>
                              {renderBadge(m.a)}
                              <span>{m.a}</span>
                            </span>
                            <span className={styles.arrow}>⌄</span>
                          </button>
                          <div className={styles.details}>
                            <b>{m.h} — {m.a}</b>
                            <br />
                            {m.info}
                          </div>
                        </div>
                      );
                    })}
                  </section>
                );
              })
            )}
          </div>
        </main>

        <aside className={styles.card}>
          <h2>Стрічка новин</h2>
          <ul className={styles.feed}>
            {FEED.map((n, i) => (
              <li key={i} className={n.hot ? styles.hot : ''}>
                <time>{n.t}</time>
                <a href="#news">{n.x}</a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}