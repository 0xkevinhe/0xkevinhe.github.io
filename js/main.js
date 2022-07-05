(function ($) {
    // To top button
    $("#back-to-top").on('click', function () {
        $('body, html').animate({ scrollTop: 0 }, 600);
    });

    // Nav bar toggle
    $('#main-nav-toggle').on('click', function () {
        $('.nav-container-inner').slideToggle();
    });

    // Caption
    $('.article-entry').each(function(i) {
        $(this).find('img').each(function() {
            if (this.alt && !(!!$.prototype.justifiedGallery && $(this).parent('.justified-gallery').length)) {
                $(this).after('<span class="caption">' + this.alt + '</span>');
            }

            // 对于已经包含在链接内的图片不适用lightGallery
            if ($(this).parent().prop("tagName") !== 'A') {
                $(this).wrap('<a href="' + this.src + '" title="' + this.alt + '" class="gallery-item"></a>');
            }
        });

    });

    // fix katex-display on mobile
    $('.article-entry').each(function(i) {
        $('.katex-display').attr("style", "overflow-x: auto; overflow-y: hidden");
    });



    if (typeof lightGallery != 'undefined') {
        var options = {
            selector: '.gallery-item',
        };
        $('.article-entry').each(function(i, entry) {
            lightGallery(entry, options);
        });
        lightGallery($('.article-gallery')[0], options);
    }
    if (!!$.prototype.justifiedGallery) {  // if justifiedGallery method is defined
        var options = {
            rowHeight: 140,
            margins: 4,
            lastRow: 'justify'
        };
        $('.justified-gallery').justifiedGallery(options);
    }

    // Sidebar expend
    $('#sidebar .sidebar-toggle').on('click', function () {
        if($('#sidebar').hasClass('expend')) {
            $('#sidebar').removeClass('expend');
        } else {
            $('#sidebar').addClass('expend');
        }
    });


    // Remove extra main nav wrap
    $('.main-nav-list > li').unwrap();

    // Highlight current nav item
    $('#main-nav > li > .main-nav-list-link').each(function () {
        if($('.page-title-link').length > 0){
            if ($(this).html().toUpperCase() == $('.page-title-link').html().toUpperCase()) {
                $(this).addClass('current');
            } else if ($(this).attr('href') == $('.page-title-link').attr('data-url')) {
                $(this).addClass('current');
            }
        }
    });

    // Auto hide main nav menus
    function autoHideMenus(){
        var max_width = $('.nav-container-inner').width() - 10;
        var main_nav_width = $('#main-nav').width();
        var sub_nav_width = $('#sub-nav').width();
        if (main_nav_width + sub_nav_width > max_width) {
            // If more link not exists
            if ($('.main-nav-more').length == 0) {
                $(['<li class="main-nav-list-item top-level-menu main-nav-more">',
                    '<a class="main-nav-list-link" href="javascript:;">More</a>',
                    '<ul class="main-nav-list-child">',
                    '</ul></li>'].join('')).appendTo($('#main-nav'));
                // Bind hover event
                $('.main-nav-more').hover(function () {
                    if($(window).width() < 480) {
                        return;
                    }
                    $(this).children('.main-nav-list-child').slideDown('fast');
                }, function () {
                    if($(window).width() < 480) {
                        return;
                    }
                    $(this).children('.main-nav-list-child').slideUp('fast');
                });
            }
            var child_count = $('#main-nav').children().length;
            for (var i = child_count - 2; i >= 0; i--) {
                var element = $('#main-nav').children().eq(i);
                if (main_nav_width + sub_nav_width > max_width) {
                    element.prependTo($('.main-nav-more > ul'));
                    main_nav_width = $('#main-nav').width();
                } else {
                    return;
                }
            }
        }
        // Nav bar is wide enough
        if ($('.main-nav-more').length > 0) {
            $('.main-nav-more > ul').children().appendTo($('#main-nav'));
            $('.main-nav-more').remove();
        }
    }
    autoHideMenus();

    $(window).on('resize', function () {
        autoHideMenus();
    });

    // Fold second-level menu
    $('.main-nav-list-item').hover(function () {
        if ($(window).width() < 480) {
            return;
        }
        $(this).children('.main-nav-list-child').slideDown('fast');
    }, function () {
        if ($(window).width() < 480) {
            return;
        }
        $(this).children('.main-nav-list-child').slideUp('fast');
    });

    // Add second-level menu mark
    $('.main-nav-list-item').each(function () {
        if ($(this).find('.main-nav-list-child').length > 0) {
            $(this).addClass('top-level-menu');
        }
    });

    $(function() {
        var totop = $("#totop"),
          canvas = $("#totop-canvas"),
          percent = $("#totop-percent"),
          width = canvas.width(),
          height = canvas.height(),
          center = width / 2,
          radius = parseInt((width - 3) / 2),
          ctx = canvas[0].getContext("2d");

        function drawCircle(color, percent) {
            ctx.beginPath();
            ctx.arc(center, center, radius, - Math.PI / 2, Math.PI * 1.5 * percent, false);
            ctx.strokeStyle = color;
            ctx.lineCap = "round"; // butt, round or square
            ctx.lineWidth = 3;
            ctx.stroke();
        }

        totop.click(function() {
            $("body, html").animate({
                scrollTop: 0
            }, 800);
        });

        $(window).scroll(function() {
            var docHeight = $(document).height() - $(window).height(),
              scrollTop = $(window).scrollTop(),
              per = parseInt(scrollTop / docHeight * 100);
            if (scrollTop >= 200) {
                totop.addClass("display");
                ctx.clearRect(0, 0, width, height);
                drawCircle("#efefef", 1);
                drawCircle("#9260f5", per/100);
            } else {
                totop.removeClass("display");
            }
            percent.attr("data-percent", per);
        });
    });

    var segs = [];
    $('.nav-item').each(function(idx, node) {
        segs.push(node);
        var link = $('<a></a>').attr('href', '#' + $(node).attr("name")).html($(node).children("h1").html())
        if(!idx){
            link.addClass('active');
        }
        var row = $('<li></li>').append(link);
        $("#toc ul").append(row);
    });

    $(document).ready(function(){
        $("ul.sidebar-nav li.sidebar-nav-overview").click(function(){
            $('li.sidebar-nav-overview').addClass('active');
            $('.post-toc-wrap').hide();
            $('.site-overview-wrap').show();
        })

        $("ul.sidebar-nav li:first").click(function(){
            $('li.sidebar-nav-overview').removeClass('active');
            $('.post-toc-wrap').show();
            $('.site-overview-wrap').hide();
        })
    })

    $(window).bind("scroll", function() {
        var scrollTop = $(this).scrollTop();
        var topSeg = null;
        for (var idx in segs) {
            var seg = segs[idx];
            if (seg.offsetTop > scrollTop) {
                continue
            }
            if (!topSeg) {
                tpoSeg = seg;
            } else if (seg.offsetTop >= topSeg.offsetTop) {
                tpoSeg = seg;
            }
            if (topSeg) {
                $('#toc a').removeClass("active");
                var link = "#" + $(topSeg).attr(name);
                console.log('#toc a[href=]"' + link + '"]');
                $('#toc a[href=]"' + link + '"]').addClass('active');
            }
        }
    });

    $(document).ready(function() {

        function initScrollSpy() {
            var tocSelector = '.post-toc';
            var $tocElement = $(tocSelector);
            var activeCurrentSelector = '.active-current';

            function removeCurrentActiveClass() {
                $(tocSelector + ' ' + activeCurrentSelector)
                  .removeClass(activeCurrentSelector.substring(1));
            }

            $tocElement
              .on('activate.bs.scrollspy', function() {
                  var $currentActiveElement = $(tocSelector + ' .active').last();

                  removeCurrentActiveClass();
                  $currentActiveElement.addClass('active-current');

                  // Scrolling to center active TOC element if TOC content is taller then viewport.
                  $tocElement.scrollTop($currentActiveElement.offset().top - $tocElement.offset().top + $tocElement.scrollTop() - ($tocElement.height() / 2));
              })
              .on('clear.bs.scrollspy', removeCurrentActiveClass);

            $('body').scrollspy({ target: tocSelector });
        }

        initScrollSpy();
    });

    $(document).ready(function() {
        var html = $('html');
        var TAB_ANIMATE_DURATION = 200;
        var hasVelocity = $.isFunction(html.velocity);

        $('.sidebar-nav li').on('click', function () {
            var item = $(this);
            var activeTabClassName = 'sidebar-nav-active';
            var activePanelClassName = 'sidebar-panel-active';
            if (item.hasClass(activeTabClassName)) {
                return;
            }

            var currentTarget = $('.' + activePanelClassName);
            var target = $('.' + item.data('target'));

            hasVelocity
              ? currentTarget.velocity('transition.slideUpOut', TAB_ANIMATE_DURATION, function () {
                  target
                    .velocity('stop')
                    .velocity('transition.slideDownIn', TAB_ANIMATE_DURATION)
                    .addClass(activePanelClassName);
              })
              : currentTarget.animate({opacity: 0}, TAB_ANIMATE_DURATION, function () {
                  currentTarget.hide();
                  target
                    .stop()
                    .css({'opacity': 0, 'display': 'block'})
                    .animate({opacity: 1}, TAB_ANIMATE_DURATION, function () {
                        currentTarget.removeClass(activePanelClassName);
                        target.addClass(activePanelClassName);
                    });
              });

            item.siblings().removeClass(activeTabClassName);
            item.addClass(activeTabClassName);
        });

        // TOC item animation navigate & prevent #item selector in adress bar.
        // $('.post-toc a').on('click', function (e) {
        //     e.preventDefault();
        //     var targetSelector = Hueman.util.escapeSelector(this.getAttribute('href'));
        //     var offset = $(targetSelector).offset().top;
        //
        //     hasVelocity
        //       ? html.velocity('stop').velocity('scroll', {
        //           offset: offset + 'px',
        //           mobileHA: false
        //       })
        //       : $('html, body').stop().animate({
        //           scrollTop: offset
        //       }, 500);
        // });

    });



})(jQuery);
