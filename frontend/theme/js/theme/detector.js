'use strict';

import utils from './Utils';
import is from '../../libs/is';

/*-----------------------------------------------
|   Detector
-----------------------------------------------*/

utils.$document.ready(() => {
  if (is.opera()) utils.$html.addClass('opera');
  if (is.mobile()) utils.$html.addClass('mobile');
  if (is.firefox()) utils.$html.addClass('firefox');
  if (is.safari()) utils.$html.addClass('safari');
  if (is.ios()) utils.$html.addClass('ios');
  if (is.ie()) utils.$html.addClass('ie');
  if (is.edge()) utils.$html.addClass('edge');
  if (is.chrome()) utils.$html.addClass('chrome');
  if (utils.nua.match(/puppeteer/i)) utils.$html.addClass('puppeteer');
  if (is.mac()) utils.$html.addClass('osx');
  if (is.windows()) utils.$html.addClass('windows');
});




