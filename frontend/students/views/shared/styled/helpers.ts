import breakPoints, { devicesTypes } from './breakpoints';

export const customMediaQuery = (device: devicesTypes): string => {
  switch (device) {
    case 'mobile':
      return `@media(max-width: ${breakPoints.mobile.max}px)`;
    case 'tablet':
      return `@media(min-width: ${breakPoints.tablet.min}px)`;
    case 'desktop':
      return `@media(min-width: ${breakPoints.desktop.min}px)`;
  }
};
