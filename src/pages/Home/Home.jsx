import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

export function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.teams}>
        <div className={styles.teamsIn}>
          <a className={styles.team} href="#" title="Полісся Ж.">
            <img src="/foto/polissaa-removebg-preview.png" alt="Полісся Ж." />
          </a>
          <a className={styles.team} href="#" title="Шахтар Д.">
            <img src="/foto/shaxtar.png" alt="Шахтар Д." />
          </a>
          <a className={styles.team} href="#" title="Карпати Л.">
            <img src="/foto/Емблема_ФК_Карпати_Львів-removebg-preview.png" alt="Карпати Л." />
          </a>
          <a className={styles.team} href="#" title="Динамо К.">
            <img src="/foto/dinamo.png" alt="Динамо К." />
          </a>
          <a className={styles.team} href="#" title="Харків">
            <img src="/foto/харків.png" alt="Харків" />
          </a>
          <a className={styles.team} href="#" title="Епіцентр">
            <img src="/foto/FC_Epicentr_logo_2025.png" alt="Епіцентр" />
          </a>
          <a className={styles.team} href="#" title="ЛНЗ Черкаси">
            <img src="/foto/lnz.png" alt="ЛНЗ Черкаси" />
          </a>
          <a className={styles.team} href="#" title="Зоря">
            <img src="/foto/FC_Zorya_Luhansk_logo.svg.png" alt="Зоря" />
          </a>
          <a className={styles.team} href="#" title="Лівий берег">
            <img src="/foto/Емблема_ФК_Лівий_берег.png" alt="Лівий берег" />
          </a>
          <a className={styles.team} href="#" title="Буковина">
            <img src="/foto/FC_Bukovyna_(2020).svg.png" alt="Буковина" />
          </a>
          <a className={styles.team} href="#" title="Верес">
            <img src="/foto/Емблема_РНК_Верес_2020.png" alt="Верес" />
          </a>
          <a className={styles.team} href="#" title="Чорноморець">
            <img src="/foto/chornomorec.png" alt="Чорноморець" />
          </a>
          <a className={styles.team} href="#" title="Колос">
            <img src="/foto/FCKolos2018.svg.png" alt="Колос" />
          </a>
          <a className={styles.team} href="#" title="Кривбас">
            <img src="/foto/qrivbas.png" alt="Кривбас" />
          </a>
          <a className={styles.team} href="#" title="Оболонь">
            <img src="/foto/FC_Obolon_Kyiv_logo_2020.png" alt="Оболонь" />
          </a>
          <a className={styles.team} href="#" title="Кудрівка">
            <img src="/foto/FC_Kudrivka_logo.png" alt="Кудрівка" />
          </a>
          <a className={styles.team} href="#" title="Минай">
            <img src="/foto/minai.png" alt="Минай" />
          </a>
          <a className={styles.team} href="#" title="Вікторія">
            <img src="/foto/FC_Viktoriya_Sumy_logo.png" alt="Вікторія" />
          </a>
          <a className={styles.team} href="#" title="Куликів-Білка">
            <img src="/foto/bilka.png" alt="Куликів-Білка" />
          </a>
        </div>
      </div>

      <main>
        <div className={styles.page}>
          <aside className={styles.card}>
            <h2>Прогнози</h2>
            <ul className={styles.menu}>
              <li><Link to="/ukraina" aria-current="true">Україна</Link></li>
              <li><Link to="/anglia">Англія</Link></li>
              <li><Link to="/ispania">Іспанія</Link></li>
              <li><Link to="/italia">Італія</Link></li>
              <li><Link to="/nimechina">Німеччина</Link></li>
              <li><Link to="/franchia">Франція</Link></li>
              <li><Link to="/niderland">Нідерланди</Link></li>
              <li><Link to="/ligacempion">Ліга чемпіонів</Link></li>
              <li><Link to="/ligaevropa">Ліга Європи</Link></li>
              <li><Link to="/ligaconferenc">Ліга конференцій</Link></li>
              <li><Link to="/footzal">Футзал</Link></li>
            </ul>
          </aside>

          <div className={`${styles.col} ${styles.center}`}>
            <section className={styles.hero}>
              <a 
                href="#" 
                className={styles.big}
                style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 20%, rgba(0,0,0,0.75) 100%), url('/foto/123.jpg')` }}
              >
                <span className={styles.meta}>30.09.2026</span>
                <h1>Футбол приплив? Розповідаємо, як в Англії щороку грають матч у річці</h1>
                <p>Хаос і Супермен в ролі арбітра.</p>
              </a>
              <div className={styles.card}>
                <h2>Головне за добу</h2>
                <ul className={styles.feed}>
                  <li><span className={styles.meta}>11:30</span><a href="#">Іспанія-Хорватія. Хто переможе?</a></li>
                  <li><span className={styles.meta}>10:50</span><a href="#">Англія-Чехія. Чай чи Пиво</a></li>
                  <li><span className={styles.meta}>09:40</span><a href="#">Швейцарія-Шотландія. Хто стане фаворитом?</a></li>
                </ul>
              </div>
            </section>

            <section className={styles.card}>
              <span className={styles.tag}>Інше, Чтиво</span>
              <ul className={styles.list}>
                <li><a href="#">Дубль Ямаля допоміг Іспанії розбити Хорватію</a></li>
                <li><a href="#">Раннє вилучення в складі Чехії допомогло Англії здобути першу перемогу в Лізі націй</a></li>
                <li><a href="#">Фанати Фінляндії освистали гімн Білорусі та вивісили банер із Лукашенком у вигляді таргана</a></li>
              </ul>
            </section>
          </div>

          <div className={styles.col}>
            <aside className={styles.card}>
              <h2>Актуальні сюжети</h2>
              <a className={styles.topic} href="#">
                <span className={styles.dot}></span>
                <span><b>Динамо в єврокубках</b> <span className={styles.meta}>1588 новин</span></span>
              </a>
              <a className={styles.topic} href="#">
                <span className={styles.dot}></span>
                <span><b>Коментарі тижня</b> <span className={styles.meta}>160 новин</span></span>
              </a>
              <a className={styles.topic} href="#">
                <span className={styles.dot}></span>
                <span><b>Наші відео</b> <span className={styles.meta}>319 новин</span></span>
              </a>
            </aside>

            <aside className={styles.card}>
              <h2>Відео</h2>
              <a href="#" className={styles.thumb} aria-label="Дивитися відео">
                <img src="/foto/Знімок екрана 2026-09-30 193343.png" alt="Іспанія — Хорватія 4:1" />
                <span className={styles.play}></span>
              </a>
              <span className={styles.meta}>30 вересня 2026</span>
              <a href="#" className={styles.videoTitle}>Іспанія — Хорватія 4:1 Відео голів та огляд матчу 29.09.2026</a>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}