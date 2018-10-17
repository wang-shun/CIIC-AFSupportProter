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
        <Button type="info" @click="printReturnList">批量打印退工单</Button>
        <Button type="info" @click="printReturn">打印退工单</Button>
        <Button type="info" @click="printReturnForeign">打印外来退工单</Button>
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
            <DropdownItem name="6">外来情况说明/入职</DropdownItem>
            <DropdownItem name="7">外来情况说明/离职</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Button type="info" @click="showXslConsole();">档案配对</Button>
        <Button type="info" @click="exportXLS">导出XLS</Button>
        <Button type="primary" @click="goFileMatrialsUseAndBorrow">档案材料利用与借出</Button>
        <Button type="primary" @click="batchManagement">档案批量办理</Button>
      </Col>
    </Row>
    <Row type="flex" justify="start" class="mt20">
    <Col :sm="{span: 18}" class="tr">
    <Table border id="redList" height="340"  :row-class-name="rowClassName" ref="payComSelection" :columns="recordComprehensiveHandlingColumns" :data="recordComprehensiveHandlingData"  @on-row-dblclick="handleData" @on-sort-change="SortChange" class="mt20"></Table>
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
      
    <Modal
      v-model="isShowImportAdvance"
      title="档案配对批量导入操作">
      <Form :label-width=100>
        <Row type="flex" justify="start">
          <Col :sm="{span: 12, offset: 6}" class="tc">
            <Form-item label="上传Excel：">
              <Upload ref="upload"
                :show-upload-list="false"
                :data="upLoadData"
                :action="uploadAttr.actionUrl"
                :before-upload="beforeUpload"
                :accept="uploadAttr.acceptFileExtension"
                :on-format-error="handleFormatError"
                :default-file-list="uploadFileList"
                :on-error="handleError">
                <Button type="ghost" icon="ios-cloud-upload-outline">选择文件上传</Button>
              </Upload>
            </Form-item>
          </Col>
        </Row>
        <Alert type="warning" show-icon v-show="isImported">
          请注意导入结果反馈
          <template slot="desc"  >
              <div >{{retStr}}</div>
        </template>
        </Alert>
        <Row>
          <Col :sm="{span: 22, offset: 1}" class="tr">
            <Button type="info" @click="impTemplate">下载导入模板</Button>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
      </div>
    </Modal>
     </Col>
     <Col :sm="{span: 1, offset: 1}" class="pt10">
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
    <Col :sm="{span: 1, offset: 1}" class="pt10">
        <RadioGroup v-model="rJobGroup"  @on-change="showReJob" vertical>
        <Radio label="Y" >
            <span>在职</span>
             <span>{{rJobData.job}}</span>
        </Radio>
        <Radio label="N">
            <span>终止</span>
            <span>{{rJobData.noJob}}</span>
        </Radio>
        </RadioGroup>
        <RadioGroup v-model="resignStatus"  @on-change="showInfoTwR" vertical>
        <Radio label="99" >
            <span>未反馈</span>
             <span>{{reRadioData.noFeedback}}</span>
        </Radio>
        <Radio label="98" >
            <span>退工任务单签收退工未成功</span>
             <span>{{reRadioData.refuseWaitFinished}}</span>
        </Radio>
        <Radio label="1">
            <span>退工成功</span>
            <span>{{reRadioData.refuseFinished}}</span>
        </Radio>
        <Radio label="2">
            <span>档未到先退工</span>
            <span>{{reRadioData.refuseBeforeWithFile}}</span>
        </Radio>
        <Radio label="3">
            <span>退工单盖章未返回</span>
             <span>{{reRadioData.refuseTicketStampNoReturn}}</span>
        </Radio>
        <Radio label="4">
            <span>退工失败</span>
            <span>{{reRadioData.refuseFailed}}</span>
        </Radio>
        <Radio label="5">
            <span>前道要求批退</span>
            <span>{{reRadioData.beforeBatchNeedRefuse}}</span>
        </Radio>
        <Radio label="6">
            <span>其他</span>
            <span>{{reRadioData.other}}</span>
        </Radio>
        <Radio label="0">
            <span>TOTAL</span>
            <span>{{reRadioData.amount}}</span>
        </Radio>
    </RadioGroup> 
    </Col>
    </Row>
    <Modal
        :width="700"
        v-model="modal1"
        title="选择公司变更记录"
        @on-ok="ok"
        @on-cancel="cancel">
        <Table border  ref="payComUpdateSelection" :columns="companyColumns" :width="620"  :data="refuseReturnCompanys" class="mt20"></Table>
      </Modal>
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
import {localStorage, sessionStorage} from '../../assets/api/storage'
export default {
  components: { employeeInfo, searchEmployment },
  data() {
    return {
      modal1: false,
      companyColumns: [
          {title: '', type: 'selection', width: 60},
          {title: '变更公司名称', key: 'companyName', align: 'center',width: 250,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.companyName),
              ]);
            }
          },
          {title: '变更时间', key: 'changeDate', align: 'center',width: 120,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span',   moment(Number(params.row.changeDate)).format("YYYY-MM-DD")),
              ]);
            }
          },
          {title: '备注', key: 'remark', align: 'center',width: 180,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.remark),
              ]);
            }
          }
        ],
        refuseReturnCompanys:[],
        amEmploymentBO: {
          employeeId: "",
          companyId: "",
          empTaskId: "",
          employmentId: '',
          companyNameList:[],
        },
      isShowImportAdvance: false,
      uploadAttr: {
        actionUrl: "",
        acceptFileExtension: ".xls,.xlsx"
      },
      uploadFileList: [],
      isImported: false,
      upLoadData: {
        file: ""
      },
      retStr: "",
      jobGroup: "",
      rJobGroup: "",
      vertical: "",
      resignStatus:"",
      jobData: {
        job: 0,
        noJob: 0
      },
      rJobData: {
        job: 0,
        noJob: 0
      },
      RadioData: {
        noSign: "",
        employSuccess: "",
        noRecord: ""
      },
      reRadioData: {
        
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
        taskResignStatus: "",
        isEntry: ""
      },
      // 下半部分
      recordComprehensiveHandlingColumns: [
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
                    this.$set(this.recordComprehensiveHandlingData[params.index], "checked", e);
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
          width: 100,
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h("span", params.row.employProperty)
            ]);
          }
        },
        {
          title: "序号",
          key: "employmentId",
          align: "center",
          width: 100,
          sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h("span", params.row.employmentId)
            ]);
          }
        },
        {
          title: "客户编号",
          key: "companyId",
          align: "center",
          width: 116,
          sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
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
              h("span", params.row.ciCi)
            ]);
          }
        },
        {
          title: "雇员编号",
          key: "employeeId",
          align: "center",
          width: 116,
          sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h("span", params.row.employeeId)
            ]);
          }
        },
        {
          title: "雇员姓名",
          key: "employeeName",
          align: "center",
          width: 130,
          sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h(
                "span",
                {
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
          title: "证件号码",
          key: "idNum",
          align: "center",
          width: 170,
          sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h(
                "span",
                {
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
          title: "实际录用日期",
          key: "employDate",
          align: "center",
          width: 130,
          sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h("span", params.row.employDate)
            ]);
          }
        },
          {
          title: "退工日期",
          key: "outDate",
          align: "center",
          width: 106,
          sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h("span", params.row.outDate)
            ]);
          }
        },

        {
          title: "退工原因",
          key: "outReason",
          align: "center",
          width: 180,
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.outReason)
            ]);
          }
        },
        {
          title: "客服经理",
          key: "leaderShipName",
          align: "center",
          width: 110,
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h("span", params.row.leaderShipName)
            ]);
          }
        },
        {
          title: "服务中心",
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
          title: "档案编号",
          key: "docNum",
          align: "center",
          width: 110,
          sortable: true,
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h("span", params.row.docNum)
            ]);
          }
        },
        {
          title: "预留档案编号",
          key: "yuliuDocNum",
          align: "center",
          width: 130,
          sortable: true,
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h("span", params.row.yuliuDocNum)
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
              h("span", params.row.employFeedbackOptDate)
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
            return h("div", { style: { textAlign: "center" } }, [
              h("span", params.row.jobCentreFeedbackDate)
            ]);
          }
        },
        {
          title: "调档反馈",
          key: "handleType",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h("span", params.row.handleType)
            ]);
          }
        },
        {
          title: "调档反馈操作日期",
          key: "diaodangFeedbackOptDate",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h("span", params.row.diaodangFeedbackOptDate)
            ]);
          }
        },
        {
          title: "出库日期",
          key: "storageOutDate",
          align: "center",
          width: 110,
          sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
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
            return h("div", { style: { textAlign: "center" } }, [
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
            return h("div", { style: { textAlign: "center" } }, [
              h("span", params.row.resignFeedback1)
            ]);
          }
        },
        {
          title: "退档日期",
          key: "returnDocDate",
          align: "center",
          width: 106,
          sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h("span", params.row.returnDocDate)
            ]);
          }
        },
        {
          title: "退工送办日期",
          key: "resignHandleDate",
          align: "center",
          width: 100,
          sortable: "custom",
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h("span", params.row.resignHandleDate)
            ]);
          }
        },
        {
          title: "公司特殊情况",
          key: "archiveSpecial",
          align: "center",
          width: 110,
          render: (h, params) => {
            return h("div", { style: { textAlign: "center" } }, [
              h("span", params.row.archiveSpecial)
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
    showXslConsole() {
      this.isShowImportAdvance = true;
      this.uploadFileList = [];
      this.isImported = false;
      this.retStr = "";
      this.isUpload = false;
      this.upLoadData.file = "";
    },
    impTemplate() {
      api.impTemplateFile({});
    },
    //生成导出文件
    exportTable(name) {
      this.searchCondition.params = this.searchConditions.toString();

      switch (parseInt(name)) {
        case 1:
          // 用工录用名册
          api.archiveEmploySearchExportOptUseWord(this.searchCondition);
          break;
        case 2:
          // 派遣录用名册
          api.archiveSearchExportOptDispatchWord(this.searchCondition);
          break;
        case 3:
          // 外来独立
          api.archiveSearchExportOptAlonehWord(this.searchCondition);
          break;
        case 4:
          // 外来派遣
          api.archiveSearchExportOptExtDispatchWord(this.searchCondition);
          break;
        case 5:
          // 采集表 汇总表
          api.archiveSearchExportOptExtCollectWord(this.searchCondition);
          break;
          case 6:
          // 外来情况说明 入职
          this.searchCondition.isEntry = 1;
          api.archiveSearchExportOptExtExplainWord(this.searchCondition);
          break;
          case 7:
          // 外来情况说明 离职
          this.searchCondition.isEntry = 0;
          api.archiveSearchExportOptExtExplainWord(this.searchCondition);
          break;
        default:
          break;
      }
    },
    impOk() {
      if (this.upLoadData.file == null || this.upLoadData.file == "") {
        this.$Message.info("请选择导入文件");
        return false;
      }
      this.isImported = true;
      this.retStr = "系统正在导入中，请耐心等待";
      api
        .xlsImportEmpAdvance(this.upLoadData)
        .then(data => {
          this.uploadFileList = [];
          this.isImported = true;
          this.retStr = data.message;
          this.isUpload = false;
        })
        .catch(error => {
          this.$Message.error("系统异常！");
        });
    },
    handleError(error, file) {
      this.$Notice.warning({
        title: "文件上传失败",
        desc: "文件 " + file.name + " 上传失败！"
      });
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc:
          "文件 " + file.name + " 格式不正确，请上传 xls 或 xlsx 格式的文档。"
      });
    },
    beforeUpload(file) {
      this.upLoadData.file = file;
      this.uploadFileList.push({ name: file.name, url: "" });
      //this.$refs['upload'].clearFiles();
      this.impOk();
      return true;
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
      //已有批次的不可再添加
      
      var tempId;
      var tempId1;
      var employeeName;

       let empTaskIds = [];
      var arrTmp = this.recordComprehensiveHandlingData;

      for (let value of arrTmp) {
        if (value.checked) {
          empTaskIds.push(value.employeeId);
        }
      }

      if (empTaskIds.length == 0) {
        this.$Message.error("没有选中的列");
        return;
      }

       if(empTaskIds.length > 1) {
        this.$Message.error("选择的列太多");
        return;
      }

      for (let value of arrTmp) {
        if (value.checked) {
           tempId = value.archiveId;
           tempId1 = value.employeeId;
           employeeName = value.employeeName;
        }
      }

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
        });
    },
    taskCountArchive(params) {
      let self = this;
      api
        .taskCountArchive({
          params: params
        })
        .then(data => {
          self.jobData = data.data.amTaskStatusBO;
          self.rJobData = data.data.amTaskStatusResignBO;
        });
    },employeeArchiveCollection(params){
      let self = this;
      api.employeeArchiveCollection({
          params: params
        })
        .then(data => {
         self.RadioData = data.data.row[0];
        });
    },resignArchiveCollection(params){
         let self = this;
      api.resignArchiveCollection({
          params: params
        })
        .then(data => {
         self.reRadioData = data.data.row[0];
        });
    },
    showInfoTw(ind) {
      this.pageData.pageNum = 1;
      this.searchCondition.params = this.searchConditions.toString();
      this.searchCondition.taskStatus = ind;
      if (this.jobGroup != "") {
        this.searchCondition.job = this.jobGroup;
      }
      this.archiveQuery(this.searchCondition);
    },
     showInfoTwR(ind) {
      this.pageData.pageNum = 1;
      this.searchCondition.params = this.searchConditions.toString();
      this.searchCondition.taskResignStatus = ind;
      if (this.rJobGroup != "") {
        this.searchCondition.rJob = this.rJobGroup;
      }
      this.archiveQuery(this.searchCondition);
    },
    showJob(ind) {
      
      this.pageData.pageNum = 1;
      this.searchCondition.params = this.searchConditions.toString();
      
     
      this.searchCondition.job = ind;
      this.archiveQuery(this.searchCondition);
      this.employeeArchiveCollection(this.searchCondition);
    },
    showReJob(ind) {
     
      this.pageData.pageNum = 1;
      this.searchCondition.params = this.searchConditions.toString();
      this.searchCondition.luyong_handle_end = "";
     // this.vertical = "";
      this.searchCondition.rJob = ind;
      this.archiveQuery(this.searchCondition);
      this.resignArchiveCollection(this.searchCondition);
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
      var userInfo = JSON.parse(localStorage.getItem("userInfo"));
      var conditions = JSON.parse(
        sessionStorage.getItem("archive" + userInfo.userId)
      );
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
    printReturnList() {
      api.archiveSearchExportReturnList({
        pageSize: 1000,
        pageNum: 1,
        params: this.searchCondition
      });
    },
    printReturnForeign() {
      this.searchCondition.params = this.searchConditions.toString();
      api.archiveSearchExportReturnForeign(this.searchCondition);
    },
    printReturn() {
      let selectionRow = this.$refs.payComSelection.getSelection();
      //判断条件
      //是否有选中列
      if (selectionRow.length == 0) {
        this.$Message.error("没有选中的列");
        return;
      }

      if (selectionRow.length > 1) {
        this.$Message.error("选择的列太多");
        return;
      }

      api.queryCompanyNameUpdateHistory({companyId:selectionRow[0].companyId}).then(data=>{
            if(data.data.length > 0){
              this.modal1 = true;
              let selection = this.$refs.payComUpdateSelection;
              selection.selectAll(false);
              this.refuseReturnCompanys = data.data;
            }else{
              this.amEmploymentBO.companyId = selectionRow[0].companyId;
              this.amEmploymentBO.employeeId = selectionRow[0].employeeId;
              this.amEmploymentBO.empTaskId = selectionRow[0].empTaskId;
              this.amEmploymentBO.employmentId = selectionRow[0].employmentId;
              api.archiveSearchExportReturn(this.amEmploymentBO);
            }
        })
    },
    ok () {
              let selection = this.$refs.payComUpdateSelection.getSelection();

               selection.some(item => {
               this.amEmploymentBO.companyNameList.push('原公司名称：' + item.companyName);
           });
                let selectionRow = this.$refs.payComSelection.getSelection();
                this.amEmploymentBO.companyId = selectionRow[0].companyId;
                this.amEmploymentBO.employeeId = selectionRow[0].employeeId;
                this.amEmploymentBO.empTaskId = selectionRow[0].empTaskId;
                this.amEmploymentBO.employmentId = selectionRow[0].employmentId;
                api.archiveSearchExportReturn(this.amEmploymentBO);
            },
            cancel () {
              
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
                tableStyle.changeSortElementClass("redList", idx - 1, order);
                break;
              }

              if (
                e.key === "companyId" &&
                storeOrder[index].indexOf("company_id") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("redList", idx - 1, order);
                break;
              }

              if (
                e.key === "title" &&
                storeOrder[index].indexOf("title") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("redList", idx - 1, order);
                break;
              }

              if (
                e.key === "employmentId" &&
                storeOrder[index].indexOf("employment_id") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("redList", idx - 1, order);
                break;
              }

              if (
                e.key === "employeeName" &&
                storeOrder[index].indexOf("employee_name") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("redList", idx - 1, order);
                break;
              }

              if (
                e.key === "idNum" &&
                storeOrder[index].indexOf("id_num") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("redList", idx - 1, order);
                break;
              }

              if (
                e.key === "docNum" &&
                storeOrder[index].indexOf("doc_num") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("redList", idx - 1, order);
                break;
              }

              if (
                e.key === "yuliuDocNum" &&
                storeOrder[index].indexOf("yuliu_doc_num") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("redList", idx - 1, order);
                break;
              }

              if (
                e.key === "jobCentreFeedbackDate" &&
                storeOrder[index].indexOf("job_centre_feedback_date") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("redList", idx - 1, order);
                break;
              }

              if (
                e.key === "employDate" &&
                storeOrder[index].indexOf("employ_date") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("redList", idx - 1, order);
                break;
              }

              if (
                e.key === "storageOutDate" &&
                storeOrder[index].indexOf("storage_out_date") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("redList", idx - 1, order);
                break;
              }

              if (
                e.key === "returnDocDate" &&
                storeOrder[index].indexOf("return_doc_date") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("redList", idx - 1, order);
                break;
              }

              if (
                e.key === "resignHandleDate" &&
                storeOrder[index].indexOf("resign_handle_date") != -1
              ) {
                order = orders[1];
                tableStyle.changeSortElementClass("redList", idx - 1, order);
                break;
              }
            }
          }
        }
      });
    },
    batchManagement() {
      let selection = this.$refs.payComSelection.getSelection();
      if (selection.length == 0) {
        this.$Message.error("没有选中的列");
        return;
      }
      let empTaskIds = [];
      selection.forEach(item => {
        empTaskIds.push(item.empTaskId);
      });
      const _self = this;
      var fromData = {};
      fromData.empTaskIds = empTaskIds;
      api.batchCheckArchive(fromData).then(data => {
        if (data.code == 200) {
          if (data.data.employmentCount) {
            var content =
              "有" +
              data.data.employmentCount +
              "条数据没有办理用工，请重新选择数据";
            this.$Message.error(content);
            return;
          } else {
            _self.$router.push({
              name: "archiveHandleBatch",
              query: { empTaskIds: empTaskIds }
            });
          }
        } else {
          this.$Message.error("批量失败！" + data.message);
        }
      });
    },handleSelectAll(status) {
      var arrTmp = this.recordComprehensiveHandlingData;

      for (let value of arrTmp) {
        value.checked = true;
      }
    },
    otherSelectAll() {
      var arrTmp = this.recordComprehensiveHandlingData;

      for (let value of arrTmp) {
        if (value.checked) {
          value.checked = false;
        } else {
          value.checked = true;
        }
      }
    }
  },
  computed: {}
};
</script>
