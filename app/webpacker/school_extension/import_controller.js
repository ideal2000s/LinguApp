import { Controller } from 'stimulus';
import $ from 'jquery';

export default class extends Controller {
  static targets = ['fileInput', 'csvFileForm', 'spinner', 'dropzone'];

  connect() {
    $(this.csvFileFormTarget).submit(this.onFormSubmit);
    this.initializeDropzone();
  }

  initializeDropzone() {
    let controller = this;
    $(this.dropzoneTarget).on('dragleave', function(e) {
      $(controller.dropzoneTarget).css('opacity', '1');
      e.preventDefault();
    });
    $(this.dropzoneTarget).on('dragend', function(e) {
      $(controller.dropzoneTarget).css('opacity', '1');
      e.preventDefault();
    });
    $(this.dropzoneTarget).on('dragenter', function(e) {
      $(controller.dropzoneTarget).css('opacity', '0.5');
      e.preventDefault();
    });
    $(this.dropzoneTarget).on('dragover', function(e) {
      $(controller.dropzoneTarget).css('opacity', '0.5');
      e.preventDefault();
    });
    $(this.dropzoneTarget).on('drop', function(event) {
      const onFileDroppedHandler = controller.onFileDropped.bind(controller);
      onFileDroppedHandler(event);
    });
  }

  uploadCSVFile() {
    if(this.fileInputTarget.files.length) {
      this.onFormSubmit(this);
    }
  }

  onFormSubmit(controller) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", controller.csvFileFormTarget.action);
    $(controller.spinnerTarget).removeClass('d-none');
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        $("#school-main-modal").html(xhr.responseText);
        $('#school-main-modal').modal('show');
      }
      if (!$(controller.spinnerTarget).hasClass('d-none')) { $(controller.spinnerTarget).addClass('d-none'); }
    };
    xhr.send(new FormData(controller.csvFileFormTarget));
  }

  onFileDropped(event) {
    event.preventDefault();
    event.originalEvent.dataTransfer.dropEffect = 'copy';
    let file_obj = event.originalEvent.dataTransfer.files;
    if (file_obj.length == 0) {
      return;
    }
    let extension = file_obj[0].name.substr(file_obj[0].name.lastIndexOf('.') + 1);
    if (extension == 'csv' || extension == 'xls' || extension == 'xlsx') {
      $("#file").prop("files", event.originalEvent.dataTransfer.files);
      this.onFormSubmit(this);
    } else {
      $('.error-message').removeClass('d-none');
      $(this.dropzoneTarget).css('opacity', '1');
    }
  }
}