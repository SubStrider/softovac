$(function() {
    'use strict';

    $('.logo-dark').hide();

    var currentColor;

    $(document).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.chameleon-bar').addClass('scrolled');
            $('.logo-dark').show();
            $('.logo-light').hide();
            $('.navbar-toggle').css('background-color', '#222');
        } else {
            $('.chameleon-bar').removeClass('scrolled');
            $('.logo-light').show();
            $('.logo-dark').hide();
            $('.navbar-toggle').css('background-color', 'transparent');
        }
    });

    $('#offcanvas').on('shown.bs.offcanvas', function() {
        currentColor = $('.navbar-toggle').css('background-color');
        $('.navbar-toggle').css('background-color', 'red');
        $('.navbar-toggle').find('i').removeClass('fa-bars').addClass('fa-times');
    });

    $('#offcanvas').on('hidden.bs.offcanvas', function() {
        $('.navbar-toggle').css('background-color', currentColor);
        $('.navbar-toggle').find('i').removeClass('fa-times').addClass('fa-bars');
    });


    $('.gauge-wrap').simpleGauge();
});
