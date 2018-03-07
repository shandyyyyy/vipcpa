export const formatDate = (e, separator) => {
    switch (typeof e) {
        case "string":
            e = new Date(parseInt(e));
            break;
        case "number":
            e = new Date(e);
    }
    var t = new RegExp(/^(\d{1})$/),
        a = (e.getMonth() + 1 + "").replace(t, "0$1"),
        n = (e.getDate() + "").replace(t, "0$1");

    function Format() {
        var o = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
            "H+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S": this.getMilliseconds()
        };
        var week = {
            "0": "\u65e5",
            "1": "\u4e00",
            "2": "\u4e8c",
            "3": "\u4e09",
            "4": "\u56db",
            "5": "\u4e94",
            "6": "\u516d"
        };
        if (/(y+)/.test(separator)) {
            separator = separator.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(separator)) {
            separator = separator.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(separator)) {
                separator = separator.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return separator;
    }

    return {
        year: e.getFullYear(),
        month: a,
        date: n,
        //format: this.year + separator + this.month + separator + this.date
        format: Format.call(e, separator)
    }
}

export const getQueryString = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};

export const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	// return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
	return  [hour, minute, second].map(formatNumber).join(':')
};

export const formatYMDTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
	// return [hour, minute].map(formatNumber).join(':')
};

export const formatMinuteTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	// return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
	return [hour, minute].map(formatNumber).join(':')
};
export const formatAutoTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	if (hour === 0) {
		return "第" + minute + "分钟" + second + "秒提出问题";
	} else if (minute === 0) {
		return "第" + second + "秒提出问题";
	} else {
		return "第" + hour + "小时" + minute + "分钟" + second + "秒提出问题";
	}
};
const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
};
