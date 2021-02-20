import com.google.gson.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.sql.*;
import java.util.Properties;

public class CalendarData extends HttpServlet {
    //private String message;

    @Override
    public void init() throws ServletException {
        //message= "Hello World";
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //super.doPost(req, resp);
        //POST方法提交数据 更加安全并且数据量不做限制

        //doGet(req, resp);
        //设置客户端的解码方式为utf-8
        resp.setContentType("text/html;charset=UTF-8");
        resp.setCharacterEncoding("UTF-8");
        req.setCharacterEncoding("UTF-8");

        PrintWriter out = resp.getWriter();

        // 读取请求内容
        BufferedReader br = new BufferedReader(new InputStreamReader(req.getInputStream(),"utf-8"));
        String line = null;
        StringBuilder sb = new StringBuilder();
        while ((line = br.readLine()) != null) {
            sb.append(line);
        }
        //获取到json数据
        JsonArray jsonArray= JsonParser.parseString(sb.toString()).getAsJsonArray();


        out.write(jsonArray.toString());
        out.flush();
        out.close();
        resp.getOutputStream().write(jsonArray.getAsByte());

    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //测试内容
        //响应内容
//        resp.setContentType("text/html");
//        //逻辑实现
//        PrintWriter out=resp.getWriter();
//        out.println("<h1>"+message+"</h1>");
        //解析请求中的
//        String openID = null;//用户对应的标识
//        String function=null;//要做的事  比如更新 比如同步 比如注册之类的
//        openID = new String(req.getParameter("openID").getBytes("ISO-8859-1"),"UTF-8");
//        function = new String(req.getParameter("function").getBytes("ISO-8859-1"),"UTF-8");

        //参考https://blog.csdn.net/wlzf6296149/article/details/7309971
        //响应内容
        resp.setContentType("text/html;charset=UTF-8");//这句必须放在PrintWriter//out=response.getWriter();前面，不然输出中文依然为乱码。
        //逻辑实现

        PrintWriter out=resp.getWriter();
        Connection C=null;
        Properties info=new Properties();
        try {
            Class.forName("com.mysql.cj.jdbc.Driver").newInstance();
            info.setProperty("user","root");
            info.setProperty("password","13547296248tyty++");
            C = DriverManager.getConnection("jdbc:mysql://localhost/calendar_data",info);
            Statement state= null;
            try {
                //双向滚动，并及时跟踪数据库的更新,以便更改ResultSet中的数据。 可以更新 ResultSet
                state=C.createStatement (ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
                ResultSet result=null;
                try {
                    result=state.executeQuery("select title \n" +
                            "from note_data,`user`\n" +
                            "where note_data.userID=`user`.userID;");

                    if(result!=null){

                        while(result.next()){
                            out.println("<h1>"+result.getString("title")+"</h1>");
                        }


                    }else{
                        out.print("查询错误不存在");      //这个是响应之后返回的数据

                    }
                } catch (SQLException throwables) {
                    out.print("result 为空");
                    throwables.printStackTrace();
                }
            } catch (SQLException throwables) {
                out.print("DriverManager 为空");
                throwables.printStackTrace();
            }
        } catch (SQLException | ClassNotFoundException throwables) {
            out.print("Connection is null");
            throwables.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InstantiationException e) {
            e.printStackTrace();
        }


    }

    @Override
    public void destroy() {
        super.destroy();
    }
}
