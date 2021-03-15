function getParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return r[2];
    return null;
}

function add0(m) {
    return m < 10 ? '0' + m : m;
}

function formatDate(time) {
    var now = new Date(parseInt(time));
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    return year + "-" + add0(month) + "-" + add0(date) + " " + add0(hour) + ":" + add0(minute);
}

function Post(_async, _data, _url, _callBackFunction) {
    var callBack = _callBackFunction;
    $.ajax({
        type: "post",
        url: _url,
        dataType: "json",
        data: _data,
        async: _async,
        success: function (data) {
            callBack(data);
        },
        error: function (e) {
            console.log(e);
        }
    });
}