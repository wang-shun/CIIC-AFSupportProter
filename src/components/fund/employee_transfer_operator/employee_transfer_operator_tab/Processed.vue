<template>
  <div style="height:900px">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        雇员转移操作
       <div slot="content">
          <Form :label-width=150 ref="searchCondition" :model="searchCondition">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="服务中心：" prop="serviceCenterValue">
                  <Cascader :data="customerCenterData" v-model="searchCondition.serviceCenterValue" trigger="hover" transfer></Cascader>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员编号：" prop="employeeId">
                  <Input v-model="searchCondition.employeeId" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="转入单位：" prop="transferInUnit">
                  <Input v-model="searchCondition.transferInUnit" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="转出单位：" prop="transferOutUnit">
                  <Input v-model="searchCondition.transferOutUnit" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员姓名：" prop="employeeName">
                  <Input v-model="searchCondition.employeeName" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公积金类型：" prop="hfType">
                  <Select v-model="searchCondition.hfType" style="width: 100%;" transfer>
                    <Option v-for="item in fundTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="缴费银行：" prop="paymentBank">
                  <Select v-model="searchCondition.paymentBank" style="width: 100%;" transfer>
                    <Option v-for="(value,key) in this.baseDic.hfPaymentBank" :value="key" :key="key">{{value}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="证件号：" prop="idNum">
                  <Input v-model="searchCondition.idNum" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员公积金账号：" prop="hfEmpAccount">
                  <Input v-model="searchCondition.hfEmpAccount" placeholder="请输入..."></Input>
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
                <Form-item label="入离职状态：" prop="status">
                  <Select v-model="searchCondition.status" style="width: 100%;" transfer>
                    <Option v-for="item in workStatusList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公积金状态：" prop="archiveTaskStatus">
                  <Select v-model="searchCondition.archiveTaskStatus" style="width: 100%;" transfer>
                    <Option value="" key="">全部</Option>
                    <Option v-for="item in EmpArchiveStatus" :value="item.key" :key="item.key">{{item.value}}</Option>
                  </Select>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}" class="tr">
                <Button type="primary" icon="ios-search" @click="handlePageNum(1)">查询</Button>
                <Button type="warning" @click="resetSearchCondition('searchCondition')">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <!-- <Button type="info">导出</Button> -->
        <!-- <Button type="info" @click="batchPrintNote">批量打印转移通知书</Button> -->
        <Button type="info" @click="empTaskTransferTxtExport">导出雇员转移TXT</Button>
        <Button type="info"  @click="isUpload=true">批量导入回单日期</Button>
        <Button type="info"  @click="isShowFeedbackDateBatch=true">批量更新回单日期</Button>
      </Col>
    </Row>

    <Row class="mt20">
      <Col :sm="{span:24}">
        <Table border :columns="noProcessColumns" 
        :data="empTaskTransferData"
         :row-class-name="rowClassName"
         @on-row-dblclick="dbClickHandleData"
         @on-selection-change="handleSelectChange"></Table>
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
    </Row>

    <!-- 批量上传-->
    <Modal
      :width="600"
      v-model="isUpload"
      :closable="false"
      :mask-closable="false"
      style="position:relative;z-index:900;">
      <div style="text-align: center;">
        <Form :label-width=100 ref="uploadData" :model="uploadData" style="width: 500px">
          <Row type="flex" justify="start">
            <Col :sm="{span:12}">
            <Form-item label="批量上传：" prop="uploadFile">
              <div id="loading" class="loading" style="position: absolute; z-index: 999; display: none">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <Upload ref="upload" :action="uploadAttr.actionUrl" :data="uploadData" :accept="uploadAttr.acceptFileExtension"
                      :before-upload="beforeUpload" :default-file-list="uploadFileList">
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
              </Upload>
            </Form-item>
            </Col>
            <Col :sm="{span:12}">
                <Button type="info" @click="impTemplate" >下载上传模板</Button>
            </Col>
          </Row>
        </Form>
        <Row class="mt20">
          <Col :sm="{span:24}">
          <Table height="300" border ref="importResultData"
                 :columns="importResultColumns"
                 :data="importResultData"
          ></Table>
          </Col>
        </Row>
      </div>
      <div slot="footer">
        <button type="button" class="ivu-btn ivu-btn-text ivu-btn-large" @click="importClose"><span>取消</span></button>
      </div>
    </Modal>

    <!-- 批量更新回单日期 -->
    <Modal
      v-model="isShowFeedbackDateBatch"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <Form :label-width=100 style="margin-top: 30px">
        <Form-item label="回单日期：" prop="feedbackDate">
          <DatePicker v-model="feedbackDate" format="yyyy-MM-dd" placement="bottom-end" placeholder="选择日期" style="width: 50%;" transfer></DatePicker>
        </Form-item>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="batchUpdateFeedbackDate()">确认更新</Button>
        <Button type="warning" @click="isShowFeedbackDateBatch = false">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventType from '../../../../store/event_types'
  import api from '../../../../api/house_fund/employee_task/employee_transfer'
  import sessionData from '../../../../api/session-data'
  import dict from '../../../../api/dict_access/house_fund_dict'
  import ts from '../../../../api/house_fund/table_style'

  export default {
  data() {
      return {
        collapseInfo: [1], //展开栏
        pageData: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.DEFAULT_PAGE_SIZE_OPTS
        },
        
        searchCondition: {
          serviceCenterValue: [],
          employeeId: '',
          transferInUnit: '',
          transferOutUnit: '',
          employeeName: '',
          hfType: '',
          paymentBank:'',
          idNum: '',
          hfEmpAccount: '',
          hfAccountType: '',
          taskStatus: '3',
          status:'',
          archiveTaskStatus:'',
        },
        workStatusList: [
          {label: '全部', value: ''},
          {label: '在职', value: 2},
          {label: '离职', value: 3}
        ],
        feedbackDate: '',
        isCreateTaskTicket: false,
        isShowFeedbackDateBatch: false,
        isUpload: false,
        uploadData: {
          file: ''
        },
        uploadAttr: {
          actionUrl: '/api/fundcommandservice/hfEmpTask/feedbackDateUpload',
          acceptFileExtension: '.xls,.xlsx',
        },
        uploadFileList: [],
        importResultData: [],
        importResultColumns: [
          {
            title: '雇员编号', key: 'employeeId', width: 100, align: 'left'
          },
          {
            title: '雇员姓名', key: 'employeeName', width: 100, align: 'left'
          },
          {
            title: '回单日期', key: 'feedbackDate', width: 100, align: 'left'
          },
          {
            title: '错误信息', key: 'errorMsg', width: 300, align: 'left'
          },
        ],
        pageDataNewTask: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.DEFAULT_PAGE_SIZE_OPTS
        },
        createTask: {
          searchCondition: {
            employeeId: '',
            employeeName: '',
            idNum: '',
            companyId: '',
            companyName: '',
            workStatueValue: '',
            hfType:'1',
          },
          workStatueList: [
            {label: '全部', value: ''},
            {label: '在职', value: 0},
            {label: '离职', value: 1}
          ],
        },
        customerCenterData:[],
       
        fundTypeList: [
          {label: '全部',value:''},
          {value: '1', label: '基本公积金'},
          {value: '2', label: '补充公积金'}
        ],
        accountTypeList: [
          {label: '全部',value:''},
          {value: 3, label: '独立户'},
          {value: 1, label: '大库'},
          {value: 2, label: '外包'},
        ],
        empTaskTransferData:[],
        selectedData: [],
        noProcessColumns: [
          {
            type: 'selection', fixed: 'left', width: 60, align: 'center'
          },
          // {title: '操作', width: 100, align: 'center',
          //   render: (h, params) => {
          //     return h('div', [
          //       h('Button', {props: {type: 'success', size: 'small'}, style: {margin: '0 auto'},
          //         on: {
          //           click: () => {
          //             sessionData.setJsonDataToSession('transfer.processed.searchCondition', this.searchCondition);
          //             sessionData.setJsonDataToSession('transfer.processed.pageData', this.pageData);
          //             let employeeId=params.row.employeeId;
          //             let companyId=params.row.companyId;
          //             let hfType=params.row.hfType;
          //             let empTaskId=params.row.empTaskId;
          //             this.$router.push({name: 'employeeFundTransferProgressTwo', query: {employeeId: employeeId,companyId:companyId,hfType:hfType,empTaskId:empTaskId}});
          //           }
          //         }
          //       }, '编辑'),
          //     ]);
          //   }
          // },
          {title: '公积金类型', key: 'hfType', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', this.$decode.hfType(params.row.hfType)),
              ]);
            }
          },
          {title: '客户编号', key: 'companyId', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companyId),
              ]);
            }
          },
          {title: '客户名称', key: 'title', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.title),
              ]);
            }
          },
          {title: '雇员编号', key: 'employeeId', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employeeId),
              ]);
            }
          },
          {title: '雇员姓名', key: 'employeeName', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employeeName),
              ]);
            }
          },
          {title: '雇员证件号', key: 'idNum', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.idNum),
              ]);
            }
          },
          {title: '上下岗状态', key: 'status', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', this.$decode.empComStatus(params.row.status)),
              ]);
            }
          },
          {title: '状态', key: 'taskStatus', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', this.$decode.hf_archiveStatus(params.row.archiveStatus)),
              ]);
            }
          },
          {title: '入职日期', key: 'inDate', width: 130, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.inDate),
              ]);
            }
          },
          {title: '打印人', key: 'handleUserName', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.handleUserName),
              ]);
            }
          },
          {title: '发起人', key: 'createdDisplayName', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.createdDisplayName),
              ]);
            }
          },
          {title: '发起时间', key: 'submitTime', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.submitTime),
              ]);
            }
          },
          // {title: '校验结果', key: 'validateResult', width: 200, align: 'center',
          //   render: (h, params) => {
          //     return h('div', {style: {textAlign: 'left'}}, [
          //       h('span', params.row.validateResult),
          //     ]);
          //   }
          // }
        ]
      }
    },
    mounted() {
      this.getCustomers();
      dict.getDictData().then(data => {
        if (data.code == 200) {
          this.EmpArchiveStatus = data.data.EmpArchiveStatus;
          this.EmpArchiveStatus.splice(0,1);//去掉未办理选项
          sessionData.getJsonDataFromSession('transfer.processed.searchCondition', this.searchCondition);
          sessionData.getJsonDataFromSession('transfer.processed.pageData', this.pageData);
          let params = this.searchCondition
          this.queryTransfer(params);
        } else {
          this.$Message.error(data.message);
        }
      })
    },
    computed: {
      ...mapState('tProcessed',{
        data:state => state.data
      })
    },
    methods: {
      ...mapActions('tProcessed',[EventType.TPROCESSED]),

     resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      routerToFundCommonOperator(name) {
        this.$router.push({name: name})
      },
      queryTransfer(params){
        let arrayServiceCenter=params.serviceCenterValue;
        if(arrayServiceCenter!=null){
          params=JSON.parse(JSON.stringify(params));
          delete params.serviceCenterValue;
          params.serviceCenterValue=arrayServiceCenter[arrayServiceCenter.length-1];
        }
        api.queryTransfer({
          pageSize: this.pageData.pageSize,
          pageNum: this.pageData.pageNum,
          params: params,
        }).then(data => {
          this.empTaskTransferData = data.data.rows;
          this.pageData.total = Number(data.data.total);
          })
      },
       handlePageNum(val) {
        this.pageData.pageNum = val;
        let params = this.searchCondition
        this.queryTransfer(params);
      },
      handlePageSize(val) {
        this.pageData.pageSize = val;
        let params = this.searchCondition
        this.queryTransfer(params);
      },
      dbClickHandleData(row, index){
        sessionData.setJsonDataToSession('transfer.processed.searchCondition', this.searchCondition);
        sessionData.setJsonDataToSession('transfer.processed.pageData', this.pageData);
        let employeeId=row.employeeId;
        let companyId=row.companyId;
        let hfType=row.hfType;
        let empTaskId=row.empTaskId;
        let empArchiveId='';
        if(hfType == 1){
          empArchiveId = row.empArchiveId;
        }else{
          empArchiveId = row.belongEmpArchiveId;
        }
        this.$router.push({name: 'employeeFundTransferProgressTwo', query: {employeeId: employeeId,companyId:companyId,hfType:hfType,empTaskId:empTaskId,empArchiveId:empArchiveId}});
      },
      getCustomers(){
        let params = null;
        api.getCustomers({params:params}).then(data=>{
          this.customerCenterData = data.data;
        })
      },

      queryTransferForNewTask(params){
        api.queryTransferForNewTask({
          pageSize: this.pageDataNewTask.pageSize,
          pageNum: this.pageDataNewTask.pageNum,
          params: params,
        }).then(data => {
          this.createTask.createNewTaskData = data.data.rows;
          this.pageDataNewTask.total = Number(data.data.total);
        })
      },
      handlePageNumNewTask(val) {
        this.pageDataNewTask.pageNum = val;
        let params = this.createTask.searchCondition
        this.queryTransferForNewTask(params);
      },
      handlePageSizeNewTask(val) {
        this.pageDataNewTask.pageSize = val;
        let params = this.createTask.searchCondition
        this.queryTransferForNewTask(params);
      },
      dealTransfer(employeeId,companyId,hfType){
        this.$router.push({name:'employeeFundTransferProgressTwo', query: {employeeId: employeeId,companyId:companyId,hfType:hfType}});
      },
      ok () {

      },
      cancel () {

      },
     impTemplate() {
      api.impTemplateFile({});
     },
      multiEmpTaskTransferExport() {
        if (!this.searchCondition.transferOutUnit) {
          this.$Message.error("导出清册需明确转出单位及转入单位");
          return false;
        }
        if (!this.searchCondition.transferInUnit) {
          this.$Message.error("导出清册需明确转出单位及转入单位");
          return false;
        }
        let params = this.searchCondition
        api.multiEmpTaskTransferExport({
          params: params,
        })
      },
      empTaskTransferTxtExport() {
        let params = this.searchCondition
        api.empTaskTransferTxtExport({
          params: params,
        })
      },
      resetSelectedData(selection) {
        this.selectedData.length = 0;
        if(selection) {
          selection.forEach((element, index, array) => {
            this.selectedData.push(element.empTaskId);
          })
        }
      },
      handleSelectChange(selection) {
        this.resetSelectedData(selection);
      },
      batchUpdateFeedbackDate() {
        if (!this.feedbackDate) {
          this.$Message.error("请设置回单日期");
          return false;
        }
        this.feedbackDate = this.$utils.formatDate(this.feedbackDate, "YYYY-MM-DD");
        let params={
            feedbackDate: this.feedbackDate,
            selectedData: this.selectedData,
            empTaskTransferBo: this.searchCondition
        }
        let self = this;
        if (this.selectedData.length == 0) {
           self.$Modal.confirm({
              title: "",
              content: "您当前没有选择记录，系统默认根据现有的查询条件查询到的结果全部覆盖更新回单日期，您确认操作吗?",
              onOk: function() {
                  self.batchUpdateFeedbackDateAction(params);
              },
              error: function(error) {
                this.$Modal.remove();
              }
         });
        }else{
          self.batchUpdateFeedbackDateAction(params);
        }
      },
      batchUpdateFeedbackDateAction(params) {
        let params1=params.empTaskTransferBo;
        let arrayServiceCenter=params1.serviceCenterValue;
        if(arrayServiceCenter!=null){
          params1=JSON.parse(JSON.stringify(params1));
          delete params1.serviceCenterValue;
          params1.serviceCenterValue=arrayServiceCenter[arrayServiceCenter.length-1];
        }
        params.empTaskTransferBo=params1;
        api.batchUpdateFeedbackDate(params).then(data => {
          if (data.code == 200) {
            this.$Message.success("更新回单日期操作成功");
            this.isShowFeedbackDateBatch = false;
            this.handlePageNum(1);
            this.selectedData.length = 0;
          } else {
            this.$Message.error(data.message)
          }
        })
      },
      beforeUpload(file) {
        let loading = document.getElementById("loading");
        loading.style.display = "inline-block";
        this.uploadFileList.length = 0;
        this.uploadData.file = file;
        api.feedbackDateUpload(this.uploadData).then(data => {
          if (this.importResultData) {
            this.importResultData.length = 0;
          }
          if (data.code == 200) {
            this.uploadFileList.push({name: file.name, url: ''});
            this.importResultData = data.data;
            this.isSubmit = false;
          } else {
            this.$Message.error(data.message);
          }
          loading.style.display = "none";
        })
        return false;
      },
      rowClassName(row, index) {
        return ts.empRowClassName(row, index);
      },
      importClose() {
        this.isUpload = false;
        this.isSubmit = false;
      },
      batchPrintNote(){
        if (this.selectedData.length == 0) {
          this.$Message.error("请选择需批量打印的记录");
          return false;
        }
        let params={
                    selectedData: this.selectedData,
                 }
        this.$Modal.confirm({
              title: "确认",
              content: "您确认批量打印操作吗?",
              onOk: function() {
                   api.batchPrintNote(params).then(
                        data=>{
                          if(data.code==200){
                            let rows =[];
                            rows=data.data;
                            api.printTransferNote(rows);
                            this.saveDisabled=true;
                          }
                        }
                      )

                console.log(params);
                  //self.batchUpdateFeedbackDateAction(params);
              },
              error: function(error) {
                this.$Modal.remove();
              }
         });
      },
    }
  }
</script>
