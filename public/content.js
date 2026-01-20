const container = document.getElementById("content");

function loading() {
  container.innerHTML = "<p class='loading'>Cargando…</p>";
}

function error() {
  container.innerHTML = "<p class='error'>Error al cargar contenido</p>";
}

async function loadContent(lang = "es") {
  loading();
  try {
    const res = await fetch(`/content?lang=${lang}`);
    const data = await res.json();
    container.innerHTML = "";
    data.forEach(item => {
      container.innerHTML += `
        <article>
          <h2>${item.title}</h2>
          <p>${item.body}</p>
        </article>
      `;
    });
  } catch {
    error();
  }
}

document.addEventListener("DOMContentLoaded", () => loadContent());
