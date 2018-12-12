
// var server1 = 'http://192.168.8.59:8088';//服务器后台
// var server2 = 'http://192.168.8.59:8084';



// var host = 'http://192.168.8.59:8089';//本项目后台,真正服务器
//var host = 'http://192.168.3.48:8080';/////临时红英的服务器
//var host = 'http://10.89.16.147:8088';
var host = 'http://10.89.16.250';
var host2 = 'http://192.168.3.92:8888';//临时邓的服务器;

//  var host = 'http://192.168.8.50:8888/';//陈怀东服务器

var createwordhost = host;////createword

var win = window;
var mJson = JSON;
var Base64 = require('js-base64').Base64;

module.exports = {

    // server2: 'http://192.168.8.59:8084',

    fwurl: host + "/",
    swDefKey: "swlc211111111111111111",
    fwDefKey: "cgfw11111111",

    nigaofolder: "拟稿文件夹",
    wordReportFolder: "其他材料",
    selectInitjsUrl:"http://192.168.8.59/static/approve/#",




    // clientId: 'nfw',//clientId
    // clientType: "test",    
    // textType: "测试功能",

    // clientId: 'nfw',//clientId
    // clientType: "sp",    
    // textType: "审批测试",

    clientId: 'nfw',//clientId
    clientType: "gwfw",////业务流程的大类名称
    textType: "发文",

    // clientId: 'nsw',//clientId
    // clientType: "gwsw",////业务流程的大类名称
    // textType: "收文",



    url: {
        plateformStaic: "http://10.89.16.250/ui/fw/#",
        web365url: "http://10.89.16.249:8088/?furl=",
        jumpToMeeting: "http://www.baidu.com",////`http://192.168.8.59:8089/ui/metting#/home/meetingSystem/todoIssues`,

        getTableHtmlSp: `${host}/fw/form/formHtml`,
        tranTaskUser: `${host}/fw/form/tranTaskUser`,//获取选择跳转人员列表
        common: `${host}/fw/form/getPhrase`,//获取常用语
        getTreedata: `${host}/fw/form/getTreeData`,//获取组织机构;
        getRoleUser: `${host}/fw/form/Selector`,//获取组织机构所属人员;

        getCount: `${host}/fw/form/getUserCount`,
        getTableHtml: `${host}/fw/form/formHtml`,
        setTaskReadState: `${host}/fw/form/setTaskReadStatus`,
        getReadOnlyForm: `${host}/fw/form/formInfo`,
        returnBack: `${host}/fw/process/defRecover`,
        // getPendinglist: `${host}/fw/flow/getPendingMattersList`,//获取发文表格html

        getButtons: `${host}/fw/flow/getButtonListByTaskId`,//获取按钮列表
        freeJump: `${host}/fw/form/getFreeJump`,//获取自由跳转列表
        getTaskUsers: `${host}/fw/form/getTaskUsers`,// 获取自由节点获取人员
        getSelector: `${host}/fw/form/getSelector`,
        submitTable: `${host}/fw/form/complete`,//提交、同意表单提交
        saveData: `${host}/fw/form/saveData`,//保存表单

        createRelation: `${host}/fw/xm/relevance`,//创建关联
        getRelation: `${host}/fw/xm/getByRelId`,//获取关联列表
        getfwByCondition: `${host}/fw/process/getProcessRunByConditions`,//按条件查询可关联发文
        getXm: `${host}/fw/xm/getXm`,//获取可关联项目列表
        getMeeting: `${host}/fw/xm/getDiscussion`,//获取可关联会议列表
        delayUsers: `${host}/fw/taskOpinion/auditPersion`,//延时、暂停可发送的人
        delay: `${host}/fw/taskOpinion/doDelayRequest`,//发送延时
        pause: `${host}/fw/taskOpinion/doPause`,//发送暂停
        special: `${host}/fw/taskOpinion/waitAuditDelayPause`,//获取特殊箱
        handleDelay: `${host}/fw/taskOpinion/handleDelayPause`,//处理延迟


        getFolderByNode: `${host}/fw/file/listFolderByNode`,//获取附件文件夹
        getFolderList: `${host}/fw/file/listFolder`,//进入办结箱的时候获取文件夹
        delRelationByIds: `${host}/fw/xm/delById`,//根据id数组删除关联

        getFolder: `${host}/fw/file/listFolderByNode`,
        getChildrenFile: `${host}/fw/file/get_file_list`,
        uploadFile: `${host}/fw/file/nupload`,
        delFile: `${host}/fw/file/del`,
        getFileUrl: `${host}/fw/file/getUrl`,
        getAttachsByRunId: `${host}/fw/file/getByInstanceId`,//得到全部附件及文件夹，但得不到文件下载地址

        getRelationState: `${host}/fw/xm/isExists`,//获取关联状态


        tranTaskUserMap: `${host}/fw/menu/tranTaskUserMap`,// 获取自由节点获取人员
        nstartFlow: `${host}/fw/form/nstartFlow`,// 新建流程并带参数
        getTaskNode: `${host}/fw/process/getTaskNode`,   ////得到当前人的taskNode

        getTypeAndList: `${host}/fw/instancenote/getTypeAndList`,//获取发文大类下的流程
        getPendinglist: `${host}/fw/flow/getPendingMattersList`,//获取在办业务
        alreadyMattersList: `${host}/fw/flow/alreadyMattersList`,   //获取已办业务
        completedMattersList: `${host}/fw/flow/completedMattersList`,   //获取办结业务



        /////-----------------page office link-----------
        createword: `${createwordhost}/fw/pageOffice/create`,   ////createword///需要前台传一个文件名称
        getwordlist: `${createwordhost}/fw/pageOffice/getNiGao`,   ////createword///打开一个word文件名称
        gettaolist: `${createwordhost}/fw/pageOffice/getTaoHongModel`,   ////得到红头文件的上传，当前用户上传的

        ////createword///打开一个word文件名称 zxbj //在线编辑的首字母，主要用来拟稿
        openworddisp: `${createwordhost}/fw/pageOffice/index?type=zxbj&id=`,
        ////createword///打开一个word文件名称  ///ldsh 领导审核的首字母，主要用来批注
        postil: `${createwordhost}/fw/pageOffice/index?type=ldsh&fileId=`,
        taohong: `${createwordhost}/fw/pageOffice/index?type=taoHong`,
        dispSeal: `${createwordhost}/fw/loginseal.zz`,/////显示pageoffice的签章管理页面。
        doSeal: `${createwordhost}/fw/pageOffice/index?type=seal`,

        wordsp: `${createwordhost}/fw/pageOffice/index?type=table`,////作为审批临时的套打功能测试。





        assignTask: `${host}/fw/form/assignSave`,   ////转办业务
        rejectTask: `${host}/fw/form/getBack`,   ////驳回发起人
        processHistory: `${host}/fw/taskOpinion/processHistory`,   ///查询历史记录

    },
    typeList: [
        {
            key: 0,
            value: "公文发文",
            field: "runId", //此项为要关联的主键
            choosekey: 'id',
            type: "nfw",
            timefield: "run.data.mainFields.fwsj",
            defkey: "cgfw11111111",
            conditions: "F_fwbt like ?",


        },
        {
            key: 1,
            value: "公文收文",
            field: "runId", //此项为要关联的主键
            choosekey: 'id',
            type: "nsw",
            timefield: "run.data.mainFields.swsj",
            defkey: "swlc211111111111111111",
            conditions: "F_swbt like ?",

        },
        {
            key: 2,
            value: "审批项目",
            field: "id",
            choosekey: 'id',
            type: "sp",
            timefield: "firstdeclaretime",
            defkey: null,
        },
        {
            key: 3,
            value: "会议会审",
            field: "discussionId",
            type: "meetingSystem",
            clientId: "meetingSystem",
            timefield: "none",
            defkey: null,
        }
    ],

    getUrlKey(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
    },




    mergeTab(tab, row, col, rowHeight, colWidth) {

        row--;
        col--;

        var choosed = tab.rows[row].cells[col];

        choosed.rowSpan = rowHeight;
        choosed.colSpan = colWidth;

        for (var i = row + rowHeight - 1; i >= row; i--) {
            var data = tab.rows[i];
            for (var k = col + colWidth - 1; k >= col; k--) {
                if (i == row && k == col) continue;
                var td = tab.rows[i].cells[k];
                td.style.display = "none";
                // td.innerText = "abc";
                // td.style.border = "1px solid red";

            }
        }
    },


    getParamsbyKey(key) {
        var arr = this.typeList;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].key != key) continue;
            break;
        }
        return arr[i];
    },



    setRowStyle(row) {
        return 'cursor:pointer';
    },

    popmsg(hwnd, msg, type) {
        if (type == null) hwnd.$message(msg);
        else if (type == "err") hwnd.$message.error(msg);
        else if (type == "war") hwnd.$message({ message: msg, type: "warning" });
        else hwnd.$message({ message: msg, type: "success" });
    },

    ajax_(url, key, fRet) {
        axios.get(url, key).then(e => { fRet(e) });
    },

    setTimer(f1, time, times) {

        var count = -1;
        if (times != null) count = times;
        var tk = window.setInterval(fTime, time);
        var evt = new Object();
        evt.target = tk;
        evt.tkcount = count;
        function fTime() {
            if (count == 0) {
                window.clearInterval(evt.target);
                return;
            }
            count--;
            evt.tkcount = count;
            f1(evt);
        }
    },

    setValue(keyField, value, isEncode) {


        var loc = window.localStorage;
        if (!loc) {
            atler("浏览器不支持存储，请更换chrome浏览器");
            return;
        }
        var jsonStr = mJson.stringify(value);

        jsonStr = Base64.encode(jsonStr);

        // console.log(jsonStr, jsonStr.length );

        if (!isEncode) { loc.setItem(keyField, jsonStr); return; }

        var newStr = "";
        for (var i = 0; i < jsonStr.length; i++) {
            for (var k = 104; k < 117; k++) {
                if (i > jsonStr.length - 1) break;
                var key = jsonStr.charCodeAt(i) + k;
                newStr += String.fromCharCode(key);
                i++;
            }
            i--;
        }
        loc.setItem(keyField, newStr);
    },


    getValue(keyField, isDecode) {
        var loc = window.localStorage;
        if (!loc) {
            atler("浏览器不支持存储，请更换chrome浏览器");
            return null;
        }
        var jsonStr = loc.getItem(keyField);
        if (jsonStr == null) return null;

        if (!isDecode) {
            jsonStr = Base64.decode(jsonStr);
            var value = mJson.parse(jsonStr);
            return value;
        }

        var newStr = "";
        for (var i = 0; i < jsonStr.length; i++) {
            for (var k = 104; k < 117; k++) {
                if (i > jsonStr.length - 1) break;
                var key = jsonStr.charCodeAt(i) - k;
                newStr += String.fromCharCode(key);
                i++;
            }
            i--;
        }
        jsonStr = Base64.decode(newStr);
        var value = mJson.parse(jsonStr);
        return value;
    }

    // //判断一个url是否可以访问
    // function IsLoad(_url,fun){
    //     $.ajax({
    //         url:_url,
    //         type:"get",
    //         success:function(){
    //           //说明请求的url存在，并且可以访问
    //           if($.isFunction(fun)){
    //                   fun(true);
    //                 }
    //         },
    //         statusCode:{
    //           404:function(){
    //             //说明请求的url不存在
    //             if($.isFunction(fun)){
    //               fun(false);
    //             }
    //           }
    //         }
    //       });
    //   }
    //   //调用
    //   IsLoad('www.baidu.com',function(res){
    //       if(res){
    //         alert('请求的url可以访问');
    //       }
    //   });






}