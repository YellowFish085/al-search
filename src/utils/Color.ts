const Color = require('color'); // eslint-disable-line

const colors = [
  {
    background: {
      r: 239,
      g: 92,
      b: 92,
    },
    text: {
      r: 255,
      g: 244,
      b: 247,
    },
  },
  {
    background: {
      r: 253,
      g: 54,
      b: 78,
    },
    text: {
      r: 255,
      g: 235,
      b: 235,
    },
  },
  {
    background: {
      r: 198,
      g: 34,
      b: 63,
    },
    text: {
      r: 255,
      g: 241,
      b: 242,
    },
  },
  {
    background: {
      r: 250,
      g: 169,
      b: 202,
    },
    text: {
      r: 107,
      g: 37,
      b: 66,
    },
  },
  {
    background: {
      r: 227,
      g: 79,
      b: 133,
    },
    text: {
      r: 255,
      g: 226,
      b: 237,
    },
  },
  {
    background: {
      r: 205,
      g: 185,
      b: 241,
    },
    text: {
      r: 60,
      g: 17,
      b: 121,
    },
  },
  {
    background: {
      r: 146,
      g: 98,
      b: 233,
    },
    text: {
      r: 235,
      g: 222,
      b: 254,
    },
  },
  {
    background: {
      r: 118,
      g: 0,
      b: 204,
    },
    text: {
      r: 224,
      g: 207,
      b: 255,
    },
  },
  {
    background: {
      r: 157,
      g: 185,
      b: 255,
    },
    text: {
      r: 40,
      g: 42,
      b: 123,
    },
  },
  {
    background: {
      r: 78,
      g: 96,
      b: 182,
    },
    text: {
      r: 222,
      g: 227,
      b: 255,
    },
  },
  {
    background: {
      r: 47,
      g: 54,
      b: 139,
    },
    text: {
      r: 217,
      g: 228,
      b: 255,
    },
  },
  {
    background: {
      r: 190,
      g: 227,
      b: 249,
    },
    text: {
      r: 39,
      g: 58,
      b: 75,
    },
  },
  {
    background: {
      r: 109,
      g: 200,
      b: 241,
    },
    text: {
      r: 28,
      g: 74,
      b: 117,
    },
  },
  {
    background: {
      r: 54,
      g: 130,
      b: 234,
    },
    text: {
      r: 242,
      g: 249,
      b: 253,
    },
  },
  {
    background: {
      r: 20,
      g: 64,
      b: 157,
    },
    text: {
      r: 222,
      g: 240,
      b: 255,
    },
  },
  {
    background: {
      r: 118,
      g: 243,
      b: 233,
    },
    text: {
      r: 27,
      g: 96,
      b: 109,
    },
  },
  {
    background: {
      r: 1,
      g: 196,
      b: 215,
    },
    text: {
      r: 239,
      g: 253,
      b: 255,
    },
  },
  {
    background: {
      r: 25,
      g: 77,
      b: 113,
    },
    text: {
      r: 211,
      g: 237,
      b: 252,
    },
  },
  {
    background: {
      r: 148,
      g: 255,
      b: 169,
    },
    text: {
      r: 37,
      g: 100,
      b: 46,
    },
  },
  {
    background: {
      r: 155,
      g: 229,
      b: 61,
    },
    text: {
      r: 37,
      g: 84,
      b: 20,
    },
  },
  {
    background: {
      r: 38,
      g: 127,
      b: 25,
    },
    text: {
      r: 240,
      g: 248,
      b: 232,
    },
  },
  {
    background: {
      r: 255,
      g: 242,
      b: 126,
    },
    text: {
      r: 174,
      g: 78,
      b: 24,
    },
  },
  {
    background: {
      r: 236,
      g: 182,
      b: 44,
    },
    text: {
      r: 136,
      g: 43,
      b: 15,
    },
  },
  {
    background: {
      r: 136,
      g: 43,
      b: 15,
    },
    text: {
      r: 254,
      g: 244,
      b: 196,
    },
  },
  {
    background: {
      r: 225,
      g: 214,
      b: 160,
    },
    text: {
      r: 76,
      g: 64,
      b: 35,
    },
  },
  {
    background: {
      r: 242,
      g: 135,
      b: 13,
    },
    text: {
      r: 94,
      g: 43,
      b: 12,
    },
  },
  {
    background: {
      r: 243,
      g: 84,
      b: 40,
    },
    text: {
      r: 255,
      g: 232,
      b: 224,
    },
  },
];

/**
 * Return color css variables for a Media card.
 */
function getMediaCardColors(c: string | null): object {
  const defaultColors = {
    '--media-text': 'hsl(202,57%,40%)',
    '--media-background': 'hsl(202,57%,89%)',
    '--media-background-text': 'hsl(202,57%,25%)',
    '--media-overlay-text': 'hsl(202,80%,70%)',
  };

  // If not color is given, return default ones.
  if (!c) return defaultColors;

  // Try to get base color in list from given color.
  const mediaColor = Color(c);
  let baseColor: any = null;
  let t = 1 / 0;

  colors.forEach((color) => {
    const powed = (mediaColor.red() - color.background.r) ** 2
      + (mediaColor.green() - color.background.g) ** 2
      + (mediaColor.blue() - color.background.b) ** 2;

    if (powed < t) {
      t = powed;
      baseColor = color;
    }
  });

  if (!baseColor) return defaultColors;

  // Base color was found, we use it to generate variants.
  const backgroundColor = Color(baseColor!.background);
  const textColor = Color(baseColor!.text);
  const overlayTextColor = Color({
    h: textColor.hsl().hue(),
    l: 70,
    s: 80,
  });

  return {
    '--media-color': mediaColor.hsl().string(),
    '--media-background': backgroundColor.hsl().string(),
    '--media-background-text': textColor.hsl().string(),
    '--media-overlay-text': overlayTextColor.hsl().string(),
  };
}

export default {
  getMediaCardColors,
};
