import { useState, useEffect } from 'react';

const rawTeams = [
  ['Арсенал', 6, 1, 0], ['Ліверпуль', 5, 1, 1], ['Манчестер Сіті', 5, 1, 1], ['Челсі', 4, 2, 1],
  ['Тоттенгем', 4, 1, 2], ['Ньюкасл', 4, 1, 2], ['Астон Вілла', 3, 3, 1], ['Манчестер Юнайтед', 3, 2, 2],
  ['Брайтон', 3, 2, 2], ['Брентфорд', 3, 1, 3], ['Ноттінгем Форест', 2, 3, 2], ['Фулгем', 2, 3, 2],
  ['Вест Гем', 2, 2, 3], ['Борнмут', 2, 2, 3], ['Крістал Пелас', 2, 1, 4], ['Евертон', 1, 3, 3],
  ['Вулвергемптон', 1, 2, 4], ['Лідс', 1, 2, 4], ['Бернлі', 0, 3, 4], ['Сандерленд', 0, 2, 5]
];

export function useStandings() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const computedTeams = rawTeams
      .map(([n, w, d, l]) => ({ n, w, d, l, g: w + d + l, p: w * 3 + d }))
      .sort((a, b) => b.p - a.p || b.w - a.w);

    setTeams(computedTeams);
    setLoading(false);
  }, []);

  return { teams, loading };
}