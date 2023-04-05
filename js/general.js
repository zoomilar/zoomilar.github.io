typeof plugins === "undefined" ? plugins = {

    init: function () {


    },
    swipers: {

        index: new Swiper('.index-swiper', {
            loop: true,
            effect: "creative",
            creativeEffect: {
                prev: {
                    origin: "left center",
                    translate: ["-5%", 0, -200],
                    rotate: [0, 200, 0],
                },
                next: {
                    origin: "right center",
                    translate: ["5%", 0, -200],
                    rotate: [0, -200, 0],
                },
            },
            autoplay: {
                delay: 500000
            },
            slidesPerView: 1,
            spaceBetween: 0,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            pagination: {
                el: '.swiper-pagination',
                type: "progressbar",
                clickable: true
            },
            on: {
                init: function () {

                }
            },
            breakpoints: {
                320: {},
                768: {},
                1024: {},
                1280: {}
            }

            //effect: 'fade',
        }),
        logos: new Swiper('.logo-carusel', {
            loop: true,
            slidesPerView: 8,
            spaceBetween: 50,
            pauseOnMouseEnter: true,
            speed: 3000,
            autoplay: {
                delay: 0,
                disableOnInteraction: false
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            }
        }),
        projects: new Swiper(".projects", {
            grabCursor: true,
            effect: "creative",
            creativeEffect: {
                prev: {
                    shadow: true,
                    translate: [0, 0, -400],
                },
                next: {
                    translate: ["100%", 0, 0],
                },
            },
        })

    },
    buildMobile: new function () {

        mobileModules.init();

    },
    t: new function () {
        $('.t').t({
            blink: 1,
            speed_vary: true,
            mistype: true,
            speed: 10,
            delay: .1,
            caret: '_',
        });
    },
    accords: new function () {

        $('.accorditions-block .accord-toggler').on('click', function (event) {
            event.preventDefault();
            $(this).toggleClass('opened');
            $(this).next('.accord').toggle('slow');
        });

    }
} : false;

(function ($) {

    plugins.init()

})(jQuery);