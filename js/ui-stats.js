// js/ui-stats.js

import { calculateMoodScore, mostCommonMood } from './stats.js';

/**
 * Renderiza el calendario de estados de ánimo dentro de #mood-calendar.
 * highlightId permite marcar la entrada más reciente con una animación.
 */
export function renderCalendar(entries, highlightId = null) {
  const calendar = document.querySelector('#mood-calendar');
  if (!calendar) return;

  calendar.innerHTML = '';

  entries.forEach((entry) => {
    const day = document.createElement('div');
    day.classList.add('calendar-day', `mood-${entry.mood}`);

    // Contenido: día del mes
    const date = new Date(entry.date);
    day.textContent = String(date.getDate()).padStart(2, '0');

    // Tooltip con detalle
    day.title = `${date.toLocaleDateString()} — ${entry.mood.toUpperCase()}${
      entry.notes ? `\nNotas: ${entry.notes}` : ''
    }`;

    if (highlightId && entry.id === highlightId) {
      day.classList.add('new-entry');
      // quitar animación después de un momento
      setTimeout(() => {
        day.classList.remove('new-entry');
      }, 800);
    }

    calendar.appendChild(day);
  });
}

/**
 * Actualiza los contadores de días totales/positivos/negativos/etc.
 * y estadísticas avanzadas opcionales.
 */
export function updateStatsPanel(entries) {
  const totalSpan = document.querySelector('#total-days');
  const posSpan = document.querySelector('#positive-days');
  const neuSpan = document.querySelector('#neutral-days');
  const negSpan = document.querySelector('#negative-days');

  const total = entries.length;
  const positive = entries.filter((e) => e.mood === 'positive').length;
  const neutral = entries.filter((e) => e.mood === 'neutral').length;
  const negative = entries.filter((e) => e.mood === 'negative').length;

  if (totalSpan) totalSpan.textContent = total;
  if (posSpan) posSpan.textContent = positive;
  if (neuSpan) neuSpan.textContent = neutral;
  if (negSpan) negSpan.textContent = negative;

  // Estadísticas avanzadas (solo si agregas elementos en el HTML)
  const scoreSpan = document.querySelector('#mood-score');
  const commonSpan = document.querySelector('#common-mood');

  if (scoreSpan) {
    scoreSpan.textContent = calculateMoodScore(entries);
  }

  if (commonSpan) {
    commonSpan.textContent = mostCommonMood(entries);
  }
}
