function companyName() {
    $.ajax({
        url: "./companyname",
        method: 'get',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $.each(data, function (index, item) {
                $('#company-list').empty();
            });
            $.each(data, function (index, item) {
                $('#company-list').append("<option>" + item.name + "</option>");
            });

        },
        error: function (xhr, text, err) {
            console.log('error: ', err);
            console.log('text: ', text);
            console.log('xhr: ', xhr);
            console.log("there is a problem whit your request, please check ajax request");
        }
    });
}

function univName() {
    $.ajax({
        url: "./universityname",
        method: 'get',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $.each(data, function (index, item) {
                $('#university-list').empty();
            });
            $.each(data, function (index, item) {
                $('#university-list').append("<option>" + item.name + "</option>");
            });
        },
        error: function (xhr, text, err) {
            console.log('error: ', err);
            console.log('text: ', text);
            console.log('xhr: ', xhr);
            console.log("there is a problem whit your request, please check ajax request");
        }
    });
}


$(document).ready(function () {

    var f1 = false;
    var f2 = false;
    var f3 = false;
    var f4 = false;
    $('#pass').keyup(function () {
        var pswd = $(this).val();


        //validate the length
        if (pswd.length < 8) {
            $('#length').removeClass('valid').addClass('invalid');
            f1 = true;

        } else {
            $('#length').removeClass('invalid').addClass('valid');
        }
        //validate letter
        if (pswd.match(/[A-z]/)) {
            $('#letter').removeClass('invalid').addClass('valid');
            f2 = true;

        } else {
            $('#letter').removeClass('valid').addClass('invalid');
        }

        //validate capital letter
        if (pswd.match(/[A-Z]/)) {
            $('#capital').removeClass('invalid').addClass('valid');
            f3 = true;

        } else {
            $('#capital').removeClass('valid').addClass('invalid');

        }

        //validate number
        if (pswd.match(/\d/)) {
            $('#number').removeClass('invalid').addClass('valid');
            f4 = true;

        } else {
            $('#number').removeClass('valid').addClass('invalid');
        }


    }).focus(function () {
        $('#pswd_info').show();
    }).blur(function () {
        $('#pswd_info').hide();
    });
    $('#rbtn').on("click", function () {
        if (f1 && f2 && f3 && f4) {
            $('#register_form').submit();
        }
    });

});



