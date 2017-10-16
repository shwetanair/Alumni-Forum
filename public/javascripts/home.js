$(document).ready(function () {
    $(document.body).on('click', '.read_more', function (event) {
        event.preventDefault();
        var $elem = $(this).parents('.tag').find('.more_text');
        if ($elem.css('display') === 'none') {
            $elem.slideDown("slow");
            $(this).find('img').attr('src', '/images/up-arrow.png')
        }
        else {
            $elem.slideUp("slow");
            $(this).find('img').attr('src', '/images/down.png');
        }
    });
});
