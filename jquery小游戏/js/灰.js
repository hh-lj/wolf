$(function(){
	//点击规则，将规则显示出来
	$(".rules").click(function(){
		$(".rule").stop().fadeIn(100);
	})
	//点击规则中的关闭按钮，规则关闭
	$(".stop").click(function(){
		$(".rule").stop().fadeOut(100);
	})
	//点击开始按钮，开始按钮消失
	$(".btn").click(function(){
		$(this).stop().fadeOut(100);
		//调用进度条
		progress();
		wolfA()
	})
	//创建一个减少进度条的方法
	function progress(){
		//设置进度条的长度为满的状态
		$(".prograss").css({
			width:180
		})
		//设置一个定时器，让进度条定时减少
		var time=setInterval(function(){
			//拿到当前的进度条的宽
			var Pwidth=$(".prograss").width();
			//将原有的进度条减一
			  Pwidth-=1;
			//将当前进度条的宽度赋值给原来的进度条
			$(".prograss").css({
				width:Pwidth
			})
			//当进度条的宽度变为0时，将重新开始的页面显示出来
			if(Pwidth==0){
				//关闭定时器
				clearInterval(time);
				$(".mask").stop().fadeIn(100);
				stopA()
			}
		},6000);
	}
	//当点击重新开始按钮时候，进度条宽度变为原来的长度
	$(".restart").click(function t1(){
		$(".mask").stop().fadeOut(100);
		progress();
		wolfA();
		$(".score").text(0)
	});
	var wTime;
	function wolfA(){
		//定义两个数组，存放灰太狼和小灰灰的图片
		var wolf1=['./img/h0.png','./img/h1.png','./img/h2.png','./img/h3.png',
					'./img/h4.png','./img/h5.png','./img/h6.png','./img/h7.png','./img/h8.png','./img/h9.png'];
		var wolf2=['./img/x0.png','./img/x1.png','./img/x2.png','./img/x3.png',
					'./img/x4.png','./img/x5.png','./img/x6.png','./img/x7.png','./img/x8.png','./img/x9.png'];
		//定义一个数组存放九个位置
		var arrP=[
			{left:"100px",top:"115px"},{left:"20px",top:"160px"},{left:"190px",top:"142px"},
			{left:"105px",top:"193px"},{left:"19px",top:"221px"},{left:"202px",top:"212px"},
			{left:"120px",top:"275px"},{left:"30px",top:"295px"},{left:"209px",top:"297px"}
			];
		//创建一张图片
		var wolfImg=$("<img src='' class='wolfImg'/>" );
		//随机获取图片位置
		var posIndex=Math.round(Math.random()*8);
		//设置图片输入的位置
		wolfImg.css({
			position:"absolute",
			top:arrP[posIndex].top,
			left:arrP[posIndex].left
		})
		//随机获取数组
		var wolfType=Math.round(Math.random())==0?wolf1:wolf2;
		//设置一个定时器，每个一段时间就换一张图片
		window.firstIndex=0;
		window.endIndex=5
		wTime=setInterval(function(){
				if(firstIndex>endIndex){
					clearInterval(wTime);
					wolfImg.remove();
					wolfA()
				}
			//获取图片
			wolfImg.attr("src",wolfType[firstIndex]);
			firstIndex++;
		},300);
		//将图片显示在界面上
		$(".container").append(wolfImg);
		gameRules(wolfImg);
	}
	function stopA(){
		$(".wolfImg").remove();
		clearInterval(wTime);
	}
	function gameRules(wolfImg){
		wolfImg.one("click",function(){
			//修改索引
			window.firstIndex=5;
			window.endIndex=9;
			//拿到图片位置
		var $src=	$(this).attr("src")
		//判断图片中是否含有h，若有则表示该图片为灰太狼图片，否则为小灰灰
		var flag=$src.indexOf("h")>=0
		 if(flag){
			 //假如是灰太狼，则分数加10
			 $(".score").text(parseInt($(".score").text())+10)
		 }else{
			 //分数减10
			 $(".score").text(parseInt($(".score").text())-10)			
		 }
		});
	}
});