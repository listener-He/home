var GetDevice = function () {

    /* 版本信息获取 */
    // 各主流浏览器
    var getBrowser = function () {
        var u = navigator.userAgent
        var bws = [{
            name: 'sgssapp',
            it: /sogousearch/i.test(u)
        }, {
            name: 'wechat',
            it: /MicroMessenger/i.test(u)
        }, {
            name: 'weibo',
            it: !!u.match(/Weibo/i)
        }, {
            name: 'uc',
            it: !!u.match(/UCBrowser/i) || u.indexOf(' UBrowser') > -1
        }, {
            name: 'sogou',
            it: u.indexOf('MetaSr') > -1 || u.indexOf('Sogou') > -1
        }, {
            name: 'xiaomi',
            it: u.indexOf('MiuiBrowser') > -1
        }, {
            name: 'baidu',
            it: u.indexOf('Baidu') > -1 || u.indexOf('BIDUBrowser') > -1
        }, {
            name: '360',
            it: u.indexOf('360EE') > -1 || u.indexOf('360SE') > -1
        }, {
            name: '2345',
            it: u.indexOf('2345Explorer') > -1
        }, {
            name: 'edge',
            it: u.indexOf('Edge') > -1
        }, {
            name: 'ie11',
            it: u.indexOf('Trident') > -1 && u.indexOf('rv:11.0') > -1
        }, {
            name: 'ie',
            it: u.indexOf('compatible') > -1 && u.indexOf('MSIE') > -1
        }, {
            name: 'firefox',
            it: u.indexOf('Firefox') > -1
        }, {
            name: 'safari',
            it: u.indexOf('Safari') > -1 && u.indexOf('Chrome') === -1
        }, {
            name: 'qqbrowser',
            it: u.indexOf('MQQBrowser') > -1 && u.indexOf(' QQ') === -1
        }, {
            name: 'qq',
            it: u.indexOf('QQ') > -1
        }, {
            name: 'chrome',
            it: u.indexOf('Chrome') > -1 || u.indexOf('CriOS') > -1
        }, {
            name: 'opera',
            it: u.indexOf('Opera') > -1 || u.indexOf('OPR') > -1
        }]
        for (var i = 0; i < bws.length; i++) {
            if (bws[i].it) {
                return bws[i].name
            }
        }

        return 'other'
    };
    // 系统区分
    var getOS = function () {
        var u = navigator.userAgent
        if (!!u.match(/compatible/i) || u.match(/Windows/i)) {
            return 'windows'
        } else if (!!u.match(/Macintosh/i) || u.match(/MacIntel/i)) {
            return 'macOS'
        } else if (!!u.match(/iphone/i) || u.match(/Ipad/i)) {
            return 'ios'
        } else if (u.match(/android/i)) {
            return 'android'
        } else if (u.match(/Ubuntu/i)) {
            return 'Ubuntu'
        } else {
            return 'other'
        }
    };
    //判断数组中是否包含某字符串
    Array.prototype.contains = function (needle) {
        for (i in this) {
            if (this[i].indexOf(needle) > 0)
                return i;
        }
        return -1;
    }

    var device_type = navigator.userAgent; //获取userAgent信息
    // document.write(device_type); //打印到页面
    var md = new MobileDetect(device_type); //初始化mobile-detect
    var os = md.os(); //获取系统
    console.log(os)
    var model = "";
    if (os == "iOS") { //ios系统的处理
        os = +md.version("iPhone");
        console.log(os)
        model = md.mobile();
    } else if (os == "AndroidOS") { //Android系统的处理
        os = md.os() + md.version("Android");
        var sss = device_type.split(";");
        var i = sss.contains("Build/");
        if (i > -1) {
            model = sss[i].substring(0, sss[i].indexOf("Build/"));
        }
    }
    else {
        os = getOS();
        model = getBrowser();
    }
    //alert(os + "---" + model);//打印系统版本和手机型号
    //console.log(model + '||' + os, '打印系统版本和手机型号')
    return { "os": os, "dev": model }
}    
$(document).ready(function () {
    console.log(returnCitySN["cip"]+','+returnCitySN["cname"])
    console.log(GetDevice())
});