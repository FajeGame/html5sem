type RGBColor = [number, number, number];

enum ColorName {
  Red = 'Red',
  Green = 'Green',
  Blue = 'Blue'
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (c: number) => c.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function getColorInfo(name: ColorName): { rgb: RGBColor; hex: string } {
  switch (name) {
    case ColorName.Red:
      return { rgb: [255, 0, 0], hex: rgbToHex(255, 0, 0) };
    case ColorName.Green:
      return { rgb: [0, 255, 0], hex: rgbToHex(0, 255, 0) };
    case ColorName.Blue:
      return { rgb: [0, 0, 255], hex: rgbToHex(0, 0, 255) };
  }
}

// Пример
console.log(getColorInfo(ColorName.Red)); 
// { rgb: [255, 0, 0], hex: '#FF0000' }