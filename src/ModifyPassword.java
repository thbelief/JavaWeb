import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import java.util.Properties;

public class ModifyPassword  extends HttpServlet {
    //修改密码
    @Override
    public void init() throws ServletException { }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //设置客户端的解码方式为utf-8
        resp.setContentType("text/html;charset=UTF-8");
        resp.setCharacterEncoding("UTF-8");
        req.setCharacterEncoding("UTF-8");

        PrintWriter out = resp.getWriter();
        //获取传来的账号和标识
        int account_number=Integer.parseInt(req.getParameter("account_number"));
        String userMark=req.getParameter("userMark");
        String account_password=req.getParameter("account_password");

        Connection C=null;
        Properties info=new Properties();
        //传回去的msg
        String msg="输入错误 修改失败";
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
                //先查询这个账号以及标识是否存在
                resultSet=state.executeQuery("SELECT * FROM user WHERE account_number="+account_number+
                        " and " + "userMark=" +"'"+ userMark +"';");
                if(resultSet.first()){
                    //如果存在的话 修改密码
                    state.execute("update user set account_password='"+account_password+
                            "' where account_number="+account_number+" and userMark='"+userMark+"';");
                    msg="密码修改成功";
                }else{
                    msg="账号或标识错误";
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
        //这里注意getoutputStream和out的冲突
        //resp.getOutputStream().write(msg.getBytes());
    }
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }
}
