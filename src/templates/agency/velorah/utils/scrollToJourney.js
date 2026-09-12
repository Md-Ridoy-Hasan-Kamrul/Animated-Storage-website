const JOURNEY_TARGET_ID = 'reach-us';

export function scrollToJourney() {
  const reach = document.getElementById(JOURNEY_TARGET_ID);
  if (reach) {
    reach.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }
  window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
}
