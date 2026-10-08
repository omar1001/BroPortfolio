// Runs in <head> before the first paint: applies the saved theme and the language so the
// page never flashes in the wrong colours or the wrong text direction.
(function () {
  var d = document.documentElement;
  var q = new URLSearchParams(location.search);
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage blocked */ } }

  var theme = get('bro.theme');
  if (theme === 'light' || theme === 'dark') d.setAttribute('data-theme', theme);

  var lang = q.get('lang');
  if (lang === 'ar' || lang === 'en') set('bro.lang', lang);
  else {
    lang = get('bro.lang');
    if (lang !== 'ar' && lang !== 'en') {
      var langs = navigator.languages || [navigator.language || 'en'];
      lang = langs.some(function (l) { return /^ar\b/i.test(l); }) ? 'ar' : 'en';
    }
  }
  d.lang = lang;
  d.dir = lang === 'ar' ? 'rtl' : 'ltr';
})();
