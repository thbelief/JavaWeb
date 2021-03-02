<%--
  Created by IntelliJ IDEA.
  User: THBELIEF
  Date: 2021/2/21
  Time: 13:39
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    //判断是否已经登陆 如果没登录的话 直接跳转回登录界面 session的set是在Login servlet做的
    if(session.getAttribute("isLogin")==null){
       response.sendRedirect("index.jsp");
    }
%>
<html>
<head>
    <title>极简日历-个人中心</title>
    <!-- 设备屏幕显示网页的区域 1.0表示按实际显示 无缩放-->
<%--    <meta name="viewport" content="width=device-width, initial-scale=1.0">--%>
    <meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=0.3, maxmum-scale=1.0, minimum-scale=0.3">
    <link rel="icon" href="image/calendar.ico" type="image/x-icon"/>
    <link rel="stylesheet" type="text/css" href="css/pc.css">
    <link rel="stylesheet" type="text/css" href="css/toastr.css">
    <link rel="stylesheet" type="text/css" href="css/layui.css">
    <link rel="stylesheet" type="text/css" href="css/bootstrap-table.min.css">

    <!--引入js  注意引入顺序-->
    <script type="text/javascript" src="js/jquery-3.5.1.js"></script>
    <script type="text/javascript" src="js/jquery-3.5.1.min.js"></script>
    <script type="text/javascript" src="js/jquery-form.js"></script>
    <script type="text/javascript" src="js/lunar.js"></script>
    <script type="text/javascript" src="js/toastr.js"></script>
    <script type="text/javascript" src="js/layui.all.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>

    <script src="https://bossanova.uk/jspreadsheet/v4/jexcel.js"></script>
    <link rel="stylesheet" href="https://bossanova.uk/jspreadsheet/v4/jexcel.css" type="text/css" />
    <script src="https://jsuites.net/v4/jsuites.js"></script>
    <link rel="stylesheet" href="https://jsuites.net/v4/jsuites.css" type="text/css" />

    <script type="text/javascript" src="js/pc.js"></script>
</head>
<body>
<div class="personal">
    <div class="background_color_1">
        <div class="center_tv_1">
            <div class="contain_calendar">
                <span class="calendar_title" id="calendar_title">极简日历</span>
                <div class="title_tab" id="title_tab">
                    <button class="up_month" id="up_month">上一月</button>
                    <span class="now_date" id="now_date">2001-1-1</span>
                    <button class="down_month" id="down_month">下一月</button>
                </div>
                <div class="week_bar" id="week_bar">
                    <span class="week_bar_item">周日</span>
                    <span class="week_bar_item">周一</span>
                    <span class="week_bar_item">周二</span>
                    <span class="week_bar_item">周三</span>
                    <span class="week_bar_item">周四</span>
                    <span class="week_bar_item">周五</span>
                    <span class="week_bar_item">周六</span>
                </div>
                <div class="date_bar" id="date_bar_1">
                </div>
                <div class="date_bar" id="date_bar_2">
                </div>
                <div class="date_bar" id="date_bar_3">
                </div>
                <div class="date_bar" id="date_bar_4">
                </div>
                <div class="date_bar" id="date_bar_5">
                </div>
                <div class="date_bar" id="date_bar_6">
                </div>
            </div>
        </div>
        <div class="center_tv_2" id="center_tv_2">
            <div class="note_bar">
                <button class="check_all" id="check_all">全选</button>
                <button class="delete_check" id="delete_check">删除选中</button>
                <button class="save_edit" id="save_edit">保存修改</button>
                <button class="insert_note" id="insert_note">新建数据</button>
                <button class="download_csv" id="download_csv">下载表格</button>
                <button class="sure_insert" id="sure_insert">范例</button>
            </div>
            <div id="spreadsheet3"></div>
        </div>
        <button id="exit_bt" class="exit_bt" onclick="exit_f()">退出</button>
        <button id="back_today_bt" class="back_today_bt" onclick="backToday()">今天</button>
        <button id="about_bt" class="about_bt" onclick="about()">关于</button>
    </div>

</div>
</body>
</html>