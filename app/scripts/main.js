$(function() {
    'use strict';

    $('.logo-dark').show();
    $('.logo-light').hide();

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
            $('.navbar-toggle').css('background-color', '#222');
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


    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    $('.gauge-wrap').simpleGauge();

    $('.last').mousemove(function() {
        var v = parseInt(getRandomArbitrary(30, 80));
        $('.gauge-wrap').delay(300).trigger('valueChanged', [v]);
    });


    $('.production-box-white').hide();

    $('.slick-slider').slick({
        dots: true,
        arrows: false,
        mobileFirst: true,
        autoplay: true,
        fade: true
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('.hero').css('background-image', 'url(images/slider/' + nextSlide + '.jpg)');
        if (nextSlide === 2) {
            $('.sub').css('color', 'white');
        } else {
            $('.sub').css('color', '#222');
        }
    });

    $('.testimonial-slider').slick({
        dots: true,
        arrows: false,
        mobileFirst: true,
        autoplay: true,
        fade: true
    });

    /**
     *  Quiz Logic Starts Here
     */

    $('#issue, #food, #share, #urge, #experience, #result').hide();
    $('.score-30, .score-50').hide();

    $('.next').each(function() {
        $(this).attr('disabled', 'disabled');
    });

    var answers = {};

    $('.age button').click(function() {
        $('#age .next').attr('disabled', null);
    });

    $('.issue button').click(function() {
        $('#issue .next').attr('disabled', null);
    });

    $('.food button').click(function() {
        $('#food .next').attr('disabled', null);
    });

    $('.experience button').click(function() {
        $('#experience .next').attr('disabled', null);
    });

    $('.share button').click(function() {
        $('#share .next').attr('disabled', null);
    });

    $('.urge button').click(function() {
        $('#urge .next').attr('disabled', null);
    });

    $('.next').click(function() {
        var current = $(this).parent().parent().attr('id');
        var destination = $(this).data('next');
        answers[current] = $('input[name=\'' + current + '\']:checked').val();
        $('#' + current).hide();
        $('#' + destination).show();
        console.log(answers);

        if (destination === 'result') {
            var results = [30, 50];
            var result = results[Math.floor(Math.random() * results.length)];
            $('#result').find('h3').append(result);
            $('.score-' + result).show();
            $('.box-clear').append('<div class="gauge-wrap result" data-value="50"></div>');
            $('.result').simpleGauge();
        }
    });

    $('.back').click(function() {
        var current = $(this).parent().parent().attr('id');
        var destination = $(this).data('back');
        answers[current] = $('input[name=\'' + current + '\']:checked').val();
        $('#' + current).hide();
        $('#' + destination).show();
    });

});
