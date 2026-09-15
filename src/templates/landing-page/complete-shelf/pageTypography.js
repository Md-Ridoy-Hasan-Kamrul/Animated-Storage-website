import { useMemo } from 'react';

export const INSTRUMENT_SERIF = {
  value: 'instrument-serif',
  label: 'Instrument Serif',
  stack: '"Instrument Serif", Georgia, serif',
  google: 'Instrument+Serif',
};

/** Local woff2 already embedded in meng-to-sketchbook.html — no Google fetch. */
export const INSTRUMENT_SERIF_LOADED = {
  value: 'instrument-serif',
  label: 'Instrument Serif',
  stack: '\'Instrument Serif\', "New York", Georgia, \'Times New Roman\', serif',
};

export const NEWSREADER = {
  value: 'newsreader',
  label: 'Newsreader',
  stack: '"Newsreader", Georgia, serif',
  google: 'Newsreader:wght@200..700',
};

/** Local variable face already embedded in meng-to-sketchbook.html. */
export const NEWSREADER_LOADED = {
  value: 'newsreader',
  label: 'Newsreader',
  stack: '\'Newsreader\', "New York", Georgia, \'Times New Roman\', serif',
};

export const GEIST = {
  value: 'geist',
  label: 'Geist',
  stack: '"Geist", system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif',
  google: 'Geist:wght@100..900',
};

export const ONEST = {
  value: 'onest',
  label: 'Onest',
  stack: "'Onest', system-ui, -apple-system, 'Helvetica Neue', sans-serif",
};

/** Local Lexend already embedded in inner-green-3d.html — no Google fetch. */
export const LEXEND_LOADED = {
  value: 'lexend',
  label: 'Lexend',
  stack: "'Lexend', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

/** System Iowan — matches complete-shelf-v2.html --serif stack. */
export const IOWAN_OLD_STYLE = {
  value: 'iowan-old-style',
  label: 'Iowan Old Style',
  stack: '"Iowan Old Style", Baskerville, "Times New Roman", serif',
};

/** Inter already linked in complete-shelf-v2.html — no Google fetch. */
export const INTER_LOADED = {
  value: 'inter',
  label: 'Inter',
  stack: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
};

const clamp01 = (value) => Math.min(1, Math.max(0, value));

function normalizeHex(value, fallback) {
  if (typeof value !== 'string') return fallback;
  const match = value.trim().match(/^#([\da-f]{3}|[\da-f]{6})$/i);
  if (!match) return fallback;
  const digits = match[1].toLowerCase();
  return `#${digits.length === 3 ? digits.replace(/./g, (d) => d + d) : digits}`;
}

function hexToHsl(hex) {
  const [red, green, blue] = [1, 3, 5].map(
    (index) => Number.parseInt(hex.slice(index, index + 2), 16) / 255,
  );
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const l = (max + min) / 2;
  const delta = max - min;
  if (delta === 0) return { h: 0, s: 0, l };
  const s = delta / (1 - Math.abs(2 * l - 1));
  const base =
    max === red
      ? ((green - blue) / delta) % 6
      : max === green
        ? (blue - red) / delta + 2
        : (red - green) / delta + 4;
  return { h: (base * 60 + 360) % 360, s, l };
}

function hslToRgb({ h, s, l }) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  const [r, g, b] =
    h < 60
      ? [c, x, 0]
      : h < 120
        ? [x, c, 0]
        : h < 180
          ? [0, c, x]
          : h < 240
            ? [0, x, c]
            : h < 300
              ? [x, 0, c]
              : [c, 0, x];
  return [r + m, g + m, b + m].map((channel) => Math.round(clamp01(channel) * 255));
}

function hslToHex(hsl) {
  return `#${hslToRgb(hsl)
    .map((channel) => channel.toString(16).padStart(2, '0'))
    .join('')}`;
}

function colorShift(base, target) {
  const from = hexToHsl(base);
  const to = hexToHsl(target);
  return {
    hue: to.h - from.h,
    saturation: from.s > 0.01 ? Math.min(3, to.s / from.s) : 1,
    lightness: from.l > 0.01 ? Math.min(3, to.l / from.l) : 1,
  };
}

function selectFont(value, options) {
  return options.find((option) => option.value === value) ?? options[0];
}

function selectWeight(value, options, fallback) {
  return options.includes(value) ? value : fallback;
}

function clampRange(value, [min, fallback, max]) {
  return Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback;
}

function fontHrefFor(fonts) {
  const families = [...new Set(fonts.map((font) => font.google).filter(Boolean))];
  if (!families.length) return undefined;
  return `https://fonts.googleapis.com/css2?${families
    .map((family) => `family=${family}`)
    .join('&')}&display=swap`;
}

export function splitTypographyProps(props) {
  const {
    headingFont,
    bodyFont,
    headingWeight,
    bodyWeight,
    primaryColor,
    headingSize,
    bodySize,
    headingLetterSpacing,
    ...rest
  } = props;
  return [
    {
      headingFont,
      bodyFont,
      headingWeight,
      bodyWeight,
      primaryColor,
      headingSize,
      bodySize,
      headingLetterSpacing,
    },
    rest,
  ];
}

export function usePageTypography(recipe, props) {
  const {
    headingFont,
    bodyFont,
    headingWeight,
    bodyWeight,
    primaryColor,
    headingSize,
    bodySize,
    headingLetterSpacing,
  } = props;

  return useMemo(() => {
    const heading = selectFont(headingFont, recipe.headingFonts);
    const body = selectFont(bodyFont, recipe.bodyFonts);
    const primary = normalizeHex(primaryColor, recipe.primaryColor);
    const untouched = primary === recipe.primaryColor;
    const shift = colorShift(recipe.primaryColor, primary);

    const retone = (hex) => {
      if (untouched) return hex;
      const source = hexToHsl(normalizeHex(hex, hex));
      return hslToHex({
        h: (source.h + shift.hue + 360) % 360,
        s: clamp01(source.s * shift.saturation),
        l: clamp01(source.l * shift.lightness),
      });
    };

    const retoneRgba = (color) => {
      if (untouched) return color;
      const match = color.match(
        /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)\s*(?:[,/]\s*([\d.]+%?)\s*)?\)$/i,
      );
      if (!match) return color;
      const hex = `#${[match[1], match[2], match[3]]
        .map((channel) => Math.round(Number(channel)).toString(16).padStart(2, '0'))
        .join('')}`;
      const [red, green, blue] = [1, 3, 5].map((index) =>
        Number.parseInt(retone(hex).slice(index, index + 2), 16),
      );
      return match[4] === undefined
        ? `rgb(${red}, ${green}, ${blue})`
        : `rgba(${red}, ${green}, ${blue}, ${match[4]})`;
    };

    const filter = (baseHex = recipe.primaryColor) => {
      if (untouched) return 'none';
      const local = colorShift(baseHex, retone(baseHex));
      return [
        `hue-rotate(${local.hue.toFixed(2)}deg)`,
        `saturate(${Math.max(0, local.saturation).toFixed(3)})`,
        `brightness(${Math.min(2, Math.max(0.2, local.lightness)).toFixed(3)})`,
      ].join(' ');
    };

    const type = {
      heading: heading.stack,
      body: body.stack,
      headingWeight: selectWeight(headingWeight, recipe.headingWeights, recipe.headingWeight),
      bodyWeight: selectWeight(bodyWeight, recipe.bodyWeights, recipe.bodyWeight),
      primary,
      headingSize: clampRange(headingSize, recipe.headingSize),
      bodySize: clampRange(bodySize, recipe.bodySize),
      headingLetterSpacing: clampRange(headingLetterSpacing, recipe.headingLetterSpacing),
      retone,
      retoneRgba,
      filter,
    };

    return {
      css: recipe.css(type),
      fontHref: fontHrefFor([heading, body]),
      inlineStyles: recipe.inlineStyles?.(type),
    };
  }, [
    recipe,
    headingFont,
    bodyFont,
    headingWeight,
    bodyWeight,
    primaryColor,
    headingSize,
    bodySize,
    headingLetterSpacing,
  ]);
}

const STYLE_ID = 'threeui-page-typography';
const FONT_LINK_ID = 'threeui-page-typography-fonts';
const MESSAGE_TYPE = 'threeui-page-customization';

export function postPageCustomization(frame, customization) {
  frame?.contentWindow?.postMessage(
    {
      type: MESSAGE_TYPE,
      css: customization?.css ?? '',
      fontHref: customization?.fontHref,
    },
    '*',
  );
}

export function applyPageCustomization(frame, customization) {
  const frameDocument = frame?.contentDocument;
  if (!frameDocument?.head) return;

  const existingLink = frameDocument.getElementById(FONT_LINK_ID);
  if (customization?.fontHref) {
    const link = existingLink ?? frameDocument.createElement('link');
    link.id = FONT_LINK_ID;
    link.rel = 'stylesheet';
    if (link.getAttribute('href') !== customization.fontHref) link.href = customization.fontHref;
    if (!existingLink) frameDocument.head.append(link);
  } else {
    existingLink?.remove();
  }

  if (!customization?.css) {
    frameDocument.getElementById(STYLE_ID)?.remove();
    return;
  }

  const style = frameDocument.getElementById(STYLE_ID) ?? frameDocument.createElement('style');
  style.id = STYLE_ID;
  if (style.textContent !== customization.css) style.textContent = customization.css;
  frameDocument.head.append(style);

  for (const override of customization.inlineStyles ?? []) {
    for (const element of frameDocument.querySelectorAll(override.selector)) {
      for (const [property, value] of Object.entries(override.styles)) {
        element.style.setProperty(property, value);
      }
    }
  }
}
