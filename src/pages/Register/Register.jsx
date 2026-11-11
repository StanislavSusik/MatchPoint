import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Register.module.css';

export function Register() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [agree, setAgree] = useState(false);

  const [captchaCode, setCaptchaCode] = useState('');
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const generateCaptcha = useCallback(() => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptchaCode(code);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#f4efe0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 8; i++) {
      ctx.strokeStyle = `hsl(${Math.random() * 360}, 40%, 60%)`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    ctx.font = 'bold 28px Arial';
    ctx.textBaseline = 'middle';
    for (let i = 0; i < code.length; i++) {
      ctx.save();
      ctx.translate(14 + i * 30, 25 + (Math.random() * 10 - 5));
      ctx.rotate((Math.random() - 0.5) * 0.6);
      ctx.fillStyle = `hsl(${Math.random() * 360}, 60%, 32%)`;
      ctx.fillText(code[i], 0, 0);
      ctx.restore();
    }
  }, []);

  useEffect(() => {
    generateCaptcha();
  }, [generateCaptcha]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Вкажіть коректний e-mail';
      valid = false;
    }

    if (login.trim().length < 3) {
      newErrors.login = 'Логін має містити щонайменше 3 символи';
      valid = false;
    }

    if (password.length < 6) {
      newErrors.password = 'Пароль має містити щонайменше 6 символів';
      valid = false;
    }

    if (password2 !== password || !password2) {
      newErrors.password2 = 'Паролі не співпадають';
      valid = false;
    }

    if (captchaInput.trim() !== captchaCode) {
      newErrors.captcha = 'Символи введено неправильно';
      generateCaptcha();
      setCaptchaInput('');
      valid = false;
    }

    if (!agree) {
      newErrors.agree = 'Потрібно підтвердити угоду про конфіденційність';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1>Реєстрація на сайті</h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              placeholder="Вкажіть e-mail"
              autoComplete="email"
              value={email}
              className={errors.email ? styles.invalid : ''}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: '' }));
              }}
            />
            {errors.email && <small className={styles.error}>{errors.email}</small>}
          </div>

          <div className={styles.field}>
            <label htmlFor="login">Логін:</label>
            <input
              type="text"
              id="login"
              placeholder="Вкажіть логін"
              autoComplete="username"
              value={login}
              className={errors.login ? styles.invalid : ''}
              onChange={(e) => {
                setLogin(e.target.value);
                setErrors((prev) => ({ ...prev, login: '' }));
              }}
            />
            {errors.login && <small className={styles.error}>{errors.login}</small>}
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              placeholder="Пароль"
              autoComplete="new-password"
              value={password}
              className={errors.password ? styles.invalid : ''}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: '' }));
              }}
            />
            {errors.password && <small className={styles.error}>{errors.password}</small>}
          </div>

          <div className={styles.field}>
            <label htmlFor="password2">Повторіть пароль:</label>
            <input
              type="password"
              id="password2"
              placeholder="Повторіть пароль"
              autoComplete="new-password"
              value={password2}
              className={errors.password2 ? styles.invalid : ''}
              onChange={(e) => {
                setPassword2(e.target.value);
                setErrors((prev) => ({ ...prev, password2: '' }));
              }}
            />
            {errors.password2 && <small className={styles.error}>{errors.password2}</small>}
          </div>

          <div className={styles.field}>
            <label>Введіть символи з картинки:</label>
            <div className={styles.captcha}>
              <canvas ref={canvasRef} width="170" height="50" />
              <button
                type="button"
                className={styles.refresh}
                aria-label="Оновити картинку"
                onClick={generateCaptcha}
              >
                &#x21bb;
              </button>
            </div>
            <input
              type="text"
              placeholder="Символи з картинки"
              autoComplete="off"
              value={captchaInput}
              className={errors.captcha ? styles.invalid : ''}
              onChange={(e) => {
                setCaptchaInput(e.target.value);
                setErrors((prev) => ({ ...prev, captcha: '' }));
              }}
            />
            {errors.captcha && <small className={styles.error}>{errors.captcha}</small>}
          </div>

          <div className={`${styles.field} ${styles.fieldCheck}`}>
            <label className={styles.check}>
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => {
                  setAgree(e.target.checked);
                  setErrors((prev) => ({ ...prev, agree: '' }));
                }}
              />
              <span>
                Я підтверджую <Link to="/privacy">Угода про конфіденційність</Link>
              </span>
            </label>
            {errors.agree && <small className={styles.error}>{errors.agree}</small>}
          </div>

          <button type="submit" className={styles.btn}>
            Зареєструватися
          </button>

          {isSuccess && <p className={styles.success}>Реєстрація пройшла успішно!</p>}
        </form>

        <Link to="/login" className={styles.already}>
          Я вже зареєстрований, впустіть!
        </Link>
      </section>
    </main>
  );
}