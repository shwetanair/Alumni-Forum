function getCommentOfComment(commentId, currObj, userObj) {
    console.log("comment clicked " + commentId);
    var divToAppend = "#selected" + commentId;
    $.ajax({
        url: '../getComments',
        type: 'POST',
        data: {
            commentId: commentId,
        },
        contentType: 'application/x-www-form-urlencoded',
        success: function (data) {
            //$(divToAppend).append(one);
            var one = "<div class='commentOfComment'>";
            if (data.comments != "done") {
                console.log(data);
                for (i = 0; i < data.comments.length; i++) {
                    one += getCommentDiv(data.comments[i], userObj);
                }
            }
            if (data.user != false) {
                one += getCommentButtonOfComment(data, commentId, userObj);
                one += getShowOrHideLink("selected" + commentId);
            }
            one += "</div>";
            $(divToAppend).empty();
            $(divToAppend).append(one);
            $(divToAppend).find(".commentOfComment .postComments").hide();
        }
    });
}

function getShowOrHideLink(selectedDiv) {
    var one = "<br/><a onclick=\"showOrHideComment('" + selectedDiv + "');\"><span class='showOrHide'>Show Comment Box</span></a>";
    return one;
}

function showOrHideComment(selectedDiv) {
    var text = $("#" + selectedDiv).find(".commentOfComment .showOrHide").text();
    if (text == "Show Comment Box") {
        $("#" + selectedDiv).find(".commentOfComment .postComments").show();
        $("#" + selectedDiv).find(".commentOfComment .showOrHide").text("Hide Comment Box");
    } else {
        $("#" + selectedDiv).find(".commentOfComment .postComments").hide();
        $("#" + selectedDiv).find(".commentOfComment .showOrHide").text("Show Comment Box");
    }
}

function getCommentButtonOfComment(data, commentId, userObj) {
    var one = "<div style='margin-top: 10%;' class='postComments'><h4>Leave a Comment:</h4>";
    one += "<div class='form-group'>";
    one += "<input type='text' class='form-control' name='comment' id='comment'/></div>";
    one += "<button onclick=\"addCommentofComment('" + commentId + "',this ,'" + userObj + "')\" class='login loginmodal-submit' style='width: 20%'>Post Comment</button>";
    one += "</div>";
    return one;
}

function addCommentofComment(commentID, currentObject, userObject) {
    var divToAppend = "#selected" + commentID;
    $.ajax({
        url: '../addCommentOfComment',
        type: 'POST',
        data: {
            commentId: commentID,
            comment: $(currentObject).parent().find('input').val(),
        },
        contentType: 'application/x-www-form-urlencoded',
        success: function (data) {
            console.log(data);
            //$(currentObject).parent().parent().parent().empty();
            var one = getCommentDiv(data, userObject);
            $(currentObject).parent().before(one);
            $(currentObject).parent().find("input").val("");
        }
    });
}
function addComment(postId, curObj, userObj) {

    $.ajax({
        url: '../postsComment',
        type: 'POST',
        data: {
            getPost: $("#getPost").val(),
            comment: $("#comment").val(),
        },
        contentType: 'application/x-www-form-urlencoded',
        success: function (data) {
            console.log(data);
            var one = getCommentDiv(data, userObj);
            $("#commentsList").append(one);
            console.log(one);
            $(curObj).parent().find("textarea").val("");
        }
    });
}

function getCommentDiv(data, userObj) {
    var one = "<div id='" + data._id + "'>";
    one += "<div class='media' onclick=\"getCommentOfComment('" + data._id + "',this)\">";
    one += "<a class='pull-left'>";
    one += "<img class='media-object' style='width: 7em;height: 5em;' src='http://localhost:8000/uploads/" + data.user.filename + "' alt='profile pic of user'>";
    one += "</a><div class='media-body'> <h4 class='media-heading'>" + data.user.username + "<small>" + new Date(data.lastModified) + "</small>";
    one += "</h4>" + data.text + "</div>";
    if (userObj == data.user.username)
        one += "<a class='btn btn-default' onclick=\"deleteComment('" + data._id + "')\">Delete</a>";
    one += "</div><div class=\"clickedDiv\" id='selected" + data._id + "'></div></div>";
    return one;
}

function increaseUpvotes(postId) {
    console.log('inside upvotes');
    $.ajax({
        url: '../increaseUpvotes',
        type: 'POST',
        data: {
            getPost: postId,
        },
        success: function (data) {
            $("#upvotes").empty();
            $("#upvotes").append("Upvotes : " + data);
        },
        error: function (xhr, text, err) {
            console.log('error: ', err);
            console.log('text: ', text);
            console.log('xhr: ', xhr);
        }
    });
}

function favThisPost(postId) {
    console.log('inside upvotes');
    $.ajax({
        url: '../favPost',
        type: 'POST',
        data: {
            getPost: postId,
        },
        success: function (data) {
            $("#fav").attr("onclick", "unfavThisPost('" + postId + "');");
            $("#fav").attr("src", "/images/fav.jpg");

        },
        error: function (xhr, text, err) {
            console.log('error: ', err);
            console.log('text: ', text);
            console.log('xhr: ', xhr);
        }
    });
}

function unfavThisPost(postId) {

    $.ajax({
        url: '../unfavPost',
        type: 'POST',
        data: {
            getPost: postId
        },
        success: function (data) {
            $("#fav").attr("onclick", "favThisPost('" + postId + "');");
            $("#fav").attr("src", "/images/unfav.png");

        },
        error: function (xhr, text, err) {
            console.log('error: ', err);
            console.log('text: ', text);
            console.log('xhr: ', xhr);
        }
    });
}


function increaseDownvotes(postId) {
    $.ajax({
        url: '../increaseDownvotes',
        type: 'POST',
        data: {
            getPost: postId,
        },
        contentType: 'application/x-www-form-urlencoded',
        success: function (data) {
            $("#downvotes").empty();
            $("#downvotes").append("Downvotes : " + data);
        },
        error: function (xhr, text, err) {
            console.log('error: ', err);
            console.log('text: ', text);
            console.log('xhr: ', xhr);
        }
    });
}

function deleteComment(cid) {
    $.ajax({
        url: window.location.origin + "/posts/delete-comment",
        type: 'POST',
        data: {
            cid: cid
        },
        contentType: 'application/x-www-form-urlencoded',
        success: function (data) {
            if (data) {
                $('#' + cid).css("display", "none");
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