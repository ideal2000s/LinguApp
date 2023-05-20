'use strict';

import utils from './Utils';
import stickyfill from 'stickyfill';
const Stickyfill = stickyfill();

/*
  global Stickyfill
*/

/*-----------------------------------------------
|   Sticky fill
-----------------------------------------------*/
utils.$document.ready(() => {
  Stickyfill.add($('.sticky-top'));
  Stickyfill.add($('.sticky-bottom'));
});
