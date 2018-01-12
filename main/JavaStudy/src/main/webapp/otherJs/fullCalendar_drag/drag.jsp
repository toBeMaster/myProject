<%@ page language="java"  pageEncoding="utf8"%>
<html>
<head>
<meta charset="utf-8">
<title>演示：FullCalendar应用——拖动与实时保存</title>
<meta name="keywords" content="日程安排,FullCalendar,日历,JSON,jquery实例">
<meta name="description" content="在线演示FullCalendar拖动与保存日程事件的示例。">
<link rel="stylesheet" type="text/css" href="css/fullcalendar.css">
<style type="text/css">
#calendar{width:960px; margin:0px auto 0px auto}
.fancy{width:450px; height:auto}
.fancy h3{height:30px; line-height:30px; border-bottom:1px solid #d3d3d3; font-size:14px}
.fancy form{padding:10px}
.fancy p{height:28px; line-height:28px; padding:4px; color:#999}
.input{height:20px; line-height:20px; padding:2px; border:1px solid #d3d3d3; width:100px}
.btn{-webkit-border-radius: 3px;-moz-border-radius:3px;padding:5px 12px; cursor:pointer}
.btn_ok{background: #360;border: 1px solid #390;color:#fff}
.btn_cancel{background:#f0f0f0;border: 1px solid #d3d3d3; color:#666 }
.btn_del{background:#f90;border: 1px solid #f80; color:#fff }
.sub_btn{height:32px; line-height:32px; padding-top:6px; border-top:1px solid #f0f0f0; text-align:right; position:relative}
.sub_btn .del{position:absolute; left:2px}
</style>
<script src='js/jquery-1.9.1.js'></script>
<script src='js/jquery-ui.js'></script>
<script src='js/fullcalendar.min.js'></script>
<script type="text/javascript">	
$(function () {
	   setFullCalendar(window.parent.getUserId());
	});
//得到当前的视图
function getView(){
	var view=$("#calendar").fullCalendar('getView');
	return view.name;
}
//改变视图模式
function changeView(model){
	//alert("交互成功");
	var agendaModel;
	if(model=="month"){
		agendaModel="month";
	}
	if(model=="week"){
		agendaModel="agendaWeek";
	}
	if(model=="day"){
		agendaModel="agendaDay";
	}
	$('#calendar').fullCalendar('changeView',agendaModel);
}
//重新获取所有事件数据
function refetchCalendar(){
	$('#calendar').fullCalendar('refetchEvents'); //重新获取所有事件数据
}
//跳转到指定的日期
function gotoDate(year,month,day){
	$('#calendar').fullCalendar('gotoDate',year,month,day);
}
//默认查看的人员
function initFullCalendar(ids){
	var userId="";
	for(var i=0;i<ids.length;i++){
		userId+=ids[i]+",";
	}
	$("#calendar").fullCalendar('destroy');
	setFullCalendar(userId);
}
//设置日程组件的属性,通过id从后台获取对应的事件源
function setFullCalendar(ids){
	var events = [];
	$('#calendar').fullCalendar({
		defaultView:'agendaDay',
		defaultEventMinutes:'60',
		firstHour:'0',
		height:'310',
		header: false,
		allDaySlot: false,
		editable: true,
		weekMode: 'liquid',
		dragOpacity: {
			agenda: .5,
			'':.6
		},
		titleFormat:{
			month: 'yy年MM月', // September 2013
			week: "MMM月 d日", // Sep 7 - 13 2013
			day: 'dddd' // Tuesday, Sep 8, 2013
		},
		eventDrop: function(event,dayDelta,minuteDelta,allDay,revertFunc) 
		{
			$.post("dragCalendar",
					{id:event.id,daydiff:dayDelta,minudiff:minuteDelta,allDay:allDay},
					function(msg){
	    			}
			);
    	},
		
		eventResize: function(event,dayDelta,minuteDelta,revertFunc) {
			$.post("resizeCalendar",
					{id:event.id,daydiff:dayDelta,minudiff:minuteDelta},
					function(msg){
	    			 
					}
			);
    	},
		
		
		selectable: true,

        events: "getCalendarList?ids="+ids,
        	 
		dayClick: function(date, allDay, jsEvent, view) {
			window.parent.openAddEvent(date,allDay,jsEvent,view);
    	},
		eventClick: function(calEvent, jsEvent, view) {
			window.parent.openEditEvent(calEvent);
		}
	});
}
//格式化日期
Date.prototype.format = function(format)
{
 var o = {
 "M+" : this.getMonth()+1, //month
 "d+" : this.getDate(),    //day
 "h+" : this.getHours(),   //hour
 "m+" : this.getMinutes(), //minute
 "s+" : this.getSeconds(), //second
 "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
 "S" : this.getMilliseconds() //millisecond
 }
 if(/(y+)/.test(format)) 
	 format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));
 for(var k in o)
 	if(new RegExp("("+ k +")").test(format))
 		format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] :("00"+ o[k]).substr((""+ o[k]).length));
 return format;
}
</script>
</head>

<body>

<div id="main" style="width:100%;height:100%;"><!-- width:100%;height:200px; -->
   <div id='calendar' style="width:100%;hight:90%;"></div><!-- width:350px;hight:200px; -->
</div>

</body>
</html>
