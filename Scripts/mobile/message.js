//存储事件
var evtName = new Array();
var tableGWSnapshotConfig = new Array();

var userAdmin = new Array();
var count_errors = 0;

function message() {
    // 主页面下拉刷新
    $$('#message_pg_content').on("refresh", refreshpg);

    loadMessage();
    toolbarActive('MessageTool');
}

function refreshpg(e){
    setTimeout(function () {
        initEnsureChonglian(function () {
            loadMessage();
        });
            
            
        // 加载完毕需要重置
        myApp.pullToRefreshDone(e);
    }, 2000);
}

function loadMessage() {
    onSnapshotConfig(function () {
        SysEvtCounts();
    });
    atorData();
}

$$(document).on("pageBeforeInit", ".page[data-page='MessageList']", function (e) {
    var pages = e.detail.page.url.split('?')[1];
    onSnapshot(pages);

    $$('#MessageList_ref').on("refresh", refreshMList);
});

function refreshMList(e) {
    setTimeout(function () {
        initEnsureChonglian(function () {
            SnapshotData();
        });
        // 加载完毕需要重置
        myApp.pullToRefreshDone(e);
    }, 2000);
}

//GWSnapshotConfig(报警配置表)
function onSnapshotConfig(fun) {
    var _urlSnapshot = "/GWServices.asmx/GainAlarmTab";
    var _dataSnapshot = "TableName=GWSnapshotConfig";
    function _scuSnapshot(data) {
        var resultJs = $$(data).children("string").text();
        if (resultJs != "false") {
            jsonToSnapshot(resultJs);
            if (fun != null) {
                fun();
            }
        }
    }
    JQajaxo("post", _urlSnapshot, true, _dataSnapshot, _scuSnapshot);
}
//报警配置表
function jsonToSnapshot(data) {
    tableGWSnapshotConfig = new Array();
    var usera = JSON.parse(data);
    for (var i = 0; i < usera.length; i++) {
        var userb = usera[i];
        var userc = new Array(userb.ID, userb.SnapshotName, userb.SnapshotLevelMin, userb.SnapshotLevelMax, userb.MaxCount, userb.IsShow, userb.IconRes);
        tableGWSnapshotConfig[i] = userc;
        if (tableGWSnapshotConfig[i][5] == "0") {
            $("#bgSnapshot_" + (i + 1)).parent().parent().parent().parent().css("display", "none");
        }
        else {
            var SnapshotLevels = "";
            for (var j = userb.SnapshotLevelMin; j <= userb.SnapshotLevelMax; j++) {
                SnapshotLevels += j + ",";
            }
            SnapshotLevels = SnapshotLevels.substring(0, SnapshotLevels.length - 1);
            $("#bgSnapshot_" + (i + 1)).attr("values", SnapshotLevels);
        }
    }
}
//实时数量
function SysEvtCounts() {
    if ($$(".view-main").attr("data-page") != "message") {
        clearInterval(SysEvtCountsSet);
    }
    else {
        var _url = "/GWServices.asmx/SysEvtCount";
        var dataCounts = new Array();
        var _data = "SnapshotStr=" + $("#bgSnapshot_1").attr("values") + ";" + $("#bgSnapshot_2").attr("values") + ";" + $("#bgSnapshot_3").attr("values") + ";" + $("#bgSnapshot_4").attr("values") + ";" + $("#bgSnapshot_5").attr("values");
        function _successf(data) {
            count_errors = 0;
            var resultJs = $(data).children("string").text();
            if (resultJs != "false") {
                dataCounts = resultJs.split(',');
                for (var i = 0; i < dataCounts.length; i++) {
                    $('#bgSnapshot_' + (i + 1)).html(dataCounts[i]);
                }
            }
        }

        function _errors(qXHR, textStatus, errorThrown) {
            count_errors++;
        }
        ajaxService("post", _url, true, _data, _successf, _errors);
    }
}

//短信号码名单
function atorData() {
    userAdmin = new Array();
    var _url = "/GWServices.asmx/GainAlarmTab";
    var _data = "tableName=Administrator";
    function _success_1(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs == "]") { return; }
        var usera = JSON.parse(resultJs);
        for (var i = 0; i < usera.length; i++) {
            var userb = usera[i];
            var userc = new Array(userb.Administrator, userb.MobileTel);
            userAdmin[i] = userc;
        }
    }
    JQajaxo("post", _url, true, _data, _success_1);
}

//选择消息类型}
function onSnapshot(dt) {
    $("#popup_titles").html($("#MessageList_" + dt).find("div.item-title").text());
    $("#popup_titles").attr("valuesNum", $("#MessageList_" + dt).find("div.item-after").find("span").attr("values"));
    SnapshotData();
}

//获取数据
function SnapshotData() {
    $('#inforList').html("");
    var valuesNum = $("#popup_titles").attr("valuesNum");
    var _url = "/GWServices.asmx/SysEvt";
    var _data = "typeStr=" + valuesNum;
    function _successf(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "false" && resultJs != "]") {
            jsonToTable(resultJs);
        }
    }
    JQajaxo("post", _url, true, _data, _successf);
}
//将json数据转换为table表格
function jsonToTable(resultJs) {
    evtName = new Array();
    var usera = JSON.parse(resultJs);
    for (var i = 0; i < usera.length; i++) {
        var userb = usera[i];
        var qr = "";
        if (userb.确认 == "False") {
            qr = "<a href='#' class=\"button button-big button-fill color-green\" onclick='onOkMessage(this)' values='" + i + "' title=\"" + userb.事件 + "\">请确认</a>";
        }
        else {
            qr = "<div style='text-align:center;'><i class=\"iconfont icon-queren\"></i> 已确认</div>";
        }
        var lxs = userb.类型;
        var lx = lxs;
        var userc = new Array(userb.时间, userb.事件, userb.处理意见, lx, qr);
        evtName[i] = userc;
        appendRow();
    }

    function appendRow() {
        var newRow = $("<li class=\"accordion-item\"></li>");
        var newRowa = $("<a href='#' class='item-link item-content'></a>");
        var timers = userc[0].split(' ');
        if (datetimefun() == timers[0]) {
            newRowa.append("<div class='item-media mgList_left'><span>今天</span><br/><span>" + timers[1] + "</span></div>");
        }
        else {
            newRowa.append("<div class='item-media mgList_left'>" + timers[0] + "<br/>" + timers[1] + "</div>");
        }

        var newRowItem = $("<div class='item-inner'></div>");
        newRowItem.append("<div class='item-title'>" + userc[1] + "</div>");
        
        var qrs = $("<div></div>");
        qrs.append(evtName[i][4]);
        if (qrs.find('i').length) {
            newRowItem.append("<div class='item-after'><i class=\"iconfont icon-queren\"></i></div>");
        }
        newRowa.append(newRowItem);
        newRow.append(newRowa);

        var detailedRow = "<div class=\"accordion-item-content\"><div class=\"content-block\">";
        detailedRow += "<p>时间：" + userc[0] + "</p>";
        detailedRow += "<p>事件：" + userc[1] + "</p>";
        detailedRow += "<p>处理意见：" + userc[2] + "</p>";
        detailedRow += "<p>" + userc[4] + "</p>";
        detailedRow += "</div></div>";
        newRow.append(detailedRow);
        $("#inforList:last").append(newRow);
    }
}

//当前时间
function datetimefun() {
    var localeData = new Date();
    var getMonthVar = localeData.getMonth() + 1;
    var getDateVar = localeData.getDate();
    var NowDateTimeVar = localeData.getFullYear() + "/" + getMonthVar + "/" + getDateVar;
    return NowDateTimeVar;
}

//选择是否发送短信
function onProcsCheckBox() {
    if (!document.getElementById('isProcsInput').checked) {
        if (!$("#procsContent ul").find("li").length) {
            var newRow = $('<ul></ul>');
            for (var i = 0; i < userAdmin.length; i++) {
                var lables = "<li><label class=\"label-checkbox item-content\">";
                lables += "<input id='procsContent_" + i + "' type=\"checkbox\" name=\"ks-checkbox\" value=\"Books\">";
                lables += "<div class=\"item-media\"><i class=\"icon icon-form-checkbox\"></i></div>";
                lables += "<div class=\"item-inner\">";
                lables += "<span class=\"item-title\">" + userAdmin[i][1] + "(" + userAdmin[i][0] + ")</span></div></label></li>";
                newRow.append(lables);
            }
            $("#procsContent").html(newRow);
        }
    }
    $("#procsContent").toggle();
}
//短信名单列表事件
function procs_clickList() {
    if ($(this).find("i").hasClass("icon-fxuanze-none")) {
        $(this).find("i").removeClass("icon-fxuanze-none");
        $(this).find("i").addClass("icon-fyixuanze-block");
    }
    else {
        $(this).find("i").removeClass("icon-fyixuanze-block");
        $(this).find("i").addClass("icon-fxuanze-none");
    }
}

//请确认事件
function onOkMessage(dt) {
    var isProcs = "发送短信&nbsp;&nbsp;<label class=\"label-switch\" onclick='onProcsCheckBox()'><input id='isProcsInput' type=\"checkbox\" name=\"switch\" value=\"yes\"><div class=\"checkbox\"></div></label>";
    var buttons = [
        {
            text: "<div class='modalTitles'>" + $(dt).attr("title") + "</div>",
            label: true
        },
        {
            text: "<p class='mgSection'>请输入处理意见(100字以内)：</p>",
            label: true
        },
        {
            text: "<p class='mgSection'><textarea id=\"actualText\" values='" + $(dt).attr("values") + "'></textarea></p>",
            label: true
        },
        {
            text: "<div class='mgSection'><div style='margin-bottom:6px;'>" + isProcs + "</div><div id='procsContent' class='procsContent list-block' style='display:none;'></div></div>",
            label: true
        },
        {
            text: "确定",
            bold: true,
            onClick: onProcsOK
        },
        {
            text: "取消",
            bold: true,
            color: 'red',
        },
    ];
    myApp.actions(buttons);
    if (window.localStorage.terminal.split('.')[1] == "App") {
        $("#actualText").bind('focus', onFocusText);
        //$("#actualText").bind('blur', onBlurText);
    }
}

//确定
function onProcsOK() {
    var textMessage = $("#actualText").val();
    var isProcs = "false";
    var telStrs = "";
    if (document.getElementById("isProcsInput").checked) {
        isProcs = "true";
        $("#procsContent ul li").each(function (i) {
            if (document.getElementById("procsContent_" + i).checked) {
                var liStr = $(this).find("span").text().split('(')[0];
                telStrs += liStr + ",";
            }
        })
        telStrs = telStrs.substring(0, telStrs.length - 1);
    }
    var userNam = "";
    if (window.localStorage.userName != "" && window.localStorage.userName != null) {
        userNam = window.localStorage.userName;
    }
    else {
        userNam = window.sessionStorage.userName;
    }
    var numbs = parseInt($("#actualText").attr('values'));
    var _url = "/GWServices.asmx/AsysOKs";
    var _data = "procMsg=" + textMessage + "&&isMsg=" + isProcs + "&&telStr=" + telStrs + "&&procName=" + evtName[numbs][1] + "&&procTime=" + evtName[numbs][0] + "&&nameStr=" + userNam;
    function _successf(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs = "true") {
            SnapshotData();
        }
    }
    function _errors() {
        SnapshotData();
    }
    ajaxService("post", _url, true, _data, _successf, _errors);
    
    myApp.closeModal('.picker-info');
}

//App应用避免遮住输入框
function onFocusText() {
    $(".actions-modal").addClass("mgb-footer-top");
}
function onBlurText() {
    $(".actions-modal").removeClass("mgb-footer-top");
}