import {
  extractComponentNameFromPrompt,
  extractInlineCodeFromPrompt,
  extractSkillFromPrompt,
  extractUsageFromPrompt,
  parseSourceDocsFromPrompt,
} from '../parseSourceDocsFromPrompt';
import {
  buildCodeFetchCandidates,
  fetchCodeSource,
  resolveTemplateSourceDocs,
} from '../resolveTemplateSourceDocs';
import { getSourceSkillForComponent } from '../../data/sourceSkills';

const SAMPLE_PROMPT = `# Integrate <GalleryHeading /> from ThreeUI using its exact source

Component: \`GalleryHeading\`
Variant: **Halftone Loop** (\`vertical-loop\`)

## Current configured usage

\`\`\`tsx
import { GalleryHeading } from "@designcodeio/threeui";

export function Scene() {
  return (
    <div className="shader-frame">
      <GalleryHeading variant="vertical-loop" mode="dark" />
    </div>
  );
}
\`\`\`

## Exact implementation source

Complete registered source bundle: https://threeui.com/source-code/gallery-heading.json

## Implementation requirements

- Preserve the authored structure.
`;

describe('parseSourceDocsFromPrompt', () => {
  it('extracts Usage fence and component name', () => {
    const docs = parseSourceDocsFromPrompt(SAMPLE_PROMPT);
    expect(docs.componentName).toBe('GalleryHeading');
    expect(docs.usage).toContain('import { GalleryHeading }');
    expect(docs.usage).toContain('variant="vertical-loop"');
    expect(docs.usage).not.toContain('```');
  });

  it('returns empty inline code when Exact source has no large fence', () => {
    expect(extractInlineCodeFromPrompt(SAMPLE_PROMPT)).toBe('');
  });

  it('extracts Skill.md section when present', () => {
    const withSkill = `${SAMPLE_PROMPT}\n## Skill.md\n\nPort the ring exactly.\n`;
    expect(extractSkillFromPrompt(withSkill)).toContain('Port the ring exactly.');
  });

  it('handles missing prompt safely', () => {
    expect(extractUsageFromPrompt('')).toBe('');
    expect(extractComponentNameFromPrompt(undefined)).toBe('');
    expect(parseSourceDocsFromPrompt()).toEqual({
      usage: '',
      code: '',
      skill: '',
      componentName: '',
    });
  });
});

describe('resolveTemplateSourceDocs', () => {
  it('prefers meta overrides over prompt parse', () => {
    const resolved = resolveTemplateSourceDocs({
      id: 'demo',
      fullPrompt: SAMPLE_PROMPT,
      usage: 'META_USAGE',
      code: 'META_CODE',
      skill: 'META_SKILL',
    });
    expect(resolved.usage).toBe('META_USAGE');
    expect(resolved.code).toBe('META_CODE');
    expect(resolved.skill).toBe('META_SKILL');
  });

  it('fills GalleryHeading skill from shared registry when prompt has no Skill section', () => {
    const resolved = resolveTemplateSourceDocs({
      id: 'halftone-loop',
      fullPrompt: SAMPLE_PROMPT,
    });
    expect(resolved.usage).toContain('GalleryHeading');
    expect(resolved.skill).toContain('Build Gallery Heading');
    expect(resolved.skill).toBe(getSourceSkillForComponent('GalleryHeading'));
  });

  it('builds effect fetch candidates for Code (single source, not per-framework)', () => {
    expect(buildCodeFetchCandidates({ id: 'matte-rise' })).toEqual([
      '/effects/matte-rise.js',
      '/effects/matte-rise.html',
    ]);
    expect(buildCodeFetchCandidates({ id: 'x', codeUrl: '/custom/source.html' })).toEqual([
      '/custom/source.html',
    ]);
  });
});

describe('fetchCodeSource', () => {
  it('returns inline code without fetching', async () => {
    const body = await fetchCodeSource(
      { id: 'x', code: 'INLINE' },
      {
        fetchImpl: () => {
          throw new Error('should not fetch');
        },
      },
    );
    expect(body).toBe('INLINE');
  });

  it('tries js then html effect URLs', async () => {
    const calls = [];
    const fetchImpl = async (url) => {
      calls.push(url);
      if (url.endsWith('.js')) {
        return { ok: false };
      }
      return { ok: true, text: async () => '<!DOCTYPE html>CANVAS' };
    };
    const body = await fetchCodeSource({ id: 'thinking-button' }, { fetchImpl });
    expect(calls).toEqual(['/effects/thinking-button.js', '/effects/thinking-button.html']);
    expect(body).toContain('CANVAS');
  });
});
