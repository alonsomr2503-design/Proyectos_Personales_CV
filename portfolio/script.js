// ================================
// DATOS — Estudios iniciales
// ================================

const estudios = [
  {
    icono: "🎓",
    titulo: "Técnico Superior en Desarrollo de Aplicaciones Web (DAW)",
    centro: "IES Juan Bosco",
    fecha: "2025 – 2026 (en curso)",
  },
  {
    icono: "📚",
    titulo: "Bachillerato General",
    centro: "IES Hermogenes",
    fecha: "2022 – 2024",
  },
  {
    icono: "🌐",
    titulo: "Inglés Práctico",
    centro: "",
    fecha: "",
  },
];


// ================================
// RENDER — Crea un elemento estudio en el DOM
// ================================

function crearEstudioElemento(estudio) {
  const item = document.createElement("div");
  item.classList.add("estudio-item");

  item.innerHTML = `
    <div class="estudio-icon" aria-hidden="true">${estudio.icono}</div>
    <div class="estudio-info">
      <h3>${estudio.titulo}</h3>
      ${estudio.centro ? `<p class="centro">${estudio.centro}</p>` : ""}
      ${estudio.fecha ? `<time class="fecha">${estudio.fecha}</time>` : ""}
    </div>
  `;

  return item;
}


// ================================
// RENDER — Pinta todos los estudios en el contenedor
// ================================

function renderizarEstudios() {
  const contenedor = document.getElementById("lista-estudios");
  contenedor.innerHTML = "";

  estudios.forEach((estudio) => {
    const elemento = crearEstudioElemento(estudio);
    contenedor.appendChild(elemento);
  });
}


// ================================
// FORM — Recoge los valores del formulario
// ================================

function obtenerDatosFormulario() {
  return {
    icono: document.getElementById("form-icono").value.trim() || "📖",
    titulo: document.getElementById("form-titulo").value.trim(),
    centro: document.getElementById("form-centro").value.trim(),
    fecha: document.getElementById("form-fecha").value.trim(),
  };
}


// ================================
// FORM — Limpia los campos tras añadir
// ================================

function limpiarFormulario() {
  document.getElementById("form-icono").value = "";
  document.getElementById("form-titulo").value = "";
  document.getElementById("form-centro").value = "";
  document.getElementById("form-fecha").value = "";
}


// ================================
// FORM — Valida que el campo obligatorio no esté vacío
// ================================

function esFormularioValido(datos) {
  return datos.titulo.length > 0;
}


// ================================
// ACCIÓN — Añade un nuevo estudio
// ================================

function agregarEstudio(evento) {
  evento.preventDefault();

  const datos = obtenerDatosFormulario();

  if (!esFormularioValido(datos)) {
    mostrarError("El título del estudio es obligatorio.");
    return;
  }

  estudios.push(datos);
  renderizarEstudios();
  limpiarFormulario();
  ocultarError();
}


// ================================
// UI — Muestra u oculta el mensaje de error
// ================================

function mostrarError(mensaje) {
  const error = document.getElementById("form-error");
  error.textContent = mensaje;
  error.hidden = false;
}

function ocultarError() {
  const error = document.getElementById("form-error");
  error.hidden = true;
}


// ================================
// INIT — Arranque de la aplicación
// ================================

function init() {
  renderizarEstudios();

  const formulario = document.getElementById("form-nuevo-estudio");
  formulario.addEventListener("submit", agregarEstudio);
}

document.addEventListener("DOMContentLoaded", init);


// ================================
// TEMA CLARO / OSCURO
// ================================

const toggleBtn = document.getElementById("themeToggle");

// Cargar tema guardado en localStorage al iniciar
const savedTheme = localStorage.getItem("tema");
if (savedTheme === "light") {
  document.body.classList.add("light");
  toggleBtn.textContent = "☀️";
}

// Cambiar tema al hacer clic
toggleBtn.addEventListener("click", () => {
  const isLight = document.body.classList.toggle("light");
  if (isLight) {
    toggleBtn.textContent = "☀️";
    localStorage.setItem("tema", "light");
  } else {
    toggleBtn.textContent = "🌙";
    localStorage.setItem("tema", "dark");
  }
});
