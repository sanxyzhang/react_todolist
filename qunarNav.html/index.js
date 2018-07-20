
$(function(){
    var docScrollTop=$(document).scrollTop();
    var headH=$(".topnav").outerHeight();
    var footH=$(".bottomnav").outerHeight();
    console.log(footH);
    $(window).scroll(function(){
        var curdocScrollTop=$(document).scrollTop();
         if(curdocScrollTop<footH-34){
             $(".bottomnav").addClass("myHide");
         }
         else{
             $(".bottomnav").removeClass("myHide");
         }
        if(curdocScrollTop>headH){
            $(".topnav").addClass("myHide");
        }
        else{
            $(".topnav").removeClass("myHide");
        }

        if(curdocScrollTop>docScrollTop){
            $(".topnav").removeClass("myShow");
            $(".bottomnav").removeClass("myBShow");
            $(".bottomnav").addClass("myHide");
        }
        else{
            $(".topnav").addClass("myShow");
            $(".bottomnav").addClass("myBShow");
            $(".bottomnav").removeClass("myHide");
        }
        docScrollTop=$(document).scrollTop();
    })
})