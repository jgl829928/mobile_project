var hostIP = 'http://travel.server190.ehecd.com'
var host = "http://travel.server190.ehecd.com/router?method=";
var phoneReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/

function ajax(param) {

    var json ;
    $.ajax({
        url: param.url,
        type: (param.type || "POST"),
        contentType: (param.contentType || "application/x-www-form-urlencoded"),
        dataType: "json",
        async: param.async === false ? false : true,
        data: param.data,
        success: function (res) {
            if (res.code == 0) {
            
                param.successCallback && param.successCallback(res);
                if (this.async == false)
                {
                    json = eval("({" + this.url.split("/").reverse()[0] + ":"+JSON.stringify(res.data?res.data:res)+"})")
                    
                }
            } else {
                go_alert2(res.msg)
            }
            
        }
    })

 return json;
    

 }

//于jqMD5公用的密钥
var jiami= function (A1) {
    var $cg2 = JSON["\x73\x74\x72\x69\x6e\x67\x69\x66\x79"](A1);
    var lmAtS3 = '\x61\x62\x63';
    var iIjIeRlk4 = ["\x5b\x3a\x5d", "\x5b\x2f\x5d", "\x5b\x3f\x5d", "\x23", "\x5b\x5b\x5d", "\x5b\\\x5d\x5d", "\x40", "\x5b\x21\x5d", "\x5b\x24\x5d", " ", "\x5b\x26\x5d", "\x27", "\x5b\x28\x5d", "\x5b\x29\x5d", "\x5b\x2a\x5d", "\x5b\x2b\x5d", "\x5b\x2c\x5d", "\x5b\x3b\x5d", "\x5b\x3d\x5d", "\x5b\"\x5d", "\x5b\x3c\x5d", "\x5b\x3e\x5d", "\x5b\x25\x5d", "\x5b\x7b\x5d", "\x5b\x7d\x5d", "\x5b\x7c\x5d", "\x5b\\\\\x5d", "\x5b\\\x5e\x5d", "\x5b\x7e\x5d", "\x5b\x60\x5d"];
    for (var Gf5 = 0; Gf5 < iIjIeRlk4["\x6c\x65\x6e\x67\x74\x68"]; Gf5++) {
        var b__a6 = new window["\x52\x65\x67\x45\x78\x70"](iIjIeRlk4[Gf5], "\x67");
        $cg2 = $cg2["\x72\x65\x70\x6c\x61\x63\x65"](b__a6, "");
    }
    $cg2 = $cg2["\x74\x6f\x55\x70\x70\x65\x72\x43\x61\x73\x65"]();
    $cg2 = encodeURIComponent($cg2);
    $cg2 = $cg2["\x73\x70\x6c\x69\x74"]("")["\x73\x6f\x72\x74"]()["\x72\x65\x76\x65\x72\x73\x65"]()["\x6a\x6f\x69\x6e"]("");
    return $["\x6d\x64\x35"]($cg2 + lmAtS3)["\x74\x6f\x55\x70\x70\x65\x72\x43\x61\x73\x65"]();
}

//表单序列化
function getFormData(form){
	var string=form.serialize();
	var item_ary=string.split("&");
	item_ary.forEach(function(item,index,ary){
		ary[index]=item.split("=");

	})
	var data={};
	item_ary.forEach(function(item,index,ary){

		if(!data[ary[index][0]]&&ary[index][1])
		{
			data[ary[index][0]]=decodeURIComponent(ary[index][1]);
	
			
		}else if(data[ary[index][0]])
		{
			
			if(data[ary[index][0]] instanceof Array )
			{
				data[ary[index][0]].push(decodeURIComponent(ary[index][1]));	
			}else{
				data[ary[index][0]]=[data[ary[index][0]]];
				data[ary[index][0]].push(decodeURIComponent(ary[index][1]));
			}	
		}

	})
   
	return data

}

/*上传单张头像*/
function upheadImg(form, setting, func) {
  
    form.ajaxSubmit({
        url: "http://115.28.48.78:8092/api/upload/controller?action=uploadimage",
        type: "POST",
        async:false,
        data: { module: setting.module, field: setting.field, appKey: '7GHMK4VF6PQE9T30L5O8W2UCA1SYIRXNJLO1' },//module是图片的路径、field是路径的下一级、appKey是后台给的app钥匙
        success: function (response) {
            var response = eval("(" + response + ")");
            if (response.state == "SUCCESS") {
                page_data.headimg = "http://115.28.48.78:8092/" + response.url;
                typeof func == "function" && func(new_headimg)
              
            }

        },
        error: function (msg) {
   
            go_alert2("此图片上传出错")
        }
    });


};


/*检测登录，参数都不是必须的，参数彼此顺序随意,func 表示验证登陆成功后的回调，url表示验证失败后跳转的指定链接，如果没有url,
只传bool true值则表示失败后跳转登录页，不填写参数则验证函数返回boolean值*/
function checkLogin(func, url, bool) {
    var param_ary = Array.prototype.slice.call(arguments);//arguments 坑爹居然不是数组，要转化成数组
    var login = "";
    var status=""
      $.ajax({
          url: "/Api/Public/check_login",
          type:  "POST",
          contentType:"application/x-www-form-urlencoded",
          dataType: "json",
          async:false,
          success: function (res) {
              if (res.code == 0) {
                  switch (res.data.status)//判断账号状态
                  {
                      case 0:
                          login = false;
                          go_alert2("账号被冻结", "login.html");
                          return false;
                          break;
                      case 2:
                          login = false;
                          go_alert2("未进行实名认证，无权限操作", "login.html");
                          return false;
                          break;
                      case -1:
                          login = false;
                          go_alert2("账号被删除","login.html");
                          return false;
                          break;

                  }
                  if (res.data.auditing == 0)
                  {
                      login = false;
                      go_alert2("实名认证待审核，暂无权限操作");
                      return false;
                  }
                  else if (res.data.auditing == -1)
                  {
                      login = false;
                      go_alert2("实名认证被驳回，无权限操作", "login.html");
                      return false;
                  }

                login = true;
                var ary = param_ary;
                while (ary.length)
                {
                    var param = ary.pop();
                    if (typeof param == "function")
                    {
                        func();
                        break;

                    }
                }
            } else {
                login = false;
                var ary = param_ary;
                while (ary.length) {
                    var param = ary.pop();
                    if (typeof param == "string") {
                        window.location.href = param;
                        break;
                    } else if (typeof param == "boolean" && param) {
                        if (ary.length == 2) {
                            while (ary.length) {
                                var item = ary.pop();
                                if (typeof item == "string") {
                                    window.location.href = item;
                                }
                            }

                        } else if (ary.length == 1) {
                            var item = ary.pop();
                            if (typeof item == "string") {
                                window.location.href = item
                            } else {
                                go_alert("请先登陆！","login.html")
                             
                            }

                        } else {
                            go_alert("请先登陆！", "login.html")
                        }
                    }
                }
            }
        }
      });
      return login;
}

/*获取身份信息*/
function get_UserCon(m_id) {
    var user_con = ""
        ajax({
            url: "/Api/My/memberInfo",
            data:m_id||"",
            async: false,
            successCallback: function (res) {
                if (res.code == 0) {

                    user_con = res.data;

                } else {
                    go_alert(res.msg)

                }
            }
        });
        return user_con;
    
}
/*各种配置*/

var page_data;
function vue_set(json, func) {
    if (checkLogin()) $.extend(json.data, get_UserCon());
    page_data = new Vue({
            el: ".main",
            data: $.extend({
                curr_city: "成都",
                set_para: ["work_style", "city_list", "birth_years", "design_years", "design_style", "service_erea", "hot_words", "money_servce"],
                work_style: [],
                city_list: [],
                birth_years: [],
                design_years: [],
                design_style: [],
                service_erea: [],
                hot_words: [],
                money_servce: [],
            }, json.data || {}),
            methods: $.extend({},json.methods||{}),
            updated: function () {
                //切换城市
                $(".area_nav li").click(function () {
                    $(".area_name").text($(this).text())
                    $(".area_nav").hide()
                });

            },
           

        });

        page_domDo(page_data);
        typeof func == "function" && func(page_data)

}
/*多接口请求返回数据合并*/
function add_VueDate(data_ary) {
    var ini_data = {};
    data_ary.forEach(function (item, index, ary) {

        $.extend(ini_data,item);
    })
    return ini_data;
}

//合并ajax数据
function editData(json,string){
	var vueData=eval(string||"app");
 	for(key in json) 
 	{
 		Vue.set(vueData, key, json[key])
 	}
 }
//VUE初始化后的动作
function page_domDo(obj) {
    var page_data = obj;
    //获取配置
    page_data.set_para.forEach(function (item, index, ary) {
        ajax({
            url: "/Api/Basicset /get_list",
            data: { type: index, page_size: 0 },
            successCallback: function (res) {
                if (res.code == 0 && res.data.list.length) {
                    res.data.list.forEach(function (it, ind, ary) {
                        page_data[page_data.set_para[index]].push(it.name);

                    });

                }
            }
        })

    });

    //获取可选城市列表,配置城市
    $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', function () {
        ajax({
            url: "/Api/Basicset /get_list",
            data: { type: 1 },
            successCallback: function (res) {
                if (page_data.city_list.join(",").indexOf(remote_ip_info.city) >= 0) {
                    page_data.curr_city = remote_ip_info.city
                } else {
                    page_data.curr_city = page_data.city_list[0];
                };
            }
        })
    });

    /*area区域切换显示*/
    $(".area_qh").click(function () {
        $(this).siblings("ul").toggle();
        $(this).parent(".choice_jingyan ").mouseleave(function () {
            $(this).find("ul").hide()
        })
    });
    $(".zxjingyan_xiala").click(function (e) {
        $(e.target).parent().siblings("input").val($(e.target).text());

    })
    $(".area_nav li").click(function () {
        $(".area_name").text($(this).text())
        $(".area_nav").hide()

    });
    $(".nav_a a").click(function () {
        $(this).addClass("color").siblings().removeClass("color")

    });
    /*二维码切换*/
    $(".ios").click(function () {
        $(".erweima_android").hide();
        $(".erweima_ios").show()
    });
    $(".android").click(function () {
        $(".erweima_ios").hide();
        $(".erweima_android").show()
    });
    /*置顶*/
    $("#scroll").click(function () {
        $('body,html').animate({ scrollTop: 0 }, 1000);

        return false;
    })


    /*五星图初始化*/
    var img_url = { filled: "img/slice/start.png", empty: "img/slice/pjstart.png" };
    set_stars($(".w-PLstar"), img_url, 5, 20);

}


//获取url的参数
function GetRequest() {   
   var url = location.search; //获取url中"?"符后的字串   
   var theRequest = new Object();   
   if (url.indexOf("?") != -1) {   
      var str = url.substr(1);   
      strs = str.split("&");   
      for(var i = 0; i < strs.length; i ++) {   
         theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);   
      }   
   }   
   return theRequest;   
}   

//地图加载
//distance ---- boole值，是否显示距离
//start    ---- object，出发地坐标  {"lat":32.320054,"lng":120.620204}
//byWay    ---- array,途径地坐标数组  [{"lat":32.320054,"lng":120.620204}]
//bourn    ---- object，目的地坐标{"lat":32.320054,"lng":120.620204}
function loadMap(){
	//2EX4jzoGjbIGm3eKVOlE0gRwk6ouF24B
//		var map = new BMap.Map("bMap");
//		map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
	
	
	var map = new BMap.Map("bMap");
	//多点定位视图自适应
	var points = [];
	
	//当前定位
	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			var mk = new BMap.Marker(r.point);
			console.log(mk);
			map.addOverlay(mk);
			//地图定位到当前位置
			//map.panTo(r.point);
			
			//地图显示多点自适应
			points.push({"lat":mk.point.lat,"lng":mk.point.lng});
			points = points.concat([{"lat":30.68994285,"lng":104.06792346},{"lat":30.67994285,"lng":104.16792346},{"lat":30.57994285,"lng":104.26792346}]);
			console.log(points);
			var view = map.getViewport(points);
			var mapZoom = view.zoom;
			var centerPoint = view.center;
			map.centerAndZoom(centerPoint, mapZoom);
			map.enableScrollWheelZoom(true);
			
			//计算定位到目的地的距离
			var p1 = new BMap.Point(mk.point.lng, mk.point.lat);
			var p2 = new BMap.Point(104.06792346, 30.68994285);
			var driving = new BMap.DrivingRoute(map, {
				onSearchComplete: function(results){
					if (driving.getStatus() != BMAP_STATUS_SUCCESS){
						return ;
					}
					var plan = results.getPlan(0);
					console.log(plan.getDistance(true));
				}
			});
			driving.search(p1, p2);
			
			//多点渲染
			//起点
			var pt = new BMap.Point(104.06792346, 30.68994285);
			var myIcon = new BMap.Icon("../img/slice/icon-yAddr.png", new BMap.Size(23,26));
			var marker2 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
			map.addOverlay(marker2);              // 将标注添加到地图中
			
			//途经点
			var pt2 = new BMap.Point(104.16792346, 30.67994285);
			var myIcon2 = new BMap.Icon("../img/slice/icon-way.png", new BMap.Size(23,26));
			var marker3 = new BMap.Marker(pt2,{icon:myIcon2});  // 创建标注
			map.addOverlay(marker3);     
			
			//终点
			var pt3 = new BMap.Point(104.26792346, 30.57994285);
			var myIcon3 = new BMap.Icon("../img/slice/map-end.png", new BMap.Size(23,26));
			var marker4 = new BMap.Marker(pt3,{icon:myIcon3});  // 创建标注
			map.addOverlay(marker4);
			
			//创建信息窗口
			var geoc = new BMap.Geocoder();  
			var opts = {
					width : 250,     // 信息窗口宽度
					height: 80,     // 信息窗口高度
					enableMessage:true//设置允许信息窗发送短息
		   		};
			geoc.getLocation(p2, function(rs){
				var addComp = rs.addressComponents;
				console.log(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
				var content = "距离你：123 <br/>我在："+addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
				var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
				map.openInfoWindow(infoWindow,p2); //开启信息窗口
				marker2.addEventListener("click",function(e){
					map.openInfoWindow(infoWindow,p2); //开启信息窗口
				});
			});
			
			
		}
		else {
			alert('failed'+this.getStatus());
		}
	},{enableHighAccuracy: true})
}

function goBack(){
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
        WebViewJavascriptBridge.pageback();
    }
    if (isiOS) {
        history.back();
        //webkit.messageHandlers.pageback.postMessage("");
        //location.href="back.html"
    }
}

//判断端
function switchOS() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
        return 'android';
    }else if (isiOS) {
        return 'ios';
    } else {
        return 'pc';
    }
}

$(document).ready(function(){
    $('header div:first-child, header a:first-child').on('click', function(){
        // history.back()
        goBack()
    })
})

function goBackFunc() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
        WebViewJavascriptBridge.pageback();
    }
    if (isiOS) {
        //history.back();
        try {
            webkit.messageHandlers.pageback.postMessage("");
        }
        catch (e) { }
        //location.href="back.html"
    }
}

//获取个人信息
function getUserInfo() {
    if ((!localStorage.userInfo || localStorage.userInfo == '{}') && !localStorage.wxInfo) {
        location.href = 'login.html';
        return false;
    }
    $.ajax({
        type: 'post',
        url: host + 'member.get',
        data: { iMemberID: localStorage.userInfo ? JSON.parse(localStorage.userInfo).ID : null },
        success: function (res) {
            console.log(res)
            if (!res.success) {
                // if (!res.data) {
                //     go_alert2("用户不存在", function () {
                //         location.href = 'Login.html';
                //     });
                //     return false;
                // }
                if (res.message == "用户已被冻结") {
                    go_alert2("用户已被冻结", function () {
                        location.href = 'login.html';
                    });
                    return false;
                }
                if (res.message == "账号已被冻结") {
                    go_alert2("用户已被冻结", function () {
                        location.href = 'login.html';
                    });
                    return false;
                }
                if (res.iStatus) {
                    go_alert2("用户已被冻结", function () {
                        location.href = 'login.html';
                    });
                    return false;
                }
                if (res.message == '账号审核中，请耐心等待') {
                    go_alert2('账号审核中，请耐心等待', 'login.html')
                }
                if (res.data.bIsReviewed == 0) {
                    go_alert2("账号审核中", function () {
                        location.href = 'login.html';
                    });
                    return false;
                }
            } else {
                localStorage.setItem('userInfo', JSON.stringify(res.data));
            }
        }
    })
}

$(function () {
    var isPageHide = false;
    window.addEventListener('pageshow', function () {
        if (isPageHide) {
            window.location.reload();
        }
    });
    window.addEventListener('pagehide', function () {
        isPageHide = true;
    });
})

if(!localStorage.userInfo){
    localStorage.userInfo = JSON.stringify({})
}


function bindWx(){
    go_confirm({
        //参数有三种配置方式，最简单就是go_alert("你的输出文字")，第二种，go_alert("输出文本"，func确定回调)，第三种go_alert(json) 全面配置
        msg:["账号未绑定微信号，需绑定微信账号才能查看该页面","#000"],
        // title_text:["这是标题文字","#f93"],
        agree_text:["前往绑定","#000"],
        cancel_text:["拒绝","#999"],
        text_align:"left",
        tag_set:false,
        yesFunc:function(){
            // alert("你点击了确定")
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isAndroid) {
                WebViewJavascriptBridge.wxLoginAction()
            }
            if (isiOS) {
                try {
                    webkit.messageHandlers.wxLoginAction.postMessage("")
                }
                catch (e) { }
            }
        },//回调函数,可以不设置，或者false
        noFunc:function(){
            // alert("你点击了取消")
            location.href = "login.html"
        }//回调函数,可以不设置，或者false

    })
}
function bindPhone(){
    go_confirm({
        //参数有三种配置方式，最简单就是go_alert("你的输出文字")，第二种，go_alert("输出文本"，func确定回调)，第三种go_alert(json) 全面配置
        msg:["需要完善身份信息才能查看该页面","#000"],
        // title_text:["这是标题文字","#f93"],
        agree_text:["去完善","#000"],
        cancel_text:["拒绝","#999"],
        text_align:"left",
        tag_set:false,
        yesFunc:function(){
            // alert("你点击了确定")
            location.href = "validatePhone.html"
        },//回调函数,可以不设置，或者false
        noFunc:function(){
            // alert("你点击了取消")
            // location.href = "login.html"
        }//回调函数,可以不设置，或者false
    })
}