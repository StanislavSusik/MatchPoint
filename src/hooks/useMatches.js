import { useState, useEffect } from 'react';

const MOCK_MATCHES = [
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

export function useMatches(dateStr, selectedTournament) {
  const [dayMatches, setDayMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    // Імітація fetch(`/api/matches?date=${dateStr}`)
    const timer = setTimeout(() => {
      if (isMounted) {
        const filtered = MOCK_MATCHES.filter(m => m.d === dateStr);
        setDayMatches(filtered);
        setLoading(false);
      }
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [dateStr]);

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

  return { groups, availableTournaments, loading, error };
}