import '@uppy/core/dist/style.css';
import '@uppy/informer/dist/style.css';
import '@uppy/progress-bar/dist/style.css';

import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
// import FileInput from '@uppy/file-input';
import Informer from '@uppy/informer';
import ProgressBar from '@uppy/progress-bar';
import ThumbnailGenerator from '@uppy/thumbnail-generator';
import $ from 'jquery';

function setupProgressBar(uppy, target) {
  uppy.use(ProgressBar, {
    target: target,
    hideAfterFinish: true,
    fixed: true
  });
}

function setupXHRUpload(uppy) {
  uppy.use(XHRUpload, { endpoint: '/upload' });
}

function setupThumbnailGenerator(uppy, previewContainer) {
  uppy.use(ThumbnailGenerator, {
    thumbnailWidth: 128,
    waitForThumbnailsBeforeUpload: true
  });
  uppy.on('thumbnail:generated', (file, previewFile) => {
    if (!previewContainer) return;
    let img = previewContainer.querySelector('img');
    let hasImage = true;
    if (!img) {
      hasImage = false;
      img = document.createElement('img');
      img.classList.add('preview', 'img-thumbnail');
    }
    img.src = previewFile;
    if (!hasImage) previewContainer.appendChild(img);
  });
}

function setupHotspotImageGenerator(uppy, previewContainer) {
  uppy.on('file-added', file => {
    if (!previewContainer) return;
    let img = previewContainer.querySelector('img');
    let hasImage = true;
    if (!img) {
      hasImage = false;
      img = document.createElement('img');
      img.classList.add('preview', 'img-thumbnail');
    }
    img.src = URL.createObjectURL(file.data);
    $(previewContainer).addClass('d-inline-block');
    if (!hasImage) previewContainer.appendChild(img);
  });
}

function setupInformer(uppy, target) {
  uppy.use(Informer, {
    target: target
  });
}

function setupFileInput(uppy, element) {
  element.addEventListener('change', event => {
    const files = Array.from(event.target.files);

    files.forEach(file => {
      try {
        uppy.addFile({
          source: 'file input',
          name: file.name,
          type: file.type,
          data: file
        });
      } catch (err) {
        if (err.isRestriction) {
          // handle restrictions
          console.log('Restriction error:', err);
        } else {
          // handle other errors
          console.error(err);
        }
      }
    });
  });
  //   uppy.use(FileInput, {
  //     target: container,
  //     pretty: true,
  //     replaceTargetContent: true
  //   });
}

function initializeUppy(allow) {
  return Uppy({
    autoProceed: true,
    allowMultipleUploads: false,
    restrictions: {
      maxNumberOfFiles: 1,
      minNumberOfFiles: 1,
      allowedFileTypes: allow
    }
  });
}

function setupAudioPreview(uppy, previewContainer) {
  uppy.on('file-added', file => {
    if (!previewContainer) return;
    let audio = previewContainer.querySelector('audio');
    let hasAudio = true;
    if (!audio) {
      hasAudio = false;
      audio = document.createElement('audio');
      audio.controls = true;
      audio.classList.add('preview', 'audio-thumbnail');
    }
    audio.src = URL.createObjectURL(file.data);
    if (!hasAudio) previewContainer.appendChild(audio);
  });
}

function handleCacheUpload(uppy, target, hiddenField) {
  uppy.on('upload-success', function(file, response) {
    $(target).find('input[type=hidden]').val('');
    hiddenField.value = JSON.stringify(response.body.data);
  });
}

function setupUppy(uppy, container, target, element, previewContainer) {
  if (element.dataset.upload === 'image') setupThumbnailGenerator(uppy, previewContainer);
  if (element.dataset.upload === 'hotspot/image') setupHotspotImageGenerator(uppy, previewContainer);
  if (element.dataset.upload === 'audio') setupAudioPreview(uppy, previewContainer);
  setupFileInput(uppy, element);
  setupInformer(uppy, target);
  setupProgressBar(uppy, target);
  setupXHRUpload(uppy);
}

export function handleFileInput(element) {
  if (!element) return;
  const allow = (element.accept && element.accept.split(',')) || ['*/*'];
  const target = element.parentNode,
      triggerButton = target.querySelector('[data-upload-trigger]'),
      hiddenField = target.querySelector('input[data-upload-hidden]'),
      container = target.querySelector('[data-upload-container]'),
      previewContainer = target.querySelector('[data-upload-preview-container]'),
      removeUploadedInput = target.querySelector('[data-upload-remove-trigger] input[type=checkbox]');
  $(triggerButton).on('click', function(e) {
    e.preventDefault();
    const ev = new MouseEvent('click', Object.assign({}, e, { bubble: false }));
    element.dispatchEvent(ev);
    return false;
  });
  if(removeUploadedInput) {
    $(removeUploadedInput).on('change', function (e) {
      if(removeUploadedInput.checked) previewContainer.style.display = 'none';
      if(!removeUploadedInput.checked) previewContainer.style.display = '';
    });
  }
  const uppy = initializeUppy(allow);
  setupUppy(uppy, container, target, element, previewContainer);
  handleCacheUpload(uppy, target, hiddenField);
  uppy.on('complete', () => {
    triggerButton.blur();
    uppy.reset();
  });
}
