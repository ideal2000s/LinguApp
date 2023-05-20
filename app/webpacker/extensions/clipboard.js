import ClipboardJS from 'clipboard';

const clipboard = new ClipboardJS('.clipboard');

clipboard.on('success', function(e) {
  e.clearSelection();

  const text = $(e.trigger).text();
  $(e.trigger).text('✓');

  setTimeout(() => {
    $(e.trigger).text(text);
  }, 1200);
});
