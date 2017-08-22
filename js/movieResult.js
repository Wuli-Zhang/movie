//搜索影视结果
//http://op.juhe.cn/onebox/movie/video?key=e8ce038ddb7af314077594885ebd3172&q=
$(function(){
	//获取#后面的url#movie=123
	var $url = window.location.hash;
	$url = $url.substr(7);
//	console.log($url);
	$.ajax({
		type:"get",
		dataType:"jsonp",
		url:"http://op.juhe.cn/onebox/movie/video?key=e8ce038ddb7af314077594885ebd3172&q="+$url,
		async:true,
		success:function(data){
			console.log(data);
			
			if(data.error_code == 0){
				$(".movie-cover").attr("src",data.result.cover);
				$(".movie-title").text(data.result.title);
				$(".movie-year").text(data.result.year);
				$(".movie-dir").text("导演："+data.result.dir);
				$(".movie-tag").text(data.result.tag);
				$(".movie-area").text(data.result.area);
				if(data.result.rating ==null){
					$(".movie-rating").text("0");
				}else{
					$(".movie-rating").text(data.result.rating);
				}
				$(".movie-act").text("演员:"+data.result.act);
				$(".movie-desc").append("剧情介绍:<p>"+data.result.desc+"</p>");
				//超出显示为省略号
				if($(".movie-desc p").text().length > 300){
					$(".movie-desc p").text($(".movie-desc p").text().substring(0,300));
					$(".movie-desc p").html($(".movie-desc p").html()+'...<a>详细</a>');
				}
				
				zz();
				function zz(){
					$(".movie-desc p a").click(function(){
						
							$(".movie-desc p").text(data.result.desc);
							$(".movie-desc p").html($(".movie-desc p").html()+'...<a>收起</a>');
							$(".movie-desc p a").click(function(){
								$(".movie-desc p").text($(".movie-desc p").text().substring(0,300));
								$(".movie-desc p").html($(".movie-desc p").html()+'...<a>详细</a>');
								return zz();
							})
					})
				}
				
				
				if(data.result.vdo_status == "none"){
					$s = $("<span>");
					$s.addClass("play");
					$s.text("该片无资源");
					$s.css("cursor","default");
					$(".movie-play").append($s);
				}else{
					for(var i in data.result.playlinks){
						$s = $("<span>");
						$s.addClass("play");
						if(data.result.playlinks[i] == null){
							$s.css({"background":"#333","color":"#fff","cursor":"wait"});
							$s.addClass("play");
							$s.append(i);
	//						console.log(data);
						}else{
							$a = $("<a >");
							$a.attr("href",data.result.playlinks[i]);
							$a.attr("target","_blank");
							$a.append(i);
							$s.append($a);
						}
						$(".movie-play").append($s);
						
					};
					
				}
				for(var j=0;j<data.result.act_s.length;j++){
					
					$dl = $("<dl>");
					$dt = $("<dt>");
					$dd = $("<dd>");
					$img = $("<img/>");
					$img.attr("src",data.result.act_s[j].image);
					$dd.text(data.result.act_s[j].name);
					$dt.append($img);
					$dl.append($dt).append($dd);
					$(".movie-mainAct").append($dl);
				}
				
				for(var j=0;j<data.result.video_rec.length;j++){
					$dl = $("<dl>");
					$dt = $("<dt>");
					$dd = $("<dd>");
					$img = $("<img/>");
					$a = $("<a>");
					$a.attr("href","javascript:;");
//					$a.attr("target","_blank");
					$img.attr("src",data.result.video_rec[j].cover);
					$dd.text(data.result.video_rec[j].title);
					$dt.append($img);
					$a.append($dt);
					$a.append($dd);
					$dl.append($a);
					
					$(".maybe").append($dl);
					
				}
				$(".maybe dl").on("click",function(){
					var $thisname=$(this).children().children("dd").text();
					
					$.ajax({
						type:"get",
						dataType:"jsonp",
						url:"http://op.juhe.cn/onebox/movie/video?key=e8ce038ddb7af314077594885ebd3172&q="+$thisname,
						async:true,
						success:function(data){
							console.log(1);
							window.open("movieResult.html#movie="+$thisname);
						}
					});
				})
			}else{
				//未找到影片
				console.log(1);
				$(".show").css("display","none");
				$(".nothing").css("display","block");
			}
		},
		error:function(data){
			
		}
	});
	
	$("#s-btn").on("click",function(){
//		console.log($("#s-movie").val());
		window.open("movieResult.html#movie="+$thisname);
						
	})
})
