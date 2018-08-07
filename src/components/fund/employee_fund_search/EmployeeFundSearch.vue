<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        查询条件
        <div slot="content">
          <Form :label-width=150 ref="searchCondition" :model="searchCondition">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="服务中心：" prop="serviceCenterValue">
                  <Cascader :data="serviceCenterData" v-model="searchCondition.serviceCenterValue" trigger="hover" transfer></Cascader>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员编号：" prop="employeeId">
                  <Input v-model="searchCondition.employeeId" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户公积金账户：" prop="hfComAccount">
                  <InputAccount v-model="searchCondition.hfComAccount" ></InputAccount>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="账户类型：" prop="hfAccountType">
                  <Select v-model="searchCondition.hfAccountType" style="width: 100%;" transfer>
                    <Option v-for="item in accountTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员姓名：" prop="employeeName">
                  <Input v-model="searchCondition.employeeName" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="缴费银行：" prop="paymentBank">
                  <Select v-model="searchCondition.paymentBank" style="width: 100%;" transfer>
                    <Option value="" >全部</Option>
                    <Option v-for="(value,key) in this.baseDic.hfPaymentBank" :value="key" :key="key">{{value}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客服经理：" prop="leaderShipName">
                  <Input v-model="searchCondition.leaderShipName" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="证件号：" prop="idNum">
                  <Input v-model="searchCondition.idNum" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="上下岗状态：" prop="empStatus">
                  <Select v-model="searchCondition.empStatus" style="width: 100%;" transfer>
                    <Option v-for="item in workStatusList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="操作提示：" prop="operationRemind">
                <Select v-model="searchCondition.operationRemind" style="width: 100%;" transfer>
                  <Option value="" label="全部"></Option>
                  <Option v-for="item in operationRemindList" :value="item.key" :key="item.key">{{item.value}}</Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户编号：" prop="companyId">
                  <Input v-model="searchCondition.companyId" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员基本公积金账号：" prop="hfEmpAccount">
                  <Input v-model="searchCondition.hfEmpAccount" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}" class="tr">
                <Button type="primary" icon="ios-search" @click="handlePageNum(1)">查询</Button>
                <Button type="warning" @click="resetSearchCondition('searchCondition')" class="ml10">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <!-- <Button type="info">导出</Button> -->
        <Button type="info" class="ml10" @click="isShowImportFundAccount = true;">批量导入公积金账号</Button>
      </Col>
    </Row>
    <Table border class="mt20" :row-class-name="rowClassName" :columns="employeeFundColumns" :data="employeeFundData"></Table>

    <Page
        class="pageSize"
        @on-change="handlePageNum"
        @on-page-size-change="handlePageSize"
        :total="pageData.total"
        :page-size="pageData.pageSize"
        :page-size-opts="pageData.pageSizeOpts"
        :current="pageData.pageNum"
        show-sizer show-total></Page>

<!-- :action="uploadAttr.actionUrl" -->
    <!-- 批量导入公积金账号 模态框 -->
    <Modal
      v-model="isShowImportFundAccount"
      title="批量导入操作">
      <Form :label-width=100>
        <Row type="flex" justify="start">
          <Col :sm="{span: 12, offset: 6}" class="tc">
            <Form-item label="上传Excel：">
              <Upload ref="upload"
                :show-upload-list="true"
                :data="upLoadData"
                :action="uploadAttr.actionUrl"
                :before-upload="beforeUpload"
                :accept="uploadAttr.acceptFileExtension"
                :format="['xlsx','xls']"
                :on-format-error="handleFormatError"
                :default-file-list="uploadFileList"
                :on-error="handleError">
                <Button type="ghost" icon="ios-cloud-upload-outline">选择文件上传</Button>
              </Upload>
            </Form-item>
          </Col>
        </Row>
        <!-- <Alert type="error" closable show-icon v-show="isImported">导入文件格式验证失败！</Alert> -->
        <Alert type="warning" closable show-icon v-show="isImported">
          请注意导入结果反馈
          <template slot="desc"  >
              <div >{{retStr}}</div>
          <!-- <a href="javascript:;" @click="isShowImportFundAccount = false; isShowHistoryImported = true;">查看失败详细</a> | <a href="javascript:;" @click="isShowImportFundAccount = false;">结束操作</a> -->
        </template>
        </Alert>
        <Row>
          <Col :sm="{span: 22, offset: 1}" class="tr">
            <Button type="info" @click="impTemplate">下载导入模板</Button>
            <Button type="info" @click="impOk">导入数据</Button>

            <!-- <Button type="primary" @click="gotoHistoryList">查看历史导入</Button> -->
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <!-- <Button type="warning" @click="isShowImportFundAccount = false">返回</Button> -->
      </div>
    </Modal>

    <!-- 历史导入 模态框 -->
    <Modal
      v-model="isShowHistoryImported"
      title="历史导入"
      width="720">
      <Table border class="mt20" :columns="historyImportedColumns" :data="importFailedData"></Table>
      <div slot="footer">
        <Button type="warning" @click="isShowHistoryImported = false">返回</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
//import { mapState, mapGetters, mapActions } from "vuex";
import ts from '../../../api/house_fund/table_style'
import companyFundAccountSearchModal from "../common/CompanyFundAccountSearchModal.vue";
import companyModal from "../../common_control/CompanyModal.vue";
//import EventTypes from "../../../store/event_types";
import api from "../../../api/house_fund/employee_operator";
import InputAccount from "../common/input_account";
import InputCompany from "../common/input_company";
import sessionData from '../../../api/session-data'
import dict from '../../../api/dict_access/house_fund_dict'

export default {
  components: {
    companyFundAccountSearchModal,
    companyModal,
    InputAccount,
    InputCompany
  },
  data() {
    return {
      collapseInfo: [1], //展开栏
      pageData: {
        total: 0,
        pageNum: 1,
        pageSize: this.$utils.DEFAULT_PAGE_SIZE,
        pageSizeOpts: this.$utils.DEFAULT_PAGE_SIZE_OPTS
      },
      operationRemindList: [],
      searchCondition: {
        serviceCenterValue:[],
        employeeId: "",
        companyId: "",
        hfComAccount: "",
        hfAccountType: "",
        employeeName: "",
        paymentBank: "",
        leaderShipName: "",
        idNum: "",
        empStatus: "",
        operationRemind: "",
        hfEmpAccount:""
      },
      upLoadData: {
        file: ""
      },
      uploadAttr: {
        actionUrl: "",
        acceptFileExtension: ".xls,.xlsx"
      },
      employeeFundData: [],
      companyFundAccountList: [],
      companyData: [],
      importFailedData: [],
      serviceCenterData: [], //客服中心
      accountTypeList: [
        { value: "", label: "全部" },
        { value: 1, label: "中智大库" },
        { value: 2, label: "中智外包" },
        { value: 3, label: "独立户" }
      ],
      accountTypeColorList: [
        { value: 1, className: "" },
        { value: 2, className: "" },
        { value: 3, className: "" },
      ],
      isShowCompanyFoundAccountList: false, //显示企业公积金账户列表
      isShowCompanyName: false, //显示公司名称
      workStatusList: [
        { value: "", label: "全部" },
        { value: 2, label: "在职" },
        { value: 3, label: "离职" }
      ],
      operatorTipsList: [
        { value: "", label: "全部" },
        { value: 1, label: "要做" },
        { value: 2, label: "中心" },
        { value: 3, label: "中智" },
        { value: 4, label: "原单位" },
        { value: 5, label: "其他独立开户公司" },
        { value: 6, label: "外包" }
      ],
      uploadFileList: [],
      isShowImportFundAccount: false,
      employeeFundColumns: [
        {
          title: "操作",
          align: "center",
          width: 120,
          render: (h, params) => {

            if(params.row.empArchiveId == null || params.row.empArchiveId=='' ){
              return h("div", [
                h(
                  "Button",
                  {
                    props: { type: "success", size: "small" },
                    style: { margin: "0 auto" },
                    on: {
                      click: () => {
                        sessionData.setJsonDataToSession('empHFsearch.searchCondition', this.searchCondition);
                        sessionData.setJsonDataToSession('empHFsearch.pageData', this.pageData);
                        this.$router.push({
                          name: "employeeFundBasicInfo",
                          query: { companyId: params.row.companyId,employeeId:params.row.employeeId }
                        });
                      }
                    }
                  },
                  "查看"
                )
              ]);
            }else{
              return h("div", [
                h(
                  "Button",
                  {
                    props: { type: "success", size: "small" },
                    style: { margin: "0 auto" },
                    on: {
                      click: () => {
                        this.showInfo(
                          params.row.empArchiveId,
                          params.row.companyId,
                          params.row.employeeId
                        );
                      }
                    }
                  },
                  "查看/修改"
                )
              ]);
            }


          }
        },
        {
          title: "客户编号",
          key: "companyId",
          align: "center",
          width: 120,
          render: (h, params) => {
            return h("div", { style: { textAlign: "right" } }, [
              h("span", params.row.companyId)
            ]);
          }
        },
        {
          title: "客户名称",
          key: "customerName",
          align: "center",
          width: 250,
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.title)
            ]);
          }
        },
        // {
        //   title: "企业账户类型",
        //   key: "hfAccountType",
        //   align: "center",
        //   width: 150,
        //   render: (h, params) => {
        //     return h("div", { style: { textAlign: "left" } }, [
        //       h("span", this.$decode.accountType(params.row.hfAccountType))
        //     ]);
        //   }
        // },
        {
          title: "雇员编码",
          key: "employeeId",
          align: "center",
          width: 120,
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
          width: 130,
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.employeeName)
            ]);
          }
        },
        {
          title: "证件号",
          key: "idNum",
          align: "center",
          width: 200,
          render: (h, params) => {
            return h("div", { style: { textAlign: "right" } }, [
              h("span", params.row.idNum)
            ]);
          }
        },
        {
          title: "基本公积金账号",
          key: "hfEmpAccount",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.hfEmpAccount)
            ]);
          }
        },
        {
          title: "基本公积金状态",
          key: "archiveTaskStatus",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", this.$decode.hfTaskStatus(params.row.archiveTaskStatus))
            ]);
          }
        },
        {
          title: "补充公积金账号",
          key: "hfEmpAccountBc",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.hfEmpAccountBc)
            ]);
          }
        },
        {
          title: "补充公积金状态",
          key: "archiveTaskStatusBc",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h(
                "span",
                this.$decode.hfTaskStatus(params.row.archiveTaskStatusBc)
              )
            ]);
          }
        },
        // {
        //   title: "上下岗状态",
        //   key: "empStatus",
        //   align: "center",
        //   width: 150,
        //   render: (h, params) => {
        //     return h("div", { style: { textAlign: "left" } }, [
        //       h(
        //         "span",
        //         this.$decode.empStatus(params.row.empStatus)
        //       )
        //     ]);
        //   }
        // },
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
          title: "操作提示",
          key: "operationRemind",
          align: "center",
          width: 200,
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h(
                "span",
                this.$decode.hfOperationRemind(params.row.operationRemind)
              )
            ]);
          }
        },
        {
          title: "操作提示日期",
          key: "operationRemindDate",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.operationRemindDate)
            ]);
          }
        }
        // ,
        // {title: '备注', key: 'notes', align: 'center', width: 150,
        //   render: (h, params) => {
        //     return h('div', {style: {textAlign: 'left'}}, [
        //       h('span', params.row.notes),
        //     ]);
        //   }
        // }
      ],
      isImported: false,
      retStr: "",
      isShowHistoryImported: false,
      historyImportedColumns: [
        {
          title: "客户编号",
          key: "companyId",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("div", { style: { textAlign: "right" } }, [
              h("span", params.row.companyId)
            ]);
          }
        },
        {
          title: "客户名称",
          key: "title",
          align: "center",
          width: 350,
          render: (h, params) => {
            return h("div", { style: { textAlign: "left" } }, [
              h("span", params.row.title)
            ]);
          }
        },
        {
          title: "雇员编码",
          key: "employeeNumber",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("div", { style: { textAlign: "right" } }, [
              h("span", params.row.employeeNumber)
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
          title: "证件号",
          key: "idNumber",
          align: "center",
          width: 200,
          render: (h, params) => {
            return h("div", { style: { textAlign: "right" } }, [
              h("span", params.row.idNumber)
            ]);
          }
        },
        {
          title: "基本公积金账号",
          key: "basicFundAccount",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("div", { style: { textAlign: "right" } }, [
              h("span", params.row.basicFundAccount)
            ]);
          }
        },
        {
          title: "补充公积金账号",
          key: "addFundAccount",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("div", { style: { textAlign: "right" } }, [
              h("span", params.row.addFundAccount)
            ]);
          }
        }
      ]
    };
  },
  mounted() {
      sessionData.getJsonDataFromSession('empHFsearch.searchCondition', this.searchCondition);
      sessionData.getJsonDataFromSession('empHFsearch.pageData', this.pageData);
      let params = this.searchCondition;
    this.employeeQuery(params);
    this.getCustomers();

    dict.getDictData().then(data => {
        if (data.code == 200) {
          this.taskCategoryList = data.data.HFLocalTaskCategory;
          this.operationRemindList = data.data.OperationRemind;
          this.transferUnitDictList = data.data.FundOutUnit;
          this.repairReason = data.data.RepairReason;
          this.transferUnitDictList.forEach((element, index, array) => {
            this.transferOutUnitList.push(element);
            this.transferInUnitList.push(element);
          })
          this.taskCategoryDisable = true;
        } else {
          this.$Message.error(data.message);
          this.inputDisabled = true;
          this.taskCategoryDisable = true;
          this.showButton = false;
        }
      })
  },
  computed: {
    // ...mapState('employeeFundSearch', {
    //   data: state => state.data
    // })
  },
  methods: {
    //...mapActions("employeeFundSearch", [EventTypes.EMPLOYEEFUNDSEARCHTYPE]),
    resetSearchCondition(name) {
      this.$refs[name].resetFields();
      this.searchCondition.serviceCenterValue='';
    },
    showInfo(empArchiveId, companyId, employeeId) {
       sessionData.setJsonDataToSession('empHFsearch.searchCondition', this.searchCondition);
      sessionData.setJsonDataToSession('empHFsearch.pageData', this.pageData);
      this.$router.push({
        name: "employeeFundBasicInfo",
        query: { empArchiveId: empArchiveId, companyId: companyId, employeeId: employeeId }
      });
    },

    gotoHistoryList() {
      this.$router.push({ name: "employeeFundHistory" });
    },
    rowClassName(row, index) {
      return ts.empRowClassName(row, index)
    },
    employeeQuery(params) {
      let arrayServiceCenter=params.serviceCenterValue;
      if(arrayServiceCenter!=null){
          params=JSON.parse(JSON.stringify(params));
          delete params.serviceCenterValue;
          params.serviceCenterValue=arrayServiceCenter[arrayServiceCenter.length-1];
      }
      api.employeeQuery({
          pageSize: this.pageData.pageSize,
          pageNum: this.pageData.pageNum,
          params: params
        })
        .then(data => {
          this.employeeFundData = data.data.rows;
          this.pageData.total = Number(data.data.total);
        });
    },
    getCustomers(){
        let params = null;
        api.getCustomers({params:params}).then(data=>{
          this.serviceCenterData = data.data;
        })
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
    },
    impOk() {
      if(this.upLoadData.file==null ||this.upLoadData.file=='' ){
        this.$Message.info("请选择导入文件");
        return false;
      }
      api.impEmpAccountBeforeUpload(this.upLoadData)
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
    impTemplate() {

      api.impTemplateFile({});
    },
    loadDict(){
       dict.getDictData().then(data => {
        if (data.code == 200) {
          this.SocialSecurityEmployeeClassifyList = data.data.SocialSecurityEmployeeClassify;
        }
      });
      },
    cancel() {},
    beforeUpload(file) {
      this.upLoadData.file = file;
      this.uploadFileList.push({ name: file.name, url: "" });
      //this.$refs['upload'].clearFiles();
      return false;
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
    }
  },
};
</script>
<!--<style>-->
  <!--.tred {-->
    <!--color: red;-->
  <!--}-->
<!--</style>-->
