/**
 * 🔑 generateReferralCode – Creates a referral code from full name
 * Format: [AllInitials][4-digit random number] → e.g., "ABDT1234"
 */
export function generateReferralCode(name) {
  if (!name) return 'USER0000';

  const initials = name
    .trim()
    .split(/\s+/)
    .map(word => word[0].toUpperCase())
    .join('');

  const randomDigits = Math.floor(1000 + Math.random() * 9000);

  return `${initials}${randomDigits}`;
}
