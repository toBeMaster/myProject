$(function(){
		$("#aFloatTools_Show").click(function(){
			$('#divFloatToolsView').animate({width:'show',opacity:'show'},100,function(){$('#divFloatToolsView').show();});
			$('#aFloatTools_Show').hide();
			$('#aFloatTools_Hide').show();	
			$("#contextmenu").hide();
			$("#nodemenu").hide();
			$("#linkmenu").hide();
		});
		$("#aFloatTools_Hide").click(function(){
			$('#divFloatToolsView').animate({width:'hide', opacity:'hide'},100,function(){$('#divFloatToolsView').hide();});
			$('#aFloatTools_Show').show();
			$('#aFloatTools_Hide').hide();
			$("#contextmenu").hide();
			$("#nodemenu").hide();
			$("#linkmenu").hide();
		});
	});

function setLink(type){
	var links = linkMap.values();
	if(links.length==0){
		return;
	}
	for(var i=scene.childs.length;i--; i>=0){
		if(scene.childs[i].elementType =='link'){
			scene.remove(scene.childs[i]);
		}
	}
	var a=topo,b, c, d, e;
	if(type == 1){
		if (null != scene && null != a && null != a.arcs && 0 != a.arcs.length) for (b = a.arcs, 
		c = 0; c < b.length; c++) d = b[c], nodeMap.get(d.upNodeId) && nodeMap.get(d.downNodeId) && (e = new JTopo.Link(nodeMap.get(d.upNodeId), nodeMap.get(d.downNodeId), null), 
		e.arrowsRadius = 5,e.data = d, 
		e.mouseover(function(a) {
			showArcTip(a)
		}), e.mouseout(function() {
			stageListen();
		}), scene.add(e), linkMap.put(d.id, e));
	}if(type == 2){
		if (null != scene && null != a && null != a.arcs && 0 != a.arcs.length) for (b = a.arcs, 
		c = 0; c < b.length; c++) d = b[c], nodeMap.get(d.upNodeId) && nodeMap.get(d.downNodeId) && (e = new JTopo.FlexionalLink(nodeMap.get(d.upNodeId), nodeMap.get(d.downNodeId), null), 
		e.arrowsRadius = 5,e.data = d, 
		e.mouseover(function(a) {
			showArcTip(a)
		}), e.mouseout(function() {
			stageListen();
		}), scene.add(e), linkMap.put(d.id, e));
	}if(type == 3){
		if (null != scene && null != a && null != a.arcs && 0 != a.arcs.length) for (b = a.arcs, 
		c = 0; c < b.length; c++) d = b[c], nodeMap.get(d.upNodeId) && nodeMap.get(d.downNodeId) && (e = new JTopo.CurveLink(nodeMap.get(d.upNodeId), nodeMap.get(d.downNodeId), null), 
		e.arrowsRadius = 5,
				e.data = d, 
		e.mouseover(function(a) {
			showArcTip(a)
		}), e.mouseout(function() {
			stageListen();
		}), scene.add(e), linkMap.put(d.id, e));
	}
}
 
