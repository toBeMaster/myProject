/**
 * 拓扑图Container容器设计JS
 */
function addContainer(){
	console.log($("#contextmenu"));
	// 不指定布局的时候，容器的布局为自动(容器边界随元素变化）
    var container = new JTopo.Container('');
    container.textPosition = 'Middle_Center';
    container.fontColor = '255,255,0';
    container.font = '18pt 微软雅黑';
    container.fillColor = '63,91,160';
    container.borderColor = '63,91,160';
    container.borderRadius = 30; // 圆角
    container.alpha = 0.5;
    container.width = 500;
    //获取菜单坐标，在菜单处增加容器
    var cTop = parseInt($("#contextmenu").css("top"));
    var cLeft = parseInt($("#contextmenu").css("left"));
    if(isNaN(cTop) || isNaN(cLeft)){
    	cTop = 0;
    	cLeft = 0;
    }
    //容器左上角右上角增加节点用做拖拽，设置非节点属性进行区分。
    for(var i = 0; i < 2; i++){
    	var cNode = new JTopo.CircleNode('');
    	cNode.setLocation(cLeft+i*200,cTop+i*100);
    	cNode.setSize(15,15);
    	cNode.fillColor = "0,0,0";
    	//是否显示表示选中状态的矩形
    	cNode.showSelected = false;
    	cNode.alpha = 0;
    	//设置非节点属性进行区分
    	cNode.isNode = false;
    	container.add(cNode);
    	scene.add(cNode);
    }
    scene.add(container);
    //关闭右键菜单
    $("#contextmenu").hide();
}

//删除容器
function deleteContainer(){
	var sleNodes= scene.selectedElements;
	//容器设置
	if(sleNodes.length == 1 && sleNodes[0].elementType == "container"){
		//删除容器中节点
		if(sleNodes[0].childs.length > 0){
			for(var i = 0; i < sleNodes[0].childs.length; i++){
				scene.remove(sleNodes[0].childs[i]);
			}
		}
		//删除容器
		scene.remove(sleNodes[0]);
	}
	hideAllMenu();
}

//打开容器属性设置窗口
function setContainer(){
	var sleNodes= scene.selectedElements;
	//容器设置
	if(sleNodes.length == 1 && sleNodes[0].elementType == "container"){
		$("#containerWindow").dialog("open");
	}
	hideAllMenu();
}

//设置容器透明度
function setContainerAlpha(value){
	var sleNodes= scene.selectedElements;
	//获取已选中的容器
	if(sleNodes.length > 0 ){
		var containerAlpha = parseFloat(value) / 100;
		for(var i = 0; i < sleNodes.length; i++){
			if(sleNodes[i].elementType == "container"){
				//器透明度范围（0-1）
				sleNodes[i].alpha = containerAlpha;
			}
		}
	}
}

//设置容器填充颜色（参数格式：51, 204, 153）
function setContainerFillColor(value){
	var sleNodes= scene.selectedElements;
	//获取已选中的容器
	if(sleNodes.length > 0){
		for(var i = 0; i < sleNodes.length; i++){
			if(sleNodes[i].elementType == "container"){
				//改变容器颜色
				sleNodes[i].fillColor = value;
				sleNodes[i].borderColor = value;
			}
		}
	}
}