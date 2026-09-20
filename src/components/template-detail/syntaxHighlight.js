/**
 * ThreeUI-style sweet colorful tokens for Usage / Code / Skill.md panels.
 * Copy always uses the raw source string — spans are display-only.
 */

export const SYNTAX_COLORS = Object.freeze({
  base: '#e6edf3',
  keyword: '#ff7b72',
  keywordAlt: '#d2a8ff',
  string: '#a5d6ff',
  stringAlt: '#7ee787',
  tag: '#7ee787',
  attr: '#ffA657',
  number: '#79c0ff',
  punct: '#c9d1d9',
  comment: '#8b949e',
  function: '#d2a8ff',
  className: '#ffa657',
  heading: '#ff7b72',
  mdStrong: '#ffa657',
  mdCode: '#7ee787',
  mdLink: '#79c0ff',
  plain: '#e6edf3',
});

/** Palette tuned to ThreeUI docs (image 2): purple keywords, lime strings, peach props. */
export const THREEUI_SYNTAX_COLORS = Object.freeze({
  base: '#e8eaed',
  keyword: '#c792ea',
  identifier: '#82aaff',
  string: '#c3e88d',
  tag: '#89ddff',
  attr: '#f78c6c',
  number: '#f07178',
  punct: '#89ddff',
  comment: '#697098',
  function: '#82aaff',
  plain: '#e8eaed',
  heading: '#c792ea',
  mdStrong: '#f78c6c',
  mdCode: '#c3e88d',
  mdLink: '#82aaff',
  fence: '#697098',
});

const JS_KEYWORDS = new Set([
  'import',
  'export',
  'from',
  'default',
  'function',
  'return',
  'const',
  'let',
  'var',
  'if',
  'else',
  'for',
  'while',
  'do',
  'switch',
  'case',
  'break',
  'continue',
  'new',
  'this',
  'class',
  'extends',
  'super',
  'typeof',
  'instanceof',
  'in',
  'of',
  'try',
  'catch',
  'finally',
  'throw',
  'async',
  'await',
  'yield',
  'true',
  'false',
  'null',
  'undefined',
  'void',
  'delete',
  'typeof',
  'interface',
  'type',
  'enum',
  'as',
  'satisfies',
  'readonly',
  'public',
  'private',
  'protected',
  'static',
  'get',
  'set',
]);

/**
 * @param {string} text
 * @param {string} type
 * @returns {{ text: string, type: string }}
 */
function token(text, type) {
  return { text, type };
}

/**
 * Detect language for a docs tab body.
 * @param {'usage'|'code'|'skill'|string} tabId
 * @param {string} source
 */
export function detectDocsLanguage(tabId, source = '') {
  if (tabId === 'skill') return 'markdown';
  if (tabId === 'usage') return 'tsx';
  const head = source.trimStart().slice(0, 40).toLowerCase();
  if (head.startsWith('<!doctype') || head.startsWith('<html') || head.startsWith('<!--')) {
    return 'html';
  }
  if (head.startsWith('{') && source.includes('"name":')) return 'json';
  return 'javascript';
}

/** Skip colorful tokenization above this size — multi-MB HTML would freeze the panel. */
export const HIGHLIGHT_MAX_CHARS = 120_000;

/**
 * Tokenize JS / TS / TSX / JSX for ThreeUI-like coloring.
 * @param {string} source
 * @param {{ jsx?: boolean }} [options] — set `jsx: false` inside HTML `<script>` (comparisons like `a<b` must not recurse as JSX).
 * @returns {{ text: string, type: string }[]}
 */
export function tokenizeScript(source, options = {}) {
  const allowJsx = options.jsx !== false;
  const out = [];
  let i = 0;
  const len = source.length;

  while (i < len) {
    const ch = source[i];
    const next = source[i + 1];

    if (ch === '/' && next === '/') {
      let j = i + 2;
      while (j < len && source[j] !== '\n') j += 1;
      out.push(token(source.slice(i, j), 'comment'));
      i = j;
      continue;
    }

    if (ch === '/' && next === '*') {
      let j = i + 2;
      while (j < len - 1 && !(source[j] === '*' && source[j + 1] === '/')) j += 1;
      j = Math.min(len, j + 2);
      out.push(token(source.slice(i, j), 'comment'));
      i = j;
      continue;
    }

    if (ch === '"' || ch === "'" || ch === '`') {
      const quote = ch;
      let j = i + 1;
      while (j < len) {
        if (source[j] === '\\') {
          j += 2;
          continue;
        }
        if (source[j] === quote) {
          j += 1;
          break;
        }
        j += 1;
      }
      out.push(token(source.slice(i, j), 'string'));
      i = j;
      continue;
    }

    if (allowJsx && ch === '<' && /[A-Za-z/!]/.test(next || '')) {
      const tagTokens = tokenizeJsxTag(source, i);
      if (tagTokens) {
        out.push(...tagTokens.tokens);
        i = tagTokens.nextIndex;
        continue;
      }
      // False positive (e.g. `a<b`) — fall through as punctuation.
    }

    if (/[0-9]/.test(ch) || (ch === '.' && /[0-9]/.test(next || ''))) {
      let j = i + 1;
      while (j < len && /[0-9._xXa-fA-F]/.test(source[j])) j += 1;
      out.push(token(source.slice(i, j), 'number'));
      i = j;
      continue;
    }

    if (/[A-Za-z_$]/.test(ch)) {
      let j = i + 1;
      while (j < len && /[A-Za-z0-9_$]/.test(source[j])) j += 1;
      const word = source.slice(i, j);
      let type = 'identifier';
      if (JS_KEYWORDS.has(word)) type = 'keyword';
      else if (j < len && source[j] === '(') type = 'function';
      else if (/^[A-Z]/.test(word)) type = 'function';
      out.push(token(word, type));
      i = j;
      continue;
    }

    if (/[{}()[\];,.:?=<>!&|+\-*/%~^]/.test(ch)) {
      out.push(token(ch, 'punct'));
      i += 1;
      continue;
    }

    out.push(token(ch, 'plain'));
    i += 1;
  }

  return out;
}

/**
 * Parse a single JSX/HTML tag starting at `<`. Returns null when `<` is not a tag
 * (e.g. comparison `a<b`), so the caller can treat `<` as punctuation instead of recursing.
 * @param {string} source
 * @param {number} start
 * @returns {{ tokens: { text: string, type: string }[], nextIndex: number } | null}
 */
function tokenizeJsxTag(source, start) {
  const tokens = [];
  let i = start;
  const len = source.length;
  tokens.push(token('<', 'punct'));
  i += 1;

  if (source[i] === '/') {
    tokens.push(token('/', 'punct'));
    i += 1;
  }

  if (source[i] === '!') {
    let j = i;
    while (j < len && source[j] !== '>') j += 1;
    if (j < len) j += 1;
    tokens.push(token(source.slice(i, j), 'comment'));
    return { tokens, nextIndex: j };
  }

  let j = i;
  while (j < len && /[A-Za-z0-9._-]/.test(source[j])) j += 1;
  if (j > i) {
    tokens.push(token(source.slice(i, j), 'tag'));
    i = j;
  }

  let closed = false;
  while (i < len) {
    const ch = source[i];
    if (ch === '>') {
      tokens.push(token('>', 'punct'));
      i += 1;
      closed = true;
      break;
    }
    if (ch === '/' && source[i + 1] === '>') {
      tokens.push(token('/>', 'punct'));
      i += 2;
      closed = true;
      break;
    }
    if (/\s/.test(ch)) {
      let k = i + 1;
      while (k < len && /\s/.test(source[k])) k += 1;
      tokens.push(token(source.slice(i, k), 'plain'));
      i = k;
      continue;
    }
    if (/[A-Za-z_$:]/.test(ch)) {
      let k = i + 1;
      while (k < len && /[A-Za-z0-9_$:.-]/.test(source[k])) k += 1;
      tokens.push(token(source.slice(i, k), 'attr'));
      i = k;
      continue;
    }
    if (ch === '=') {
      tokens.push(token('=', 'punct'));
      i += 1;
      continue;
    }
    if (ch === '"' || ch === "'") {
      const quote = ch;
      let k = i + 1;
      while (k < len && source[k] !== quote) {
        if (source[k] === '\\') k += 2;
        else k += 1;
      }
      if (k < len) k += 1;
      tokens.push(token(source.slice(i, k), 'string'));
      i = k;
      continue;
    }
    if (ch === '{') {
      let depth = 1;
      let k = i + 1;
      while (k < len && depth > 0) {
        if (source[k] === '{') depth += 1;
        else if (source[k] === '}') depth -= 1;
        k += 1;
      }
      const inner = source.slice(i + 1, k - 1);
      tokens.push(token('{', 'punct'));
      tokens.push(...tokenizeScript(inner, { jsx: true }));
      tokens.push(token('}', 'punct'));
      i = k;
      continue;
    }
    // Not a valid tag character (e.g. `)` in `a<b)`) — abort JSX parse.
    return null;
  }

  if (!closed) return null;
  return { tokens, nextIndex: i };
}

/**
 * @param {string} source
 */
export function tokenizeHtml(source) {
  const out = [];
  let i = 0;
  const len = source.length;
  let inScript = false;

  while (i < len) {
    if (source.startsWith('<!--', i)) {
      let j = source.indexOf('-->', i + 4);
      j = j === -1 ? len : j + 3;
      out.push(token(source.slice(i, j), 'comment'));
      i = j;
      continue;
    }

    if (inScript) {
      const close = source.toLowerCase().indexOf('</script', i);
      const end = close === -1 ? len : close;
      // Script bodies are JS, not JSX — `i<len` must not recurse as tags.
      out.push(...tokenizeScript(source.slice(i, end), { jsx: false }));
      i = end;
      inScript = false;
      continue;
    }

    if (source[i] === '<') {
      const lowerSlice = source.slice(i, i + 12).toLowerCase();
      const tag = tokenizeJsxTag(source, i);
      if (tag) {
        out.push(...tag.tokens);
        i = tag.nextIndex;
        if (lowerSlice.startsWith('<script') && !lowerSlice.startsWith('<script/')) {
          inScript = true;
        }
        continue;
      }
      out.push(token('<', 'punct'));
      i += 1;
      continue;
    }

    let j = i + 1;
    while (j < len && source[j] !== '<') j += 1;
    out.push(token(source.slice(i, j), 'plain'));
    i = j;
  }
  return out;
}

/**
 * Markdown highlighting for Skill.md.
 * @param {string} source
 */
export function tokenizeMarkdown(source) {
  const lines = source.split(/(\n)/);
  const out = [];

  for (const line of lines) {
    if (line === '\n') {
      out.push(token('\n', 'plain'));
      continue;
    }
    if (/^#{1,6}\s/.test(line)) {
      out.push(token(line, 'heading'));
      continue;
    }
    if (/^---\s*$/.test(line) || /^```/.test(line)) {
      out.push(token(line, 'fence'));
      continue;
    }
    if (/^\s*[-*]\s/.test(line) || /^\s*\d+\.\s/.test(line)) {
      out.push(...tokenizeInlineMarkdown(line));
      continue;
    }
    out.push(...tokenizeInlineMarkdown(line));
  }
  return out;
}

function tokenizeInlineMarkdown(line) {
  const out = [];
  let i = 0;
  const len = line.length;
  while (i < len) {
    if (line.startsWith('**', i)) {
      const end = line.indexOf('**', i + 2);
      if (end !== -1) {
        out.push(token(line.slice(i, end + 2), 'mdStrong'));
        i = end + 2;
        continue;
      }
    }
    if (line[i] === '`') {
      const end = line.indexOf('`', i + 1);
      if (end !== -1) {
        out.push(token(line.slice(i, end + 1), 'mdCode'));
        i = end + 1;
        continue;
      }
    }
    if (line[i] === '[') {
      const close = line.indexOf(']', i + 1);
      const openParen = close !== -1 ? line.indexOf('(', close) : -1;
      const closeParen = openParen !== -1 ? line.indexOf(')', openParen) : -1;
      if (close !== -1 && openParen === close + 1 && closeParen !== -1) {
        out.push(token(line.slice(i, closeParen + 1), 'mdLink'));
        i = closeParen + 1;
        continue;
      }
    }
    let j = i + 1;
    while (
      j < len &&
      line[j] !== '`' &&
      line[j] !== '[' &&
      !(line[j] === '*' && line[j + 1] === '*')
    ) {
      j += 1;
    }
    out.push(token(line.slice(i, j), 'plain'));
    i = j;
  }
  return out;
}

/**
 * @param {string} source
 * @param {'tsx'|'javascript'|'html'|'markdown'|'json'} language
 */
export function tokenizeSource(source, language) {
  if (!source) return [];
  // Never paint multi-MB strings into token spans — caller should also truncate for display.
  const body =
    source.length > HIGHLIGHT_MAX_CHARS ? source.slice(0, HIGHLIGHT_MAX_CHARS) : source;
  if (source.length > HIGHLIGHT_MAX_CHARS) {
    return [token(body, 'plain')];
  }
  if (language === 'markdown') return tokenizeMarkdown(body);
  if (language === 'html') return tokenizeHtml(body);
  return tokenizeScript(body);
}

/**
 * Map token type → CSS color (ThreeUI sweet palette).
 * @param {string} type
 */
export function colorForTokenType(type) {
  const c = THREEUI_SYNTAX_COLORS;
  switch (type) {
    case 'keyword':
      return c.keyword;
    case 'identifier':
    case 'function':
      return c.identifier;
    case 'string':
      return c.string;
    case 'tag':
      return c.tag;
    case 'attr':
      return c.attr;
    case 'number':
      return c.number;
    case 'punct':
      return c.punct;
    case 'comment':
    case 'fence':
      return c.comment;
    case 'heading':
      return c.heading;
    case 'mdStrong':
      return c.mdStrong;
    case 'mdCode':
      return c.mdCode;
    case 'mdLink':
      return c.mdLink;
    default:
      return c.plain;
  }
}
