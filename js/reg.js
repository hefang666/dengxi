//1. 将英文改为中文
$.extend($.validator, {
	messages: {
		required: "该字段不能为空.",   //字段必须
		remote: "Please fix this field.",    //远程， 发送请求判读
		email: "请输入正确的邮箱.",  //邮箱字段
		url: "请输入正确的地址.",
		date: "Please enter a valid date.",
		dateISO: "Please enter a valid date (ISO).",
		number: "Please enter a valid number.",
		digits: "Please enter only digits.",
		equalTo: "请输入相同的密码.",   //等于
		maxlength: $.validator.format( "Please enter no more than {0} characters." ),
		minlength: $.validator.format( "Please enter at least {0} characters." ),
		rangelength: $.validator.format( "请输入6-18位字符." ),
		range: $.validator.format( "Please enter a value between {0} and {1}." ),
		max: $.validator.format( "Please enter a value less than or equal to {0}." ),
		min: $.validator.format( "Please enter a value greater than or equal to {0}." ),
		step: $.validator.format( "Please enter a multiple of {0}." )
	}
});


//2. 添加验证规则
//rule中的属性名  为验证标签的name 或者id的值
// 如：email 为验证邮箱的输入框 改名字为输入邮箱input框的name值或者id
$(".validateform").validate({
	//验证规则
	rules: {
		email: {
			//该邮箱必填
			required: true,
			email: true
		},
		password: {
			required: true,
			rangelength: [6,18]
		},
		repassword: {
			equalTo: $('[name=password]')
		},
		mobile: {
			required: true,
			tel: true
		}
	},
	//定义错误信息
	messages: {
		email: {
			required: '邮箱不能为空'
		}
	}
})

//3. 添加自定义验证
//$.validator.addMethod(验证名字, 验证的方法，验证错误信息)   自定义验证
$.validator.addMethod('tel',function(value, element){
	var reg = /^1[356789]\d{9}$/
	
	return reg.test(value)

}, '请输入手机号')

//4. 更改错误提示的样式

//4.获取cookie 存在继续倒计时
var cookia = $.cookie('cookia')
if(cookia) {
	countDown(cookia)
}

//获取验证码
$(".get-code").click(function(){
	
	var _this = this;
	
	if($(this).hasClass('disabled'))
		return;
	
	countDown(10)

		
})


function countDown(count){
	
	$(".get-code").addClass('disabled')
	
	$(".get-code").html(count + 's后重获')
	//1. 开启倒计时
	var timer = setInterval(function(){
		count--
		$(".get-code").html(count+'s后重获')
		//3. 设置cookie
		$.cookie('cookia', count)
		//取
		console.log($.cookie('cookia'))
		
		//2. 结束倒计时
		if(count <= 0) {
			
			clearInterval(timer)
			$(".get-code").removeClass('disabled').html('重新获取')
			$.removeCookie('cookia')
		}
	}, 1000)
}
