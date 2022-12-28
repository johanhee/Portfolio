window.addEventListener("DOMContentLoaded", function(){
	// 1) 페이지 이동 관련
	var scrollT=0;
	var darkN=0;
	var pageN=0;
	var targetY=0;
	var winHalf;
	var categoryFlag=false;

	$(".top_menu .menu li").eq(darkN).addClass("active");

	$(window).scroll(function(){
		scrollT=$(window).scrollTop();

		if(scrollT <= $("#page01").offset().top){
			darkN=0;
		}
		else if(scrollT <= $("#page02").offset().top){
			darkN=1;
		}
		else if(scrollT <= $("#page03").offset().top){
			darkN=2;
		}
		else if(scrollT <= $("#page04").offset().top){
			darkN=3;

			if(Math.floor(scrollT) == $(document).height()-$(window).height()){
				darkN=4;
			}
		}
		else{
			darkN=4;
		}

		$(".top_menu .menu li").removeClass("active");
		$(".top_menu .menu li").eq(darkN).addClass("active");
		$(".mobile .menu li").removeClass("active");
		$(".mobile .menu li").eq(darkN).addClass("active");

		if(darkN != 0){
			$(".top_menu").addClass("dark");
			$(".tabs").addClass("dark");
		}
		else{
			$(".top_menu").removeClass("dark");
			$(".tabs").removeClass("dark");
		}

		if(scrollT > winHalf){
			$("#header .Resume").addClass("active");
		}
		else{
			$("#header .Resume").removeClass("active");
		}

		if(categoryFlag) return;

		if(scrollT <= $("#page01").offset().top-winHalf){
			pageN=0;
		}
		else if(scrollT <= $("#page02").offset().top-winHalf){
			pageN=1;
		}
		else if(scrollT <= $("#page03").offset().top-winHalf){
			pageN=2;
		}
		else if(scrollT <= $("#page04").offset().top-winHalf){
			pageN=3;
		}
		else{
			pageN=4;
		}

		if(pageN == 0){
			$("#header").addClass("active");
		}
		else{
			$("#page0"+pageN).addClass("active");
			$("#page01 .inner").addClass("active");

			if(pageN == 4){
				categoryFlag=true;
			}
		}
	});

	// 2) 화면 크기 조정 관련
	$(window).resize(function(){
			winHalf=$(window).height()/2;
	});

	function init(){
		$("#header").addClass("active");
		$("#page0"+pageN).addClass("active"); 
		$("#page01 .inner").addClass("active");
	}
	init();

	$(window).trigger("resize");
	$(window).trigger("scroll");

	// 3) 탭 이동 관련
	$(".tabs").click(function(e){
		e.preventDefault();
		$("body").toggleClass("fixed");
		$(this).toggleClass("active");
		$(".floating_menu").toggleClass("active");
	});
	$(".top_menu .menu li").click(function(e){
		e.preventDefault();
		darkN=$(this).index();

		if(darkN == 0){
			targetY=0;
		}
		else{
			targetY=$("#page0"+darkN).offset().top+2;
		}
		$("html").animate({scrollTop:targetY}, 500);
	});
	$(".mobile .menu li").click(function(e){
		e.preventDefault();
		darkN=$(this).index();

		$("body").removeClass("fixed");
		$(".tabs").removeClass("active");
		$(".floating_menu").removeClass("active");

		if(darkN == 0){
			targetY=0;
		}
		else{
			targetY=$("#page0"+darkN).offset().top+1;
		}

		$("html").delay(500).animate({scrollTop:targetY}, 500);
	});

	// 4) Project 효과
	var projectN=0;

	$(".project:first").addClass("active");

	$(".project .title_area").click(function(e){
		e.preventDefault();
		var project=$(this).parents(".project");

		if(projectN != project.index()){
			ptojectN=project.index();
			$(".project").removeClass("active");
			project.addClass("active");

			var projectY=$(this).offset().top-60;
			$("html").animate({scrollTop: projectY}, 800);
		}
	});

	// 5) 비디오 구현 관련
	var videoUrl=["video1", "video2"];
	var videoTotal=videoUrl.length-1;
	var videoN=0;
	var videoPath="";
	var video=document.getElementById("top_video");
	video.muted=true;

	function videoDimmed(){
		$(".video video").hide().css({opacity:0});

		setTimeout(function(){
			$(".video video").show().animate({opacity:1}, 200, function(){
				video.play(); 
			});
		}, 200); 
	}

	video.addEventListener("loadeddata", function(){
		videoDimmed();
		$(".account .current").text(videoN+1);
	});
	video.addEventListener("ended", function(){
		if(videoN < videoTotal){
			videoN+=1;
		}
		else{
			videoN=0;
		}

		video.pause();
		videoPath="source/"+videoUrl[videoN]+".mp4";
		$("#top_video").attr({src: videoPath});
		videoDimmed();
		
	});
	$(".controller .prev").click(function(e){
		e.preventDefault();

		if(videoN > 0){
			videoN-=1;
		}
		else{
			videoN=videoTotal;
		}

		video.pause();
		videoPath="source/"+videoUrl[videoN]+".mp4";
		$("#top_video").attr({src: videoPath});
	});
	$(".controller .next").click(function(e){
		e.preventDefault();

		if(videoN < videoTotal){
			videoN+=1;
		}
		else{
			videoN=0;
		}

		video.pause();
		videoPath="source/"+videoUrl[videoN]+".mp4";
		$("#top_video").attr({src: videoPath});
	});
});