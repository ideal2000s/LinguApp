import $ from 'jquery';
import '../../libs/best_in_place';

$(function() {
  const $bip = $('.best_in_place');
  $bip.best_in_place();
});

$(document).on('ajax:success', '.best_in_place', e => {
  if (e.target.dataset.bipType !== 'checkbox') return;
  e.target.classList.toggle(e.target.dataset.trueClass);
  e.target.classList.toggle(e.target.dataset.falseClass);
});
