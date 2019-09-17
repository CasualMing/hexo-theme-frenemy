'use strict';

(function (frenemy, pivot) {
  frenemy(function () {
    //初始化顶栏透明
    isScrollTop() ? addTopNav() : removeTopNav();
    //滚动顶栏透明
    frenemy(window).scroll(function () {
      isScrollTop() ? addTopNav() : removeTopNav();
    });
    // 移动端点击菜单按钮添加样式
    frenemy('.navbar-toggler').click(function (event) {
      if (frenemy(this).attr('aria-expanded') === 'false') {
        if (isScrollTop()) {
          frenemy('nav.navbar').removeClass(['navbar-dark', 'top-nav']).addClass('navbar-light');
        }
        frenemy('html').addClass('overflow-hidden');
      } else {
        if (isScrollTop()) {
          frenemy('nav.navbar').addClass(['navbar-dark', 'top-nav']).removeClass('navbar-light');
        }
        frenemy('html').removeClass('overflow-hidden');
      }
    });
    // 回到顶部
    var returnTop = frenemy('#return-to-top');
    frenemy(window).scroll(function () {
      if (frenemy(this).scrollTop() >= 50) {
        returnTop.addClass('bounceInRight').removeClass('bounceOutDown')
      } else {
        returnTop.removeClass('bounceInRight').addClass('bounceOutDown');
      }
    });
    returnTop.click(function () {
      frenemy('body,html').animate({
          scrollTop: 0
        },
        500
      );
    });

  });

  // 文章列表动效
  pivot.init({
    selector: '.post-card-image-link',
    sensitivity: 80,
    touch: false
  });


  /**
   * 日夜切换
   */
  var darkSwitch = document.getElementById("darkSwitch");
  if (darkSwitch) {
    initTheme();
    darkSwitch.addEventListener("change", function (event) {
      resetTheme();
    });
  }
  $('.dark-switch-label-span').tooltip();

  /**
   * 添加导航样式
   */
  function addTopNav() {
    frenemy('nav.navbar').addClass('top-nav').addClass('navbar-dark').removeClass('navbar-light');
  }

  /**
   * 移除导航样式
   */
  function removeTopNav() {
    frenemy('nav.navbar').removeClass('top-nav').removeClass('navbar-dark').addClass('navbar-light');
  }

  /**
   * 是否在页面最顶部
   * @returns {boolean} true = 是在页面顶部
   */
  function isScrollTop() {
    return frenemy(document).scrollTop() <= 0
  }
})(window.jQuery, window.pivot);



/**
 * 日夜模式 - 加载
 */
function initTheme() {
  var darkThemeSelected =
    localStorage.getItem("darkSwitch") !== null &&
    localStorage.getItem("darkSwitch") === "dark";
  darkSwitch.checked = darkThemeSelected;
  if (darkThemeSelected) {
    document.body.setAttribute("data-theme", "dark");
    document.querySelector('.dark-switch-label-span').innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    document.body.removeAttribute("data-theme");
    document.querySelector('.dark-switch-label-span').innerHTML = '<i class="fas fa-moon"></i>';
  }
}

/**
 * 日夜模式 - 重置
 */
function resetTheme() {
  if (darkSwitch.checked) {
    document.body.setAttribute("data-theme", "dark");
    document.querySelector('.dark-switch-label-span').innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem("darkSwitch", "dark");
  } else {
    document.body.removeAttribute("data-theme");
    document.querySelector('.dark-switch-label-span').innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.removeItem("darkSwitch");
  }
}

/**
 * 图像展示
 */

function imgShow() {
  let imgIndex = 0;
  for (let index = 0; index < $(".post-content img").length; index++) {
    const element = $(".post-content img")[index];
    element.index = index;
    element.onclick = function (e) {
      $(".img-show").css({
        width: "100vw",
        height: "100vh"
      })
      imgIndex = this.index;;
      $(".img-show img").attr("src", e.target.src);
    }
  }

  $(".img-show img").click(function (e) {
    $(".img-show").css({
      width: "0px",
      height: "0px"
    })
  })
  $(".img-show .img-mask").click(function (e) {
    $(".img-show").css({
      width: "0px",
      height: "0px"
    })
  });
  $(".img-show .left").click(function (e) {
    if (imgIndex<1) {
      imgIndex = 0;
    }else{
      imgIndex -= 1;
    }
    let imgSrc = $(".post-content img")[imgIndex].getAttribute("src");
    $(".img-show img").attr("src", imgSrc);
  })

  $(".img-show .right").click(function (e) {
    if (imgIndex> $(".post-content img").length-1) {
      imgIndex = $(".post-content img").length-1;
    }else{
      imgIndex += 1;
    }
    let imgSrc = $(".post-content img")[imgIndex].getAttribute("src");
    $(".img-show img").attr("src", imgSrc);
  })


}
imgShow()