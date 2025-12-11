// js/ui-mood.js

import { getAllMoodEntries, saveMoodEntry, clearMoodEntries } from './mood-storage.js';
import { getAdviceForMood, getActivityForMood, getDailyQuote } from './api-service.js';
import { renderCalendar, updateStatsPanel } from './ui-stats.js';

/**
 * Build the input object.
 */
function buildEntry({ mood, notes, advice, activity }) {
  const now = new Date();
  return {
    id: Date.now(),
    date: now.toISOString(), // full date
    mood,
    notes,
    advice,
    activity,
    weekday: now.toLocaleDateString('en-US', { weekday: 'long' }),
    month: now.getMonth(),
    year: now.getFullYear(),
    emoji: mood === 'positive' ? '😊' : mood === 'neutral' ? '😐' : '😔'
  };
}

/**
 * Initialize events
 */
export function initMoodUI() {
  const moodForm = document.querySelector('#mood-form');
  const adviceText = document.querySelector('#advice-text');
  const activityText = document.querySelector('#activity-text');
  const clearButton = document.querySelector('#clear-history');
  const quoteElement = document.querySelector('#daily-quote'); // optional if you add this in HTML

  // 1. Initial history load
  const initialEntries = getAllMoodEntries();
  renderCalendar(initialEntries);
  updateStatsPanel(initialEntries);

  // 2. Quote of the day
  if (quoteElement) {
    getDailyQuote().then((quote) => {
      quoteElement.textContent = quote;
    });
  }

  // 3. Form submission
  if (moodForm) {
    moodForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(moodForm);
      const mood = formData.get('mood');
      const notes = (formData.get('notes') || '').toString().trim();

      if (!mood) {
        alert('Please select how you feel today.');
        return;
      }

      try {
        const [advice, activity] = await Promise.all([
          getAdviceForMood(mood),
          getActivityForMood(mood)
        ]);

        if (adviceText) adviceText.textContent = advice;
        if (activityText) activityText.textContent = activity;

        const entry = buildEntry({ mood, notes, advice, activity });
        saveMoodEntry(entry);

        const updatedEntries = getAllMoodEntries();
        renderCalendar(updatedEntries, entry.id);
        updateStatsPanel(updatedEntries);

        moodForm.reset();
      } catch (error) {
        alert('There was a problem saving your mood. Please try again.');
      }
    });
  }

  // 4. Button to clear mood history (if added in HTML)
  if (clearButton) {
    clearButton.addEventListener('click', () => {
      const confirmClear = confirm('Are you sure you want to delete your entire emotional history?');
      if (!confirmClear) return;

      clearMoodEntries();
      renderCalendar([]);
      updateStatsPanel([]);
      if (adviceText) adviceText.textContent = 'A mood-based piece of advice will appear here.';
      if (activityText) activityText.textContent = 'An activity that may help you today will appear here.';
    });
  }
}

