
//如果点击了exit按钮的话
function exit_f() {
    Swal.fire({
        title: '确定退出?',
        text: "退出账号会清空session，下次进入需要登陆。",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#00c853',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location = "http://localhost:8080/JavaWeb/logout.jsp"
        }
    })
}
function deleteBeforeDate() {
    //先删除上一月的date
    $(".date_item").remove();
    $(".date_select_item").remove();
    $(".date_have_note_item").remove();
}
function backToday(){
    toastr.success("已回到今天!")
    //获取今天
    var today=Solar.fromDate(new Date());
    //最开始直接选中今天
    currentDay=today.getDay();
    currentMonth=today.getMonth();
    currentYear=today.getYear();
    centerFunction();
}
function about(){
    Swal.fire({
        title: '极简日历\n'+'2021-2-22\n'+'Designed By THBELIEF\n',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })
}

//从login跳转携带的number以及password
let account_number=localStorage.getItem("account_number");
let account_password=localStorage.getItem("account_password");
let user_ID=localStorage.getItem("userID");
//alert(account_number+account_password+" "+userID)
//console.log(account_number+account_password)

//这个是标记的天数 必须在本月绘制完之后重置为0
var dayNum=0;
//全局的目前选中的current 年月日
var currentDay,currentMonth,currentYear;
//这个函数用来重置dayNum 当点击上一月 下一月的时候
function letDayNumNull() {
    dayNum=0;
}
function drawLineCalendar(firstI,size,barnum,isblank) {
    for(var i=firstI;i<size;i++){
        var temp=document.createElement("span");
        temp.setAttribute("class","date_item");
        if(isblank==0){
            temp.innerHTML="";
        }else{
            dayNum=dayNum+1;
            //记事的标记
            if(all_note_date_list.indexOf(currentYear+"-"+currentMonth+"-"+dayNum)>-1){
                //标记这一天
                temp.setAttribute("class","date_have_note_item");
            }
            //选中的优先级高于记事
            if(currentDay==dayNum){
                //默认标记今天 上一月下一月也是默认选中选中的天数
                temp.setAttribute("class","date_select_item");
            }
            //阴历的部分
            var lunar=Solar.fromYmd(currentYear,currentMonth,dayNum).getLunar();
            temp.innerHTML=dayNum+" "+lunar.getDayInChinese();
        }
        $(barnum).append(temp);

    }
}
//添加每个月的日子
function drawCalendar(mdaysnum,whatweek){
    //先删除上一月的date
    deleteBeforeDate()
    //1号之前的空的先填进去
    drawLineCalendar(0,whatweek,"#date_bar_1",0)
    //第一排后面的
    drawLineCalendar(whatweek,7,"#date_bar_1",1)
    //第二排
    drawLineCalendar(0,7,"#date_bar_2",1)
    drawLineCalendar(0,7,"#date_bar_3",1)
    drawLineCalendar(0,7,"#date_bar_4",1)

    var days=mdaysnum-dayNum
    if(days>=7){
        drawLineCalendar(0,7,"#date_bar_5",1)
        days=days-7;
        drawLineCalendar(0,days,"#date_bar_6",1)
        drawLineCalendar(days,7,"#date_bar_6",0)
    }else{
        drawLineCalendar(0,days,"#date_bar_5",1)
        drawLineCalendar(days,7,"#date_bar_5",0)
    }
    //绘制完了之后 把dayNum重置
    letDayNumNull();
}
//主要的程序
function centerFunction(){
    //这个月多少天
    var thisMonthDays=SolarUtil.getDaysOfMonth(currentYear,currentMonth);
    //本月的一号是周几
    var firstDayWeek=Solar.fromYmd(currentYear,currentMonth,1).getWeek();
    //console.log("今天"+today+"多少天"+thisMonthDays+"周几"+firstDayWeek)
    drawCalendar(thisMonthDays,firstDayWeek)
    //把今天的日期显示出来 并且标记
    $("#now_date").html(currentYear+"-"+currentMonth+"-"+currentDay);
    //日期的选中事件
    $(".date_item").click(function () {
        if($(this).html()==""){
            //点击了本月不可用的日期
            toastr.error("无法点击非本月日期")
        }else{
            //如果点击了日期的话 先把之前所有的选中样式去除 再切换成选中的样式
            $(".date_select_item").attr("class","date_item");
            $(this).attr("class","date_select_item");
            //修改全局的选中日期
            currentDay=$(this).html();
            //修改显示的选中日期
            $("#now_date").html(currentYear+"-"+currentMonth+"-"+currentDay);
        }
    })
}
//html是从上到下执行的 执行js的时候html下面的内容还没加载 在准备好之后再操作
$(document).ready(function(){
    toastr.success("欢迎回来用户 "+account_number+" !")

    //获取数据 先绘制一遍数据
    getData()
    //获取今天
    var today=Solar.fromDate(new Date());
    //最开始直接选中今天
    currentDay=today.getDay();
    currentMonth=today.getMonth();
    currentYear=today.getYear();

    centerFunction();
    //上一月 下一月的点击事件
    $("#up_month").click(function () {
        //点击上一月的话
        if(currentMonth==1){
            //当这个月是一月的时候在往前就-1年
            currentMonth=12;
            currentYear=currentYear-1;
        }else{
            currentMonth=currentMonth-1;
        }
        centerFunction();
    })
    //下一月的点击事件
    $("#down_month").click(function () {
        //点击上一月的话
        if(currentMonth==12){
            //当这个月是一月的时候在往前就-1年
            currentMonth=1;
            currentYear=currentYear+1;
        }else{
            currentMonth=currentMonth+1;

        }
        centerFunction();
    })

    //选中所有的点击事件
    $("#check_all").click(function () {
        toastr.success("成功选中所有项");
        $("[name='c0']").prop("checked",true)
    })
    //删除选中的点击事件
    $("#delete_check").click(function () {

    })

});
//所有的记事数据
var all_note_data;
var all_note_date_list=[];
function getData() {
    //设置为同步请求 否则的话无法将数据传出来
    $.ajaxSettings.async=false;
    $.post("http://localhost:8080/JavaWeb/DownloadData",{userID:user_ID},function(result){
        //遍历一遍 转化一下
        $.each(result,function(index,value){
            if(value.degree=="MemorialDay"){
                value.degree="特殊日期"
            }
            if(value.degreeColor=="Yellow"){
                value.degreeColor="黄"
            }else if(value.degreeColor=="Red"){
                value.degreeColor="红"
            }else if(value.degreeColor=="Green"){
                value.degreeColor="绿"
            }
            if(value.isAlarm==0){
                value.isAlarm="否"
            }else{
                value.isAlarm="是"
            }
            if(value.alarmRemind=="选择提醒时间"){
                value.alarmRemind="";
            }
            //赋值date
            all_note_date_list.push(value.year+"-"+value.month+"-"+value.day)
        });
        //赋值给全局变量
        all_note_data=result;
        note_table(result)
    },"json");

}
//传入一个jsonarray实例化就直接上了
function note_table(jsonarray) {
    jspreadsheet(document.getElementById('spreadsheet3'), {
        data:jsonarray,
        columns: [
            {
                type: 'checkbox',
                width:'50',
                name:'checkbox',
                title:'选中',
            },
            {
                type:'text',
                width:'100',
                name:'title',
                title:'标题',
            },
            {
                type:'dropdown',
                width:'100',
                name:'degree',
                title:'程度',
                source:[ "低", "中", "高","特殊日期" ],
            },
            {
                type:'dropdown',
                width:'100',
                name:'degreeColor',
                title:'程度颜色',
                source:[ "绿", "黄", "红","无" ],
            },
            {
                type:'text',
                width:'50',
                name:'year',
                title:'年',
            },
            {
                type:'text',
                width:'50',
                name:'month',
                title:'月',
            },
            {
                type:'text',
                width:'50',
                name:'day',
                title:'日',
            },
            {
                type:'dropdown',
                width:'80',
                name:'isAlarm',
                title:'提醒',
                source:[ "是", "否" ],
            },
            {
                type:'text',
                width:'150',
                name:'alarmRemind',
                title:'提醒时间',
            },
            {
                type:'text',
                width:'200',
                name:'description',
                title:'备注',
            },
            {
                type:'hidden',
                name:'gender'
            },
        ]
    });
}





