'use strict';

(function($) {

    $.fn.simpleGauge = function(options) {

        // Defaults

        var defaults = {
            width: '250',
            hueLow: '1', // Choose the starting hue for the active color (for value 0)
            hueHigh: '128', // Choose the ending hue for the active color (for value 100)
            saturation: '100%', // Saturation for active color
            lightness: '50%', // Lightness for active color
            gaugeBG: '#fff', // Background color of Gauge
            parentBG: '#444' // This color should match the parent div of the gauge (or beyond)
        };

        var settings = $.extend({}, defaults, options);

        $(this).each(function() {

            // Color & Data Settings

            var value = $(this).data('value');
            var element = $(this);

            function doRotate(el, val) {
                if (val) {
                    $(el).find('.gauge-wrap-before').css('background', 'hsla(' + Math.round(lowColor) + ', ' + settings.saturation + ', ' + settings.lightness + ', 1)');
                    $(el).find('.gauge-active').css('background', 'linear-gradient(90deg, hsla(' + Math.round(activeColor) + ', ' + settings.saturation + ', ' + settings.lightness + ', 1),hsla(' + Math.round(lowColor) + ', ' + settings.saturation + ', ' + settings.lightness + ', 1))');
                    var angle = (150 * (val / 100)) + 100;
                    $(el).find('.indicator').css('transform', 'rotate(' + angle + 'deg)');
                } else {
                    $(el).find('.gauge-active, .gauge-wrap-before').hide();
                }

                $(el).find('.gauge-bg, .gauge-wrap-after').css('background-color', settings.gaugeBG);
                // $(el).find('.gauge-cap').css('background-color', settings.parentBG);

                // Fill Gauge to match value

                $(el).find('.gauge-active-wrap').css({
                    'transition': 'all 0.2s',
                    '-webkit-transform': 'rotate(' + (val * 1.8) + 'deg)',
                    '-moz-transform': 'rotate(' + (val * 1.8) + 'deg)',
                    '-ms-transform': 'rotate(' + (val * 1.8) + 'deg)',
                    '-o-transform': 'rotate(' + (val * 1.8) + 'deg)',
                    'transform': 'rotate(' + (val * 1.8) + 'deg)'
                });
            }

            $(this).on('valueChanged', function(event, v) {
                doRotate(element, v);
            });

            var activeColor = '';
            var lowColor = settings.hueLow;

            if (settings.hueHigh >= settings.hueLow) {
                activeColor = ((settings.hueHigh - settings.hueLow) * (value / 100)) + settings.hueLow;
            } else {
                activeColor = ((settings.hueLow - settings.hueHigh) * (value / 100)) + settings.hueHigh;
            }

            // Add DOM to allow for CSS3 Elements (would have been more elegant to use :before & :after pseudo-elements, but jQuery doesn't support them)

            $(this).prepend('<div class="gauge-wrap-before"></div><div class="gauge-core"><div class="gauge-bg"></div><div class="gauge-active-wrap"><div class="gauge-active"><div class="gauge-active-before"></div></div></div><div class="gauge-cap"><div class="indicator"></div>  </div></div><div class="gauge-wrap-after"></div>');

            var l = '';
            for(var i = 0; i < 24; i++){
                l = l + '<li></li>';
            }
            $('.gauge-cap').append('<ul>' + l + '</ul>');

            // Set Colors

            doRotate($(this), value);

        });

    };

})(jQuery);
