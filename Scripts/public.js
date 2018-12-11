//PC端js主入口
function JQajaxo(_type, _url, _asycn, _data, _success) {
    $.ajax({
        type: _type,
        url: _url,
        timeout: 2000,
        async: _asycn,
        data: _data,
        success: _success,
        error: function (qXHR, textStatus, errorThrown) {
            if (textStatus == "timeout") {
                console.log("加载超时，请重试");
            } else {
                error_callback();
            }
        },
        complete: function (XHR, TS) {
            if ($(".loading").length > 0) {
                $(".loading").hide();
            }
            XHR = null;
        }
    });
}
function JQajaxo2(_type, _url, _asycn, _data, _success) {
    $.ajax({
        type: _type,
        url: _url,
        timeout: 2000,
        async: _asycn,
        data: _data,
        beforeSend: function () {
            $(".loading").show();
        },
        success: _success,
        error: function (qXHR, textStatus, errorThrown) {
            if (textStatus == "timeout") {
                console.log("加载超时，请重试");
            } else {
                console.log(textStatus);
            }
        },
        complete: function (XHR, TS) {
            //$(".loading").hide();
            XHR = null;
        }
    });
}
function ajaxService(_type, _url, _asycn, _data, _success, _error) {
    $.ajax({
        type: _type,
        url: _url,
        timeout: 2000,
        async: _asycn,
        data: _data,
        success: _success,
        error: _error,
        complete: function (XHR, TS) {
            //$(".loading").hide();
            XHR = null;
        }
    });
}

//载入界面
function loadName(hr) {
    try{
        if (window.localStorage.userName != "" && window.localStorage.userName != null) {
            $("#userName").html(window.localStorage.userName);
            InitEnsure(hr);
        
        }
        else if (window.sessionStorage.userName != "" && window.sessionStorage.userName != null) {
            $("#userName").html(window.sessionStorage.userName);
            InitEnsure(hr);
        }
        else {
            window.location.href = "/Views/login.html";
        }
    }
    catch (ex) {
        window.location.href = "/Views/login.html";
    }
}

var getWebUser, GWAddinModule;

//连接服务器
function InitEnsure(hr) {
    $.ajax({
        type: "post",
        url: "/GWServices.asmx/InitEnsureRunProxy",
        data: "wcfIP=&&pageUserNm=" + window.localStorage.userName,
        success: function (dt) {
            var analyze = $(dt).children("string").text();
            try{
                if (window.localStorage.terminal.split('.')[0] != "Mobile") {
                    $("footer").html(analyze);
                }
            }
            catch (ex) {
                window.location.href = "/Views/login.html";
            }
            $.ajax({
                type: "post",
                url: "/GWServices.asmx/UserPermissions",
                async: false,
                data: "userName=" + window.localStorage.userName,
                success: function (dtUserPermissions) {
                    getWebUser = $(dtUserPermissions).children("UserItem");
                    //console.log(getWebUser.find("UserName").text());
                }
            });
            $.ajax({
                type: "post",
                url: "/GWServices.asmx/GainAlarmTab",
                async: false,
                data: "TableName=GWAddinModule",
                success: function (dtGWAddinModule) {
                    GWAddinModule = new Array();
                    var data = $(dtGWAddinModule).children("string").text();
                    var usera = JSON.parse(data);
                    for (var i = 0, j = 0; i < usera.length; i++) {
                        var userb = usera[i];
                        if (userb.WebPage[0] == "1") {
                            var userc = new Array(userb.ID, userb.Name, userb.ClassName, userb.HelpPath, userb.MultiScreens, userb.WebPage);
                            GWAddinModule[j++] = userc;
                        }
                    }
                }
            });
            loadings(hr);
        }
    });
}
function loadings(hr) {
    var isAd = isAddinModule_List(hr);
    if (isAd) {
        $(".navList ul li").removeClass("active");
        $(".navList ul li").each(function () {
            if ($(this).find("a").attr("href") == "#" + hr) {
                $(this).addClass("active");
                return false;
            }
        });
        $.ajax({
            url: "/Views/Home/" + hr + ".html",
            beforeSend: function () {
                //加载
            },
            success: function (data) {
                $(".main").html(data);
                document.title = $("#ribbonNow").text();
            },
            error: function () {
                //错误
            },
        });
    }
    else {
        alert(window.localStorage.userName + "：没有权限打开页面！");
    }
}

function isAddinModule_List(hr) {
    var views = false;
    if (getWebUser.find("IsAdministrator").text() != "true") {
        getWebUser.find("RoleItem").each(function () {
            $(this).find("AddinModule_List").find("int").each(function () {
                for (var i = 0; i < GWAddinModule.length; i++) {
                    if (GWAddinModule[i][0] == $(this).text()) {
                        if (hr == GWAddinModule[i][2].split('.')[1]) {
                            views = true;
                        }
                    }
                }
            });
        });
    }
    else {
        views = true;
    }
    if (hr == "index") {
        views = true;
    }
    return views;
}

//全屏事件
$(document).on('click', '[data-action="launchFullscreen"]', function () {
    if ($("body").hasClass("full-screen")) {
        var de = document;
        if (de.exitFullscreen) {
            de.exitFullscreen();
        } else if (de.mozCancelFullScreen) {
            de.mozCancelFullScreen();
        } else if (de.webkitCancelFullScreen) {
            de.webkitCancelFullScreen();
        }
        $("body").removeClass("full-screen");
    }
    else {
        var de = document.documentElement;
        if (de.requestFullscreen) {
            de.requestFullscreen();
        } else if (de.mozRequestFullScreen) {
            de.mozRequestFullScreen();
        } else if (de.webkitRequestFullScreen) {
            de.webkitRequestFullScreen();
        } else if (de.msRequestFullscreen) {
            de.msRequestFullscreen();
        }
        $("body").addClass("full-screen");
    }
});

//注销事件
$(document).on('click', '[data-action="userLogout"]', function () {
    var newDiv = document.createElement("div");
    newDiv.className = "fullScreenPopup";
    newDiv.id = "fullScreenPopup_Logout";
    var newContainer = "<div class='fullScreenCenter animated fadeIn' style='" + $("html").attr("style") + "'>";
    newContainer += "<div class='mg-default-center'><p class='MessageBox_p1'><i class=\"iconfont icon-logout\"></i> 注销 <b>" + window.localStorage.userName + "</b>？</p>";
    newContainer += "<p class='MessageBox_p2'>这将重新登录。</p>";
    newContainer += "<p class='MessageBox_p3'><button class='btn btns-style-1' onclick='onConfirmMessage()'>确定</button><button  class='btn btns-style-1' onclick='onCencel(\"" + newDiv.id + "\")'>取消</button></p>";
    newContainer += "</div></div>";
    newDiv.innerHTML = newContainer;
    document.body.appendChild(newDiv);
});
//确定
function onConfirmMessage() {
    window.localStorage.userName = "";
    window.localStorage.userPWD = "";
    try{
        if (window.localStorage.terminal.split('.')[1] == "App") {
            myJavaFun.OpenLocalUrl("login");
        }
        else {
            window.location.href = "/Views/login.html";
        }
    }
    catch (ex) {
        window.location.href = "/Views/login.html";
    }
}
//取消
function onCencel(dt) {
    if (supportCss3('animation-duration')) {
        $("#" + dt).addClass("fadeOut animated");
        setTimeout(function () {
            $("#" + dt).remove();
        }, 800);
    }
    else {
        $("#" + dt).remove();
    }
}
function onFullScreenAll(dt) {
    if (supportCss3('animation-duration')) {
        $(dt).parent().addClass("fadeOut animated");
        setTimeout(function () {
            $(dt).parent().remove();
        }, 800);
    }
    else {
        $(dt).parent().remove();
    }
}

//判断是否支持css3
function supportCss3(style) {
    var prefix = ['webkit', 'Moz', 'ms', 'o'],
    i,
    humpString = [],
    htmlStyle = document.documentElement.style,
    _toHumb = function (string) {
        return string.replace(/-(\w)/g, function ($0, $1) {
            return $1.toUpperCase();
        });
    };

    for (i in prefix)
        humpString.push(_toHumb(prefix[i] + '-' + style));

    humpString.push(_toHumb(style));

    for (i in humpString)
        if (humpString[i] in htmlStyle) return true;

    return false;
}

//选择皮肤
$(".popupSkin-menu img").on('click', function () {
    $("html").attr("style", "background:url(" + $(this).attr("src") + ")");
    $("body").attr("style", "background:url(" + $(this).attr("src") + ")");
    window.localStorage.bgd = "background:url(" + $(this).attr("src") + ")";
});

//选择皮肤
$(".popupSkin-menu span").on('click', function () {
    $("html").attr("style", $(this).attr("style"));
    $("body").attr("style", $(this).attr("style"));
    window.localStorage.bgd = $(this).attr("style");
});

//折叠菜单
$(document).on('click', '[data-action="toggleMenu"]', function () {
    if (!$("nav").find("ul").hasClass("minifieds")) {
        $("nav").animate({ width: '45px' }, function () {
            $(".navUser").find("span").hide();
            $("nav").find("span").addClass("menu-item-parents");
            $("nav").find("ul").addClass("minifieds");
        });
        $(".main").animate({ left: '58px' });
        $("footer").animate({ padding: '0 0 0 58px' });
        $(".navList ul").find("li").hover(function () {
            $(this).find("span").show();
        }, function () {
            $(this).find("span").attr("style", "");
        });
    }
    else {
        $(".navUser").find("span").show();
        $("nav").find("ul").removeClass("minifieds");
        $("nav").find("span").removeClass("menu-item-parents");
        $("nav").animate({ width: '220px' });
        $(".main").animate({ left: '233px' });
        $("footer").animate({ padding: '0 0 0 233px' });
        $(".navList ul").find("li").unbind();
    }
});

//刷新界面
$(document).on('click', '[data-action="refreshAgain"]', function () {
    var newDiv = document.createElement("div");
    newDiv.className = "fullScreenPopup";
    newDiv.id = "fullScreenPopup_Refresh";
    var newContainer = "<div class='fullScreenCenter animated fadeIn' style='" + $("html").attr("style") + "'><div class='mg-default-center'>";
    newContainer += "<p class='MessageBox_p1'><i class=\"iconfont icon-shuaxin\"></i> 刷新？</p>";
    newContainer += "<p class='MessageBox_p2'>这将重新载入界面。</p>";
    newContainer += "<p class='MessageBox_p3'><button class='btn btns-style-1' onclick='onConfirmRefresh(\"" + newDiv.id + "\")'>确定</button><button  class='btn btns-style-1' onclick='onCencel(\"" + newDiv.id + "\")'>取消</button></p>";
    newContainer += "</div></div>";
    newDiv.innerHTML = newContainer;
    document.body.appendChild(newDiv);
});
//确定
function onConfirmRefresh(dt) {
    if (supportCss3('animation-duration')) {
        $("#" + dt).addClass("fadeOut animated");
        setTimeout(function () {
            $("#" + dt).remove();
            var hs = window.location.hash.split('#')[1];
            location.reload();
        }, 800);
    }
    else {
        $("#" + dt).remove();
        var hs = window.location.hash.split('#')[1];
        if (hs == null) {
            loadings("index");
        }
        else {
            loadings(hs);
        }
    }
}

//导航链接
$(document).on('click', '[data-action="navLists"]', function (d) {
    if (!$(this).parent().hasClass("active")) {
        var hr = $(this).attr("href").split('#')[1];
        loadings(hr);
    }
});

//tab页
$(document).on('click', '[data-action="tabList"]', function (d) {
    if ($(this).hasClass("active")) { return; }
    $(this).siblings().removeClass("active");
    var hr = $(this).attr("href").split('#')[1];
    var $td;
    $("#" + hr).parent().find("article").each(function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active fadeIn");
            return false;
        }
    });
    $("#" + hr).addClass("active fadeIn");
    $(this).addClass("active");
});

//关于JavaScriptSerializer在序列化时会将DateTime的数据序列化成类似\/Date(626543800000)\/这样的值
function TimeJSONToString(dt) {
    var timeJSON = parseInt(dt.replace(/\D/igm, ""));
    var timeDate = new Date(timeJSON).format("yyyy-MM-dd hh:mm:ss");
    return timeDate.toLocaleString();
}
//日期格式化
Date.prototype.format = function (fmt) { //author: meizz   
    var o = {
        "M+": this.getMonth() + 1,                 //月份   
        "d+": this.getDate(),                    //日   
        "h+": this.getHours(),                   //小时   
        "m+": this.getMinutes(),                 //分   
        "s+": this.getSeconds(),                 //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
