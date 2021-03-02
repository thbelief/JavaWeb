//模版函数 用于响应登陆注册
function stencil(action_s) {
    //这个表单下面早就包含了number与password的input 只是form的action对象需要改变一下 数据一样
    // 所以直接修改action就可以达到点击不同按钮到达不同servlet的效果
    $("#login_form").attr("action",action_s)
    $("#login_form").attr("method","post")
    if(action_s=="Registered"){
        //将特征码设置为账号
        $("#userMark").val($("#account_number").val());
        $("#login_form").ajaxForm(function(data){
            //使用ajaxForm不会跳转 只会获取返回值
            //alert("post success." + data);
            $("#display_message").attr("style","display: block");
            $("#display_message").html(data);
            if(data=="账号注册成功"){
                toastr.success(data)
                toastr.info("标识默认设置为账号")
            }else{
                toastr.error(data)
            }
        });
    }else{
        $("#login_form").ajaxForm(function(data){
            //使用ajaxForm不会跳转 只会获取返回值
            //alert("post success." + data);
            $("#display_message").attr("style","display: block");
            if(data=="账号不存在或者密码错误"){
                $("#display_message").html(data);
                toastr.error(data)
            }else{
                $("#display_message").html("登陆成功");
                toastr.success("登陆成功");
                //将获取到的courseid传入到session
                localStorage.setItem("account_number",$("#account_number").val());
                localStorage.setItem("account_password",$("#account_password").val());
                localStorage.setItem("userID",data.toString());
                //跳转到修改页面
                window.location = "http://www.thbelief.xyz/Personal.jsp"
            }
        });
    }
}
function login() {
    stencil("Login")
}
function register() {
    stencil("Registered")
}
