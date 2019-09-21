
$(document).ready(function () {
    //====================
    //  Adjusting header height
    //====================


//    $('header').css({
//        height: $(window).height()
//    });
//    
//    $(window).on('resize', function () {
//        $('header').css({
//            height: $(window).height()
//        });
//    });


    //==============================
    // change active class on nav bar items
    //=============================
    $('.nav ul li a').on('click', function () {

        $(this).parent('li').addClass('active');
        $(this).parent().siblings().removeClass('active');

        $('html, body').animate({

            scrollTop: $('#' + $(this).data('id')).offset().top

        }, 1000)
    })


    //==============================
    //  slide down nav bar on smal screens
    //=============================
    $(window).on('resize', function () {
       
        if ($(window).innerWidth() > 767) {

            $('section.nav nav').css('display', 'flex');
        } else {
            $('section.nav nav').css('display', 'none');
        }
    });

    $('.menu-bar').on('click', function () {
       
        $('section.nav nav').slideToggle(300);
    });
    
    

    //====================
    //  Coordinators
    //====================
    
    //auto animate coordinator
    (function autoAnimate() { 
        
        //get the span bar
        var span = $('.coords .active .progress span'),
            
            // get the span parent (.progress)
            progress = $('.coords .progress'),
            
            //get active coordinator
            active = $('.coords .active'),
            
            //get the slider's active slide item
            activeSlide = $('.slider .slide.active');
        
        if (span.width() < progress.width()) {
            
            $(span).animate({
                
                width: $(progress).width()
                
            },5000, function () {
                
                if (!$(active).is(':last-child') && !$(activeSlide).is(':last-child')) {
                    
                    $(span).css('width', "0px");
                    
                    $(active).removeClass('active').next('.coord').addClass('active');
                    
                    $(activeSlide).removeClass('active').next('.slide').addClass('active');
                    
                }else {
                    $(span).css('width', "0px");
                    
                    $(active).removeClass('active');
                    $('.coords .coord').eq(0).addClass('active');
                    
                    $(activeSlide).removeClass('active');
                    $('.slider .slide').eq(0).addClass('active');
                }
                autoAnimate();                                 
            }); 
        }
        
    }());
    
    //height of the window
    let windowHeight = $(window).height();
    let scrollButton = $('.scroll-top');

    $(window).on('scroll load', function () {

        //============================
        //  statics section (counter)
        //============================        
        
        if ($(window).scrollTop() > $('.statics').offset().top - windowHeight) {
            counter();
            $(this).off('scroll');
        }

        //============================
        //  showing scroll top button
        //============================                
        $(window).on('scroll', function() {
                if ($(window).scrollTop() > $('.statics').offset().top - windowHeight) {
                    if (scrollButton.is(":hidden")) {
                        $(scrollButton).fadeIn();                        
                    }
                   
                }else {

                    $(scrollButton).fadeOut();
                }

                //set the nav bar as fixed
            })          
    
    });

    //============================
    //   scroll to top i=on click on scroll top button
    //============================
    $(scrollButton).on('click', function () {

        $('html, body').animate({

            scrollTop: 0

        }, 1000)

    });




    //counter function for statistics
    function counter() {
        $('.counter').each(function() {
            var counter = $(this),
                countTo = counter.attr('data-count');

            const countObj = { countNum: counter.text()}

            $(countObj).animate({
                countNum: countTo
            },{

                duration: 2000,
                easing:'linear',
                step: function() {

                    counter.text(Math.floor(this.countNum));
                },
                complete: function() {
                    counter.text(this.countNum);
                //alert('finished');
                }

            });
        });        
    }


    //============================================
    //  what we do section (chevron) and slide down
    //============================================    
    let bar = $('.what-we-do .content .bar');
    
    $(bar).on('click', function (e) {
        
        //getting the sibilibg's cheveron
        let siblingChev = $(this).parent().siblings('.skill').find('.cheveron');
        
        //slide toggle the text of the clicked element text
        $(this).next('.text').slideToggle().addClass('active');
        
        //slide up every slided down text
        $(this).parent().siblings('.skill').find('.text').slideUp();
        
        //toggle cheveron class of the clicked element
        $(this).find('.cheveron').toggleClass('cheveron-down cheveron-up');
        
        //check the other skills element to see if there 
        //is a slided down text in order to change the cheveron        
        if ($(siblingChev).hasClass('cheveron-up')) {
            
            $(this).parent().siblings('.skill').find('.cheveron.cheveron-up').toggleClass('cheveron-up cheveron-down')
        }
        
    });
    
    //============================================
    //  what we do section (slide section)
    //============================================    

    //getting the arrow
    let rightArrow = $('.speach-holder .right-arrow'),
        leftAroow  = $('.speach-holder .left-arrow');

    //slide to right with right arrow
    $(rightArrow).on('click', function () {
        //get the first speach
        let firstSpeach = $(this).siblings('ul').find('li').eq(0);

        //getting the active speach 
        var activeSpeach =  $(this).siblings('ul').find('li.active');

        //if the active speach is not the last one 
        if (!activeSpeach.is(':last-of-type')) {

            $(activeSpeach).fadeOut(400, function () {
                $(this).removeClass('active').next('li.one-speach').fadeIn().addClass('active');
            });
        
        //if it the last one 
        } else {

            $(activeSpeach).fadeOut(400, function () {
                $(this).removeClass('active');
                $(firstSpeach).fadeIn().addClass('active')
            });            
        }
    });

    //slide to the left with left arrow
    $(leftAroow).on('click', function () {
        //get the last speach
        let lastSpeach = $(this).siblings('ul').find('li').eq(-1);

        //getting the active speach 
        var activeSpeach =  $(this).siblings('ul').find('li.active');

        //if the active speach is not the last one 
        if (!activeSpeach.is(':first-of-type')) {

            $(activeSpeach).fadeOut(400, function () {
                $(this).removeClass('active').prev('li.one-speach').fadeIn().addClass('active');
            });
        
        // //if it the last one 
        } else {

            $(activeSpeach).fadeOut(400, function () {
                $(this).removeClass('active');
                $(lastSpeach).fadeIn().addClass('active')
            });            
        }
    });
    

    //===========================
    //include nice scroll plugin
    //===========================
    $("body").niceScroll({
        cursorcolor:"#95e1d3",
        cursorwidth:"16px",
        zindex: 10,
        mousescrollstep: 100,
        cursorborder: "1px solid #fff",
        cursorborderradius: "0px"
      });    
});
