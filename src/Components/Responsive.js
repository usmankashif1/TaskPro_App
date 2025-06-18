import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const BASE_WIDTH = 375; // iPhone X width
const BASE_HEIGHT = 812; // iPhone X height

// Width and height scaling
const scaleSize = size => (width / BASE_WIDTH) * size;
const verticalScaleSize = size => (height / BASE_HEIGHT) * size;

// Responsive font scaling
const responsiveFontSize = size => {
  const scaleFactor = Math.min(width / BASE_WIDTH, height / BASE_HEIGHT);
  return Math.round(size * scaleFactor);
};

// Scale based on percentage string like "50%"
const scalePercentage = percentage => (width / 100) * percentage;

// ✅ NEW: True uniform scale based on the smaller side (width or height)
const trueUniformScale = size => (Math.min(width, height) / BASE_WIDTH) * size;

const responsive = {
  width: size =>
    typeof size === 'string' && size.includes('%')
      ? scalePercentage(parseFloat(size))
      : scaleSize(size),

  height: size =>
    typeof size === 'string' && size.includes('%')
      ? (height / 100) * parseFloat(size)
      : verticalScaleSize(size),

  fontSize: size => responsiveFontSize(size),
  margin: size => scaleSize(size),
  padding: size => scaleSize(size),
  borderRadius: size => scaleSize(size),

  // ✅ Use this for circles, square icons, etc.
  uniform: size => trueUniformScale(size),
};

export default responsive;
