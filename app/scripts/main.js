$(function() {
    'use strict';

    $('.logo-dark').show();
    $('.logo-light').hide();

    // var currentColor;

    $(document).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.chameleon-bar').addClass('scrolled');
            // $('.logo-dark').show();
            // $('.logo-light').hide();
            // $('.navbar-toggle').css('background-color', '#222');
        } else {
            $('.chameleon-bar').removeClass('scrolled');
            // $('.logo-light').show();
            // $('.logo-dark').hide();
            // $('.navbar-toggle').css('background-color', '#222');
        }
    });

    $('#offcanvas').on('shown.bs.offcanvas', function() {
        // currentColor = $('.navbar-toggle').css('background-color');
        $('.navbar-toggle').css('background-color', 'red');
        $('.navbar-toggle').find('i').removeClass('fa-bars').addClass('fa-times');
    });

    $('#offcanvas').on('hidden.bs.offcanvas', function() {
        $('.navbar-toggle').css('background-color', '#222');
        $('.navbar-toggle').find('i').removeClass('fa-times').addClass('fa-bars');
    });


    $('.gauge-wrap').simpleGauge();
    $('.production-box-white').hide();

    $('.slick-slider').slick({
        dots: true,
        arrows: false,
        mobileFirst: true
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('.hero').css('background-image', 'url(../images/slider/' + nextSlide + '.jpg)');
        if(nextSlide === 2){
            $('.sub').css('color', 'white');
        } else {
            $('.sub').css('color', '#222');
        }
    });
});
