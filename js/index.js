$(function(){
	
	$(".tab div").each(function(i){
		$(this).on("click",function(){
			$("#s-movie").val("");
			if($(this).hasClass("active") == false){
				$(".tab div").toggleClass("active");
				if($(this).hasClass("s-tab")){
					$("#s-movie").attr("placeholder","请输入影视名称");
				}else{
					$("#s-movie").attr("placeholder","请输入城市名");
				}
			}
		})
	})
	
	$("#s-Btn").on("click",function(){
		if($("#s-movie").val() == ""){
			alert("输入信息不能为空");
		}else{
	//		if($(".s-tab").hasClass("active")){
	//			影视接口   
	//http://op.juhe.cn/onebox/movie/video?key=e8ce038ddb7af314077594885ebd3172&q=
				window.location.href="movieResult.html#movie="+$("#s-movie").val();
	//		}else{
	//			城市影讯接口
	//http://op.juhe.cn/onebox/movie/pmovie?key=e8ce038ddb7af314077594885ebd3172&city=
	//			window.location.href="movieCity.html#city="+$("#s-movie").val();
	//		}
		}
	})
})