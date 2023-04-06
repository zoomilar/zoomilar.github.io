var mobileModules = '';
(function ($) {

    $(function () {
        /**/
    });

    mobileModules = {

        init: function(){

            mobileModules.detect_smallest_rez();
            mobileModules.smart_vers();
            mobileModules.desktop_v_switcher();

        },
        xs_functions: function () {

            $("table.special").each(function (i) {
                var table = $(this);
                $(this).find('tbody > *').each(function (c) {
                    $(this).find('>td').each(function (d) {
                        console.log(d);
                        $(this).attr('data-label', table.find('thead>*>th').eq(d).text());
                    });
                });
            });

            mob_elemets_collector = function (selectors) {
                var value = '';
                $.each(selectors, function (i, val) {
                    $(val).each(function (i, val) {
                        if ($(val).html()) {
                            var html_tag = $(val).prop('tagName');
                            var class_attr = $(val).attr('class');
                            value = value + "<" + html_tag + " class='" + class_attr + "'>" + $(val).html() + "</" + html_tag + ">";
                        }
                    });
                });
                return value;
            };

            collect_from_json = function (json) {
                variable = '';
                $.each(json, function (i, val) {
                    variable = variable + '<div class="' + val.class + '">' + val.before_content + mob_elemets_collector(val.content) + val.after_content + '</div>'
                });
                return variable;
            };

            mobile_data_json = {

                mob_nav_collection_structure: [
                    {
                        class: 'mob_nav_header',
                        before_content: '<div class="mob-top-icons">',
                        content: [
                            '.mob-nav-top-line'
                        ],
                        after_content: '</div>'
                    },
                    {
                        class: 'mob_nav_menus',
                        before_content: '',
                        content: [
                            '.main-menu'
                        ],
                        after_content: ''
                    }
                ],

                mob_header_structure: [
                    {
                        class: 'mob-header-items',
                        before_content: '',
                        content: [

                        ],
                        after_content: ''
                    }
                ],

                mob_search_structure: [
                    {
                        class: 'mob-search',
                        before_content: '',
                        content: [
                            '.finding-search'
                        ],
                        after_content: ''
                    }
                ]

            };

            $('.mob_nav_container, .mob_header_extention, .mob-search-container').remove();

            mob_nav_collection = collect_from_json(mobile_data_json['mob_nav_collection_structure']);
            mob_header_collection = collect_from_json(mobile_data_json['mob_header_structure']);
            mob_search_collection = collect_from_json(mobile_data_json['mob_search_structure']);

            $('#page').before('<div class="mob_nav_container">' + mob_nav_collection + '</div>');
            $('#page header').append('<div class="mob_header_extention hide">' + mob_header_collection + '</div>');
            $('#page header').before('<div class="mob-search-container hide">' + mob_search_collection + '</div>');

            $('.langs-select select').on('change', function () {
                var value = $(this).val();
                window.location.href = value;
            });

            $('.mob_search a').on('click', function (event) {
                event.preventDefault();
                $('.mob-search-container').toggleClass('opened')
            });

            $('div.mob_nav_container ul.main-menu ul').each(function () {
                $(this).prev('a').append('<i class="fal fa-plus"></i>')
            });

            $('div.mob_nav_container ul.main-menu .fa').parent('a').on('click', function (event) {
                var obj = $(this).parent('li');
                if (!obj.hasClass('no-mob-toggle')) {
                    event.preventDefault();
                    $(this).parent('li').toggleClass('selected');
                } else {
                    //alert('go to link')
                }
            });

            $('header, .mob-search-container')
                .removeClass('mob-position-fixed')
                .removeClass('mob-position-relative')
                .addClass('mob-position-' + $('header').css('position'));

        },
        sm_functions: function () {

            //sm_functions(); /*Skip SM*/
            mobileModules.xs_functions();

        },
        md_functions: function () {
            //sm_functions(); /*Skip MD*/
            mobileModules.xs_functions();
        },
        lg_functions: function () {

        },
        xlg_functions: function () {

        },
        detect_smallest_rez: function () {

            const w = $(window).width();

            if (w <= 567) {
                status = 'xs';
                if (resolution_status != status) {
                    resolution_status = status;
                    if (!$('html').hasClass('no-responsive')) {
                        mobileModules.xs_functions();
                    }
                }
            } else if (w >= 568 && w <= 767) {
                status = 'sm';
                if (resolution_status != status) {
                    resolution_status = status;
                    if (!$('html').hasClass('no-responsive')) {
                        mobileModules.sm_functions();
                    }
                }
            } else if (w >= 768 && w <= 1023) {
                status = 'md';
                if (resolution_status != status) {
                    resolution_status = status;
                    if (!$('html').hasClass('no-responsive')) {
                        mobileModules.md_functions();
                    }
                }
            } else if (w >= 1024 && w <= 1279) {
                status = 'lg';
                if (resolution_status != status) {
                    resolution_status = status;
                    mobileModules.lg_functions();
                }
            } else if (w >= 1280) {
                status = 'xlg';
                if (resolution_status != status) {
                    resolution_status = status;
                    mobileModules.xlg_functions();
                }
            }

        },
        desktop_v_switcher: function () {

            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            } else {
                $('meta[name="viewport"]').attr('content', 'width=1360')
            }

        },
        smart_vers: function () {

            $(window).on('resize', function () {
                mobileModules.detect_smallest_rez();
            });

            $('a.logo').after('<a class="smart_menu_caller"><i class="fal fa-bars"></i><i class="fal fa-times"></i></a>');

            $('a.smart_menu_caller').on('click', function (event) {
                event.preventDefault();
                $('body').toggleClass('mob_menu_opened');
            });

            $('.mobile-menu-toggler').on('click', function (event) {
                event.preventDefault();
                $(this).toggleClass('opened');
                $(this).next('ul').toggleClass('opened');
            });

        }

    };

    var resolution_status;

})(jQuery);
