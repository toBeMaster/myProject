//数组去重
Array.prototype.distinct = function (fn){
	 if(typeof fn !="function") throw "比较函数异常";
	 var arr = this, i,j, len = arr.length;
	 for(i = 0; i < len; i++){
	  for(j = i + 1; j < len; j++){
	   if(fn(arr[i],arr[j])==0){
	    arr.splice(j,1);
	    len--;
	    j--;
	   }
	  }
	 }
	 return arr;
	};
		
function isNullForm(value){
	var flag = false;
	if(!value||value.trim()==""){
		flag = true;
	}
	return flag;
};
/**
 * =================================================================================
 * polygon 相关的操作放在这里
 */
// 保存区域配置
function savePolygonCfg() {
	var polygonList = LLM.params.polygonList;
	var map = LLM.map;
	var polygonNow = LLM.params.currentTarget;
	var name = $("#polygon_cfg_name").textbox("getValue");
	var lng = $("#polygon_cfg_width").numberbox("getValue");
	var lat = $("#polygon_cfg_height").numberbox("getValue");

	if(isNullForm(name) || isNullForm(lng) || isNullForm(lat) || isNullForm(polygonNow.options.data.imageUrl)){
		easyuiShow({
			msg:"请填写完整表单"
		});
		return;
	}
	polygonNow.options.data.name = name;
	polygonNow.options.data.container = LLM.options.id;
	if (lat != null && lat != "" && lng != null && lng != "") {
		polygonNow.options.data.bounds = [ {
			lat : 0,
			lng : 0
		}, {
			lat : lat,
			lng : lng
		} ];
	}

	var jsonData = JSON.stringify(polygonNow.options.data);
	$.ajax({
		url : '/emap/leaflet/polygon/update',
		type : "post",
		contentType : "application/json",
		data : jsonData,
		dataType : "json",
		success : function(res) {
			console.log("res:", res);
			if (res && res.ret) {
				closePolygonCfg();
				refreshMapTree();
				easyuiShow({
					msg : "编辑成功"
				});
			} else {
				easyuiShow({
					msg : "编辑失败"
				});
			}
		}
	});
}
function closePolygonCfg() {
	$("#polygonConfigId").dialog("close");
}
function openWindow_editPolygon() {
	var polygonNow = LLM.params.currentTarget;
	var name = polygonNow.options.data.name;
	var imageUrl = polygonNow.options.data.imageUrl;
	// console.log("polygonNow.options.data:",polygonNow.options.data);
	if (!name)
		name = "";
	// if(!imageUrl) imageUrl="";
	$("#polygon_cfg_name").textbox("setValue", name);
	$("#polygon_cfg_imageUrl").filebox("setText", imageUrl);

	if (polygonNow.options.data.bounds) {
		$("#polygon_cfg_width").numberbox("setValue",
				polygonNow.options.data.bounds[1].lng);
		$("#polygon_cfg_height").numberbox("setValue",
				polygonNow.options.data.bounds[1].lat);
	}

	$("#polygonConfigId").dialog("open");
}
function deletePolygon() {
	var target = LLM.params.currentTarget;
	// TODO 判断类型，防止误删
	$.messager.confirm('操作提示', '是否删除此区域？', function(r) {
		if (r) {
			var id = target.options.data.id;
			$.ajax({
				url : '/emap/leaflet/polygon/delete/' + id,
				type : 'get',
				dataType : 'json',
				success : function(res) {
					console.log("res:", res);
					if (res && res.ret) {
						target.remove();
						refreshMapTree();
						easyuiShow({
							msg : "删除成功"
						});
					} else {
						easyuiShow({
							msg : "删除失败"
						});
					}
				}
			});
		}
	});
}
function addPolygon(polygonData) {
	var polygonList = LLM.params.polygonList;
	var map = LLM.map;

	var points = [];
	for (var i = 0; i < polygonData.latlngs.length; i++) {
		var t = polygonData.latlngs[i];
		points.push([ t.lat, t.lng ]);
	}

	// polygon
	polygon = new L.Polygon(points, {
		data : polygonData
	});

	// 保存layer(方便后面删除)
	polygonList.push(polygon);
	polygon.addTo(map);
	// 事件
	polygon.bindTooltip("双击转向下一层:");

	polygon.on("click", function(e) {
		LLM.params.currentTarget = e.target;
		intoDetailMap();
	});
	if (!LLM.readOnly) {
		polygon.on("contextmenu", function(e) {
			LLM.params.currentTarget = e.target; // polygon;//指向这个对象
			$("#polygonMenu").menu("show", {
				left : e.containerPoint.x,
				top : e.containerPoint.y
			});
		});
	}

}