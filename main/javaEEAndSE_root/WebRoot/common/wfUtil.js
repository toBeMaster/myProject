/**
 * 数组是否包含一个元素
 * @param element
 * @returns {Boolean}
 */
Array.prototype.contains = function (element) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == element) {
            return true;
        }
    }
    return false;
}
/**
 * resize多次调用
 */
function addResizeEvent(func){
	var oldOnresize = window.onresize;
	if(typeof window.onresize!="function"){
		window.onresize = func;
	}else{
		window.onresize = function(){
			oldOnresize();
			func();
		}
	}
}
/**
 * 生成uuid
 */
Math.uuid=function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
 
    var uuid = s.join("");
    return uuid;
}
/** 
 * @description 事件绑定，兼容各浏览器 
 * @param target 事件触发对象 
 * @param type 事件 
 * @param func 事件处理函数 
 */
function addEvents(target, type, func) {
	if (target.addEventListener) //非ie 和ie9 
		target.addEventListener(type, func, false);
	else if (target.attachEvent) //ie6到ie8 
		target.attachEvent("on" + type, func);
	else
		target["on" + type] = func; //ie5 
};
/** 
* @description 事件移除，兼容各浏览器 
* @param target 事件触发对象 
* @param type 事件 
* @param func 事件处理函数 
*/ 
function removeEvents(target, type, func){ 
	if (target.removeEventListener) 
	target.removeEventListener(type, func, false); 
	else if (target.detachEvent) 
	target.detachEvent("on" + type, func); 
	else target["on" + type] = null; 
};
/**
 * 包含特殊字符
 * @param s
 * @returns
 */
function containSpecial( s )      
{      
    var containSpecial = RegExp(/[(\ )(\~)(\!)(\@)(\#)  (\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/);      
    return ( containSpecial.test(s) );      
} 
/**
 * 判断浏览器类型
 * @returns {String}
 */
function myBrowser(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    console.log("userAgent:",userAgent);
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
   if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
   if (userAgent.indexOf("Chrome") > -1){
	   return "Chrome";
   }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
   if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";//ie10及以下
    } //判断是否IE浏览器
   if(userAgent.indexOf("rv:11.0")>-1){
	    return "IE";
   }
}
/**
 * 检测是否为ie 或者ie版本
 * @param ver
 * @returns {Boolean}
 */
function isIE(ver){
   var b = document.createElement('b')
   b.innerHTML = '<!--[if IE ' + ver + ']>1<![endif]-->'
   return b.innerHTML === 1
}
/**
 * 另一种ie检测方法 
 * 根据ie属性检测，顺序不能变，因为往下的条件是支持上一层的条件的
 */
var ie = (function (){
	//"!win.ActiveXObject" is evaluated to true in IE11
	if (win.ActiveXObject === undefined) return null;
	if (!win.XMLHttpRequest) return 6;
	if (!doc.querySelector) return 7;
	if (!doc.addEventListener) return 8;
	if (!win.atob) return 9;
	//"!doc.body.dataset" is faster but the body is null when the DOM is not
	//ready. Anyway, an input tag needs to be created to check if IE is being
	//emulated
	if (!input.dataset) return 10;
	return 11;
})();
/**
 * easyui show的封装
 * @param obj
 */
function easyuiShow(obj){
	if( !obj.title){
		obj.title="提示信息";
	}
	if( !obj.timeout){
		obj.timeout=3000;
	}
	if( !obj.showType){
		obj.showType="slide";
	}
	$.messager.show({
	    title : obj.title,
		msg : obj.msg,
		timeout : obj.timeout,
		showType : obj.showType,
        style:{
            right:'',
            top:document.body.scrollTop+document.documentElement.scrollTop,
            bottom:''
        }
	});
}