var phonenumbertext =/^1[345789][0-9]{9}$/
var phonenumbeival;
//验证手机号的输入是否正确
$('.phone-number-input').blur(function(){
	phonenumbeival = $(this).val();
	phonenumbertext.test(phonenumbeival)? $('.second-layer').css({opacity : 0})   : $('.second-layer').css({opacity : 1})
})

//验证手机号的输入是否正确，用来获取验证码
$('.get-verification-code').click(function() {
	phonenumbeival = $('.phone-number-input').val();
	
	if(phonenumbertext.test(phonenumbeival)){
		
	}
	else{
		alert('请输入正确的手机号')
	}
})
//验证输入的密码是否符合格式
var passwordtext = /^[0-9a-zA-Z]{6,18}$/;


$('.password-input').blur(function(){
	passwordtext.test($(this).val())? function(){}  : alert('密码输入有误：请输入6到18位的字母或数字') 
})
$('.password-input-again').blur(function(){
	passwordtext.test($(this).val())? function(){}  : alert('密码输入有误：请输入6到18位的字母或数字') 
})




$('.last-layer').click(function(){
	//验证两次输入的密码是否一致
	if($('.password-input-again').val()!=$('.password-input').val()){
		alert('请保证两次密码输入内容一致')
	}
	else if( !passwordtext.test( $('.password-input-again').val()) || !passwordtext.test( $('.password-input-again').val()) )
	{
		alert('密码格式有误：请输入6到18位的字母或数字')
	}
//	验证验证码
//	else if ()
	//检查是否同意洋货码头协议,检查input的伪类：checked是否存在
	else if (!($('.agreen').is(':checked') ) ){
		alert('请观看并同意用户协议')
	}
	else{
		window.location.href = 'http://127.0.0.1:8020/%E6%B4%8B%E8%B4%A7/logon.html?__hbt=1565159497033';
	}
})