export type devicesTypes = 'mobile' | 'tablet' | 'desktop';

type tMinMax = {
  min: number;
  max?: number;
};

const breakPoints: Record<devicesTypes, tMinMax> = {
  mobile: { min: 320, max: 643 },
  tablet: { min: 644, max: 907 },
  desktop: { min: 908 }
};

export default breakPoints;
