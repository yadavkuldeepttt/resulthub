import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function calculatePopularityScore(game, maxValues) {
  return (
    0.3 * (game.playersYesterday / maxValues.maxDailyPlayers) +
    0.2 * (game.currentPlayers / maxValues.maxConcurrentPlayers) +
    0.25 * (game.upvotes / maxValues.maxUpvotes) +
    0.15 * (game.maxSessionLength / maxValues.maxSessionLength) +
    0.1 * (game.sessionsYesterday / maxValues.maxDailySessions)
  ).toFixed(3);
}