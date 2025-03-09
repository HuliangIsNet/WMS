layui.define(['jquery', 'element', 'table', "apis"], function (exports) {
	"use strict";

	/**
	 * 常用封装类
	 * */
	var MOD_NAME = 'common',
		$ = layui.jquery,
		table = layui.table,
		element = layui.element,
		apis = layui.apis;

	var common = new function () {

		/**
		 * 获取当前表格选中字段
		 * @param obj 表格回调参数
		 * @param field 要获取的字段
		 * */
		this.checkField = function (obj, field) {
			let data = table.checkStatus(obj.config.id).data;
			if (data.length === 0) {
				return "";
			}
			let ids = "";
			for (let i = 0; i < data.length; i++) {
				ids += data[i][field] + ",";
			}
			ids = ids.substr(0, ids.length - 1);
			return ids;
		}
		this.GetQueryString = function (name) {
			var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
			var r = window.location.search.substr(1).match(reg);
			if (r != null) {
				return unescape(r[2]);
			}
			return null;
		}
		this.RemoveArray = function (array, id) {
			var index = -1;
			for (var i = 0; i < array.length; i++) {
				if (array[i].id == id) {
					index = 1;
				}
				break;
			}
			array.splice(index, 1);
		}
		/**
		 * 当前是否为与移动端
		 * */
		this.isModile = function () {
			if ($(window).width() <= 768) {
				return true;
			}
			return false;
		}

		this.isNull = function (data) {
			if (data === null || data === '' || data === undefined || data === 'undefined')
				return true;
			else
				return false;
		}

		//屏幕可工作区域高度
		this.setHeight = function () {
			var height = this.GetQueryString("height") - 153;
			if (height <= 0) {
				$(".layui-card-body").css("height", "auto");
			}
			else {
				$(".layui-card-body").css("height", height);
			}
		}

		/**
		 * 获取唯一标识列
		 * @returns GUID
		 */
		this.GetGuid = function () {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {

				var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);

				return v.toString(16);

			});

		}

		/**
		 * 提交 json 数据
		 * @param data 提交数据
		 * @param href 提交接口
		 * @param table 刷新父级表
		 * 
		 * */
		this.submit = function (data, href, table, callback) {
			$.ajax({
				url: href,
				data: JSON.stringify(data),
				dataType: 'json',
				contentType: 'application/json',
				type: 'post',
				success: callback != null ? callback(result) : function (result) {
					if (result.success) {
						layer.msg(result.msg, { icon: 1, time: 1000 }, function () {
							parent.layer.close(parent.layer.getFrameIndex(window.name));//关闭当前页
							parent.layui.table.reload(table);
						});
					} else {
						layer.msg($.i18n.prop(result.msg), { icon: 2, time: 1000 });
					}
				}
			})
		}

		/**
		 * get 提交数据
		 * @param {回调函数} callback
		 * @param {连接} href 
		 * @param {参数} data  
		 */
		this.get = function (callback, href, data = {}) {
			$.ajax({
				url: href,
				data: data,
				dataType: 'json',
				contentType: "application/json",
				type: 'get',
				async: false,
				success: function (result) {
					if (!result.isSuccess) {
						layer.alert(result.msg, { icon: 2 });
					} else {
						callback(result.data);
					}
				}
			})
		}
		/**
		 * post 提交数据
		 * @param {回调函数} callback
		 * @param {连接} href 
		 * @param {参数} data  
		 * @param {提交方式} contentType
		 */
		this.post = function (callback, href, data = {}, contentType = 'application/json;charset=utf-8;') {
			$.ajax({
				url: href,
				data: JSON.stringify(data),
				dataType: 'json',
				contentType: contentType,
				type: 'post',
				async: false,
				success: function (result) {
					if (!result.isSuccess) {
						console.log($.i18n.prop(result.msg));
						layer.alert($.i18n.prop(result.msg), { icon: 2 });
					} else {

						if (result.msg != "操作成功") {
							callback(result);
						}
						else {
							callback(result.data);
						}

					}
				}
			})
		}

		this.GetState = function () {
			var state = sessionStorage.getItem("myState");
			if (state == null || state == undefined || state == "undefined") {
				this.get(function (res) {
					state = JSON.stringify(res);
					sessionStorage.setItem("myState", state);
				}, apis.GetState);
			}
			state = JSON.parse(state);
			return state;
		}
		this.GetStatus = function () {
			var status = sessionStorage.getItem("myStatus");
			if (status == null || status == undefined || status == "undefined") {
				this.get(function (res) {
					status = JSON.stringify(res);
					sessionStorage.setItem("myStatus", status);
				}, apis.GetStatus);
			}
			status = JSON.parse(status);
			return status;
		}
		this.GetUser = function () {
			var user = sessionStorage.getItem("CurrentUser");
			user = JSON.parse(user);
			return user;
		}
		this.GetTakeType = function () {
			var obj = sessionStorage.getItem("TakeType");
			if (this.isNull(obj)) {
				this.get(function (res) {
					obj = JSON.stringify(res);
					sessionStorage.setItem("TakeType", obj);
				}, apis.GetTakeType);
			}
			obj = JSON.parse(obj);
			return obj;
		}
		this.GetTakeMode = function () {
			var obj = sessionStorage.getItem("TakeMode");
			if (this.isNull(obj)) {
				this.get(function (res) {
					obj = JSON.stringify(res);
					sessionStorage.setItem("TakeMode", obj);
				}, apis.GetTakeMode);
			}
			obj = JSON.parse(obj);
			return obj;
		}
		this.GetTakeStatus = function () {
			var obj = sessionStorage.getItem("TakeStatus");
			if (this.isNull(obj)) {
				this.get(function (res) {
					obj = JSON.stringify(res);
					sessionStorage.setItem("TakeStatus", obj);
				}, apis.GetTakeStatus);
			}
			obj = JSON.parse(obj);
			return obj;
		}
	}


	var user = common.GetUser();

	if (window.location.href.lastIndexOf('login.html') < 0 && window.location.href.lastIndexOf('preview.html') < 0 && (user == null || user == undefined || user == "undefined")) {
		layer.msg('未登录，请先登录',
			{
				time: 1500,
				icon: 2,
				end: function () {
					top.window.location.href = '../../../login.html';
				}
			});

		return;
	}

	exports(MOD_NAME, common);
});
