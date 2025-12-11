// js/mood-storage.js

const STORAGE_KEY = 'here-i-am-mood-entries';

/**
 * returns all entries saved in the additional local storage always returns an array even if it is empty
 */
export function getAllMoodEntries() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * In this part, a new state of mind is preserved. 
 */
export function saveMoodEntry(entry) {
  const current = getAllMoodEntries();
  current.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
}

/**
 * Delete all entries
 */
export function clearMoodEntries() {
  localStorage.removeItem(STORAGE_KEY);
}
