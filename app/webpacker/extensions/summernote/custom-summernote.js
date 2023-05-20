import $ from "jquery";

const colorNames = ['Default', 'Grey', 'Blue', 'Purple', 'Pink', 'Red', 'Green'];
const textColors = ['#2D2D3A', '#807F91', '#00A5D7', '#603F9E', '#EB2486', '#EF4036', '#0B9444'];
const backgroundColors = ['#F0F0F3', '#F0F0F3', '#A7DCF0', '#E5DFEF', '#FBDBEB', '#FCE0DE', '#D7EDE0'];

const blockQuoteButton = function (context) {
  const ui = $.summernote.ui;
  const button = ui.button({
    className: 'note-btn-blockquote',
    contents: '<i class="fa fa-quote-right"></i>',
    tooltip: 'Blockquote',
    click: function () {
      context.invoke('editor.formatBlock', 'blockquote');
    }
  });

  return button.render();
};

const initializeEditorSettings = function (formElement) {
  formElement.find('.note-statusbar').hide();
  formElement.find('.note-icon-magic').text('Aa');
  formElement.find('.note-current-color-button').html(
    '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<rect x="1.97852" y="1.97827" width="7.02181" height="7.02175" rx="1" fill="#00A5D7"/>' +
    '<rect x="11.001" y="1.97827" width="7.02181" height="7.02175" rx="1" fill="#8371CE"/>' +
    '<rect x="1.97852" y="11.0001" width="7.02181" height="7.02175" rx="1" fill="#EB2486"/>' +
    '<rect x="11.001" y="11.0001" width="7.02181" height="7.02175" rx="1" fill="#F7941E"/>' +
    '</svg>');
  organizeColorPicker(formElement.find('.note-color-all .note-dropdown-menu'));

  formElement.find('.text-color-title').on('click', function(event) {
    formElement.find('.note-current-color-button').attr('data-forecolor', event.target.dataset.value);
  });

  formElement.find('.bg-color-title').on('click', function(event) {
    formElement.find('.note-current-color-button').attr('data-backcolor', event.target.dataset.value);
  });
};

const organizeColorPicker = function (context) {
  let textColorTemplate = '<div class="note-palette">';
  textColorTemplate += '<label>Text color</label>';
  colorNames.forEach(function (color, index) {
    textColorTemplate += '<p><span class="color-panel" style="color: '+ textColors[index] +'">Aa</span><button class="text-color-title" type="button" data-event="foreColor" data-value="'+ textColors[index] +'">' + color + '</button></p>';
  });
  textColorTemplate += '</div>';
  let backColorTemplate = '<div class="note-palette">';
  backColorTemplate += '<label>Background color</label>';
  colorNames.forEach(function (color, index) {
    backColorTemplate += '<p><span class="color-panel" style="background-color: '+ backgroundColors[index] +'">Aa</span><button class="bg-color-title" type="button" data-event="backColor" data-value="' + backgroundColors[index] + '">' + color + '</button></p>';
  });
  backColorTemplate += '</div>';
  context.html(textColorTemplate + backColorTemplate);
};

window.setCustomSummernote = function () {
  const $customesummernoteEditor = $('[data-editor="custom-summernote"]');

  if ($customesummernoteEditor.length <= 0) return;
  Promise.all([
    require('summernote/dist/summernote-bs4.js'),
    require('codemirror/lib/codemirror.js'),
    require('codemirror/mode/xml/xml.js')
  ]).then(() => {
    $customesummernoteEditor.each((_i, element) => {
      const $customesummernoteForm = $(element).parents('.custom-summernote-form');
      $(element).summernote({
        disableResize: true,
        disableResizeEditor: true,
        focus: true,
        height: 300,
        lang: 'en',
        prettifyHtml: true,
        resize: false,
        toolbar: [
          ['style', ['style']],
          ['style', ['bold', 'italic', 'underline', 'strikethrough']],
          ['color', ['color']],
          ['para', ['ul', 'ol']],
          ['insert', ['link', 'blockquote']]
        ],
        buttons: {
          blockquote: blockQuoteButton
        },
        styleTags: ['p', 'h1', 'h2', 'h3', 'h4'],
        codemirror: {
          theme: 'monokai',
          mode: 'text/html',
          lineNumbers: true,
          lineWrapping: true,
          tabSize: 2,
          tabMode: 'indent'
        }
      });
      initializeEditorSettings($customesummernoteForm);
    });
  });
}

$(function () {
  setCustomSummernote();
});
