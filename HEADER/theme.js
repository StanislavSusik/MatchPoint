// Перемикач світлої/темної теми. Підключається на всіх сторінках.
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
