/**
 * Extract Usage / Code / Skill.md bodies from a stored fullPrompt markdown string.
 * Does not mutate the prompt — Copy full prompt stays byte-identical elsewhere.
 */

const USAGE_HEADING =
  /##\s*Current configured usage\b[^\n]*\n([\s\S]*?)(?=\n##\s|\n#\s|$)/i;
const SKILL_HEADING =
  /##\s*Skill(?:\.md)?\b[^\n]*\n([\s\S]*?)(?=\n##\s|\n#\s|$)/i;
const CODE_HEADING =
  /##\s*(?:Exact implementation source|Code|Canonical source)\b[^\n]*\n([\s\S]*?)(?=\n##\s|\n#\s|$)/i;
const COMPONENT_LINE = /Component:\s*`([^`]+)`/i;
const FENCE = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/;

function trimBody(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function firstFence(section) {
  if (!section) return '';
  const match = section.match(FENCE);
  return match ? trimBody(match[2]) : '';
}

/**
 * Prefer a TSX/JSX usage fence; fall back to the first fence in the Usage section.
 * @param {string} fullPrompt
 * @returns {string}
 */
export function extractUsageFromPrompt(fullPrompt) {
  const prompt = trimBody(fullPrompt);
  if (!prompt) return '';
  const sectionMatch = prompt.match(USAGE_HEADING);
  if (!sectionMatch) return '';
  const section = sectionMatch[1];
  const tsx = section.match(/```(?:tsx|jsx|typescript|javascript)?\n([\s\S]*?)```/i);
  if (tsx) return trimBody(tsx[1]);
  return firstFence(section);
}

/**
 * Inline code fence from an Exact implementation / Code section when present.
 * Large HTML sources are usually loaded via codeUrl / effects fetch instead.
 * @param {string} fullPrompt
 * @returns {string}
 */
export function extractInlineCodeFromPrompt(fullPrompt) {
  const prompt = trimBody(fullPrompt);
  if (!prompt) return '';
  const sectionMatch = prompt.match(CODE_HEADING);
  if (!sectionMatch) return '';
  const fenced = firstFence(sectionMatch[1]);
  if (fenced && fenced.length > 80) return fenced;
  return '';
}

/**
 * @param {string} fullPrompt
 * @returns {string}
 */
export function extractSkillFromPrompt(fullPrompt) {
  const prompt = trimBody(fullPrompt);
  if (!prompt) return '';
  const sectionMatch = prompt.match(SKILL_HEADING);
  if (!sectionMatch) return '';
  return trimBody(sectionMatch[1]);
}

/**
 * @param {string} fullPrompt
 * @returns {string}
 */
export function extractComponentNameFromPrompt(fullPrompt) {
  const match = trimBody(fullPrompt).match(COMPONENT_LINE);
  return match ? trimBody(match[1]) : '';
}

/**
 * @param {string} [fullPrompt]
 * @returns {{ usage: string, code: string, skill: string, componentName: string }}
 */
export function parseSourceDocsFromPrompt(fullPrompt = '') {
  return {
    usage: extractUsageFromPrompt(fullPrompt),
    code: extractInlineCodeFromPrompt(fullPrompt),
    skill: extractSkillFromPrompt(fullPrompt),
    componentName: extractComponentNameFromPrompt(fullPrompt),
  };
}
