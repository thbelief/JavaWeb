<%--
  Created by IntelliJ IDEA.
  User: THBELIEF
  Date: 2021/2/21
  Time: 14:16
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    session.removeAttribute("isLogin");
    response.sendRedirect("index.jsp");
%>
<html>
<head>
    <title>退出</title>
    <script>
        //记那个localStorage中的数据清除掉 账号密码
        localStorage.clear();
    </script>
</head>
<body>

</body>
</html>
