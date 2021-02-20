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

public class UploadData extends HttpServlet {
    //从ANdroid上传数据到服务器 服务器通过该用户的id 来修改该id的数据 将数据同步
    @Override
    public void init() throws ServletException { }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //super.doPost(req, resp);
        //POST方法提交数据 更加安全并且数据量不做限制
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
        //获取到json数组数据
        JsonArray jsonArray= JsonParser.parseString(sb.toString()).getAsJsonArray();
        //接下来是修改数据库中该用户的数据
        //获取用户ID
        int userID=jsonArray.get(0).getAsJsonObject().get("userID").getAsInt();

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
                //先删除之前的 再更新新的
                state.execute("DELETE FROM note_data WHERE userID="+userID+";");
                //插入
                for (int i=0;i<jsonArray.size();i++){
                    state.execute("INSERT INTO note_data (userID,_id,title,degree,degreeColor,`year`,`month`,`day`,isAlarm,alarmRemind,description) VALUES ("+
                            jsonArray.get(i).getAsJsonObject().get("userID").getAsInt()+","+
                            jsonArray.get(i).getAsJsonObject().get("_id").getAsInt()+","+
                            " '"+jsonArray.get(i).getAsJsonObject().get("title").getAsString()+"',"+
                            " '"+jsonArray.get(i).getAsJsonObject().get("degree").getAsString()+"',"+
                            " '"+jsonArray.get(i).getAsJsonObject().get("degreeColor").getAsString()+"',"+
                            jsonArray.get(i).getAsJsonObject().get("year").getAsInt()+","+
                            jsonArray.get(i).getAsJsonObject().get("month").getAsInt()+","+
                            jsonArray.get(i).getAsJsonObject().get("day").getAsInt()+","+
                            jsonArray.get(i).getAsJsonObject().get("isAlarm").getAsInt()+","+
                            " '"+jsonArray.get(i).getAsJsonObject().get("alarmRemind").getAsString()+"',"+
                            " '"+jsonArray.get(i).getAsJsonObject().get("description").getAsString()+
                            "');");
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
        String res_result="上传数据操作执行完毕";
        out.write(res_result);
        out.flush();
        out.close();
        resp.getOutputStream().write(res_result.getBytes());
    }
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }
}
