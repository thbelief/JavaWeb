import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.sql.*;
import java.util.Properties;

public class DownloadData extends HttpServlet {
    //服务器传回数据 将数据下载到ANdroid 通过id
    @Override
    public void init() throws ServletException { }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //设置客户端的解码方式为utf-8
        resp.setContentType("text/html;charset=UTF-8");
        resp.setCharacterEncoding("UTF-8");
        req.setCharacterEncoding("UTF-8");

        PrintWriter out = resp.getWriter();
        //获取用户ID 根据ID来返回该用户的所有数据
        int userID=Integer.parseInt(req.getParameter("userID"));
        //json数组用来存放取到的数据 然后返回
        JsonArray jsonArray=new JsonArray();

        Connection C=null;
        Properties info=new Properties();
        try {
            Class.forName("com.mysql.cj.jdbc.Driver").newInstance();
            info.setProperty("user","root");
            info.setProperty("password","13547296248tyty++");
            C = DriverManager.getConnection("jdbc:mysql://localhost/calendar_data",info);
            Statement state= null;
            ResultSet resultSet=null;
            try {
                //双向滚动，并及时跟踪数据库的更新,以便更改ResultSet中的数据。 可以更新 ResultSet
                state=C.createStatement (ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
                resultSet=state.executeQuery("SELECT * FROM note_data WHERE userID="+userID+";");
                while(resultSet.next()){
                    JsonObject json=new JsonObject();
                    json.addProperty("userID",userID);
                    json.addProperty("_id",resultSet.getInt("_id"));
                    json.addProperty("title",resultSet.getString("title"));
                    json.addProperty("degree",resultSet.getString("degree"));
                    json.addProperty("degreeColor",resultSet.getString("degreeColor"));
                    json.addProperty("year",resultSet.getInt("year"));
                    json.addProperty("month",resultSet.getInt("month"));
                    json.addProperty("day",resultSet.getInt("day"));
                    json.addProperty("isAlarm",resultSet.getInt("isAlarm"));
                    json.addProperty("alarmRemind",resultSet.getString("alarmRemind"));
                    json.addProperty("description",resultSet.getString("description"));
                    jsonArray.add(json);
                }
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        } catch (SQLException | ClassNotFoundException throwables) {
            throwables.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InstantiationException e) {
            e.printStackTrace();
        }
        out.write(jsonArray.toString());
        out.flush();
        out.close();
        resp.getOutputStream().write(jsonArray.getAsByte());
    }
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }
}
