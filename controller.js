import { fetchHoroscope } from "./model.js";
import {
  disableButton,
  enableButton,
  clearView,
  renderHoroscope,
  renderError,
  fadeOut,
} from "./view.js";

let hideTimeout;

function getZodiacSign(dateString) {
  const [dayStr, monthStr, _] = dateString.split('-');
  const day = parseInt(dayStr, 10);
  const month = parseInt(monthStr, 10);

  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces";
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";

  return "Invalid date";
}


async function showAdvice() {
  disableButton();
  clearTimeout(hideTimeout);
  clearView();

  const birthDate = document.getElementById("birthDate").value;
  const sign = getZodiacSign(birthDate);
  const data = await fetchHoroscope(sign);

  if (!data) {
    renderError();
    hideTimeout = setTimeout(() => {
      clearView();
      enableButton();
    }, 5000);
    return;
  }

  renderHoroscope(data);
  // fade-out a los 5s
  hideTimeout = setTimeout(fadeOut, 5000);
  // limpiar y reactivar botón al cumplir 6s
  setTimeout(() => {
    clearView();
    enableButton();
  }, 15000);
}

document.getElementById("horoscopeForm").addEventListener("submit", (e) => {
  e.preventDefault(); // evita que recargue
  showAdvice();       // ejecuta tu lógica
});


const birthDateInput = document.getElementById("birthDate");
const dateError = document.getElementById("dateError");

function isValidDateFormat(dateString) {
  // Regex para DD-MM-AAAA
  const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
  return regex.test(dateString);
}

birthDateInput.addEventListener("input", () => {
  const date = birthDateInput.value;
  if (isValidDateFormat(date)) {
    enableButton();
    dateError.textContent = "";
    dateError.style.display = "none";
  } else {
    disableButton();
    dateError.textContent = "Formato inválido. Usa DD-MM-AAAA";
    dateError.style.display = "block";
  }
});
