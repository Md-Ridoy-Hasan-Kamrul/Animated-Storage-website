import {
  colorForTokenType,
  detectDocsLanguage,
  HIGHLIGHT_MAX_CHARS,
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

  it('does not stack-overflow on HTML script comparisons like a<b', () => {
    const html = `<!DOCTYPE html><html><body><script>
for(var i=0;i<len;i++){if(a<b&&c>d){foo(i);}}
</script></body></html>`;
    expect(() => tokenizeSource(html, 'html')).not.toThrow();
    const tokens = tokenizeSource(html, 'html');
    expect(tokens.length).toBeGreaterThan(5);
    expect(tokens.some((t) => t.text === 'script')).toBe(true);
  });

  it('still highlights real JSX tags in Usage/TSX', () => {
    const tokens = tokenizeSource('<Foo bar={1} />', 'tsx');
    expect(tokens.some((t) => t.type === 'tag' && t.text === 'Foo')).toBe(true);
    expect(tokens.some((t) => t.type === 'attr' && t.text === 'bar')).toBe(true);
  });

  it('skips fancy tokenization for huge Code bodies', () => {
    const huge = `<!DOCTYPE html>${'x'.repeat(HIGHLIGHT_MAX_CHARS)}`;
    const tokens = tokenizeSource(huge, 'html');
    expect(tokens).toHaveLength(1);
    expect(tokens[0].type).toBe('plain');
    expect(tokens[0].text.length).toBe(HIGHLIGHT_MAX_CHARS);
  });
});
