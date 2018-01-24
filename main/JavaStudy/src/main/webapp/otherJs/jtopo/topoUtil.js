//通过ID获取图元或链路
function getElementById(id,scene){
	var topoItems_ = scene.findElements(function(e){
		return typeof(e._id) != "undefined" && e._id == id; 
	});
	if(topoItems_.length > 0){
		return topoItems_[0];
	}else{
		return null;
	}
}
//修改拓扑图中标题样式（初次加载、保存拓扑属性时调用）
function updateNodeStyle(node,text,fontSize,bold,hidden){
	if(null != node){
		var titleNodeFont = fontSize + "px 微软雅黑";
		if(bold){
			titleNodeFont = "bold "+titleNodeFont;
		}
		node.text = text;
		node.font = titleNodeFont;
		node.visible = !hidden;
	}
	return titleNode;
}