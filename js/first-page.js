//对接后台的函数
var request = new XMLHttpRequest();
var url = 'http://127.0.0.1:3001/'
//调用server1里面轮播图的图片
	request.open('GET',url + 'getBanner',true)
	request.send(null);
	request.onreadystatechange = function(){
		if(request.readyState == 4 && request.status == 200){
			var result = JSON.parse(request.responseText)
			
			$('.lunbo-ul').empty();
			for(var i = 0; i < result.list.length;i++ ){
				var img = document.createElement('img');
				img.setAttribute('class','lunbo-li');
				img.setAttribute('src', url + result.list[i].img);
				
			   	document.getElementsByClassName('lunbo-ul')[0].appendChild(img)	
			}
			lunbofunction();
		}
	}
	
//调用数据库里面商品推荐，
var commodityinfo1 = new XMLHttpRequest();
commodityinfo1.open('GET',url + 'lists?id=1')
commodityinfo1.send('{"id" : 1}')
commodityinfo1.onreadystatechange = function(){
	if(commodityinfo1.readyState == 4 && commodityinfo1.status){
		var commodityinfoid1 = JSON.parse(commodityinfo1.responseText)
		var number1 = document.getElementsByClassName('number1');
		var allcommodity = number1[0].children;
		for (var j = 0; j < allcommodity.length;j++) {
			allcommodity[j].children[0].children[0].setAttribute('src',url  + commodityinfoid1.list[j].img ); 
			allcommodity[j].children[1].innerText = commodityinfoid1.list[j].title;
			allcommodity[j].children[2].innerText = '¥' + commodityinfoid1.list[j].price;
		}
	}
}

//调用数据库里面商品促销，
var commodityinfo2 = new XMLHttpRequest();
commodityinfo2.open('GET',url + 'lists?id=2')
commodityinfo2.send('{"id" : 2}')
commodityinfo2.onreadystatechange = function(){
	if(commodityinfo2.readyState == 4 && commodityinfo2.status){
		var commodityinfoid2 = JSON.parse(commodityinfo2.responseText)
		var number2 = document.getElementsByClassName('number2');
		var allcommodity = number2[0].children;
		for (var j = 0; j < allcommodity.length;j++) {
			allcommodity[j].children[0].children[0].setAttribute('src',url  + commodityinfoid2.list[j].img ); 
			allcommodity[j].children[1].innerText = commodityinfoid2.list[j].title;
			allcommodity[j].children[2].innerText = '¥' + commodityinfoid2.list[j].price;
		}
	}
}
//调用数据库里面商品新品，
var commodityinfo3 = new XMLHttpRequest();
commodityinfo3.open('GET',url + 'lists?id=3')
commodityinfo3.send('{"id" : 3}')
commodityinfo3.onreadystatechange = function(){
	if(commodityinfo3.readyState == 4 && commodityinfo3.status){
		var commodityinfoid3 = JSON.parse(commodityinfo3.responseText)
		var number3 = document.getElementsByClassName('number3');
		var allcommodity = number3[0].children;
		for (var j = 0; j < allcommodity.length;j++) {
			allcommodity[j].children[0].children[0].setAttribute('src',url  + commodityinfoid3.list[j].img ); 
			allcommodity[j].children[1].innerText = commodityinfoid3.list[j].title;
			allcommodity[j].children[2].innerText = '¥' + commodityinfoid3.list[j].price;
		}
	}
}


//特价秒杀倒计时
    var daojishi = setInterval(timer1,1000 )
    function timer1(){
    	
    var time = document.getElementsByClassName("special-price-time")
	var stoptime = new Date('2019-8-19 00:00:00').getTime();
	var startime = new Date().getTime();
	remaintime = stoptime - startime;
	var days = Math.floor(remaintime / (1000 * 60 * 60 * 24))
	var hours = Math.floor((remaintime - days * 1000 * 60 * 60 * 24)  / (1000 * 60 * 60))
	var minutes = Math.floor((remaintime - days * 1000 * 60 * 60 * 24 - hours * 1000 * 60 * 60)/ (1000 * 60));
	var seconds = Math.floor((remaintime - days * 1000 * 60 * 60 * 24 - hours * 1000 * 60 * 60 - minutes * 1000 * 60) / 1000);
	var arr = [];
	var a = function(num){
		if(num <= 9){
			arr.push(0);
			arr.push(num);
		}
		else{
			var shiwei = (num - num % 10) / 10;
			var gewei = num % 10;
			arr.push(shiwei);
			arr.push(gewei);
		}
	}
	a(days);
	a(hours);
	a(minutes);
	a(seconds);
	
	 var len = arr.length;
	 for(var i = 0; i < len; i++   )
	 {
	 	time[i].value = arr[i];
	 }
	 console.log(arr);
	 return arr;
	 }
    
    
    
    
    
    
    	//轮播事件函数
var lunbofunction = function(){ 
var lunbobox = $('.lunbo-box');
var lunboli = $('.lunbo-li');
var index = 0;
var interval = null;
var lunboliwidth = lunbobox.width();
var lunboulwidth = lunboliwidth * lunboli.length;
var lunboul = $('.lunbo-ul')
    lunboul.css({
	width : lunboulwidth + 'px',
	
})
    //左右箭头
var arrow = $('.arrow'); 
//圆点
var circlepointers = $('.circle-pointer');
autoanimate();
function autoanimate(){
	interval = setInterval(function(){
		index++;
		lunboul.css({
			left :  - (index * lunboliwidth) + 'px',
		})
		changeindex();
		circlepointers.eq(index).addClass('active').siblings('.circle-pointer').removeClass('active');
	},6000)
}
//鼠标移入轮播盒子停掉定时器，移出时重启定时器
lunbobox.mouseenter(function(){
	clearInterval(interval);
})
lunbobox.mouseleave(function(){
	autoanimate();
})
//鼠标移入圆点事件
circlepointers.mouseenter(function(){
	index = $(this).index();
	circlepointers.eq(index).addClass('active').siblings('.circle-pointer').removeClass('active');
	lunboul.css({
			left :  - (index * lunboliwidth) + 'px',
		})
	changeindex();
})
//鼠标点击箭头事件
 arrow.eq(0).click(function(){
 	if(index == 0){
 		index = lunboli.length - 1;
 	}
 	else if(index == -1){
 		index = Number(lunboli.length) - 2
 	}
 	else
    index--;
 	lunboul.css({
			left :  - (index * lunboliwidth) + 'px',
		})
	circlepointers.eq(index).addClass('active').siblings('.circle-pointer').removeClass('active');
 	changeindex();
 })
 arrow.eq(1).click(function(){
 	
 	index++;
 	lunboul.css({
			left :  - (index * lunboliwidth) + 'px',
		})
	circlepointers.eq(index).addClass('active').siblings('.circle-pointer').removeClass('active');
 	changeindex();
 }) 
 	//被调用的判决条件函数   	
    function changeindex(){
	if( index == lunboli.length - 1 ){
		index = -1;
	}
}	

	//浏览器监听打开或关闭事件，方法一
document.addEventListener('webkitvisibilitychange',function(){
	var tag = document.hidden ||  document.webkitHidden;
	if(tag){
		clearInterval(interval);
	}
	else{
		autoanimate();
	}
},false)
    }

//商品选择部分的动态效果
var selectorlists = document.querySelectorAll('.selection-commodity-header .selectorlists');
var selectorcommoditylists = document.querySelectorAll('.selector-commodity-box');
for(var i = 0;i < selectorlists.length;i++){
	selectorlists[i].index = i;
	selectorlists[i].onmouseenter = function(){
	for (var j = 0;j< selectorlists.length;j++) {
		selectorlists[j].classList.remove('active');
		selectorcommoditylists[j].classList.remove('active');
		
	}
		selectorlists[ this.index].classList.add('active');
		selectorcommoditylists[this.index].classList.add('active');
		
	}
	
}








//点击更多，改变父级ifram的src


$('.lunbo-text-header a').click(function(){
	window.parent.$('.ifram').attr('src','website articles.html' )
})

//点击商品改变父级ifram的src
$('.commodity-box').click(function(){
	window.parent.$('.ifram').attr('src','commodity-detail.html');
})
bodysize();



