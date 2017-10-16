function deletePost(postid) {
    $.ajax({
        url: window.location.origin + "/profile/delete-post",
        type: 'POST',
        data: {
            post_id: postid
        },
        contentType: 'application/x-www-form-urlencoded',
        success: function (data) {
            if (data) {
                $('#' + postid).css("display", "none");
                window.location.reload();
            } else
                $('#message').addClass("alert-danger").html("Try again");

        },
        error: function (xhr, text, err) {
            console.log('error: ', err);
            console.log('text: ', text);
            console.log('xhr: ', xhr);
            console.log("there is a problem with your request, please check ajax request");
        }
    });
}

function editThread(postid) {
    $.ajax({
        url: window.location.origin + "/profile/post/" + postid,
        type: 'GET',
        contentType: 'application/x-www-form-urlencoded',
        success: function (data) {
            $("input[name*='isEdit']").val(data[0]._id);
            $("input[name*='title']").val(data[0].title).attr('readonly', true).css('cursor', 'not-allowed');
            $("textarea[name='description']").val(data[0].description);
            var value = "";
            $.each(data[0].tags, function (index, tag) {
                value += tag.text + " "
            });
            $("textarea[name='tags']").val($.trim(value)).attr('readonly', true).css('cursor', 'not-allowed');

        },
        error: function (xhr, text, err) {
            console.log('error: ', err);
            console.log('text: ', text);
            console.log('xhr: ', xhr);
            console.log("there is a problem with your request, please check ajax request");
        }
    });


}

function openTab(evt, Name) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(Name).style.display = "block";
    evt.currentTarget.className += " active";
}