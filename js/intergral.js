//获取页面的高度
bodysize();
//积分系统
var intergralcount = $('.intergral-box .remain .intergral-count').text();
//优惠券系统
var countdown = $('.intergral-box .remain .countdown-paper').text()
//图片切换
var index = 0;
//图片切换定时器
var slideshowinterval;
//轮播图
//根据图片的数量，自动生成圆圈的个数
$('.circle-box').empty();
var circlecount = $('.slideshow-part .img-box img').length;
for (var i = 1 ; i <= circlecount; i++){
	var circleli = `<li>${i}</li>`
	$('.circle-box').append(circleli);
}
//正常轮播时
slideshow();
function slideshow(){
	slideshowinterval = setInterval(function(){
		$('.slideshow-part .img-box img').eq(index).siblings('img').fadeOut(100)
		$('.circle-box li').eq(index).siblings().removeClass('active')
		$('.circle-box li').eq(index).addClass('active')
		$('.slideshow-part .img-box img').eq(index).fadeIn(4000);
		index ++;
		if(index == 3){
			index = 0
		}
	},4400)
}
//圆点移入事件
$('.circle-box li').mouseenter(function(){
	index = $(this).index();
	clearInterval(slideshowinterval);
	$(this).siblings().removeClass('active');
	$(this).addClass('active');
	$('.slideshow-part .img-box img').css({
		display : 'none',
		opacity : 1
	})
	$('.slideshow-part .img-box img').eq(index).css({
		display: 'block',
	})
})
//鼠标移出圆点定时器重启
$('.circle-box li').mouseleave(function(){
	slideshow();
})


//所有的商品盒子添加移入事件
$('.exchange-commodity-box').mouseenter(function(){
	$(this).addClass('active');
})
$('.exchange-commodity-box').mouseleave(function(){
	$(this).removeClass('active');
})
//优惠券兑换
$('.count-paper-btn').click(function(){
	var conslut = confirm('是否兑换优惠券')
	if(conslut == true ){
		intergralcount = intergralcount -  $(this).children('.how-intergral').text()
		if(intergralcount >= 0){
			countdown ++;
			$('.intergral-box .remain .countdown-paper').text(countdown);
			$('.intergral-box .remain .intergral-count').text(intergralcount)
			$(this).css({
			background:'#999999'
			})
			$(this).text('已兑换')
			$(this).unbind()
			}
		else{
			intergralcount = intergralcount + parseInt($(this).children('.how-intergral').text() ) 
			alert('积分不够，兑换失败')
		}
	}
	console.log(intergralcount);
})
//商品兑换
$('.exchange-btn-yes').click(function(){
	var conslut = confirm('是否兑换该商品')
	if(conslut == true){
		intergralcount = intergralcount - 1000
		if(intergralcount >= 0){
			$('.intergral-box .remain .intergral-count').text(intergralcount);
			$(this).removeClass('active');
			$(this).siblings('.exchange-btn-no').addClass('active').val('已兑换')
			$(this).unbind()
		}
		else{
			intergralcount = intergralcount + 1000
			alert('积分不够，兑换失败')
		}
	}
})
//签到之后变成已签到
$('.sign-in').click(function(){
	var conslut = confirm('是否签到')
	if(conslut == true){
	$(this).css({background : '#999999',})		
	}
	$(this).unbind()
})

