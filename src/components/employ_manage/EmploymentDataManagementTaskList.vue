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
            <search-employment @on-search="searchEmploiees" :isLoading='isLoading' :showHandle="showHandle"></search-employment>
          </div>
        </Panel>
      </Collapse>
    </div>
    <Row class="mt14" type="flex" justify="start">
      <Col :sm="{span: 20}" class="tr">
          <DropdownMenu slot="list">
            <DropdownItem v-for="(print, index) in printList" :key="index">{{print}}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Button type="info" @click="exportData">导出XLS</Button>
        <Button type="info" @click="printLabel">打印贴头</Button>
        <Dropdown @on-click="exportTable" transfer>
          <Button type="info">
            生成导出文件
            <Icon type="arrow-down-b"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="1">用工录用名册</DropdownItem>
            <DropdownItem name="2">派遣录用名册</DropdownItem>
            <DropdownItem name="3">外来独立</DropdownItem>
            <DropdownItem name="4">外来派遣</DropdownItem>
            <DropdownItem name="5">采集表汇总表</DropdownItem>
            <DropdownItem name="6">外来情况说明</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Button type="primary" @click="batchManagement">批量办理</Button>
      </Col>
    </Row>
    <Row class="mt14" type="flex" justify="start">
      <Col :sm="{span: 20}" class="tr">
        <Table border id="employList" height="390" :row-class-name="rowClassName" :columns="employmentColumns" :data="employmentData"  :loading="isLoading" ref="employmentData"  @on-row-dblclick="handleData" @on-sort-change="SortChange"  class="mt14"></Table>
        <Button @click="handleSelectAll(false)">全选</Button>
        <Button @click="otherSelectAll(false)">反选</Button>
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
        <Radio label="1" >
            <span>未反馈</span>
             <span>{{RadioData.noSign}}</span>
        </Radio>
        <Radio label="3">
            <span>用工成功</span>
            <span>{{RadioData.employSuccess}}</span>
        </Radio>
        <Radio label="4">
            <span>用工失败</span>
             <span>{{RadioData.employFailed}}</span>
        </Radio>
        <Radio label="5">
            <span>前道要求撤消用工</span>
            <span>{{RadioData.employCancel}}</span>
        </Radio>
        <Radio label="11">
            <span>ukey外借</span>
            <span>{{RadioData.borrowKey}}</span>
        </Radio>
        <Radio label="6">
            <span>其他</span>
            <span>{{RadioData.other}}</span>
        </Radio>
        <Radio label="0">
            <span>TOTAL</span>
            <span>{{RadioData.amount}}</span>
        </Radio>
    </RadioGroup>
      </Col>
    </Row>
    
    
    <Modal
      v-model="isShowStockTitle"
      title="生成入库贴头"
      >
      <employee-info :customerInfo="info" v-for="(info, index) in customerInfos" :key="index" :style="{borderBottom: index !== customerInfos.length - 1 ? '1px solid #ccc' : '', marginBottom: index !== customerInfos.length - 1 ? '20px' : ''}"></employee-info>
      <div slot="footer">
        <Button type="primary" @click="isShowStockTitle = false;">生成入库贴头</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
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
      jobGroup: "",
      vertical: "",
      initSearch: false,
      initSearchC: false,
      jobData: {
        job: 0,
        noJob: 0
      },
      RadioData: {
        noSign: "",
        employSuccess: "",
        noRecord: ""
      },
      pageData: {
        total: 0,
        pageNum: 1,
        pageSize: this.$utils.EMPLOYEE_DEFAULT_PAGE_SIZE,
        pageSizeOpts: this.$utils.EMPLOYEE_DEFAULT_PAGE_SIZE_OPTS
      },
      collapseInfo: [1],
      searchConditions: [],
      searchCondition: {
        params: "",
        taskStatus: "",
        job: ""
      },
      showHandle: {
        show: true,
        name: "employ"
      },
      isLoading: false,
      // 当中按钮操作
      printList: em_print,
      // 下半部分
      employmentColumns: [
        {
          title: "",
          key: "_checkbox",
          align: "center",
          width: 50,
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h("Checkbox", {
                props: { value: params.row.checked },
                style: { margin: "0 auto 0 0px" },
                on: {
                  "on-change": e => {
                    params.row.checked = e;
                    this.$set(this.employmentData[params.index], "checked", e);
                  }
                }
              })
            ]);
          }
        },
        {
          title: "用工方式",
          key: "employWay",
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
              },params.row.employWay)
            ]);
          }
        },
        {
          title: "用工属性",
          key: "employProperty",
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
              }, params.row.employProperty)
            ]);
          }
        },
        {
          title: "序号",
          key: "employmentId",
          align: "center",
          width: 95,
          sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h("span", {
                on: {
                  "click": (event) => {
                     this.copyClick(event);
                   }
                }            
              }, params.row.employmentId)
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
            return h("div", { style: { textAlign: "left" } }, [
              h("div", {
                on: {
                  "click": (event) => {
                     this.copyClick(event);
                   }
                }            
              }, params.row.title),
              h("div", {
                on: {
                  "click": (event) => {
                     this.copyClick(event);
                   }
                }            
              }, params.row.ciCi)
            ]);
          }
        },
        {
          title: "雇员编码",
          key: "employeeId",
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
              }, params.row.employeeId)
            ]);
          }
        },
        {
          title: "雇员姓名",
          key: "employeeName",
          align: "center",
          width: 120,
          sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h(
                "span",
                {
                on: {
                  "click": (event) => {
                     this.copyClick(event);
                   }
                },         
                  style: {
                    "font-weight": "bold"
                  }
                },
                params.row.employeeName
              )
            ]);
          }
        },
        {
          title: "证件号",
          key: "idNum",
          align: "center",
          width: 170,
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
                },  
                  style: {
                    "font-weight": "bold"
                  }
                },
                params.row.idNum
              )
            ]);
          }
        },
        {
          title: "客服经理",
          key: "leaderShipName",
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
              }, params.row.leaderShipName)
            ]);
          }
        },
        {
          title: "服务中心",
          key: "serviceCenter",
          align: "center",
          width: 250,
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
          title: "公司特殊情况",
          key: "employSpecial",
          align: "center",
          width: 75,
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h("span", {
                on: {
                  "click": (event) => {
                     this.copyClick(event);
                   }
                }            
              }, params.row.employSpecial)
            ]);
          }
        },
        {
          title: "档案编号",
          key: "docNum",
          align: "center",
          width: 110,
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
              }, params.row.yuliuDocNum)
            ]);
          }
        },
        {
          title: "用工反馈操作日期",
          key: "employFeedbackOptDate",
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
              }, params.row.employFeedbackOptDate)
            ]);
          }
        },
        {
          title: "调档反馈",
          key: "diaodangFeedback",
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
              }, params.row.diaodangFeedback)
            ]);
          }
        },
        {
          title: "调档反馈操作日期",
          key: "diaodangFeedbackOptDate",
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
              }, params.row.diaodangFeedbackOptDate)
            ]);
          }
        },
        {
          title: "是否翻牌",
          key: "changeCompany",
          align: "center",
          width: 90,
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
      employmentData: [], //列表数据
      searchResultData: [],
      // 弹出框
      isShowStockTitle: false,
      customerInfos: [customerInfo, customerInfo, customerInfo]
    };
  },
  mounted() {
    // this.employeeQuery({}),
    // this.employeeCollectionQuery({})
  },
  methods: {
    rowClassName(row, index) {
      if (row.job != undefined && row.job == "N") {
        return "demo-table-error-row";
      }
      return "";
    },
    batchManagement() {
      let empTaskIds = [];
      var arrTmp = this.employmentData;

      for (let value of arrTmp) {
        if (value.checked) {
          empTaskIds.push(value.empTaskId);
        }
      }

      if (empTaskIds.length == 0) {
        this.$Message.error("没有选中的列");
        return;
      }

      var fromData = {};
      fromData.empTaskIds = empTaskIds;
      const _self = this;
      api.batchCheck(fromData).then(data => {
        if (data.code == 200) {
          if (data.data.isMaterial) {
            this.$Message.error(data.data.isMaterial);
            return;
          }
          if (data.data.empTask) {
            var content =
              "已经办理了" + data.data.empTask + "条数据，请重新选择数据";
            this.$Message.error(content);
            return;
          }
          if (data.data.employmentCount == 0) {
            _self.$router.push({
              name: "employHandleEmploymentBatch",
              query: { empTaskIds: empTaskIds }
            });
          } else {
            var content;
            if (data.data.ArchiveCount) {
              if(data.data.yuLiu){

                content =
                "预留档案编号Cc号已经存在"+ data.data.yuLiu +"条数据"+","+
                "用工办理已经存在" +
                data.data.employmentCount +
                "条数据" +
                " , " +
                "用工档案已经存在" +
                data.data.ArchiveCount +
                "条数据" +
                " , " +
                "确认要覆盖吗？";
              }else{
                content = "用工办理已经存在" +
                data.data.employmentCount +
                "条数据" +
                " , " +
                "用工档案已经存在" +
                data.data.ArchiveCount +
                "条数据" +
                " , " +
                "确认要覆盖吗？";
              }
              
            } else {
              var content =
                "用工办理已经存在" +
                data.data.employmentCount +
                "条数据, " +
                "确认要覆盖吗？";
            }

            _self.$Modal.confirm({
              title: "",
              content: content,
              width:700,
              onOk: function() {
                _self.$router.push({
                  name: "employHandleEmploymentBatch",
                  query: { empTaskIds: empTaskIds }
                });
              },
              error: function(error) {}
            });
          }
        } else {
          this.$Message.error("批量失败！" + data.message);
        }
      });
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

      this.employeeQuery(this.searchCondition);
      this.employeeCollectionQuery(this.searchCondition);
    },
    goHandle() {
      this.$router.push({ name: "employHandleEmployment" });
    },
    showInfoTw(ind) {
      this.pageData.pageNum = 1;
      this.searchCondition.params = this.searchConditions.toString();
      this.searchCondition.taskStatus = ind;
      if (this.jobGroup != "") {
        this.searchCondition.job = `${this.jobGroup}`;
      }
      this.employeeQuery(this.searchCondition);
    },
    showJob(ind) {
      this.pageData.pageNum = 1;
      this.searchCondition.params = this.searchConditions.toString();
      // this.searchCondition.taskStatus = "";
      if (this.jobGroup != "") {
        this.searchCondition.job = `${this.jobGroup}`;
      }
      this.employeeQuery(this.searchCondition);
      this.employeeCollectionQuery(this.searchCondition);
    },
    printLabel() {
      let empTaskIds = [];
      var arrTmp = this.employmentData;
      for (let value of arrTmp) {
        if (value.checked) {
          empTaskIds.push(value);
        }
      }
      if (empTaskIds.length == 0) {
        this.$Message.error("没有选中的列");
        return;
      }
      let head = `<!doctype html><html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title>打印贴头</title></head><body>`;
      let foot = `</body></html>`;
      let obj = "";
      let isFrist = true;
      obj += '<table cellpadding="0" cellspacing="0">';
      empTaskIds.forEach(sel => {
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
    exportData() {
      let params = this.searchCondition;
      api.employSearchExportOpt(params);
    },
    resetSearchCondition(name) {
      this.$refs[name].resetFields();
    },
    showInfo(ind) {
      this.$router.push({
        name: "employeeSocialSecurityInfo",
        query: { empArchiveId: ind }
      });
    },
    employeeQuery(params) {
      this.isLoading = true;
      let self = this;
      api
        .employeeQuery({
          pageSize: this.pageData.pageSize,
          pageNum: this.pageData.pageNum,
          params: params
        })
        .then(data => {
          self.employmentData = data.data.rows;
          self.pageData.total = Number(data.data.total);
          self.isLoading = false;
        });
    },
    employeeCollectionQuery(params) {
      let self = this;
      api
        .employeeCollectionQuery({
          pageSize: this.pageData.pageSize,
          pageNum: this.pageData.pageNum,
          params: params
        })
        .then(data => {
          self.RadioData = data.data.row[0];
          self.jobData = data.data.amTaskStatusBO;
        });
    },
    handlePageNum(val) {
      this.pageData.pageNum = val;
      let params = this.searchCondition;
      this.employeeQuery(params);
    },
    handlePageSize(val) {
      this.pageData.pageSize = val;
      let params = this.searchCondition;
      this.employeeQuery(params);
      this.employeeCollectionQuery(params);
    },
    handleData(row, index) {
      this.$router.push({
        name: "employHandleEmployment",
        query: {
          empTaskId: row.empTaskId,
          employeeId: row.employeeId,
          companyId: row.companyId
        }
      });
    },
    SortChange(e) {
      this.orderConditions = [];
      this.searchConditions = [];
      var userInfo = JSON.parse(window.localStorage.getItem("userInfo"));

      var isFinish = JSON.parse(
        sessionStorage.getItem("employmentIsFinish" + userInfo.userId)
      );
      var conditions = JSON.parse(
        sessionStorage.getItem("employment" + userInfo.userId)
      );
      var storeOrder = JSON.parse(
        sessionStorage.getItem("employmentOrder" + userInfo.userId)
      );

      if (conditions !== null) {
        for (var i = 0; i < conditions.length; i++)
          this.searchConditions.push(conditions[i].exec);
      }
      var dx = "";
      if (e.key === "companyId") {
        dx = "a.company_id";
      } else if (e.key === "title") {
        dx = "h.title";
      } else if (e.key === "employeeId") {
        dx = "a.employee_id";
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
      } else if (e.key === "employFeedbackOptDate") {
        dx = "c.employ_feedback_opt_date";
      } else if (e.key === "diaodangFeedback") {
        dx = "c.diaodang_feedback";
      } else if (e.key === "diaodangFeedbackOptDate") {
        dx = "c.diaodang_feedback_opt_date";
      } else if(e.key === "employWay"){
        dx = "b.employ_way";
      } else if(e.key === "employProperty"){
        dx = "a.employ_property";
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
        "employmentOrder" + userInfo.userId,
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
        .employeeQuery({
          pageSize: this.pageData.pageSize,
          pageNum: this.pageData.pageNum,
          params: this.searchCondition
        })
        .then(data => {
          self.employmentData = data.data.rows;

          this.changeSortClass(this.orderConditions);
        });
    },
    //生成导出文件
    exportTable(name) {
      this.orderConditions = [];
      this.searchConditions = [];
      var userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
      var conditions = JSON.parse(
        sessionStorage.getItem("employment" + userInfo.userId)
      );
      var storeOrder = JSON.parse(
        sessionStorage.getItem("employmentOrder" + userInfo.userId)
      );

      if (conditions !== null) {
        for (var i = 0; i < conditions.length; i++)
          this.searchConditions.push(conditions[i].exec);
      }
      if (storeOrder === null) {
      } else {
        this.orderConditions = storeOrder;
      }
      if (this.orderConditions.length > 0) {
        for (let index in this.orderConditions) {
          this.searchConditions.push(this.orderConditions[index]);
        }
      }

      this.searchCondition.params = this.searchConditions.toString();

      switch (parseInt(name)) {
        case 1:
          // 用工录用名册
          api.employSearchExportOptUseWord(this.searchCondition);
          break;
        case 2:
          // 派遣录用名册
          api.employSearchExportOptDispatchWord(this.searchCondition);
          break;
        case 3:
          // 外来独立
          api.employSearchExportOptAlonehWord(this.searchCondition);
          break;
        case 4:
          // 外来派遣
          api.employSearchExportOptExtDispatchWord(this.searchCondition);
          break;
        case 5:
          // 采集表汇总表
          api.employSearchExportOptExtCollectWord(this.searchCondition);
          break;
          case 6:
          // 外来情况说明
          api.employSearchExportOptExtExplainWord(this.searchCondition);
          break;
        default:
          break;
      }
    },
    exportData() {
      let params = this.searchCondition;
      api.employSearchExportOpt(params);
    },
    resetSearchCondition(name) {
      this.$refs[name].resetFields();
    },
    showInfo(ind) {
      this.$router.push({
        name: "employeeSocialSecurityInfo",
        query: { empArchiveId: ind }
      });

      if (this.orderConditions.length > 0) {
        for (let index in this.orderConditions) {
          this.searchConditions.push(this.orderConditions[index]);
        }
      }
      this.searchCondition.params = this.searchConditions.toString();
      if (isFinish != 2) {
        var tempIsFinish = "a.is_finish=" + isFinish;
        this.searchConditions.push(tempIsFinish);
      }

      this.isLoading = true;
      let self = this;
      api
        .employeeQuery({
          pageSize: this.pageData.pageSize,
          pageNum: this.pageData.pageNum,
          params: this.searchCondition
        })
        .then(data => {
          self.employmentData = data.data.rows;
          self.pageData.total = Number(data.data.total);
          self.isLoading = false;
          this.changeSortClass(this.orderConditions);
        });
    },
    changeSortClass(storeOrder) {
      this.employmentColumns.forEach((e, idx) => {
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
                tableStyle.changeSortElementClass("employList", idx - 1, order);
                break;
              }

              if (
                e.key === "companyId" &&
                storeOrder[index].indexOf("company_id") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("employList", idx - 1, order);
                break;
              }

              if (
                e.key === "title" &&
                storeOrder[index].indexOf("title") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("employList", idx - 1, order);
                break;
              }

              if (
                e.key === "employmentId" &&
                storeOrder[index].indexOf("employment_id") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("employList", idx - 1, order);
                break;
              }

              if (
                e.key === "employeeName" &&
                storeOrder[index].indexOf("employee_name") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("employList", idx - 1, order);
                break;
              }

              if (
                e.key === "idNum" &&
                storeOrder[index].indexOf("id_num") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("employList", idx - 1, order);
                break;
              }

              if (
                e.key === "docNum" &&
                storeOrder[index].indexOf("doc_num") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("employList", idx - 1, order);
                break;
              }

              if (
                e.key === "yuliuDocNum" &&
                storeOrder[index].indexOf("yuliu_doc_num") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("employList", idx - 1, order);
                break;
              }

              if (
                e.key === "employFeedbackOptDate" &&
                storeOrder[index].indexOf("employ_feedback_opt_date") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("employList", idx - 1, order);
                break;
              }

              if (
                e.key === "diaodangFeedback" &&
                storeOrder[index].indexOf("diaodang_feedback") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("employList", idx - 1, order);
                break;
              }

              if (
                e.key === "diaodangFeedbackOptDate" &&
                storeOrder[index].indexOf("diaodang_feedback_opt_date") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("employList", idx - 1, order);
                break;
              }

              if (
                e.key === "employWay" &&
                storeOrder[index].indexOf("employ_way") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("employList", idx - 1, order);
                break;
              }

               if (
                e.key === "employProperty" &&
                storeOrder[index].indexOf("employ_property") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("employList", idx - 1, order);
                break;
              }

            }
          }
        }
      });
    },
    handleSelectAll(status) {
      var arrTmp = this.employmentData;

      for (let value of arrTmp) {
        value.checked = true;
      }
    },
    otherSelectAll() {
      var arrTmp = this.employmentData;

      for (let value of arrTmp) {
        if (value.checked) {
          value.checked = false;
        } else {
          value.checked = true;
        }
      }
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
  },
  computed: {}
};
</script>
