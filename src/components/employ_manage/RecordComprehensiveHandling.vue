<style>
.ivu-table .demo-table-error-row td span {
  color: #ff6600;
}
.ivu-table .demo-table-error-row td div {
  color: #ff6600;
}
</style>
<template>
  <div>
    <div class="smList">
      <Collapse v-model="collapseInfo">
        <Panel name="1">
          用工资料管理任务单
          <div slot="content">
            <search-employment @on-search="searchEmploiees" :isLoading='isLoading' :showHandle="showHandle" ></search-employment>
          </div>
        </Panel>
      </Collapse>
    </div>
    <Row type="flex" justify="start" class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="info" @click="printLabel">打印贴头</Button>
        <!--<Button type="info" @click="printReturnList">批量打印退工单</Button>-->
        <Button type="info" @click="exportXLS">导出XLS</Button>
        <Button type="primary" @click="goFileMatrialsUseAndBorrow">档案材料利用与借出</Button>
      </Col>
    </Row>
    <Row type="flex" justify="start" class="mt20">
    <Col :sm="{span: 21}" class="tr">
    <Table border id="redList" height="300" :row-class-name="rowClassName" ref="payComSelection" :columns="recordComprehensiveHandlingColumns" :data="recordComprehensiveHandlingData"  @on-row-dblclick="handleData" @on-sort-change="SortChange" class="mt20"></Table>
     <Page
        class="pageSize"
        @on-change="handlePageNum"
        @on-page-size-change="handlePageSize"
        :total="pageData.total"
        :page-size="pageData.pageSize"
        :page-size-opts="pageData.pageSizeOpts"
        :current="pageData.pageNum"
        show-sizer show-total></Page>
      
     </Col>
     <Col :sm="{span: 2, offset: 1}" class="pt10">
       <RadioGroup v-model="jobGroup"  @on-change="showJob" vertical>
        <Radio label="Y" >
            <span>在职</span>
             <span>{{jobData.job}}</span>
        </Radio>
        <Radio label="N">
            <span>终止</span>
            <span>{{jobData.noJob}}</span>
        </Radio>
        </RadioGroup>
        <RadioGroup v-model="vertical"  @on-change="showInfoTw" vertical>
           <Radio label="1" >
             <span>未完成</span>
             <span>{{RadioData.noHandleEnd}}</span>
           </Radio>
        <Radio label="3">
            <span>已完成</span>
            <span>{{RadioData.handleEnd}}</span>
        </Radio>
       </RadioGroup>
    </Col>
    </Row> 
  </div>
</template>
<script>
import {
  em_print,
  customerInfo
} from "../../assets/js/employ_manage/common_filed";
import searchEmployment from "./common/SearchEmployment.vue";
import employeeInfo from "./common/EmployeeInfo.vue";
import api from "../../api/employ_manage/hire_operator";
import tableStyle from "../../api/table_style";
export default {
  components: { employeeInfo, searchEmployment },
  data() {
    return {
      jobGroup:"",
      vertical: "",
      jobData: {
        job: 0,
        noJob: 100
      },
      RadioData: {
        handleEnd: 200,
        noHandleEnd: 100
      },
      initSearch: false,
      initSearchC: false,
      initSearchR: false,
      isLoading: false,
      pageData: {
        total: 0,
        pageNum: 1,
        pageSize: this.$utils.EMPLOYEE_DEFAULT_PAGE_SIZE,
        pageSizeOpts: this.$utils.EMPLOYEE_DEFAULT_PAGE_SIZE_OPTS
      },
      collapseInfo: [1],
      searchConditions: [],
      showHandle: {
        show: false,
        name: "archive"
      },
      searchCondition: {
        params: "",
        taskStatus: "",
        taskCategory: "",
        taskResignStatus: ""
      },
      // 下半部分
      recordComprehensiveHandlingColumns: [
        { title: "", type: "selection", width: 60 },
        {
          title: "用工方式",
          key: "employWay",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.employWay)
            ]);
          }
        },
        {
          title: "用工属性",
          key: "employProperty",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.employProperty)
            ]);
          }
        },
        {
          title: "退工成功日期",
          key: "jobCentreFeedbackDate",
          align: "center",
          width: 150,
          sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.jobCentreFeedbackDate)
            ]);
          }
        },
        {
          title: "退工原因",
          key: "outReason",
          align: "center",
          width: 250,
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.outReason)
            ]);
          }
        },
        {
          title: "办理类型",
          key: "handleType",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.handleType)
            ]);
          }
        },
        {
          title: "雇员编号",
          key: "employeeId",
          align: "center",
          width: 150,
          sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "right" } }, [
              h("span", params.row.employeeId)
            ]);
          }
        },
        {
          title: "雇员姓名",
          key: "employeeName",
          align: "center",
          width: 150,
          sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.employeeName)
            ]);
          }
        },
        {
          title: "证件号码",
          key: "idNum",
          align: "center",
          width: 150,
          sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "right" } }, [
              h("span", params.row.idNum)
            ]);
          }
        },
        {
          title: "客户编号",
          key: "companyId",
          align: "center",
          width: 150,
          sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "right" } }, [
              h("span", params.row.companyId)
            ]);
          }
        },
        {
          title: "公司名称",
          key: "title",
          align: "center",
          width: 250,
          sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.title),
              h("span", params.row.cici)
            ]);
          }
        },
        {
          title: "客服经理",
          key: "leaderShipName",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.leaderShipName)
            ]);
          }
        },
        {
          title: "客服中心",
          key: "serviceCenter",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.serviceCenter)
            ]);
          }
        },
        {
          title: "档案编号",
          key: "docNum",
          align: "center",
          width: 150,
          sortable: true,
          render: (h, params) => {
            return h("div", { style: { textAlign: "right" } }, [
              h("span", params.row.docNum)
            ]);
          }
        },
        {
          title: "预留档案编号",
          key: "yuliuDocNum",
          align: "center",
          width: 150,
          sortable: true,
          render: (h, params) => {
            return h("div", { style: { textAlign: "right" } }, [
              h("span", params.row.yuliuDocNum)
            ]);
          }
        },
        {
          title: "存档地",
          key: "archivePlace",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.archivePlace)
            ]);
          }
        },
        {
          title: "实际录用日期",
          key: "employDate",
          align: "center",
          width: 150,
          sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.employDate)
            ]);
          }
        },
        {
          title: "退工日期",
          key: "outDate",
          align: "center",
          width: 150,
          sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.outDate)
            ]);
          }
        },
        {
          title: "出库日期",
          key: "storageOutDate",
          align: "center",
          width: 150,
          sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.storageOutDate)
            ]);
          }
        },
        {
          title: "用工反馈",
          key: "employFeedback",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.employFeedback)
            ]);
          }
        },
        {
          title: "退工反馈",
          key: "resignFeedback1",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.resignFeedback1)
            ]);
          }
        },
        {
          title: "退档日期",
          key: "returnDocDate",
          align: "center",
          width: 200,
          sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.returnDocDate)
            ]);
          }
        },
        {
          title: "退工送办日期",
          key: "resignHandleDate",
          align: "center",
          width: 200,
          sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.resignHandleDate)
            ]);
          }
        },
        {
          title: "公司特殊情况",
          key: "archiveSpecial",
          align: "center",
          width: 200,
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.archiveSpecial)
            ]);
          }
        },
        {
          title: "是否翻牌",
          key: "changeCompany",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.changeCompany)
            ]);
          }
        }
      ],
      recordComprehensiveHandlingData: [],
      // 弹出框
      isShowStockTitle: false,
      customerInfos: [customerInfo, customerInfo, customerInfo]
    };
  },
  mounted() {
    //  this.archiveQuery({})
    //  this.employeeArchiveCollection({})
    //  this.resignArchiveCollection({})
  },
  methods: {
    rowClassName(row, index) {
      if (row.job != undefined && row.job == "N") {
        return "demo-table-error-row";
      }
      return "";
    },
    searchEmploiees(conditions, searchForm) {
      this.pageData.pageNum = 1;
      this.searchConditions = [];

      for (var i = 0; i < conditions.length; i++)
        this.searchConditions.push(conditions[i].exec);

      this.searchCondition.params = this.searchConditions.toString();
      this.archiveQuery(this.searchCondition);
      this.taskCountArchive(this.searchCondition);
      // this.resignArchiveCollection(this.searchCondition);
    },
    goHandle() {
      this.$router.push({ name: "recordComprehensive" });
    },
    goFileMatrialsUseAndBorrow() {
      let selection = this.$refs.payComSelection.getSelection();

      //判断条件
      //是否有选中列
      if (selection.length == 0) {
        alert("没有选中的列");
        return;
      }

      //已有批次的不可再添加
      let isHaveBatch = false;
      var tempId;
      var tempId1;
      var employeeName;
      selection.some(item => {
        tempId = item.archiveId;
        tempId1 = item.employeeId;
        employeeName = item.employeeName;
      });

      this.$router.push({
        name: "fileMatrialsUseAndBorrow",
        query: {
          archiveId: tempId,
          employeeId: tempId1,
          employeeName: employeeName
        }
      });
    },
    exportXLS() {
      let params = this.searchCondition;
      api.archiveSearchExportOpt(params);
    },
    printLabel() {
      let selection = this.$refs.payComSelection.getSelection();
      if (selection.length == 0) {
        alert("没有选中的列");
        return;
      }
      let head = `<!doctype html><html><head><title>打印贴头</title></head><body>`;
      let foot = `</body></html>`;
      let obj = "";
      let isFrist = true;
      obj += '<table cellpadding="0" cellspacing="0">';
      selection.forEach(sel => {
        let docType = "";
        let docNum = "";
        if (sel.docType && sel.docNum) {
          docType = sel.docType;
          docNum = sel.docNum;
        } else if (sel.yuliuDocType && sel.yuliuDocNum) {
          docType = sel.yuliuDocType;
          docNum = sel.yuliuDocNum;
        }
        if (isFrist == false) {
          //obj += '<tr><td height="50px"></td></tr>';
        }
        if (isFrist) {
          isFrist = false;
        }
        obj +=
          "<tr>" +
          '<td height="60px">' +
          '<div class="lh20" style="width: 300;" float="left">&nbsp;&nbsp;<font size="6">' +
          docType +
          '</font><font size="6">' +
          docNum +
          '</font>&nbsp;&nbsp;&nbsp;<font size="6">' +
          sel.employeeName +
          "</font></div>" +
          '<div class="lh20" style="width: 60px;"><br/></div>' +
          '<div class="lh20" style="width: 145px;" float="right">&nbsp;&nbsp;&nbsp;<font size="6">' +
          sel.idNum +
          "</font></div>" +
          "</td>" +
          "</tr>";
      });
      obj += "</table>";
      let html = head + obj + foot;
      let pwin = window.open("", "print");
      pwin.document.write(html);
      pwin.document.close();
      pwin.print();
    },
    generateInStock() {},
    sendToFileMangement() {},
    archiveQuery(params) {
      let self = this;
      api
        .queryAmArchive({
          pageSize: this.pageData.pageSize,
          pageNum: this.pageData.pageNum,
          params: params
        })
        .then(data => {
          self.recordComprehensiveHandlingData = data.data.rows;
          self.pageData.total = Number(data.data.total);
          self.isLoading = false;
          // self.searchCondition.taskStatus = "";
          // self.searchCondition.taskResignStatus = "";
        });
    },
    taskCountArchive(params) {
      this.isLoading = true;
      let self = this;
      api.taskCountArchive({
          params: params
        })
        .then(data => {
          self.jobData = data.data.amTaskStatusBO;
          self.RadioData = data.data.amArchiveStatusBO;
        });
    },
    showInfoTw(ind) {
      this.pageData.pageNum = 1;
      this.searchCondition.params = this.searchConditions.toString();
      this.searchCondition.taskStatus = ind;
      //this.searchCondition.taskCategory = category;
      this.archiveQuery(this.searchCondition);
    },
    showJob(ind) {
      this.pageData.pageNum = 1;
      this.searchCondition.params = this.searchConditions.toString();
      if(this.vertical!='')
      {
         this.searchCondition.taskStatus = this.vertical;
      }
      this.searchCondition.job = ind;
       this.archiveQuery(this.searchCondition);
    },
    handlePageNum(val) {
      this.pageData.pageNum = val;
      let params = this.searchCondition;
      this.archiveQuery(params);
    },
    handlePageSize(val) {
      this.pageData.pageSize = val;
      let params = this.searchCondition;
      this.archiveQuery(params);
      this.employeeArchiveCollection(params);
      this.resignArchiveCollection(params);
    },
    handleData(row, index) {
      this.$router.push({
        name: "recordComprehensive",
        query: {
          empTaskId: row.empTaskId,
          employmentId: row.employmentId,
          employeeId: row.employeeId,
          companyId: row.companyId,
          empTaskResignId: row.empTaskResignId
        }
      });
    },
    SortChange(e) {
      this.orderConditions = [];
      this.searchConditions = [];
      var userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
      var conditions = JSON.parse(sessionStorage.getItem("archive" + userInfo.userId));
      var storeOrder = JSON.parse(
        sessionStorage.getItem("archiveOrder" + userInfo.userId)
      );
      if (conditions !== null) {
        for (var i = 0; i < conditions.length; i++)
          this.searchConditions.push(conditions[i].exec);
      }
      var dx = "";
      if (e.key === "companyId") {
        dx = "b.company_id";
      } else if (e.key === "title") {
        dx = "h.title";
      } else if (e.key === "employeeId") {
        dx = "b.employee_id";
      } else if (e.key === "employmentId") {
        dx = "b.employment_id";
      } else if (e.key === "idNum") {
        dx = "d.id_num";
      } else if (e.key === "employeeName") {
        dx = "d.employee_name";
      } else if (e.key === "docNum") {
        dx = "c.doc_num";
      } else if (e.key === "yuliuDocNum") {
        dx = "c.yuliu_doc_num";
      } else if (e.key === "jobCentreFeedbackDate") {
        dx = "f.job_centre_feedback_date";
      } else if (e.key === "employDate") {
        dx = "b.employ_date";
      } else if (e.key === "outDate") {
        dx = "w.out_date";
      } else if (e.key === "storageOutDate") {
        dx = "c.storage_out_date";
      } else if (e.key === "returnDocDate") {
        dx = "f.return_doc_date";
      } else if (e.key === "resignHandleDate") {
        dx = "f.resign_handle_date";
      }

      const searchConditionExec = `${dx} ${e.order} `;
      if (storeOrder === null) {
      } else {
        this.orderConditions = storeOrder;
      }
      var isE = false;
      if (this.orderConditions.length > 0) {
        for (let index in this.orderConditions) {
          if (
            this.orderConditions[index].indexOf(dx) !== -1 &&
            e.order === "normal"
          ) {
            //如果是取消，则删除条件
            this.orderConditions.splice(index, 1);
            isE = true;
          } else if (
            this.orderConditions[index].indexOf(dx) !== -1 &&
            this.orderConditions[index].indexOf(e.order) === -1
          ) {
            //如果是切换查询顺序
            this.orderConditions.splice(index, 1);
            this.orderConditions.push(searchConditionExec);
            isE = true;
          } else if (this.orderConditions[index] === searchConditionExec) {
            this.orderConditions.splice(index, 1);
          }
        }

        if (!isE) {
          this.orderConditions.push(searchConditionExec);
        }
      } else {
        this.orderConditions.push(searchConditionExec);
      }

      sessionStorage.setItem(
        "archiveOrder" + userInfo.userId,
        JSON.stringify(this.orderConditions)
      );

      if (this.orderConditions.length > 0) {
        for (let index in this.orderConditions) {
          this.searchConditions.push(this.orderConditions[index]);
        }
      }
      this.searchCondition.params = this.searchConditions.toString();

      let self = this;
      api
        .queryAmArchive({
          pageSize: this.pageData.pageSize,
          pageNum: this.pageData.pageNum,
          params: this.searchCondition
        })
        .then(data => {
          self.recordComprehensiveHandlingData = data.data.rows;
          // self.pageData.total = Number(data.data.total);

          // self.searchCondition.taskStatus = "";
          // self.searchCondition.taskResignStatus = "";
          this.changeSortClass(this.orderConditions);
        });
    },
    printReturnList(){
      api.archiveSearchExportReturnList({pageSize: 1000,
          pageNum: 1,
          params: this.searchCondition});
    },
    changeSortClass(storeOrder) {
      this.recordComprehensiveHandlingColumns.forEach((e, idx) => {
        let order = "normal";
        if (storeOrder == null) {
        } else {
          if (storeOrder.length > 0) {
            for (var index in storeOrder) {
              var orders = storeOrder[index].split(" ");
              if (
                e.key === "employeeId" &&
                storeOrder[index].indexOf("employee_id") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass('redList', idx - 1, order);
                break;
              }

              if (
                e.key === "companyId" &&
                storeOrder[index].indexOf("company_id") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass('redList', idx - 1, order);
                break;
              }

              if (
                e.key === "title" &&
                storeOrder[index].indexOf("title") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass('redList', idx - 1, order);
                break;
              }

              if (
                e.key === "employmentId" &&
                storeOrder[index].indexOf("employment_id") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass('redList', idx - 1, order);
                break;
              }

              if (
                e.key === "employeeName" &&
                storeOrder[index].indexOf("employee_name") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass('redList', idx - 1, order);
                break;
              }

              if (
                e.key === "idNum" &&
                storeOrder[index].indexOf("id_num") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass('redList', idx - 1, order);
                break;
              }

              if (
                e.key === "docNum" &&
                storeOrder[index].indexOf("doc_num") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass('redList', idx - 1, order);
                break;
              }

              if (
                e.key === "yuliuDocNum" &&
                storeOrder[index].indexOf("yuliu_doc_num") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass('redList', idx - 1, order);
                break;
              }

              if (
                e.key === "jobCentreFeedbackDate" &&
                storeOrder[index].indexOf("job_centre_feedback_date") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass('redList', idx - 1, order);
                break;
              }

              if (
                e.key === "employDate" &&
                storeOrder[index].indexOf("employ_date") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass('redList', idx - 1, order);
                break;
              }

              if (
                e.key === "storageOutDate" &&
                storeOrder[index].indexOf("storage_out_date") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass('redList', idx - 1, order);
                break;
              }

              if (
                e.key === "returnDocDate" &&
                storeOrder[index].indexOf("return_doc_date") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass('redList', idx - 1, order);
                break;
              }

              if (
                e.key === "resignHandleDate" &&
                storeOrder[index].indexOf("resign_handle_date") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass('redList', idx - 1, order);
                break;
              }
            }
          }
        }
      });
    }
  },
  computed: {}
};
</script>
