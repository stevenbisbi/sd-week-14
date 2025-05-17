export async function fetchHoroscope(sign) {
  try {
    // construimos la URL completa
    const API_URL =
  `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${sign}&day=today`;
    const CORS_PROXY = "https://corsproxy.io/?";

    const zodiacEmojis = {
        aries: "🐏",         // Carnero
        taurus: "🐂",        // Toro
        gemini: "👯‍♂️",     // Gemelos
        cancer: "🦀",        // Cangrejo
        leo: "🦁",           // León
        virgo: "🌾",         // Trigo, símbolo de fertilidad y cosecha
        libra: "⚖️",         // Balanza
        scorpio: "🦂",       // Escorpión
        sagittarius: "🏹",   // Arco y flecha
        capricorn: "🐐",     // Cabra
        aquarius: "🌊",      // Agua, símbolo del portador de agua
        pisces: "🐟"         // Pez
    };



    const response = await fetch(`${CORS_PROXY}${API_URL}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const result = await response.json();
    const emoji = zodiacEmojis[sign.toLowerCase()];

    return {
      horoscope_data: result.data.horoscope_data,
      date: result.data.date,
      emoji: emoji
    };
  } catch (error) {
    console.error("Fetch error details:", error);
    return null;
  }
}