import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './Header.module.css';

export function Header() {
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem('mp-theme');
      if (saved) return saved === 'dark';
    } catch (e) {}
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    const themeName = isDark ? 'dark' : 'light';
    root.setAttribute('data-theme', themeName);
    try {
      localStorage.setItem('mp-theme', themeName);
    } catch (e) {}
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link to="/" className={styles.logo}>
          Match<b>Point</b>
        </Link>
        
        <nav aria-label="Основне меню" className={styles.nav}>
          <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>Головна</NavLink>
          <NavLink to="/news" className={({ isActive }) => isActive ? styles.active : ''}>Новини</NavLink>
          <NavLink to="/matches" className={({ isActive }) => isActive ? styles.active : ''}>Матчі та турніри</NavLink>
          <NavLink to="/video-foto" className={({ isActive }) => isActive ? styles.active : ''}>Відео та Фото</NavLink>
          <NavLink to="/tv" className={({ isActive }) => isActive ? styles.active : ''}>Футбол на ТБ</NavLink>
          <NavLink to="/forum" className={({ isActive }) => isActive ? styles.active : ''}>Обговорення</NavLink>
        </nav>

        <div className={styles.tools}>
          <button 
            id="theme" 
            type="button" 
            aria-label="Змінити тему"
            onClick={toggleTheme}
          >
            {isDark ? 'Світла тема' : 'Темна тема'}
          </button>
          <div className={styles.auth}>
            <Link to="/login">Увійти</Link>
            <Link to="/register">Реєстрація</Link>
          </div>
        </div>
      </div>
    </header>
  );
}