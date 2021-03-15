var adJson = [
	
	
	
	/* 单个横幅开始 */
	{
		type:"one",
		ad:{
			img:"https://static.115z.com/img/115ad/zzzz8.jpg",
			href:"",
		}
	},
	/* 单个横幅结束 */
	
	
	
	
	/* 双个横幅开始 */
	{
		type:"two",
		ad1:{
			img:"https://static.115z.com/img/115ad/sq.png",
			href:"http://www.57sk.cn/",
		},
		ad2:{
			img:"https://static.115z.com/ueditor/php/upload/image/20191129/1575009885778093.jpg",
			href:"http://xf.886ka.cn/",
		}
	},
	/* 双个横幅结束 */
	
	
	
	
	
];

























if(location.pathname=="/"||location.pathname=="/index.html"){
	if(getCookie("ad")!="noShow"){
		$("body").append('<a class="closeAd" style="position: absolute;top: 408px;width: 21px;text-align: center;background: #ff8549;color: #FFF!important;padding: 7px 0px;font-size: 14px;cursor: pointer;border-radius: 0px 3px 3px 0px;">关闭广告</a>');
	}else{
		$("body").append('<a class="closeAd" style="position: absolute;top: 408px;width: 21px;text-align: center;background: #ff8549;color: #FFF!important;padding: 7px 0px;font-size: 14px;cursor: pointer;border-radius: 0px 3px 3px 0px;">打开广告</a>');
	}
}
$("body").on("click",".closeAd",function(){
	if($(this).html()=="关闭广告"){
		layer.open({
			type: 0,
			shadeClose: false,
			title:"提示",
			tipsMore: true,
			skin: 'atuikeLayerSkin1',
			content: "确定要关闭广告吗？可能会失去更多精彩哦！",
			btn: ["确认", "取消"],
			yes: function (e) {
				setCookie("ad","noShow","d30");
				location.reload();
			}
		});
	}else{
		setCookie("ad","","d30");
		location.reload();
	}
});

/*弹出右下角APP广告*/
if(location.pathname=="/"||location.pathname=="/index.html"){
	//if(getCookie("qqqqun")!="no"){
		var qqqunurl = "https://www.115z.com/appdown/";
		$("body").append('<style>@media screen and (max-width: 1900px) {.qqqun{display:none;}}.qqqun{width:249px;height:180px;background:#FFF;position:fixed;bottom:0;right:0;z-index:9999;}.qqtitle{background: #5298ff;height:37px;line-height:37px;color:#FFF;padding:0px 16px;}.qqtitle img{width:18px;height:18px;margin-right:7px;vertical-align: middle;margin-top:-2px;}		.qqtitle a{color:#FFF;float:right;cursor:pointer;font-size:15px;height:37px;line-height:37px;}.qqqcontent{height:109px;padding:12px 12px;display:block;}		.qqqfooter{height:34px;line-height:34px;border-top:1px solid #F6F6F6;}		.qqqfooter a{float:right;margin-right:20px;color: #5298ff;font-size: 12px;}		.qqqcontent .left{width:70px;height:70px;}		.qqqcontent .right{margin-left:12px;width:calc(100% - 70px - 12px);}		.qqqcontent .right h3{font-size:14px;color:#333;height:20px;overflow:hidden;width:100%;}.qqqcontent .right p{color:#9d9d9d;font-size:12px;margin-top:4px;line-height:20px;height:60px;overflow:hidden;width:100%;}</style>\
		<div class="qqqun">\
		<div class="qqtitle"><img src="//static.115z.com/img/tengxun.png" />115资源APP<a class="iconfont">&#xe849;</a></div>\
		<a class="qqqcontent" href="'+qqqunurl+'" target="_blank">\
		<img class="left" src="//static.115z.com/img/app-ewm.png" />\
		<div class="right"><h3>最新游戏资源抢先看</h3><p>努力打造为用户提供优质服务的平台，让我们的生活更加精彩</p></div>\
		</a>\
		<div class="qqqfooter"><a href="'+qqqunurl+'" target="_blank">立即下载</a></div>\
		</div>');
		$("body").on("click",".qqtitle a",function(){
			$(".qqqun").remove();
			//setCookie("qqqqun","no","d30");
		});
	//}
}
/*APP广告结束*/


/*判断能不能加广告*/
if(getCookie("ad")!="noShow"){
	/*首页添加广告*/
	if(location.pathname=="/"||location.pathname=="/index.html"){
		var html = "";
		for(var i = 0;i<adJson.length;i++){
			console.log(adJson[i])
			if(adJson[i].type=='one'){
				html+='<a href="'+adJson[i].ad.href+'" style="float:left;width:100%;height:70px;'+(i==0?'':'margin-top:6px')+'" target="_blank">\
					<img src="'+adJson[i].ad.img+'" style="display:block;width:100%;height:100%;" />\
				</a>';
			}else{
				html+='<a href="'+adJson[i].ad1.href+'" style="float:left;width:calc((100% - 6px) / 2);'+(i==0?'':'margin-top:6px;')+'height:70px;" target="_blank">\
					<img src="'+adJson[i].ad1.img+'" style="display:block;width:100%;height:100%;" />\
				</a>\
				<a href="'+adJson[i].ad2.href+'" style="float:left;width:calc((100% - 6px) / 2);'+(i==0?'':'margin-top:6px;')+'height:70px;margin-left:6px;" target="_blank">\
					<img src="'+adJson[i].ad2.img+'" style="display:block;width:100%;height:100%;" />\
				</a>';
			}
		}
		$(".hot-top").after('<div class="go115 layui-clear" style="margin-bottom:13px;background:#FFF;padding:6px;">'+html+'</div>');
		
		/*横幅广告*/
		if(getCookie("outerCountry")=="true"){
			addAd();
		}else{
			//$.ajax({url:'https://api.ip138.com/query/?token=&datatype=jsonp&callback=isip',dataType:'jsonp'});
		}
	}
	
	if(location.pathname.indexOf("person")==-1){
		$(".logo-right-decation").attr("onclick","location = '/html/10818.html'").attr("src","/img/115ad/10010.png").css({"cursor":"pointer","height":"54px","margin":"27px 0px 27px 100px"});
	}
}


function addAd(){
	if(location.pathname=="/"||location.pathname=="/index.html"){
		//$(".go115").prepend('<a href="tencent://Message/?Uin=2515304286&websiteName=www.qq.com&Menu=yes" style="float:left;width:100%;height:70px;margin-bottom:10px;" target="_blank"> <img src="//static.115z.com/img/115ad/66.gif" style="display:block;width:100%;height:100%;" /> </a>');
	}
}


function isip(ret){
	if(ret.ret=="ok" && ret.data){
		var arr = ['美国','日本','柬埔寨','香港','菲律宾','韩国','澳大利亚','英国','加拿大','德国','法国','荷兰','巴西','俄罗斯','意大利','印度','老挝','新加坡','波兰','挪威','西班牙','越南','泰国','南非','马来西亚'];
		for(var i = 0;i<arr.length;i++){
			if(ret.data.toString().indexOf(arr[i])>=0){
				addAd();
				setCookie("outerCountry","true","d30");
				return;
			}
		}
	}
}







