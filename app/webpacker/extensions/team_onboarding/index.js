import $ from 'jquery';

$(document).on('change', '.team-ability-check', function () {
    const status = $(this).prop('checked');
    if(status)
        $(this).parent().parent().removeClass('bg-soft-secondary').css('background-color', '#d8d8e0');
    else
        $(this).parent().parent().addClass('bg-soft-secondary')
    let checked_count = $('input.team-ability-check:checked').length
    let is_checked = checked_count > 0
    $('input[type="submit"]').attr('disabled', !is_checked)
});
