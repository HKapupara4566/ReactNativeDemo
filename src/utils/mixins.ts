import {create} from 'react-native-pixel-perfect';

export function boxShadow(
  offset: {height: number; width: number} = {height: 2, width: 2},
  opacity: number = 0.2,
  radius: number = 8,
  color: string,
): Record<string, number | string> {
  return {
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius,
    shadowColor: color,
  };
}

const designResolution = {
  width: 375,
  height: 812,
}; //this size is the size that your design is made for (screen size)
export const perfectSize = create(designResolution);
