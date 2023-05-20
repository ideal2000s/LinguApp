import React, { lazy } from 'react';
import _get from 'lodash/get';
import tColor from 'tinycolor2';

export function styledFn(cssProp: string, path: string, defaultValue = '') {
  return function ({ theme }: { theme: any }): string {
    const value = _get(theme, path);
    return value ? `${cssProp}: ${value} !important;` : defaultValue;
  };
}

interface ILazyPreloadComponent
  extends React.LazyExoticComponent<React.ComponentType<any>> {
  preload: () => ReturnType<Parameters<typeof lazy>[0]>;
}
export function ReactLazyPreload(
  importStatement: Parameters<typeof lazy>[0]
): ILazyPreloadComponent {
  const Component = lazy(importStatement) as ILazyPreloadComponent;
  Component.preload = importStatement;
  return Component;
}

export function isLightFontNeeded(bgColor?: string): boolean {
  if (!bgColor) return false;
  return tColor(bgColor).getBrightness() < 200;
}

export function isLightColor(color?: string): boolean {
  if (!color) return false;
  return tColor(color).getBrightness() > 200;
}

/** keep only lesson with id. if lessonId is -1 return '/lessons' */
export function getLessonPathFromUrl(url: string, lessonId?: number | string): string {
  if (!lessonId) {
    const match = url.match(/^.*\/lessons(?:\/[1-9]\d*)?/);
    return match ? match[0] : '';
  }

  const lessonIdString = String(lessonId);
  const match = url.match(/^.*\/lessons/);
  let result = match ? match[0] : '';
  if (!isNaN(parseInt(lessonIdString))) {
    const replacer = lessonId === -1 ? '' : `/${lessonIdString}`;
    result += replacer;
  }
  return result;
}

export function convertHexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
}

export function htmlStringHasContent(htmlString: string): boolean {
  try {
    const text = new DOMParser()
      .parseFromString(htmlString, 'text/html')
      .querySelector('body')
      ?.innerText.trim();
    return !!text;
  } catch {
    return true;
  }
}

export function getCookie(name: string) {
  const result = document.cookie.match('(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)');
  return result ? result.pop() : '';
}

export function setCookie(name: string, value: string, daysToLive: number) {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + daysToLive * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}`;
}
