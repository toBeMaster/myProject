$(function(){
	if (document.all&&document.getElementById) {
		navRoot = document.getElementById("nav");
		var childrens=$(navRoot).children();
		if(navRoot){
			for (i=0; i<childrens.length; i++) 
			{
				node = navRoot.childrens[i];
				if (node.nodeName=="li") {
					node.onmouseover=function() {
						this.className+=" over";
					}
					node.onmouseout=function() {
						this.className=this.className.replace(" over", "");
					}
				}
			}
		}
		
	}
});
 
function requestFullScreen() {
	alert(1111);
    var de = document.documentElement;
    if (de.requestFullscreen) {
        de.requestFullscreen();
    } else if (de.mozRequestFullScreen) {
        de.mozRequestFullScreen();
    } else if (de.webkitRequestFullScreen) {
        de.webkitRequestFullScreen();
    }
}
