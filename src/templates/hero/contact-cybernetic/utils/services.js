export function toggleService(selected, option) {
  return selected.includes(option)
    ? selected.filter((item) => item !== option)
    : [...selected, option];
}

export function readyMessage(prefix, selected) {
  return `${prefix} ${selected.join(', ')}`;
}
