$(function(){
    $("#submit").click(function InsertHtml(){
        ajax(function(data){
            var html="";
            html+="<ul>"+
                "<li>"+data.title+"</li>"+
                "<li>"+data.sum+"</li>"+
                "<li>"+data.chnum+"</li>"+
                "<li>"+data.ennum+"</li>"+
                "<li>"+data.dnum+"</li>"+
                "</ul>"
            $(".body").append(html);
        })
    })

   function ajax(callback) {
        var content=$("input").val();
        console.log(content);
      $.ajax({
        url: 'http://127.0.0.1:8000/data',
        dataType: 'json',
        type: 'post',
        data:{
            docurl:content
        },
        success: function (data) {
            callback&&callback(data);
            console.log(data);
        },
        error: function(jqXHR, textStatus, errorThrown){
                alert('error ' + textStatus + " " + errorThrown);  
        }
    })
}


})