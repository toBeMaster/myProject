function showLatlng(e){
/*	var popup = L.popup();
	popup
	.setLatLng(e.latlng)
	.setContent("You clicked the map at " + e.latlng.toString())
	.openOn(LLM);*/
}
//使用全局变量判断当前地图模式
function mapEventRegister(LLM) {

	var map = LLM.map;
	var points = [], // 临时变量，存储当前画图的点和区域
	points_length = 0, polygon;// 画线区域
	// 单击
	var clickFlag, clickTimes = 1, isDrag = false;// 地图是否拖动，控制是否可以画线
	map.on('mousedown', function(e) {
		map.off('mousemove');
		var enableDraw = LLM.params.enableDrawPolygon;
		if (e.originalEvent.button == 0) {// 鼠标左键
			if (enableDraw) {// 画线模式
				// 清除
				if (clickFlag)
					clearTimeout(clickFlag);

				clickFlag = setTimeout(function() {
					if (clickTimes == 1 && !isDrag) {
						points.push([ e.latlng.lat, e.latlng.lng ]);

						points_length = points.length;
						// 移动
						map.on('mousemove', function(e) {
							// 清除
							if (polygon)
								map.removeLayer(polygon);
							// polyline
							points[points_length] = [ e.latlng.lat,
									e.latlng.lng ];
							// polygon
							polygon = new L.Polygon(points);
							map.addLayer(polygon);
						});
					}
				}, 300);

			} else {// 普通模式

				showLatlng(e);// 鼠标松开就无提示，移动松开保留提示，暂且没搞清楚，非重点
			}
		}

	});
	// 双击
	map.on('dblclick', function(e) {
		var enableDraw = LLM.params.enableDrawPolygon;
		var polygonList = LLM.params.polygonList;
		if (enableDraw && points.length) {// 画线模式
			clickTimes = 2;
			// 清除
			if (polygon)
				map.removeLayer(polygon);
			var latlngs = new Array();
			for (var i = 0; i < points.length; i++) {
				var c = points[i], t = {};
				t.lat = c[0];
				t.lng = c[1];
				latlngs[i] = t;
			}
			latlngs.distinct(function(a, b) {
				if (a.lat == b.lat && a.lng == b.lng) {
					return 0;
				} else {
					return -1;
				}
			});
			// polygon
			polygon = new L.Polygon(points, {
				data : {
					id : LLM.util.uuid(),
					containerId : LLM.options.id,
					name : "新建图层",
					latlngs : latlngs
				}
			});
			var polygonData = polygon.options.data;
			var jsonData = JSON.stringify(polygonData);
			$.ajax({
				url : '/emap/leaflet/polygon/add',
				type : "post",
				contentType : "application/json",
				data : jsonData,
				datatype : "json",
				success : function(res) {
				}
			});

			// 移除事件
			map.off('mousemove');

			setTimeout(function() {
				clickTimes = 1;
				// 保存layer(方便后面删除)
				polygonList.push(polygon);
				polygon.addTo(map).bindTooltip("双击转向下一层:");

				polygon.on("click", function(e) {
					LLM.params.currentTarget = e.target;
					intoDetailMap();
				});
				polygon.on("contextmenu", function(e) {
					LLM.params.currentTarget = e.target; // polygon;//指向这个对象
					$("#polygonMenu").menu("show", {
						left : e.containerPoint.x,
						top : e.containerPoint.y
					});
				});
				LLM.params.currentTarget = polygon;// 指向这个对象
				// 清除
				polygon = null;
				points = [];

				openWindow_editPolygon();
			}, 200);

		}
	});
	// 键盘事件
	$(document).keyup(function(e) {
		if (e.keyCode == 27) {// esc键
			if (points.length) {// 还没结束，也代表是画线，没必要再去加一层判断
				map.off('mousemove');
				clickTimes = 1;
				map.removeLayer(polygon);
				points = [];
			}
		}
	});

	// 拖动
	map.on('movestart', function() {
		isDrag = true;
	});
	map.on('moveend', function() {
		isDrag = false;
	});

	map.on('contextmenu', function(e) {
		var enableDraw = LLM.params.enableDrawPolygon;

		if (enableDraw) {
			clickTimes = 2;
			map.off('mousemove');
			if (points.length) {// 还没结束
				clickTimes = 1;
				map.removeLayer(polygon);
				points = [];
			}
			clickTimes = 1;
		}
		var showFlag = $("#polygonMenu")[0].style.display;
		if (showFlag == "none") {
			// 右键就弹出，画线模式下也弹出，如果画线不弹出，可以用控制按钮，切换画线模式
			$("#mapMenu").menu("show", {
				left : e.containerPoint.x,
				top : e.containerPoint.y
			});
		}

	});
}