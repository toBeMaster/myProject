// 自定义easyui的提示格式
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
/**
 * 根据parentField 从数组里面构造easyui 的tree
 */
$.fn.tree.defaults.loadFilter = function(data, parent) {
	var opt = $(this).data().tree.options;
	var idFiled, textFiled, parentField;
	if (opt.parentField) {
		idFiled = opt.idFiled || 'id';
		textFiled = opt.textFiled || 'text';
		parentField = opt.parentField;
		var i, l, treeData = [], tmpMap = [];
		for (i = 0, l = data.length; i < l; i++) {
			tmpMap[data[i][idFiled]] = data[i];
		}
		for (i = 0, l = data.length; i < l; i++) {
			if (tmpMap[data[i][parentField]] && data[i][idFiled] != data[i][parentField]) {
				if (!tmpMap[data[i][parentField]]['children'])
					tmpMap[data[i][parentField]]['children'] = [];
				data[i]['text'] = data[i][textFiled];
				tmpMap[data[i][parentField]]['children'].push(data[i]);
			} else {
				data[i]['text'] = data[i][textFiled];
				treeData.push(data[i]);
			}
		}
		return treeData;
	}
	return data;
};

/**
 * 防止panel/window/dialog组件超出浏览器边界
 * @param left
 * @param top
 */
var easyuiPanelOnMove = function(left, top) {
	var l = left;
	var t = top;
	if (l < 1) {
		l = 1;
	}
	if (t < 1) {
		t = 1;
	}
	var width = parseInt($(this).parent().css('width')) + 14;
	var height = parseInt($(this).parent().css('height')) + 14;
	var right = l + width;
	var buttom = t + height;
	var browserWidth = $(window).width();
	var browserHeight = $(window).height();
	if (right > browserWidth) {
		l = browserWidth - width;
	}
	if (buttom > browserHeight) {
		t = browserHeight - height;
	}
	$(this).parent().css({/* 修正面板位置 */
		left : l,
		top : t
	});
};
$.fn.dialog.defaults.onMove = easyuiPanelOnMove;
$.fn.window.defaults.onMove = easyuiPanelOnMove;
$.fn.panel.defaults.onMove = easyuiPanelOnMove;
/**
 * 扩展validatebox，添加验证两次密码功能
 */
$.extend($.fn.validatebox.defaults.rules, {
	eqPwd : {
		validator : function(value, param) {
			return value == $(param[0]).val();
		},
		message : '密码不一致！'
	}
});

/**
 * 将form表单元素的值序列化成对象
 * 
 * @returns object
 */
serializeObject = function(form) {
	var o = {};
	$.each(form.serializeArray(), function(index) {
		if (o[this['name']]) {
			o[this['name']] = o[this['name']] + "," + this['value'];
		} else {
			o[this['name']] = this['value'];
		}
	});
	return o;
};

/**
 * 获取行数据，并且重置行索引
 * @param id
 * @param dgId
 * @returns {___anonymous662_662}
 */
function getRow(id, dgId) {
	dgId = dgId || "datagrid";
	var o = null;
	var data = $("#" + dgId).datagrid("getData");
	if (data && data.rows.length > 0) {
		for (var i = 0; i < data.rows.length; i++) {
			var obj = data.rows[i];
			if (obj.id == id) {
				o = obj;
				o.rowIndex = i;
				break;
			}
		}
	}
	return o;
}
/**
 * 双表联动 实现左右移动 要求字段一致
 * author: wf
 * @ methodName moveTo
 * 
 * @param direct
 *            方向
 * @param fromId
 *            移除dg 的id
 * @param toId
 *            移入dg 的id
 */
function moveTo(direct, fromId, toId) {
	var datagridFrom = fromId;
	var datagridTo = toId;
	if (direct != "right" && direct == "left") {
		var temp = datagridFrom;
		datagridFrom = datagridTo;
		datagridTo = temp;
	}
	var nodes = $("#" + datagridFrom).datagrid("getSelections");
	if (nodes != null && nodes.length > 0) {
		var ids = "";
		for (var i = 0; i < nodes.length; i++) {
			$("#" + datagridTo).datagrid("appendRow", nodes[i]);
			ids += nodes[i].id + ",";
		}
		var list = ids.split(",");
		for (var i = 0; i < list.length; i++) {
			var index = getIndex(list[i], datagridFrom);
			$("#" + datagridFrom).datagrid("deleteRow", index);
		}
	}
}