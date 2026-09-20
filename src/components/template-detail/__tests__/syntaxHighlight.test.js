import {
  colorForTokenType,
  detectDocsLanguage,
  tokenizeSource,
  THREEUI_SYNTAX_COLORS,
} from '../syntaxHighlight';

const SAMPLE_USAGE = `import { GalleryHeading } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <GalleryHeading
        variant="vertical-loop"
        mode="dark"
        headlineSize={1.25}
        hue={0}
      />
    </div>
  );
}
`;

describe('syntaxHighlight', () => {
  it('detects languages per docs tab', () => {
    expect(detectDocsLanguage('usage', SAMPLE_USAGE)).toBe('tsx');
    expect(detectDocsLanguage('skill', '# Build')).toBe('markdown');
    expect(detectDocsLanguage('code', '<!DOCTYPE html>')).toBe('html');
    expect(detectDocsLanguage('code', "(function(){'use strict';})();")).toBe('javascript');
  });

  it('colors Usage like ThreeUI: keywords purple, strings lime, props peach', () => {
    const tokens = tokenizeSource(SAMPLE_USAGE, 'tsx');
    const byType = Object.fromEntries(
      ['keyword', 'string', 'attr', 'tag', 'function', 'number'].map((type) => [
        type,
        tokens.filter((t) => t.type === type).map((t) => t.text),
      ]),
    );

    expect(byType.keyword).toEqual(expect.arrayContaining(['import', 'from', 'export', 'function', 'return']));
    expect(byType.string).toEqual(
      expect.arrayContaining(['"@designcodeio/threeui"', '"vertical-loop"', '"dark"']),
    );
    expect(byType.attr).toEqual(
      expect.arrayContaining(['className', 'variant', 'mode', 'headlineSize', 'hue']),
    );
    expect(byType.tag).toEqual(expect.arrayContaining(['div', 'GalleryHeading']));
    expect(byType.number).toEqual(expect.arrayContaining(['1.25', '0']));

    expect(colorForTokenType('keyword')).toBe(THREEUI_SYNTAX_COLORS.keyword);
    expect(colorForTokenType('string')).toBe(THREEUI_SYNTAX_COLORS.string);
    expect(colorForTokenType('attr')).toBe(THREEUI_SYNTAX_COLORS.attr);
  });

  it('highlights Skill.md headings and inline code', () => {
    const tokens = tokenizeSource(
      '# Build Gallery Heading\n\nUse `#stage` and **exact** source.\n',
      'markdown',
    );
    expect(tokens.some((t) => t.type === 'heading' && t.text.startsWith('# Build'))).toBe(true);
    expect(tokens.some((t) => t.type === 'mdCode' && t.text.includes('#stage'))).toBe(true);
    expect(tokens.some((t) => t.type === 'mdStrong' && t.text.includes('exact'))).toBe(true);
  });
});
