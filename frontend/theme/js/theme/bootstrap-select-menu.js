'use strict';

import utils from './Utils';
import is from '../../libs/is';

/*-----------------------------------------------
|   Select menu [bootstrap 4]
-----------------------------------------------*/
utils.$document.ready(() => {
  // https://getbootstrap.com/docs/4.0/getting-started/browsers-devices/#select-menu
  // https://github.com/twbs/bootstrap/issues/26183
  is.android() && $('select.form-control').removeClass('form-control').css('width', '100%');
});
