/* ===== 1. Перемикання теми ===== */
const root = document.documentElement;
const themeBtn = document.getElementById("themeToggle");

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  // Кнопка показує тему, на яку можна перемкнутись
  themeBtn.textContent = theme === "dark" ? "Світла тема" : "Темна тема";
  try { localStorage.setItem("theme", theme); } catch (e) {}
}

let savedTheme = "dark";
try { savedTheme = localStorage.getItem("theme") || "dark"; } catch (e) {}
applyTheme(savedTheme);

themeBtn.addEventListener("click", () => {
  applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
});

/* ===== 2. "Я вже зареєстрований" -> сторінка входу ===== */
document.getElementById("alreadyLink").addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "login.html";
});

/* ===== 3. Капча ===== */
const canvas = document.getElementById("captchaCanvas");
const ctx = canvas.getContext("2d");
let captchaCode = "";

function generateCaptcha() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  captchaCode = "";
  for (let i = 0; i < 5; i++) {
    captchaCode += chars[Math.floor(Math.random() * chars.length)];
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#f4efe0";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Лінії-шум
  for (let i = 0; i < 8; i++) {
    ctx.strokeStyle = `hsl(${Math.random() * 360}, 40%, 60%)`;
    ctx.beginPath();
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.stroke();
  }

  // Символи
  ctx.font = "bold 28px Arial";
  ctx.textBaseline = "middle";
  for (let i = 0; i < captchaCode.length; i++) {
    ctx.save();
    ctx.translate(14 + i * 30, 25 + (Math.random() * 10 - 5));
    ctx.rotate((Math.random() - 0.5) * 0.6);
    ctx.fillStyle = `hsl(${Math.random() * 360}, 60%, 32%)`;
    ctx.fillText(captchaCode[i], 0, 0);
    ctx.restore();
  }
}

generateCaptcha();
document.getElementById("captchaRefresh").addEventListener("click", generateCaptcha);

/* ===== 4. Валідація форми ===== */
const form = document.getElementById("registerForm");

function setError(id, message) {
  document.getElementById(id + "Error").textContent = message;
  const input = document.getElementById(id);
  if (input) input.classList.toggle("invalid", Boolean(message));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;

  const email = document.getElementById("email").value.trim();
  const login = document.getElementById("login").value.trim();
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("password2").value;
  const captcha = document.getElementById("captchaInput").value.trim();
  const agree = document.getElementById("agree").checked;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError("email", "Вкажіть коректний e-mail"); valid = false;
  } else setError("email", "");

  if (login.length < 3) {
    setError("login", "Логін має містити щонайменше 3 символи"); valid = false;
  } else setError("login", "");

  if (password.length < 6) {
    setError("password", "Пароль має містити щонайменше 6 символів"); valid = false;
  } else setError("password", "");

  if (password2 !== password || !password2) {
    setError("password2", "Паролі не співпадають"); valid = false;
  } else setError("password2", "");

  if (captcha !== captchaCode) {
    setError("captcha", "Символи введено неправильно");
    document.getElementById("captchaInput").classList.add("invalid");
    generateCaptcha();
    valid = false;
  } else {
    setError("captcha", "");
    document.getElementById("captchaInput").classList.remove("invalid");
  }

  document.getElementById("agreeError").textContent = agree
    ? "" : "Потрібно підтвердити угоду про конфіденційність";
  if (!agree) valid = false;

  if (valid) {
    document.getElementById("successMsg").hidden = false;
    // Тут можна відправити дані на сервер (fetch/AJAX).
    setTimeout(() => { window.location.href = "login.html"; }, 1500);
  }
});