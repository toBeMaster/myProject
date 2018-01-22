CanvasRenderingContext2D.prototype.JTopoDashedLineTo = function(a, b, c, d, e) {
	 var animespeed= (new Date())/50;
	 if("undefined" == typeof e){
		 e = 5;
	 } 
	 var f = c - a,  g = d - b, h = Math.floor(Math.sqrt(f * f + g * g)),// 勾股定理,直线长度
			 i = 0 >= e ? h: h / e,// 虚线段数
			 j = g / h * e,
			 k = f / h * e;
	 this.beginPath();
	 animespeed=animespeed%(e*2);
	 var txs=-f/h*animespeed;
	 var tys=-g/h*animespeed;
	 for (var l = 0; i > l; l++) {
		 l % 2 ? this.lineTo(a + l * k-txs, b + l * j-tys) : this.moveTo((a + l * k-txs)>(a+i*k)?(a + l * k-txs):(a + l * k-txs), (b + l * j-tys)>(b + i * j)?(b + l * j-tys):(b + l * j-tys));
	 };
	 this.stroke();
};
CanvasRenderingContext2D.prototype.JtopoDrawPointPath=function(a,b,c,d,e,f){
	 var animespeed=(new Date())/10;
	var xs=c- a,
		xy=d- b,
		l = Math.floor(Math.sqrt(xs * xs + xy * xy)),
			colorlength=50,
			j=l;
		xl=xs/ l,
	    yl=xy/l;
	 var colorpoint=animespeed%(l+colorlength)-colorlength;

	 for(var i=0;i<j;i++){
		 if(((i)>colorpoint)&&((i)<(colorpoint+colorlength))){
			 this.beginPath();
			 this.strokeStyle=e;
			 this.moveTo(a+(i-1)*xl,b+(i-1)*yl);
			 this.lineTo(a+i*xl,b+i*yl);
			 this.stroke();
		 }else{
			 this.beginPath();
			 this.strokeStyle=f;
			 this.moveTo(a+(i-1)*xl,b+(i-1)*yl);
			 this.lineTo(a+i*xl,b+i*yl);
			 this.stroke();
		 }
	 }
};