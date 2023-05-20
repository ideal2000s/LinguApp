import $ from 'jquery';
import 'summernote/dist/summernote-bs4.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/lib/codemirror.css';
// import './summernote-audio.css';
import './summernote-ext-emoji-ajax.css';

import './custom-summernote';
import './custom-summernote.scss';

function sendFile(file, toSummernote) {
  console.log('called sendFile().');
  let data = new FormData();
  data.append('summernote_upload[image]', file);
  $.ajax({
    data: data,
    type: 'POST',
    url: '/summernote_uploads.json',
    cache: false,
    contentType: false,
    processData: false,
    success: function (data) {
      console.log('image url: ', data.url);
      console.log('successfully created.');
      let img = document.createElement('IMG');
      img.src = data.url;
      img.setAttribute('id', data.upload_id);
      toSummernote.summernote('insertNode', img);
    }
  });
}

function deleteFile(file_id) {
  $.ajax({
    type: 'DELETE',
    url: `/summernote_uploads/${file_id}`,
    cache: false,
    contentType: false,
    processData: false
  });
}

const TagButton = function (context) {
  const ui = $.summernote.ui;

  const button = ui.button({
    contents: '<i class="fas fa-tag" />',
    tooltip: 'Tag content',
    click: function () {
      if (window.getSelection) {
        const selection = window.getSelection(),
          selected = selection.rangeCount > 0 && selection.getRangeAt(0);

        if (selected.startOffset !== selected.endOffset) {
          const range = selected.cloneRange(),
            startParentElement = range.startContainer.parentElement,
            $note = context.layoutInfo.note,
            $editor = context.layoutInfo.editor;
          if ($(startParentElement).hasClass('notranslate')) {
            $editor.find($(startParentElement)).contents().unwrap();
          } else {
            const newNode = document.createElement('span');
            $(newNode)
              .addClass('notranslate')
              .css({ 'background-color': 'pink', color: 'black' });
            newNode.appendChild(range.extractContents());
            range.insertNode(newNode);
          }
          $note.summernote('code', $note.summernote('code'));
        }
      }
    }
  });

  return button.render();
};

$(function () {
  const $summernoteEditor = $('[data-editor="summernote"]');

  if ($summernoteEditor.length <= 0) return;
  Promise.all([
    require('summernote/dist/summernote-bs4.js'),
    require('codemirror/lib/codemirror.js'),
    require('codemirror/mode/xml/xml.js')
    // require('./summernote-audio.js'),
    // require('./summernote-ext-emoji-ajax.js')
  ]).then(() => {
    $summernoteEditor.each((_i, element) => {
      const is_translatable = $(element).hasClass('translatable-summernote');
      $(element).summernote({
        height: 300,
        focus: true,
        lang: 'en',
        prettifyHtml: true,
        toolbar: [
          ['tagging', [is_translatable ? 'Tag' : '']],
          ['style', ['style']],
          ['style', ['bold', 'italic', 'underline', 'clear']],
          ['fontsize', ['fontsize']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['table', ['table']],
          ['insert', ['link', 'picture', 'video' /*, 'audio', 'emoji'*/]],
          ['tool', ['undo', 'redo', 'codeview']]
        ],
        buttons: {
          Tag: is_translatable ? TagButton : ''
        },
        codemirror: {
          theme: 'monokai',
          mode: 'text/html',
          lineNumbers: true,
          lineWrapping: true,
          tabSize: 2,
          tabMode: 'indent'
        },
        callbacks: {
          onImageUpload: function (files) {
            console.log('called onImageUpload.');
            // <!-- multiple files uploading... -->
            for (let i = 0; i < files.length; i++) {
              console.log(files[i]);
              sendFile(files[i], $(this));
            }
          },
          onMediaDelete: function (target, _editor, _editiable) {
            console.log('called onMediaDelete.');
            let upload_id = target[0].id;
            if (upload_id) {
              deleteFile(upload_id);
            }
            target.remove();
          }
        }
      });
    });
  });
});
