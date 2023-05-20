import autosize from "autosize";
import $ from "jquery";

window.assignmentRowClick = function (url) {
  $.ajax({
    url: url,
    success: function(data) {},
    error: function(dta) {}
  })
}

window.setAutosize = function () {
  autosize($('.school-comment-reply'));
}

window.setSchoolCustomSummernote = function () {
  // show summernote when click input
  $('.document-response-input').focusin(function () {
    $(this).attr('data-editor', 'custom-summernote').hide();
    setCustomSummernote();
    $('.school-response-submit').removeClass('d-none');
    $('.note-editor').show();
    setTimeout(() => {
      $('.note-insert button:first-child').on('click', function () {
        $('.modal-backdrop').css('z-index', -1);
      });
    }, 100)
  })
}

window.schoolComment = function () {
  $('#student_response_text').mouseup(function () {
    $('.review-tooltip, .school-comment').removeClass('d-inline-flex').addClass('d-none');
    $('.student-response-detail span').removeClass('text-focus');
    $('.school-comment-reply').val('');

    window.text = '';
    if (typeof window.getSelection !== "undefined") {
      text = window.getSelection().toString();
    } else if (typeof document.selection !== "undefined" && document.selection.type === "Text") {
      text = document.selection.createRange().text;
    }
    if(text) {
      let range = window.getSelection().getRangeAt(0);
      let bound = range.getBoundingClientRect();
      let surroundElement = document.createElement('span');
      surroundElement.id = text;
      surroundElement.appendChild(range.extractContents());
      range.insertNode(surroundElement);

      let right = $(window).width() - bound.left - 154 - bound.width/2;
      $('.review-tooltip').css({top: `${bound.top - 48}px`, right: `${right < 0 ? 0 : right}px`}).removeClass('d-none').addClass('d-inline-flex');

      $('.review-comment').on('click', function () {
        $('.school-comment #word').val(text);
        $('.review-tooltip').removeClass('d-inline-flex').addClass('d-none');
        $('.school-comment').css({top: `${bound.top - 75}px`}).removeClass('d-none').addClass('d-inline-flex');
        $(`span[id='${text}']`).addClass('text-focus');
      })
    }
  })
}

window.schoolQuote = function () {
  $('.review-quote').on('click', function () {
    $('.review-tooltip').removeClass('d-inline-flex').addClass('d-none');
    $('.document-response-input').val($('.document-response-input').val() + `<blockquote>${text}</blockquote>`);
    $('.note-editable').append(`<blockquote>${text}</blockquote>`);
    if ($('.document-response-input').data('editor') !== 'custom-summernote') {
      $('.document-response-input').attr('data-editor', 'custom-summernote');
      setCustomSummernote();
    } else {
      $('.note-editor').show();
      $('.document-response-input').hide();
    }
    $('.school-response-submit').removeClass('d-none');
  })
}

window.schoolAudioRecord = function () {
  $('.school-audio-response').on('click', function () {
    $(this).hide();
    $('.school-audio-record-container, .school-response-submit').removeClass('d-none');
    $('.document-response-input, .note-editor').hide();
  })

  $('.school-audio-record-container .close').on('click', function () {
    $('.document-response-input, .school-audio-response').show();
    $('.school-audio-record-container, .school-response-submit').addClass('d-none');
  })
}

window.preventEmptyCommentFormSubmit = function (text) {
  $('#new_comment').on('submit', function () {
    if($('.note-editable').text() === "" && $('#comment_audio').val() === "") {
      alert(text);
      return false;
    }
  })
}

$(document).ready(function () {
  if ($('#assignments_stats_chart').length > 0) {
    var ctx = document.getElementById('assignments_stats_chart').getContext('2d');
    var gradient = ctx.createLinearGradient(0, 0, 0, 500);
    gradient.addColorStop(0, 'rgba(0, 165, 215, 0.13)');
    gradient.addColorStop(1, 'rgba(0, 165, 215, 0)');

    var assignmentsStatsChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: window.assignmentsLabel,
        datasets: [
          {
            backgroundColor: gradient,
            borderWidth: 4,
            borderColor: "#00A5D7",
            data: window.CommentsCount,
            pointHoverBackgroundColor: "#00A5D7",
            pointHoverBorderColor: 'white',
            pointHoverBorderWidth: '2px',
            pointHoverBorderRadius: '10px',
            pointHoverRadius: 8,
            pointHoverWidth: 10,
            pointBackgroundColor: "#00A5D7",
          }
        ]
      },
      options: {
        legend: {
          display: false,
        },
        elements: {
          point: {
            radius: 0,
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              fontColor: 'rgba(128, 127, 145, 0.5)',
              padding: 15,
              fontSize: 14,
            },
            gridLines: {
              display: false,
            },
          }],
          yAxes: [{
            ticks: {
              fontColor: 'rgba(128, 127, 145, 0.5)',
              padding: 20,
              fontSize: 14,
              stepSize: window.documentsStep,
              beginAtZero: true
            },
            gridLines: {
              color: '#E6E6F0',
              drawBorder: false,
              zeroLineColor: '#E6E6F0'
            }
          }]
        },
        tooltips: {
          enabled: false
        }
      }
    })
  }
})