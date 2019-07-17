export const validateAxis = (imageSize, axis) =>
  axis <= imageSize && axis <= 250 && axis > 0;

export const validateColor = color => color.toUpperCase() === color;

export const validateImage = image => {
  if (image) {
    return image.length > 0;
  }
  return false;
};
