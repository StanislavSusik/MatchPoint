import React, { useState } from 'react';
import styles from './Matches.module.css';
import { useMatches } from '../../hooks/useMatches';
import { useNewsFeed } from '../../hooks/useNewsFeed';

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

  // Виклики хуків
  const { groups = {}, availableTournaments = [], loading: loadingMatches, error } = useMatches(dayStr, selectedTournament);
  const { feed = [], loading: loadingFeed } = useNewsFeed();

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
            {loadingMatches ? (
              <div className={styles.empty}>Завантаження матчів...</div>
            ) : error ? (
              <div className={styles.empty}>{error}</div>
            ) : Object.keys(groups).length === 0 ? (
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
          {loadingFeed ? (
            <div>Завантаження новин...</div>
          ) : (
            <ul className={styles.feed}>
              {feed.map((n) => (
                <li key={n.id} className={n.hot ? styles.hot : ''}>
                  <time>{n.time}</time>
                  <a href="#news">{n.title}</a>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </div>
  );
}