var LLM = null;//leafletMap 封装的对象
//构造对象
function LeafletMap(options){
	// 验证必需参数是否存在
	if(!options) throw "options is undefined!";
	if(!options.domId) throw "no bundle dom!";
	if(!options.url) throw "no url";
	
	var obj = {
		options:null,			// 地图需要的操作项，只作为一份数据配置视图，没有程序上的关联性，只具有逻辑关联，方便查看地图基础信息，以及保存，如果修改过配置，这个也需要联动修改，切记
		crsList:[L.CRS.EPSG3857,L.CRS.Simple],
		config:{// 应用默认配置
		 // center:[39.92329730495651,116.40190601348878],
			lat:39.9232973049565,
		    lng:116.401906013489,
			zoom:13,
			bounds:null,
			doubleClickZoom : false,
			attributionControl:false,
			imageOverlay:null,// crs: L.CRS.Simple,
			layerList:[// 单纯存放地图提供商列表
			      {
			    	   id:"openstreetmap.Normal.Map",
			    	   name:"在线地图",
			    	   url:'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			    	   maxZoom: 18 
			       },
			       {
			    	   id:"offline",
			    	   name:"离线地图",
			    	   url:"/emap/tiles/{z}/{x}/{y}.png",
			    	   maxZoom: 18 
			       },{
			    	   id:"GaoDe.Normal.Map",
			    	   name:"高德地图",
			    	   url:'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
			    	   subdomains: ["1", "2", "3", "4"],
			    	   maxZoom: 18
			       },{
			    	   id:"Google.Normal.Map",
			    	   name:"谷歌地图",
			    	   url:"http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}",
			    	   maxZoom: 18
			       },{
					   id:"baidu.Normal.Map",
					   name:"百度地图",
					   subdomains: [0,1,2],
					   tms: true,
//					   url:"http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=pl&udt=20150518",
					   url:"http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=pl&b=0&limit=60&scaler=1&udt=20170525",
					   maxZoom: 18
			       }       
						       
			],
			defaultLayerIds:["GaoDe.Normal.Map"],// 默认加载显示
			controlLayerIds:["baidu.Normal.Map","Google.Normal.Map","GaoDe.Normal.Map","openstreetmap.Normal.Map","offline"]// 控制显示,数据库设计中间表
		},
		params:{						// 变量,不保存,这个可以不在这里定义，放在这里只是为了展示项目中需要的一些变量，init里面对数据初始化了，也具有清空的效果
			layerList:null,				// 瓦片图提供商列表，构造后的对象数组
			enableDrawPolygon:false,	// 使能画线模式，默认是普通模式
			markerList:null,  			// 标记列表 data
			polygonList:null,			// 区域列表 data
			layerList:null,				// 图层列表 data
			defaultLayerList:null,		// 默认显示图层列表
			controlLayerList:null,		// 控制层图层列表
			emarkerList:null,			// 标记的构造后对象数组
			currentTarget:null			// 当前事件的对象 一般是 marker,polygon
		},
		domId:options.domId,
		url:options.url,
		readOnly:options.readOnly,
		loadSuccess:false,
		map:null,//引用leaflet的地图对象
		// 初始化对象
		init:function(){
			this.options={};
			this.params={					// 变量,不保存
				layerList:[],				// 瓦片图提供商列表，构造后的对象数组
				enableDrawPolygon:false,	// 使能画线模式，默认是普通模式
				markerList:[],  			// 标记列表
				polygonList:[],				// 区域列表
				layerList:[],				// 图层列表
				defaultLayerList:[],		// 默认显示图层列表
				controlLayerList:[],		// 控制层图层列表
				emarkerList:[]				// 标记的构造后对象数组
			};
			 
			this.loadConfig();
		},
		// 加载配置文件及数据
		loadConfig:function(){
			var self =this;
		//	console.log("------- loadConfig: ----------");
			$.ajax({ 
				url:self.url,
				dataType:"json",
				success:function(res){
				//	console.log("res:",res);
					if(res&&res.data){
						self.parseConfig(res.data); 
					} 
				} 
			});
			 
		/*	var data = jsonData;
			this.parseConfig(data);	*/
			
		},
		// 将传输对象转化成配置
		parseConfig: function(from){// 用户自定义操作项
			console.log("from:",from);
			var self = this;
			var config = self.config;// 默认操作项
			var to = self.options;// map操作项的简单数据副本
			var options={};// 实际要传入进map的操作项
			to.id = from.id;
			to.lat = from.lat?from.lat:config.lat;
			to.lng = from.lng?from.lng:config.lng;
		 	to.center = [to.lat,to.lng];// 不太好，获取数据要解析，保存数据还要解析，关键是保存数据，
		 	to.parentId = from.parentId;
			to.zoom = from.zoom?from.zoom:config.zoom;
			to.minZoom = from.minZoom?from.minZoom:config.minZoom;
			to.maxZoom = from.minZoom?from.maxZoom:config.maxZoom;
			to.doubleClickZoom = from.doubleClickZoom?from.doubleClickZoom:config.doubleClickZoom;
			to.attributionControl = from.attributionControl?from.attributionControl:config.attributionControl;
			to.imageOverlay = from.imageOverlay?from.imageOverlay:config.imageOverlay;
			
			to.markerList = from.markerList;
			to.polygonList = from.polygonList;
			
			if(to.imageOverlay){//非瓦片图
				options.crs=self.crsList[1];
				to.zoom = from.zoom;
			//	options.minZoom=0;
			}
			//bounds
			to.bounds = from.bounds;
			if(to.bounds){
				options.bounds=[];
				$.each(to.bounds,function(key,value){
					options.bounds.push([value.lat,value.lng]);
				});
			}
			self.util.copyProperties(options,to,["defaultLayerIds","controlLayerIds","layerList","markerList","polygonList"],9);// ob1001 复制数据到地图配置options中
			// 解析底图图层
			to.defaultLayerIds = (from.defaultLayerIds&&from.defaultLayerIds.length>0)?from.defaultLayerIds:config.defaultLayerIds;
			// 解析控制图层
		 	to.controlLayerIds = (from.controlLayerIds&&from.controlLayerIds.length>0)?from.controlLayerIds:config.controlLayerIds;
			// 提供商列表
			to.layerList=(from.layerList&&from.layerList.length>0)?from.layerList:config.layerList;
			
		
																											// ,跳过未定义，跳过函数
	//		console.log("复制后的 options:",options);
			
			// 对图层及提供商分类管理，由于是对象引用，所以并不会重新创建对象实例
			self.params.layerList=[];
			self.params.defaultLayerList=[];
			self.params.controlLayerList={};
			
			var tmp;// 临时变量
			tmp = to.layerList// 服务器提供商
			if(tmp && !to.imageOverlay){
				options.layers=[];
				for(var i=0;i<tmp.length;i++){
					 var t = tmp[i];
					 var opt =  {  // 底图图层
								id: t.id,
								name:t.name,
								maxZoom: t.maxZoom,  
								attribution: t.attribution     
							};
					 if(t.subdomains){
						 opt.subdomains = t.subdomains;
					 }
					 if(t.tms){
						 opt.tms = t.tms;
					 }
					 var layer = L.tileLayer(t.url,opt);
					 self.params.layerList.push(layer);
					 if($.inArray(t.id, to.defaultLayerIds)>=0){// 底图
						 self.params.defaultLayerList.push(layer);
					 }
					 if($.inArray(t.id, to.controlLayerIds)>=0){// 控制图
						 self.params.controlLayerList[t.name] = layer;
					 }
					
				}
				options.layers = self.params.defaultLayerList;
			//	console.log("self.params.layerList:",self.params.layerList);
			}
			
			// 去掉null值
			for(var t in options){
				if(self.util.isNull(to[t])){
					delete to[t];
				}
			}
			this.initMap(options);
		},
		registeListener : function(){
			if(this.readOnly) return;
			if (typeof(mapEventRegister)=='undefined') return;
			mapEventRegister(obj);//用于事件注册，如果不是本模块，会报未定义错误，在其他模块开发中，重写这个函数即可
		},
		initMap:function(options){
			var self = this;
			var bounds = [ [768, 1366], [0, 0] ];
			if(options.bounds){
				bounds = options.bounds;
			}
			L.control.attribution({
				prefix:"kd"
			});
			if(options.imageOverlay){
				var opt = {
						crs: L.CRS.Simple,
						doubleClickZoom : false,
						attributionControl:false,
		                maxZoom: options.maxZoom?options.maxZoom:5,
		                minZoom: options.minZoom?options.minZoom:-2
					};
				self.map = L.map(self.domId,opt);
				var imageUrl = "/emap/downloadfile/"+options.imageOverlay.imageUrl+".img";//"static/leaflet/upload";
				var imageOverlay = L.imageOverlay(imageUrl, bounds);
				imageOverlay.addTo(self.map);
				self.map.fitBounds(bounds);
				self.map.setMaxBounds(bounds);
				self.map.setZoom(self.options.zoom?self.options.zoom-"0":0);
			}else{
				if(1){//如果请求的是百度地图
					var bdurl = "http://api{s}.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&udt=20170525&scale=1";
					bdurl = 'http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=pl&b=0&limit=60&scaler=1&udt=20170525';
					options.layers = [new L.TileLayer(bdurl, {
				        maxZoom: 18,
				        minZoom: 3,
				        subdomains: [0,1,2],
				        tms: true
				    }) ];
					var EPSG = "EPSG:3857";
					console.log("EPSG:",EPSG);
					 var crs =new L.Proj.CRS('EPSG:3395',
							 '+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs',
					            {
					                resolutions: function () {
					                    level = 19
					                    var res = [];
					                    res[0] = Math.pow(2, 18);
					                    for (var i = 1; i < level; i++) {
					                        res[i] = Math.pow(2, (18 - i))
					                    }
					                    return res;
					                }(),
					                origin: [0,0],
					                bounds: L.bounds([20037508.342789244, 0], [0, 20037508.342789244])
					            });
					 
					options.crs = crs;
				} 
				self.map = L.map(self.domId,options);
				L.control.layers(self.params.controlLayerList, null).addTo(self.map);
				self.map.on("baselayerchange",function(layer){
					//重新加载页面，默认视图是选择视图
					console.log("图层改变了:",layer);
				});
			}
			
			console.log("self.map:",self.map);
			//标记、区域、事件
			self.addMarkers();
			self.addPolygons();
			self.registeListener();//其他的地方可以写自己的监听器
			self.loadSuccess = true;
		/*	L.control.attribution({
				prefix:"kedacom"
			}).addTo(self.map);*/
		},
		addMarkers:function(){
			var a = this.options.markerList;
			if (typeof(addMarker)=='undefined') return;
			if(a&&a.length>0&& addMarker){
				for(var i=0,b=a[i],c=a.length;i<c;){
					addMarker(b);//和业务有关由调用页面自行创建，后期放在这里创建，业务分离出来
					b = a[++i];
				}
			}
		},
		addPolygons:function(){
			var a = this.options.polygonList;
			if (typeof(addPolygon)=='undefined') return;
			if(a&&a.length>0){
				for(var i=0,b=a[i],c=a.length;i<c;){
					addPolygon(b);
					b = a[++i];
				}
			}
		},
		toJson:function(){
			this.options.zoom=this.map.getZoom();
			var config ={};
			this.util.copyProperties(config,this.options,["markerList","polygonList"]);
			var data=JSON.stringify(config);
			return data;
		},
		util:{
			/**
			 * 判断是否null
			 * 
			 * @param data
			 */ 
			isNull : function(data){
				return (data === undefined || data === null); 
			},
			//生成uuid
			uuid : function() {
				var s = [];
				var hexDigits = "0123456789abcdef";
				for (var i = 0; i < 36; i++) {
					s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
				}
				s[14] = "4";
				s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
				s[8] = s[13] = s[18] = s[23] = "-";

				var uuid = s.join("");
				return uuid;
			},
			/**
			 * 定义拷贝方法,递推调用 filterType-->00000001 从低位开始： i1: 跳过函数 i2:
			 * 跳过目标对象未定义属性 i3: 禁止深克隆 i4: 跳过空值
			 */
			 copyProperties : function(des,ori,filterParams,filterType){
				if(!des) des = new Object();
				for(var p in ori){
					if(filterParams){
						var flag = false;
						for(var i in filterParams){
							var pp = filterParams[i];
							if(pp == p){
								flag = true;
								break;
							}
						}
						if(flag==true){
							continue;  // skip params in filterparams
						}
					}
					if((filterType&1)==1 && typeof p =="function"){// xxx1
						continue;// skip the p ,disable function
					}
					if(filterType&&(filterType&2)==2&&!des.hasOwnProperty(p)){// xx1x
						continue; // skip undefined params of des
					}
					if((filterType&8)==8 && (p==null)){// 1xxx
						continue;// skip null
					}
					if(typeof p =="object"){
						if((filterType&4)==4){// x1xx
							continue;
						}
						copyProperties(des[p],ori[p],filterParams,filterType);
					}else {
						des[p] = ori[p];
					}
				}
			}
			
		}
	};
	obj.init();
	return obj;
}
//递归调用 监听是否加载成功
function onLoadLLMSuccess(fn){
	if(typeof(fn)=='undefined') return;
	if(!LLM||!LLM.loadSuccess){
		setTimeout(function(){
			onLoadLLMSuccess(fn);
		},200);
	}else{
		fn();
	}
}