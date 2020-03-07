(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

require('./components/ie-edge-detection.js');

require('./components/menu.js');

// import libs
// import cookieBar from './libs/cookieBar';
// import { CountUp } from './libs/CountUp.js';

var $header = $('#header');
var headerHeight = $header.outerHeight();

// import components

// import './components/smoothScroll.js';

// https://ehsangazar.com/optimizing-javascript-event-listeners-for-performance-e28406ad406c
function throttle(callback, limit) {
  var wait = false;
  return function () {
    if (!wait) {
      callback.apply(null, arguments);
      wait = true;
      setTimeout(function () {
        wait = false;
      }, limit);
    }
  };
}

// https://ehsangazar.com/optimizing-javascript-event-listeners-for-performance-e28406ad406c
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
        args = arguments;
    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

// init
// cookieBar.init({
//   // settings
//   // infoText: 'Soubory cookies nám pomáhají poskytovat, chránit a zlepšovat naše služby. Prohlížením tohoto webu s jejich používáním souhlasíte.',
//   // buttonText: 'Rozumím',
//   ipCheck: false,
// });

$('.lazy').Lazy({
  // your configuration goes here
  scrollDirection: 'vertical',
  effect: 'fadeIn',
  effectTime: 150,
  visibleOnly: true,
  threshold: 500,
  bind: 'event',
  onError: function onError(element) {
    console.log('error loading ' + element.data('src'));
  }
});

// Animations
setTimeout(function (e) {
  new WOW().init({
    offset: 300
  });
}, 500);

// ----------------------------------------
//  scroll to
function scrollTo(e) {
  e.preventDefault();

  var href = $.attr(this, 'href');
  if (typeof href === 'undefined') {
    href = $.attr(this, 'data-href');
  }
  href = href.replace('/', '');
  var offset = $.attr(this, 'data-offset');

  var $target = $(href);
  if ($target.length) {
    $('html,body').animate({
      scrollTop: $target.offset().top - headerHeight + (typeof offset !== 'undefined' ? parseInt(offset) : 10)
    }, {
      duration: 500,
      easing: 'swing'
    });
  }
}

// ----------------------------------------

// scripts here
// flash
setTimeout(function (e) {
  $('.flash').addClass('active');
}, 1000);

$('.flash__close').on('click', function (e) {
  $(this).closest('.flash').removeClass('active');
});

// bounce rate event
// var stayOnPage = 10000;
// setTimeout(function(e) {
//   var label = 'na webu alespoň ' + (stayOnPage / 1000) + 's';
//   gtag('event', 'bounce rate fix', {'event_category': 'navstevnik','event_label': label});
// }, stayOnPage);


// gallery
$('#gallery').slick({
  lazyLoad: 'ondemand',
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
  dots: false
});

// Numbers animation
// if ($('.page--homepage').length) {
//   var waypointNumbers = new Waypoint({
//     element: document.getElementById('numbers'),
//     handler: function(direction) {

//       // numbers
//       var objs = [];
//       var $numbers = $('.number__value:not(.number__value--notAnimated)');
//       for (var i = 0; i < $numbers.length; i++) {
//         var id = $($numbers[i]).attr('id');
//         var val = parseInt($($numbers[i]).attr('data-value'));
//         var duration = parseInt($($numbers[i]).attr('data-duration'));
//         var delay = parseInt($($numbers[i]).attr('data-delay'));

//         objs.push(new CountUp(id, val, {
//           duration: duration / 1000,
//           separator: ' ',
//           delay: delay,
//         }));
//       }

//       // first number
//       setTimeout(function(e) {
//         objs[0].start(function(e) {
//           $(this.el).addClass('done');
//         });
//       }, objs[0].options.delay);

//       // second number
//       setTimeout(function(e) {
//         objs[1].start(function(e) {
//           $(this.el).addClass('done');
//         });
//       }, objs[1].options.delay);

//       // // third number
//       // setTimeout(function(e) {
//       //   objs[2].start();
//       // }, objs[2].options.delay);

//       // // fourth number
//       // setTimeout(function(e) {
//       //   objs[3].start();
//       // }, objs[3].options.delay);

//       this.destroy();
//     },
//     offset: 250
//   });
// }


// init controller
if ($('.page--homepage').length) {
  var controller = new ScrollMagic.Controller();

  var scene = new ScrollMagic.Scene({ triggerElement: "#Phospholipid", duration: 200, offset: 0, triggerHook: .05 }).setPin("#Phospholipid")
  // .addIndicators({name: "PIN"})
  .addTo(controller);

  // scale
  var scene1 = new ScrollMagic.Scene({ triggerElement: "#Phospholipid", duration: 600, offset: -600, triggerHook: .05 }).setTween("#handCapsule", { scale: 0 })
  // .addIndicators({name: "SCALE"})
  .addTo(controller);

  // opacity
  var scene2 = new ScrollMagic.Scene({ triggerElement: "#Phospholipid", duration: 35, offset: -125, triggerHook: .05 }).setTween("#handCapsule", { opacity: 0 })
  // .addIndicators({name: "OPACITY"})
  .addTo(controller);

  // Box and tooltips animation
  var waypointAbout = new Waypoint({
    element: document.getElementById('about'),
    handler: function handler(direction) {

      console.log('about');

      var $sectionAbout = $('#about');
      $sectionAbout.addClass('active');

      // First tooltip
      setTimeout(function () {
        $sectionAbout.find('.boxInfo__tooltip--1').addClass('active');
      }, 500);

      // Second tooltip
      setTimeout(function () {
        $sectionAbout.find('.boxInfo__tooltip--2').addClass('active');
      }, 800);

      // Third tooltip
      setTimeout(function () {
        $sectionAbout.find('.boxInfo__tooltip--3').addClass('active');
      }, 1100);

      // Forth tooltip
      setTimeout(function () {
        $sectionAbout.find('.boxInfo__tooltip--4').addClass('active');
      }, 1400);

      this.destroy();
    },
    offset: 500
  });
}

},{"./components/ie-edge-detection.js":2,"./components/menu.js":3}],2:[function(require,module,exports){
'use strict';

// https://codepen.io/gapcode/pen/vEJNZN
;(function ($) {

      "use strict";

      // Get IE or Edge browser version

      var version = detectIE();

      if (version !== false) {
            $('html').addClass('ie');
      }

      // add details to debug result
      // document.getElementById('details').innerHTML = window.navigator.userAgent;

      /**
       * detect IE
       * returns version of IE or false, if browser is not Internet Explorer
       */
      function detectIE() {
            var ua = window.navigator.userAgent;

            // Test values; Uncomment to check result …

            // IE 10
            // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

            // IE 11
            // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

            // Edge 12 (Spartan)
            // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

            // Edge 13
            // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

            var msie = ua.indexOf('MSIE ');
            if (msie > 0) {
                  // IE 10 or older => return version number
                  return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
            }

            var trident = ua.indexOf('Trident/');
            if (trident > 0) {
                  // IE 11 => return version number
                  var rv = ua.indexOf('rv:');
                  return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
            }

            var edge = ua.indexOf('Edge/');
            if (edge > 0) {
                  // Edge (IE 12+) => return version number
                  return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
            }

            // other browser
            return false;
      }
})(jQuery);

},{}],3:[function(require,module,exports){
'use strict';

// mobile menu scripts
;(function ($) {

  "use strict";

  // https://ehsangazar.com/optimizing-javascript-event-listeners-for-performance-e28406ad406c

  function throttle(callback, limit) {
    var wait = false;
    return function () {
      if (!wait) {
        callback.apply(null, arguments);
        wait = true;
        setTimeout(function () {
          wait = false;
        }, limit);
      }
    };
  }

  // https://medium.com/@mariusc23/hide-header-on-scroll-down-show-on-scroll-up-67bbaae9a78c
  // Hide Header on on scroll down
  var lastScrollTop = 0;
  var delta = 5;
  var $header = $('#header');
  var headerHeight = $header.outerHeight();

  window.addEventListener('scroll', throttle(hasScrolled, 100));

  function hasScrolled(scrollEvent) {
    var st = window.pageYOffset;

    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta) return;

    // on homepage
    // if ($('.page--homepage').length) {
    //   if (st > 100) {
    //     $header.removeClass('header--transparent');

    //   }
    //   else {
    //     $header.addClass('header--transparent');
    //   }
    // }

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > headerHeight) {
      // Scroll Down
      $header.removeClass('header--down').addClass('header--up');
    } else {
      // Scroll Up
      if (st + $(window).height() < $(document).height()) {
        $header.removeClass('header--up').addClass('header--down');
      }
    }

    lastScrollTop = st;
  }

  // burger
  $('.nav__toggle').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('is-active');
    $('body').toggleClass('menu-active');
  });

  $('.nav__item').on('click', function (e) {
    $('.nav__toggle').removeClass('is-active');
    $('body').removeClass('menu-active');
  });

  var waypointResizeMenu = new Waypoint({
    element: document.getElementsByTagName('body'),
    handler: function handler(direction) {
      $header.addClass('header--compact');
      if (direction == 'up') {
        $header.removeClass('header--compact');
      }
    },
    offset: -300
  });

  var waypointBgMenu = new Waypoint({
    element: document.getElementsByTagName('body'),
    handler: function handler(direction) {
      $header.addClass('header--bg');
      if (direction == 'up') {
        $header.removeClass('header--bg');
      }
    },
    offset: -50
  });
})(jQuery);

},{}]},{},[1])

//# sourceMappingURL=main.js.map
