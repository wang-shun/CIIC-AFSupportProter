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
          独立户客户管理任务单
          <div slot="content">
            <search-employment @on-search="searchEmploiees" :isLoading='isLoading' :showHandle="showHandle"></search-employment>
          </div>
        </Panel>
      </Collapse>
    </div>
    <Row class="mt14" type="flex" justify="start">
      <Col :sm="{span: 20}" class="tr">
        <Button type="info" @click="exportData">导出XLS</Button>
      </Col>
    </Row>
    <Row class="mt14" type="flex" justify="start">
      <Col :sm="{span: 20}" class="tr">
        <Table border id="employList" height="390" :row-class-name="rowClassName" :columns="employmentColumns" :data="employmentData"  :loading="isLoading" ref="employmentData"  @on-row-dblclick="handleData"  class="mt14"></Table>
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
        <Radio label="2" >
            <span>在职</span>
             <span>{{jobData.job}}</span>
        </Radio>
        <Radio label="3">
            <span>终止</span>
            <span>{{jobData.noJob}}</span>
        </Radio>
         <Radio label="0">
            <span>TOTAL</span>
            <span>{{jobData.total}}</span>
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
        noJob: 0,
        total:0
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
        name: "independentCustom"
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
         {title: '公司编码', key: 'companyId', align: 'center', width: 115,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.companyId),
              ]);
            }
          },
          {title: '公司名称', key: 'title', align: 'center', width: 250,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.title),
              ]);
            }
          },
           {title: '雇员编号', key: 'employeeId', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.employeeId),
              ]);
            }
          },
          {title: '雇员姓名', key: 'employeeName', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.employeeName),
              ]);
            }
          },
          {title: '雇员姓名', key: 'employeeName', align: 'center', width: 110,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employeeName),
              ]);
            }
          },
          {title: '证件号码', key: 'idNum', align: 'center', width: 170,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.idNum),
              ]);
            }
          },
          {title: '客服中心', key: 'handleType', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.serviceCenter),
              ]);
            }
          },
          {title: '服务类型', key: 'hireUnit', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.hireUnit),
              ]);
            }
          },
          {title: '具有档案保管资质', key: 'archiveAble', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h("Checkbox", {
                props: { value: params.row.archiveAble },
                style: { margin: "0 auto 0 0px" }
              })
              ]);
            }
          },
          {title: '公司特殊情况', key: 'special', align: 'center', width: 80,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.special),
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
    searchEmploiees(conditions, searchForm) {
       for (var i = 0; i < conditions.length; i++)
        this.searchConditions.push(conditions[i].exec);

      this.searchCondition.params = this.searchConditions.toString();
      this.employeeQuery(this.searchCondition);
      this.employeeCollectionQuery(this.searchCondition);
    },
    employeeQuery(params) {
      this.isLoading = true;
      let self = this;
      api.querySalCompany({
          pageSize: this.pageData.pageSize,
          pageNum: this.pageData.pageNum,
          params: params
        })
        .then(data => {
          self.employmentData = data.data.rows;
          self.pageData.total = Number(data.data.total);
          this.isLoading = false;
         
        });
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
      if (this.jobGroup != "") {
        this.searchCondition.job = `${this.jobGroup}`;
      }
      this.employeeQuery(this.searchCondition);
    },
    exportData() {
      let params = this.searchCondition;
      api.depentExportOpt(params);
    },
    showInfo(ind) {
      this.$router.push({
        name: "employeeSocialSecurityInfo",
        query: { empArchiveId: ind }
      });
    },
    employeeCollectionQuery(params) {
      let self = this;
      api.independentCollectionQuery({
          pageSize: this.pageData.pageSize,
          pageNum: this.pageData.pageNum,
          params: params
        })
        .then(data => {
          self.jobData = data.data;
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
    } ,handleData(row, index) {
      this.$router.push({
        name: "independentHandleCustom",
        query: {
          companyId: row.companyId
        }
      });
    }
  },
  computed: {}
};
</script>
