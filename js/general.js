typeof plugins === "undefined" ? plugins = {

    init: function () {

        this.cookieNotice.init()

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
            },
            breakpoints: {
                320: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                480: {
                    slidesPerView: 3,
                    spaceBetween: 30
                },
                640: {
                    slidesPerView: 4,
                    spaceBetween: 40
                },
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 50
                },
                1276: {
                    slidesPerView: 6,
                    spaceBetween: 50
                },
                1500: {
                    slidesPerView: 8,
                    spaceBetween: 50
                }
            }
        }),
        projects: new Swiper(".projects", {
            loop: true,
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
            on: {
                beforeInit: function () {
                    (typeof pagination_el === "undefined") ? pagination_el = $('.project-list').clone() : '';
                }
            },
            speed: 1000,
            autoplay: {
                delay: 5000
            },
            pagination: {
                el: ".project-list",
                clickable: true,
                bulletClass: 'custom-bullet',
                bulletActiveClass: 'selected',
                renderBullet: function (index, className) {
                    let ggg = pagination_el.children('div')[index];
                    ggg.classList.add(className);
                    let miau = ggg.outerHTML
                    return miau;
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

    },
    nav: new function () {

        let waypoints = [];
        $('ul.main-menu a').each(function (i, el) {
            let id = $(el).attr('href');
            waypoints[i] = new Waypoint.Inview({
                element: $(id)[0],
                enter: function (direction) {

                    if (direction == 'up') {
                        $('ul.main-menu > li').removeClass('selected');
                        $('ul.main-menu > li > a[href="#' + this.element.id + '"]').parent('li').addClass('selected')
                    }

                },
                exit: function (direction) {

                    if (direction == 'down') {
                        $('ul.main-menu > li').removeClass('selected');
                        $('ul.main-menu > li > a[href="#' + this.element.id + '"]').parent('li').addClass('selected')
                    }


                }
            })
        });

        $(document).on('click', '.main-menu a, .logo', function (e) {
            e.preventDefault();
            var id = $(this).attr('href');
            if ($(id).length > 0) {
                var position = $(id).offset().top;
                if ($(window).width() < 768) {
                    position = position - 70;
                }
                $('html, body').animate({scrollTop: position}, 'slow', 'swing');
                return false;
            }
        })

    },
    cookieNotice: {

        init: function () {

            const cookie_status = localStorage.getItem('cookieNotice');
            if (!cookie_status) {
                plugins.cookieNotice.notice.show();
            }

            $('[data-accept]').on('click', function () {
                plugins.cookieNotice.accept(this)
            });

        },
        accept: function (obj) {

            if ($(obj).attr('data-accept') == 'all') {
                $('.cookies-selection input').prop("checked", true);
            }
            let selection = $('.cookies-selection input').serializeArray();
            if (selection.length == 0) {
                selection = 'only required';
            }
            localStorage.setItem('cookieNotice', selection);
            plugins.cookieNotice.notice.hide();

        },
        notice: {

            show: function () {

                $('section.cookies').addClass('visible')

            },
            hide: function () {

                $('section.cookies').removeClass('visible')

            }

        }

    },
    inputs: new function () {

        $('[type="checkbox"], [type="radio"]').each(function (i, el) {

            var type = $(el).attr('type');
            $(el).wrap('<label class="styled_' + type + '"></label>').after('<i></i>');

        })

    }
} : false;

(function ($) {

    plugins.init()

})(jQuery);