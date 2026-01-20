const selector = document.getElementById("language-selector");

function getLang() {
  return localStorage.getItem("lang") || "es";
}

function setLang(lang) {
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang;
  loadContent(lang);
}

document.addEventListener("DOMContentLoaded", () => {
  const lang = getLang();
  selector.value = lang;
  setLang(lang);

  selector.addEventListener("change", e => {
    setLang(e.target.value);
  });
});
