//判断浏览器
function getOs()
{
    var OsObject = "";
   if(navigator.userAgent.indexOf("MSIE")>0) {
        return "IE";
   }
   if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){
        return "Firefox";
   }
   if(isSafari=navigator.userAgent.indexOf("Safari")>0) {
        return "Safari";
   } 
   if(isCamino=navigator.userAgent.indexOf("Camino")>0){
        return "Camino";
   }
   if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0){
        return "Gecko";
   }
  
}
//获取 window
function getWindow(id){
	var iframe = window.frames[id];
	var commonWindow={};
	if(iframe!=null){
		if(iframe.window){
			commonWindow = iframe.window;
		}else if(iframe.contentWindow){
			commonWindow = iframe.contentWindow;
		}
	}
	return commonWindow;
}
//生成uuid
function uuid() {
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
}
// 非值判断
function isNull(value) {
	if (value == null || value == undefined || value.indexOf("null") >= 0
			|| value.indexOf("undefined") >= 0) {
		return true;
	}
	return false;
}
/**
 * 包含特殊字符
 * @param s
 * @returns
 */
function containSpecial( s )      
{      
    var containSpecial = RegExp(/[(\ )(\~)(\!)(\@)(\#)  (\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/);      
    return ( containSpecial.test(s) );      
} 
