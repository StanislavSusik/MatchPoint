(function () {
  var root = document.documentElement;
  var btn = document.getElementById('theme');

  // Згадуємо вибір користувача з минулого візиту
  try {
    var saved = localStorage.getItem('mp-theme');
    if (saved) root.setAttribute('data-theme', saved);
  } catch (e) {}

  function isDark() {
    var t = root.getAttribute('data-theme');
    return t ? t === 'dark' : matchMedia('(prefers-color-scheme:dark)').matches;
  }
  function label() {
    if (btn) btn.textContent = isDark() ? 'Світла тема' : 'Темна тема';
  }

  if (btn) {
    btn.addEventListener('click', function () {
      var next = isDark() ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('mp-theme', next); } catch (e) {}
      label();
    });
  }
  label();
})();


(function () {
  var HOME_URL = 'index.html';   // куди перекидати після входу
  var DELAY = 5;                 // секунд до переходу

  var form = document.getElementById('form');
  var email = document.getElementById('email');
  var pass = document.getElementById('pass');
  var answer = document.getElementById('answer');
  var err = document.getElementById('err');
  var submit = document.getElementById('submit');
  var refresh = document.getElementById('refresh');
  var canvas = document.getElementById('captcha');
  var ctx = canvas.getContext('2d');

  /* ===== КАПЧА ===== */
  // без схожих символів: 0/O, 1/I/L
  var CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  var LEN = 5;
  var code = '';

  function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function makeCode() {
    var s = '';
    for (var i = 0; i < LEN; i++) s += CHARS.charAt(rnd(0, CHARS.length - 1));
    return s;
  }

  function drawCaptcha() {
    code = makeCode();

    // чітка картинка на екранах з високою щільністю
    var dpr = window.devicePixelRatio || 1;
    var W = 180, H = 56;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // фон
    ctx.fillStyle = '#f3eedd';
    ctx.fillRect(0, 0, W, H);

    // шум: лінії
    for (var i = 0; i < 7; i++) {
      ctx.strokeStyle = 'hsla(' + rnd(0, 360) + ',40%,45%,0.55)';
      ctx.lineWidth = rnd(1, 2);
      ctx.beginPath();
      ctx.moveTo(rnd(0, W), rnd(0, H));
      ctx.bezierCurveTo(rnd(0, W), rnd(0, H), rnd(0, W), rnd(0, H), rnd(0, W), rnd(0, H));
      ctx.stroke();
    }

    // символи: різний нахил, розмір, зсув, колір
    var step = W / (LEN + 1);
    for (var j = 0; j < LEN; j++) {
      ctx.save();
      ctx.translate(step * (j + 1), H / 2 + rnd(-5, 5));
      ctx.rotate((rnd(-28, 28) * Math.PI) / 180);
      ctx.font = 'bold ' + rnd(28, 36) + 'px "Segoe UI", Arial, sans-serif';
      ctx.fillStyle = 'hsl(' + rnd(0, 360) + ',55%,28%)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(code.charAt(j), 0, 0);
      ctx.restore();
    }

    // шум: лінія поверх тексту та крапки
    ctx.strokeStyle = 'rgba(18,36,29,0.45)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, rnd(10, H - 10));
    ctx.lineTo(W, rnd(10, H - 10));
    ctx.stroke();

    for (var k = 0; k < 60; k++) {
      ctx.fillStyle = 'rgba(18,36,29,' + (Math.random() * 0.5).toFixed(2) + ')';
      ctx.fillRect(rnd(0, W), rnd(0, H), 2, 2);
    }

    answer.value = '';
  }

  /* ===== ПОВІДОМЛЕННЯ ===== */
  function showError(msg, field) {
    err.className = 'err';
    err.textContent = msg;
    err.style.display = 'block';
    [email, pass, answer].forEach(function (el) { el.classList.remove('bad'); });
    if (field) {
      field.classList.add('bad');
      field.focus();
    }
  }

  function clearError() {
    err.style.display = 'none';
    [email, pass, answer].forEach(function (el) { el.classList.remove('bad'); });
  }

  /* ===== УСПІХ: відлік і перехід ===== */
  function startRedirect() {
    [email, pass, answer, submit, refresh].forEach(function (el) { el.disabled = true; });

    var left = DELAY;
    err.className = 'err ok';
    err.style.display = 'block';

    function tick() {
      err.innerHTML = 'Вхід виконано! Перехід на головну через <b>' + left +
        '</b> с. <a href="' + HOME_URL + '">Перейти зараз</a>';
    }
    tick();

    var timer = setInterval(function () {
      left--;
      if (left <= 0) {
        clearInterval(timer);
        window.location.href = HOME_URL;
      } else {
        tick();
      }
    }, 1000);
  }

  /* ===== ПЕРЕВІРКА ФОРМИ ===== */
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var mail = email.value.trim();
    var pwd = pass.value;
    var cap = answer.value.trim().toUpperCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail)) {
      return showError('Вкажіть коректний E-mail, наприклад name@example.com.', email);
    }
    if (pwd.length < 6) {
      return showError('Пароль має містити щонайменше 6 символів.', pass);
    }
    if (!cap) {
      return showError('Введіть символи з картинки.', answer);
    }
    if (cap !== code) {
      drawCaptcha();
      return showError('Символи введено неправильно. Спробуйте з новою картинкою.', answer);
    }

    // Тут має бути запит на сервер для перевірки пароля.
    // Поки що вважаємо, що дані прийняті.
    try { localStorage.setItem('mp-user', mail); } catch (x) {}
    startRedirect();
  });

  [email, pass, answer].forEach(function (el) {
    el.addEventListener('input', clearError);
  });
  refresh.addEventListener('click', function () {
    drawCaptcha();
    answer.focus();
  });

  drawCaptcha();
})();