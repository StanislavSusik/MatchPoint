import React, { useState } from 'react';
import styles from './News.module.css';

// Екзакт Датен aus dengem JS-Skript fir d'APL Tabell
const rawTeams = [
  ['Арсенал', 6, 1, 0], ['Ліверпуль', 5, 1, 1], ['Манчестер Сіті', 5, 1, 1], ['Челсі', 4, 2, 1],
  ['Тоттенгем', 4, 1, 2], ['Ньюкасл', 4, 1, 2], ['Астон Вілла', 3, 3, 1], ['Манчестер Юнайтед', 3, 2, 2],
  ['Брайтон', 3, 2, 2], ['Брентфорд', 3, 1, 3], ['Ноттінгем Форест', 2, 3, 2], ['Фулгем', 2, 3, 2],
  ['Вест Гем', 2, 2, 3], ['Борнмут', 2, 2, 3], ['Крістал Пелас', 2, 1, 4], ['Евертон', 1, 3, 3],
  ['Вулвергемптон', 1, 2, 4], ['Лідс', 1, 2, 4], ['Бернлі', 0, 3, 4], ['Сандерленд', 0, 2, 5]
];

const teams = rawTeams
  .map(([n, w, d, l]) => ({ n, w, d, l, g: w + d + l, p: w * 3 + d }))
  .sort((a, b) => b.p - a.p || b.w - a.w);

const months = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
const monthsGen = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'];
const wds = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

export function News() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selected, setSelected] = useState(null);

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
    setYear(now.getFullYear());
    setMonth(now.getMonth());
    setSelected(null);
  };

  return (
    <div className={styles.newsContainer}>
      <div className={styles.layout}>
        {/* АПЛ Табелл */}
        <aside className={styles.card}>
          <h2>Англійська Прем'єр-ліга</h2>
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
          <div className={styles.legend}>
            <span>
              <i style={{ background: 'var(--gold, #e8a317)' }}></i>Ліга чемпіонів
            </span>
            <span>
              <i style={{ background: '#c0392b' }}></i>Вильот
            </span>
          </div>
        </aside>

        {/* Навиnighten */}
        <main>
          <h1 className={styles.title}>
            Новини українського та світового футболу
            <small>
              {selected
                ? `Новини за ${selected.d} ${monthsGen[selected.m]} ${selected.y}`
                : 'Сьогодні'}
            </small>
          </h1>

          <article
            className={styles.hero}
            style={{ backgroundImage: `url('/foto/589228.jpg')` }}
          >
            <div className={styles.txt}>
              <div className={styles.d}>30 вересня 2026, 18:59</div>
              <h3>
                Долю півфіналу Кубка Перської затоки вирішив сліпий жереб: Оман
                проходить далі, залишивши Ірак за бортом
              </h3>
              <p>
                Абсолютна рівність за всіма показниками, включно з жовтими
                картками, змусила організаторів турніру визначати півфіналіста у
                кабінетах.
              </p>
            </div>
          </article>

          <div className={styles.item}>
            <div
              className={styles.thumb}
              style={{ backgroundImage: `url('/foto/novina 1.jpg')` }}
            ></div>
            <div>
              <div className={styles.meta}>
                <span>30 вересня 2026, 19:17</span>
                <span>Інше</span>
              </div>
              <h4>
                Футбольна асоціація звинуватила Арбелоа у неправомірних діях
                через критику суддів
              </h4>
              <p>
                Іспанський фахівець заявив, що арбітри не дозволять Манчестер
                Юнайтед програти, після того як команда Карріка вирвала нічию
                на останніх хвилинах матчу.
              </p>
            </div>
          </div>

          <div className={styles.item}>
            <div
              className={styles.thumb}
              style={{ backgroundImage: `url('/foto/novina 2.jpg')` }}
            ></div>
            <div>
              <div className={styles.meta}>
                <span>30 вересня 2026, 18:28</span>
                <span>Інше</span>
              </div>
              <h4>
                Ван Гекке травмувався в матчі за збірну та повертається до
                Тоттенгема
              </h4>
              <p>
                52-мільйонний новачок шпор зазнав пошкодження ноги у грі проти
                Сербії.
              </p>
            </div>
          </div>

          <div className={styles.item}>
            <div
              className={styles.thumb}
              style={{ backgroundImage: `url('/foto/novina 3.jpg')` }}
            ></div>
            <div>
              <div className={styles.meta}>
                <span>30 вересня 2026, 17:59</span>
                <span>Англія</span>
              </div>
              <h4>Смоллінг близький до підписання контракту з Порту</h4>
              <p>
                36-річний англійський ветеран веде активні переговори з
                лідером чемпіонату Португалії після того, як влітку залишив
                Саудівську Аравію.
              </p>
            </div>
          </div>

          <div className={styles.item}>
            <div
              className={styles.thumb}
              style={{ backgroundImage: `url('/foto/novina 4.png')` }}
            ></div>
            <div>
              <div className={styles.meta}>
                <span>30 вересня 2026, 17:55</span>
                <span>Португалія</span>
              </div>
              <h4>
                Президента Ботева Філіпова застрелили після матчу збірної
                Болгарії
              </h4>
              <p>
                53-річний бізнесмен загинув уночі у Пловдиві, правоохоронці
                розглядають усі можливі версії вбивства.
              </p>
            </div>
          </div>

          <div className={styles.item}>
            <div
              className={styles.thumb}
              style={{ backgroundImage: `url('/foto/novina 6.jpg')` }}
            ></div>
            <div>
              <div className={styles.meta}>
                <span>30 вересня 2026, 17:24</span>
                <span>Інше</span>
              </div>
              <h4>
                Бордо уникне ліквідації: французький клуб отримав нового
                власника
              </h4>
              <p>
                Англійський інвестиційний фонд Park Bench придбав клуб за
                символічний 1 євро та погодився на реструктуризацію його
                боргів.
              </p>
            </div>
          </div>

          <div className={styles.item}>
            <div
              className={styles.thumb}
              style={{ backgroundImage: `url('/foto/novina 7.jpg')` }}
            ></div>
            <div>
              <div className={styles.meta}>
                <span>30 вересня 2026, 17:18</span>
                <span>Франція</span>
              </div>
              <h4>
                Хорватія зіграє з Англією за порожніх трибун, але УЄФА зробив
                виняток для 100 британських фанатів
              </h4>
              <p>
                Через санкції проти хорватських уболівальників матч Ліги націй
                у Рієці пройде без місцевої публіки, проте делегація прихильників
                Трьох левів отримала право підтримати команду Томаса Тухеля.
              </p>
            </div>
          </div>

          <div className={styles.item}>
            <div
              className={styles.thumb}
              style={{ backgroundImage: `url('/foto/novina 8.jpg')` }}
            ></div>
            <div>
              <div className={styles.meta}>
                <span>30 вересня 2026, 17:00</span>
                <span>Інше</span>
              </div>
              <h4>Стало відомо, скільки Довбик заробляє в Болоньї</h4>
              <p>
                Український форвард увійшов до трійки найбільш високооплачуваних
                футболістів італійського клубу після переходу на правах оренди з
                Роми.
              </p>
            </div>
          </div>

          <div className={styles.item}>
            <div
              className={styles.thumb}
              style={{ backgroundImage: `url('/foto/novina 9.jpg')` }}
            ></div>
            <div>
              <div className={styles.meta}>
                <span>30 вересня 2026, 16:54</span>
                <span>Італія</span>
              </div>
              <h4>
                Гвардіола виступив із палкою заявою після визнання Манчестер
                Сіті винним у фінансових махінаціях
              </h4>
              <p>
                Колишній тренер містян висловив беззаперечну підтримку клубу,
                новому штабу та фанатам на тлі можливого позбавлення титулів і
                підготовки апеляції.
              </p>
            </div>
          </div>

          <div className={styles.item}>
            <div
              className={styles.thumb}
              style={{ backgroundImage: `url('/foto/novina 10.jpg')` }}
            ></div>
            <div>
              <div className={styles.meta}>
                <span>30 вересня 2026, 16:45</span>
                <span>Англія</span>
              </div>
              <h4>Шахтар зіграє з Кривбасом під час міжнародної перерви</h4>
              <p>Команди вирішили розім’ятись перед відновленням УПЛ.</p>
            </div>
          </div>
        </main>

        {/* Каленнер */}
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