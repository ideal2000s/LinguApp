import React from 'react';

/**
 * Calculate [top, left] position of target element
 *
 * @param {HTMLElement} element
 */
export function getElementOffsetPosition(element: HTMLElement): [number, number] {
  let posX = 0;
  let posY = 0;

  while (element) {
    if ('BODY' === element.tagName) {
      // deal with browser quirks with body/window/document and page scroll
      const xScrollPos = element.scrollLeft || document.documentElement.scrollLeft;
      const yScrollPos = element.scrollTop || document.documentElement.scrollTop;

      posX += element.offsetLeft - xScrollPos + element.clientLeft;
      posY += element.offsetTop - yScrollPos + element.clientTop;
    } else {
      posX += element.offsetLeft - element.scrollLeft + element.clientLeft;
      posY += element.offsetTop - element.scrollTop + element.clientTop;
    }

    element = element.offsetParent as HTMLElement;
  }

  return [posX || 0, posY || 0];
}

/**
 * Calculate [x, y] click position on the target element
 *
 * @param {React.MouseEvent} event
 */
export function getElementTargetPosition(event: React.MouseEvent): [number, number] {
  const element = event.currentTarget as HTMLElement;

  const [offsetX, offsetY] = getElementOffsetPosition(element);

  const posX = (event.clientX - offsetX) / (element.offsetWidth / 100);
  const posY = (event.clientY - offsetY) / (element.offsetHeight / 100);

  return [posX || 0, posY || 0];
}
