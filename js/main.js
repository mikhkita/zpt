$(document).ready(function(){	
    var isDesktop = false,
        isTablet = false,
        isMobile = false,
        myWidth = 0;
        myHeight = 0;

    function resize(){
       if( typeof( window.innerWidth ) == 'number' ) {
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        } else if( document.documentElement && ( document.documentElement.clientWidth || 
        document.documentElement.clientHeight ) ) {
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;
        }
        isDesktop = isTablet = isMobile = false;

        if( myWidth > 1240 ){
            isDesktop = true;
        }else if( myWidth > 768 ){
            isTablet = true;
        }else{
            isMobile = true;
        }

        resizeGrid();
    }
    $(window).resize(resize);
    resize();
    var iter = 0,
        interval = setInterval(function(){
            resize();
            iter++;
            if( iter >= 20 ) clearInterval(interval);
        },100);

    function resizeGrid(){
        $(".b-product-grid .b-product-slide").css({
            "height" : "auto"
        });
        if( $(".b-product-grid .b-product-slide").length && !isMobile ){
            var maxHeight = 0,
                i = 0,
                elems = [],
                count = 2;
            $(".b-product-grid .b-product-slide").each(function(){
                console.log($(this).height());
                if( $(this).index() % count == 0 ){
                    setHeight(maxHeight, elems);
                    elems = [];
                    maxHeight = 0;
                }
                if( maxHeight < $(this).height() )
                    maxHeight = $(this).height();

                elems.push($(this));
            });
            setHeight(maxHeight, elems);
        }
    }

    if( $(".b-job-detail").length )
        $(".b-job-detail").animate({height: "hide"}, 0);

    function setHeight(height, elems){
        for( var i in elems )
            elems[i].css("height", height);
    }

    $(".b-btn-more").click(function(){
        $(this).parents(".b-job").find(".b-job-detail").animate({height: "show"}, 400);
        $(this).parents(".b-job").find(".b-btn-hide").css("display", "inline-block");
        $(this).css("display", "none");
        return false;
    });

    $(".b-btn-hide").click(function(){
        $(this).parents(".b-job").find(".b-job-detail").animate({height: "hide"}, 400);
        $(this).parents(".b-job").find(".b-btn-more").css("display", "inline-block");
        $(this).css("display", "none");
        return false;
    });

    $.fn.placeholder = function() {
        if(typeof document.createElement("input").placeholder == 'undefined') {
            $('[placeholder]').focus(function() {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                    input.removeClass('placeholder');
                }
            }).blur(function() {
                var input = $(this);
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.addClass('placeholder');
                    input.val(input.attr('placeholder'));
                }
            }).blur().parents('form').submit(function() {
                $(this).find('[placeholder]').each(function() {
                    var input = $(this);
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                    }
                });
            });
        }
    }
    $.fn.placeholder();
    
    $('.b-main-slider').slick({
        dots: true,
        autoplay: true,
        autoplaySpeed: 4000
    });

    $('.b-product-slick').slick({
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000
    });

    $('.b-partners-slider').slick({
        prevArrow: '<button type="button" class="slick-prev slick-button icon-arrow-left"></button>',
        nextArrow: '<button type="button" class="slick-next slick-button icon-arrow-right"></button>'
    });

    var slideout = new Slideout({
        'panel': document.getElementById('panelSlideout'),
        'menu': document.getElementById('menu'),
        'padding': 256,
        'tolerance': 70
    });
    document.querySelector('.burger-menu').addEventListener('click', function() {
        slideout.toggle();
    });

    $('.burger-menu').click(function () {
        $(this).toggleClass("menu-on");
    });

    $(window).resize(function(){
        if(window.innerWidth <= 1024)
        {
            $('.itsMenu').removeClass("hideMenu");
        }else{
            slideout.close();
            $('.burger-menu').removeClass("menu-on");
            $('.itsMenu').addClass("hideMenu");
        }
    });
    $(window).resize();

    

	// var myPlace = new google.maps.LatLng(55.754407, 37.625151);
 //    var myOptions = {
 //        zoom: 16,
 //        center: myPlace,
 //        mapTypeId: google.maps.MapTypeId.ROADMAP,
 //        disableDefaultUI: true,
 //        scrollwheel: false,
 //        zoomControl: true
 //    }
 //    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions); 

 //    var marker = new google.maps.Marker({
	//     position: myPlace,
	//     map: map,
	//     title: "Ярмарка вакансий и стажировок"
	// });

    //  var options = {
    //     $AutoPlay: true,                                
    //     $SlideDuration: 500,                            

    //     $BulletNavigatorOptions: {                      
    //         $Class: $JssorBulletNavigator$,             
    //         $ChanceToShow: 2,                           
    //         $AutoCenter: 1,                            
    //         $Steps: 1,                                  
    //         $Lanes: 1,                                  
    //         $SpacingX: 10,                              
    //         $SpacingY: 10,                              
    //         $Orientation: 1                             
    //     }
    // };

    // var jssor_slider1 = new $JssorSlider$("slider1_container", options);

});