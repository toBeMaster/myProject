 
var G_tocard_maxTips=10;
//删除标签后的处理函数
var handler=function(){};
//绑定删除后的处理函数
function setDelTipHandler(temp){
	handler=temp;
}
function delTipHandler(){
	handler();
}
//生成uuid
function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
 
    var uuid = s.join("");
    return uuid;
}
$(function(){(
	function(){
		var tag=$(".plus-tag");
		$(".plus-tag").on("click","em",function(){
			var parent=$(this).parents("a"),title=parent.attr("title"),value=parent.attr("value");
			delTips(title,value);
			delTipHandler();
		});
		
		hasTips=function(title){
			var $sonAs=$("a",tag),flag=false;
			$sonAs.each(function(){
				if($(this).attr("title")==title){
					flag=true;
					return false;//退出循环中的调用函数;
				}
			});
			return flag;
		};

		isMaxTips=function(){
			return	$("a",tag).length>=G_tocard_maxTips;
		};

		setTips=function(title,value,condition){
			if(hasTips(title)){
				return false;
			}if(isMaxTips()){
				alert("最多添加"+G_tocard_maxTips+"个标签！");
				return false;
			}
			var attrValue=value?'value="'+value+'"':"";
			var $sonA=$('<a '+attrValue+' href="javascript:void(0);" ><em></em><span>'+title+
						'</span></a>');//em的位置就是删除图标的位置，此项以后可以动态指定
			$sonA.attr("title",title);
			$sonA.attr("uuid",uuid());
			$.each(condition,function(key,value){
				$sonA.attr("condition_"+key,value);
			})
			tag.append($sonA); 
		  
			return true;
		};

		delTips=function(title,value){
			if(!hasTips(title)){
				return false;
			}
			$("a",tag).each(function(){
				var $sonA=$(this);
				if($sonA.attr("title")==title){
					$sonA.remove();
					return false;
				}
			});
			return true;
		};

		getTips=function(){
			var array=[];
			$("a",tag).each(function(){
				array.push($(this).attr("title"))
			});
			return array;
		};

		getTipsId=function(){
			var array=[];
			$("a",tag).each(function(){
				array.push($(this).attr("value"))
			});
			return array;
		};
		
		getTipsIdAndTag=function(){
			var array=[];
			$("a",tag).each(function(){
				array.push($(this).attr("value")+"##"+$(this).attr("title"))
			});
			return array;
		}
	}
	
)()});
