var UIAPP = UIAPP || {};
var mainMenuNum = 0;
var watch;
var bannerArray = [];
var bgColorArray = [];
var bannerWithArray = ["0", "594.5", "395.5", "295.5", "238.5"];
var bannerLen = 0;

function cpMainBgColor(bgColor) {
  $(".visual--cover__bg").css("backgroundColor", bgColor);
}
function sliderInit() {
  bannerLen = $(".slider--shape-i .slider__screen li").length;
  for (var i = 0; i <= bannerLen - 1; i++) {
    bannerArray.push(".banner" + i);
    bgColorArray.push(
      $(bannerArray[i])
        .find("a")
        .attr("class")
    );
    TweenMax.to($(".slider__nav li.menu" + i + " span"), 0, {
      height: 0,
      ease: Linear.easeInOutQuint
    });
    $(".slider--shape-i .slider__bg" + " .bg" + i).css(
      "backgroundColor",
      bgColorArray[i]
    );
  }
  $(".slider--shape-i .slider__nav li").css(
    "width",
    +bannerWithArray[$(".slider--shape-i .slider__nav li").length - 1] + "px"
  );
  if ($(".slider--shape-i .slider__nav li").length == 1) {
    $(".slider--shape-i .bg").css("display", "none");
    $(".slider--shape-i .slider__nav li").css("display", "none");
  } else {
    $(".slider--shape-i .bg").css("display", "block");
    $(".slider--shape-i .slider__nav li").css("display", "block");
  }
  moveBanner(0);
  selectMenu(0);
}
function moveBanner(num) {
  for (var i = 0; i <= bannerLen - 1; i++) {
    if (i == num) {
      TweenMax.to(bannerArray[num], 0.8, {
        opacity: 1,
        ease: Expo.easeInOutQuint
      });
      TweenMax.to($(".slider--shape-i .slider__bg" + " .bg" + num), 0.8, {
        opacity: 1,
        ease: Expo.easeInOutQuint
      });
    } else {
      TweenMax.to(bannerArray[i], 0.8, {
        opacity: 0,
        ease: Linear.easeInOutQuint
      });
      TweenMax.to($(".slider--shape-i .slider__bg" + " .bg" + i), 0.8, {
        opacity: 0,
        ease: Expo.easeInOutQuint
      });
    }
  }
}
function overMenu(num) {
  for (var i = 0; i <= bannerLen - 1; i++) {
    if (i == num) {
      TweenMax.to($(".slider__nav li.menu" + num + " span"), 0.3, {
        height: 3,
        ease: Expo.easeInOutQuint
      });
      $(".slider__nav li.menu" + num + " a").css("opacity", 1);
    }
  }
}
function outMenu(num) {
  for (var i = 0; i <= bannerLen - 1; i++) {
    if (i == num) {
      TweenMax.to($(".slider__nav li.menu" + num + " span"), 0.3, {
        height: 3,
        ease: Expo.easeInOutQuint
      });
      $(".slider__nav li.menu" + num + " a").css("opacity", 1);
    } else {
      TweenMax.to($(".slider__nav li.menu" + i + " span"), 0.3, {
        height: 0,
        ease: Expo.easeInOutQuint
      });
      $(".slider__nav li.menu" + i + " a").css("opacity", 0.5);
    }
  }
}
function selectMenu(num) {
  mainMenuNum = num;
  overMenu(num);
  moveBanner(num);
}
function sliderEvent() {
  $(".slider__nav li").click(function(e) {
    selectMenu($(this).index());
    outMenu($(this).index());
  });
  $(".slider__nav li").mouseover(function(e) {
    overMenu($(this).index());
  });
  $(".slider__nav li").mouseout(function(e) {
    outMenu(mainMenuNum);
  });
  $(".slider--shape-i .slider__nav").mouseover(function() {
    sliderStop();
  });
  $(".slider--shape-i .slider__nav").mouseout(function() {
    sliderStop();
    sliderStart();
  });
  $(".slider--shape-i .slider__screen").mouseover(function() {
    sliderStop();
  });
  $(".slider--shape-i .slider__screen").mouseout(function() {
    sliderStop();
    sliderStart();
  });
}
function sliderStart() {
  watch = setInterval(function() {
    timer();
  }, 3000);
}
function timer() {
  mainMenuNum++;
  if (mainMenuNum == bannerLen) {
    mainMenuNum = 0;
  }
  outMenu($(this).index());
  selectMenu(mainMenuNum);
}
function sliderStop() {
  clearInterval(watch);
}
/*
$( window ).resize(function() {
   //if($(window).height() > 980){
   //var scroll_top = $(window).scrollTop();
   //TweenLite.to($('.topBtn'), 0.5, {css: {top:$(window).scrollTop() +  $(window).height()-550},delay:0,ease : Power4.easeInOut});
});
*/
function topBtnFun() {
  var min_pos = $(".topBtn").css("top");
  var max_pos = $(window).height();
  var scroll_top = $(window).scrollTop();
  //if(scroll_top > 550){
  //$('.topBtn').css("top",$(window).scrollTop() +  $(window).height()-655);
  //}
  $(window).scroll(function() {
    scroll_top = $(window).scrollTop();
    //console.log($(window).height())
    //if($(window).height() > $(window).height()- 555){
    if (scroll_top > 700) {
      //console.log("이동")
      try {
        TweenLite.to($(".topBtn"), 0.5, {
          css: { top: scroll_top + $(window).height() - 555 },
          delay: 0,
          ease: Power4.easeInOut
        });
      } catch (e) {}
    }
    //}
  });
}

topBtnFun();

UIAPP.dialog = {
  name: "dialog",
  description: "up platform dialog",
  version: "1.0.0",
  settings: {
    _target: $("#layer-gallery"),
    _pos: { top: 0, left: 0 }
  },
  init: function(options) {
    $.extend(true, this.settings, options);
    var self = this;
    this.bindings(options);
  },
  bindings: function(options) {
    $(options._el).click(function() {
      options._target.css({ position: "fixed", display: "block" });
      if (options._dimmed) {
        $("html").addClass("dimmed");
      } else {
        $("html").removeClass("dimmed");
      }
      if (options._scroll) {
        $("html").removeClass("none-scroll");
      } else {
        $("html").addClass("none-scroll");
      }
    });
    $(options._close).click(function() {
      $("html").removeClass("dimmed");
      $("html").removeClass("none-scroll");
      options._target.hide();
    });
  }
};

UIAPP.headerFixed = {
  name: "headerFixed",
  description: "up platform header scroll fixed",
  version: "1.0.0",
  settings: {
    _el: $(".header--main"),
    _listener: "window",
    _scrollTop: 10,
    _addClass: "header-fixed"
  },
  init: function(options) {
    $.extend(true, this.settings, options);
    var self = this;
    this.bindings(options);
  },
  bindings: function(options) {
    if (options._listener) {
      options._listener.scroll(function() {
        var naverHeader = 0;
        if ($(".global_wrap").length != 0) {
          naverHeader = $(".global_wrap").height();
        }
        if ($(this).scrollTop() > options._scrollTop + naverHeader) {
          $(options._el).addClass(options._addClass);
        } else {
          $(options._el).removeClass(options._addClass);
        }
      });

      $(window).on("scroll", function() {
        if (options._follow != undefined) {
          if (
            $(options._el).outerWidth() == 241 ||
            $(options._el)
              .find(".page--right__inner")
              .outerWidth() == 241
          ) {
            $(options._el).css("left", -$(window).scrollLeft());
          }
        }

        var naverHeader = 0;
        if ($(".global_wrap").length != 0) {
          naverHeader = $(".global_wrap").height();
        }
        if ($(this).scrollTop() > options._scrollTop + naverHeader) {
          $(options._el).addClass(options._addClass);
        } else {
          $(options._el).removeClass(options._addClass);
        }
        if ($("body").is(".is-sticky-header")) {
          $(options._el).addClass("is-client-promote");
        } else {
          $(options._el).removeClass("is-client-promote");
        }
      });
    }
  }
};

UIAPP.tabs = {
  name: "tabs",
  description: "up platform tab design handling",
  version: "1.0.0",
  settings: {
    _el: $(".tab__menu a"),
    _target: $("tab__content")
  },
  init: function(options) {
    $.extend(true, this.settings, options);
    var self = this;
    this.bindings(options);
  },
  bindings: function(options) {
    $(options._el).click(function(event) {
      if (!$(this).hasClass("is-unbind_ui-js")) {
        event.preventDefault();
        $(this)
          .parent()
          .addClass(options._addClass);
        $(this)
          .parent()
          .siblings()
          .removeClass("is-active");
        var tab = $(this).attr("href");
        tab = tab.replace("@", "#");
        $(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .find(options._target)
          .not(tab)
          .css("display", "none");
        $(tab).css("display", "block");
        UIAPP.formSet();
        return false;
      }
    });
    $(".is-unbind").unbind("click");
  }
};

UIAPP.gallery = {
  name: "imagesGallery",
  description: "up platform images Gallery design handling",
  version: "1.0.0",
  settings: {
    _el: $(".gallery"),
    _thumbnalils: $(".gallery__thumbnails"),
    _thumControler: $(".gallery__thumbnails__control"),
    _thumbnalilWidth: 110,
    _screen: $(".gallery__screen"),
    _layerScreen: $(".layer-gallery_screen"),
    _layerControler: $(".layer-gallery_control")
  },
  init: function(options) {
    $.extend(true, this.settings, options);
    var self = this;
    this.bindings(options);
  },
  bindings: function(options) {
    if ($(options._el).length == 0) {
      return false;
    }
    var $current_imgaes = 0;
    var $thumnail = $(options._thumbnalils).find("ul");
    var $thumnail_item = $thumnail.find(".item-image");
    var $thumnail_itemLen = $thumnail_item.length;
    var $thumnail_itemPer = options._thumbnaView;
    var $thumnail_page = Math.ceil($thumnail_itemLen / $thumnail_itemPer) - 1;
    var $thumnail_currentPage = 0;
    var $thumnail_width = $thumnail_itemLen * options._thumbnalilWidth;
    var $thumnail_First;

    $thumnail.css("width", $thumnail_width + "px");
    $thumnail
      .parent()
      .css("width", $thumnail_itemPer * options._thumbnalilWidth + "px");
    $(options._screen)
      .find("iframe")
      .remove();
    $thumnail_First = $thumnail.find("li").eq(0);
    if (options._layer == false) {
      $(options._screen).append($(options._screen).find("#main-img"));
      $(options._screen)
        .find(".js-layer")
        .remove();
    }
    if ($thumnail_First.find(".item-video").length != 0) {
      $(options._screen).append(
        '<iframe width="' +
          $(options._screen).width() +
          '" height="' +
          $(options._screen).height() +
          '" src="' +
          $thumnail_First
            .find(".item-video")
            .attr("href")
            .replace("&autoplay=1", "") +
          '" frameborder="0" allowfullscreen></iframe>'
      );
    } else {
      $(options._el)
        .find("#main-img")
        .css("display", "block");
      $(options._el)
        .find(".js-layer")
        .css("display", "block");
      $(options._screen)
        .find("img")
        .attr(
          "src",
          $thumnail_First
            .find("img")
            .attr("src")
            .replace()
        );
    }
    if (
      $(options._screen)
        .find("img")
        .width() >
      $(options._screen)
        .find("img")
        .height()
    ) {
      $(options._screen)
        .find("img")
        .css("width", $(options._screen).width())
        .css("height", "auto");
    } else {
      $(options._screen)
        .find("img")
        .css("height", $(options._screen).height())
        .css("width", "auto");
    }
    $.each($thumnail_item, function(index) {
      $(this).attr("item-index", index);
    });
    $(options._el)
      .find(".item-video")
      .click(function() {
        $($thumnail_item)
          .parent()
          .removeClass("is-active");
        $(this)
          .parent()
          .addClass("is-active");
        $(options._el)
          .find("#main-img")
          .css("display", "none");
        $(options._el)
          .find(".js-layer")
          .css("display", "block");

        $(options._screen)
          .find("iframe")
          .remove();
        $(options._screen).append(
          '<iframe width="' +
            $(options._screen).width() +
            '" height="' +
            $(options._screen).height() +
            '"  src="' +
            $(this).attr("href") +
            '" frameborder="0" allowfullscreen></iframe>'
        );
        return false;
      });
    $thumnail_item.click(function() {
      if ($(options._screen).find("iframe").length > 0) {
        $(options._screen)
          .find("iframe")
          .remove();
        $(options._el)
          .find("#main-img")
          .css("display", "block");
        $(options._el)
          .find(".js-layer")
          .css("display", "block");
      }
      $current_imgaes = Number($(this).attr("item-index"));
      $(this)
        .parent()
        .siblings()
        .removeClass("is-active");
      $(this)
        .parent()
        .addClass("is-active");

      $(options._screen)
        .find("img")
        .attr(
          "src",
          $(this)
            .parent()
            .find("img")
            .attr("src")
            .replace()
        );
      $(options._screen)
        .find("img")
        .removeAttr("style");

      if (
        $(options._screen)
          .find("img")
          .width() >
        $(options._screen)
          .find("img")
          .height()
      ) {
        $(options._screen)
          .find("img")
          .css("width", $(options._screen).width())
          .css("height", "auto");
      } else {
        $(options._screen)
          .find("img")
          .css("height", $(options._screen).height())
          .css("width", "auto");
      }
      return false;
    });
    $(options._thumControler)
      .find(".next-btn")
      .click(function() {
        if ($thumnail_currentPage < $thumnail_page) {
          $thumnail_currentPage++;
          $thumnail.animate(
            {
              marginLeft:
                $thumnail_itemPer *
                options._thumbnalilWidth *
                $thumnail_currentPage *
                -1
            },
            500
          );
        }
      });
    $(options._thumControler)
      .find(".prev-btn")
      .click(function() {
        if ($thumnail_currentPage > 0) {
          $thumnail_currentPage--;
          $thumnail.animate(
            {
              marginLeft:
                $thumnail_itemPer *
                options._thumbnalilWidth *
                $thumnail_currentPage *
                -1
            },
            500
          );
        }
      });
    $(options._screen).click(function() {
      if (options._layer == false) {
        return false;
      }
      $(options._layerControler)
        .find(".current")
        .text($current_imgaes + 1);
      $(options._layerControler)
        .find(".total")
        .text($thumnail_itemLen);
      options._layerScreen.find("img").attr(
        "src",
        $(this)
          .find("img")
          .attr("src")
      );
      setScreenWidth(options._layerScreen.find("img"));
    });
    function setScreenWidth(img) {
      img.removeAttr("style");
      img.css("width", img.width() < 1200 ? "auto" : 1200);
      $(".layer-gallery").css("width", img.width());
    }
    $(options._layerControler)
      .find(".next-btn")
      .click(function() {
        if ($current_imgaes < $thumnail_itemLen - 1) {
          $current_imgaes++;
          $(options._layerControler)
            .find(".current")
            .text($current_imgaes + 1);
          $(options._layerControler)
            .find(".total")
            .text($thumnail_itemLen);
          options._layerScreen.find("img").attr(
            "src",
            $thumnail_item
              .eq($current_imgaes)
              .parent()
              .find("img")
              .attr("src")
              .replace()
          );
        }
        setScreenWidth(options._layerScreen.find("img"));
      });

    $(options._layerControler)
      .find(".prev-btn")
      .click(function() {
        if ($current_imgaes > 0) {
          $current_imgaes--;
          $(options._layerControler)
            .find(".current")
            .text($current_imgaes + 1);
          $(options._layerControler)
            .find(".total")
            .text($thumnail_itemLen);
          options._layerScreen.find("img").attr(
            "src",
            $thumnail_item
              .eq($current_imgaes)
              .parent()
              .find("img")
              .attr("src")
              .replace()
          );
        }
        setScreenWidth(options._layerScreen.find("img"));
      });
  }
};

UIAPP.rateIt = {
  name: "rate-it",
  description: "up platform tab design handling",
  version: "1.0.0",
  settings: {
    _el: $(".tab__menu a"),
    _target: $("tab__content")
  },
  init: function(options) {
    $.extend(true, this.settings, options);
    var self = this;
    this.bindings(options);
  },
  bindings: function(options) {
    if (options._el.length == 0) {
      return false;
    }
    var self = this;
    var rate = options._el;
    var item = rate.find("i");
    options._outTarget.on("mouseleave", function(e) {
      active();
      options._outTarget.attr("mouse", "out");
    });
    options._outTarget.on("mouseover", function(e) {
      if (
        !options._outTarget.attr("mouse") ||
        options._outTarget.attr("mouse") !== "out"
      ) {
        return false;
      }
      options._outTarget.attr("mouse", "in");
      item.attr("class", options._class.empty);
    });
    item.on("mouseover", function(e) {
      e.stopPropagation();
    });
    item.on("mousemove", function(e) {
      e == e || window.event;
      var mouse = new getMouse(e).X - $(this).offset().left;
      var half = $(this).width() / 2;
      if (half < mouse) {
        $(this).attr("class", options._class.fill);
      } else {
        $(this).attr("class", options._class.harf);
      }
      fill($(this));
      counter(false);
    });
    item.on("click", function(e) {
      e == e || window.event;
      var mouse = new getMouse(e).X - $(this).offset().left;
      var half = $(this).width() / 2;
      var point;
      if (half < mouse) {
        $(this).attr("star", options._class.fill);
      } else {
        $(this).attr("star", options._class.harf);
      }
      for (var i = 0; i < item.length; i++) {
        if ($(this).index() > i) {
          item.eq(i).attr("star", options._class.fill);
        } else if ($(this).index() < i) {
          item.eq(i).attr("star", options._class.empty);
        }
      }
      counter(true);
    });
    function trim(str) {
      return str.replace(/(^\s*)|(\s*$)/g, "");
    }
    function counter(type) {
      var counter;
      var fill = options._class.fill.replace("icon", "");
      fill = trim(fill);
      fill = rate.find("." + fill);
      var half = options._class.harf.replace("icon", "");
      half = trim(half);
      half = rate.find("." + half);
      counter = fill.length * 20 + half.length * 10;
      if (counter < 10) {
        counter = 10;
      }
      if (type == true) {
        if (options._complete) {
          options._complete(counter);
        }
      } else {
        if (options._ondrag) {
          options._ondrag(counter);
        }
      }
    }
    function active() {
      for (var i = 0; i < item.length; i++) {
        if (item.eq(i).attr("star")) {
          item.eq(i).attr("class", item.eq(i).attr("star"));
        } else if (item.eq(i).attr("star") == "") {
          item.eq(i).attr("class", options._class.empty);
        } else {
          item.eq(i).attr("class", options._class.disabled);
        }
      }
    }
    function fill(o) {
      for (var i = 0; i < item.length; i++) {
        if (o.index() > i) {
          item.eq(i).attr("class", options._class.fill);
        } else if (o.index() < i) {
          item.eq(i).attr("class", options._class.empty);
        }
      }
    }
  }
};

UIAPP.slider = {
  name: "banner slider",
  description: "up platform banner slider design handling",
  version: "1.0.0",
  settings: {
    _el: $(".slider"),
    _screen: $(".slider__screen"),
    _paging: $(".slider__dot"),
    _sliderItemWidth: 125,
    _slider_itemPer: 2,
    _slider_speed: 200,
    _slider_timer: 4,
    _slider_autoPlay: true,
    _slider_randomPlay: true,
    _slider_dot: true,
    _addClass: "is-active",
    _sliderControler: $(".slider__control")
  },
  init: function(options) {
    $.extend(true, this.settings, options);
    var self = this;
    if (options._el.index() != -1) {
      this.bindings(options);
    }
  },
  bindings: function(options) {
    var $count = options._slider_timer;
    if ($(options._screen).find("li").length <= 1) {
      //$(options._sliderControler).css('display','none')
      return false;
    }
    var $count = options._slider_timer;
    if (options._slider_randomPlay == true) {
      var $curSlide = Math.floor(
        Math.random() * options._screen.find("ul").length + 0
      );
    } else {
      var $curSlide = 0;
    }
    var $sliderTarget = options._screen.find("ul");
    var $oldSlide = -1;
    var $tempSlide = -1;
    var $totalSlide = options._screen.find("ul").length - 1;
    var $speed = options._slider_speed;
    var $slideWidth = options._slideWidth;
    if (options._slider_autoPlay) {
      var $countdown = setInterval(startSlider, 1000);
    }
    function init() {
      moveDot($curSlide);
      options._screen.find("ul").css("left", $slideWidth * -1 + "px");
      options._screen
        .find("ul")
        .eq($curSlide)
        .css("left", 0 + "px");
      $oldSlide = $curSlide;
    }
    for (var i = 0; i < $totalSlide + 1; i++) {
      //
      options._paging.find("ul").append("<li></li>");
      options._paging
        .find("li")
        .eq(i)
        .text(i + 1);
    }
    if (!options._slider_dot) {
      options._paging.append("<div class='slider__num'></div>");
      options._paging
        .find(".slider__num")
        .append("<div class='current__num'></div>");
      options._paging
        .find(".slider__num")
        .append("<div class='end__num'></div>");
      $(".end__num").text($totalSlide + 1);
      $(".current__num").text($curSlide + 1);
      options._paging.find("ul").css("display", "none");
    } else {
      $(".slider__num").css("display", "none");
      options._paging.find("ul").css("display", "block");
    }
    function moveDot(num) {
      options._paging
        .find("li")
        .eq(num)
        .addClass(options._addClass);
      options._paging
        .find("li")
        .eq(num)
        .siblings()
        .removeClass("is-active");
    }
    function setSlider(num, pos) {
      $curSlide = num;
      if (pos == "left") {
        options._screen
          .find("ul")
          .eq(num)
          .css("left", $slideWidth + "px");
        options._screen
          .find("ul")
          .eq($oldSlide)
          .css("left", 0 + "px");
        options._screen
          .find("ul")
          .eq(num)
          .stop()
          .animate(
            { left: 0 },
            options._slider_speed,
            "easeInOutQuart",
            function() {}
          );
        options._screen
          .find("ul")
          .eq($oldSlide)
          .stop()
          .animate(
            { left: $slideWidth * -1 },
            options._slider_speed,
            "easeInOutQuart",
            function() {}
          );
      }
      if (pos == "right") {
        options._screen
          .find("ul")
          .eq(num)
          .css("left", $slideWidth * -1 + "px");
        options._screen
          .find("ul")
          .eq($oldSlide)
          .css("left", 0 + "px");
        options._screen
          .find("ul")
          .eq(num)
          .stop()
          .animate(
            { left: 0 },
            options._slider_speed,
            "easeInOutQuart",
            function() {}
          );
        $tempSlide = $oldSlide;
        options._screen
          .find("ul")
          .eq($oldSlide)
          .stop()
          .animate(
            { left: $slideWidth },
            options._slider_speed,
            "easeInOutQuart",
            function() {
              options._screen
                .find("ul")
                .eq($tempSlide)
                .css("left", $slideWidth * -1 + "px");
            }
          );
      }
      $oldSlide = num;
    }
    options._paging.find("li").each(function() {
      $(this).click(function(e) {
        if ($curSlide != $(this).index()) {
          $curSlide = $(this).index();
          moveDot($curSlide);
          setSlider($curSlide, "left");
        }
      });
    });
    options._sliderControler.find(".button--next").click(function() {
      moveNextSlide();
    });
    options._sliderControler.find(".button--prev").click(function() {
      movePrevSlide();
    });
    function moveNextSlide() {
      if ($curSlide < $totalSlide) {
        $curSlide++;
      } else {
        $curSlide = 0;
      }
      moveDot($curSlide);
      setSlider($curSlide, "left");
      $(".end__num").text($totalSlide + 1);
      $(".current__num").text($curSlide + 1);
    }
    function movePrevSlide() {
      if ($curSlide > 0) {
        $curSlide--;
      } else {
        $curSlide = $totalSlide;
      }
      moveDot($curSlide);
      setSlider($curSlide, "right");
      $(".end__num").text($totalSlide + 1);
      $(".current__num").text($curSlide + 1);
    }
    function startSlider() {
      $count--;
      if ($count == 0) {
        $count = options._slider_timer;
        moveNextSlide();
      }
    }
    function stopSlider() {
      clearInterval($countdown);
    }
    if (options._slider_autoPlay) {
      options._screen.on("mouseover", function() {
        stopSlider();
      });
      options._sliderControler.on("mouseover", function() {
        stopSlider();
      });
      options._paging.on("mouseover", function() {
        stopSlider();
      });
      options._screen.on("mouseleave", function() {
        $countdown = setInterval(startSlider, 1000);
      });
      options._sliderControler.on("mouseleave", function() {
        $countdown = setInterval(startSlider, 1000);
      });
      options._paging.on("mouseleave", function() {
        $countdown = setInterval(startSlider, 1000);
      });
    }
    init();
  }
};

UIAPP.drawCheckbox = {
  name: "drawCheckbox",
  settings: {
    $el: {},
    _name: "formstyle"
  },
  init: function(options) {
    var opts = $.extend(true, this.settings, options);
    this.markup(opts);
    $.fn[opts._name] = this.setState.call(this);
  },
  getInputStateClases: function(input, namespace) {
    var wrapClassList = [];
    wrapClassList.push(namespace);
    wrapClassList.push(input.type ? namespace + "--" + input.type : "");
    wrapClassList.push(input.checked ? namespace + "--checked" : "");
    wrapClassList.push(input.disabled ? namespace + "--disabled" : "");
    return wrapClassList;
  },
  setState: function() {
    var self = this;
    return function(options) {
      var $inputs = $(this),
        wrapClassList = [];
      if (typeof options === "string") {
        var state = options;
        $inputs.each(function(i, input) {
          var wrapClassList = [];
          if (state === "enable") {
            input.disabled = false;
          }
          if (state === "disable") {
            input.disabled = true;
          }
          if (state === "check") {
            input.checked = true;
          }
          if (state === "uncheck") {
            input.checked = false;
          }
          wrapClassList = self.getInputStateClases(input, "formstyle");
          $(input)
            .parent()
            .attr("class", "")
            .addClass(wrapClassList.join(" "));
        });
      }
    };
  },
  markup: function(options) {
    var self = this,
      $inputs = options.$el;
    $inputs
      .each(function(i, input) {
        var isStyle = $(input)
          .parent()
          .is(".formstyle");
        if (isStyle) {
          return;
        }
        var iconClassName = "formstyle__icon",
          wrapClassList = self.getInputStateClases(input, "formstyle");
        $(input)
          .wrap("<span></span>")
          .parent()
          .addClass(wrapClassList.join(" "))
          .append('<i class="' + iconClassName + '"></i>');
      })
      .on("focusin", function() {
        var $input = $(this);
        $input.parent().addClass("formstyle--focused");
      })
      .on("focusout", function() {
        $inputs.parent().removeClass("formstyle--focused");
      });
    setTimeout(function() {
      $inputs.on("change", function() {
        var $input = $(this);
        if (this.type === "checkbox") {
          $input.parent().toggleClass("formstyle--checked");
        }
        if (this.type === "radio") {
          $inputs
            .filter("[type=radio]")
            .filter("[name=" + $input[0].name + "]")
            .parent()
            .removeClass("formstyle--checked");
          $input.parent().addClass("formstyle--checked");
        }
      });
    }, 200);
  }
};

UIAPP.drawSelect = {
  name: "drawSelect",
  settings: {
    $el: {},
    _prefix: "formbox",
    _name: "formbox",
    _shape: ""
  },
  init: function(options) {
    var opts = $.extend(true, this.settings, options);
    if (opts.$el.length <= 0) {
      return;
    }
    this.markup(opts);
  },
  markup: function(options) {
    var $selectBoxes = options.$el,
      name = options._name,
      shape = options._shape;
    $selectBoxes
      .each(function(i, select) {
        var $select = $(select),
          width = $select.outerWidth(),
          wrapClassList = [],
          iconClassName = name + "__icon",
          titleClassName = name + "__title",
          isBlock = $select.is(".block"),
          isStyle = $select.parent().is("[class*=formbox]");
        if (isStyle) {
          return;
        }
        if ($select.is(":hidden")) {
          return;
        }
        wrapClassList.push(name);
        wrapClassList.push(select.disabled ? name + "--disabled" : "");
        if (isBlock) {
          wrapClassList.push(name + "--block");
        }
        $select
          .wrap("<span></span>")
          .parent()
          .width(width)
          .addClass(wrapClassList.join(" "))
          .addClass(shape)
          .prepend(
            '<strong class="' +
              titleClassName +
              '">' +
              select.options[select.selectedIndex].text +
              "</strong>"
          )
          .prepend('<i class="' + iconClassName + '"></i>');
      })
      .on("change", function() {
        var $select = $(this).parents("." + name),
          text = this.options[this.selectedIndex].text,
          titleClassName = "." + name + "__title";
        $select.find(titleClassName).text(text);
      })
      .on("focusin", function() {
        var $select = $(this);
        $select.parent().addClass(name + "--focused");
      })
      .on("focusout", function() {
        $selectBoxes.parent().removeClass(name + "--focused");
      });
  },
  redraw: function() {
    var opts = this.settings,
      $el = opts.$el;
    if ($el.length <= 0) {
      return;
    }
    $el.each(function(i, select) {
      var $select = $(select),
        $parents = $select.parents("." + opts._name),
        $option = $select.find("option:selected"),
        titleClassName = "." + opts._name + "__title",
        selectedText = $option.text();
      if ($select.is(":disabled") === false && $parents.attr("class")) {
        var classList = $parents
          .attr("class")
          .split(" ")
          .map(function(val, i) {
            return !val.match(/disabled/) ? val : "";
          });
        $parents.attr("class", classList.join(" "));
      }
      $parents.find(titleClassName).text(selectedText);
    });
  }
};

UIAPP.toggle = {
  name: "toggle",
  description: "up platform banner slider design handling",
  version: "1.0.0",
  settings: {
    $el: {},
    _child: "",
    _parent: "",
    _activeClass: ""
  },
  init: function(options) {
    var opts = $.extend(false, this.settings, options);
    this.bindings(opts);
  },
  bindings: function(options) {
    var $el = options.$el;
    $el.on("click", options._child, function(e) {
      $(this)
        .parents(options._parent)
        .toggleClass(options._activeClass);
      e.preventDefault();
    });
  }
};

UIAPP.popover = {
  name: "popover",
  description: "up platform banner slider design handling",
  version: "1.0.0",
  settings: {
    _name: "popover"
  },
  init: function(options) {
    $.extend(true, this.settings, options);
    $.fn[options._name] = this.bindings;

    $("[data-popover]").on("mouseleave", function(e) {
      var text = $(this).data("popover");
      var options = (options = $.extend(
        true,
        {
          content: text
        },
        $(this).data("options")
      ));

      if (options.event != undefined) {
        $(".popover").fadeOut(function() {
          $(this).remove();
          options.callback && options.callback();
        });
      }
    });
    $("[data-popover]").on("mouseenter", function(e) {
      e.preventDefault();
      var text = $(this).data("popover"),
        options = $.extend(
          true,
          {
            content: text
          },
          $(this).data("options")
        );

      $(this).popover({
        content: text,
        event: options.event,
        delay: options.delay,
        left: options.left,
        top: options.top,
        arrowheadPos: options.arrowheadPos
      });
    });
  },
  bindings: function(options) {
    var $el = this,
        $popover = {},
        height = $el.outerHeight() + 4,
        offset = $el.offset(),
        theme =  'popover--' + options.theme || '',
        arrowheadPos = options.arrowheadPos || [];
        arrowheadClases = getArrowheadClass('popover--', arrowheadPos);
        name = options.name || 'popover--tooltip',
        title = '',
        content = '';

    arrowheadClases = getArrowheadClass("popover--", arrowheadPos);

    function getArrowheadClass(prepix, pos) {
      var classes = pos.map(function(pos) {
        return prepix + pos;
      });
      return classes.join(" ");
    }

    if (typeof options.id === "string") {
      $(options.id)
        .css({
          position: "fixed",
          top: offset.top + height + (options.top || 0),
          left: offset.left + (options.left || 0)
        })
        .stop()
        .fadeToggle();
      return;
    }

    if (typeof options.id === "string") {
      $(options.id)
        .css({
          position: "fixed",
          top: offset.top + height + (options.top || 0),
          left: offset.left + (options.left || 0)
        })
        .stop()
        .fadeToggle();
      return;
    }

    if (options.title) {
        title = '<span class="popover__title">' + options.title + '</span>';
    }
    if (options.content) {
        content = '<span class="popover__text">' + options.content + '</span>';
    }

    $popover = $("<div></div>")
      .addClass("popover")
      .addClass(name)
      .addClass(theme)
      .addClass(arrowheadClases)
      .append(title + content)
      .css({
        position: "absolute",
        top: offset.top + height + (options.top || 0),
        left: offset.left + (options.left || 0)
      })
      .fadeIn()
      .appendTo("body");

    if(options.event == undefined){
      if((options.autoHide == undefined) || options.autoHide == true ){
        $popover
          .delay(options.delay || 3000)
          .fadeOut(function() {
            $(this).remove();
            options.callback && options.callback();
          });
      }
    }
    if (arrowheadClases.match(/right/) !== null) {
      var selfWidth = $el.outerWidth(),
          popoverWidth = $popover.outerWidth();
      $popover.css({
        left: (offset.left -popoverWidth) + selfWidth + options.left
      });
    }

    if (arrowheadClases.match(/bottom/) !== null) {
      var popoverHeight = $popover.outerHeight();
      $popover.css({
        top: offset.top - popoverHeight,
        marginTop: options.top
      });
    }

    return $popover;
  }
};

UIAPP.setRateIt = {
  name: "rate-it",
  description: "up platform tab design handling",
  version: "1.0.0",
  settings: {},
  init: function(options) {
    $.extend(true, this.settings, options);
    var self = this;
    return this.bindings(options);
  },
  bindings: function(options) {
    if (options._el.length == 0) {
      return false;
    }
    var self = this;
    var rate = options._el;
    var html = "";
    var conv = options._value / 10 / (10 / options._item);
    this.rateItNumber = options._value / 10;

    for (var i = 1; i <= options._item; i++) {
      if (conv >= 1) {
        html += options._class.fill;
      } else if (conv >= 0.5 && conv < 1) {
        html += options._class.harf;
      } else {
        html += options._class.empty;
      }

      conv = conv - 1;
    }
    rate.html(html);
    return this;
  }
};

UIAPP.nav = {
  name: "rate-it",
  description: "up platform tab design handling",
  version: "1.0.0",
  settings: {
    _el: $(".tab__menu a"),
    _target: $("tab__content")
  },
  init: function(options) {
    $.extend(true, this.settings, options);
    var self = this;
    this.bindings(options);
  },
  bindings: function(options) {
    if (options._el.length == 0) {
      return false;
    }
    var self = this;
    var first;
    var second = options._el.find(options._second);
    var sub;
    $.each(options._el.find(options._first), function(index, value) {
      if ($(this).find(options._second).length != 0) {
        $(this).attr("sub-item", "true");
      }
    });
    first = $('[sub-item="true"]')
      .find("a")
      .eq(0);
    first.on("mouseover", function(e) {
      $(this)
        .parent()
        .find(options._second)
        .css("display", "block");
    });
    first.on("mouseleave", function(e) {
      $(this)
        .parent()
        .find(options._second)
        .css("display", "none");
    });
    first.on("mouseover", function(e) {
      $(this)
        .parent()
        .find(options._second)
        .css("display", "block");
    });
    first.on("mouseleave", function(e) {
      $(this)
        .parent()
        .find(options._second)
        .css("display", "none");
    });
    second.on("mouseover", function(e) {
      $(this).css("display", "block");
    });
    second.on("mouseleave", function(e) {
      $(this).css("display", "none");
    });
  }
};

UIAPP.alert = {
  name: "alert",
  settings: {},
  init: function(options) {
    var settings = $.extend(true, this.settings, options);
    UIAPP.alert = this.bindings(settings);
  },
  i18n: {
    ko: {
      confirm: "확인",
      cancel: "취소",
      close: "닫기"
    },
    en: {
      confirm: "OK",
      cancel: "Cancel",
      close: "Close"
    },
    ja: {
      confirm: "確認",
      cancel: "取消",
      close: "閉じる"
    },
    "zh-tw": {
      confirm: "確認",
      cancel: "取消",
      close: "關閉"
    }
  },
  markup: function(values) {
    var html = "",
      lang = values.lang;
    html += '<div class="dialog dialog--center dialog--alert">';
    if (values.title) {
      html += '<header class="dialog__header">';
      html += '<h1 class="dialog__header__title">' + values.title + "</h1>";
      html += "</header>";
    }
    if (values.content) {
      html += '<div class="dialog__content">' + values.content + "</div>";
    }
    html += '<footer class="dialog__footer">';
    if (values.isConfirm) {
      html +=
        '<button class="button--base-c button--shape-a js-confirm" type="button">' +
        this.i18n[lang].confirm +
        "</button>";
      html +=
        '<button class="button--base-c button--shape-b js-cancel" type="button">' +
        this.i18n[lang].cancel +
        "</button>";
    } else {
      html +=
        '<button class="button--base-c button--shape-a js-alert-x" type="button">' +
        this.i18n[lang].close +
        "</button>";
    }
    html +=
      '<button class="dialog__x js-alert-x" type="button">' +
      this.i18n[lang].close +
      "</button>";
    html += "</footer>";
    html += "</div>";
    return html;
  },
  bindings: function(settings) {
    var self = this;
    return function(options) {
      var $dialog = $(".dialog"),
        html = self.markup({
          title: options.title,
          content: options.content,
          isConfirm: Boolean(options.confirm),
          lang: options.lang || "ko"
        });

      if (options.dimmed !== false) {
        $("html").addClass("dimmed");
      }

      if ($dialog.is(":visible")) {
        return;
      }

      $(".dialog--alert:visible").remove();

      $("body")
        .append(html)
        .find(".dialog--alert")
        .show()
        .find(".js-alert-x")
        .on("click", function() {
          $(".dialog--alert:visible").remove();
          $("html").removeClass("dimmed");
        });

      $(".dialog--alert")
        .one("click", ".js-cancel", function(e) {
          if (typeof options.cancel === "function") {
            options.cancel(e);
          }
          $(".dialog--alert:visible").remove();
          $("html").removeClass("dimmed");
        })
        .one("click", ".js-confirm", function(e) {
          if (typeof options.confirm === "function") {
            options.confirm(e);
          }
          $(".dialog--alert:visible").remove();
          $("html").removeClass("dimmed");
        });
    };
  },
  show: function(options) {
    var opts = $.extend(true, this.settings, options),
      $el = opts._el;
    $el.show();
    if (opts._dimmed) {
      $("html").addClass("dimmed");
    }
    if (opts._scroll === false) {
      $("html").addClass("none-scroll");
    }
  },
  hide: function(options) {
    var $el = options._el;
    $el.hide();
    $("html")
      .removeClass("dimmed")
      .removeClass("none-scroll");
  }
};

UIAPP.toggleEvent = {
  name: "toggleEvent",
  settings: {
    $el: {},
    eventType: "click",
    setClassName: "active"
  },
  init: function(options) {
    var settings = $.extend(true, this.settings, options);
    this.bindings(settings);
  },
  bindings: function(options) {
    if (options.eventType === "click") {
      // code
    }
    if (options.eventType === "hover") {
      options.$el.hover(function(e) {
        $(this).toggleClass(options.setClassName);
      });
    }
    if (options.eventType === "mouseover") {
      // code
    }
  }
};

UIAPP.dropdown = {
  name: "dropdown",
  settings: {
    $el: $(".dropdown-toggle")
  },
  init: function(options) {
    var settings = $.extend(true, this.settings, options);

    if (
      !settings.$el
        .parent()
        .parent()
        .hasClass("game")
    ) {
      this.bindings(settings);
    }
  },
  bindings: function(settings) {
    var $el = settings.$el;

    $el.off("click.dropdown");
    $(document).off("click.dropdown");

    $el.on("click.dropdown", function(e) {
      e.preventDefault();
      var $self = $(this),
        $dropdown = $self.parents(".dropdown");
      $(".dropdown")
        .not($dropdown)
        .removeClass("open");
      $dropdown.toggleClass("open");
    });

    $(document).on("click.dropdown", function(e) {
      var $dropdown = $el.parents(".dropdown"),
        $except = $dropdown.find("[data-except]"),
        isExcept = $except.data("except"),
        isToggle = $dropdown.has(e.target).length;
      if (isToggle) {
        return;
      }
      if (isExcept && $except.has(e.target).length) {
        return;
      }
      $(".dropdown").removeClass("open");
    });
  }
};

UIAPP.imgMousemove = {
  init: function(options) {
    var DEFAULTS = {
      el: ".js-img-mousemove",
      images: [],
      classes: {
        root: "img-mousemove",
        item: "img-mousemove__item"
      }
    };
    var _this = this;
    _this.OPTIONS = $.extend(true, DEFAULTS, options);
    _this.addClass();
    _this.addImg(_this.OPTIONS);
  },
  addClass: function() {
    var _this = this,
      options = _this.OPTIONS,
      $el = $(options.el),
      className = options.classes.root;
    $el.addClass(className);
  },
  addImg: function() {
    var _this = this,
      options = _this.OPTIONS,
      $el = $(options.el),
      $imgs = {},
      imgs = options.images,
      itemClassName = options.classes.item,
      IMG_TEMPLATE = function(imgSrc) {
        return (
          '<img src="' + imgSrc + '" class="' + itemClassName + '" alt="">'
        );
      };

    var i = 0,
      length = imgs.length;
    for (; i < length; i += 1) {
      $el.append(IMG_TEMPLATE(imgs[i].imgSrc));
      $imgs = $el.find("img");
      $imgs.eq(i).css({
        marginLeft: imgs[i].marginLeft,
        top: imgs[i].top,
        zIndex: imgs[i].zIndex
      });
    }
    _this.imgLoaded($imgs);
  },
  imgLoaded: function(imgs) {
    var _this = this,
      $imgs = $(imgs);
    $imgs.load(function() {
      $(this).addClass("is-active");
      setTimeout(function() {
        _this.mousemove($imgs);
      }, 600);
    });
  },
  mousemove: function(imgs) {
    var _this = this,
      options = _this.OPTIONS.images,
      $w = $(window),
      $imgs = $(imgs),
      wx = window.innerWidth,
      wy = window.innerHeight;
    $w.mousemove(function(e) {
      e.preventDefault();
      var cx = e.clientX,
        cy = e.clientY;
      var i = 0,
        length = $imgs.length;
      for (; i < length; i += 1) {
        var rangeX = (options[i].range / wx) * e.clientX;
        if (options[i].reverse) {
          rangeX = -rangeX;
        }
        TweenMax.to($imgs[i], 1, {
          css: { transform: "translate(" + rangeX + "px)" },
          ease: Quint.easeOut
        });
      }
    });
  }
};

UIAPP.lazyLoading = {
  init: function(options) {
    var DEFAULTS = {
      el: ".js-lazy"
    };
    var _this = this;
    _this.OPTIONS = $.extend(true, DEFAULTS, options);
    _this.loaded();
  },
  loaded: function() {
    var _this = this,
      options = _this.OPTIONS,
      $el = $(_this.OPTIONS.el);
    setTimeout(function() {
      $el.addClass("is-active");
      if (options.mousemove) {
        _this.mousemove($el);
      }
    }, 600);
    $el.load(function() {
      $el.addClass("is-active");
      if (options.mousemove) {
        _this.mousemove($el);
      }
      if (typeof options.callback === "function") {
        options.callback($el);
      }
    });
  },
  mousemove: function(el) {
    var _this = this,
      options = _this.OPTIONS,
      $w = $(window),
      wx = window.innerWidth,
      wy = window.innerHeight;
    $w.mousemove(function(e) {
      e.preventDefault();
      var rangeX = (options.range / wx) * e.clientX;
      TweenMax.to(el[0], 1, {
        css: { transform: "translate(" + rangeX + "px)" },
        ease: Quint.easeOut
      });
    });
  }
};

UIAPP.searchBar2 = {
  name: "rate-it",
  description: "up platform tab design handling",
  version: "1.0.0",
  settings: {},
  init: function() {
    var self = this;
    return this.bindings();
  },
  bindings: function(options) {
    var self = this;
    this.bar = $("#search--bar");
    this.btn = $("#search--btn");
    this.glass = this.btn.find("i");

    this.searchInput = this.bar.find(".form--control");
    this.searchBtn = this.bar.find(".search--box__btn");
    this.searchClose = this.bar.find(".search--box__btn-close");

    if (this.btn.attr("event") != undefined) {
      return false;
    }
    $("input, textarea").placeholder();
    this.btn.attr("event", "active");

    this.glass.append(
      '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15.209px" height="15.083px" viewBox="0 0 15.209 15.083" enable-background="new 0 0 15.209 15.083" xml:space="preserve"><circle fill="none" stroke="#010101" stroke-width="2" stroke-miterlimit="10" cx="6.347" cy="6.397" r="5.321"/><line fill="none" stroke="#010101" stroke-width="2" stroke-miterlimit="10" x1="14.5" y1="14.55" x2="10.109" y2="10.16"/></svg>'
    );

    this.glass.addClass("icon--svg");

    this.searchClose
      .find(".icon")
      .append(
        '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 width="12.063px" height="12.125px" viewBox="0 0 12.063 12.125" enable-background="new 0 0 12.063 12.125" xml:space="preserve"><line fill="none" stroke="#010101" stroke-miterlimit="10" x1="11.733" y1="0.375" x2="0.391" y2="11.718"/><line fill="none" stroke="#010101" stroke-miterlimit="10" x1="0.391" y1="0.375" x2="11.733" y2="11.718"/></svg>'
      );

    this.searchClose.find(".icon").addClass("icon--svg");

    this.nav = $(".page--header__nav__item");
    this.navItem = this.nav.find(".page--header__nav__item li");

    this.bar.css("opacity", 0).css("display", "none");
    this.bar.css("width", 52);
    this.searchClose.find("i").css("transform", "scale(0.3)");

    var delay = null;
    this.searchClose.on("click", function() {
      if (self.btn.attr("class").indexOf("is-active") >= 0) {
        if (delay) {
          clearTimeout(delay);
        }
        self.closeAnimation(10);
        delay = setTimeout(function() {
          self.barAnimation({
            obj: self.bar,
            width: 0,
            active: null,
            opacity: 0,
            time: 300
          });
        }, 300);
      }
    });
    this.btn.on("click", function() {
      if (
        $(this)
          .attr("class")
          .indexOf("is-active") < 0
      ) {
        if (delay) {
          clearTimeout(delay);
        }
        self.bar.css("display", "block");
        self.btnAnimation(10);
        self.closeAnimation(0);
        delay = setTimeout(function() {
          self.barAnimation({
            obj: self.bar,
            width: 407,
            active: this,
            opacity: 1,
            time: 400
          });
        }, 400);
      }
      return false;
    });
  },
  barAnimation: function(arr) {
    var self = this;
    arr.obj.stop().animate(
      {
        opacity: arr.opacity,
        width: arr.width
      },
      {
        duration: arr.time,
        easing: "easeInOutCubic",
        complete: function() {
          if (arr.active) {
            self.btn.addClass("is-active");
          } else {
            self.btn.removeClass("is-active");
            self.bar.css("display", "none");
            self.btnAnimation(0);
          }
        }
      }
    );
  },
  closeAnimation: function(n) {
    var stop = 0;
    this.searchClose.stop().animate(
      {
        whyNotToUseANonExistingProperty: n
      },
      {
        duration: 300,
        easing: "easeInOutCubic",
        complete: function() {},
        step: function(now, fx) {
          $(this)
            .find("i")
            .css("transform", "scale(" + (1 - now / 10) + ")");
        }
      }
    );
  },
  formAnimation: function(arr) {
    var self = this;
    arr.obj.stop().animate(
      {
        left: arr.left,
        opacity: arr.opacity
      },
      {
        duration: arr.time,
        easing: "easeInOutCubic",
        complete: function() {}
      }
    );
  },
  btnAnimation: function(n) {
    var stop = 0;
    this.btn.stop().animate(
      {
        whyNotToUseANonExistingProperty: n
      },
      {
        duration: 300,
        easing: "easeInOutCubic",
        complete: function() {},
        step: function(now, fx) {
          $(this)
            .find("i")
            .css("transform", "scale(" + (1 - now / 10) + ")");
        }
      }
    );
  }
};
UIAPP.searchBar3 = {
  name: "rate-it",
  description: "up platform tab design handling",
  version: "1.0.0",
  settings: {},
  init: function() {
    var self = this;
    return this.bindings();
  },
  bindings: function(options) {
    var self = this;
    this.bar = $("#search--bar");
    this.btn = $("#search--btn");
    this.glass = this.btn.find("i");

    this.searchInput = this.bar.find(".form--control");
    this.searchBtn = this.bar.find(".search--box__btn");
    this.searchClose = this.bar.find(".search--box__btn-close");

    if (this.btn.attr("event") != undefined) {
      return false;
    }
    $("input, textarea").placeholder();
    this.btn.attr("event", "active");
    this.glass.append(
      '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15.209px" height="15.083px" viewBox="0 0 15.209 15.083" enable-background="new 0 0 15.209 15.083" xml:space="preserve"><circle fill="none" stroke="#010101" stroke-width="2" stroke-miterlimit="10" cx="6.347" cy="6.397" r="5.321"/><line fill="none" stroke="#010101" stroke-width="2" stroke-miterlimit="10" x1="14.5" y1="14.55" x2="10.109" y2="10.16"/></svg>'
    );
    this.glass.addClass("icon--svg");
    this.searchClose
      .find(".icon")
      .append(
        '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 width="12.063px" height="12.125px" viewBox="0 0 12.063 12.125" enable-background="new 0 0 12.063 12.125" xml:space="preserve"><line fill="none" stroke="#010101" stroke-miterlimit="10" x1="11.733" y1="0.375" x2="0.391" y2="11.718"/><line fill="none" stroke="#010101" stroke-miterlimit="10" x1="0.391" y1="0.375" x2="11.733" y2="11.718"/></svg>'
      );

    this.searchClose.find(".icon").addClass("icon--svg");

    this.nav = $(".page--header__nav__item");
    this.navItem = this.nav.find(".page--header__nav__item li");

    this.bar.css("opacity", 0).css("display", "none");
    this.bar.css("width", 52);
    this.searchClose.find("i").css("transform", "scale(0.3)");

    var delay = null;
    this.searchClose.on("click", function() {
      if (self.btn.attr("class").indexOf("is-active") >= 0) {
        if (delay) {
          clearTimeout(delay);
        }
        self.closeAnimation(10);
        delay = setTimeout(function() {
          self.barAnimation({
            obj: self.bar,
            width: 0,
            active: null,
            opacity: 0,
            time: 300
          });
        }, 300);
      }
    });
    this.btn.on("click", function() {
      if (
        $(this)
          .attr("class")
          .indexOf("is-active") < 0
      ) {
        if (delay) {
          clearTimeout(delay);
        }
        self.bar.css("display", "block");
        self.btnAnimation(10);
        self.closeAnimation(0);
        delay = setTimeout(function() {
          self.barAnimation({
            obj: self.bar,
            width: 276,
            active: this,
            opacity: 1,
            time: 400
          });
        }, 400);
      }
      return false;
    });
  },
  barAnimation: function(arr) {
    var self = this;
    arr.obj.stop().animate(
      {
        opacity: arr.opacity,
        width: arr.width
      },
      {
        duration: arr.time,
        easing: "easeInOutCubic",
        complete: function() {
          if (arr.active) {
            self.btn.addClass("is-active");
          } else {
            self.btn.removeClass("is-active");
            self.bar.css("display", "none");
            self.btnAnimation(0);
          }
        }
      }
    );
  },
  closeAnimation: function(n) {
    var stop = 0;
    this.searchClose.stop().animate(
      {
        whyNotToUseANonExistingProperty: n
      },
      {
        duration: 300,
        easing: "easeInOutCubic",
        complete: function() {},
        step: function(now, fx) {
          $(this)
            .find("i")
            .css("transform", "scale(" + (1 - now / 10) + ")");
        }
      }
    );
  },
  formAnimation: function(arr) {
    var self = this;
    arr.obj.stop().animate(
      {
        left: arr.left,
        opacity: arr.opacity
      },
      {
        duration: arr.time,
        easing: "easeInOutCubic",
        complete: function() {}
      }
    );
  },
  btnAnimation: function(n) {
    var stop = 0;
    this.btn.stop().animate(
      {
        whyNotToUseANonExistingProperty: n
      },
      {
        duration: 300,
        easing: "easeInOutCubic",
        complete: function() {},
        step: function(now, fx) {
          $(this)
            .find("i")
            .css("transform", "scale(" + (1 - now / 10) + ")");
        }
      }
    );
  }
};

function tagPanel(data) {
  this.feedHeader = $("#feed__search");
  this.panel = this.feedHeader.find(".feed__search__panel");
  this.searchBar = this.feedHeader.find(".tagsearch");
  this.dataList = this.feedHeader.find(".datalist");
  this.buttonSearch = this.feedHeader.find(".button-search");
  this.buttonSubmit = this.feedHeader.find(".tagsearch__submit");
  this.tagMore = this.feedHeader.find(".more");
  this.data = data.datalist;
  var self = this;
  this.speed = 600;
  this.buttonSubmit.css("right", 0);
  this.buttonSearch.on("click", function() {
    if (
      $(this)
        .attr("class")
        .indexOf("is-active") < 0
    ) {
      $(this).addClass("is-active");
      if (self.panel.attr("class").indexOf("is-active") > 0) {
        self.panel.removeClass("is-active");
      }
      self.showSearchBar();
    } else {
      $(this).removeClass("is-active");
      self.showDataList();
    }
  });
  this.tagMore.on("click", function() {
    if (self.panel.attr("class").indexOf("is-active") < 0) {
      self.panel.addClass("is-active");
    } else {
      self.panel.removeClass("is-active");
    }
  });
}
tagPanel.prototype.showDataList = function() {
  var self = this;
  self.buttonSearch
    .find("span")
    .stop()
    .animate(
      {
        top: 0
      },
      {
        duration: self.speed,
        easing: "easeInOutQuint",
        complete: function() {}
      }
    );

  self.searchBar.stop().animate(
    {
      top: -52
    },
    {
      duration: self.speed,
      easing: "easeInOutQuint",
      complete: function() {}
    }
  );
  self.dataList.stop().animate(
    {
      top: -52
    },
    {
      duration: self.speed,
      easing: "easeInOutQuint",
      complete: function() {}
    }
  );
};
tagPanel.prototype.showSearchBar = function() {
  var html = "";
  var li = this.dataList.find("ul li");
  if (this.data == true) {
    html += "";
    html += '<datalist id="tagsearch-form">';
    for (var i = 0; i < li.length; i++) {
      html +=
        '<option value="' +
        li
          .eq(i)
          .find("a")
          .html() +
        '">';
    }
    html += "</datalist>";
    $("#tagsearch-form").remove();
    this.panel.append(html);
  }
  var self = this;

  this.buttonSearch
    .find("span")
    .stop()
    .animate(
      {
        top: -37
      },
      {
        duration: self.speed,
        easing: "easeInOutQuint",
        complete: function() {}
      }
    );

  this.searchBar.stop().animate(
    {
      top: 0
    },
    {
      duration: self.speed,
      easing: "easeInOutQuint",
      complete: function() {}
    }
  );
  this.dataList.stop().animate(
    {
      top: 0
    },
    {
      duration: self.speed,
      easing: "easeInOutQuint",
      complete: function() {}
    }
  );
};

function getPresent(n1, n2) {
  return Math.floor((n1 / n2) * 100);
}
var cardSliderClear;
UIAPP.cardSlider = {
  name: "banner slider",
  description: "up platform banner slider design handling",
  version: "1.0.0",
  settings: {},
  init: function(options) {
    $.extend(true, this.settings, options);
    var self = this;
    var slider = $("[slider=true]");
    var button = null;
    var paging = null;
    var rolling = null;
    var animate = null;
    if (cardSliderClear) {
      for (var i = 0; i < cardSliderClear.length; i++) {
        clearInterval(cardSliderClear[i]);
      }
    }
    cardSliderClear = [];
    for (var i = 0; i < slider.length; i++) {
      if (slider.eq(i).attr("button") != undefined) {
        button = slider.eq(i).attr("button") == "true" ? true : null;
      }
      if (slider.eq(i).attr("paging") != undefined) {
        paging = slider.eq(i).attr("paging") == "true" ? true : null;
      }
      if (slider.eq(i).attr("rolling") != undefined) {
        rolling = slider.eq(i).attr("rolling") == "true" ? true : null;
        cardSliderClear.push(null);
      }
      if (slider.eq(i).attr("animate") != undefined) {
        animate = slider.eq(i).attr("animate") == "true" ? true : null;
      }
      this.bindings({
        _el: slider.eq(i),
        _auto: rolling,
        _delay:
          slider.eq(i).attr("delay") != undefined
            ? Number(slider.eq(i).attr("delay"))
            : null,
        _paging: paging,
        _button: button,
        _index: i,
        _animate: animate
      });
    }
  },
  bindings: function(options) {
    var slider = $(options._el);
    var item = slider.find(".card__slide-item");
    var count = 0;
    var prev = 0;
    var next = 0;
    var aniClear = null;
    var autoClear = null;
    slider.find(".card__paging").remove();
    slider.find(".card__prev , .card__next").remove();
    if (options._paging) {
      slider.append('<div class="card__paging"></div>');
    }
    if (options._button) {
      slider.append(
        '<button type="button" class="card__prev"></button><button type="button" class="card__next"></button>'
      );
    }
    var paging = slider.find(".card__paging");
    var btnPrev = slider.find(".card__prev");
    var btnNext = slider.find(".card__next");

    for (var i = 0; i < item.length; i++) {
      if (i) {
        item.eq(i).css("left", 20);
        if (options._paging) {
          paging.append(
            '<button type="button" class="card__paging__control"></button>'
          );
        }
      } else {
        if (options._paging) {
          paging.append(
            '<button type="button" class="card__paging__control is-active"></button>'
          );
        }
      }
    }
    var pagingButton = paging.find("button");
    item
      .eq(0)
      .css("left", 0)
      .css("z-index", 1);
    slider
      .add(pagingButton)
      .add(btnPrev)
      .add(btnNext)
      .unbind("mouseover");
    slider
      .add(pagingButton)
      .add(btnPrev)
      .add(btnNext)
      .unbind("mouseleave");
    pagingButton
      .add(btnPrev)
      .add(btnNext)
      .unbind("click");

    btnNext.on("click", function() {
      nextMove(null);
    });
    btnPrev.on("click", function() {
      prevMove(null);
    });
    slider
      .add(pagingButton)
      .add(btnPrev)
      .add(btnNext)
      .on("mouseover", function() {
        if (cardSliderClear[options._index]) {
          clearInterval(cardSliderClear[options._index]);
        }
      });
    slider.on("mouseleave", function(e) {
      e.preventDefault();
      if (cardSliderClear[options._index]) {
        clearInterval(cardSliderClear[options._index]);
      }
      auto();
    });
    pagingButton.on("click", function() {
      if (count == $(this).index()) {
        return false;
      }
      if (count > $(this).index()) {
        prevMove($(this).index());
      } else {
        nextMove($(this).index());
      }
    });
    auto();
    function auto() {
      if (!options._auto) {
        return false;
      }
      if (cardSliderClear[options._index]) {
        clearInterval(cardSliderClear[options._index]);
      }
      cardSliderClear[options._index] = setInterval(function() {
        nextMove(null);
      }, options._delay);
    }
    function prevMove(c) {
      if (aniClear) {
        return false;
      }

      prev = count;
      if (c == undefined) {
        count -= 1;
      } else {
        count = c;
      }

      if (count < 0) {
        count = item.length - 1;
      }
      pagingButton.removeClass("is-active");
      pagingButton.eq(count).addClass("is-active");
      item.removeClass("is-active");
      item.eq(count).addClass("is-active");
      animate(20, 0);
    }
    function nextMove(c) {
      if (aniClear) {
        return false;
      }
      prev = count;
      if (c == undefined) {
        count += 1;
      } else {
        count = c;
      }
      if (count > item.length - 1) {
        count = 0;
      }

      pagingButton.removeClass("is-active");
      pagingButton.eq(count).addClass("is-active");
      item.removeClass("is-active");
      item.eq(count).addClass("is-active");
      animate(-20, 0);
    }
    function animate(p, n) {
      aniClear = this;
      var prevLeft = 0;
      item.eq(prev).css("z-index", 0);
      if (p == -20) {
        item
          .eq(count)
          .css("z-index", 1)
          .css("display", "block")
          .css("left", 20);
      } else {
        item
          .eq(count)
          .css("z-index", 1)
          .css("display", "block")
          .css("left", -20);
      }

      pagingButton.removeClass("is-active");
      pagingButton.eq(count).addClass("is-active");

      if (!options._animate) {
        item
          .eq(prev)
          .stop()
          .css({
            opacity: 0,
            left: p,
            display: "none"
          });
        item
          .eq(count)
          .stop()
          .css({
            opacity: 1,
            left: n,
            display: "block"
          });
        aniClear = null;
        return false;
      }
      item
        .eq(prev)
        .stop()
        .animate(
          {
            left: p,
            opacity: 0
          },
          {
            duration: 700,
            easing: "easeInOutQuad",
            complete: function() {
              $(this).css("display", "none");
            }
          }
        );
      item
        .eq(count)
        .stop()
        .animate(
          {
            left: n,
            opacity: 1
          },
          {
            duration: 400,
            easing: "easeInOutQuad",
            complete: function() {
              aniClear = null;
            }
          }
        );
    }
  }
};

UIAPP.formSet = function() {
  UIAPP.drawSelect.init({
    $el: $(".js-formbox--base-c.js-formbox--shape-f"),
    _name: "formbox--base-c",
    _shape: "formbox--shape-f"
  });

  UIAPP.drawSelect.init({
    $el: $(".js-formbox--base-c.js-formbox--shape-b"),
    _name: "formbox--base-c",
    _shape: "formbox--shape-b"
  });
  UIAPP.drawSelect.init({
    $el: $(".js-formbox--base-c.js-formbox--shape-b"),
    _name: "formbox--base-c",
    _shape: "formbox--shape-b"
  });

  $(".tab__hidden").removeClass("tab__hidden");
};

$(function() {
  popslideimg();
  popslidemenu();
});
function popslideimg() {
  var par = $("#slide-area-pop");
  var btnPrev = par.find(".prev-btn");
  var btnNext = par.find(".next-btn");
  var itemPar = par.find(".slide-wrapper");
  var item = itemPar.find("li");
  var box = par.find(".slider-overflow");
  var boxWidth = box.outerWidth() + 20;
  itemPar.css("width", item.eq(0).outerWidth() * item.length);
  var count = 0;
  var listItem;
  var view = $("#image-area");
  var stop = false;
  var leftHis = 0;
  item.find("a").on("click", function(e) {
    e.preventDefault();
    item.removeClass("is-active");
    $(this)
      .parent()
      .addClass("is-active");
    var input = $(this).find("input");
    var html = '<a href="' + input.val() + '" target="_balnk">';
    html += '<img src="' + input.val() + '">';
    html += "</a>";
    view.html(html);
  });
  btnPrev.on("click", function() {
    if (stop) {
      return false;
    }
    stop = true;
    count--;
    btnNext.removeAttr("disabled");
    if (count < 0) {
      count = 0;
      btnPrev.attr("disabled", "disabled");
    } else {
      btnPrev.removeAttr("disabled");
    }
    var leftPosi = boxWidth * count;
    //itemPar.css('left' , -leftPosi )
    ani(-leftPosi);
  });
  btnNext.on("click", function() {
    if (stop) {
      return false;
    }
    stop = true;
    count++;
    btnPrev.removeAttr("disabled");
    if (Math.ceil(item.length / 5) <= count) {
      //count =0;
      btnNext.attr("disabled", "disabled");
      count = Math.ceil(item.length / 5) - 1;
      stop = false;
      return false;
    } else {
      btnNext.removeAttr("disabled");
    }
    var leftPosi = boxWidth * count;
    //leftPosi = leftPosi+20
    //itemPar.css('left' , -leftPosi )
    ani(-leftPosi);
  });
  function ani(leftPosi) {
    itemPar.stop().animate(
      {
        left: leftPosi
      },
      {
        duration: 1000,
        easing: "easeInOutQuint",
        complete: function() {
          stop = false;
        }
      }
    );
  }
}
function popslidemenu() {
  var par = $("#slide-area-pop2");
  var btnPrev = par.find(".prev-btn");
  var btnNext = par.find(".next-btn");
  var itemPar = par.find(".slide-wrapper");
  var item = itemPar.find("li");
  var box = par.find(".slider-overflow");
  var boxWidth = box.outerWidth() + 0;
  itemPar.css("width", item.eq(0).outerWidth() * item.length);
  var count = 0;
  var listItem;
  var stop = false;
  var leftHis = 0;
  item.find("a").on("click", function(e) {
    e.preventDefault();
    item.removeClass("is-active");
    $(this)
      .parents("li")
      .addClass("is-active");
    console.log($(this).parents("li").length);
  });
  btnPrev.on("click", function() {
    if (stop) {
      return false;
    }
    stop = true;
    count--;
    btnNext.removeAttr("disabled");
    if (count < 0) {
      count = 0;
      btnPrev.attr("disabled", "disabled");
    } else {
      btnPrev.removeAttr("disabled");
    }
    var leftPosi = boxWidth * count;
    //itemPar.css('left' , -leftPosi )
    ani(-leftPosi);
  });
  btnNext.on("click", function() {
    if (stop) {
      return false;
    }
    stop = true;
    count++;
    btnPrev.removeAttr("disabled");
    if (Math.ceil(item.length / 5) <= count) {
      //count =0;
      btnNext.attr("disabled", "disabled");
      count = Math.ceil(item.length / 5) - 1;
      stop = false;
      return false;
      return false;
    } else {
      btnNext.removeAttr("disabled");
    }
    var leftPosi = boxWidth * count;
    //leftPosi = leftPosi+20
    //itemPar.css('left' , -leftPosi )
    ani(-leftPosi);
  });
  function ani(leftPosi) {
    itemPar.stop().animate(
      {
        left: leftPosi
      },
      {
        duration: 1000,
        easing: "easeInOutQuint",
        complete: function() {
          stop = false;
        }
      }
    );
  }
}

$(function() {
  UIAPP.cardSlider.init();

  UIAPP.nav.init({
    _el: $(".nav--page"),
    _first: ".nav--page__items__item",
    _second: ".sub",
    _event: "mouseover"
  });

  UIAPP.dialog.init({
    _el: $(".js-layer"),
    _target: $("#layer-gallery"),
    _close: $(".js-layer-close"),
    _dimmed: true,
    _scroll: false
  });

  UIAPP.popover.init({ _name: "popover" });

  UIAPP.headerFixed.init({
    _el: $(".header--main"),
    _listener: $(window),
    _scrollTop: 10,
    _addClass: "header-fixed"
  });
  UIAPP.headerFixed.init({
    _el: $(".share--menu"),
    _listener: $("#layer-detail"),
    _scrollTop: 142,
    _addClass: "share--menu-fixed"
  });

  UIAPP.headerFixed.init({
    _el: $(".layer-detail__close"),
    _listener: $("#layer-detail"),
    _scrollTop: 67,
    _addClass: "layer-detail-fixed"
  });

  UIAPP.headerFixed.init({
    _follow: $(".page--content"),
    _el: $(".page--right"),
    _listener: $(window),
    _scrollTop: 462,
    _addClass: "page--right-fixed"
  });

  UIAPP.headerFixed.init({
    _el: $(".renewal .page--right"),
    _listener: $(window),
    _scrollTop: 323,
    _addClass: "page--right-fixed"
  });

  UIAPP.headerFixed.init({
    _el: $(".container--search .page--left"),
    _listener: $(window),
    _scrollTop: 0,
    _addClass: "page--left-fixed"
  });

  //    UIAPP.headerFixed.init({
  //        _el: $('.layer-popup--right'),
  //        _listener: $('#dialog--detail'),
  //        _scrollTop: 0,
  //        _addClass: "layer-popup--right-fixed"
  //    });

  //wholee
  UIAPP.headerFixed.init({
    _el: $(".layer-popup--project-f--right"),
    _listener: $("#dialog--detail--pf"),
    _scrollTop: 0,
    _addClass: "layer-popup--project-f--right-fixed"
  });

  UIAPP.headerFixed.init({
    _el: $(".tag"),
    _listener: $(window),
    _scrollTop: 260,
    _addClass: "tag-fixed"
  });

  UIAPP.headerFixed.init({
    _el: $(".workshop .tag"),
    _listener: $(window),
    _scrollTop: 0,
    _addClass: "tag-fixed"
  });

  UIAPP.headerFixed.init({
    _el: $(".client .tag"),
    _listener: $(window),
    _scrollTop: 0,
    _addClass: "tag-fixed"
  });

  UIAPP.headerFixed.init({
    _el: $(".myhome .tag"),
    _listener: $(window),
    _scrollTop: 100,
    _addClass: "tag-fixed"
  });
  UIAPP.headerFixed.init({
    _el: $(".gametalk .page--right"),
    _listener: $(window),
    _scrollTop: 200,
    _addClass: "page--right-fixed"
  });

  UIAPP.headerFixed.init({
    _el: $(".community.page--right"),
    _listener: $(window),
    _scrollTop: 409,
    _addClass: "page--right-fixed"
  });

  UIAPP.headerFixed.init({
    _el: $(".container--search .page--right"),
    _listener: $(window),
    _scrollTop: 0,
    _addClass: "page--right-fixed"
  });

  UIAPP.headerFixed.init({
    _el: $(".myhome .page--right"),
    _listener: $(window),
    _scrollTop: 100,
    _addClass: "page--right-fixed"
  });

  UIAPP.tabs.init({
    _el: $(".tab .tab__nav a"),
    _target: $(".tab .tab__pane"),
    _addClass: "is-active"
  });

  UIAPP.gallery.init({
    _el: $("#gallery-package"),
    _thumbnalils: $("#gallery-package .gallery__thumbnails"),
    _thumbnaView: 5,
    _thumControler: $("#gallery-package .gallery__control"),
    _thumbnalilWidth: 111,
    _screen: $("#gallery-package .gallery__screen"),
    _layer: true,
    _layerScreen: $(".layer-gallery_screen"),
    _layerControler: $(".layer-gallery_control")
  });

  UIAPP.gallery.init({
    _el: $("#gallery-info"),
    _thumbnalils: $("#gallery-info .gallery__thumbnails"),
    _thumbnaView: 6,
    _thumControler: $("#gallery-info .gallery__control"),
    _thumbnalilWidth: 140,
    _screen: $("#gallery-info .gallery__screen"),
    _layer: false,
    _layerScreen: $(".layer-gallery_screen"),
    _layerControler: $(".layer-gallery_control")
  });

  UIAPP.slider.init({
    _el: $(".slider--base-a.slider--shape-a"),
    _screen: $(".slider--base-a.slider--shape-a .slider__screen"),
    _paging: $(".slider--base-a.slider--shape-a .slider__dot"),
    _slideWidth: 873,
    _slider_speed: 600,
    _slider_timer: 1,
    _slider_autoPlay: false,
    _addClass: "is-active",
    _sliderControler: $(".slider--base-a.slider--shape-a .slider__control")
  });

  UIAPP.slider.init({
    _el: $(".slider--base-a.slider--shape-b"),
    _screen: $(".slider--base-a.slider--shape-b .slider__screen"),
    _paging: $(".slider--base-a.slider--shape-b .slider__dot"),
    _slideWidth: 1024,
    _slider_speed: 600,
    _slider_timer: 2,
    _slider_autoPlay: false,
    _addClass: "is-active",
    _sliderControler: $(".slider--base-a.slider--shape-b .slider__control")
  });

  UIAPP.slider.init({
    _el: $(".slider--base-a.slider--shape-c"),
    _screen: $(".slider--base-a.slider--shape-c .slider__screen"),
    _paging: $(".slider--base-a.slider--shape-c .slider__dot"),
    _slideWidth: 763,
    _slider_speed: 600,
    _slider_timer: 4,
    _slider_autoPlay: true,
    _addClass: "is-active",
    _sliderControler: $(".slider--base-a.slider--shape-c .slider__control")
  });

  UIAPP.slider.init({
    _el: $(".slider--base-a.slider--shape-e"),
    _screen: $(".slider--base-a.slider--shape-e .slider__screen"),
    _paging: $(".slider--base-a.slider--shape-e .slider__dot"),
    _slideWidth: 328,
    _slider_speed: 600,
    _slider_timer: 2,
    _slider_autoPlay: false,
    _addClass: "is-active",
    _sliderControler: $(".slider--base-a.slider--shape-e .slider__control")
  });

  UIAPP.slider.init({
    _el: $(".slider--base-a.slider--shape-f"),
    _screen: $(".slider--base-a.slider--shape-f .slider__screen"),
    _paging: $(".slider--base-a.slider--shape-f .slider__dot"),
    _slideWidth: 241,
    _slider_speed: 600,
    _slider_timer: 5,
    _slider_autoPlay: true,
    _addClass: "is-active",
    _sliderControler: $(".slider--base-a.slider--shape-f .slider__control")
  });

  UIAPP.slider.init({
    _el: $(".slider--base-a.slider--shape-g"),
    _screen: $(".slider--base-a.slider--shape-g .slider__screen"),
    _paging: $(".slider--base-a.slider--shape-g .slider__dot"),
    _slideWidth: 218,
    _slider_speed: 600,
    _slider_timer: 5,
    _slider_autoPlay: true,
    _addClass: "is-active",
    _sliderControler: $(".slider--base-a.slider--shape-g .slider__control")
  });
  UIAPP.slider.init({
    _el: $(".slider--base-a.slider--shape-h"),
    _screen: $(".slider--base-a.slider--shape-h .slider__screen"),
    _paging: $(".slider--base-a.slider--shape-h .slider__dot"),
    _slideWidth: 304,
    _slider_speed: 600,
    _slider_timer: 3,
    _slider_randomPlay: true,
    _slider_autoPlay: true,
    _addClass: "is-active",
    _sliderControler: $(".slider--base-a.slider--shape-h .slider__control")
  });
  UIAPP.slider.init({
    _el: $(".slider--base-a.slider--shape-j"),
    _screen: $(".slider--base-a.slider--shape-j .slider__screen"),
    _paging: $(".slider--base-a.slider--shape-j .slider__dot"),
    _slideWidth: 1264,
    _slider_speed: 600,
    _slider_timer: 5,
    _slider_randomPlay: false,
    _slider_autoPlay: true,
    _slider_dot: true,
    _addClass: "is-active",
    _sliderControler: $(".slider--base-a.slider--shape-j .slider__control")
  });
  UIAPP.slider.init({
    _el: $(".slider--base-a.slider--shape-k"),
    _screen: $(".slider--base-a.slider--shape-k .slider__screen"),
    _paging: $(".slider--base-a.slider--shape-k .slider__dot"),
    _slideWidth: 478,
    _slider_speed: 600,
    _slider_timer: 5,
    _slider_randomPlay: false,
    _slider_autoPlay: true,
    _slider_dot: false,
    _addClass: "is-active",
    _sliderControler: $(".slider--base-a.slider--shape-k .slider__control")
  });
  UIAPP.slider.init({
    _el: $(".slider--base-a.slider--shape-l"),
    _screen: $(".slider--base-a.slider--shape-l .slider__screen"),
    _paging: $(".slider--base-a.slider--shape-l .slider__dot"),
    _slideWidth: 478,
    _slider_speed: 600,
    _slider_timer: 5,
    _slider_randomPlay: false,
    _slider_autoPlay: true,
    _slider_dot: false,
    _addClass: "is-active",
    _sliderControler: $(".slider--base-a.slider--shape-l .slider__control")
  });

  UIAPP.drawCheckbox.init({
    $el: $(".js-formstyle, .js-formstyle__blue"),
    _name: "formstyle"
  });

  UIAPP.drawSelect.init({
    $el: $(".js-formbox--base-c.js-formbox--shape-a"),
    _name: "formbox--base-c",
    _shape: "formbox--shape-a"
  });

  UIAPP.drawSelect.init({
    $el: $(".js-formbox--base-c.js-formbox--shape-b"),
    _name: "formbox--base-c",
    _shape: "formbox--shape-b"
  });

  UIAPP.drawSelect.init({
    $el: $(".js-formbox--base-c.js-formbox--shape-c"),
    _name: "formbox--base-c",
    _shape: "formbox--shape-c"
  });

  UIAPP.drawSelect.init({
    $el: $(".js-formbox--base-c.js-formbox--shape-d"),
    _name: "formbox--base-c",
    _shape: "formbox--shape-d"
  });

  // toonspoon select box
  UIAPP.drawSelect.init({
    $el: $(".js-formbox--base-c.js-formbox--shape-e"),
    _name: "formbox--base-c",
    _shape: "formbox--shape-e"
  });
  UIAPP.drawSelect.init({
    $el: $(".js-formbox--base-c.js-formbox--shape-f"),
    _name: "formbox--base-c",
    _shape: "formbox--shape-f"
  });

  UIAPP.drawSelect.init({
    $el: $(".js-formbox--base-c.js-formbox--shape-e--disabled"),
    _name: "formbox--base-c",
    _shape: "formbox--shape-e--disabled"
  });
  // toonspoon select box

  UIAPP.alert.init();

  UIAPP.toggleEvent.init({
    $el: $(".card--base-b"),
    eventType: "hover",
    setClassName: "is-active"
  });

  UIAPP.dropdown.init({
    $el: $(".dropdown__toggle")
  });

  footerNotice();

  cpNotice();

  //textareaFocusButtonActive();
});

function footerNotice() {
  var refreshIntervalId = null;

  if ($(".footer-notice__list__item").length <= 1) {
    return false;
  }

  if (refreshIntervalId) {
    clearInterval(refreshIntervalId);
  }

  rolling();

  $(".footer-notice__list").hover(
    function() {
      clearInterval(refreshIntervalId);
    },
    function() {
      clearInterval(refreshIntervalId);
      rolling();
    }
  );

  $(".footer-notice__list li").css("position", "relative");

  function rolling() {
    refreshIntervalId = setInterval(function() {
      var rolling = $(".footer-notice__list li");

      rolling.stop().animate(
        {
          top: -rolling.height()
        },
        {
          duration: 1000,
          easing: "easeInOutQuint",
          complete: function() {
            rolling.stop().css("top", "0px");
            $(".footer-notice__list").append(rolling.eq(0));
          }
        }
      );
    }, 5000);
  }
}

function cpNotice() {
  var refreshIntervalId = null;
  var btnPrev = $(".notice__btn--prev");
  var btnNext = $(".notice__btn--next");
  var noticeUl = $(".notice__list ul");

  if ($(".notice__list li").length <= 1) {
    return false;
  }
  if (refreshIntervalId) {
    clearInterval(refreshIntervalId);
  }

  rolling(0);

  var count = 0;
  $(".notice__list li").css("position", "relative");

  btnNext.on("mouseenter", function(e) {
    if (refreshIntervalId) {
      clearInterval(refreshIntervalId);
    }
  });
  btnNext.on("mouseleave", function(e) {
    if (refreshIntervalId) {
      clearInterval(refreshIntervalId);
    }
    rolling(0);
  });

  btnPrev.on("mouseenter", function(e) {
    if (refreshIntervalId) {
      clearInterval(refreshIntervalId);
    }
  });
  btnPrev.on("mouseleave", function(e) {
    if (refreshIntervalId) {
      clearInterval(refreshIntervalId);
    }
    rolling(0);
  });

  noticeUl.on("mouseenter", function(e) {
    if (refreshIntervalId) {
      clearInterval(refreshIntervalId);
    }
  });
  noticeUl.on("mouseleave", function(e) {
    if (refreshIntervalId) {
      clearInterval(refreshIntervalId);
    }
    rolling(0);
  });

  btnPrev.on("click", function(e) {
    e.preventDefault();
    animation(0);
  });
  btnNext.on("click", function(e) {
    e.preventDefault();
    animation(1);
  });

  function animation(c) {
    var rolling = $(".notice__list li");
    var h = rolling.height();
    if (c == 0) {
      h = h;
    } else {
      h = -h;
    }
    rolling.stop().animate(
      {
        top: h
      },
      {
        duration: 500,
        easing: "easeInOutQuint",
        complete: function() {
          rolling.stop().css("top", "0px");
          if (c == 0) {
            var child = $(".notice__list ul li").last();
            $(".notice__list ul").prepend(child);
          } else {
            var child = $(".notice__list ul li").first();
            $(".notice__list ul").append(child);
          }
        }
      }
    );
  }
  function rolling() {
    refreshIntervalId = setInterval(function() {
      animation(1);
    }, 5000);
  }
}

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function getMouse(e) {
  this.X = parseInt(e.clientX);
  this.Y = parseInt(e.clientY);
}

$.prevPopover = undefined;

$.fn.extend({
  dialog: function(opts) {
    var $dialog = $(this),
      opts = opts || {
        dimmed: true,
        scroll: true
      };
    if (opts.dimmed) {
      $("html").addClass("dimmed");
    } else {
      $("html").removeClass("dimmed");
    }
    if (opts.scroll) {
      $("html").removeClass("none-scroll");
    } else {
      $("html").addClass("none-scroll");
    }
    return this;
  }
});

$.extend({
  hoverClass: function() {
    var $self = $(this),
      className = $self.attr("js-hover");
    $self.toggleClass(className);
  },
  clickAlert: function() {
    var $anchor = $(this),
      layer = $(this).attr("href") || $(this).data("target"),
      layer = layer.replace("@", "#"),
      $layer = $(layer),
      $dialogs = $(".dialog");
    $layer
      .dialog({
        dimmed: true,
        scroll: false
      })
      .show()
      .one("click", ".js-alert-x", function() {
        $layer.hide();
        if (!$dialogs.is(":visible")) {
          $layer.dialog({
            dimmed: false,
            scroll: true
          });
        }
      });

    UIAPP.formSet();

    UIAPP.drawSelect.init({
      $el: $(".js-formbox--base-c.js-formbox--shape-d"),
      _name: "formbox--base-c",
      _shape: "formbox--shape-d"
    });

    UIAPP.drawSelect.init({
      $el: $(".js-formbox--base-c.js-formbox--shape-d"),
      _name: "formbox--base-c",
      _shape: "formbox--shape-d"
    });

    return false;
  },
  clickLayer: function() {
    var $anchor = $(this),
      layer = $(this).attr("href"),
      layer = layer.replace("@", "#"),
      $layer = $(layer);
    $layer
      .dialog({
        dimmed: true,
        scroll: false
      })
      .show()
      .one("click", ".js-layer-x", function() {
        $layer
          .dialog({
            dimmed: false,
            scroll: true
          })
          .hide();
      });
    return false;
  },
  clickLayerPopover: function() {
    var $anchor = $(this),
      $target = $(this.hash),
      $layer = $(".layer"),
      offset = $anchor.offset(),
      scrollTop = $(window).scrollTop(),
      opts = $anchor.attr("js-layer-popover") || '{ "left": 0, "top": 0 }',
      opts2json = JSON.parse(opts),
      top = offset.top - scrollTop + opts2json.top,
      left = offset.left + opts2json.left;
    if ($target.length === 0) {
      var popoverId = $anchor.attr("popover-id");
      $target = $(popoverId);
    }
    if ($.prevPopover) {
      $.prevPopover.hide();
    }
    $.prevPopover = $target;
    $target
      .show()
      .css({ position: "fixed", top: top, left: left })
      .one("click", ".js-popover-x", function() {
        $target.hide();
      });
    $(document).on("click.popover", function(e) {
      if (!$target.is(e.target) && $target.has(e.target).length === 0) {
        $target.hide();
        $(document).off("click.popover");
      }
    });
    $layer.on("scroll", function() {
      $target.hide();
    });

    return false;
  },
  clickPopover: function() {
    var $anchor = $(this),
      $target = $(this.hash),
      offset = $anchor.offset(),
      scrollTop = $(window).scrollTop(),
      opts = $anchor.attr("js-popover") || '{ "left": 0, "top": 0 }',
      opts2json = JSON.parse(opts),
      top = offset.top - scrollTop + opts2json.top,
      left = offset.left + opts2json.left;
    if ($.prevPopover) {
      $.prevPopover.hide();
    }
    $.prevPopover = $target;
    $target
      .show()
      .css({ position: "fixed", top: top, left: left })
      .one("click", ".js-popover-x", function() {
        $target.hide();
      });
    $(document).on("click.popover", function(e) {
      if (!$target.is(e.target) && $target.has(e.target).length === 0) {
        $target.hide();
        $(document).off("click.popover");
      }
    });
    $(document).on("scroll", function() {
      $target.hide();
    });

    return false;
  },
  hoverPopover: function() {
    var $self = $(this),
      offset = $self.offset(),
      id = $self.attr("js-hover-popover"),
      data = $self.data();
    $(id).toggle();
    if (data.position) {
      $(id).css({
        position: "fixed",
        top: offset.top + data.position.top,
        left: offset.left + data.position.left
      });
    }
  }
});

$.textareaAutoHeight = function() {
  /*global document:false, $:false */
  var txt = $(".comments"),
    hiddenDiv = $(document.createElement("div")),
    content = null;

  txt.addClass("txtstuff");
  hiddenDiv.addClass("hiddendiv comment");

  $("body").append(hiddenDiv);

  txt.each(function(i, comments) {
    $(comments)
      .on("keyup", function() {
        content = $(this).val();
        content = content.replace(/\n/g, "<br>");

        hiddenDiv.html(content + '<br class="lbr">');
      })
      .click(function() {
        $(".feed__write__attach--button").css("display", "block");
        $(".feed__write__lock").css("display", "block");
      })
      .blur(function() {
        if ($(this)[0].value == "") {
          $(".feed__write__attach--button").css("display", "none");
          $(".feed__write__lock").css("display", "none");
        } else {
          $(".feed__write__attach--button").css("display", "block");
          $(".feed__write__lock").css("display", "block");
        }
      });
  });
};
$.reportPopupTextarea = function() {
  $("#dialog--report textarea").attr("disabled", true);
  $("#dialog--report-china textarea").attr("disabled", true);

  $("#dialog--report input[type=radio]").change(function() {
    $("#report").attr("disabled", !($(this).val() == "yes"));
  });

  $("#dialog--report-china input[type=radio]").change(function() {
    $("#china").attr("disabled", !($(this).val() == "yes"));
    $("#china2").attr("disabled", !($(this).val() == "ok"));
  });
};
$.introduceTextarea = function() {
  $(".introduce__write__box__comment").keypress(function(event) {
    if (event.keyCode == 13) {
      event.preventDefault();
    }
  });
  $(".introduce__write__box__remaining").each(function() {
    var $maxcount = $(".count", this);
    var $input = $(".introduce__write__box__comment");
    var maximumByte = $maxcount.text() * 1;
    var update = function() {
      var before = $maxcount.text() * 1;
      var str_len = $input.val().length;
      var cbyte = 0;
      var li_len = 0;
      for (i = 0; i < str_len; i++) {
        var ls_one_char = $input.val().charAt(i);
        if (escape(ls_one_char).length > 4) {
          cbyte += 2;
        } else {
          cbyte++;
        }
        if (cbyte <= maximumByte) {
          li_len = i + 1;
        }
      }
      if (parseInt(cbyte) > parseInt(maximumByte)) {
        alert("The number of characters exceeded.");
        var str = $input.val();
        var str2 = $input.val().substr(0, li_len);
        $input.val(str2);
        var cbyte = 0;
        for (i = 0; i < $input.val().length; i++) {
          var ls_one_char = $input.val().charAt(i);
          if (escape(ls_one_char).length > 4) {
            cbyte += 2;
          } else {
            cbyte++;
          }
        }
      }
      var now = maximumByte - cbyte;
      if (before != now) {
        $maxcount.text(now);
      }
    };
    $input.bind("input keyup paste", function() {
      setTimeout(update, 0);
    });

    update();
  });
};

function getOffsetBody() {
  if ($("#getOffsetBody").length == 0) {
    $("body").append(
      '<div style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;" id="getOffsetBody"></div>'
    );
  }
  this.width = $("#getOffsetBody").width();
  this.height = $("#getOffsetBody").height();
  $("#getOffsetBody").remove();
}
function getScrollTop(s) {
  this.top = s;
}
function scrollUI(arr) {
  this.target = arr.obj;
  this.ran = this.randomUi(200, 2000);
  this.setup();
  this.mouseOffset;
  this.track = this.obj.find(".scrollable-track");
  this.bar = this.obj.find(".scrollable-bar");
  this.handle = this.obj.find(".scrollable-face");
  this.topBtn = this.obj.find(".scrollable-arrow-top");
  this.btmBtn = this.obj.find(".scrollable-arrow-bottom");
  this.body = this.target;

  this.content = arr.content;
  this.move = null;
  var self = this;
  this.scrollStopClear = null;
  this.scrollLiveClear = null;
  this.mouseMotion = null;

  $(document).on("mousemove", function(e) {
    self.buttonDrag(e);
  });
  $(document).on("mouseup", function() {
    self.move = null;
    self.scrollLive();
  });
  this.scrollLive();
  this.body.on("scroll", function() {
    if (self.move == null) {
      clearInterval(self.scrollLiveClear);
      self.scrollStop(function() {
        self.scrollLive();
      });
      self.scrollReset();
    }
  });
  this.handle[0].onmousedown = function(e) {
    e = e || window.event;
    e.stopPropagation();
    self.move = $(this);
    clearInterval(self.scrollLiveClear);
    self.mouseOffset = self.getPosi(self.track, this, e);
    $(this).addClass("active");
    return false;
  };
  this.handle[0].onmouseup = function() {
    $(this).removeClass("active");
  };
  this.track.on("mousedown", function(e) {
    e = e || window.event;
    var scHeight = self.getContentHeight(self.body);
    scHeight = scHeight - self.body.height();
    self.body.scrollTop(
      (scHeight / (self.track.height() - self.handle.height())) *
        (new getMouse(e).Y -
          self.handle.height() / 2 +
          $(window).scrollTop() -
          self.track.offset().top)
    );
  });
  this.topBtn.on("mousedown", function() {
    clearInterval(self.scrollLiveClear);
    var scrTop = self.scrollBtmStop(
      self.body.scrollTop() -
        (self.getContentHeight(self.body) - self.body.height()) / 10
    );
    self.body.scrollTop(scrTop);
    $(this).addClass("active");
  });
  this.btmBtn.on("mousedown", function() {
    clearInterval(self.scrollLiveClear);
    var scrTop = self.scrollBtmStop(
      self.body.scrollTop() +
        (self.getContentHeight(self.body) - self.body.height()) / 10
    );
    self.body.scrollTop(scrTop);
    $(this).addClass("active");
  });
  this.topBtn.on("mouseup", function() {
    self.scrollLive();
    $(this).removeClass("active");
  });
  this.btmBtn.on("mouseup", function() {
    self.scrollLive();
    $(this).removeClass("active");
  });
  this.bar.on("mousewheel DOMMouseScroll", function(e) {
    if (self.move) {
      return false;
    }
    var detail = 0;
    var scrTop = 0;
    var e = e.originalEvent;
    if (e.detail) {
      detail = e.detail * -40;
    } else {
      detail = e.wheelDelta;
    }
    wheel(detail);
    return false;
  });
  /*
    this.track.on('mousewheel DOMMouseScroll', function(e) {
        if(self.move){return false}
        wheel(e)
    });
    */
  function wheel(detail) {
    if (detail < 0) {
      clearInterval(self.scrollLiveClear);
      scrTop = self.scrollBtmStop(
        self.body.scrollTop() +
          (self.getContentHeight(self.body) - self.body.height()) / 20
      );
    } else {
      scrTop = self.scrollBtmStop(
        self.body.scrollTop() -
          (self.getContentHeight(self.body) - self.body.height()) / 20
      );
    }
    self.body.scrollTop(scrTop);
  }
  $(document).on("mouseout", function() {
    self.handle.removeClass("active");
    self.topBtn.removeClass("active");
    self.btmBtn.removeClass("active");
  });
}
scrollUI.prototype.randomUi = function(start, end) {
  return Math.floor(Math.random() * (end - start + 1) + start);
};
scrollUI.prototype.setup = function() {
  var html = "";
  this.scrollObject = "scrollable-" + this.ran;
  html += '<div class="scrollable" id="' + this.scrollObject + '">';
  html += '<div class="scrollable-body"></div>';
  html += '<div class="scrollable-bar">';
  html +=
    '<button type="button" class="scrollable-arrow-top" disabled="disabled"><i class="icon icon--arrow-up"></i></button>';
  html += '<div class="scrollable-track">';
  html += '<button class="scrollable-face" type="button"></button>';
  html += "</div>";
  html +=
    '<button type="button" class="scrollable-arrow-bottom"><i class="icon icon--arrow-down"></i></button>';
  html += "</div>";
  html += "</div>";
  this.target.after(html);
  this.obj = $("#" + this.scrollObject);
  this.body = this.obj.find(".scrollable-body");
  this.body.append(this.target);
};
scrollUI.prototype.scrollTopEnd = function(s) {
  if (s <= 0) {
    s = 0;
    this.topBtn.addClass("disabled");
    this.topBtn.attr("disabled", true);
  } else {
    this.topBtn.removeClass("disabled");
    this.topBtn.attr("disabled", false);
  }
  return new getScrollTop(s).top;
};
scrollUI.prototype.scrollBtmStop = function(s) {
  var scrollBtm = this.getContentHeight(this.body) - this.body[0].offsetHeight;

  if (scrollBtm <= s) {
    s = scrollBtm;
    this.btmBtn.addClass("disabled");
    this.btmBtn.attr("disabled", true);
  } else {
    this.btmBtn.removeClass("disabled");
    this.btmBtn.attr("disabled", false);
  }
  return new getScrollTop(s).top;
};
scrollUI.prototype.scrollStop = function(f) {
  if (this.scrollStopClear) {
    clearTimeout(this.scrollStopClear);
  }
  this.scrollStopClear = setTimeout(function() {
    f();
  }, 200);
};
scrollUI.prototype.scrollLive = function() {
  var self = this;
  if (this.scrollLiveClear) {
    clearInterval(this.scrollLiveClear);
  }
  this.scrollLiveClear = setInterval(function() {
    if (
      self.body[0].offsetHeight + 10 >= self.getContentHeight(self.body) ||
      self.body[0].offsetHeight > self.getContentHeight(self.body)
    ) {
      self.bar.fadeOut(200);
    } else {
      self.bar.fadeIn(200);
    }
    self.scrollReset();
  }, 100);
};
scrollUI.prototype.getContentHeight = function(o) {
  return o.prop("scrollHeight");
};
scrollUI.prototype.getPosi = function(sc, se, e) {
  e = e || window.event;
  return new getMouse(e).Y - $(sc).offset().top - $(se).position().top;
};
scrollUI.prototype.scrollReset = function() {
  this.track.css({
    top: this.topBtn.height(),
    height: this.bar.height() - (this.topBtn.height() + this.btmBtn.height())
  });
  this.buttonResize();
  this.buttonPosition();
  this.scrollBtmStop(this.body.scrollTop());
  this.scrollTopEnd(this.body.scrollTop());
};
scrollUI.prototype.mouseMovingCheck = function() {};
scrollUI.prototype.buttonPosition = function() {
  var scHeight = this.getContentHeight(this.body);
  scHeight = scHeight - this.body.height();
  this.body.scrollTop() /
    (scHeight / (this.track.height() - this.handle.height()));
  this.handle.css(
    "top",
    Math.ceil(
      this.body.scrollTop() /
        (scHeight / (this.track.height() - this.handle.height()))
    )
  );
};
scrollUI.prototype.scrollContent = function() {
  var scHeight = this.getContentHeight(this.body);
  scHeight = scHeight - this.body.height();
  this.body.scrollTop(
    (scHeight / (this.track.height() - this.handle.height())) *
      this.handle.position().top
  );
};
scrollUI.prototype.buttonResize = function() {
  var scHeight = this.getContentHeight(this.body);
  scHeight = scHeight - this.body.height();
  var scContHeight = scHeight;
  if (scContHeight >= this.track.height()) {
    scContHeight = this.track.height() - this.track.height() / 10 / 1.1;
  }
  this.handle.css("height", this.track.height() - scContHeight);
};
scrollUI.prototype.buttonDrag = function(e) {
  var dragtop = 0;
  if (this.move) {
    e = e || window.event;
    dragtop = new getMouse(e).Y - this.track.offset().top - this.mouseOffset;
    if (dragtop < 0) {
      dragtop = 0;
    } else if (dragtop + $(this.handle).height() > this.track.height()) {
      dragtop = this.track.height() - $(this.handle).height();
    }
    $(this.handle).css("top", dragtop);
    this.scrollContent();
  }
};

UIAPP.viewer = {
  name: "feed images slide",
  description: "up platform images slider design handling",
  version: "1.0.0",
  settings: {},
  add: function(data, index) {
    $("#media , #imageload").remove();

    var mediadata = new Array(data)[0].value;
    this.data = [];

    for (var i = 0; i < mediadata.length; i++) {
      if (mediadata[i].media_type != "MUSIC") {
        this.data.push(mediadata[i]);
      }
    }
    this.pageing = 5;
    this.html = "";
    this.html += '<div id="media" class="media">';
    this.html += '<div id="views" class="media__view">';
    this.html += '<div id="resize" class="media__view__resize"></div>';
    this.html +=
      '<div class="spinner spinner--base-a" id="spinner-media"></div>';
    if (this.data.length > 1) {
      this.html +=
        '<button type="button" class="media__view-prev" id=""><i class="icon icon--prev"></i></button>';
      this.html +=
        '<button type="button" class="media__view-next" id=""><i class="icon icon--next"></i></button>';
    }
    this.html += "</div>";
    this.html += '<div class="media__thumbnail">';
    this.html += '<ul class="media__thumbnail__items">';
    this.html += "</ul>";
    if (this.data.length > this.pageing) {
      this.html +=
        '<button type="button" class="media__thumbnail-prev" style="display:none"><i class="icon icon--prev"></i></button>';
      this.html +=
        '<button type="button" class="media__thumbnail-next" style="display:none"><i class="icon icon--next"></i></button>';
    }
    this.html += "</div>";
    this.html += '<div class="media__paging">';
    this.html +=
      '<strong class="current">1</strong>  /   <span class="total">4</span>';
    this.html += "</div>";
    this.html +=
      '<button title="close" class="btn media__close" type="button">';
    this.html += '<i class="icon icon--close"></i>';
    this.html += "</button>";
    this.html += '<div class="media__modal"></div>';
    this.html += "</div>";
    this.html +=
      '<div id="imageload" style="position:absolute;top:-1000px;left:-1000px;width:100px;height:100px;overflow:hidden;"></div>';
    if ($("#media").length == 0) {
      $("body").append(this.html);
    }

    if ($("html").hasClass("none-scroll")) {
      $("html").attr("none-scroll", "true");
    } else {
      $("html").removeAttr("none-scroll");
    }
    $("html").addClass("none-scroll");

    this.mediaLayer = $("#media");
    this.mediaLayer.css("display", "block");
    new scrollUI({
      obj: $("#resize")
    });

    this.thum = this.mediaLayer.find(".media__thumbnail");
    this.thumItems = this.thum.find(".media__thumbnail__items");
    this.thumItem = this.thum.find(".media__thumbnail__items__item");
    this.thumImage = this.thum.find(".media__thumbnail__items__item img");
    this.ThumSliderPrev = this.thum.find(".media__thumbnail-prev");
    this.ThumSliderNext = this.thum.find(".media__thumbnail-next");
    this.view = this.mediaLayer.find("#views");
    this.viewSliderPrev = this.view.find(".media__view-prev");
    this.viewSliderNext = this.view.find(".media__view-next");
    this.resize = this.mediaLayer.find("#resize");
    this.scrollContent = this.mediaLayer.find("#scroll-content");
    this.imageLoad = $("#imageload");
    this.pagingobj = this.mediaLayer.find(".media__paging");
    this.thumloadingCount = 0;
    this.viewCounter = 0;
    this.thumActiveIndex = 0;
    if (index) {
      this.thumActiveIndex = index;
    }
    this.viewCounter = this.thumActiveIndex;
    this.viewActive = 0;
    this.thumCounter = 0;
    this.pagingCounter = this.mediaLayer.find();
    this.viewScrolActive = null;
    var self = this;
    var thumImageLength = this.data.length;
    this.init();
    this.mediaLayer.find(".media__close").on("click", function(event) {
      event.stopPropagation();
      self.mediaLayer.remove();
      $("#imageload").remove();
      // if ($("html").attr("none-scroll") == undefined) {
      //   $("html").removeClass("none-scroll");
      // }
    });
    this.mediaLayer.find(".scrollable").on("click", function() {
      self.mediaLayer.remove();
      $("#imageload").remove();
      if ($("html").attr("none-scroll") == undefined) {
        $("html").removeClass("none-scroll");
      }
    });
    this.mediaLayer
      .find(
        ".scrollable-arrow-top , .scrollable-face , .scrollable-arrow-bottom "
      )
      .on("click", function(e) {
        e.stopPropagation();
      });
  },
  init: function() {
    var self = this;
    var t = 0;
    var thumbUrl;
    var previewUrl;
    var mediaUrl;
    var mediaType;
    var videoicon = "";
    var data;
    var html = "";
    var activeClassName = "";
    var thumItem;
    this.thumItems.html("");
    var save;
    var spinner = "";
    var mediaWidth;
    var mediaHeight;
    for (var i = 0; i < this.data.length; i++) {
      data = this.data[i];
      thumbUrl = data.thumb_url;
      mediaUrl = data.media_url;
      mediaType = data.media_type;
      mediaType = mediaType.toLowerCase();
      mediaWidth = data.img_width;
      mediaHeight = data.img_height;
      if (mediaType == "image") {
        videoicon = "";
      } else {
        videoicon = '<i class="icon icon--video"></i>';
      }
      if (i == this.thumActiveIndex) {
        activeClassName = "is-active";
      } else {
        activeClassName = "";
      }
      if (data.img_width && data.img_height) {
        html =
          '<li class="media__thumbnail__items__item"><div class="spinner spinner--base-a"></div><a href="' +
          mediaUrl +
          '" class="media-item media-' +
          mediaType +
          " " +
          activeClassName +
          '" media-index="' +
          i +
          '"><img src="' +
          thumbUrl +
          '" id="item-' +
          i +
          '"  media-width="' +
          data.img_width +
          '" media-height="' +
          data.img_height +
          '" />' +
          videoicon +
          "</a></li>";
      } else {
        html =
          '<li class="media__thumbnail__items__item"><div class="spinner spinner--base-a"></div><a href="' +
          mediaUrl +
          '" class="media-item media-' +
          mediaType +
          " " +
          activeClassName +
          '" media-index="' +
          i +
          '"><img src="' +
          thumbUrl +
          '" id="item-' +
          i +
          '"  />' +
          videoicon +
          "</a></li>";
      }
      this.thumItems.append(html);
      thumItem = this.thumItems.find(".media-item img").eq(i);

      thumItem.on("load", function() {
        self.ThumbnailImageSize($(this));
      });
      thumItem.on("error", function() {
        $(this).css("display", "none");
      });
      if (i >= 5) {
        thumItem
          .parent()
          .parent()
          .css("left", 20 + t * 110)
          .css("opacity", 0);
        t++;
        if (t > 4) {
          t = 0;
        }
      } else {
        thumItem
          .parent()
          .parent()
          .css({
            left: i * 110
          })
          .addClass("current-page");
      }
    }
    this.thumImage = this.thum.find(".media__thumbnail__items__item img");
    this.thumItem = this.thum.find(".media__thumbnail__items__item");

    this.pagingobj.find(".total").html(this.data.length);
    this.pagingobj.find(".current").html(1);
    /*
        if(this.thumItem.length < 5){
            this.pagingobj.find('.current').html(1)
            this.pagingobj.find('.total').html(1)
        }
        */
    this.viewSlider();
  },
  ThumbnailImageSize: function(image) {
    var self = this;
    if (image.width() == 0 || image.height() == 0) {
      image.on("load", function() {
        self.ThumbnailImageSize(this);
      });
    }
    image
      .parent()
      .parent()
      .find(".spinner")
      .remove();
    image.attr("org-width", image.width()).attr("org-height", image.height());
    image.css("display", "block");
    if (image.width() > image.height()) {
      image.css({
        width: 100,
        height: "auto"
      });
      if (image.height() < 100) {
        image.css("top", (100 - image.height()) / 2);
      }
    } else {
      image.css({
        width: "auto",
        height: 100
      });
      if (image.width() < 100) {
        image.css("left", (100 - image.width()) / 2);
      }
    }
    this.thumloadingCount += 1;
    if (this.thumloadingCount >= this.data.length) {
      this.ThumSliderPrev.css("display", "block");
      this.ThumSliderNext.css("display", "block");
      if (this.thumItem.length > 5) {
        this.ThumbnailSlider();
      }
    }
  },
  ThumbnailSlider: function() {
    var movePosi = this.thumImage.eq(this.pageing).position().left;
    var self = this;
    this.delayTime = 700;
    self.thumCounter = Math.floor(this.thumActiveIndex / 5) * 5;
    self.ThumbnailSetPosition({
      loopS: 0,
      loopE: self.thumItem.length - 1,
      targetS: self.thumCounter,
      targetE: self.thumCounter + 4,
      dir: "right",
      init: false
    });

    function prevEvent() {
      if ($.now() - self.delayTime < 600) {
        return false;
      }
      self.thumCounter -= 5;
      if (self.thumCounter < 0) {
        self.thumCounter = Math.floor((self.thumItem.length - 1) / 5) * 5;
        self.ThumbnailSetPosition({
          loopS: 0,
          loopE: self.thumItem.length - 1,
          targetS: self.thumCounter,
          targetE: self.thumCounter + 4,
          dir: "left-reset",
          init: false
        });
      } else {
        self.ThumbnailSetPosition({
          loopS: 0,
          loopE: self.thumItem.length - 1,
          targetS: self.thumCounter,
          targetE: self.thumCounter + 4,
          dir: "left",
          init: false
        });
      }
      delayTime = $.now();
    }
    function nextEvent() {
      if ($.now() - self.delayTime < 600) {
        return false;
      }
      self.thumCounter += 5;
      if (self.thumCounter > self.thumItem.length - 1) {
        self.thumCounter = 0;
        self.ThumbnailSetPosition({
          loopS: 0,
          loopE: self.thumItem.length - 1,
          targetS: self.thumCounter,
          targetE: self.thumCounter + 4,
          dir: "right-reset",
          init: false
        });
      } else {
        self.ThumbnailSetPosition({
          loopS: 0,
          loopE: self.thumItem.length - 1,
          targetS: self.thumCounter,
          targetE: self.thumCounter + 4,
          dir: "right",
          init: false
        });
      }
      delayTime = $.now();
    }
    this.ThumSliderPrev.on("click", function(event) {
      event.stopPropagation();
      prevEvent();
    });
    this.ThumSliderNext.on("click", function(event) {
      event.stopPropagation();
      nextEvent();
    });
  },
  ThumbnailSetPosition: function(arr) {
    var self = this;
    var start = arr.loopS;
    var end = arr.loopE;
    var c = 0;
    var setLeft = 0;
    var a = 0;
    var r = 0;
    var l = 6;
    var z = 0;
    var time = 0;
    var leftInit = 0;
    var rightInit = 0;
    if (arr.loopS > arr.loopE) {
      end = arr.loopS;
      start = arr.loopE;
    }
    for (var i = start; i <= end; i++) {
      if (arr.targetS <= c && arr.targetE >= c) {
        time = 500 + a * 110;

        if (arr.dir == "left") {
          time = 500 + (500 - a * 110);
        }
        if (arr.dir == "left-reset") {
          time = 500 + a * 110;
        }
        if (arr.dir == "right-reset") {
          time = 500 + (500 - a * 110);
        }
        self.thumItem
          .eq(c)
          .css("display", "block")
          .addClass("current-page");
        sliderAnimation(self.thumItem.eq(c), a * 110, time, c, 1);
        a++;
      } else {
        l--;
        if (arr.targetS > c) {
          time = 400 + (500 - l * 110);
          self.thumItem.eq(c).removeClass("current-page");
          sliderAnimation(self.thumItem.eq(c), z * 110 - 20, time, c, 0);
        }
        if (arr.targetE < c) {
          time = 0;
          time = 500 + l * 110;
          if (arr.dir == "left") {
            time = l * 110;
          }
          self.thumItem.eq(c).removeClass("current-page");
          sliderAnimation(self.thumItem.eq(c), r * 110 + 20, time, c, 0);
        }
        r++;
        if (r > 4) {
          r = 0;
        }
        if (l < 2) {
          l = 6;
        }
        z++;
        if (z > 4) {
          z = 0;
        }
      }
      c++;
    }
    function sliderAnimation(obj, left, time, c, alpha) {
      var opt = 0;
      obj.stop().animate(
        {
          left: left,
          opacity: alpha
        },
        {
          duration: time,
          easing: "easeInOutQuint",
          complete: function() {
            if (alpha == 0) {
              $(this).css("display", "none");
            }
          }
        }
      );
    }
  },
  insertResizeItem: function(n, func) {
    var html = "";
    var data = this.data[n];
    var thumbUrl = data.thumb_url;
    var mediaUrl = data.media_url;
    var mediaType = this.getMediaType(mediaUrl);

    var orgWidth = this.thumItem
      .eq(n)
      .find("img")
      .attr("media-width");
    var orgHeight = this.thumItem
      .eq(n)
      .find("img")
      .attr("media-height");

    if (mediaType == "image") {
      videoicon = "";
      html =
        '<a href="' +
        mediaUrl +
        '" class="media-item media-' +
        mediaType +
        '" media-type="image" media-index="' +
        n +
        '" target="_blank"><img id="item-resize-' +
        n +
        '" src="' +
        mediaUrl +
        '" org-width="' +
        (orgWidth == undefined ? 676 : orgWidth) +
        '" org-height="' +
        (orgHeight == undefined ? 360 : orgHeight) +
        '" id="item-' +
        n +
        '" />' +
        videoicon +
        "</a>";
    } else {
      html =
        '<div class="media-item" media-index="' +
        n +
        '"><iframe width="100%" height="100%" src="' +
        mediaUrl +
        '" frameborder="0" allowfullscreen id="item-resize-' +
        n +
        '" org-width="' +
        640 +
        '" org-height="' +
        480 +
        '" minetype="video"></iframe></div>';
    }
    this.imageLoad.html(html);
  },
  viewSlider: function() {
    this.viewSliderActive = this;
    var self = this;
    var pagingNext = 0;
    var pagingPrev = 0;

    setImage(null, this.thumActiveIndex, null);
    var delay = $.now();
    var now = 0;
    var clear = null;
    //        self.viewCounter=0;
    this.thumItem.find(".media-item").on("click", function(event) {
      if (clear) {
        clearTimeout(clear);
      }
      var prevIndex = 0;
      event.stopPropagation();
      prevIndex = self.viewCounter;
      self.viewCounter = parseInt($(this).attr("media-index"));
      if (prevIndex == self.viewCounter) {
        return false;
      }
      self.thumItem.find(".media-item").removeClass("is-active");
      self.thumItem
        .eq(self.viewCounter)
        .find(".media-item ")
        .addClass("is-active");

      setRemove("thumbnail", self.viewCounter, prevIndex);
      clear = setTimeout(function() {
        setImage("thumbnail", self.viewCounter);
      }, 100);
      self.pagingobj.find(".current").html(self.viewCounter + 1);
      return false;
    });
    $(document).on("keydown", function(e) {
      e = e || window.event;
      if (e.keyCode == 37) {
        prevEvent();
      } else if (e.keyCode == 39) {
        nextEvent();
      }
    });
    function prevEvent() {
      if ($.now() - self.delayTime < 600) {
        return false;
      }
      if (clear) {
        clearTimeout(clear);
      }
      if (self.thumItem.length <= 1) {
        return false;
      }
      self.viewCounter--;
      if (self.viewCounter < 0) {
        self.viewCounter = self.thumItem.length - 1;
      }
      setRemove("left", self.viewCounter);
      clear = setTimeout(function() {
        setImage("left", self.viewCounter);
      }, 100);
      pagingPrev = Math.floor(self.viewCounter / 5) * 5;
      self.ThumbnailSetPosition({
        loopS: 0,
        loopE: self.thumItem.length - 1,
        targetS: pagingPrev,
        targetE: pagingPrev + 4,
        dir: "left",
        init: false
      });
      self.pagingobj.find(".current").html(self.viewCounter + 1);
      self.thumItem.find(".media-item").removeClass("is-active");
      self.thumItem
        .eq(self.viewCounter)
        .find(".media-item")
        .addClass("is-active");
      self.delayTime = $.now();
    }
    function nextEvent() {
      if ($.now() - self.delayTime < 600) {
        return false;
      }
      if (clear) {
        clearTimeout(clear);
      }
      if (self.thumItem.length <= 1) {
        return false;
      }
      self.viewCounter++;
      if (self.viewCounter > self.thumItem.length - 1) {
        self.viewCounter = 0;
      }
      setRemove("right", self.viewCounter);
      clear = setTimeout(function() {
        setImage("right", self.viewCounter);
      }, 100);
      pagingNext = Math.floor(self.viewCounter / 5) * 5;
      self.ThumbnailSetPosition({
        loopS: 0,
        loopE: self.thumItem.length - 1,
        targetS: pagingNext,
        targetE: pagingNext + 4,
        dir: "right",
        init: false
      });
      self.pagingobj.find(".current").html(self.viewCounter + 1);
      self.thumItem.find(".media-item").removeClass("is-active");
      self.thumItem
        .eq(self.viewCounter)
        .find(".media-item ")
        .addClass("is-active");
      self.delayTime = $.now();
    }

    this.viewSliderPrev.on("click", function(event) {
      event.stopPropagation();
      prevEvent();
    });
    this.viewSliderNext.on("click", function(event) {
      event.stopPropagation();
      nextEvent();
    });
    function imgonload(dir, n) {
      $("#spinner-media").css("display", "block");
      if (
        $("#item-resize-" + n).attr("minetype") &&
        $("#item-resize-" + n).attr("minetype") == "video"
      ) {
        $("#spinner-media").css("display", "none");
        setPosi(dir, n);
      } else {
        $("#item-resize-" + n).on("load", function() {
          $("#spinner-media").css("display", "none");
          if ($(this).width() == 0 || $(this).height() == 0) {
            imgonload(dir, n);
          } else {
            if (!$(this).attr("org-width") || !$(this).attr("org-height")) {
              $(this)
                .attr("org-width", $(this).width())
                .attr("org-height", $(this).height());
            }
            setPosi(dir, n);
          }
        });
      }
    }
    function setImage(dir, n) {
      if ($("#item-resize-" + n).length == 0) {
        self.insertResizeItem(n);
        imgonload(dir, n);
      }
    }
    function setRemove(dir, n, p) {
      var removeItem;
      removeItem = $("#item-resize-" + p);
      if (clear) {
        removeItem
          .parent()
          .stop()
          .remove();
      }
      if (dir == "right") {
        removeItem = $("#item-resize-" + (n - 1));

        if (self.viewCounter == 0) {
          removeItem = $("#item-resize-" + (self.thumItem.length - 1));
        }
      }
      if (dir == "left") {
        removeItem = $("#item-resize-" + (self.viewCounter + 1));
        if (self.viewCounter == self.thumItem.length - 1) {
          removeItem = $("#item-resize-" + 0);
        }
      }
      if (dir) {
        if (removeItem.length != 0) {
          if (removeItem.attr("minetype")) {
            removeItem.parent().remove();
          } else {
            removeItem
              .parent()
              .stop()
              .animate(
                {
                  opacity: 0
                },
                {
                  duration: 100,
                  easing: "easeInOutQuint",
                  complete: function() {
                    $(this).remove();
                    clear = null;
                  }
                }
              );
          }
        }
      }
    }
    function setPosi(dir, n) {
      var removeItem;

      if (dir) {
        self.viewsResize(this, n);
        $(this).remove();
      }
      if (!dir) {
        self.viewsResize(null, n);
      }
    }
  },
  viewsResize: function(anicheck, n) {
    var self = this;
    var current = $("#item-resize-" + n);
    self.resizeWidth = parseInt(current.attr("org-width"));
    self.resizeHeight = parseInt(current.attr("org-height"));
    self.resize.html(self.imageLoad.html());

    var resize = $("#resize");
    var small = 1.1;
    var ratio =
      this.resizeWidth > this.resizeHeight
        ? this.resizeWidth / this.resizeHeight
        : this.resizeHeight / this.resizeWidth;
    self.imageLoad.html("");
    current = $("#item-resize-" + n);
    var resizeImage = $("#item-resize-" + n);
    viewChage(anicheck);
    var sefWidth = 0;
    var setHeight = 0;
    var setLeft = 0;

    function viewChage(a) {
      var body = new getOffsetBody();
      if (2500 < self.resizeHeight) {
        if (self.resizeHeight > self.resizeWidth) {
          scrollImage(a);
        } else {
          resizingImage(a);
        }
      } else {
        resizingImage(a);
      }
    }
    function scrollImage(a) {
      var resizeWidth = self.resizeWidth;
      var resizeHeight = self.resizeHeight;
      var body = new getOffsetBody();
      var bodyHeight = body.height - 228;
      var bodyWidth = body.width - 200;
      var setWidth;
      var setHeight;
      var setLeft;
      var setTop;
      resize.removeClass("media__view__resize").addClass("media__view__scroll");
      if (bodyWidth < resizeWidth) {
        setWidth = body.width - 160;
        setLeft = 80;
      } else {
        setWidth = self.resizeWidth - 8;
        setLeft = (body.width - self.resizeWidth) / 2;
      }
      animation({
        scroll: true,
        animate: a != null ? true : null,
        width: setWidth,
        height: resizeHeight,
        top: 60,
        left: setLeft
      });
    }
    function resizingImage(a) {
      resize.removeClass("media__view__scroll").addClass("media__view__resize");
      var resizeWidth = self.resizeWidth;
      var resizeHeight = self.resizeHeight;
      var body = new getOffsetBody();
      var bodyHeight = body.height - 228;
      var bodyWidth = body.width - 200;
      if (resizeWidth > resizeHeight) {
        resizeWidth = bodyWidth;
        resizeHeight = resizeWidth / ratio;
      } else {
        resizeHeight = bodyHeight;
        resizeWidth = resizeHeight / ratio;
      }
      if (resizeHeight > bodyHeight) {
        resizeHeight = bodyHeight;
        resizeWidth = resizeHeight * ratio;
      }
      if (resizeWidth > bodyWidth) {
        resizeWidth = bodyWidth;
        resizeHeight = resizeWidth * ratio;
      }
      if (self.resizeWidth < bodyWidth) {
        resizeWidth = self.resizeWidth;
        resizeHeight =
          self.resizeWidth > self.resizeHeight
            ? self.resizeWidth / ratio
            : resizeWidth * ratio;
        if (resizeHeight > bodyHeight) {
          resizeHeight = bodyHeight;
          resizeWidth =
            self.resizeWidth > self.resizeHeight
              ? resizeHeight * ratio
              : resizeHeight / ratio;
        }
      }
      if (self.resizeHeight < bodyHeight) {
        resizeHeight = self.resizeHeight;
        resizeWidth =
          self.resizeWidth > self.resizeHeight
            ? resizeHeight * ratio
            : resizeHeight / ratio;
        if (resizeWidth > bodyWidth) {
          resizeWidth = bodyWidth;
          resizeHeight =
            self.resizeWidth > self.resizeHeight
              ? resizeWidth / ratio
              : resizeWidth * ratio;
        }
      }
      body = new getOffsetBody();
      bodyHeight = body.height;
      bodyWidth = body.width;

      animation({
        scroll: null,
        animate: a != null ? true : null,
        width: resizeWidth,
        height: resizeHeight,
        top: (bodyHeight - 151 - resizeHeight) / 2,
        left: (bodyWidth - resizeWidth) / 2
      });
    }
    function animation(arr) {
      body = new getOffsetBody();
      var resizeWidth = arr.width;
      var resizeHeight = arr.height;
      var bodyHeight = body.height;
      var bodyWidth = body.width;
      var imgWidth;
      var imgHeight;
      var imgTop;
      var imgLeft;
      var resizeTop;
      var resizeLeft;
      var barWidth = 0;
      resizeTop = arr.top;
      resizeLeft = arr.left;
      var cusHeight = resizeHeight;
      var cusWidth = resizeWidth;
      if (arr.scroll) {
        cusHeight = body.height - 240;
        barWidth = 20;
      }
      imgWidth = resizeWidth;
      imgHeight = arr.scroll ? "auto" : resizeHeight;

      if (arr.animate == null) {
        resize.parent().css({
          width: cusWidth,
          height: cusHeight,
          left: resizeLeft,
          top: resizeTop,
          opacity: 1
        });
        resize.css({
          width: cusWidth + barWidth,
          height: cusHeight,
          left: 0,
          top: 0
        });
        resizeImage.stop().css({
          width: imgWidth,
          height: imgHeight,
          left: 0,
          top: 0,
          opacity: 1
        });
      } else {
        resize.parent().css({
          width: cusWidth,
          height: cusHeight,
          left: resizeLeft,
          top: resizeTop,
          opacity: 1
        });
        resize.css({
          width: cusWidth + barWidth,
          height: cusHeight,
          left: 0,
          top: 0,
          opacity: 0
        });
        resizeImage.stop().css({
          width: imgWidth,
          height: imgHeight,
          left: 0,
          top: 0,
          opacity: 0
        });
        resize
          .parent()
          .stop()
          .animate(
            {
              opacity: 1
            },
            {
              duration: 100,
              easing: "linear"
            }
          );
        resize.stop().animate(
          {
            opacity: 1
          },
          {
            duration: 100,
            easing: "linear"
          }
        );
        resizeImage.stop().animate(
          {
            opacity: 1
          },
          {
            duration: 100,
            easing: "linear"
          }
        );
      }
    }
    $(window).on("resize", function() {
      viewChage(null);
    });
  },
  getMaxWidth: function() {
    var image = this.thumImage.length;
    var widthSize = 0;
    for (var i = 0; i < image; i++) {
      if (
        Number(
          $(this.thumImage)
            .eq(i)
            .attr("media-width")
        ) > image
      ) {
        widthSize = Number(
          $(this.thumImage)
            .eq(i)
            .attr("media-width")
        );
      }
    }
    return widthSize;
  },
  getMediaType: function(str) {
    var arr = [".jpeg", ".gif", ".png", ".bmp", ".jpg"];
    var getType = null;
    for (var i = 0; i < arr.length; i++) {
      str = str.toLowerCase();
      if (str.indexOf(arr[i]) > 0) {
        getType = arr[i];
        break;
      }
    }
    if (getType) {
      getType = "image";
    } else {
      getType = "movie";
    }
    return getType;
  }
};
window.onload = function() {
  if (!document.querySelector(".img-container")) {
    return false;
  }
  ("use strict");
  var Cropper = window.Cropper;
  var console = window.console || { log: function() {} };
  var container = document.querySelector(".img-container");
  var image = container.getElementsByTagName("img").item(0);
  var download = document.getElementById("download");
  var actions = document.getElementById("actions");
  var dataX = document.getElementById("dataX");
  var dataY = document.getElementById("dataY");
  var dataHeight = document.getElementById("dataHeight");
  var dataWidth = document.getElementById("dataWidth");
  var dataRotate = document.getElementById("dataRotate");
  var dataScaleX = document.getElementById("dataScaleX");
  var dataScaleY = document.getElementById("dataScaleY");
  var isUndefined = function(obj) {
    return typeof obj === "undefined";
  };
  var options = {
    aspectRatio: 1024 / 385,
    preview: ".img-preview",
    build: function(e) {
      console.log(e.type);
    },
    built: function(e) {
      console.log(e.type);
    },
    cropstart: function(e) {
      console.log(e.type, e.detail.action);
    },
    cropmove: function(e) {
      console.log(e.type, e.detail.action);
    },
    cropend: function(e) {
      console.log(e.type, e.detail.action);
    },
    crop: function(e) {
      var data = e.detail;
    },
    zoom: function(e) {
      console.log(e.type, e.detail.ratio);
    },
    autoCropArea: 1,

    viewMode: 1
  };
  var cropper = new Cropper(image, options);

  function preventDefault(e) {
    if (e) {
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
    }
  }

  // Buttons
  if (!document.createElement("canvas").getContext) {
    $('button[data-method="getCroppedCanvas"]').prop("disabled", true);
  }

  if (
    typeof document.createElement("cropper").style.transition === "undefined"
  ) {
    $('button[data-method="rotate"]').prop("disabled", true);
    $('button[data-method="scale"]').prop("disabled", true);
  }

  // Download
  if (typeof download.download === "undefined") {
    download.className += " disabled";
  }

  // Options
  actions.querySelector(".docs-toggles").onclick = function(event) {
    var e = event || window.event;
    var target = e.target || e.srcElement;
    var cropBoxData;
    var canvasData;
    var isCheckbox;
    var isRadio;

    if (!cropper) {
      return;
    }

    if (target.tagName.toLowerCase() === "span") {
      target = target.parentNode;
    }

    if (target.tagName.toLowerCase() === "label") {
      target = target.getElementsByTagName("input").item(0);
    }
  };

  // Methods
  actions.querySelector(".docs-buttons").onclick = function(event) {
    var e = event || window.event;
    var target = e.target || e.srcElement;
    var result;
    var input;
    var data;

    if (!cropper) {
      return;
    }

    while (target !== this) {
      if (target.getAttribute("data-method")) {
        break;
      }

      target = target.parentNode;
    }

    if (
      target === this ||
      target.disabled ||
      target.className.indexOf("disabled") > -1
    ) {
      return;
    }

    data = {
      method: target.getAttribute("data-method"),
      target: target.getAttribute("data-target"),
      option: target.getAttribute("data-option"),
      secondOption: target.getAttribute("data-second-option")
    };

    if (data.method) {
      if (typeof data.target !== "undefined") {
        input = document.querySelector(data.target);

        if (!target.hasAttribute("data-option") && data.target && input) {
          try {
            data.option = JSON.parse(input.value);
          } catch (e) {
            console.log(e.message);
          }
        }
      }

      if (data.method === "getCroppedCanvas") {
        data.option = JSON.parse(data.option);
      }

      result = cropper[data.method](data.option, data.secondOption);

      switch (data.method) {
        case "scaleX":
        case "scaleY":
          target.setAttribute("data-option", -data.option);
          break;

        case "getCroppedCanvas":
          if (result) {
            console.log(result.toDataURL("image/jpeg"));
            if (!download.disabled) {
              download.href = result.toDataURL("image/jpeg");
            }
          }

          break;

        case "destroy":
          cropper = null;
          break;
      }

      if (typeof result === "object" && result !== cropper && input) {
        try {
          input.value = JSON.stringify(result);
        } catch (e) {
          console.log(e.message);
        }
      }
    }
  };
};
/*resize image begin ex) $('selector').resizeImage({parentWidth: 261, parentHeight: 160});*/
(function($) {
  var methods = {
    ratio: function(args) {
      var item = args.item,
        settings = args.settings;
      return {
        w: item.width() / settings.parentWidth,
        h: item.height() / settings.parentHeight
      };
    },
    center: function(longVal, shortVal) {
      return parseInt((longVal - shortVal) / 15, 10);
    },
    fillImage: function(args) {
      var item = args.item,
        settings = args.settings,
        ratio = settings.ratio,
        width = item.width(),
        height = item.height(),
        offset = { top: 0, left: 0 };
      if (ratio.h > ratio.w) {
        width = settings.parentWidth;
        height = height / ratio.w;
        offset.top = methods.center(width, height);
      } else {
        height = settings.parentHeight;
        width = width / ratio.h;
        offset.left = methods.center(height, width);
      }
      args.wrapper.css("position", "relative");
      item.css({
        position: "absolute",
        top: ["-", offset.top, "px"].join(""),
        left: offset.left + "px"
      });
      return item
        .height(height)
        .attr("height", height + "px")
        .width(width)
        .attr("width", width + "px");
    },
    init: function(options) {
      var settings = $.extend(
          {
            wrapperSelector: null,
            parentWidth: 241,
            parentHeight: 160
          },
          options
        ),
        _init = function() {
          var item = $(this),
            wrapper = settings.wrapperSelector
              ? item.closest(settings.wrapperSelector)
              : item.parent(),
            args = {
              item: item,
              settings: settings,
              wrapper: wrapper
            };
          settings.ratio = methods.ratio(args);
          wrapper.css({
            overflow: "hidden",
            display: "block",
            width: settings.parentWidth + "px",
            height: settings.parentHeight + "px"
          });
          methods.fillImage(args);
          item.data("fc.settings", settings);
        },
        images = this.filter("img"),
        others = this.filter(":not(img)");
      if (images.length) {
        images
          .bind("load", function() {
            _init.call(this);
            this.style.display = "inline";
          })
          .each(function() {
            if (this.complete || this.complete === undefined) {
              var src = this.src;
              this.src =
                "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
              this.src = src;
              this.style.display = "none";
            }
          });
      }
      if (others.length) {
        others.each(_init);
      }
      return this;
    }
  };
  $.fn.resizeImage = function(method) {
    if (methods[method]) {
      return methods[method].apply(
        this,
        Array.prototype.slice.call(arguments, 1)
      );
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments);
    }
  };
})(jQuery);
/*resize image end*/
if ($(".space") > 0) {
  $(".space").sortable({
    connectWith: ".space",
    tolerance: "intersect",
    over: function(event, ui) {},
    receive: function(event, ui) {
      calcWidth($(this).siblings(".title"));
    },
    axis: "y",
    items: "li:not(.unsortable)"
  });
  $(".space").disableSelection();
}
(function($) {
  $.Member = function() {
    function init() {
      bindEvents();
      $(":checked").trigger("click");
    }
    function bindEvents() {
      /* checkbox toggle */
      $(":checkbox").click(function() {
        var $label = $(this).next("label");
        $(this).is(":checked")
          ? $label.addClass("on")
          : $label.removeClass("on");
        $(this).is(":checked")
          ? $(this).prop("checked", true)
          : $(this).prop("checked", false);
      });

      /* radio button toggle */
      $(":radio").click(function() {
        //console.log($(this));
        var $label = $(this).next("label");
        var val = $(this).attr("name");
        var $labelGroup = $("input[name=" + val + "]").next();
        $labelGroup.removeClass("on");
        if ($(this).is(":checked")) {
          $("input[name=" + val + "]").prop("checked", false);
          $(this).prop("checked", true);
          $label.addClass("on");
        }
      });

      $(".link-box>div").click(function() {
        $(".link-box>div>a").removeClass("on");
        $(this)
          .children()
          .addClass("on");
      });

      /* layer popup open */
      $(".popover").click(function() {
        var poplayer = $(this).attr("data-content");
        $(poplayer).modal({ focus: false, opacity: 80 });
      });

      /* layer popup close */
      $(".m_close").click(function() {
        $.modal.close();
      });
    }

    init();
  };
})(jQuery);

$(function() {
  new $.Member();
});

(function(window, document, $) {
  var isOperaMini =
    Object.prototype.toString.call(window.operamini) == "[object OperaMini]";
  var isInputSupported =
    "placeholder" in document.createElement("input") && !isOperaMini;
  var isTextareaSupported =
    "placeholder" in document.createElement("textarea") && !isOperaMini;
  var prototype = $.fn;
  var valHooks = $.valHooks;
  var propHooks = $.propHooks;
  var hooks;
  var placeholder;

  if (isInputSupported && isTextareaSupported) {
    placeholder = prototype.placeholder = function() {
      return this;
    };
    placeholder.input = placeholder.textarea = true;
  } else {
    placeholder = prototype.placeholder = function() {
      var $this = this;
      $this
        .filter((isInputSupported ? "textarea" : ":input") + "[placeholder]")
        .not(".placeholder")
        .bind({
          "focus.placeholder": clearPlaceholder,
          "blur.placeholder": setPlaceholder
        })
        .data("placeholder-enabled", true)
        .trigger("blur.placeholder");
      return $this;
    };

    placeholder.input = isInputSupported;
    placeholder.textarea = isTextareaSupported;

    hooks = {
      get: function(element) {
        var $element = $(element);

        var $passwordInput = $element.data("placeholder-password");
        if ($passwordInput) {
          return $passwordInput[0].value;
        }

        return $element.data("placeholder-enabled") &&
          $element.hasClass("placeholder")
          ? ""
          : element.value;
      },
      set: function(element, value) {
        var $element = $(element);

        var $passwordInput = $element.data("placeholder-password");
        if ($passwordInput) {
          return ($passwordInput[0].value = value);
        }

        if (!$element.data("placeholder-enabled")) {
          return (element.value = value);
        }
        if (value == "") {
          element.value = value;
          if (element != safeActiveElement()) {
            setPlaceholder.call(element);
          }
        } else if ($element.hasClass("placeholder")) {
          clearPlaceholder.call(element, true, value) ||
            (element.value = value);
        } else {
          element.value = value;
        }
        return $element;
      }
    };
    if (!isInputSupported) {
      valHooks.input = hooks;
      propHooks.value = hooks;
    }
    if (!isTextareaSupported) {
      valHooks.textarea = hooks;
      propHooks.value = hooks;
    }

    $(function() {
      $(document).delegate("form", "submit.placeholder", function() {
        var $inputs = $(".placeholder", this).each(clearPlaceholder);
        setTimeout(function() {
          $inputs.each(setPlaceholder);
        }, 10);
      });
    });

    $(window).bind("beforeunload.placeholder", function() {
      $(".placeholder").each(function() {
        this.value = "";
      });
    });
  }
  function args(elem) {
    var newAttrs = {};
    var rinlinejQuery = /^jQuery\d+$/;
    $.each(elem.attributes, function(i, attr) {
      if (attr.specified && !rinlinejQuery.test(attr.name)) {
        newAttrs[attr.name] = attr.value;
      }
    });
    return newAttrs;
  }
  function clearPlaceholder(event, value) {
    var input = this;
    var $input = $(input);
    if (
      input.value == $input.attr("placeholder") &&
      $input.hasClass("placeholder")
    ) {
      if ($input.data("placeholder-password")) {
        $input = $input
          .hide()
          .next()
          .show()
          .attr("id", $input.removeAttr("id").data("placeholder-id"));
        if (event === true) {
          return ($input[0].value = value);
        }
        $input.focus();
      } else {
        input.value = "";
        $input.removeClass("placeholder");
        input == safeActiveElement() && input.select();
      }
    }
  }
  function setPlaceholder() {
    var $replacement;
    var input = this;
    var $input = $(input);
    var id = this.id;
    if (input.value == "") {
      if (input.type == "password") {
        if (!$input.data("placeholder-textinput")) {
          try {
            $replacement = $input.clone().attr({ type: "text" });
          } catch (e) {
            $replacement = $("<input>").attr(
              $.extend(args(this), { type: "text" })
            );
          }
          $replacement
            .removeAttr("name")
            .data({
              "placeholder-password": $input,
              "placeholder-id": id
            })
            .bind("focus.placeholder", clearPlaceholder);
          $input
            .data({
              "placeholder-textinput": $replacement,
              "placeholder-id": id
            })
            .before($replacement);
        }
        $input = $input
          .removeAttr("id")
          .hide()
          .prev()
          .attr("id", id)
          .show();
      }
      $input.addClass("placeholder");
      $input[0].value = $input.attr("placeholder");
    } else {
      $input.removeClass("placeholder");
    }
  }
  function safeActiveElement() {
    try {
      return document.activeElement;
    } catch (err) {}
  }
})(this, document, jQuery);

function spinner(options) {
  this.obj = $(options.obj);

  if (this.obj.find(".spinner--base-d").length == 0) {
    this.obj.append('<span class="spinner--base-d"></span>');
  }
  this.gif = this.obj.find(".spinner--base-d");
  this.gif[0].addEventListener(
    "animationend",
    function(event) {
      event.stopPropagation();
      $(this).remove();
    },
    false
  );
}
spinner.prototype.loading = function() {
  var html = this.setup({
    radius: 8,
    size: 0.52,
    angle: 0,
    cx: 8,
    cy: 8
  });
  this.gif.html(html);
  var style = "";
  for (var i = 0; i <= 11; i++) {
    style += ".spinner--base-d .item-" + i + " span";
    style += "{";
    style +=
      "animation: spinner--base-d-keyframe 1.1s infinite;animation-delay:" +
      i / 10 +
      "s;";
    style += "}";
  }
  if ($("#spinner--base-d").length == 0) {
    $("head").append(
      '<style type="text/css" id="spinner--base-d-style"></style>'
    );
    $("#spinner--base-d-style").html(style);
  }
};
spinner.prototype.complete = function() {
  var self = this;
  $("#spinner--base-d-style").remove();
  this.gif.find(".spinner__loading").remove();
  this.gif.html(
    '<span class="spinner__complte"><i class="icon icon-check"></i></span>'
  );
  this.check = this.obj.find(".spinner__complte");
  this.check.attr("animate", "open");
  this.check[0].addEventListener(
    "animationend",
    function(event) {
      event.stopPropagation();
      if ($(this).attr("animate") == "open") {
        $(this).attr("animate", "close");
        return false;
      }
      if ($(this).attr("animate") == "close") {
        $(this).removeAttr("animate");
        self.gif.attr("animate", "start");
      }
    },
    true
  );
};
spinner.prototype.setup = function(set) {
  var cx = set.cx;
  var cy = set.cy;
  var radius = set.radius;
  var angle = set.angle;
  var size = set.size;
  var left;
  var top;
  var left;
  var cosine;
  var sine;
  var data = '<div class="spinner__loading">';
  for (var i = 0; i <= 11; i++) {
    angle = angle + size;
    cosine = Math.cos(angle);
    sine = Math.sin(angle);
    left = radius * cosine + cx;
    top = radius * sine + cy;
    left = left.toFixed(3);
    top = top.toFixed(3);
    data +=
      '<span class="item item-' +
      i +
      '" style="left:' +
      left +
      "px;top:" +
      top +
      'px;"><span></span></span>';
  }
  data += "<div>";
  return data;
};
$(document).on("ready", function() {
  $("[js-layer]").on("click", $.clickLayer);
  $("[js-alert]").on("click", $.clickAlert);
  $("[js-layer-popover]").on("click", $.clickLayerPopover);
  $("[js-popover]").on("click", $.clickPopover);
  $("[js-hover-popover]").hover($.hoverPopover);
  $("input, textarea").placeholder();
  $.textareaAutoHeight();
  $.reportPopupTextarea();
  $.introduceTextarea();
  if ($(".space") > 0) {
    $(".space").sortable({
      connectWith: ".space",
      tolerance: "intersect",
      over: function(event, ui) {},
      receive: function(event, ui) {
        calcWidth($(this).siblings(".title"));
      },
      axis: "y",
      items: "li:not(.unsortable)"
    });
    $(".space").disableSelection();
  }
  $(".card--hover")
    .find(".medai-item img")
    .css("transform", "scale3d(1.05, 1.05, 1.05) rotate(0.0deg)");
  $(".card--hover").mouseover(function() {
    TweenMax.to($(this).find(".dark"), 1.5, {
      opacity: 0.6,
      ease: Linear.easeInOutQuint
    });
    $(this)
      .find(".medai-item img")
      .css({
        "-webkit-transition": "-webkit-transform 1.5s",
        transition: "transform 1.5s",
        transform: "scale3d(1.15, 1.15, 1.15) rotate(0.01deg)"
      });
  });
  $(".card--hover").mouseleave(function() {
    TweenMax.to($(this).find(".dark"), 1.5, {
      opacity: 0,
      ease: Linear.easeInOutQuint
    });
    $(this)
      .find(".medai-item img")
      .css({
        "-webkit-transition": "-webkit-transform 0.5s",
        transition: "transform 0.5s",
        transform: "scale3d(1.05, 1.05, 1.05) rotate(0.01deg)"
      });
  });

  $(document).on("click.game-menu", function(e) {
    $(".popup__info").show();
  });

  $("#file--toggle").click(function() {
    var fileList = $(this)
      .parent()
      .parent()
      .find(".file--contents");

    if (fileList.is(":visible")) {
      $(this).removeClass("on");
      fileList.hide();
    } else {
      $(this).addClass("on");
      fileList.show();
    }
  });
});

$.fn.spinner = function(options) {
  var shape = options.shape;
  var self = this;
  this.loading = function() {
    new spinner({
      shape: shape,
      obj: self
    }).loading();
  };
  this.complete = function() {
    new spinner({
      shape: shape,
      obj: self
    }).complete();
  };
  return this;
};
