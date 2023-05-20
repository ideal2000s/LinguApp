function setHotpsotDraggable() {
  let image_drag_active = false;
  let image_currentX;
  let image_currentY;
  let image_initialX;
  let image_initialY;
  let target;

  const preview_container = $('div[data-upload-preview-container]')
  if (preview_container) {
    preview_container.on('mousedown', function (e) {
      if($(e.target).prop('tagName') === 'LABEL'&& $(e.target).hasClass('custom-control-label'))
        return
      image_dragStart(e);
    }).on('mouseup', function (e) {
      image_dragEnd(e);
    }).on('mousemove', function (e) {
      image_drag(e);
    })
  }

  function image_dragStart(e) {
    if(($(e.target).prop('tagName') === 'IMG') || $(e.target).hasClass('image-object-resizer')) return;

    target = $(e.target).closest('div.drag-image-container')
    target.css('cursor', 'grabbing');

    image_initialX = e.clientX;
    image_initialY = e.clientY;
    image_drag_active = true;
  }

  function image_dragEnd(e) {
    if(target) {
      target.css('cursor', 'grab');
      image_initialX = image_currentX;
      image_initialY = image_currentY;

      image_drag_active = false;

      let container = preview_container;
      let image_div_top = parseFloat(target[0].style.top) + target.attr("data-yoffset")/container.height() * 100;
      let image_div_left = parseFloat(target[0].style.left) + target.attr("data-xoffset")/container.width() * 100;

      $.ajax({
        url: target.attr('data-remote-link'),
        type: 'POST',
        data: {
          '_method': 'patch',
          'task_item[left]': image_div_left,
          'task_item[top]': image_div_top
        },
        success: function () {
          target.css({'top': `${image_div_top}%`, 'left': `${image_div_left}%`, 'transform': ''});
          target.attr({"data-xoffset": 0, "data-yoffset": 0});
          console.log('success');
        },
        error: function () {
          console.log('failed');
        }
      })
    }
  }

  function image_drag(e) {
    if (image_drag_active) {
      e.preventDefault();

      image_currentX = e.clientX - image_initialX;
      image_currentY = e.clientY - image_initialY;

      target.attr({"data-xoffset": image_currentX, "data-yoffset": image_currentY});
      target.css('transform', 'translate3d(' + image_currentX + 'px, ' + image_currentY + 'px, 0)')
    }
  }
}

window.setImageObjectResize = function () {
  var startX, startY, startWidth, startHeight;
  var $resize_target;

  $('.image-object-resizer').on('mousedown', function (e) {
    initDrag(e);
  })

  function initDrag(e) {
    $resize_target = $(e.target).closest('div.drag-image-container');
    startX = e.clientX;
    startY = e.clientY;
    startWidth = parseInt($resize_target.css('width'), 10);
    startHeight = parseInt($resize_target.css('height'), 10);
    document.documentElement.addEventListener('mousemove', doDrag, false);
    document.documentElement.addEventListener('mouseup', stopDrag, false);
  }

  function doDrag(e) {
    $resize_target.css('width', (startWidth + e.clientX - startX) + 'px');
    $resize_target.css('height', (startHeight + e.clientY - startY) + 'px');
  }

  function stopDrag(e) {
    document.documentElement.removeEventListener('mousemove', doDrag, false);
    document.documentElement.removeEventListener('mouseup', stopDrag, false);
    const preview_container = $('div[data-upload-preview-container]')
    const resize_width = parseInt($resize_target.css('width'), 10)/preview_container.width() * 100;
    const resize_height = parseInt($resize_target.css('height'), 10)/preview_container.height() * 100;

    $.ajax({
      url: $resize_target.attr('data-remote-link'),
      type: 'POST',
      data: {
        '_method': 'patch',
        'task_item[width]': resize_width,
        'task_item[height]': resize_height
      },
      success: function () {
        $resize_target.css({'width': `${resize_width}%`, 'height': `${resize_height}%`})
        console.log('success');
      },
      error: function () {
        console.log('failed');
      }
    })
  }
}

$(document).ready(function () {
  setHotpsotDraggable();
  setImageObjectResize();
})