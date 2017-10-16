$(function () {
    $("#searchBox").keyup(function () {
        console.log("data now " + $("#searchBox").val());
        getPostsByTags($("#searchBox").val(),$(this));
    });
});
function getPostsByTags(tags,curobject) {
    var toRemove = $(".selectedFeed");
    toRemove.removeClass("selectedFeed");
    $(curobject).parent().find("span").addClass("selectedFeed");
    var urlStr = window.location.origin + '/posts/getPostByTag';
    console.log(urlStr);
    $.ajax({
        url: urlStr,
        type: 'POST',
        data: {
            tags: tags,
        },
        contentType: 'application/x-www-form-urlencoded',
        success: function (data) {
            if (($.trim(data))) {
                $("#middleTable").empty();
                $("#middleTable").append(getHeaderRow());
                for (var i = 0; i < data.length; i++) {
                    $("#middleTable").append(getpostsForCurrentRow(data[i]));
                }
            }
            else {
                $("#middleTable").empty();
                $("#middleTable").append(getHeaderRow());
                $("#middleTable").append("<td><div class='alert-info' style='margin:0 auto;'><h4>No Threads</h4></div></td>");
            }
            $(".pager").remove();
            paginate();
        },
        error: function (xhr, text, err) {
            console.log('error: ', err);
            console.log('text: ', text);
            console.log('xhr: ', xhr);
            console.log("there is a problem whit your request, please check ajax request");
        }
    });
}

function getPostsWithoutComments(curobject) {
    var toRemove = $(".selectedFeed");
    toRemove.removeClass("selectedFeed");
    $(curobject).parent().find("span").addClass("selectedFeed");
    $.ajax({
        url: '../posts/getPostByNoComment',
        type: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        success: function (data) {
            if (($.trim(data))) {
                $("#middleTable").empty();
                $("#middleTable").append(getHeaderRow());
                for (var i = 0; i < data.length; i++) {
                    $("#middleTable").append(getpostsForCurrentRow(data[i]));
                }
            }
            else {
                $("#middleTable").empty();
                $("#middleTable").append(getHeaderRow());
                $("#middleTable").append("<td><div class='alert-info' style='margin:0 auto;'><h4>No Threads</h4></div></td>");
            }
            $(".pager").remove();
            paginate();
        }
    });
}
function getPostsWithMostComments(curobject) {
    var toRemove = $(".selectedFeed");
    toRemove.removeClass("selectedFeed");
    $(curobject).parent().find("span").addClass("selectedFeed");
    $.ajax({
        url: '../posts/getPostByMostComment',
        type: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        success: function (data) {
            if (($.trim(data))) {
                $("#middleTable").empty();
                $("#middleTable").append(getHeaderRow());
                for (var i = 0; i < data.length; i++) {
                    $("#middleTable").append(getpostsForCurrentRow(data[i]));
                }
            }
            else {
                $("#middleTable").empty();
                $("#middleTable").append(getHeaderRow());
                $("#middleTable").append("<td><div class='alert-info' style='margin:0 auto;'><h4>No Threads</h4></div></td>");
            }
            $(".pager").remove();
            paginate();
        }
    });
}

function getHeaderRow() {
    var one = "<tr>";
    one += "<th class=\"cell-stat\"></th> <th> <h3>Threads</h3> </th>";
    one += "<th class=\"cell-stat text-center hidden-xs hidden-sm\" style=\"word-wrap: break-word; width: 20em\">Tags</th>";
    one += "<th class=\"cell-stat text-center hidden-xs hidden-sm\">Posts</th>";
    one += "<th class=\"cell-stat-2x hidden-xs hidden-sm\">Last Post</th>";
    one += "</tr>";
    return one;
}
function getpostsForCurrentRow(data) {
    var one = "<tr> <td class='text-center'><i class='fa fa-question fa-2x text-primary'></i></td>";
    one += "<td><h4><a href=\"/posts/getPost/" + data._id + "\">" + data.title + "</a><br>";
    one += "<small> Upvotes : " + getLength(data.upvotes);
    one += ",Downvotes : " + getLength(data.downvotes);
    one += ",Views :" + data.preview;
    one += "</small> </h4> </td>";
    one += "<td class='text-center hidden-xs hidden-sm'><div class='tag'>";
    one += "<span class='more_text' style='display: none;'>";
    one += getTagsofPost(data.tags);
    one += "</span><br> <a class='read_more'><img class='more-icon' src='/images/down.png' height='25px' width='30px'>";
    one += "</a> </div> </td>";
    one += "<td class='text-center hidden-xs hidden-sm'>";
    if (getLength(data.comments) == 0)
        one += "Be the first one to comment!";
    else
        one += getLength(data.comments);
    one += "</td> <td class='hidden-xs hidden-sm'>" + data.lastModified + "</a><br>";
    one += "<small><i class='fa fa-clock-o'></i></small></td> </tr>";

    return one;
}

function getLength(data) {
    if (data != null) {
        return data.length;
    }
    else {
        return 0;
    }
}

function getTagsofPost(tags) {
    var one = "";
    for (var i = 0; i < tags.length; i++) {
        one += "<span style='background-color: #cce4ff'>#" + tags[i].text + "</span>";
        one += "<span>&nbsp;</span>";
    }
    return one;
}