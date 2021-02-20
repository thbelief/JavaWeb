import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import java.util.Properties;

public class Login extends HttpServlet {
    //登陆
    @Override
    public void init() throws ServletException { }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //设置客户端的解码方式为utf-8
        resp.setContentType("text/html;charset=UTF-8");
        resp.setCharacterEncoding("UTF-8");
        req.setCharacterEncoding("UTF-8");

        PrintWriter out = resp.getWriter();
        //获取传来的账号和密码
        int account_number=Integer.parseInt(req.getParameter("account_number"));
        String account_password=req.getParameter("account_password").toString();

        Connection C=null;
        Properties info=new Properties();
        //传回去的msg
        String msg="default";
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
                //先查询这个账号是否已经注册过了
                resultSet=state.executeQuery("SELECT userId FROM user WHERE account_number="+account_number+
                        " and " + "account_password=" +"'"+ account_password +"';");
                if(resultSet.first()){
                    msg=resultSet.getString("userID");
                }else{
                    msg="账号不存在，请注册后再登陆！";
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
        out.write(msg);
        out.flush();
        out.close();
        resp.getOutputStream().write(msg.getBytes());
    }
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }
}
