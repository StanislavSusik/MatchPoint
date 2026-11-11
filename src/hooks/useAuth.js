import { useState, useEffect } from 'react';

const DELAY = 5;

const fakeFetchLogin = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'fail@example.com') {
        reject(new Error('Невірний e-mail або пароль.'));
      } else {
        resolve({
          ok: true,
          json: async () => ({
            token: 'fake-jwt-token-12345',
            user: { email }
          })
        });
      }
    }, 600);
  });
};

const fakeFetchRegister = async (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ok: true,
        json: async () => ({
          message: 'Користувача успішно зареєстровано',
          user: { email: userData.email, login: userData.login }
        })
      });
    }, 800);
  });
};

export function useAuth(navigate) {
  const [errorMsg, setErrorMsg] = useState('');
  const [badField, setBadField] = useState('');
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(DELAY);

  // Автоматичний зворотний відлік для сторінки входу
  useEffect(() => {
    let timer;
    if (isSuccess && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (isSuccess && countdown === 0 && navigate) {
      navigate('/');
    }
    return () => clearInterval(timer);
  }, [isSuccess, countdown, navigate]);

  const clearError = () => {
    setErrorMsg('');
    setBadField('');
    setErrors({});
  };

  // Метод входу
  const login = async ({ email, password, captchaInput, captchaCode, drawCaptcha }) => {
    const mail = email.trim();
    const pwd = password;
    const cap = captchaInput.trim().toUpperCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail)) {
      setErrorMsg('Вкажіть коректний E-mail, наприклад name@example.com.');
      setBadField('email');
      return false;
    }
    if (pwd.length < 6) {
      setErrorMsg('Пароль має містити щонайменше 6 символів.');
      setBadField('pass');
      return false;
    }
    if (!cap) {
      setErrorMsg('Введіть символи з картинки.');
      setBadField('answer');
      return false;
    }
    if (cap !== captchaCode) {
      drawCaptcha();
      setErrorMsg('Символи введено неправильно. Спробуйте з новою картинкою.');
      setBadField('answer');
      return false;
    }

    setLoading(true);
    try {
      const response = await fakeFetchLogin(mail, pwd);
      const data = await response.json();

      localStorage.setItem('mp-user', data.user.email);
      localStorage.setItem('mp-token', data.token);

      clearError();
      setIsSuccess(true);
      return true;
    } catch (err) {
      setErrorMsg(err.message || 'Помилка при вході на сайт.');
      setBadField('email');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Метод реєстрації
  const register = async ({ email, login, password, password2, captchaInput, captchaCode, agree, generateCaptcha, setCaptchaInput }) => {
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

    if (!valid) return false;

    setLoading(true);
    try {
      const response = await fakeFetchRegister({ email, login, password });
      await response.json();

      setIsSuccess(true);
      setTimeout(() => {
        if (navigate) navigate('/login');
      }, 1500);
      return true;
    } catch (err) {
      setErrors({ global: err.message || 'Помилка під час реєстрації' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    register,
    errorMsg,
    badField,
    errors,
    setErrors,
    isSuccess,
    loading,
    countdown,
    clearError
  };
}