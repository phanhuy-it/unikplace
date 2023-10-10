'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var contentPage = $('.content-page'),
    header = $('.header'),
    bottomNav = $('.bottom-navigation-wrapper'),
    mobileNav = $('.mobile-navigation');

var Theme =
/*#__PURE__*/
function () {
  function Theme() {// this.elements = {
    // 	contentPage : $('.content-page'),
    // 	header : $('.header'),
    // 	bottomNav : $('.bottom-navigation-wrapper'),
    // };

    _classCallCheck(this, Theme);
  }

  _createClass(Theme, [{
    key: "baseConfig",
    value: function baseConfig() {
      $('[data-toggle="tooltip"]').tooltip({
        'trigger': 'hover'
      }); // Scroll to element

      $('.scroll-to-element').on('click', function () {
        event.preventDefault();
        var offsetTop = $(this).data('offset-top') !== undefined ? $(this).data('offset-top') : 0;
        $('html, body').animate({
          scrollTop: $($.attr(this, 'href')).offset().top - offsetTop
        }, 500);
      });
      $('body').on("click", '[data-action="toggle-list"]', function (e) {
        var item = $(this).closest('.item'),
            subitem = item.find('.subitem');
        subitem.stop().slideToggle();
      });
      $('body').on('mousedown touchstart', function (e) {
        if ($(e.target).closest("[data-toggle='dropdown'], .dropdown-menu").length === 0) {
          if ($(".dropdown-menu").hasClass('show')) {
            $(".dropdown-menu").removeClass('show');
          }
        }
      });
      $('body').on("click", '.dropdown-menu [data-toggle="dropdown"]', function (e) {
        e.stopPropagation();
        $(this).next().toggleClass('show');
      });
      $('body').on("click", '[data-toggle="dropdown"]', function (e) {
        if ($(this).attr('aria-expanded') === "true") {
          if ($(this).next('.dropdown-menu').find('.dropdown-menu.show').length) {
            $(this).next('.dropdown-menu').find('.dropdown-menu.show').removeClass('show');
          }
        }
      });
    }
  }, {
    key: "homeTransparentHeader",
    value: function homeTransparentHeader() {
      // if (window.innerWidth > 991){
      var btn = header.find('.customize-btn');
      $(window).scroll(function () {
        var scroll = $(this).scrollTop();

        if (scroll > sectionBannerImg.outerHeight(true) - header.outerHeight(true)) {
          header.addClass('is-light').removeClass('is-dark');
          btn.removeClass('btn-outline-white--transparent').addClass('btn-brand');
        } else {
          header.addClass('is-dark').removeClass('is-light');
          btn.removeClass('btn-brand').addClass('btn-outline-white--transparent');
        }

        scroll > sectionBannerImg.outerHeight(true) / 3 - header.outerHeight(true) ? $('.float-game-btn').removeClass('is-light') : $('.float-game-btn').addClass('is-light');
      }); // }
    }
  }, {
    key: "photoswipeInit",
    value: function photoswipeInit(container, thumbnails, data, $callback) {
      var $pswp = document.querySelectorAll('.pswp')[0],
          $container = document.querySelectorAll(container)[0],
          galleryTitle = $pswp.querySelector('.gallery-title'),
          categoryTitle = $pswp.querySelector('.category-title'),
          thumbnailTitle = $pswp.querySelector('.thumbnail-title'),
          colorsBox = $pswp.querySelector('.choose-color-wrapper'); // Render Image Attribute

      var renderAttribute = function renderAttribute(data, currentIndex, pswp) {
        /**
         * @inheritDoc
         */
        function magicColorContainer(elmt) {
          var pswpContainerCss = $(elmt).closest('.pswp').find('.pswp__container').css('transform').replace('-', '').split(', ');
          return pswpContainerCss[4];
        }
        /**
         * [parseAttribute description]
         * @param  {[type]} pswp         [description]
         * @param  {[type]} currentIndex [description]
         * @return {[type]}              [description]
         */


        function parseAttribute(pswp, currentIndex) {
          // Parse Title
          galleryTitle.innerHTML = data[currentIndex].title.gallery;
          categoryTitle.innerHTML = data[currentIndex].title.category;
          thumbnailTitle.innerHTML = data[currentIndex].title.thumbnail; // Parse Color and Image

          for (var x in data[currentIndex].colors) {
            var color = data[currentIndex].colors[x][0],
                img = data[currentIndex].colors[x][1];
            colorsBox.insertAdjacentHTML('beforeend', "\n\t\t\t\t\t\t<div class=\"item-multi\" data-hover-img=\"".concat(img, "\" style=\"background-image: url(").concat(color, ");\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t"));
          } // Hover Color Box
          // colorsBox.querySelectorAll('.item-multi').forEach((element, elementIndex)=> {
          // 	pswp.ui.update();
          // 	var changeImg = function() {
          // 		let img = this.getAttribute('data-hover-img');
          // 		this.parentNode.querySelectorAll('.item-multi').forEach((el)=> el.classList.remove('active'));
          // 		this.classList.add('active');
          // 		pswp.updateSize(true);
          // 		let rootCss = magicColorContainer(this)
          // 		this.closest('.pswp').querySelectorAll('.pswp__item').forEach( (elmt) => {
          // 			let firstChildCss = $(elmt).css('transform').replace('-', '').split(', ')[4];
          // 			if ( rootCss == firstChildCss) {
          // 				elmt.querySelector('img').setAttribute('src', img)		
          // 			}
          // 		})
          // 	}
          // 	element.addEventListener('mouseover', changeImg, false);
          // 	element.addEventListener('click', changeImg, false);
          // });

          /**
           * Call action
           */


          if (_typeof($callback) === (typeof Function === "undefined" ? "undefined" : _typeof(Function))) {
            $callback(data, currentIndex, pswp);
          }
        }

        parseAttribute(pswp, currentIndex);

        function customButton() {
          $pswp.querySelectorAll('.pswp__top-bar a.btn.prevent').forEach(function (element, index) {
            element.addEventListener('click', function (e) {
              e.preventDefault();
              var event = document.createEvent('HTMLEvents');
              event.initEvent('click', true, false);
              e.target.tagName == 'I' && this.dispatchEvent(event);
            });
          });
        }

        customButton();
        pswp.listen('destroy', function () {// while(colorsBox.firstChild)
          // 	colorsBox.removeChild(colorsBox.firstChild);
        });
        pswp.listen('afterChange', function () {
          // while(colorsBox.firstChild)
          // 	colorsBox.removeChild(colorsBox.firstChild);
          parseAttribute(pswp, pswp.getCurrentIndex());
          customButton();
        });
      }; // Open Photoswipe from URL


      var openFromURL = function openFromURL() {
        var hash = window.location.hash.substring(1);

        if (hash.includes('gid') && hash.includes('pid')) {
          var vars = hash.split('&').slice(1, 3),
              gid = vars[0].substring(4),
              pid = vars[1].substring(4),
              options = {
            arrowEl: true,
            bgOpacity: 0.9,
            index: parseInt(pid.split('-').pop()),
            galleryUID: gid
          };
          var gallery = new PhotoSwipe($pswp, PhotoSwipeUI_Default, data, options);
          gallery.init();
          renderAttribute(data, options.index, gallery);
        }
      };

      var thumbnailsOnClick = function thumbnailsOnClick(e) {
        e.preventDefault();
        var $this = e.currentTarget,
            thumbnail = $this,
            options = {
          arrowEl: true,
          bgOpacity: 0.9,
          index: parseInt($this.getAttribute('data-img-index')),
          getThumbBoundsFn: function getThumbBoundsFn(index) {
            // get window scroll Y
            var pageYScroll = window.pageYOffset || document.documentElement.scrollTop; // optionally get horizontal scroll
            // get position of element relative to viewport

            var rect = thumbnail.getBoundingClientRect(); // w = width

            return {
              x: rect.left,
              y: rect.top + pageYScroll,
              w: rect.width
            };
          }
        };
        var gallery = new PhotoSwipe($pswp, PhotoSwipeUI_Default, data, options);
        gallery.init();
        renderAttribute(data, options.index, gallery);
      }; // Loop Gallerys


      $container.querySelectorAll(thumbnails).forEach(function (thumbnail, thumbnailIndex) {
        thumbnail.onclick = function (e) {
          thumbnailsOnClick(e);
        };
      }); // openFromURL();
    }
  }, {
    key: "navigationCofig",
    value: function navigationCofig() {
      $('.search-box-mobile a').on('click', function (e) {
        e.preventDefault();
        $('.search-box-mobile-content').toggleClass('open');
      });
      $('.search-box-mobile-content .close-search-box').on('click', function (e) {
        e.preventDefault();
        console.log($(this).closest('.search-box-mobile-content'));
        $(this).closest('.search-box-mobile-content').removeClass('open');
      });

      function autoHideNav(nav) {
        var c,
            currentScrollTop = 0,
            navbar = nav;
        $(window).scroll(function () {
          var a = $(window).scrollTop();
          var b = navbar.height();
          currentScrollTop = a;

          if (c < currentScrollTop && a > b + b) {
            navbar.addClass('is-hide');
          } else if (c > currentScrollTop && !(a <= b)) {
            navbar.removeClass('is-hide');
          }

          c = currentScrollTop;
        });
      }

      autoHideNav(header);
      window.innerWidth < 992 ? autoHideNav($('.mobile-navigation')) : 0;
    }
  }, {
    key: "init",
    value: function init() {
      this.baseConfig();
      this.navigationCofig();
    }
  }]);

  return Theme;
}(); // ANCHOR LINK


function anchorLink(el) {
  var p = $(el).offset();
  $('html,body').animate({
    scrollTop: p.top - $('header').outerHeight()
  }, 400);
}

$(window).bind('load', function () {
  "use strict"; // ANCHOR FROM OTHER PAGE

  var hash = location.hash;

  if (hash.indexOf("=") < 0) {
    if (hash && $(hash).length > 0) {
      anchorLink(hash);
    }
  } // ANCHOR IN PAGE


  $('a[href^="#"]:not([data-toggle="tab"])').click(function () {
    var getID = $(this).attr('href');

    if (getID !== "#" && $(getID).length > 0) {
      anchorLink(getID);
      return false;
    }
  });
  $(window).scroll(function () {
    if ($('.dropdown-menu.show').length) {
      $('.dropdown-menu.show').removeClass('show');
      $('[aria-expanded="true"]').attr('aria-expanded', false);
    }
  });

  function setSizeForThumbnail() {
    $('.custom-thumbnail').each(function () {
      var _width = $(this).width();

      var _height = _width / 16 * 10;

      $(this).find('img').css('max-height', _height);
    });
  }

  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    setSizeForThumbnail();
  });
  setSizeForThumbnail();
  $(this).resize(function () {
    setSizeForThumbnail();
  });
  $('.notification-list-box > a').click(function () {
    $(this).find('.content').toggleClass('show');
  }); // --- LOGIN / SIGN UP / RESET PASSWORD

  $('[data-target="#signupPopup"], [data-target="#resetPopup"]').click(function () {
    if ($('#loginPopup').hasClass('show')) {
      $('[data-target="#loginPopup"]').trigger('click');
    }
  });
  $('[data-target="#loginPopup"]').click(function () {
    if ($('#signupPopup').hasClass('show')) {
      $('[data-target="#signupPopup"]').trigger('click');
    }
  }); // --- DISABLE RIGHT-CLICK

  document.oncontextmenu = document.body.oncontextmenu = function () {
    return false;
  }; // --- DISABLE DRAG IMAGE


  $('img').on('dragstart', function (event) {
    event.preventDefault();
  }); // HAMBUGER MENU

  $('#hambuger').click(function () {
    $(this).toggleClass('open');
    $('body').toggleClass('menu-open');
  });
});
$('body').on('click', '.notification-list-box', function (e) {
  'use strict';

  e.stopPropagation();
}); // DEVICE ROTATING

$(window).bind('load resize', function () {
  'use strict';

  var _w = window.innerWidth ? window.innerWidth : $(this).width();

  var _h = window.innerHeight ? window.innerHeight : $(this).height();

  var _ratio = _w / _h;

  if (_ratio > 1) {
    $('body').addClass('horizontal-device');
  } else {
    $('body').removeClass('horizontal-device');
  }
});