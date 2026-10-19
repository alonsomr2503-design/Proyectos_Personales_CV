// Busca el perfil y sus repositorios en la API de GitHub
async function buscarPerfil() {
  var usuario = document.getElementById("input-usuario").value.trim();

  // Ocultar resultados anteriores
  document.getElementById("perfil").style.display = "none";
  document.getElementById("error").style.display  = "none";

  // Validar que no esté vacío
  if (usuario === "") {
    mostrarError("Escribe un nombre de usuario.");
    return;
  }

  document.getElementById("cargando").style.display = "block";

  // Llamada a la API — datos del usuario
  var respuestaUsuario = await fetch("https://api.github.com/users/" + usuario);

  if (!respuestaUsuario.ok) {
    document.getElementById("cargando").style.display = "none";
    mostrarError("Usuario no encontrado.");
    return;
  }

  var datosUsuario = await respuestaUsuario.json();

  // Llamada a la API — repositorios del usuario
  var respuestaRepos = await fetch("https://api.github.com/users/" + usuario + "/repos?per_page=10&sort=updated");
  var repos = await respuestaRepos.json();

  document.getElementById("cargando").style.display = "none";

  // Rellenar perfil
  document.getElementById("avatar").src         = datosUsuario.avatar_url;
  document.getElementById("nombre").textContent = datosUsuario.name || datosUsuario.login;
  document.getElementById("bio").textContent    = datosUsuario.bio  || "Sin bio";

  // Rellenar lista de repositorios
  var lista = document.getElementById("lista-repos");
  lista.innerHTML = ""; // limpiar lista anterior

  for (var i = 0; i < repos.length; i++) {
    var repo = repos[i];

    var li          = document.createElement("li");
    var enlace      = document.createElement("a");
    var descripcion = document.createElement("p");

    enlace.href        = repo.html_url;
    enlace.target      = "_blank";
    enlace.textContent = repo.name;

    descripcion.textContent = repo.description || "Sin descripción";

    li.appendChild(enlace);
    li.appendChild(descripcion);
    lista.appendChild(li);
  }

  document.getElementById("perfil").style.display = "block";
}

function mostrarError(mensaje) {
  var errorEl = document.getElementById("error");
  errorEl.textContent   = "⚠️ " + mensaje;
  errorEl.style.display = "block";
}
