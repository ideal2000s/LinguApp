const setSerialize = (selector) => {
    selector.data('serialize', selector.serialize());
}

$(document).ready(function() {
    if($('#new_task').length || $('#edit_task_item').length) {
        $('form:not(.search-box)').each(function () {
            setSerialize($(this));
        }).not('[data-remote=true]').submit(function () {
            setSerialize($(this));
        });
        window.onbeforeunload = function (e) {
            let is_changed = false;
            $('form:not(.search-box)').each(function () {
                is_changed ||= ($(this).data('serialize') !== $(this).serialize())
            })
            if(is_changed)
                return true;
            else return undefined;
        }
    }
});