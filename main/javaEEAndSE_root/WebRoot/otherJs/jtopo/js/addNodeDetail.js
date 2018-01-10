$(function(){
	$("#unit").datagrid({
		url:'getTopoUnitDatagrid',
		idField:'id',
		fitColumns:true,
		columns:[[
		    {field:'id',title:'id',width:100},
		    {field:'text',title:'名称',width:150},
		    {field:'unitTypeStr',title:'设备类型',width:80}
		]],
		onBeforeLoad:function(param){
		 	param.topoName=topoName;//参数不能写在url地址里面，如果写到地址里面，会拿不到当前值
		},
		onLoadSuccess:function(data){
			var checkedNodes= $("#unitTree").tree("getChecked");
			$.each(checkedNodes,function(i,checkedNode){
				$("#unitTree").tree("uncheck",checkedNode.target);
			});
			var rows= $("#unit").datagrid("getRows");
			if(rows){
				$(rows).each(function(i,row){
					var node = $("#unitTree").tree('find',row.id);
					if(node){
						$("#unitTree").tree('check',node.target);
					}
				});
			}
		},
		onDblClickRow : function(rowIndex,rowData){
			$("#unit").datagrid("deleteRow",rowIndex);
			var node = $("#unitTree").tree('find',rowData.id);
			if(node){
				$("#unitTree").tree('uncheck',node.target);
			}
		}
	});
	$("#unitTree").tree({
		width : 240,
		url : 'getUnitTreeByAsync',
		required : true,
		editable : false,
		checkbox : true,
		onlyLeafCheck : false,
		onBeforeLoad : function (node,param){
			if(node){
				param.unitType=node.unitType;
				if(node.attributes.secondType=="unit"){
					param.secondType="unit";
				}
			}
		},
		onLoadSuccess :function(node,data){
			var nodes=new Array();
			if(node){
				nodes=$("#unitTree").tree("getChildren",node.target);
			}
			if(nodes){
				$.each(nodes,function(key,inode){
					if(inode.attributes.secondType=="unit"){
						var icon=inode.attributes.icon;
						if(!icon){
							return;
						}
						var url="url('"+PATH+icon+"')"+" no-repeat center center";
						var $node=$(inode.target);
						var children=$node.children();
						var iconDom =$(children[3]);
						if(Math.floor(parseInt(inode.unitType)/1000)!=1){
							iconDom =$(children[2]);
						}
						iconDom.css({
				  			background:url
						});
					}
				});
			}
			var rows= $("#unit").datagrid("getRows");
			if(rows){
				$(rows).each(function(i,row){
					var node =$("#unitTree").tree('find',row.id);
					if(node){
						$("#unitTree").tree('check',node.target);
					}
				});
			}
		},
		onCheck: function(node,checked){
			if(node.attributes.secondType && node.attributes.secondType=="unit"){
				var index=$("#unit").datagrid("getRowIndex",node.id);
				if(checked){
					if(index>=0){
						return;
					}else{
						$("#unit").datagrid('appendRow',node);
					}
				}else{
					if(index>=0){
						$("#unit").datagrid('deleteRow',index);
					}
				}
			}else{
				var childNodes=$("#unitTree").tree("getChildren",node.target);
				for(var i=0;i<childNodes.length;i++){
					var leaf=childNodes[i];
					if(leaf.attributes.secondType && leaf.attributes.secondType=="unit"){
						var index=$("#unit").datagrid("getRowIndex",leaf.id);
						if(checked){
							if(index>=0){
								continue;
							}else{
								$("#unit").datagrid('appendRow',leaf);
							}
						}else{
							if(index>=0){
								$("#unit").datagrid('deleteRow',index);
							}
						}
					}
				}
			}
		}
	});
});
 
//取消所有勾选
function saveUnitStatus(){
	var checkedNodes= $("#unitTree").tree("getChecked");
	$.each(checkedNodes,function(i,checkedNode){
		$("#unitTree").tree("uncheck",checkedNode.target);
	});
}
function getArc(nodeIds){
	$.ajax({
		url:'getArcByNodes',
		type:'post',
		data:{
			nodeIds:nodeIds,
			topoName:topoName
		},
		success: function(data){
			addArcAfterAddNode(data);	
		}
	});
}
function addArcAfterAddNode(arcs){
	if(arcs&& arcs.length>0){
		for(var i=0;i<arcs.length;i++){
			var flag=false;
			var nodeA = getNodeById(arcs[i].upId);
			var nodeZ = getNodeById(arcs[i].downId);
			for(var j=0;j<scene.childs.length;j++){
				var link = scene.childs[j];
				if(link.elementType=="link"){
					if(link.data.id==arcs[i].id){
						flag=true;
						break;
					}
				}
			}
			if(!flag){
				addLink(nodeA,nodeZ,arcs[i]);
			}
		}
	}
	setLayout();
	saveToJson();
}
//添加链路布局
function setLayout(){
	for(var i=0;i<scene.childs.length;i++){
		var node = scene.childs[i];
		if(node.elementType=="node"){
			node.data.childsCount = getChildsCount(node,true);
		}
	}
	//为什么不合并两个for循环，是因为，这里的for循环中的函数依赖于上面的设置
	for(i =0;i<scene.childs.length;i++){
		node = scene.childs[i];
		if("node"==node.elementType){
			if(!node.data.parentId){
				changeNodeLayout("circle",node);
			}
		}
	}
	setNodeLevel();
}

//保存图元配置
function saveNodeConfig(){
	var point = $("#addNodeDialog").data("point");
	var inserted = $("#unit").datagrid("getChanges","inserted");
	var deleted = $("#unit").datagrid("getChanges","deleted");
	var nodeIds = "";
	if(inserted){
		for(var i=0;i<inserted.length;i++){
			point.x+=30;
			addNodeByCfg(point,inserted[i]);
		}
	}  
	if(deleted){
		for(i=0;i<deleted.length;i++){
			removeNodeDao(deleted[i].id);
		}
	}
	var rows= $("#unit").datagrid("getRows");
	if(rows &&rows.length>0){
		for(i =0 ;i<rows.length;i++){
			nodeIds+= rows[i].id+",";
		}
		getArc(nodeIds);
	}
	var nodes =$("#unitTree").tree('getChecked');	// get checked nodes
	if(nodes){
		$.each(nodes,function(k,node){
			$("#unitTree").tree("uncheck",node.target);
		});
	}
	
	saveUnitStatus();
	$("#unit").datagrid("acceptChanges");
	$("#addNodeDialog").dialog('close');
	$("#addNodeDialog").removeData('point');
}
// 添加节点,除了初次加载，这里就是最后的添加节点入口
function addNodeByCfg(point,v){
	var x = 30, y = 50;
	if(point){
		x = point.x-20;
		y = point.y-20;
	}
	var node = new JTopo.Node(v.text);
    node.setLocation(x, y);
    node.setImage(getImgPathByUnitType(v.unitType));
    node.fontColor ="42,44,46";
    
    registeNodeListener(node);
    
    node.id=v.id;
    node.data={};
    node.data.id=v.id;
    node.data.nodeLevel=0;
    node.data.showChilds=true;
    node.data.parentIds=[];
    node.data.childIds=[];
    node.data.alarm="1";
    node.data.nodeType=v.unitType;
    node.data.nodeTypeStr=v.unitTypeStr;
    node.data.imgType=v.unitType;
    node.data.name=v.text;
    node.data.topoId="2";
    node.data.unitId=v.id;
    node.data.x=x;
    node.data.y=y;
    scene.add(node);
    nodeMap.put(node.data.id, node);
    nodeDataMap.put(node.data.id,node.data);
    $("#contextmenu").hide();
    return node;
}
var treeOptions={
		width : 240,
		required : true,
		editable : false,
		checkbox : true,
		onlyLeafCheck : false,
		onCheck: function(node,checked){
			if(node.attributes.secondType && node.attributes.secondType=="unit"){
				var index=$("#unit").datagrid("getRowIndex",node.id);
				if(checked){
					if(index>=0){
						return;
					}else{
						$("#unit").datagrid('appendRow',node);
					}
				}else{
					if(index>=0){
						$("#unit").datagrid('deleteRow',index);
					}
				}
			}else{
				var childNodes=$("#unitTree").next("ul.filterTree").tree("getChildren",node.target);
				for(var i=0;i<childNodes.length;i++){
					var leaf=childNodes[i];
					if(leaf.attributes.secondType && leaf.attributes.secondType=="unit"){
						var index=$("#unit").datagrid("getRowIndex",leaf.id);
						if(checked){
							if(index>=0){
								return;
							}else{
								$("#unit").datagrid('appendRow',leaf);
							}
						}else{
							if(index>=0){
								$("#unit").datagrid('deleteRow',index);
							}
						}
					}
				}
			}
		}
	};
function searchUnit(){
	var $tree = $("#unitTree");
	
	var filterVal = $.trim($("#searchParam").textbox("getValue"));
	if(!filterVal){
	  revert(); 
		return;
	}
	
	var reg = new RegExp(filterVal,"i");//执行对大小写不敏感的匹配
	var regIp=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
	var filterNodes = [];
	 
	if(regIp.test(filterVal)){
		var node = $tree.tree("find",filterVal );
		if(node){
			var tNd = $.extend({},node);
			tNd.isLeaf=true;
			var parent= $tree.tree("getParent",node.target);
			var grandparent=null;
			var parentTemp=null;
			var grandparentTemp=null;
			//获取父级数据
			if(parent){
				parentTemp=$.extend({},parent);
				parentTemp.state="open";
				parentTemp.children=[tNd];
				grandparent=$tree.tree("getParent",parent.target);
				if(grandparent){
					grandparentTemp=$.extend({},grandparent);
					grandparentTemp.state="open";
					grandparentTemp.children=[parentTemp];
					filterNodes.push(grandparentTemp);
				}else{
					filterNodes.push(parentTemp);
				}
			} 
		}
	}else{
		$tree.find("div.tree-node").each(function(){
			var treeNode = $tree.tree("getData",$(this));
			if(reg.test(treeNode.text)){
				var tnt = $.extend({},treeNode);
				tnt.isLeaf=true;
				var parent= $tree.tree("getParent",treeNode.target);
				var grandparent=null;
				var parentTemp=null;
				var grandparentTemp=null;
				//获取父级数据
				if(parent){
					grandparent=$tree.tree("getParent",parent.target);
				}
				//初始化临时节点父级数据
				if(grandparent){
					for(var i=0;i<filterNodes.length;i++){
						if(grandparent.id == filterNodes[i].id){
							grandparentTemp=filterNodes[i];
							for(var j=0;j<grandparentTemp.children.length;j++){
								if(parent.id== grandparentTemp.children[j].id){
									parentTemp=grandparentTemp.children[j];
									break;
								}								
							}
							break;
						}
					}
				}else if(parent){
					for(var i=0;i<filterNodes.length;i++){
						if(parent.id == filterNodes[i].id){
							parentTemp=filterNodes[i];
							break;
						}
					}
				}
				//添加数据,主要是结构关系的判断
				if(grandparent){
					if(!grandparentTemp){//第一次初始化数据
						grandparentTemp=$.extend({},grandparent);
						grandparentTemp.state="open";
						grandparentTemp.children=[];
						
 						parentTemp=$.extend({},parent);
 						parentTemp.state="open";
						parentTemp.children=[];
						
						grandparentTemp.children.push(parentTemp);
						filterNodes.push(grandparentTemp);
					}else if(!parentTemp){
						parentTemp=$.extend({},parent);
						parentTemp.state="open";
						parentTemp.children=[];
						
						grandparentTemp.children.push(parentTemp);
					}
					
					parentTemp.children.push(tnt);
				}else if(parent){
					var existflag = false;
					if(!parentTemp){
						parentTemp=$.extend({},parent);
						parentTemp.state="open";
						parentTemp.children=[];
						filterNodes.push(parentTemp);
						
					}else {
						for(var i=0;i<parentTemp.children.length;i++){
							if(tnt.id== parentTemp.children[i].id){
								existflag=true;
							}
						}
					}
					if(!existflag){
						parentTemp.children.push(tnt);
					}
				}  
			}
		});
	}
	
	var filterTree = $tree.next("ul.filterTree");
	if(filterNodes.length > 0){
		if(filterTree.length == 0){
			filterTree = $("<ul/>",{class:'filterTree'});
			filterTree.insertAfter($tree);
			$tree.hide();
			var options =treeOptions; //$tree.tree("options");
			var optionss = $.extend(options,{url:null,data:filterNodes});
			filterTree.tree(optionss);
		}else{
			filterTree.tree("loadData",filterNodes);
		}
		var roots=filterTree.tree("getRoots");
		$.each(roots,function(key,root){
			var childs=filterTree.tree("getChildren",root);
			$.each(childs,function(key,inode){
				if(inode.attributes.secondType=="unit"){
					var icon=inode.attributes.icon;
					if(!icon){
						return;
					}
					var url="url('"+PATH+icon+"')"+" no-repeat center center";
					var $node=$(inode.target);
					var children=$node.children();
					var iconDom =$(children[3]);
					if(Math.floor(parseInt(inode.unitType)/1000)!=1){
						iconDom =$(children[2]);
					}
					iconDom.css({
			  			background:url
					});
				}
			});
		});
	}else{
		if(filterTree.length>0){
			filterTree.remove();
		}
		$tree.show();
	}
}

function revert(){
	var $filterTree = $("#unitTree").next("ul.filterTree");
	if($filterTree && $filterTree.length>0){
		$filterTree.remove();
		$("#unitTree").show();
	}
}