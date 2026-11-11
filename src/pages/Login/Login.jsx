import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Login.module.css';
import { useAuth } from '../../hooks/useAuth';

const CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
const LEN = 5;

function rnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function Login() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('');

  // Підключаємо наш кастомний хук авторизації
  const {
    login,
    errorMsg,
    badField,
    isSuccess,
    loading,
    countdown,
    clearError
  } = useAuth(navigate);

  const drawCaptcha = useCallback(() => {
    let code = '';
    for (let i = 0; i < LEN; i++) {
      code += CHARS.charAt(rnd(0, CHARS.length - 1));
    }
    setCaptchaCode(code);
    setCaptchaInput('');

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const W = 180;
    const H = 56;

    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Фон
    ctx.fillStyle = '#f3eedd';
    ctx.fillRect(0, 0, W, H);

    // Шум: лінії
    for (let i = 0; i < 7; i++) {
      ctx.strokeStyle = `hsla(${rnd(0, 360)}, 40%, 45%, 0.55)`;
      ctx.lineWidth = rnd(1, 2);
      ctx.beginPath();
      ctx.moveTo(rnd(0, W), rnd(0, H));
      ctx.bezierCurveTo(rnd(0, W), rnd(0, H), rnd(0, W), rnd(0, H), rnd(0, W), rnd(0, H));
      ctx.stroke();
    }

    // Символи
    const step = W / (LEN + 1);
    for (let j = 0; j < LEN; j++) {
      ctx.save();
      ctx.translate(step * (j + 1), H / 2 + rnd(-5, 5));
      ctx.rotate((rnd(-28, 28) * Math.PI) / 180);
      ctx.font = `bold ${rnd(28, 36)}px "Segoe UI", Arial, sans-serif`;
      ctx.fillStyle = `hsl(${rnd(0, 360)}, 55%, 28%)`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(code.charAt(j), 0, 0);
      ctx.restore();
    }

    // Шум: лінія поверх та крапки
    ctx.strokeStyle = 'rgba(18,36,29,0.45)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, rnd(10, H - 10));
    ctx.lineTo(W, rnd(10, H - 10));
    ctx.stroke();

    for (let k = 0; k < 60; k++) {
      ctx.fillStyle = `rgba(18,36,29,${(Math.random() * 0.5).toFixed(2)})`;
      ctx.fillRect(rnd(0, W), rnd(0, H), 2, 2);
    }
  }, []);

  useEffect(() => {
    drawCaptcha();
  }, [drawCaptcha]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password, captchaInput, captchaCode, drawCaptcha });
  };

  const isDisabled = loading || isSuccess;

  return (
    <main className={styles.mainContainer}>
      <form className={styles.card} onSubmit={handleSubmit} noValidate>
        <h1>Вхід на сайт</h1>

        <label htmlFor="email">E-mail:</label>
        <input
          id="email"
          type="email"
          className={badField === 'email' ? styles.bad : ''}
          placeholder="Вкажіть E-mail"
          autoComplete="email"
          value={email}
          disabled={isDisabled}
          onChange={(e) => {
            setEmail(e.target.value);
            clearError();
          }}
        />

        <label htmlFor="pass">Пароль:</label>
        <input
          id="pass"
          type="password"
          className={badField === 'pass' ? styles.bad : ''}
          placeholder="Вкажіть пароль"
          autoComplete="current-password"
          value={password}
          disabled={isDisabled}
          onChange={(e) => {
            setPassword(e.target.value);
            clearError();
          }}
        />

        <label htmlFor="answer">Введіть символи з картинки:</label>
        <div className={styles.captcha}>
          <canvas
            ref={canvasRef}
            width={180}
            height={56}
            role="img"
            aria-label="Капча: зображення з символами"
          />
          <button
            type="button"
            title="Показати інші символи"
            aria-label="Оновити капчу"
            disabled={isDisabled}
            onClick={drawCaptcha}
          >
            ⟳
          </button>
        </div>
        <input
          id="answer"
          type="text"
          className={badField === 'answer' ? styles.bad : ''}
          placeholder="Символи з картинки"
          autoComplete="off"
          autoCapitalize="characters"
          maxLength={5}
          value={captchaInput}
          disabled={isDisabled}
          onChange={(e) => {
            setCaptchaInput(e.target.value);
            clearError();
          }}
        />

        {errorMsg && (
          <div className={styles.err} role="alert" aria-live="polite">
            {errorMsg}
          </div>
        )}

        {isSuccess && (
          <div className={`${styles.err} ${styles.ok}`} role="alert" aria-live="polite">
            Вхід виконано! Перехід на головну через <b>{countdown}</b> с.{' '}
            <Link to="/">Перейти зараз</Link>
          </div>
        )}

        <button className={styles.btn} type="submit" disabled={isDisabled}>
          {loading ? 'Завантаження...' : 'Вхід'}
        </button>
      </form>
    </main>
  );
}