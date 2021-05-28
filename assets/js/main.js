var iUp = (function () {
    var t = 0,
        d = 150,
        clean = function () {
            t = 0;
        },
        up = function (e) {
            setTimeout(function () {
                $(e).addClass("up")
            }, t);
            t += d;
        },
        down = function (e) {
            $(e).removeClass("up");
        },
        toggle = function (e) {
            setTimeout(function () {
                $(e).toggleClass("up")
            }, t);
            t += d;
        };
    return {
        clean: clean,
        up: up,
        down: down,
        toggle: toggle
    }
})();


function to(element) {
    let url = $(element).data("url");
    if (url != null && url.length > 10) {
        window.open(url);
    }
}


function getCache(key){
    return sessionStorage.getItem(key);
}
function putCache(key,value){
    sessionStorage.setItem(key,value);
}

function description(element) {
    // 获取一言数据
    fetch('https://v1.hitokoto.cn?encode=json&charset=utf-8&c=a&c=b&c=c&c=d&c=e&c=h&c=i&c=j&c=k&c=l').then(function (res) {
        return res.json();
    }).then(function (e) {
        $(element).html(e.hitokoto + "<br/> -" + ((e.from_who == null || e.from == e.from_who) ? "" : e.from_who ) + " 「<strong class='open-view' onclick='to(this)' data-url='https://hitokoto.cn/?uuid=" + e.uuid + "'>" + e.from + "</strong>」")
    }).catch(function (err) {
        console.error(err);
    })
}

function background(element) {
    /**
     * 获取Bing壁纸
     * 原先 YQL 已经无法提供服务了
     * 改用 JsonBird：https://bird.ioliu.cn/
     *
     */
    var url = 'https://bird.ioliu.cn/v1/?url=https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=8';
    var imgUrls = JSON.parse(sessionStorage.getItem("imgUrls"));
    var index = sessionStorage.getItem("index");
    var $panel = $(element);
    if (imgUrls == null) {
        imgUrls = new Array();
        index = 0;
        $.get(url, function (result) {
            images = result.images;
            for (let i = 0; i < images.length; i++) {
                const item = images[i];
                imgUrls.push(item.url);
            }
            var imgUrl = imgUrls[index];
            var url = "https://www.bing.com" + imgUrl;
            $panel.css("background", "url('" + url + "') center center no-repeat #666");
            $panel.css("background-size", "cover");
            sessionStorage.setItem("imgUrls", JSON.stringify(imgUrls));
            sessionStorage.setItem("index", index);
        });
    } else {
        if (index == 7)
            index = 0;
        else
            index++;
        var imgUrl = imgUrls[index];
        var url = "https://www.bing.com" + imgUrl;
        $panel.css("background", "url('" + url + "') center center no-repeat #666");
        $panel.css("background-size", "cover");
        sessionStorage.setItem("index", index);
    }
}

$(document).ready(function () {

    $(".iUp").each(function (i, e) {
        iUp.up(e);
    });

    $(".js-avatar")[0].onload = function () {
        $(".js-avatar").addClass("show");
    }
});

$('.btn-mobile-menu__icon').click(function () {
    if ($('.navigation-wrapper').css('display') == "block") {
        $('.navigation-wrapper').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $('.navigation-wrapper').toggleClass('visible animated bounceOutUp');
            $('.navigation-wrapper').off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
        });
        $('.navigation-wrapper').toggleClass('animated bounceInDown animated bounceOutUp');

    } else {
        $('.navigation-wrapper').toggleClass('visible animated bounceInDown');
    }
    $('.btn-mobile-menu__icon').toggleClass('social iconfont icon-list social iconfont icon-angleup animated fadeIn');
});
