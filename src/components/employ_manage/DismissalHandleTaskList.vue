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
          退工档案任务单
          <div slot="content">
            <search-employment @on-search="searchEmploiees" :isLoading='isLoading' :showHandle="showHandle"></search-employment>
          </div>
        </Panel>
      </Collapse>
    </div>
    <Row type="flex" justify="start" class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <!-- <Button type="primary" @click="goHandle">办理</Button> -->
         <Button type="primary" @click="batchManagement">批量办理</Button>
         <Button type="primary" @click="explain">外来情况说明</Button>
         <Button type="primary" @click="printReturn">打印外来退工单</Button>
        <!-- <Button type="primary" @click="batchOperating">批量操作</Button> -->
        <Button type="info" @click="exportXLS">导出XLS</Button>
      </Col>
    </Row>
    <Row type="flex" justify="start" class="mt20">
      <Col :sm="{span: 20}" class="tr">
    <Table border id="dissList" height="300" :row-class-name="rowClassName" :columns="dismissalColumns" :data="dismissalData" ref="dismissalData" :loading="isLoading"  @on-row-dblclick="handleData" @on-sort-change="SortChange" class="mt20"></Table>
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
      <Col :sm="{span: 3, offset: 1}" class="pt10">
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
        <Radio label="99" >
            <span>未反馈</span>
             <span>{{RadioData.noFeedback}}</span>
        </Radio>
        <Radio label="98" >
            <span>退工任务单签收退工未成功</span>
             <span>{{RadioData.refuseWaitFinished}}</span>
        </Radio>
        <Radio label="1">
            <span>退工成功</span>
            <span>{{RadioData.refuseFinished}}</span>
        </Radio>
        <Radio label="2">
            <span>档未到先退工</span>
            <span>{{RadioData.refuseBeforeWithFile}}</span>
        </Radio>
        <Radio label="3">
            <span>退工单盖章未返回</span>
             <span>{{RadioData.refuseTicketStampNoReturn}}</span>
        </Radio>
        <Radio label="4">
            <span>退工失败</span>
            <span>{{RadioData.refuseFailed}}</span>
        </Radio>
        <Radio label="5">
            <span>前道要求批退</span>
            <span>{{RadioData.beforeBatchNeedRefuse}}</span>
        </Radio>
        <Radio label="6">
            <span>其他</span>
            <span>{{RadioData.other}}</span>
        </Radio>
         <Radio label="66">
            <span>系统自行撤销</span>
            <span>{{RadioData.systemCancel}}</span>
        </Radio>
        <Radio label="0">
            <span>TOTAL</span>
            <span>{{RadioData.amount}}</span>
        </Radio>
    </RadioGroup>
      </Col>
    </Row>
   
  </div>
</template>
<script>
import {
  em_print,
  customerInfo,
  batchOperate
} from "../../assets/js/employ_manage/common_filed";
import searchEmployment from "./common/SearchEmployment.vue";
import employeeInfo from "./common/EmployeeInfo.vue";
import api from "../../api/employ_manage/hire_operator";
import tableStyle from "../../api/table_style";

export default {
  components: { searchEmployment },
  data() {
    return {
      jobGroup: "",
      vertical: "",
      jobData: {
        job: 0,
        noJob:0
      },
      RadioData: {
        noSign: "",
        employSuccess: "",
        noRecord: ""
      },
      initSearch: false,
      initSearchC: false,
      isLoading: false,
      pageData: {
        total: 0,
        pageNum: 1,
        pageSize: this.$utils.EMPLOYEE_DEFAULT_PAGE_SIZE,
        pageSizeOpts: this.$utils.EMPLOYEE_DEFAULT_PAGE_SIZE_OPTS
      },
      searchConditions: [],
      searchCondition: {
        params: "",
        taskStatus: ""
      },
      collapseInfo: [1],
      showHandle: {
        show: true,
        name: "resign"
      },
      dismissalColumns: [
        { title: "", type: "selection", width: 60 },
        {
          title: "序号",
          key: "empTaskId",
          align: "center",
          width: 90,
          sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", {
                on: {
                  "click": (event) => {
                     this.copyClick(event);
                   }
                }            
              }, params.row.empTaskId)
            ]);
          }
        },
        {
          title: "退工成功日期",
          key: "jobCentreFeedbackDate",
          align: "center",
          width: 130,
          sortable: true,
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", {
                on: {
                  "click": (event) => {
                     this.copyClick(event);
                   }
                }            
              }, params.row.jobCentreFeedbackDate)
            ]);
          }
        },
        {
          title: "退工原因",
          key: "outReason",
          align: "center",
          width: 250,
          sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", {
                on: {
                  "click": (event) => {
                     this.copyClick(event);
                   }
                }            
              }, params.row.outReason)
            ]);
          }
        },
        {
          title: "用工属性",
          key: "employProperty",
          align: "center",
          width: 106,
          sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", {
                on: {
                  "click": (event) => {
                     this.copyClick(event);
                   }
                }            
              }, params.row.employProperty)
            ]);
          }
        },
        {
          title: "办理类型",
          key: "handleType",
          align: "center",
          width: 116,
          sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", {
                on: {
                  "click": (event) => {
                     this.copyClick(event);
                   }
                }            
              }, params.row.handleType)
            ]);
          }
        },
        {
          title: "雇员编号",
          key: "employeeId",
          align: "center",
          width: 120,
          sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "right" } }, [
              h("span", {
                on: {
                  "click": (event) => {
                     this.copyClick(event);
                   }
                }            
              }, params.row.employeeId)
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
              h(
                "span",
                {
                  on: {
                  "click": (event) => {
                     this.copyClick(event);
                   }
                }, style: {
                    "font-weight": "bold"
                  }
                },
                params.row.employeeName
              )
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
              h(
                "span",
                {
                  on: {
                  "click": (event) => {
                     this.copyClick(event);
                   }
                }, style: {
                    "font-weight": "bold"
                  }
                },
                params.row.idNum
              )
            ]);
          }
        },
        {
          title: "公司编号",
          key: "companyId",
          align: "center",
          width: 120,
          sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h("span", {
                on: {
                  "click": (event) => {
                     this.copyClick(event);
                   }
                }            
              }, params.row.companyId)
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
            return h("div", { on: {
                  "click": (event) => {
                     this.copyClick(event);
                   }
                }, style: { textAlign: "left" } }, [
              h("span", params.row.title),
              h("span", params.row.ciCi)
            ]);
          }
        },
        {
          title: "客服经理",
          key: "leaderShipName",
          align: "center",
          width: 106,
          sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h("span", {
                on: {
                  "click": (event) => {
                     this.copyClick(event);
                   }
                }            
              }, params.row.leaderShipName)
            ]);
          }
        },
        {
          title: "客服中心",
          key: "serviceCenter",
          align: "center",
          width: 150,
          sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", {
                on: {
                  "click": (event) => {
                     this.copyClick(event);
                   }
                }            
              }, params.row.serviceCenter)
            ]);
          }
        },
        {
          title: "档案编号",
          key: "docNum",
          align: "center",
          width: 120,
          sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h("span", {
                on: {
                  "click": (event) => {
                     this.copyClick(event);
                   }
                }            
              }, params.row.docNum)
            ]);
          }
        },
        {
          title: "预留档案编号",
          key: "yuliuDocNum",
          align: "center",
          width: 150,
          sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h("span", {
                on: {
                  "click": (event) => {
                     this.copyClick(event);
                   }
                }            
              }, params.row.yuliuDocNum)
            ]);
          }
        },
        {
          title: "存档地",
          key: "archivePlace",
          align: "center",
          width: 150,
           sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", {
                on: {
                  "click": (event) => {
                     this.copyClick(event);
                   }
                }            
              }, params.row.archivePlace)
            ]);
          }
        },
        {
          title: "实际录用日期",
          key: "employDate",
          align: "center",
          width: 130,
           sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h("span", {
                on: {
                  "click": (event) => {
                     this.copyClick(event);
                   }
                }            
              }, params.row.employDate)
            ]);
          }
        },
        {
          title: "退工日期",
          key: "outDate",
          align: "center",
          width: 120,
          sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h("span", {
                on: {
                  "click": (event) => {
                     this.copyClick(event);
                   }
                }            
              }, params.row.outDate)
            ]);
          }
        },
        {
          title: "退工反馈",
          key: "resignFeedback",
          align: "center",
          width: 150,
           sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", {
                on: {
                  "click": (event) => {
                     this.copyClick(event);
                   }
                }            
              }, params.row.resignFeedback)
            ]);
          }
        },
        {
          title: "用工反馈",
          key: "employFeedback",
          align: "center",
          width: 150,
           sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", {
                on: {
                  "click": (event) => {
                     this.copyClick(event);
                   }
                }            
              }, params.row.employFeedback)
            ]);
          }
        },
        {
          title: "公司特殊情况",
          key: "refuseSpecial",
          align: "center",
          width: 110,
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h("span", {
                on: {
                  "click": (event) => {
                     this.copyClick(event);
                   }
                }            
              }, params.row.refuseSpecial)
            ]);
          }
        },
        {
          title: "是否翻牌",
          key: "changeCompany",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h("span", {
                on: {
                  "click": (event) => {
                     this.copyClick(event);
                   }
                }            
              }, params.row.changeCompany)
            ]);
          }
        }
      ],
      dismissalData: [],
      searchResultData: []
    };
  },
  mounted() {
    // this.queryAmResign({}),
    // this.queryResignTaskCount({})
  },
  methods: {
    explain(){
      let params = this.searchCondition;
      api.resignSearchExplainWord(params);
    },
    printReturn(){
      let params = this.searchCondition;
      api.resignSearchPrintReturnWord(params);
    },
    rowClassName(row, index) {
      if (row.job != undefined && row.job == "N") {
        return "demo-table-error-row";
      }
      return "";
    },
    searchEmploiees(conditions, searchForm) {
      this.pageData.pageNum = 1;
      this.searchConditions = [];
      if (searchForm.isFinish != 2) {
        var isFinish = "a.is_finish=" + searchForm.isFinish;
        this.searchConditions.push(isFinish);
      }
      for (var i = 0; i < conditions.length; i++)
        this.searchConditions.push(conditions[i].exec);

      this.searchCondition.params = this.searchConditions.toString();

      this.queryAmResign(this.searchCondition);
      this.queryResignTaskCount(this.searchCondition);
    },
    goHandle() {
      this.$router.push({ name: "dismissalHandleEmployment" });
    },
    batchOperating() {},
    exportXLS() {
      let params = this.searchCondition;
      api.resignSearchExportOpt(params);
    },
    queryAmResign(params) {
      this.isLoading = true;
      let self = this;
      api
        .queryAmResign({
          pageSize: this.pageData.pageSize,
          pageNum: this.pageData.pageNum,
          params: params
        })
        .then(data => {
          self.dismissalData = data.data.rows;
          self.pageData.total = Number(data.data.total);
          self.isLoading = false;
        });
    },
    queryResignTaskCount(params) {
      let self = this;
      api
        .queryResignTaskCount({
          pageSize: this.pageData.pageSize,
          pageNum: this.pageData.pageNum,
          params: params
        })
        .then(data => {
          self.RadioData = data.data.row[0];
          self.jobData = data.data.amTaskStatusBO;
        });
    },
    showInfoTw(ind) {
      this.pageData.pageNum = 1;
      this.searchCondition.params = this.searchConditions.toString();
      this.searchCondition.taskStatus = ind;
      if (this.jobGroup != "") {
        this.searchCondition.job = `${this.jobGroup}`;
      }
      this.queryAmResign(this.searchCondition);
    },
    showJob(ind) {
      this.pageData.pageNum = 1;
      this.searchCondition.params = this.searchConditions.toString();
      //this.searchCondition.taskStatus = "";
      if (this.jobGroup != "") {
        this.searchCondition.job = `${this.jobGroup}`;
      }
      this.queryAmResign(this.searchCondition);
      this.queryResignTaskCount(this.searchCondition);
    },
    handlePageNum(val) {
      this.pageData.pageNum = val;
      let params = this.searchCondition;
      this.queryAmResign(params);
    },
    handlePageSize(val) {
      this.pageData.pageSize = val;
      let params = this.searchCondition;
      this.queryAmResign(params);
      this.queryResignTaskCount(params);
    },
    handleData(row, index) {
      this.$router.push({
        name: "dismissalHandleEmployment",
        query: {
          empTaskId: row.empTaskId,
          employeeId: row.employeeId,
          companyId: row.companyId,
          employmentId: row.employmentId
        }
      });
    },
    batchManagement() {
      let selection = this.$refs.dismissalData.getSelection();
      if (selection.length == 0) {
        alert("没有选中的列");
        return;
      }

      let empTaskIds = [];
      selection.forEach(item => {
        empTaskIds.push(item.empTaskId);
      });

      var fromData = {};
      fromData.empTaskIds = empTaskIds;
      const _self = this;
      api.batchResignCheck(fromData).then(data => {
        if (data.code == 200) {
          if (data.data.empTask) {
            var content =
              "已经办理了" + data.data.empTask + "条数据，请重新选择数据";
            this.$Message.error(content);
            return;
          }
          if (data.data.resignCount) {
            var content;

            var content =
              "退工办理已经存在" +
              data.data.resignCount +
              "条数据" +
              "确认要覆盖吗？";

            _self.$Modal.confirm({
              title: "",
              content: content,
              onOk: function() {
                _self.$router.push({
                  name: "refuseHandleBatch",
                  query: { empTaskIds: empTaskIds }
                });
              },
              error: function(error) {}
            });
          } else {
            _self.$router.push({
              name: "refuseHandleBatch",
              query: { empTaskIds: empTaskIds }
            });
          }
        } else {
          this.$Message.error("批量失败！" + data.message);
        }
      });
    },
    SortChange(e) {
      this.orderConditions = [];
      this.searchConditions = [];

      var userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
      var conditions = JSON.parse(
        sessionStorage.getItem("resign" + userInfo.userId)
      );

      var isFinish = JSON.parse(
        sessionStorage.getItem("resignIsFinish" + userInfo.userId)
      );
      var storeOrder = JSON.parse(
        sessionStorage.getItem("resignOrder" + userInfo.userId)
      );
      if (conditions !== null && conditions.length > 0) {
        for (var i = 0; i < conditions.length; i++)
          this.searchConditions.push(conditions[i].exec);
      }
      var dx = "";
      if (e.key === "jobCentreFeedbackDate") {
        dx = "f.job_centre_feedback_date";
      } else if (e.key === "outDate") {
        dx = "a.out_date";
      } else if (e.key === "companyId") {
        dx = "a.company_id";
      } else if (e.key === "title") {
        dx = "h.title";
      } else if (e.key === "employeeId") {
        dx = "a.employee_id";
      } else if (e.key === "employmentId") {
        dx = "f.employment_id";
      } else if (e.key === "idNum") {
        dx = "d.id_num";
      } else if (e.key === "employeeName") {
        dx = "d.employee_name";
      } else if (e.key === "docNum") {
        dx = "c.doc_num";
      } else if (e.key === "yuliuDocNum") {
        dx = "c.yuliu_doc_num";
      } else if (e.key === "employFeedbackOptDate") {
        dx = "c.employ_feedback_opt_date";
      } else if (e.key === "diaodangFeedback") {
        dx = "c.diaodang_feedback";
      } else if (e.key === "diaodangFeedbackOptDate") {
        dx = "c.diaodang_feedback_opt_date";
      } else if(e.key ==="empTaskId"){
        dx = "a.emp_task_id";
      } else if(e.key ==="outReason"){
        dx = "a.out_reason";
      }else if(e.key ==="employProperty"){
        dx = "a.employ_property";
      }else if(e.key ==="handleType"){
        dx = "b.handle_type";
      }else if(e.key ==="leaderShipName"){
        dx = "h.leader_ship_name";
      }else if(e.key ==="serviceCenter"){
        dx = "h.service_center";
      }else if(e.key ==="archivePlace"){
        dx = "c.archive_place";
      }else if(e.key ==="employDate"){
        dx = "b.employ_date";
      }else if(e.key ==="resignFeedback"){
        dx = "f.resign_feedback";
      }else if(e.key === "employFeedback"){
         dx = "c.employ_feedback";
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
        "resignOrder" + userInfo.userId,
        JSON.stringify(this.orderConditions)
      );

      if (this.orderConditions.length > 0) {
        for (let index in this.orderConditions) {
          this.searchConditions.push(this.orderConditions[index]);
        }
      }

      if (isFinish != 2) {
        var tempIsFinish = "a.is_finish=" + isFinish;
        this.searchConditions.push(tempIsFinish);
      }

      this.searchCondition.params = this.searchConditions.toString();

      this.isLoading = true;
      let self = this;
      api
        .queryAmResign({
          pageSize: this.pageData.pageSize,
          pageNum: this.pageData.pageNum,
          params: this.searchCondition
        })
        .then(data => {
          self.dismissalData = data.data.rows;
          // self.pageData.total = Number(data.data.total);
          self.isLoading = false;
          // this.searchCondition.taskStatus = 0;
          this.changeSortClass(this.orderConditions);
        });
    },
    changeSortClass(storeOrder) {
      this.dismissalColumns.forEach((e, idx) => {
        let order = "normal";
        if (storeOrder == null) {
        } else {
          if (storeOrder.length > 0) {
            for (var index in storeOrder) {
              var orders = storeOrder[index].split(" ");
              if (
                e.key === "jobCentreFeedbackDate" &&
                storeOrder[index].indexOf("job_centre_feedback_date") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("dissList", idx - 1, order);
                break;
              }
              if (
                e.key === "outDate" &&
                storeOrder[index].indexOf("out_date") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("dissList", idx - 1, order);
                break;
              }
              if (
                e.key === "employeeId" &&
                storeOrder[index].indexOf("employee_id") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("dissList", idx - 1, order);
                break;
              }

              if (
                e.key === "companyId" &&
                storeOrder[index].indexOf("company_id") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("dissList", idx - 1, order);
                break;
              }

              if (
                e.key === "title" &&
                storeOrder[index].indexOf("title") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("dissList", idx - 1, order);
                break;
              }

              if (
                e.key === "employmentId" &&
                storeOrder[index].indexOf("employment_id") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("dissList", idx - 1, order);
                break;
              }

              if (
                e.key === "employeeName" &&
                storeOrder[index].indexOf("employee_name") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("dissList", idx - 1, order);
                break;
              }

              if (
                e.key === "idNum" &&
                storeOrder[index].indexOf("id_num") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("dissList", idx - 1, order);
                break;
              }

              if (
                e.key === "docNum" &&
                storeOrder[index].indexOf("doc_num") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("dissList", idx - 1, order);
                break;
              }

              if (
                e.key === "yuliuDocNum" &&
                storeOrder[index].indexOf("yuliu_doc_num") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("dissList", idx - 1, order);
                break;
              }

              if (
                e.key === "employFeedbackOptDate" &&
                storeOrder[index].indexOf("employ_feedback_opt_date") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("dissList", idx - 1, order);
                break;
              }

              if (
                e.key === "diaodangFeedback" &&
                storeOrder[index].indexOf("diaodang_feedback") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("dissList", idx - 1, order);
                break;
              }

              if (
                e.key === "diaodangFeedbackOptDate" &&
                storeOrder[index].indexOf("diaodang_feedback_opt_date") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("dissList", idx - 1, order);
                break;
              }

              if (
                e.key === "empTaskId" &&
                storeOrder[index].indexOf("emp_task_id") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("dissList", idx - 1, order);
                break;
              }

              if (
                e.key === "outReason" &&
                storeOrder[index].indexOf("out_reason") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("dissList", idx - 1, order);
                break;
              }

              if (
                e.key === "employProperty" &&
                storeOrder[index].indexOf("employ_property") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("dissList", idx - 1, order);
                break;
              }

              if (
                e.key === "handleType" &&
                storeOrder[index].indexOf("handle_type") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("dissList", idx - 1, order);
                break;
              }

              if (
                e.key === "title" &&
                storeOrder[index].indexOf("title") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("dissList", idx - 1, order);
                break;
              }

              if (
                e.key === "leaderShipName" &&
                storeOrder[index].indexOf("leader_ship_name") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("dissList", idx - 1, order);
                break;
              }

              if (
                e.key === "serviceCenter" &&
                storeOrder[index].indexOf("service_center") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("dissList", idx - 1, order);
                break;
              }

              if (
                e.key === "archivePlace" &&
                storeOrder[index].indexOf("archive_place") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("dissList", idx - 1, order);
                break;
              }

              if (
                e.key === "employDate" &&
                storeOrder[index].indexOf("employ_date") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("dissList", idx - 1, order);
                break;
              }

              if (
                e.key === "resignFeedback" &&
                storeOrder[index].indexOf("resign_feedback") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("dissList", idx - 1, order);
                break;
              }

              if (
                e.key === "employFeedback" &&
                storeOrder[index].indexOf("employ_feedback") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("dissList", idx - 1, order);
                break;
              }

              
            }
          }
        }
      });
    },copyClick(event){
        var text = event.target;
        if (document.body.createTextRange) {
            var range = document.body.createTextRange();
            range.moveToElementText(text);
            range.select();
        } else if (window.getSelection) {
            var selection = window.getSelection();
            var range = document.createRange();
            range.selectNodeContents(text);
            selection.removeAllRanges();
            selection.addRange(range);
        } else {
            alert("浏览器不支持");
        }
    }
  }
};
</script>
