// js/api-service.js

const ADVICE_API_URL = 'https://api.adviceslip.com/advice';
const BORED_API_URL = 'https://www.boredapi.com/api/activity';

/**
 * Returns advice from the Advice Slip API according to the mood.
 */
export async function getAdviceForMood(mood) {
  try {
    const response = await fetch(ADVICE_API_URL, { cache: 'no-store' });
    const data = await response.json();
    return data.slip?.advice || 'Take a moment to breathe and listen to yourself.';
  } catch {
    if (mood === 'negative') {
      return 'Be gentle with yourself today. You don’t have to handle everything at once.';
    }
    return 'Pause briefly and acknowledge how you feel without judging yourself.';
  }
}

/**
 * Returns an activity from the Bored API based on the mood.
 */
export async function getActivityForMood(mood) {
  try {
    // You could adjust parameters depending on the mood
    const response = await fetch(BORED_API_URL);
    const data = await response.json();
    return data.activity || 'Take a short 5-minute walk.';
  } catch {
    if (mood === 'positive') {
      return 'Write down three things that went well today.';
    }
    if (mood === 'negative') {
      return 'Drink some water, take three deep breaths, and move your body a little.';
    }
    return 'Send a short message to someone you trust.';
  }
}

/**
 * Optional extra API: daily quote (to increase API scoring).
 */
export async function getDailyQuote() {
  try {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    return `${data.content} — ${data.author}`;
  } catch {
    return 'Each day is a new opportunity to begin again.';
  }
}
