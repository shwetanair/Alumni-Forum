
function getPostOfId(id){
    console.log('inside');
   // $(location).attr('href', "/posts/getPost/"+id);
}

$(function() {
    $(".clickable-row").click(function() {
        //$("postID").val($(this).find("input").val());
        //console.log($(this).find("input").val());
        $(this).find("form").submit();
    });
});
