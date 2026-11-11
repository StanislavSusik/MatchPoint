import React, { useState } from 'react';
import styles from './News.module.css';
import { useMainNews } from '../../hooks/useMainNews';
import { useStandings } from '../../hooks/useStandings';

const months = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
const monthsGen = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'];
const wds = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

// Форматування дати у YYYY-MM-DD для хука
const formatDateKey = (y, m, d) => {
  const mm = String(m + 1).padStart(2, '0');
  const dd = String(d).padStart(2, '0');
  return `${y}-${mm}-${dd}`;
};

export function News() {
  const now = new Date();
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(8); // Вересень (0-index)
  const [selected, setSelected] = useState({ d: 11, m: 10, y: 2026 });

  // Формуємо ключ дати для хука
  const selectedDateKey = selected
    ? formatDateKey(selected.y, selected.m, selected.d)
    : formatDateKey(now.getFullYear(), now.getMonth(), now.getDate());

  // Отримуємо новини та таблицю з хуків
  const { newsData, loading: newsLoading } = useMainNews(selectedDateKey);
  const { teams, loading: standingsLoading } = useStandings();

  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(prev => prev - 1);
    } else {
      setMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(prev => prev + 1);
    } else {
      setMonth(prev => prev + 1);
    }
  };

  const handleSelectDay = (day) => {
    setSelected({ d: day, m: month, y: year });
  };

  const handleResetToday = () => {
    const tYear = now.getFullYear();
    const tMonth = now.getMonth();
    const tDay = now.getDate();
    setYear(tYear);
    setMonth(tMonth);
    setSelected({ d: tDay, m: tMonth, y: tYear });
  };

  return (
    <div className={styles.newsContainer}>
      <div className={styles.layout}>
        {/* АПЛ Таблиця */}
        <aside className={styles.card}>
          <h2>Англійська Прем'єр-ліга</h2>
          {standingsLoading ? (
            <div>Завантаження таблиці...</div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Команда</th>
                  <th>І</th>
                  <th>В</th>
                  <th>Н</th>
                  <th>П</th>
                  <th>О</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((t, i) => (
                  <tr
                    key={t.n}
                    className={
                      i < 4 ? styles.cl : i >= teams.length - 3 ? styles.rel : ''
                    }
                  >
                    <td>{i + 1}</td>
                    <td>{t.n}</td>
                    <td>{t.g}</td>
                    <td>{t.w}</td>
                    <td>{t.d}</td>
                    <td>{t.l}</td>
                    <td>{t.p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className={styles.legend}>
            <span>
              <i style={{ background: 'var(--gold, #e8a317)' }}></i>Ліга чемпіонів
            </span>
            <span>
              <i style={{ background: '#c0392b' }}></i>Виліт
            </span>
          </div>
        </aside>

        {/* Стрічка Новин */}
        <main>
          <h1 className={styles.title}>
            Новини українського та світового футболу
            <small>
              {selected
                ? `Новини за ${selected.d} ${monthsGen[selected.m]} ${selected.y}`
                : 'Сьогодні'}
            </small>
          </h1>

          {newsLoading ? (
            <div className={styles.empty}>Завантаження новин...</div>
          ) : !newsData ? (
            <div className={styles.empty}>
              На цю дату новин немає. Оберіть іншу дату в календарі.
            </div>
          ) : (
            <>
              {/* Головна новина (Hero) */}
              {newsData.hero && (
                <article
                  className={styles.hero}
                  style={{ backgroundImage: `url('${newsData.hero.image}')` }}
                >
                  <div className={styles.txt}>
                    <div className={styles.d}>{newsData.hero.date}</div>
                    <h3>{newsData.hero.title}</h3>
                    <p>{newsData.hero.summary}</p>
                  </div>
                </article>
              )}

              {/* Список новин */}
              {newsData.items &&
                newsData.items.map((item) => (
                  <div key={item.id} className={styles.item}>
                    <div
                      className={styles.thumb}
                      style={{ backgroundImage: `url('${item.image}')` }}
                    ></div>
                    <div>
                      <div className={styles.meta}>
                        <span>{item.date}</span>
                        <span>{item.category}</span>
                      </div>
                      <h4>{item.title}</h4>
                      <p>{item.summary}</p>
                    </div>
                  </div>
                ))}
            </>
          )}
        </main>

        {/* Календар */}
        <aside className={styles.card}>
          <div className={styles.calHead}>
            <h2>
              {months[month]} {year}
            </h2>
            <div>
              <button type="button" onClick={handlePrevMonth}>‹</button>
              <button type="button" onClick={handleNextMonth}>›</button>
            </div>
          </div>
          <div className={styles.grid}>
            {wds.map(d => (
              <div key={d} className={styles.wd}>{d}</div>
            ))}

            {Array.from({ length: offset }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const d = i + 1;
              const isToday =
                d === now.getDate() &&
                month === now.getMonth() &&
                year === now.getFullYear();
              const isSel =
                selected &&
                selected.d === d &&
                selected.m === month &&
                selected.y === year;

              return (
                <button
                  key={d}
                  type="button"
                  className={`${styles.day} ${isToday ? styles.today : ''} ${
                    isSel ? styles.sel : ''
                  }`}
                  onClick={() => handleSelectDay(d)}
                >
                  {d}
                </button>
              );
            })}
          </div>
          <button
            className={styles.todayBtn}
            type="button"
            onClick={handleResetToday}
          >
            Сьогодні
          </button>
        </aside>
      </div>
    </div>
  );
}