
function UserInfor() {
    $("#userInfors").html("我（" + window.localStorage.userName + "）");
    $.ajax({
        type: "post",
        url: "/GWServices.asmx/CreateRichScan",
        data: "userName=" + window.localStorage.userName,
        success: function (dt) {
            var str = $(dt).children("string").text();
            if (str != "false") {
                $("#userRichScan").attr("src", "data:image/jpeg;base64," + str);
            }
        }
    });
}