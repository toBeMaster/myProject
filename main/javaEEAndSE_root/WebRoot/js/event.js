// 添加事件
var mouse = {};
var EventUtil = {
	addHandler : function(elem, type, handler) {
		if (elem.addEventListener) {
			elem.addEventListener(type, handler, false);
		} else if (elem.attachEvent) {
			elem.attachEvent("on" + type, handler);
		} else {
			elem["on" + type] = handler;
		}
	},
	removeHandler : function(elem, type, handler) {
		if (elem.removeEventListener) {
			elem.removeEventListener(type, handler, false);
		} else if (elem.detachEvent) {
			elem.detachEvent("on" + type, handler);
		} else {
			elem["on" + type] = null;
		}
	},
	getEvent : function(event) {
		return event ? event : window.event;
	},
	getTarget : function(event) {
		return event.target || event.srcElement;
	},
	preventDefault : function(event) {
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},
	stopPropagation : function(event) {
		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	}

};

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
}