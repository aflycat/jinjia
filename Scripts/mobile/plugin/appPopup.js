//载入popup插件
function popupShow(data) {
    var config = {
        id: '',
        title: '',
        closeText: '关闭',
        rightContent: {
            id: '',
            href: '#',
            text: '',
            onClick: null
        },
        navbar: {//顶部导航
            id: '',
            show: true,
        },
        contents: {//主体
            id: '',
            show: true,
            content: '',
        },
        toolbar: {//底部导航
            id: '',
            show: true,
            content: '',
        },
        callBackOpen: null,//open 当 Popover 开始打开动画时，事件将被触发。
        callBackOpened: null,//opened 当 Popover 完成打开动画时，事件将被触发。
        callBackClose: null,//close 当 Popover 开始结束动画时，事件将被触发。
        callBackClosed: null,//closed 当 Popover 完成结束动画时，事件将被触发。
    }

    config.id = data.id || config.id;
    config.title = data.title || config.title;
    config.closeText = data.closeText || config.closeText;
    if (data.rightContent) {
        config.rightContent.id = data.rightContent.id || config.rightContent.id;
        config.rightContent.href = data.rightContent.href || config.rightContent.href;
        config.rightContent.text = data.rightContent.text || config.rightContent.text;
        config.rightContent.onClick = data.rightContent.onClick || config.rightContent.onClick;
    }

    if (data.navbar) {
        config.navbar.id = data.navbar.id || config.navbar.id;
        config.navbar.show = data.navbar.show || config.navbar.show;
    }
    if (data.contents) {
        config.contents.id = data.contents.id || config.contents.id;
        config.contents.show = data.contents.show || config.contents.show;
        config.contents.content = data.contents.content || config.contents.content;
    }
    if (data.toolbar) {
        config.toolbar.id = data.toolbar.id || config.toolbar.id;
        config.toolbar.show = data.toolbar.show || config.toolbar.show;
        config.toolbar.content = data.toolbar.content || config.toolbar.content;
    }

    config.callBackOpen = data.callBackOpen || config.callBackOpen;
    config.callBackOpened = data.callBackOpened || config.callBackOpened;
    config.callBackClose = data.callBackClose || config.callBackClose;
    config.callBackClosed = data.callBackClosed || config.callBackClosed;

    var showList = ['', '', ''];
    if (!config.navbar.show) {
        showList[0] = 'style="display:none"';
    }
    if (!config.contents.show) {
        showList[1] = 'style="display:none"';
    }
    if (!config.toolbar.show) {
        showList[2] = 'style="display:none"';
    }
    var popupHTML = $('<div class="popup pages navbar-through toolbar-through" id="' + config.id + '">' +
                        '<div class="page">'+
                            '<div class="navbar" id="' + config.navbar.id + '" ' + showList[0] + '>' +
                                '<div class="navbar-inner">' +
                                    '<div class="left">' +
                                        '<a href="#" class="close-popup">' + config.closeText + '</a>' +
                                    '</div>' +

                                    '<div class="center sliding">' + config.title + '</div>' +

                                    '<div class="right">' +
                                        '<a id="' + config.rightContent.id + '" href="' + config.rightContent.href + '" class="link icon-only">' + config.rightContent.text + '</a>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +

                            '<div class="page-content" id="' + config.contents.id + '" ' + showList[1] + '>' +
                                config.contents.content +
                            '</div>' +

                            '<div class="toolbar tabbar tabbar-labels" id="' + config.toolbar.id + '" ' + showList[2] + '>' +
                                config.toolbar.content +
                            '</div>' +
                        '</div>'+
                    '</div>');
    if (config.rightContent.onClick != null) {
        popupHTML.find('.right a').unbind();
        popupHTML.find('.right a').bind('click', config.rightContent.onClick);
    }
    
    if (config.callBackOpen != null) {
        popupHTML.on('open', function () { config.callBackOpen(); });
    }
    if (config.callBackOpened != null) {
        popupHTML.on('opened', function () { config.callBackOpened(); });
    }
    if (config.callBackClose != null) {
        popupHTML.on('close', function () { config.callBackClose(); });
    }
    if (config.callBackClosed != null) {
        popupHTML.on('closed', function () { config.callBackClosed(); });
    }
    
    myApp.popup(popupHTML);
    popupHTML = null;
}

//载入动态页面
function viewShow(data) {
    var config = {
        id: '',
        title: '',
        titleID: '',
        leftOnClick: null,
        rightContent: {
            id: '',
            href: '#',
            text: '',
            onClick: null
        },
        contents: {//主体
            id: '',
            content: '',
        },
        pageCallBack: null,//界面回调
    }

    config.id = data.id || config.id;
    config.title = data.title || config.title;
    config.titleID = data.titleID || config.titleID;
    config.leftOnClick = data.leftOnClick || config.leftOnClick;
    if (data.rightContent) {
        config.rightContent.id = data.rightContent.id || config.rightContent.id;
        config.rightContent.href = data.rightContent.href || config.rightContent.href;
        config.rightContent.text = data.rightContent.text || config.rightContent.text;
        config.rightContent.onClick = data.rightContent.onClick || config.rightContent.onClick;
    }
    
    if (data.contents) {
        config.contents.id = data.contents.id || config.contents.id;
        config.contents.content = data.contents.content || config.contents.content;
    }

    config.pageCallBack = data.pageCallBack || config.pageCallBack;

    var viewHTML = $('<div class="navbar">' +
                        '<div class="navbar-inner">' +
                            '<div class="left">' +
                                '<a href="#" class="back link"><i class="iconfont icon-back"></i></a>' +
                            '</div>' +

                            '<div class="center sliding" id="' + config.titleID + '">' + config.title + '</div>' +

                            '<div class="right">' +
                                '<a id="' + config.rightContent.id + '" href="' + config.rightContent.href + '" class="link icon-only">' + config.rightContent.text + '</a>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +

                    '<div class="page" id="' + config.id + '" data-page="' + config.id + '">' +
                        '<div class="page-content" id="' + config.contents.id + '">' +
                            config.contents.content +
                        '</div>'+
                    '</div>');
    if (config.leftOnClick != null) {
        viewHTML.find('.left a').unbind();
        viewHTML.find('.left a').bind('click', config.leftOnClick);
    }
    if (config.rightContent.onClick != null) {
        viewHTML.find('.right a').unbind();
        viewHTML.find('.right a').bind('click', config.rightContent.onClick);
    }

    mainView.router.loadContent(viewHTML);
    if (config.pageCallBack != null) {
        var s = myApp.onPageBeforeInit(config.id, config.pageCallBack);
        s.trigger();
        s.remove();
    }
    viewHTML = null;
}

//载入底部输入框插件
function bottomText(data) {
    var config = {
        id: '',//根节点ID
        textID: '',//输入框ID
        originalID:'',//原始输入框ID
        placeholder: '请输入内容',
        rightBtn: {//确定按钮
            id: '',
            href: '#',
            text: '确定',
            onClick: null
        },
        value: '',
        callBack: null,//回调
    }

    config.id = data.id || config.id;
    config.textID = data.textID || config.textID;
    config.originalID = data.originalID || config.originalID;
    config.placeholder = data.placeholder || config.placeholder;
    if (data.rightBtn) {
        config.rightBtn.id = data.rightBtn.id || config.rightBtn.id;
        config.rightBtn.href = data.rightBtn.href || config.rightBtn.href;
        config.rightBtn.text = data.rightBtn.text || config.rightBtn.text;
        config.rightBtn.onClick = data.rightBtn.onClick || config.rightBtn.onClick;
    }

    config.value = data.value || config.value;
    config.callBack = data.callBack || config.callBack;

    var btnHTML = $('<div class="toolbar" id="' + config.id + '" style="background:#fff;">' +
                    '<div class="messagebar" style="height:44px;">' +
                        '<div class="toolbar-inner">' +
                            '<textarea id="' + config.textID + '" placeholder="' + config.placeholder + '"></textarea>' +
                            '<a id="' + config.rightBtn.id + '" href="' + config.rightBtn.href + '" class="link icon-only">' + config.rightBtn.text + '</a>' +
                        '</div>' +
                    '</div>' +
                '</div>');
    
    btnHTML.find('a').unbind();
    btnHTML.find('a').bind('click', function () {
        var text = $(this).prev().val();
        if (config.rightBtn.onClick != null) {
            config.rightBtn.onClick(text);
        }
        if (Object.prototype.toString.call(config.originalID) == '[object String]') {
            $('#' + config.originalID).val(text);
        }
        else {
            $(config.originalID).val(text);
        }
    });

    $('.tabbar').after(btnHTML);
    $('.tabbar').slideToggle(function () {
        $(btnHTML).find('textarea').val(config.value);
        $(btnHTML).find('textarea').focus();
        $(btnHTML).find('textarea').bind('blur', function () {
            var thisText = $(this);
            $('.tabbar').slideToggle(function () {
                thisText.parent().parent().parent().remove();
            });
        });
        btnHTML = null;
        if (config.callBack != null) {
            config.callBack();
        }
    });
}

//tab页插件
function tabAndTable(data) {
    var config = {
        formID: '',
        id: '',//根节点ID
        tabList: [],//tab列表[{id:'',href:'',name:'',tableID:'',tableThead:[],onRefresh:function}]
        initRefresh: false,//刷新控件是否初始化
        callBack: null,//回调
    }

    config.formID = data.formID || config.formID;
    config.id = data.id || config.id;
    config.tabList = data.tabList || config.tabList;
    config.initRefresh = data.initRefresh || config.initRefresh;
    config.callBack = data.callBack || config.callBack;

    var btnRow = '';
    var tabsRow = '';
    for (var i = 0; i < config.tabList.length; i++) {
        var activeClass = '';
        if (i == 0) {
            activeClass = 'active';
        }
        btnRow += '<a id="' + config.tabList[i].id + '" href="#' + config.tabList[i].href + '" class="tab-link ' + activeClass + ' button">' + config.tabList[i].name + '</a>';
        var th = '';
        if (config.tabList[i].tableThead.length == 1) {
            th += '<th style="text-align:center;">' + config.tabList[i].tableThead[0] + '</th>';
        }
        else {
            for (var j = 0; j < config.tabList[i].tableThead.length; j++) {
                th += '<th>' + config.tabList[i].tableThead[j] + '</th>';
            }
        }
        
        tabsRow += ' <div id="' + config.tabList[i].href + '" class="tab ' + activeClass + ' pull-to-refresh-content" style="overflow:auto;position:relative;" data-ptr-distance="55">' +
                        '<div class="pull-to-refresh-layer">' +
                            '<div class="preloader"></div>' +
                            '<div class="pull-to-refresh-arrow"></div>' +
                        '</div>' +

                        '<div class="tableAuto tableAuto2">' +
                            '<table id="' + config.tabList[i].tableID + '">' +
                                '<thead>' +
                                    '<tr>' +
                                        th +
                                    '</tr>' +
                                '</thead>' +
                                '<tbody></tbody>' +
                            '</table>' +
                        '</div>' +
                    '</div>';
    }
    var contentHTML = $('<div class="tabs-animated-wrap" id="' + config.id + '">' +
                    '<div class="buttons-row tabBtn">' +
                        btnRow +
                    '</div>' +

                    '<div class="tabs">' +
                        tabsRow +
                    '</div>' +
                '</div>');
    document.getElementById(config.formID).innerHTML = "";
    $('#' + config.formID).append(contentHTML).ready(function () {
        for (var i = 0; i < config.tabList.length; i++) {
            if (config.tabList[i].onRefresh != null) {
                if (config.initRefresh) {
                    myApp.initPullToRefresh($('#' + config.tabList[i].href));
                }
                $$('#' + config.tabList[i].href).on("refresh", config.tabList[i].onRefresh);
            }
        }
        if (config.callBack != null) {
            config.callBack();
        }
    });
    contentHTML = null;
}

//资产信息和维护
function maintainZiChan(data) {
    var config = {
        formID: '',
        id: '',//根节点ID
        titleID: '',
        contentInfor: {
            id: '',
            title: '资产信息',
            imgID: '',
            list: [],//{name:'',text:''}
            btnText: '我要维护',
            btnClick: null,
        },
        contentApply: {
            id: '',
            title: '维护申请',
            textareaID: '',
            btnText: '提交',
            btnTextCan: '取消',
            btnClick: null,
        },
        callBack: null,//回调
    }

    config.formID = data.formID || config.formID;
    config.id = data.id || config.id;
    config.titleID = data.titleID || config.titleID;
    if (data.contentInfor) {
        config.contentInfor.id = data.contentInfor.id || config.contentInfor.id;
        config.contentInfor.title = data.contentInfor.title || config.contentInfor.title;
        config.contentInfor.imgID = data.contentInfor.imgID || config.contentInfor.imgID;
        config.contentInfor.list = data.contentInfor.list || config.contentInfor.list;
        config.contentInfor.btnText = data.contentInfor.btnText || config.contentInfor.btnText;
        config.contentInfor.btnClick = data.contentInfor.btnClick || config.contentInfor.btnClick;
    }
    
    if (data.contentApply) {
        config.contentApply.id = data.contentApply.id || config.contentApply.id;
        config.contentApply.title = data.contentApply.title || config.contentApply.title;
        config.contentApply.textareaID = data.contentApply.textareaID || config.contentApply.textareaID;
        config.contentApply.btnText = data.contentApply.btnText || config.contentApply.btnText;
        config.contentApply.btnTextCan = data.contentApply.btnTextCan || config.contentApply.btnTextCan;
        config.contentApply.btnClick = data.contentApply.btnClick || config.contentApply.btnClick;
    }
    config.callBack = data.callBack || config.callBack;

    var newRow = '';
    for (var i = 0; i < config.contentInfor.list.length; i++) {
        newRow += '<li>' +
            '<div class="item-content">' +
                '<div class="item-media mgList_left">' + config.contentInfor.list[i].name + '</div>' +
                '<div class="item-inner">' +
                    '<div class="item-title">' + config.contentInfor.list[i].text + '</div>' +
                '</div>' +
            '</div>' +
            '</li>';
    }

    var contentHTML = $('<div class="list-block" id="' + config.id + '" style="overflow:auto;height:100%;">' +
                    '<div id="' + config.contentInfor.id + '">' +
                        '<img id="' + config.contentInfor.imgID + '" class="zicanImg"/>' +
                        '<ul>' +
                            newRow +
                        '</ul>' +
                        '<a href="#" class="button button-big button-fill zicanBtn" titleID="' + config.titleID + '" titleto="' + config.contentApply.title + '">' + config.contentInfor.btnText + '</a>' +
                    '</div>' +

                    '<div id="' + config.contentApply.id + '" style="display:none">' +
                        '<p class="words addimg">请输入维护内容：</p>' +
                        '<p class="mgSection">'+
                            '<textarea id="' + config.contentApply.textareaID + '" style="background:#fff;"></textarea>' +
                        '</p>' +
                        '<p class="words addimg"></p>' +
                        '<div class="addimgDiv">' +
                            '<div class="addimgList">' +
                                '<div class="addimgListItme">' +
                                    '<input id="fileIpt" type="file" accept="image/*" capture="camera">' +
                                    '<i class="iconfont icon-addimg"></i>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<p class="row">' +
                            '<a href="#" class="button button-big button-fill zicanBtn col-50" titleID="' + config.titleID + '" titleto="' + config.contentInfor.title + '">' + config.contentApply.btnText + '</a>' +
                            '<a href="#" class="button button-big zicanBtn color-red col-50" titleID="' + config.titleID + '" titleto="' + config.contentInfor.title + '" cancel="cancel">' + config.contentApply.btnTextCan + '</a>' +
                        '</p>' +
                    '</div>' +
                '</div>');
    document.getElementById(config.formID).innerHTML = "";
    $("#" + config.titleID).html(config.contentInfor.title);
    $('#' + config.formID).append(contentHTML).ready(function () {
        document.getElementById('fileIpt').addEventListener('change', fileiptChanges, false);
        if (config.contentInfor.btnClick != null) {
            $('#' + config.contentInfor.id).find('a').unbind();
            $('#' + config.contentInfor.id).find('a').bind('click', config.contentInfor.btnClick);
        }
        if (config.contentApply.btnClick != null) {
            $('#' + config.contentApply.id).find('a').unbind();
            $('#' + config.contentApply.id).find('a').bind('click', config.contentApply.btnClick);
        }
        if (config.callBack != null) {
            config.callBack();
        }
    });

    //拍照选择照片
    function fileiptChanges(index) {
        var thisElem = $(index.srcElement).parent();
        var reader = new FileReader();
        reader.onload = function (e) {
            var newRowDiv = $("<div class='addimgListItme'></div>");
            var newRow = $("<img/>");
            newRow.attr("src", e.target.result);
            newRowDiv.append(newRow);
            newRow = null;
            thisElem.parent().append(newRowDiv);
            newRowDiv = null;
            var parent = thisElem.parent();
            thisElem.remove();
            if (parent.find("div").length < 4) {
                parent.append(thisElem);
            }
            else {
                $(thisElem).css('display', 'none');
                parent.append(thisElem);
            }
            parent = null;
            thisElem = null;
        };
        try{
            reader.readAsDataURL(this.files[0]);
        }
        catch (e) {
            reader = null;
        }
    }
    contentHTML = null;
}