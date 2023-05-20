import { tLessonPageColor, ILesson } from 'students/models';

export const DEFAULT_LESSON_BACKGROUND = '#8371ce';
const defaultBack = {
  gradient: 'linear-gradient(180deg, #AF71CC 18.62%, #472685 100%), #8371ce',
  background: '#472685'
};
const colorsGradientMap = new Map<
  tLessonPageColor | string | null,
  { background?: string; gradient?: string }
>([
  [
    '#00a5d7', // blue
    {
      gradient: 'linear-gradient(180deg, #7BD0E7 18.62%, #0481B7 100%), #00a5d7',
      background: '#0481B6'
    }
  ],
  [
    '#8dc63f', //green
    {
      gradient: 'linear-gradient(180deg, #BACA5D 18.62%, #4AAD57 100%), #8dc63f',
      background: '#49ad57'
    }
  ],
  [
    '#f7941e', // orange
    {
      gradient: 'linear-gradient(180deg, #FFA439 18.62%, #F4691B 100%), #f7941e',
      background: '#f46a1b'
    }
  ],
  [
    '#ef4036', //red
    {
      gradient: 'linear-gradient(180deg, #FE886A 18.62%, #EA4230 100%), #ef4036',
      background: '#e94230'
    }
  ],
  [
    '#eb2486', // pink
    {
      gradient: 'linear-gradient(180deg, #E4679C 18.62%, #9C0650 100%), #eb2486',
      background: '#9c0650'
    }
  ],
  [
    '#f9fafd', // grey
    {
      gradient: 'linear-gradient(180deg, #F9FAFD 18.62%, #C5CCDB 100%), #f9fafd',
      background: '#c5ccdb'
    }
  ],
  [DEFAULT_LESSON_BACKGROUND, defaultBack],
  [null, defaultBack]
]);

function getBackgroundColorIfLoaded(
  color: ILesson['color'],
  loaded: boolean
): NonNullable<ReturnType<typeof colorsGradientMap.get>> {
  if (!loaded) return { background: undefined };
  return colorsGradientMap.get(color) || { background: color! };
}

export { colorsGradientMap, getBackgroundColorIfLoaded };
