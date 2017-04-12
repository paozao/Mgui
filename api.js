/*!
 * 
 * 接口 API
 * 
 * 功能列表：（例子）
 * 1 - 基础配置
 * 		1.1 -	定义主域名
 * 		1.2 - 	定义窗口打开时动画效果参数
 * 2 - 首页
 * 
 * 99 - 构建公共方法
 * 		99.1 -	构建远程AJAX路径(POST)
 * 		99.2 -	构建远程AJAX路径(GET)
 * 		99.3 -	跳转本地页面方法
 * 		99.4 - 	跳转线上页面方法
 * 		99.5 - 	查询元素是否有指定类
 * 		99.6 - 	为元素添加指定类
 * 		99.7 - 	为元素删除指定类
 * Use it:
 * >API.sayFuck();
 * 
 * ps: 模仿 jQuery库结构实现，方便上游灵活使用
 * 
 * Date: 2017-03-20
 */
(function() {
	//  var w = window, doc = document;
	var api = function() {
		return new api.prototype.init();
	}
	//仅供测试
	api.sayFuck = function() {
		console.error('fuck api!!!');
	}
	api.init = function() {
		//初始化主题和强调色
		if(localStorage.getItem('primary')){
			api.addClass(document.querySelector('body'), 'mdui-theme-primary-' + localStorage.getItem('primary'));
		}else{
			api.addClass(document.querySelector('body'), 'mdui-theme-primary-indigo');
		}
		if(localStorage.getItem('accent')){
			api.addClass(document.querySelector('body'), 'mdui-theme-accent-' + localStorage.getItem('accent'));
		}else{
			api.addClass(document.querySelector('body'), 'mdui-theme-accent-pink');
		}
		if(localStorage.getItem('layout')){
			api.addClass(document.querySelector('body'), 'mdui-theme-layout-dark');
		}
	}
	/*1 - 基础配置*/
	//1.1定义主域名
	api.host = 'http://127.0.0.1:3010/api/'; 
	//1.2定义窗口打开时动画效果参数
	api.webviewStyles = {
		show: {
			autoShow: true, //页面loaded事件发生后自动显示，默认为true
			aniShow: 'pop-in', //页面显示动画，默认为”slide-in-right“；
			duration: 300 //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
		},
		waiting: {
			autoShow: false, //自动显示等待框，默认为true
		},
		styles: {
			hardwareAccelerated: true
		}
	}

	/*2 - 首页*/
	
	/*99 - 构建公共方法*/
	//99.1构建远程AJAX路径(POST)
	function postJson(_api, _data, _cb) {
		var _url = api.host + _api;
		var _f = _cb && typeof _cb === "function" ? _cb : function() {};
		var _d = _data;
		if(_data && typeof _data === "function") {
			_d = {};
			_f = _data;
		}
		mui.ajax(_url, {
			data: _d,
			dataType: 'json',
			type: 'post',
			timeout: 5000,
			success: function(res) {
				_f(res);
			},
			beforeSend: function() {
				// loading
			},
			complete: function() {
				// end loading
			},
			error: function(xhr, type, errorThrown) {
				//异常处理
				mui.toast('服务器请求出错，请重新刷新页面');
				console.debug(xhr, type, errorThrown);
			}
		});
	}

	//99.2构建远程AJAX路径(GET)
	function getJson(_api, _data, _cb) {
		var _url = api.host + _api;
		var _f = _cb && typeof _cb === "function" ? _cb : function() {};
		var _d = _data;
		if(_data && typeof _data === "function") {
			_d = {};
			_f = _data;
		}
		mui.ajax(_url, {
			data: _d,
			dataType: 'json',
			type: 'get',
			timeout: 5000,
			success: function(res) {
				_f(res);
			},
			beforeSend: function() {
				// loading
			},
			complete: function() {
				// end loading
			},
			error: function(xhr, type, errorThrown) {
				//异常处理
				mui.toast('服务器请求出错，请重新刷新页面');
				console.log(JSON.stringify(type));
			}
		});
	}
	//99.3跳转本地页面方法
	api.openWindow = function(url, id, extras) {
		if(url == undefined || url == '' || id == undefined || id == '') {
			console.error('哥，url和id不能为空啊');
			return false;
		}
		if(extras == undefined) {
			extras = api.webviewStyles;
		} else {
			var newStyles = api.webviewStyles;
			newStyles.extras = extras;
			extras = newStyles;
		}
		mui.openWindow(url, id, extras);
	}
	//99.4跳转线上页面方法
	api.openWeb = function(url,title) {
		if(title == undefined || title == '' || url == undefined || url == '') {
			console.error('哥，title和url不能为空啊');
			return false;
		}
		var newStyles = api.webviewStyles;
		newStyles.extras = {
			title: title,
			url: url
		};
		mui.openWindow('windows.html', 'windows.html', newStyles);
	}
	
	//99.5查询元素是否有指定类
	api.hasClass = function(obj, cls) {
		return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	}
	//99.6为元素添加指定类
	api.addClass = function(obj, cls) {
		if(!api.hasClass(obj, cls)) obj.className += " " + cls;
	}
	//99.7为元素删除指定类
	api.removeClass = function(obj, cls) {
		if(api.hasClass(obj, cls)) {
			var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
			obj.className = obj.className.replace(reg, ' ');
		}
	}
	// 接口定义状态
	api.SUCC = true;
	api.FAIL = false;

	window.API = api;
	
	
})();