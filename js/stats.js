// js/stats.js

/**
 * Filter entries
 */
export function filterByMonth(entries, month) {
  return entries.filter((e) => {
    const d = new Date(e.date);
    return d.getMonth() === month;
  });
}

/**
 * Calculate an average mood score
 * positive = 1, neutral = 0, negative = -1
 */
export function calculateMoodScore(entries) {
  if (!entries.length) return '0.00';
  const scoreMap = { positive: 1, neutral: 0, negative: -1 };
  const total = entries.reduce((acc, e) => acc + (scoreMap[e.mood] || 0), 0);
  return (total / entries.length).toFixed(2);
}

/**
 * Returns the most frequent mood
 */
export function mostCommonMood(entries) {
  if (!entries.length) return 'N/A';
  const freq = {};
  entries.forEach((e) => {
    freq[e.mood] = (freq[e.mood] || 0) + 1;
  });
  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  return sorted[0][0];
}
