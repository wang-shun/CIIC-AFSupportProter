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
         <Button type="primary" @click="batchManagement">批理办理</Button>
        <!-- <Button type="primary" @click="batchOperating">批量操作</Button> -->
        <Button type="info" @click="exportXLS">导出XLS</Button>
      </Col>
    </Row>
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
    <Table border :columns="searchResultColumns" :data="searchResultData" :loading="isLoading" class="mt20"></Table>
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
        taskStatus: 0
      },
      collapseInfo: [1],
      showHandle: {
        show: true,
        name: "resign"
      },
      dismissalColumns: [
        { title: "", type: "selection", width: 60 },
        {
          title: "退工成功日期",
          key: "jobCentreFeedbackDate",
          align: "center",
          width: 150,
          sortable: true,
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
          title: "用工属性",
          key: "employProperty",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.employProperty)
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
          sortable: 'custom',
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
          sortable: 'custom',
          render: (h, params) => {
            return h("div", { style: { textAlign: "right" } }, [
              h("span", params.row.idNum)
            ]);
          }
        },
        {
          title: "公司编号",
          key: "companyId",
          align: "center",
          width: 150,
          sortable: 'custom',
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
          sortable: 'custom',
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
          sortable:'custom',
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
          sortable: 'custom',
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.outDate)
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
          title: "综保退工日期",
          key: "comprehensiveInsuranceRefuseDate",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.comprehensiveInsuranceRefuseDate)
            ]);
          }
        },
        {
          title: "公司特殊情况",
          key: "refuseSpecial",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.refuseSpecial)
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
      dismissalData: [],
      searchResultColumns: [
        {
          title: "未反馈",
          key: "noFeedback",
          align: "center",
          width: 220,
          render: (h, params) => {
            return h(
              "a",
              {
                attrs: {
                  href: params.row.dataDownload
                },
                style: { textAlign: "right" },
                on: {
                  click: () => {
                    this.showInfoTw(99);
                  }
                }
              },
              params.row.noFeedback
            );
          }
        },
        {
          title: "退工任务单签收退工未成功",
          key: "refuseFinished",
          align: "center",
          width: 220,
          render: (h, params) => {
            return h(
              "a",
              {
                attrs: {
                  href: params.row.dataDownload
                },
                style: { textAlign: "right" },
                on: {
                  click: () => {
                    this.showInfoTw(98);
                  }
                }
              },
              params.row.refuseWaitFinished
            );
          }
        },
        {
          title: "退工成功",
          key: "refuseFinished",
          align: "center",
          width: 220,
          render: (h, params) => {
            return h(
              "a",
              {
                attrs: {
                  href: params.row.dataDownload
                },
                style: { textAlign: "right" },
                on: {
                  click: () => {
                    this.showInfoTw(1);
                  }
                }
              },
              params.row.refuseFinished
            );
          }
        },
        {
          title: "档未到先退工",
          key: "refuseBeforeWithFile",
          align: "center",
          width: 220,
          render: (h, params) => {
            return h(
              "a",
              {
                attrs: {
                  href: params.row.dataDownload
                },
                style: { textAlign: "right" },
                on: {
                  click: () => {
                    this.showInfoTw(2);
                  }
                }
              },
              params.row.refuseBeforeWithFile
            );
          }
        },
        {
          title: "退工单盖章未返回",
          key: "refuseTicketStampNoReturn",
          align: "center",
          width: 220,
          render: (h, params) => {
            return h(
              "a",
              {
                attrs: {
                  href: params.row.dataDownload
                },
                style: { textAlign: "right" },
                on: {
                  click: () => {
                    this.showInfoTw(3);
                  }
                }
              },
              params.row.refuseTicketStampNoReturn
            );
          }
        },
        {
          title: "退工失败",
          key: "refuseFailed",
          align: "center",
          width: 220,
          render: (h, params) => {
            return h(
              "a",
              {
                attrs: {
                  href: params.row.dataDownload
                },
                style: { textAlign: "right" },
                on: {
                  click: () => {
                    this.showInfoTw(4);
                  }
                }
              },
              params.row.refuseFailed
            );
          }
        },
        {
          title: "前道要求批退",
          key: "beforeBatchNeedRefuse",
          align: "center",
          width: 220,
          render: (h, params) => {
            return h(
              "a",
              {
                attrs: {
                  href: params.row.dataDownload
                },
                style: { textAlign: "right" },
                on: {
                  click: () => {
                    this.showInfoTw(5);
                  }
                }
              },
              params.row.beforeBatchNeedRefuse
            );
          }
        },
        {
          title: "其他",
          key: "other",
          align: "center",
          width: 220,
          render: (h, params) => {
            return h(
              "a",
              {
                attrs: {
                  href: params.row.dataDownload
                },
                style: { textAlign: "right" },
                on: {
                  click: () => {
                    this.showInfoTw(6);
                  }
                }
              },
              params.row.other
            );
          }
        },
        {
          title: "总计",
          key: "amount",
          align: "center",
          width: 231,
          render: (h, params) => {
            return h(
              "a",
              {
                attrs: {
                  href: params.row.dataDownload
                },
                style: { textAlign: "right" },
                on: {
                  click: () => {
                    this.showInfoTws(0);
                  }
                }
              },
              params.row.amount
            );
          }
        }
      ],
      searchResultData: []
    };
  },
  mounted() {
    // this.queryAmResign({}),
    // this.queryResignTaskCount({})
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
          this.searchCondition.taskStatus = 0;
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
          self.searchResultData = data.data.row;
        });
    },
    showInfoTw(ind) {
      this.pageData.pageNum = 1;
      this.searchCondition.params = this.searchConditions.toString();
      this.searchCondition.taskStatus = ind;
      this.queryAmResign(this.searchCondition);
    },
    showInfoTws(ind) {
      this.searchCondition.params = this.searchConditions.toString();
      this.searchCondition.taskStatus = ind;
      this.queryAmResign(this.searchCondition);
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
          }else{
               _self.$router.push({
                  name: "refuseHandleBatch",
                  query: { empTaskIds: empTaskIds }
                });
          }
        } else {
          this.$Message.error("批量失败！" + data.message);
        }
      });
    },SortChange(e){
      this.orderConditions = [];
      this.searchConditions = [];
     
      var userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
      var conditions = JSON.parse(sessionStorage.getItem("resign" + userInfo.userId));
      
      var isFinish = JSON.parse(sessionStorage.getItem("resignIsFinish" + userInfo.userId));
      var storeOrder = JSON.parse(sessionStorage.getItem("resignOrder" + userInfo.userId));
      if (conditions !== null&&conditions.length>0) {
        for (var i = 0; i < conditions.length; i++)
          this.searchConditions.push(conditions[i].exec);
      }
      var dx = "";
      if(e.key==="jobCentreFeedbackDate"){
        dx = "f.job_centre_feedback_date";
      }else if(e.key==="outDate"){
        dx = "a.out_date";
      }else if (e.key === "companyId") {
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
    },changeSortClass(storeOrder) {
      
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
                tableStyle.changeSortElementClass('dissList', idx-1, order);
                break;
              }
              if (
                e.key === "outDate" &&
                storeOrder[index].indexOf("out_date") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass('dissList', idx-1, order);
                break;
              }
              if (
                e.key === "employeeId" &&
                storeOrder[index].indexOf("employee_id") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass('dissList', idx-1, order);
                break;
              }

              if (
                e.key === "companyId" &&
                storeOrder[index].indexOf("company_id") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass('dissList', idx-1, order);
                break;
              }

              if (
                e.key === "title" &&
                storeOrder[index].indexOf("title") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass('dissList', idx-1, order);
                break;
              }

              if (
                e.key === "employmentId" &&
                storeOrder[index].indexOf("employment_id") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass('dissList', idx-1, order);
                break;
              }

              if (
                e.key === "employeeName" &&
                storeOrder[index].indexOf("employee_name") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass('dissList', idx-1, order);
                break;
              }

              if (
                e.key === "idNum" &&
                storeOrder[index].indexOf("id_num") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass('dissList', idx-1, order);
                break;
              }

              if (
                e.key === "docNum" &&
                storeOrder[index].indexOf("doc_num") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass('dissList', idx-1, order);
                break;
              }

              if (
                e.key === "yuliuDocNum" &&
                storeOrder[index].indexOf("yuliu_doc_num") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass('dissList', idx-1, order);
                break;
              }

              if (
                e.key === "employFeedbackOptDate" &&
                storeOrder[index].indexOf("employ_feedback_opt_date") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass('dissList', idx-1, order);
                break;
              }

              if (
                e.key === "diaodangFeedback" &&
                storeOrder[index].indexOf("diaodang_feedback") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass('dissList', idx-1, order);
                break;
              }

              if (
                e.key === "diaodangFeedbackOptDate" &&
                storeOrder[index].indexOf("diaodang_feedback_opt_date") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass('dissList', idx-1, order);
                break;
              }
            }
          }
        }
      });
    }
  }
};
</script>
