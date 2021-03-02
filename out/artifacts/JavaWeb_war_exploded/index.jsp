<%--
  Created by IntelliJ IDEA.
  User: THBELIEF
  Date: 2021/2/15
  Time: 14:10
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>极简日历-登陆</title>
    <meta charset="utf-8">
    <!-- 设备屏幕显示网页的区域 1.0表示按实际显示 无缩放-->
<%--    <meta name="viewport" content="width=device-width, initial-scale=1.0">--%>
    <meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=0.3, maxmum-scale=1.0, minimum-scale=0.3">
    <!--把所有的样式都引入-->
    <link rel="icon" href="image/calendar.ico" type="image/x-icon"/>
    <link rel="stylesheet" type="text/css" href="css/all.css">
    <link rel="stylesheet" type="text/css" href="css/toastr.css">
    <!--引入js  注意引入顺序-->
    <script type="text/javascript" src="js/jquery-3.5.1.js"></script>
    <script type="text/javascript" src="js/jquery-form.js"></script>
    <script type="text/javascript" src="js/all.js"></script>
    <script type="text/javascript" src="js/toastr.js"></script>
</head>
<body>
<div class="login">
    <div class="background_color">
        <div class="center_tv">
            <!-- 这里的target是post之后默认不跳转页面 跳转到iframe 获取返回数据-->
            <form class="login_form" name="login_form" id="login_form" >
                <span class="login_title" id="login_title">极简日历</span>
                <div class="login_number">
                    <label for="account_number"></label>
                    <input class="input_number" type="text" name="account_number" id="account_number" placeholder="账号"/>
                </div>
                <div class="login_password">
                    <label for="account_password"></label>
                    <input class="input_password" type="password" name="account_password" id="account_password" autocomplete="on" placeholder="密码"/>
                </div>
                <!-- 这里的input 主要就是用于注册时发送默认的userMark-->
                <input type="text" name="userMark" id="userMark" style="display: none"/>
                <span class="display_message" id="display_message">测试</span>
                <div class="login_bt_form">
                    <button class="login_bt" onclick="login()">登陆</button>
                    <button class="register_bt" onclick="register()">注册</button>
                </div>
            </form>
        </div>
    </div>
</div>
</body>
</html>
