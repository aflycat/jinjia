//登录
var terminal = null;

window.onload = function () {
    var hg = ($(document).height() / 2 - $(".signin-content").height() / 2) - 50;
    $(".signin-content").css("top", hg + "px");

    var wd = ($(document).width() / 2 - 70 / 2);

    $("#loading-center-absolute").css("left", wd + "px");
    $(".loading-text").css("left", (wd + 6) + "px");

    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function () {
            FastClick.attach(document.body);
        }, false);
    }
    if (window.localStorage.userName) {
        document.getElementById("inputName").value = window.localStorage.userName;
    }
    if (window.localStorage.userPWD) {
        document.getElementById("inputPassword").value = unEncrypt(window.localStorage.userPWD);
    }

    document.getElementsByTagName("form")[0].onsubmit = function () {
        return false;
    }

    document.querySelectorAll('[data-action="loginOnKey"]').item(0).onkeypress = onkeyiptEvent;

    document.querySelectorAll('[data-action="loginAdvanced"]').item(0).onclick = onAdvanced;

    document.querySelectorAll('[data-action="loginSumit"]').item(0).onclick = onSumitLogining;

    onUserAgent();
}

window.onresize = function () {
    var hg = ($(document).height() / 2 - $(".signin-content").height() / 2) - 50;
    $(".signin-content").css("top", hg + "px");
}

//判断访问终端
function onUserAgent() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    //var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    //var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsWM) {
        terminal = "Mobile";
    } else {
        terminal = "Home";
    }
}
var numbToService = 0;
var strServiceURLs = '';
function onSumitLogining() {
    numbToService = 0;
    //if (!this.tagName) {
    //    document.querySelectorAll('[data-action="loginSumit"]').item(0).onclick = null;
    //}
    var strName = document.getElementById("inputName").value;
    var strPWD = document.getElementById("inputPassword").value;
    if (strName == "") {
        document.getElementById("message").innerHTML = "用户名不能为空！";
    }
    else if (strPWD == "") {
        document.getElementById("message").innerHTML = "密码不能为空！";
    }
    //else if (strServiceURL == "") {
    //    document.getElementById("message").innerHTML = "服务器地址不能为空！";
    //}
    else {
        //window.localStorage.service_url = strServiceURL;
        window.localStorage.userName = strName;
        window.localStorage.userPWD = Encrypt(strPWD);
        ajaxGWServiceInit();
        //strServiceURLs = strServiceURL;
        document.getElementsByTagName("form")[0].className = "flipOutX animated";
        setTimeout(function () {
            document.getElementsByTagName("form")[0].style.display = "none";
            document.getElementById("loading-center").style.display = "block";
            setTimeout(function () {
                document.getElementById("loading-center-absolute").style.transform = "rotate(720deg)";
                //setTimeout(ajaxGWServiceInit, 2000);
            }, 1000);
        }, 1000);
    }
}

//回车事件
function onkeyiptEvent(event) {
    if (event.keyCode == 13) {
        onSumitLogining();
    }
}

//高级配置服务器地址
function onAdvanced() {
    $("#service_url").slideToggle("slow");
}

//登录服务器
function ajaxGWServiceInit() {
    numbToService++;
    var ajaxs = $.ajax({
        type: 'post',
        url: '/GWServices.asmx/InitEnsureRunProxy',
        timeout: 5000,
        async: true,
        data: "pageUserNm=" + document.getElementById("inputName").value + "&&wcfIP=",
        success: function (dt) {
            var datas = $(dt).find("string").text();
            if (datas != null && datas != "" && datas != "false") {
                ajaxGWLogin();
            }
            else {
                ajaxs.abort();
                console.log("服务器连接错误！(101)");
                if (numbToService < 6) {
                    ajaxGWServiceInit();
                }
                else {
                    setTimeout(function () {
                        document.getElementsByTagName("form")[0].className = "";
                        document.getElementsByTagName("form")[0].style.display = "block";
                        document.getElementById("loading-center").style.display = "none";
                        document.getElementById("loading-center-absolute").style.transform = "";
                        document.getElementById("message").innerHTML = "服务器连接错误！";
                        setTimeout(function () { document.getElementById("message").innerHTML = ""; }, 2000);
                    }, 2500);
                }
            }
        },
        error: function () {
            ajaxs.abort();
            console.log("服务器连接错误！(102)");
            if (numbToService < 6) {
                ajaxGWServiceInit();
            }
            else {
                setTimeout(function () {
                    document.getElementsByTagName("form")[0].className = "";
                    document.getElementsByTagName("form")[0].style.display = "block";
                    document.getElementById("loading-center").style.display = "none";
                    document.getElementById("loading-center-absolute").style.transform = "";
                    document.getElementById("message").innerHTML = "服务器连接错误！";
                    setTimeout(function () { document.getElementById("message").innerHTML = ""; }, 2000);
                }, 2500);
            }
        }
    });
}
//验证用户名和密码
function ajaxGWLogin() {
    var strName = document.getElementById("inputName").value;
    var strPWD = document.getElementById("inputPassword").value;
    $.ajax({
        type: 'post',
        url: '/GWServices.asmx/Login',
        timeout: 5000,
        async: true,
        data: "nameKey=" + strName + "&&passwordKey=" + strPWD,
        success: function (dt) {
            var datas = $(dt).find("string").text();
            if (datas != null && datas != "" && datas != "false") {
                console.log("登陆成功！");
                window.localStorage.terminal = terminal + ".Web";
                if (numbToService >= 2) {
                    setTimeout(function () {
                        window.location.href = "/Views/" + terminal + "/home.html";
                    }, 1000);
                }
                else {
                    setTimeout(function () {
                        window.location.href = "/Views/" + terminal + "/home.html";
                    }, 3000);
                }
            }
            else {
                console.log("登陆失败！(101)");
                setTimeout(function () {
                    document.getElementsByTagName("form")[0].className = "";
                    document.getElementsByTagName("form")[0].style.display = "block";
                    document.getElementById("loading-center").style.display = "none";
                    document.getElementById("loading-center-absolute").style.transform = "";
                    document.getElementById("message").innerHTML = "用户名或密码错误！";
                    setTimeout(function () { document.getElementById("message").innerHTML = ""; }, 2000);
                }, 2500);
            }
        },
        error: function () {
            console.log("登陆失败！(102)");
            setTimeout(function () {
                document.getElementsByTagName("form")[0].className = "";
                document.getElementsByTagName("form")[0].style.display = "block";
                document.getElementById("loading-center").style.display = "none";
                document.getElementById("loading-center-absolute").style.transform = "";
                document.getElementById("message").innerHTML = "登陆失败！";
                setTimeout(function () { document.getElementById("message").innerHTML = ""; }, 2000);
            }, 2500);
        }
    });
}

//加密与解密
function Encrypt(Text) {
    output = new String;
    alterText = new Array();
    varCost = new Array();
    TextSize = Text.length;
    for (i = 0; i < TextSize; i++) {
        idea = Math.round(Math.random() * 111) + 77;
        alterText[i] = Text.charCodeAt(i) + idea;
        varCost[i] = idea;
    }
    for (i = 0; i < TextSize; i++) {
        output += String.fromCharCode(alterText[i], varCost[i]);
    }
    return output;
}
function unEncrypt(Text) {
    output = new String;
    alterText = new Array();
    varCost = new Array();
    TextSize = Text.length;
    for (i = 0; i < TextSize; i++) {
        alterText[i] = Text.charCodeAt(i);
        varCost[i] = Text.charCodeAt(i + 1);
    }
    for (i = 0; i < TextSize; i = i + 2) {
        output += String.fromCharCode(alterText[i] - varCost[i]);
    }
    return output;
}