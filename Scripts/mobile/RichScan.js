
function RichScan() {
    //onbtnVideo_s();
    //$(".ricscan_btnVideo").bind("click", onbtnVideo);
    //onbtnVideo();
    onbtnVideo();
}
function onbtnVideo_s() {
    document.getElementById('ricscan_ipt').addEventListener('change', function () {
        document.getElementById("ricscan_text").innerHTML = "扫描结果：<br/>";
        var reader = new FileReader();
        reader.onload = function (e) {
            qrcode.decode(e.target.result);
            qrcode.callback = function (data) {
                //得到扫码的结果
                document.getElementById("ricscan_text").innerHTML = "扫描结果：<br/>" + data;
            };
            document.getElementById("ricscan_img").src = e.target.result;
            document.getElementById("ricscan_img").style.width = "60%";
        };
        reader.readAsDataURL(this.files[0]);
    }, false);
}
var canvas = null, context = null, video = null;
function onbtnVideo() {
    document.getElementById("video").style.visibility = "visible";
    //$(".ricscan_btn").hide();
    try {
        canvas = document.getElementById("canvas");
        context = canvas.getContext("2d");
        video = document.getElementById("video");
        MediaStreamTrack.getSources(function (sourceInfos) {
            var flag = true;
            var exArray = []; //存储设备源ID
            for (var i = 0; i != sourceInfos.length; ++i) {
                var sourceInfo = sourceInfos[i];
                //这里会遍历audio,video，所以要加以区分
                if (sourceInfo.kind === 'video') {
                    exArray.push(sourceInfo.id);
                }
            }
            var videoObj = {
                "video": {
                    "mandatory": {
                        "minAspectRatio": 1.40,
                        "maxAspectRatio": 1.78,
                        "minFrameRate": 15,
                        "maxFrameRate": 25,
                        "minWidth": 1920,
                        "minHeight": 1080
                    },
                    'optional': [{
                        'sourceId': exArray[1] //0为前置摄像头，1为后置
                    }]
                }, audio: false
            }

            getUserMedia(videoObj, flag);
        });
    } catch (e) {
        printHtml("浏览器不支持HTML5 CANVAS");
    }
}

function getUserMedia(videoObj, flag) {
    var MediaErr = function (error) {
        flag = false;
        if (error.PERMISSION_DENIED) {
            alert('用户拒绝了浏览器请求媒体的权限', '提示');
        } else if (error.NOT_SUPPORTED_ERROR) {
            alert('对不起，您的浏览器不支持拍照功能，请使用其他浏览器', '提示');
        } else if (error.MANDATORY_UNSATISFIED_ERROR) {
            alert('指定的媒体类型未接收到媒体流', '提示');
        } else {
            alert('系统未能获取到摄像头，请确保摄像头已正确安装。或尝试刷新页面，重试', '提示');
        }
    };
    //获取媒体的兼容代码，目前只支持（Firefox,Chrome,Opera）  
    if (navigator.getUserMedia) {
        //qq浏览器不支持  
        if (navigator.userAgent.indexOf('MQQBrowser') > -1) {
            alert('对不起，您的浏览器不支持拍照功能，请使用其他浏览器', '提示');
            return false;
        }
        navigator.getUserMedia(videoObj, function (stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
        }, MediaErr);
    }
    else if (navigator.webkitGetUserMedia) {
        navigator.webkitGetUserMedia(videoObj, function (stream) {
            video.src = window.webkitURL.createObjectURL(stream);
            video.play();
        }, MediaErr);
    }
    else if (navigator.mozGetUserMedia) {
        navigator.mozGetUserMedia(videoObj, function (stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
        }, MediaErr);
    }
    else if (navigator.msGetUserMedia) {
        navigator.msGetUserMedia(videoObj, function (stream) {
            $(document).scrollTop($(window).height());
            video.src = window.URL.createObjectURL(stream);
            video.play();
        }, MediaErr);
    } else {
        alert('对不起，您的浏览器不支持拍照功能，请使用其他浏览器');
        return false;
    }
    if (flag) {
        //alert('为了获得更准确的测试结果，请尽量将二维码置于框中，然后进行拍摄、扫描。 请确保浏览器有权限使用摄像功能');  
    }
    //这个是拍照按钮的事件，            
    $("#snap").click(function () { startPat(); }).show();


}

//打印内容到页面        
function printHtml(content) {
    $(window.document.body).append(content + "<br/>");
}
//开始拍照  
function startPat() {
    setTimeout(function () {//防止调用过快  
        if (context) {
            context.drawImage(video, 0, 0, 320, 208);
            CatchCode();
        }
    }, 200);
}

//抓屏获取图像流，并上传到服务器        
function CatchCode() {
    if (canvas != null) {
        document.getElementById("ricscan_text").innerHTML = "扫描结果：<br/>";
        //以下开始编 数据     
        var imgData = canvas.toDataURL();
        $("#videoBase64").attr("src", imgData);
        qrcode.decode(imgData);
        qrcode.callback = function (data) {
            //得到扫码的结果
            document.getElementById("ricscan_text").innerHTML = "扫描结果：<br/>" + data;
        };
        return;
        //将图像转换为base64数据  
        var base64Data = imgData;//.substr(22); //在前端截取22位之后的字符串作为图像数据  
        //开始异步上  
        //$.post("saveimg.php", { "img": base64Data }, function (result) {
        //    printHtml("解析结果：" + result.data);
        //    if (result.status == "success" && result.data != "") {
        //        printHtml("解析结果成功！");
        //    } else {
        //        startPat();//如果没有解析出来则重新抓拍解析         
        //    }
        //}, "json");
    }
}