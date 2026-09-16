import { COUNTRY_LABELS, SOURCE_URL, TOWER_COUNTRIES, VARIANT_BACKGROUND } from './constants';

export function resolveTowerCountry(country) {
  return TOWER_COUNTRIES.includes(country) ? country : 'vietnam';
}

export function resolveFrameSource(country, documentSrc) {
  const base = documentSrc || SOURCE_URL;
  const hashIndex = base.indexOf('#');
  const path = hashIndex >= 0 ? base.slice(0, hashIndex) : base;
  const hash = hashIndex >= 0 ? base.slice(hashIndex) : '';
  const safeCountry = resolveTowerCountry(country);
  return `${path}${path.includes('?') ? '&' : '?'}country=${safeCountry}${hash}`;
}

export function resolveSceneChrome(country) {
  const safeCountry = resolveTowerCountry(country);
  return {
    label: `${COUNTRY_LABELS[safeCountry]} in a procedural landscape`,
    background: VARIANT_BACKGROUND,
    source: SOURCE_URL,
    country: safeCountry,
  };
}
