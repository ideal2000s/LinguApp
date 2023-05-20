import $ from 'jquery';

$(() => {
  $('.modal-giphy').each((_i, element) => {
    const $giphyModal = $(element);
    let offset = 0, query = '';
    let callGiphyApi = function () {
      const count = 10;
      $giphyModal.find('.loading-overlay').fadeIn();
      const fullQuery = "https://api.giphy.com/v1/gifs/search?q="+ query +"&api_key=dc6zaTOxFJmzC&limit=" + count + "&offset=" + offset;
      const xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function() {
        $giphyModal.find('.gif-columns').empty();
        $giphyModal.find('.btn-upload-gif').attr('disabled', 'disabled');
        if (xhr.readyState === 4 && xhr.status === 200) {
          let response = JSON.parse(xhr.responseText);

          response.data.forEach(function(item) {
            $('<figure></figure>').append($('<img />', { src: item.images.fixed_width.url })
                .data({
                  url: item.url,
                  embed_url: item.embed_url,
                  thumbnail: item.images.fixed_width.url,
                  original_url: item.images.original.url,
                  title: item.title
                }))
                .appendTo($giphyModal.find('.gif-columns'));
          });
          $giphyModal.find('.pagination-container').removeClass('d-none')
              .find('.span-count').text(response.pagination.total_count)
              .end().find('.btn-prev-page').toggle(offset > 0)
              .end().find('.btn-next-page').toggle(offset + count < response.pagination.total_count);
        }
        $giphyModal.find('.loading-overlay').fadeOut();
      };
      xhr.open("GET", fullQuery, true);
      xhr.send();
    };
    $giphyModal.find('.input-keyword').on('keydown', function(e) {
      query = this.value;
      if (e.keyCode == 13){ // the enter key code
        if (query.trim() === '') return false;
        offset = 0;
        callGiphyApi();
        return false;
      }
    });
    $giphyModal.on('click', '.btn-prev-page', function (e) {
      offset -= 10;
      callGiphyApi();
    });
    $giphyModal.on('click', '.btn-next-page', function (e) {
      offset += 10;
      callGiphyApi();
    });
    $giphyModal.on('click', '.gif-columns figure', function (e) {
      $(this).siblings().removeClass('selected');
      $(this).addClass('selected');
      $giphyModal.find('.btn-upload-gif').removeAttr('disabled');
    });
    $giphyModal.on('click', '.btn-upload-gif', function (e) {
      const img_tag = $giphyModal.find('figure.selected img');
      const image_url = img_tag.attr('src');
      $giphyModal.parent().find('input[type=hidden]').val('').end().find('.input-remote-url').val(JSON.stringify(img_tag.data()));
      $giphyModal.parent().find('[data-upload-preview-container]').empty().append($('<img />', { class: 'preview img-thumbnail', src: image_url }));
      $giphyModal.modal('hide');
    });
  });
});
