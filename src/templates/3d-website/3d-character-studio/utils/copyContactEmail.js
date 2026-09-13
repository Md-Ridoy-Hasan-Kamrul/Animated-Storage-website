import { CONTACT_EMAIL } from '../constants';

export async function copyContactEmail(email = CONTACT_EMAIL) {
  if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
    throw new Error('Clipboard unavailable');
  }
  await navigator.clipboard.writeText(email);
}
