/*
 *判断两个日期天数
 */
function daysElapsed(date1, date2) {
	var difference = Date.UTC(date1.getYear(), date1.getMonth(), date1
			.getDate(), 0, 0, 0)
			- Date.UTC(date2.getYear(), date2.getMonth(), date2.getDate(), 0,
					0, 0);
	return difference / 1000 / 60 / 60 / 24;
}
// 判断两天是否在一周 2016-10-25,[ 00:00:00]
// 返回结果： month | week | day
function isWeek(startStr, endStr) {
	var view = "month"
	startStr = startStr.replace(/-/g, '/');
	endStr = endStr.replace(/-/g, '/');
	var startDay = new Date(startStr);
	var endDay = new Date(endStr);
	var weekDay = startDay.getDay();
	var offset = 7 - weekDay;
	var ms = startDay.getTime() + offset * 24 * 60 * 60 * 1000;
	if (weekDay != 0 && endDay.getTime() <= ms) {
		view = "week";
	}
	if (startDay.getFullYear() == endDay.getFullYear()
			&& startDay.getMonth() == endDay.getMonth()
			&& startDay.getDate() == endDay.getDate()) {
		view = "day";
	}
	return view;
}
// 获取当周的第几天，周一到周日 data:Date类型 index：1-7
function getWeekDay(date, index) {
	return new Date(date.getTime() + (index - date.getDay()) * 24 * 60 * 60
			* 1000);
}

// 验证日期格式 2016-10-25
function validate(dateStr) {
	dateStr = dateStr.split(" ")[0];
	var reg = /((^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(10|12|0?[13578])([-\/\._])(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(11|0?[469])([-\/\._])(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(0?2)([-\/\._])(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([3579][26]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][13579][26])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][13579][26])([-\/\._])(0?2)([-\/\._])(29)$))/;
	if (!reg.test(dateStr)) {
		return false;
	}
	return true;
}
// 比较起始时间与结束时间的大小
// 字符串格式 2016-10-25,[ 12：00:00]
function compareDate(startStr, endStr) {
	startStr = startStr.replace(/-/g, "/");
	var startDate = new Date(startStr);
	endStr = endStr.replace(/-/g, "/");
	var endDate = new Date(endStr);
	return startDate.getTime() - endDate.getTime();
}
// 时间格式化
Date.prototype.format = function(format) {
	var o = {
		"M+" : this.getMonth() + 1, // month
		"d+" : this.getDate(), // day
		"h+" : this.getHours(), // hour
		"m+" : this.getMinutes(), // minute
		"s+" : this.getSeconds(), // second
		"q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
		"S" : this.getMilliseconds()
	// millisecond
	}
	if (/(y+)/.test(format))
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
	return format;
}

// 获取系统时间，将时间以指定格式显示到页面。
function systemTime() {
	// 获取系统时间。
	var dateTime = new Date();
	var year = dateTime.getFullYear();
	var month = dateTime.getMonth() + 1;
	var day = dateTime.getDate();
	var hh = dateTime.getHours();
	var mm = dateTime.getMinutes();
	var ss = dateTime.getSeconds();
	// 分秒时间是一位数字，在数字前补0。
	mm = extra(mm);
	ss = extra(ss);
	// 将时间显示到ID为time的位置，时间格式形如：2016-10-10 19:18:02
	$("#time").html(
			year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss);
	// 每隔1000ms执行方法systemTime()。
	setTimeout("systemTime()", 1000);
}
// 补位函数。
function extra(x) {
	// 如果传入数字小于10，数字前补一位0。
	if (x < 10) {
		return "0" + x;
	} else {
		return x;
	}
}