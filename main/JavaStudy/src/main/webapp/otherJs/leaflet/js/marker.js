/**
 * ================================================================================
 * marker 相关的操作全部放在这里
 */
// 获取图片路径
function getImgPathBySourceType(sourceType, level) {
	var imgPath = imgPath = '../../../leaflet/images/sourcetype/' + sourceType + ".png";
	return imgPath;
}
// 添加设备节点
function addMarker(markerData, isAdd) {
	console.log("markerData:", markerData);
	var myIcon = L.icon({
		iconUrl : getImgPathBySourceType(markerData.sourceType),
		iconSize : [ 32, 32 ],
		iconAnchor : [ 16, 32 ],
		popupAnchor : [ 0, -32 ],
		showSize : [ 32, 32 ]
	});
	var latlng = [];

	latlng.push(markerData.lat);
	latlng.push(markerData.lng);
	var marker = L.marker(latlng, {
		data : markerData,
		id : markerData.id,
		icon : myIcon,// can cancel
		rotationAngle : 30,
		autoPan : true,
		draggable : !LLM.readOnly
	}).addTo(LLM.map).bindTooltip("this is tooltip");

	LLM.params.emarkerList.push(marker);
	if (!LLM.readOnly) {
		marker.bindPopup(function(e) {
			var rst = e._latlng.toString();
			return rst;
		});
		marker.on("contextmenu", function(e) {
			LLM.params.currentTarget = marker;
			$("#markerMenu").menu("show", {
				left : e.containerPoint.x,
				top : e.containerPoint.y
			});
		});
		marker.on("moveend", function(e) {
			marker.options.data.lat = marker._latlng.lat;
			marker.options.data.lng = marker._latlng.lng;
			var jsonData = JSON.stringify(marker.options.data);
			$.ajax({
				url : '/emap/leaflet/marker/update',
				type : "post",
				contentType : "application/json",
				data : jsonData,
				datatype : "json",
				success : function(res) {
				}
			});
		});
	}

	markerData.containerId = LLM.options.id;
	if (isAdd) {
		var jsonData = JSON.stringify(markerData);
		$.ajax({
			url : '/emap/leaflet/marker/add',
			type : "post",
			contentType : "application/json",
			data : jsonData,
			datatype : "json",
			success : function(res) {
				console.log("add marker");
			}
		});
	}
	marker.setOpacity(1);
	marker.animateStatus = "dev";
}
//通过资源id找到该节点
function getMarkerBySourceId(id) {
	var emarkerList = LLM.params.emarkerList;
	var target = null;
	for (var i = 0; i < emarkerList.length; i++) {
		var marker = emarkerList[i];
		if (marker.options.data.sourceId == id) {
			target = marker;
			break;
		}
	}
	return target;
}
/**
 * 标记动画
 */
var timerIndex = new Array();
function stopAnimate() {
	if (timerIndex.length > 0) {
		$.each(timerIndex, function(i, index) {
			clearInterval(index);
		});
	}
	timerIndex = new Array();
}
function startAnimate(node) {
	return function() {
		setAlpha(node);
	};
}
function setAlpha(sNode) {
	var increase = 0.1;
	if (sNode.animateStatus.indexOf("dev") > -1) {
		sNode.options.opacity -= increase;
		sNode.setOpacity(sNode.options.opacity);
		if (sNode.options.opacity < 0.5) {
			sNode.animateStatus = "add";
		}
	} else {
		sNode.options.opacity += increase;
		sNode.setOpacity(sNode.options.opacity);
		if (sNode.options.opacity > 1) {
			sNode.animateStatus = "dev";
		}
	}
}
function deleteMarker() {
	var marker = LLM.params.currentTarget;
	$.messager.confirm('操作提示', '是否删除此标记？', function(r) {
		if (r) {
			var id = marker.options.id;
			$.ajax({
				url : '/emap/leaflet/marker/delete/' + id,
				type : 'get',
				dataType : "json",
				success : function(res) {
					if (res && res.ret) {
						
						var list = LLM.params.emarkerList;
						for(var i=0;i<list.length;i++){
							if(list[i].options.id==id){
								list.splice(i,1);
							}
						}
						marker.remove();
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
//显示冒泡提示
function showPopup(markerData){
	var marker = getMarkerBySourceId(markerData.sourceId);
	console.log("marker popup:",marker);
	marker.openPopup();
}