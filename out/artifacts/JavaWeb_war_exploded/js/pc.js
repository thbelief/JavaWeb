
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
            window.location = "http://159.75.108.98:8080/JavaWeb_war/logout.jsp"
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
//全局的这个表
var table;//在后面填充的

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
            //记事的优先级高于选中
            if(currentDay==dayNum){
                //默认标记今天 上一月下一月也是默认选中选中的天数
                temp.setAttribute("class","date_select_item");
            }
            //记事的标记
            if(all_note_date_list.indexOf(currentYear+"-"+currentMonth+"-"+dayNum)>-1){
                //标记这一天
                temp.setAttribute("class","date_have_note_item");
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
        Swal.fire({
            title: '确定删除?',
            text: "删除数据不可恢复，请慎重考虑",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00c853',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {

                //获取所有的选中的checkboxde的父tr
                var tr=$("input:checkbox[name='c0']:checked").parents("tr");
                if($("input:checkbox[name='c0']:not(:checked)").length==0){
                    //由于至少都有一行，如果要删除完的话必须添加一行空白列，再删才能删完 不然会剩下一个
                    table.insertRow([],0)
                }
                tr.each(function () {
                    table.deleteRow(parseInt($(this).attr("data-y")),1)
                })

                // if($("input:checkbox[name='c0']:not(:checked)").length==0){
                //     //判断是否全部选中 如果全部选中直接重新建表
                //     //这个是后会删除所有 直接删除表然后新建
                //     $("#spreadsheet3").remove();
                //     var sp=document.createElement("div");
                //     sp.setAttribute("id","spreadsheet3");
                //     $("#center_tv_2").append(sp)
                //     note_table([{}])
                //     //console.log("目前数据"+JSON.stringify(table.getJson()))
                // }else{
                //     //console.log(tr)
                //     tr.each(function () {
                //         //遍历每一个 然后删除该行的数据即可
                //         //console.log($(this).children("td").eq(0).text())
                //         //获取所有选中的所在行的编号
                //         var colum_id=$(this).attr("data-y"); //所在行
                //         //console.log("选中的行数 "+colum_id)
                //         //调用方法删除该行的数据
                //         table.deleteRow(colum_id,colum_id);
                //         //删除该tr
                //         //$(this).remove()
                //         // //先删除之前的表格里面的元素 再重新添加
                //         // $("#spreadsheet3").empty();
                //     })
                // }

            }
        })


    })
    //保存修改的点击事件
    $("#save_edit").click(function () {
        Swal.fire({
            title: '确定同步到云端么?',
            text: "请确保数据安全并且符合规范，否则不予同步，如果同步成功，会在右上角显示成功消息，请注意查收。",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00c853',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                var temp=table.getJson();
                //转换回服务器要求的格式
                changeRespStyle(temp);
                //对象数组必须转换为json字符串
                $.post("http://159.75.108.98:8080/JavaWeb_war/UploadData",JSON.stringify(temp),function (result) {
                    toastr.success(result)
                })
            }
        })

    })
    //新建记事的点击事件
    $("#insert_note").click(function () {
        //先获取当前表格最后一行
        //var lastline=$("tbody.draggable").children("tr:last-child");
        table.insertRow();
    })
    //myuserID的点击事件
    $("#download_csv").click(function () {
        table.download(true);
    })
    //正确范例的插入事件
    $("#sure_insert").click(function () {
        table.insertRow(["false","我是标题","高","红", "2021","2","22","是","2021-2-23-12-00","我是备注",""], 0);
    })
});
//将当前的记事数据转化成从服务器请求过来时的样式 因为来的时候做了转换 回去也得转换
function changeRespStyle(temp) {
    if(temp.length==0){
        temp=[{userID:user_ID,_id:-1}];
    }
    var black=[{"checkbox":false,"title":"","degree":"","degreeColor":"","year":"","month":"","day":"","isAlarm":"","alarmRemind":"","description":"","gender":""}]
    if(temp==black){
        //清空temp
        temp.length=0;
        temp=[{userID:user_ID,_id:-1}];
    }else{
        //这里要判断是否已经删除完毕 如果是删除完了的话 还要发一个只有userID的过去 清空数据库
        $.each(temp,function (index,value) {
            value["userID"]=user_ID;
            //这个其实只是校验位 插入进去没用到这个 这个用来区别-1
            value["_id"]=1;
            if(value.description==""){
                value.description=" "
            }
            //遍历数据
            if(value.degree=="特殊日期"){
                value.degree="MemorialDay"
            }
            if(value.degreeColor=="黄"){
                value.degreeColor="Yellow"
            }else if(value.degreeColor=="红"){
                value.degreeColor="Red"
            }else if(value.degreeColor=="绿"){
                value.degreeColor="Green"
            }
            if(value.isAlarm=="否"){
                value.isAlarm=0
            }else{
                value.isAlarm="1"
            }
            if(value.alarmRemind==""){
                value.alarmRemind="选择提醒时间";
            }
        })
    }

}
//存放记事日期
var all_note_date_list=[];
function getData() {
    //设置为同步请求 否则的话无法将数据传出来
    $.ajaxSettings.async=false;
    $.post("http://159.75.108.98:8080/JavaWeb_war/DownloadData",{userID:user_ID},function(result){
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
            result["userID"]=user_ID;
            //赋值date
            all_note_date_list.push(value.year+"-"+value.month+"-"+value.day)
        });
        note_table(result)
    },"json");

}
//传入一个jsonarray实例化就直接上了
function note_table(jsonarray) {
    table=jspreadsheet(document.getElementById('spreadsheet3'), {
        minDimensions: [10,1],
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
                title:'标题*',
            },
            {
                type:'dropdown',
                width:'100',
                name:'degree',
                title:'程度*',
                source:[ "低", "中", "高","特殊日期" ],
            },
            {
                type:'dropdown',
                width:'100',
                name:'degreeColor',
                title:'程度颜色*',
                source:[ "绿", "黄", "红","无" ],
            },
            {
                type:'text',
                width:'50',
                name:'year',
                title:'年*',
            },
            {
                type:'text',
                width:'50',
                name:'month',
                title:'月*',
            },
            {
                type:'text',
                width:'50',
                name:'day',
                title:'日*',
            },
            {
                type:'dropdown',
                width:'80',
                name:'isAlarm',
                title:'提醒*',
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
        ],
    });
}





