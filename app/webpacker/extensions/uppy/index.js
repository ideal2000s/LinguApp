import $ from 'jquery';

$(() => {
  $(document).on('upload:input_available', e => {
    import('./uppySetup').then(({ handleFileInput }) => handleFileInput(e.target));
  });
  $('input[type=file][data-upload]').each((_i, element) => {
    import('./uppySetup').then(({ handleFileInput }) => handleFileInput(element));
  });
});

window.uppyUtils = {
  initUploadInputs: function(container) {
    var inputs = container.find('input[type=file][data-upload]');

    if (inputs.length > 0)
      inputs.each(function (_i, input) {
        input.dispatchEvent(
          new CustomEvent('upload:input_available', {bubbles: true, cancelable: true})
        );
      });
  }
}
