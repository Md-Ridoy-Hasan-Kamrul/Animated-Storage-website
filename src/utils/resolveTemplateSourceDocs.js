import { parseSourceDocsFromPrompt } from './parseSourceDocsFromPrompt';
import { getSourceSkillForComponent } from '../data/sourceSkills';

export const SOURCE_DOC_TABS = Object.freeze([
  { id: 'usage', label: 'Usage' },
  { id: 'code', label: 'Code' },
  { id: 'skill', label: 'Skill.md' },
]);

export const SOURCE_DOC_EMPTY_MESSAGE = 'Not available for this card yet.';

const EFFECT_JS_SUFFIX = '.js';
const EFFECT_HTML_SUFFIX = '.html';
const EFFECTS_BASE = '/effects/';

function trimDoc(value) {
  return typeof value === 'string' ? value.trim() : '';
}

/**
 * Candidate URLs for the single Code source (not framework-specific).
 * @param {{ id?: string, codeUrl?: string }} template
 * @returns {string[]}
 */
export function buildCodeFetchCandidates(template) {
  if (!template) return [];
  if (template.codeUrl) return [trimDoc(template.codeUrl)].filter(Boolean);
  const id = trimDoc(template.id);
  if (!id) return [];
  return [
    `${EFFECTS_BASE}${id}${EFFECT_JS_SUFFIX}`,
    `${EFFECTS_BASE}${id}${EFFECT_HTML_SUFFIX}`,
  ];
}

/**
 * Sync resolution for Usage + Skill (+ inline Code override).
 * Code body may still load async via fetchCodeSource.
 * @param {object} template
 */
export function resolveTemplateSourceDocs(template) {
  if (!template) {
    return { usage: '', code: '', skill: '', componentName: '' };
  }

  const parsed = parseSourceDocsFromPrompt(template.fullPrompt || '');
  const componentName =
    trimDoc(template.componentName) || parsed.componentName;

  const usage = trimDoc(template.usage) || parsed.usage;
  const code = trimDoc(template.code) || parsed.code;
  const skill =
    trimDoc(template.skill) ||
    trimDoc(template.skillMd) ||
    parsed.skill ||
    getSourceSkillForComponent(componentName);

  return { usage, code, skill, componentName };
}

/**
 * Load the single Code source for a card (effect file or inline meta/prompt).
 * @param {object} template
 * @param {{ fetchImpl?: typeof fetch }} [options]
 * @returns {Promise<string>}
 */
export async function fetchCodeSource(template, { fetchImpl } = {}) {
  const resolved = resolveTemplateSourceDocs(template);
  if (resolved.code) return resolved.code;

  const fetchFn =
    fetchImpl || (typeof fetch === 'function' ? fetch.bind(globalThis) : null);
  if (!fetchFn) return '';

  const candidates = buildCodeFetchCandidates(template);
  for (const url of candidates) {
    try {
      const response = await fetchFn(url, { method: 'GET', cache: 'force-cache' });
      if (!response?.ok) continue;
      const text = trimDoc(await response.text());
      if (text) return text;
    } catch {
      // try next candidate
    }
  }
  return '';
}
