// view.js
const container = document.getElementById("horoscope-container");
const button = document.getElementById("get-horoscope");

export function disableButton() {
  button.disabled = true;
}

export function enableButton() {
  button.disabled = false;
}

export function clearView() {
  container.innerHTML = "";
  container.classList.remove("visible", "fade-out");
}

export function renderHoroscope({ horoscope_data, date, emoji}) {
  container.innerHTML = `
    <p>"${horoscope_data}"</p>
    <p>"${date}"</p>
    <p>"${emoji}"</p>
  `;
  container.classList.remove("fade-out");
  container.classList.add("visible");
}

export function renderError() {
  container.textContent =
    "Error al obtener el consejo. Mira la consola para detalles.";
  container.classList.add("visible");
}

export function fadeOut() {
  container.classList.add("fade-out");
}