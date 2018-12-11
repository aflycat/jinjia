//当前设备号
var confNum;
//当前设备名
var confName;
//所有设备号
var confNumArry = new Array();
//遥测表曲线值
var dataQuXian = new Array();
//遥测表曲线名
var dataQuXianName = new Array();
onloadContent();
var getWebUser;
function onloadContent() {
    $(".main").attr("value", "1");
    
    $.ajax({
        type: "post",
        url: "/GWServices.asmx/UserPermissions",
        data: "userName=" + window.localStorage.userName,
        success: function (dt) {
            getWebUser = $(dt).children("UserItem");
            //console.log(getWebUser.find("UserName").text());
            treeConfList();
        }
    });
}

var ConfListNames = "";
function treeconfName(confId) {
    var _url = "/GWServices.asmx/ConfListName";
    var _data = "EquipId=" + confId;

    function successf(data) {
        ConfListNames = $(data).children("string").text();
        if (ConfListNames == "false") {
            ConfListNames = "";
        }
    }
    JQajaxo("post", _url, false, _data, successf);
}

var treeRefreshSet
//树状列表数据
var datastr = new Array();
function treeConfList() {
    $("#treelist").html("");
    var equipNostr = "";//所有设备号
    var _url = "/GWServices.asmx/GetEquipTreeLists";
    datastr = new Array();
    function _successf(data) {
        $(data).children("ArrayOfString").find("string").each(function (i) {
            datastr[i] = $(this).text();
        });
        try {
            var datastrA = datastr[0].split('|');
            for (var i = 0; i < datastrA.length; i++) {
                var dataA = datastrA[i].split(',');
                var newRow = "";
                if (dataA[2] == "true") {
                    newRow += "<li class=\"parent_li\">";
                    newRow += "<span><i class=\"iconfont icon-jian\"></i> ";
                    newRow += "<img id='imgConf_" + i + "' src=\"/Image/alarm/CommunicationOK.png\"><b>" + dataA[1] + "</b></span>";
                    newRow += "<ul id='" + dataA[0] + "'></ul></li>";
                }
                else {
                    if (dataA[1] == "") {
                        treeconfName(dataA[2]);
                        dataA[1] = ConfListNames;

                    }
                    equipNostr += dataA[2] + ",";
                    newRow += "<li><span onclick='onclick_tree(\"" + dataA[1] + "," + dataA[2] + "\",this)'><img id='imgConf_" + i + "' src=\"/Image/alarm/CommunicationOK.png\"><b>" + dataA[1] + "</b></span></li>";
                }
                $("#treelist").append(newRow);
            }

            var datastrB = datastr[1].split('|');
            for (var i = 0; i < datastrB.length; i++) {
                var dataB = datastrB[i].split(',');
                var newRow = "";
                if (dataB[2] == "true") {
                    newRow += "<li class=\"parent_li\">";
                    newRow += "<span><i class=\"iconfont icon-jian\"></i> ";
                    newRow += "<img id='imgConf_" + dataB[0] + "' src=\"/Image/alarm/CommunicationOK.png\"><b>" + dataB[1] + "</b></span><ul id='" + dataB[0] + "'></ul></li>";
                }
                else {
                    if (dataB[1] == "") {
                        treeconfName(dataB[2]);
                        dataB[1] = ConfListNames;;
                    }
                    equipNostr += dataB[2] + ",";
                    if (Browse_Equip_List(dataB[2]) || Browse_SpecialEquip_List(dataB[2], false)) {
                        
                        newRow += "<li><span onclick='onclick_tree(\"" + dataB[1] + "," + dataB[2] + "\",this)'><img id='imgConf_" + dataB[2] + "' src=\"/Image/alarm/CommunicationOK.png\"><b>" + dataB[1] + "</b></span></li>";
                    }
                    
                }
                var dataBids = dataB[0].split('_');
                $("#" + dataBids[0]).append(newRow);
            }

            var datastrC = datastr[2].split('|');
            for (var i = 0; i < datastrC.length; i++) {
                var dataC = datastrC[i].split(',');
                var newRow = "";
                if (dataC[2] == "true") {
                    newRow += "<li class=\"parent_li\">";
                    newRow += "<span><i class=\"iconfont icon-jian\"></i> ";
                    newRow += "<img id='imgConf_" + dataC[0] + "' src=\"/Image/alarm/CommunicationOK.png\"><b>" + dataC[1] + "</b></span><ul id='" + dataC[0] + "'></ul></li>";
                }
                else {
                    if (dataC[1] == "") {
                        treeconfName(dataC[2]);
                        dataC[1] = ConfListNames;
                    }
                    equipNostr += dataC[2] + ",";
                    if (Browse_Equip_List(dataC[2]) || Browse_SpecialEquip_List(dataC[2], false)) {
                        newRow += "<li><span onclick='onclick_tree(\"" + dataC[1] + "," + dataC[2] + "\",this)'><img id='imgConf_" + dataC[2] + "' src=\"/Image/alarm/CommunicationOK.png\"><b>" + dataC[1] + "</b></span></li>";
                    }
                    
                }
                var dataCids = dataC[0].split('_');
                $("#" + dataCids[0] + "_" + dataCids[1]).append(newRow);
            }
            if (datastr[3] != null) {
                var datastrD = datastr[3].split('|');
                for (var i = 0; i < datastrD.length; i++) {
                    var dataD = datastrD[i].split(',');
                    var newRow = "";
                    if (dataD[2] == "true") {
                        newRow += "<li class=\"parent_li\">";
                        newRow += "<span><i class=\"iconfont icon-jian\"></i> ";
                        newRow += "<img id='imgConf_" + dataD[0] + "' src=\"/Image/alarm/CommunicationOK.png\"><b>" + dataD[1] + "</b></span><ul id='" + dataD[0] + "'></ul></li>";
                    }
                    else {
                        if (dataD[1] == "") {
                            treeconfName(dataD[2]);
                            dataD[1] = ConfListNames;
                        }
                        equipNostr += dataD[2] + ",";
                        if (Browse_Equip_List(dataD[2]) || Browse_SpecialEquip_List(dataD[2], false)) {
                            
                            newRow += "<li><span onclick='onclick_tree(\"" + dataD[1] + "," + dataD[2] + "\",this)'><img id='imgConf_" + dataD[2] + "' src=\"/Image/alarm/CommunicationOK.png\"><b>" + dataD[1] + "</b></span></li>";
                        }
                    }
                    var dataDids = dataD[0].split('_');

                    $("#" + dataDids[0] + "_" + dataDids[1] + "_" + dataDids[2]).append(newRow);
                }
            }

            equipNostr = equipNostr.substring(0, equipNostr.length - 1);
            confNumArry = null;
            confNumArry = equipNostr.split(',');
            onloadTree("#treelist");//树状列表初始化
            $("#treelist").find("ul").each(function () {
                if ($(this).html() == "") {
                    $(this).parent().remove();
                }
            });
            setTimeout(treeRefresh, 2000);
            treeRefreshSet = setInterval(treeRefresh, 4000);
        }
        catch (ex) { }
    }
    JQajaxo("post", _url, false, "", _successf);
    
}
//可查看设备
function Browse_Equip_List(equips) {
    var equipBool = false;
    if (getWebUser.find("IsAdministrator").text() != "true") {
        getWebUser.find("RoleItem").each(function () {
            $(this).find("Browse_Equip_List").find("int").each(function () {
                if (equips == $(this).text()) {
                    equipBool = true;
                }
            });
        });
    }
    else {
        equipBool = true;
    }
    return equipBool;
}
//可查看设备(子集)
function Browse_SpecialEquip_List(equips, num) {
    var equipBool = false;
    if (getWebUser.find("IsAdministrator").text() != "true") {
        getWebUser.find("RoleItem").each(function () {
            $(this).find("Browse_SpecialEquip_List").find("string").each(function () {
                if (equips == $(this).text().split('.')[0]) {
                    if (num != false) {
                        if ($(this).text().split('.')[1] == num) {
                            equipBool = true;
                        }
                    }
                    else {
                        equipBool = true;
                    }
                }
            });
        });
    }
    else {
        equipBool = true;
    }
    return equipBool;
}
//可控制设备
function Control_Equip_List(equips) {
    var equipBool = false;
    if (getWebUser.find("IsAdministrator").text() != "true") {
        getWebUser.find("RoleItem").each(function () {
            $(this).find("Control_Equip_List").find("int").each(function () {
                if (equips == $(this).text()) {
                    equipBool = true;
                }
            });
        });
    }
    else {
        equipBool = true;
    }
    return equipBool;
}
//可控制设备（子集）
function Control_SetItem_List(equips, num) {
    var equipBool = false;
    if (getWebUser.find("IsAdministrator").text() != "true") {
        getWebUser.find("RoleItem").each(function () {
            $(this).find("Control_SetItem_List").find("string").each(function () {
                if (equips == $(this).text().split('.')[0]) {
                    if (num != false) {
                        if ($(this).text().split('.')[1] == num) {
                            equipBool = true;
                        }
                    }
                    else {
                        equipBool = true;
                    }
                }
            });
        });
    }
    else {
        equipBool = true;
    }
    return equipBool;
}

//刷新设备列表报警状态
function treeRefresh() {
    if ($(".main").attr("value") != "1") {
        clearInterval(treeRefreshSet);
        return;
    }
    for (var i = 0; i < confNumArry.length; i++) {
        m_IsAlarmTodata(confNumArry[i]);
    }
}
//父节点判断是否有子节点报警
function treeListParentNode() {
    $("#treelist").children("li").each(function () {
        var a = 0;
        $(this).children("ul").each(function () {
            $(this).children("li").each(function () {
                if ($(this).children("span").children("img").attr("value") == "false") {
                    a++;
                }

                $(this).children("ul").each(function () {
                    var b = 0;
                    $(this).children("li").each(function () {

                        if ($(this).children("span").children("img").attr("value") == "false") {
                            b++;
                            a++;
                        }

                        $(this).children("ul").each(function () {
                            var c = 0;
                            $(this).children("li").each(function () {
                                if ($(this).children("span").children("img").attr("value") == "false") {
                                    c++;
                                    b++;
                                    a++;
                                }
                            });
                            if (c > 0) {
                                $(this).parent().children("span").children("img").attr("src", "/Image/alarm/HaveAlarm.png");
                                $(this).parent().children("span").children("b").attr("value", "false");
                            }
                            else {
                                $(this).parent().children("span").children("img").attr("src", "/Image/alarm/CommunicationOK.png");
                                $(this).parent().children("span").children("img").attr("value", "true");
                            }
                        })
                    });
                    if (b > 0) {
                        $(this).parent().children("span").children("img").attr("src", "/Image/alarm/HaveAlarm.png");
                        $(this).parent().children("span").children("img").attr("value", "false");
                    }
                    else {
                        $(this).parent().children("span").children("img").attr("src", "/Image/alarm/CommunicationOK.png");
                        $(this).parent().children("span").children("img").attr("value", "true");
                    }
                });
            })
        });
        if (a > 0) {
            $(this).children("span").children("img").attr("src", "/Image/alarm/HaveAlarm.png");
            $(this).children("span").children("img").attr("value", "false");
        }
        else {
            $(this).children("span").children("img").attr("src", "/Image/alarm/CommunicationOK.png");
            $(this).children("span").children("img").attr("value", "true");
        }
    });
}
//获取是否有报警
function m_IsAlarmTodata(confarrys) {
    var rets = 0;
    var _url = "/GWServices.asmx/RealTimeData";
    var _dataYcp = "selectedEquipNo=" + confarrys + "&&tableName=mypxs";
    JQajaxo("post", _url, true, _dataYcp, _successf);
    function _successf(data) {
        var resultStr = $(data).children("string").text();
        rets = resultStr;
        var domimg = $("#imgConf_" + confarrys);
        domimg.attr("src", "/Image/alarm/" + resultStr + ".png");
        if (resultStr == "CommunicationOK") {
            domimg.attr("value", "true");
        }
        else {
            domimg.attr("value", "false");
        }
        if (confarrys == confNumArry[confNumArry.length - 1]) {
            treeListParentNode();//父节点报警状态
        }
    }
    return rets;
}

var spanDom = null;
var tabPages = 0;
//单击设备列表事件
function onclick_tree(confarrysAndnames, data) {
    var confarrysAndname = confarrysAndnames.split(',');
    confName = confarrysAndname[0];
    confNum = confarrysAndname[1];
    if (spanDom != null) {
        $(spanDom).removeClass("active");
    }
    spanDom = $(data).parent().find("span");
    $(data).parent().find("span").addClass("active");
    
    $("#tableYc tbody").html("");
    $("#tableYx tbody").html("");
    $("#tableSe tbody").html("");
    ontableAjax();
}

var ycyxRefreshSet;
//曲线点
var curveDrop = -19;
function ontableAjax() {
    treeTodata(0);
    treeTodata(1);
    setTodata();
    ycyxRefreshSet = setInterval(ycyxRefresh, 4000);
}
//获取遥测表、遥信表的数据
function treeTodata(datas) {
    var _url = "/GWServices.asmx/RealTimeData";
    if (datas == 0) {
        var _dataYcp = "selectedEquipNo=" + confNum + "&&tableName=ycp";
        JQajaxo("post", _url, false, _dataYcp, _successfYcp);
    }
    else {
        var _dataYxp = "selectedEquipNo=" + confNum + "&&tableName=yxp";
        JQajaxo("post", _url, false, _dataYxp, _successfYxp);
    }
    function _successfYcp(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "false") {
            jsonTodata(resultJs, "ycp");
        }
    }

    function _successfYxp(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "false") {
            jsonTodata(resultJs, "yxp");
        }
    }
}

//创建遥测表，遥信表
function jsonTodata(data, tableName) {
    var c_s = $("#imgConf_" + confNum).attr("src").split('/')[3].split('.')[0];
    var usera = JSON.parse(data);
    if (tableName == "ycp") {
        $("#tableYc tbody").html("");
        if (!usera.length) {
            $("#tableYcLi").hide();
            $("#tableYcLi").attr("values", "0");
            $("#tableYcLi").removeClass("active");
            $("#tableYcp").removeClass("active");
        }
        else {
            $("#tableYcLi").show();
            $("#tableYcLi").attr("values", "1");
            $("#tableYcLi").addClass("active");
            $("#tableYcp").addClass("active");
        }
        for (var i = 0; i < usera.length; i++) {
            var userb = usera[i];
            var userc = new Array(userb.m_IsAlarm, userb.m_AdviceMsg, userb.m_iYCNo, userb.m_YCNm, userb.m_YCValue, userb.m_Unit);
            dataQuXian[i] = new Array(userb.m_YCValue, userb.m_Unit);
            dataQuXianName[i] = userc[3];
            appendRowa(i);
        }
    }
    else {
        $("#tableYx tbody").html("");
        if (!usera.length) {
            $("#tableYxLi").hide();
            $("#tableYxLi").attr("values", "0");
            $("#tableYxLi").removeClass("active");
            $("#tableYxp").removeClass("active");
        }
        else {
            $("#tableYxLi").show();
            $("#tableYxLi").attr("values", "1");
            if ($("#tableYcLi").attr("values") == "0") {
                $("#tableYxLi").addClass("active");
                $("#tableYxp").addClass("active");
            }
            else {
                $("#tableYxLi").removeClass("active");
                $("#tableYxp").removeClass("active");
            }
        }
        for (var j = 0; j < usera.length; j++) {
            var userb = usera[j];
            var userc = new Array(userb.m_IsAlarm, userb.m_iYXNo, userb.m_YXNm, userb.m_YXState, userb.m_AdviceMsg);
            appendRowb(j);
        }
    }

    function appendRowa(data) {
        var newRow = $("<tr></tr>");
        if (c_s == "CommunicationOK" || c_s == "HaveAlarm") {
            if (userc[0] == "False") {
                newRow.append("<td id='m_alarmyc_" + i + "'><img src=\"/Image/alarm/CommunicationOK.png\"></td>");
            }
            else {
                newRow.append("<td id='m_alarmyc_" + i + "'><img src=\"/Image/alarm/HaveAlarm.png\"></td>");
            }
        }
        else {
            newRow.append("<td id='m_alarmyc_" + i + "'><img src=\"/Image/alarm/" + c_s + ".png\"></td>");
        }

        for (var k = 2; k < userc.length - 1; k++) {
            if (k == 4) {
                newRow.append("<td id='valueycp_" + i + "'>" + userc[k] + userc[5] + "</td>");
            }
            else {
                newRow.append("<td>" + userc[k] + "</td>");
            }
        }
        newRow.append("<td><button class='btn btns-style-4' onclick=\"curveBox(" + i + ")\"><i class='iconfont icon-quxiantu'></i></button></td>");
        newRow.append("<td id='m_ycpMsg_" + i + "'>" + userc[1] + "</td>");
        $("#tableYc tbody:last").append(newRow);
    }

    function appendRowb(data) {
        var newRow = $("<tr></tr>");
        if (c_s == "CommunicationOK" || c_s == "HaveAlarm") {
            if (userc[0] == "False") {
                newRow.append("<td id='m_alarmyx_" + j + "'><img src=\"/Image/alarm/CommunicationOK.png\"></td>");
            }
            else {
                newRow.append("<td id='m_alarmyx_" + j + "'><img src=\"/Image/alarm/HaveAlarm.png\"></td>");
            }
        }
        else {
            newRow.append("<td id='m_alarmyx_" + i + "'><img src=\"/Image/alarm/" + c_s + ".png\"></td>");
        }

        for (var k = 1; k < userc.length; k++) {
            if (k == 3) {
                newRow.append("<td id='valueyxp_" + j + "'>" + userc[k] + "</td>");
            }
            else if (k == 4) {
                newRow.append("<td id = 'm_yxpMsg_" + j + "'>" + userc[k] + "</td>");
            }
            else {
                newRow.append("<td>" + userc[k] + "</td>");
            }
        }
        $("#tableYx tbody:last").append(newRow);
    }
}

//刷新遥测表，遥信表数据
function ycyxRefresh() {
    if ($(".main").attr("value") != "1") {
        clearInterval(ycyxRefreshSet);
        return;
    }

    var _url = "/GWServices.asmx/RealTimeData";
    var c_s = $("#imgConf_" + confNum).attr("src").split('/')[3].split('.')[0];
    var _dataYcp = "selectedEquipNo=" + confNum + "&&tableName=ycp";
    JQajaxo("post", _url, false, _dataYcp, _successfYcp);
    var _dataYxp = "selectedEquipNo=" + confNum + "&&tableName=yxp";
    JQajaxo("post", _url, false, _dataYxp, _successfYxp);
    function _successfYcp(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "false") {
            ycpToHtml(resultJs);
        }
    }
    function _successfYxp(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "false") {
            yxpToHtml(resultJs);
        }
    }

    function ycpToHtml(data) {
        var usera = JSON.parse(data);
        for (var i = 0; i < usera.length; i++) {
            var userb = usera[i];
            var userc = new Array(userb.m_IsAlarm, userb.m_YCValue, userb.m_AdviceMsg, userb.m_YCNm, userb.m_Unit);
            dataQuXian[i] = new Array(userb.m_YCValue, userb.m_Unit);
            dataQuXianName[i] = userc[3];
            if (c_s == "CommunicationOK" || c_s == "HaveAlarm") {
                if (userc[0] == "False") {
                    $("#m_alarmyc_" + i).html("<img src=\"/Image/alarm/CommunicationOK.png\">");
                }
                else {
                    $("#m_alarmyc_" + i).html("<img src=\"/Image/alarm/HaveAlarm.png\">");
                }
            }
            else {
                $("#m_alarmyc_" + i).html("<img src=\"/Image/alarm/" + c_s + ".png\">");
            }
            $("#valueycp_" + i).html(userc[1] + userc[4]);
            $("#m_ycpMsg_" + i).html(userc[2]);
        }
    }

    function yxpToHtml(data) {
        var usera = JSON.parse(data);
        for (var i = 0; i < usera.length; i++) {
            var userb = usera[i];
            var userc = new Array(userb.m_IsAlarm, userb.m_YXState, userb.m_AdviceMsg);
            if (c_s == "CommunicationOK" || c_s == "HaveAlarm") {
                if (userc[0] == "False") {
                    $("#m_alarmyx_" + i).html("<img src=\"/Image/alarm/CommunicationOK.png\">");
                }
                else {
                    $("#m_alarmyx_" + i).html("<img src=\"/Image/alarm/HaveAlarm.png\">");
                }
            }
            else {
                $("#m_alarmyx_" + i).html("<img src=\"/Image/alarm/" + c_s + ".png\">");
            }

            $("#valueyxp_" + i).html(userc[1]);
            $("#m_yxpMsg_" + i).html(userc[2]);
        }
    }
}

//获取设置表数据
function setTodata() {
    if (Control_Equip_List(confNum) || Control_SetItem_List(confNum, false)) {
        $("#tableSe tbody").html("");
        var _url = "/GWServices.asmx/RealTimeData";
        var _dataSet = "selectedEquipNo=" + confNum + "&&tableName=Set";
        JQajaxo("post", _url, false, _dataSet, _successfSet);
        function _successfSet(data) {
            var resultJs = $(data).children("string").text();
            if (resultJs != "false" && resultJs != "") {
                jsonTobtn(resultJs, confNum);
            }
            else {
                $("#tableSeLi").hide();
                $("#tableSeLi").attr("values", "0");
                $("#tableSeLi").removeClass("active");
                $("#tableSet").removeClass("active");
            }
        }
    }
    else {
        $("#tableSeLi").hide();
    }    
}

//创建设置表按钮
function jsonTobtn(data, confarr) {
    var usera = JSON.parse(data);
    $("#tableSeLi").show();
    $("#tableSeLi").attr("values", "1");
    if ($("#tableYcLi").attr("values") == "0" && $("#tableYxLi").attr("values") == "0") {
        $("#tableSeLi").addClass("active");
        $("#tableSet").addClass("active");
    }
    else {
        $("#tableSeLi").removeClass("active");
        $("#tableSet").removeClass("active");
    }
    for (var i = 0; i < usera.length; i++) {
        var userb = usera[i];
        var userc = new Array(userb.set_nm, userb.main_instruction, userb.minor_instruction, userb.value, userb.set_type);
        var set_nos1 = Control_Equip_List(confarr);
        var set_nos2 = Control_SetItem_List(confarr, userb.set_no);
        if (set_nos1 || set_nos2) {
            var newRow = "<tr><td><button class=\"btn btns-style-4\" onclick=\"onSetClickBtn(" + confarr + ",'" + userc[1] + "','" + userc[2] + "','" + userc[3] + "','" + userc[0] + "','" + userc[4] + "')\">" + userc[0] + "</button></td></tr>";
            $("#tableSe tbody:last").append(newRow);
        }
    }
}
//设置命令
function onSetClickBtn(str_1, str_2, str_3, str_4, btnName, str_5) {
    var newDiv = document.createElement("div");
    newDiv.className = "fullScreenPopup";
    newDiv.id = "fullScreenPopup_SetBtn";
    var newContainer = "<div class='fullScreenAll' onclick='onFullScreenAll(this)'></div><div class='fullScreenCenter bounceInDown animated mg-default' style='" + $("html").attr("style") + "'>";
    newContainer += "<div class='MessageBox_top'><span>提示</span><button class='MessageBox_top_Exit btns-style-6' onclick='onCencel(\"" + newDiv.id + "\")'><i class='iconfont icon-guanbi'></i></button></div>";
    newContainer += "<p class='MessageBox_p1'>操作命令：" + btnName + "</p>";
    if (str_5 == "V") {
        newContainer += "<p class='MessageBox_p2'><span>设置值：</span><input id='setValues' type='text' class='input' style='margin-top:6px;' value='" + str_4 + "' /></p>";
    }
    else {
        newContainer += "<p class='MessageBox_p2'>确定进行控制操作吗？</p>";
    }
    newContainer += "<p class='MessageBox_p3'><button class='btn btns-style-1' onclick='onSetCommand(\"" + str_1 + "\",\"" + str_2 + "\",\"" + str_3 + "\",\"" + str_4 + "\",\"" + newDiv.id + "\")'>确定</button><button  class='btn btns-style-1' onclick='onCencel(\"" + newDiv.id + "\")'>取消</button></p>";
    newContainer += "</div>";
    newDiv.innerHTML = newContainer;
    document.body.appendChild(newDiv);
}

//设置命令-确定
function onSetCommand(str_1, str_2, str_3, str_4, dt) {
    var vals = "";
    if (str_4 == "") {
        vals = $("#setValues").val();
    }
    else {
        vals = str_4;
    }
    var userName = window.localStorage.userName;
    if (userName == null || userName == "") {
        userName = window.sessionStorage.userName;
    }
    var _url = "/GWServices.asmx/SetUpdateS";
    var _dataSet = "set_nm=" + encodeURIComponent(str_1) + "&&main_instruction=" + encodeURIComponent(str_2) + "&&minor_instruction=" + encodeURIComponent(str_3) + "&&values=" + encodeURIComponent(vals) + "&&usern=" + encodeURIComponent(userName);
    JQajaxo("post", _url, false, _dataSet, _successfSet);
    function _successfSet(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "false") {
            $(".MessageBox_p2").html("设置成功！");
            $(".MessageBox_p3").hide();
            setTimeout(function () {
                onCencel(dt);
            }, 1000);
        }
    }
}

//动态数据
var dynamicCurve;
//实时曲线
function curveBox(number) {
    var newDiv = document.createElement("div");
    newDiv.className = "fullScreenPopup";
    newDiv.id = "fullScreenPopup_Dynamic";
    var newContainer = "<div class='fullScreenAll' onclick='onFullScreenAll(this)'></div><div class='fullScreenCenter bounceInDown animated mg-lg' style='top:10%;" + $("html").attr("style") + "'>";
    newContainer += "<div class='MessageBox_top'><span>实时曲线</span><button class='MessageBox_top_Exit btns-style-6' onclick='onCencel(\"" + newDiv.id + "\")'><i class='iconfont icon-guanbi'></i></button></div>";
    newContainer += "<div id='highcharts'></div>";
    newContainer += "</div>";
    newDiv.innerHTML = newContainer;
    document.body.appendChild(newDiv);
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
    $('#highcharts').highcharts({
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {
                    clearInterval(dynamicCurve);
                    // set up the updating of the chart each second
                    var series = this.series[0];
                    var yVals = 0;
                    if (dataQuXian[number][1] == '') {
                        yVals = 0;
                    }
                    else {
                        yVals = parseFloat(dataQuXian[number][0]);
                    }
                    var x = (new Date()).getTime(), // current time
                       // y = parseInt(10 * Math.random());//Math.random()*10;
                        y = yVals;
                    series.addPoint([x, y], true, true);
                    dynamicCurve = setInterval(function () {
                        var yVals = 0;
                        if (dataQuXian[number][1] == '') {
                            yVals = 0;
                        }
                        else {
                            yVals = parseFloat(dataQuXian[number][0]);
                        }
                        var x = (new Date()).getTime(), // current time
                           // y = parseInt(10 * Math.random());//Math.random()*10;
                            y = yVals;
                        series.addPoint([x, y], true, true);
                    }, 4000);
                }
            },
            backgroundColor: 'none'
        },
        title: {
            text: '' + dataQuXianName[number],
            style: {
                color: '#fff'
            }
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 140,
            style: {
                color: '#fff'
            },
            labels: {
                style: {
                    color: '#fff'
                }
            }
        },
        yAxis: {
            title: {
                text: '',
                style: {
                    color: '#fff'
                }
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }],
            labels: {
                style: {
                    color: '#fff'
                }
            }
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                Highcharts.numberFormat(this.y, 2);
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: '当前值：',
            data: (function () {
                var data = [],
                    time = (new Date()).getTime(),
                    i;
                for (i = curveDrop, j = 0; i <= 0; i++, j++) {
                    data.push({
                        x: time + i * 1000,
                        y: null
                        //y: parseInt(100 * Math.random())
                    });
                }
                return data;
            })()
        }]
    });
}