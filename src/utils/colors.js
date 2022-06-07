function convertToRGB (hexColor) {
  let colorValue = hexColor
  if (colorValue.includes('#')) {
    colorValue = colorValue.replace('#', '')
  }
  if (colorValue.length !== 6) {
    return 'Only six-digit hex colors are allowed.'
  }

  const aRgbHex = colorValue.match(/.{1,2}/g)
  const aRgb = [
    parseInt(aRgbHex[0], 16),
    parseInt(aRgbHex[1], 16),
    parseInt(aRgbHex[2], 16)
  ]
  return aRgb
}

export function getContrastColor (hexColor) {
  const [red, green, blue] = convertToRGB(hexColor)

  const contrastToValuate = red * 0.299 + green * 0.587 + blue * 0.114

  const higherContrastColor = contrastToValuate > 186 ? '#000000' : '#ffffff'

  return higherContrastColor
}
