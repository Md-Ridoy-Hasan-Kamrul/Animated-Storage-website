import { NAV_SEPARATOR } from '../constants';

export function withNavSeparators(links, separator = NAV_SEPARATOR) {
  return links.map((link, index) => ({
    ...link,
    prefix: index === 0 ? '' : separator,
  }));
}
