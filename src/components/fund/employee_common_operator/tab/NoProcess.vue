<template>
  <div class="smList" style="margin-bottom: 56px">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        雇员日常操作
        <div slot="content">
           <search-employee @on-search="searchEmploiees" :showHandle="showHandle"></search-employee>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="info" @click="openBatchHandle()">批量办理</Button>
        <Button type="error" @click="openReject()">批量批退</Button>
        <Button type="info"  @click="isUpload=true">批量预录入雇员公积金账号</Button>
        <Button type="info" @click="excelExport()">导出</Button>
        <Button type="info" @click="excelExportNew()">导出开户文件</Button>
      </Col>
    </Row>

    <Row class="mt20">
      <Col :sm="{span:24}" >
        <Table border id="noProcessData"
               :row-class-name="rowClassName"
               :columns="noProcessColumns"
               :data="noProcessData"
               @on-selection-change="handleSelectChange"
               @on-sort-change="SortChange"
               :loading="isLoading"
               ></Table>
      <Page
        class="pageSize"
        @on-change="handlePageNum"
        @on-page-size-change="handlePageSize"
        :total="noProcessPageData.total"
        :page-size="noProcessPageData.pageSize"
        :page-size-opts="noProcessPageData.pageSizeOpts"
        :current="noProcessPageData.pageNum"
        show-sizer show-total></Page>
      </Col>
    </Row>

    <!-- 批量上传-->
    <Modal
      :width="800"
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

    <!-- 批退理由 -->
    <Modal
      v-model="isShowRejectBatch"
      @on-ok="ok"
      @on-cancel="cancel">
      <Form>
        <p>
          <Form-item>
            <Input v-model="rejectionRemark" type="textarea" :rows=4 placeholder="请填写批退备注..."></Input>
          </Form-item>
        </p>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="batchReject()" :loading="isLoading">确认批退</Button>
        <Button type="warning" @click="isShowRejectBatch = false">取消</Button>
      </div>
    </Modal>

    <Modal
      :width="1000"
      v-model="isShowBatchHandle"
      @on-ok="batchOk"
      @on-cancel="batchCancel">
      <inBatchHandle></inBatchHandle>
    </Modal>
  </div>
</template>
<script>
  import ts from '../../../../api/house_fund/table_style'
  import api from '../../../../api/house_fund/employee_task/employee_task'
  import InputCompany from '../../../common_control/form/input_company'
  import dict from '../../../../api/dict_access/house_fund_dict'
  import sessionData from '../../../../api/session-data'
  import searchEmployee from "./SearchEmployee.vue"
  import tableStyle from '../../../../api/table_style'
  import inBatchHandle from "../batch_handle/InTaskBatchHandle.vue"

  export default {
    components: {InputCompany,searchEmployee,inBatchHandle},
    data() {
      return {
        collapseInfo: [1], //展开栏
        operatorSearchData: {
          taskStatus: 1,
          processStatus: '',
          employeeId: '',
          taskCategory: '',
          paymentBank: '',
          employeeName: '',
          hfType: '',
          hfAccountType: '',
          idNum: '',
          submitTime: [],
          companyId: '',
          isChange: ''
//          urgent: ''
        },
        orderConditions:[],
        searchCondition: {
          params: '',
          taskStatus: 1
        },
        showHandle:{
           name:'noprogress'
        },
        isLoading: false,
        processStatusList: [],
        taskTypeList: [],
        payBankList: [],
        fundTypeList: [],
        accountTypeList: [],

        isUpload: false,
        uploadData: {
          file: ''
        },
        uploadAttr: {
          actionUrl: '/api/fundcommandservice/hfEmpTask/empPreInputUpload',
          acceptFileExtension: '.xls,.xlsx',
        },
        uploadFileList: [],
        importResultData: [],
        importResultColumns: [
          {
            title: '雇员编号', key: 'employeeId', width: 150, align: 'left'
          },
          {
            title: '雇员姓名', key: 'employeeName', width: 100, align: 'left'
          },
          {
            title: '基本公积金账号', key: 'hfEmpBasAccount', width: 180, align: 'left'
          },
          {
            title: '补充公积金账号', key: 'hfEmpAddAccount', width: 180, align: 'left'
          },
          {
            title: '错误信息', key: 'errorMsg', width: 300, align: 'left'
          },
        ],

        isShowRejectBatch: false,
        isShowBatchHandle: false,
        rejectionRemark: '',
        selectedData: [],
        selectedNewData: [],
        selectedOutData: [],
        noProcessData: [],
        noProcessPageData: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.EMPLOYEE_DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.HF_DEFAULT_PAGE_SIZE_OPTS
        },
        noProcessColumns: [
          {
            type: 'selection', fixed: 'left', width: 60, align: 'center'
          },
          {title: '操作', fixed: 'left', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {props: {type: 'success', size: 'small'}, style: {margin: '0 auto'},
                  on: {
                    click: () => {
//                      console.log("before: " + JSON.stringify(this.noProcessPageData))
                      sessionData.setJsonDataToSession('employeeFundCommonOperator.noProcess.operatorSearchData', this.operatorSearchData);
                      sessionData.setJsonDataToSession('employeeFundCommonOperator.noProcess.noProcessPageData', this.noProcessPageData);

                      localStorage.setItem('employeeFundCommonOperator.empTaskId', params.row.empTaskId);
                      localStorage.setItem('employeeFundCommonOperator.hfType', params.row.hfType);
                      localStorage.setItem('employeeFundCommonOperator.taskCategory', params.row.taskCategory);
                      localStorage.setItem('employeeFundCommonOperator.taskStatus', this.operatorSearchData.taskStatus);
                      switch (params.row.taskCategory) {
                        case '1':
                        case '2':
                        case '3':
                        case '9':
                        case '10':
                        case '11':
                          this.$router.push({name: 'employeeFundCommonOperatorInTaskHandle'});
                          break;
                        case '4':
                        case '5':
                        case '12':
                        case '13':
                          this.$router.push({name: 'employeeFundCommonOperatorOutTaskHandle'});
                          break;
                        case '6':
                          this.$router.push({name: 'employeeFundCommonOperatorRepairTaskHandle'});
                          break;
                        case '7':
                          this.$router.push({name: 'employeeFundCommonOperatorAdjustTaskHandle'});
                          break;
                        default:
                          break;
                      }
                    }
                  }
                }, '办理'),
              ]);
            }
          },
          {title: '任务单类型', key: 'taskCategoryName', width: 150, align: 'center'},
//          {title: '更正', key: 'isChangeName', width: 100, align: 'center'},
          {title: '雇员', key: 'employeeName', width: 150, align: 'center'},
          {title: '雇员编号', key: 'employeeId', width: 150, align: 'center',sortable: 'custom'},
          {title: '雇员证件号', key: 'idNum', width: 200, align: 'center',sortable: 'custom'},
          {title: '客户编号', key: 'companyId', width: 150, align: 'center',sortable: 'custom'},
          {title: '企业客户', key: 'companyName', width: 200, align: 'center'},
          {title: '公积金类型', key: 'hfTypeName', width: 100, align: 'center'},
          {title: '公积金账号', key: 'hfEmpAccount', width: 150, align: 'center',sortable: 'custom'},
          {title: '执行年月', key: 'handleDate', width: 100, align: 'center'},
          {title: '开始年月', key: 'startMonth', width: 100, align: 'center'},
          {title: '截止年月', key: 'endMonth', width: 100, align: 'center'},
          {title: '操作提示', key: 'operationRemindName', width: 150, align: 'center'},
          {title: '发起人', key: 'createdDisplayName', width: 150, align: 'center'},
          {title: '发起时间', key: 'submitTimeFormat', width: 200, align: 'center'}
        ]
      }
    },
    created() {
      sessionData.getJsonDataFromSession('employeeFundCommonOperator.noProcess.operatorSearchData', this.operatorSearchData);
      sessionData.getJsonDataFromSession('employeeFundCommonOperator.noProcess.noProcessPageData', this.noProcessPageData);
      var userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
      var storeOrder = JSON.parse(sessionStorage.getItem('fundDailyOrder'+userInfo.userId));
       this.noProcessColumns.filter((e) => {

      if(storeOrder==null)
      {

      }else{
        if(storeOrder.length>0)
        {
          for(var index  in storeOrder)
          {
             var orders = storeOrder[index].split(' ');
             if(e.key === 'employeeId'&&storeOrder[index].indexOf('employee_id')!=-1)
             {
                e.sortType = orders[1];
             }

             if(e.key === 'companyId'&&storeOrder[index].indexOf('company_id')!=-1)
             {
                e.sortType = orders[1];
             }

            if(e.key === 'hfEmpAccount'&&storeOrder[index].indexOf('hf_emp_account')!=-1)
            {
              e.sortType = orders[1];
            }

            if(e.key === 'idNum'&&storeOrder[index].indexOf('id_num')!=-1)
            {
              e.sortType = orders[1];
            }
          }
        }
      }

      })
    },
    mounted() {
      dict.getDictData().then(data => {
        if (data.code == 200) {
          this.accountTypeList = data.data.SocialSecurityAccountType;
          this.processStatusList = data.data.ProcessPeriod;
          this.taskTypeList = data.data.HFLocalTaskCategory;
          this.taskTypeList.splice(7, 1); // 去除转移任务
          this.payBankList = data.data.PayBank;
          this.fundTypeList = data.data.FundType;
        }
      });
//      console.log("after: " + JSON.stringify(this.noProcessPageData))
//       this.hfEmpTaskQuery();

      var conditions = [];
      this.searchEmploiees(conditions, this.noProcessPageData.pageNum);
      var userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
      var storeOrder = JSON.parse(sessionStorage.getItem('fundDailyOrder'+userInfo.userId));
      this.changeSortClass(storeOrder);
    },
    computed: {
    },
    methods: {
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      hfEmpTaskQuery() {
        if (this.isLoading) {
          return;
        }
        this.isLoading = true;
        var cparams = {};
        {
          // 清除 '[全部]'
          let params = this.$utils.clear(this.operatorSearchData);
          // 清除空字符串
          params = this.$utils.clear(params, '');
          cparams = this.beforeSubmit(params);
        }
        api.hfEmpTaskQuery({
          pageSize: this.noProcessPageData.pageSize,
          pageNum: this.noProcessPageData.pageNum,
          params: cparams,
        }).then(data => {
          if (data.code == 200) {
            this.noProcessData = data.data.rows;
            this.noProcessPageData.total = Number(data.data.total);
          }
          this.isLoading = false;
        })
      },
      handlePageNum(val) {
        this.noProcessPageData.pageNum = val;
        var conditions = [];
        this.searchEmploiees(conditions, this.noProcessPageData.pageNum);
      },
      handlePageSize(val) {
//        if (val === this.noProcessPageData.pageSize) {
//          return
//        }
//        this.noProcessPageData.pageNum = 1;
        this.noProcessPageData.pageSize = val;
        var conditions = [];
        this.searchEmploiees(conditions);
      },
      ok() {},
      cancel() {},
      resetSelectedData(selection) {
        this.selectedData.length = 0;
        this.selectedOutData.length = 0;
        this.selectedNewData.length = 0;
        if(selection) {
          selection.forEach((element, index, array) => {
            this.selectedData.push(element.empTaskId);
            if (element.taskCategory == '4' || element.taskCategory == '5' ||
              element.taskCategory == '12' || element.taskCategory == '13') {
              this.selectedOutData.push(element.empTaskId);
            } else if (element.taskCategory == '1' || element.taskCategory == '9') {
              this.selectedNewData.push(element.empTaskId);
            }
          })
        }
      },
      handleSelectChange(selection) {
        this.resetSelectedData(selection);
      },
      openReject() {
        if (this.selectedData.length == 0) {
          this.$Message.error("请先勾选需要批退的任务");
          return false;
        }
        if (this.selectedOutData.length > 0) {
          this.$Message.error("转出或封存（翻牌转出或翻牌封存）类型的任务不能批退，请勿勾选");
          return false;
        }
        this.isShowRejectBatch = true;
      },
      batchReject() {
        if (this.selectedData.length == 0) {
          this.$Message.error("请先勾选需要批退的任务");
          return false;
        }
        if (this.selectedOutData.length > 0) {
          this.$Message.error("转出或封存（翻牌转出或翻牌封存）类型的任务不能批退，请勿勾选");
          return false;
        }

        if (!this.rejectionRemark || this.rejectionRemark.trim() == '') {
          this.$Message.error("请填写批退备注");
          return false;
        }
        this.rejectionRemark = this.rejectionRemark.trim();
        if (this.rejectionRemark.length > 200) {
          this.$Message.error("批退备注长度不能超过200");
          return false;
        }
        this.isLoading = true;
        api.hfEmpTaskBatchReject({
          rejectionRemark: this.rejectionRemark,
          selectedData: this.selectedData
        }).then(data => {
          if (data.code == 200) {
            this.isLoading = false;
            this.$Message.info("批退操作成功");
            this.isShowRejectBatch = false;
            this.handlePageNum(1);
            this.rejectionRemark = "";
            this.selectedData.length = 0;
            this.selectedOutData.length = 0;
            this.selectedNewData.length = 0;
          } else {
            this.isLoading = false;
            this.$Message.error(data.message)
          }
//          this.isLoading = false;
        }).catch(
          error=>{
            this.isLoading = false;
          }
        )
      },
      beforeSubmit(params) {
        var cparams = {}
        cparams.taskStatus = params.taskStatus;
        cparams.processStatus = params.processStatus;
        cparams.employeeId = params.employeeId;
        cparams.taskCategory = params.taskCategory;
        cparams.paymentBank = params.paymentBank;
        cparams.employeeName = params.employeeName;
        cparams.hfAccountType = params.hfAccountType;
        cparams.hfType = params.hfType;
        cparams.idNum = params.idNum;
        cparams.companyId = params.companyId;
        cparams.isChange = params.isChange;
        cparams.submitTimeStart = '';
        cparams.submitTimeEnd = '';
        if (params.submitTime) {
//          for (let i = 0; i < this.operatorSearchData.submitTime.length; i++) {
          if (params.submitTime[0]) {
            cparams.submitTimeStart = this.$utils.formatDate(params.submitTime[0], 'YYYY-MM-DD');
          }
          if (params.submitTime[1]) {
            cparams.submitTimeEnd = this.$utils.formatDate(params.submitTime[1], 'YYYY-MM-DD');
          }
//          }
        }
        return cparams
      },
      excelExport() {
//        var cparams = {};
//        {
//          // 清除 '[全部]'
//          let params = this.$utils.clear(this.operatorSearchData);
//          // 清除空字符串
//          params = this.$utils.clear(params, '');
//          cparams = this.beforeSubmit(params);
//        }
        var userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
        var conditions = [];
        this.searchConditions =[];

        for(var i=0;i<conditions.length;i++)
        {
          if(conditions[i]==null||conditions[i]==undefined)
          {
            conditions.splice(i,1);
          }
        }

        if(conditions.length>0)
        {//如果是点击查询事件，则取出去执行的值
          for(var i=0;i<conditions.length;i++)
            this.searchConditions.push(conditions[i].exec);
        }else{
          // 否则从session 里边去缓存的表单查询值
          var temp = sessionStorage.getItem('fundDaily'+userInfo.userId);

          if(temp==null){

          }else{
            var searchEmploiees = JSON.parse(temp);
            if(searchEmploiees.length>0)
            {
              for(var index  in searchEmploiees)
              {
                this.searchConditions.push(searchEmploiees[index].exec);
              }
            }
          }

        }
        var storeOrder = JSON.parse(sessionStorage.getItem('fundDailyOrder'+userInfo.userId));
        if(storeOrder==null)
        {

        }else{
          if(storeOrder.length>0)
          {
            for(let index  in storeOrder)
            {
              this.searchConditions.push(storeOrder[index]);
            }
          }
        }
        this.searchCondition.params = this.searchConditions.toString();
        api.hfEmpTaskExport({ params: this.searchCondition });
      },
      excelExportNew() {
        if (!this.selectedData || this.selectedData.length == 0) {
          this.$Message.error("请先勾选需要导出开户文件的任务");
          return false;
        }
        if (this.selectedData.length != this.selectedNewData.length) {
          this.$Message.error("非开户任务单无法导出开户文件");
          return false;
        }
        var params = {};
        {
//          this.beforeSubmit();
          // 清除 '[全部]'
          params = this.$utils.clear(this.selectedData);
          // 清除空字符串
          params = this.$utils.clear(params, '');
        }
        api.newEmpTaskTxtExport({
          params: params
        });
      },
      rowClassName(row, index) {
        return ts.empRowClassName(row, index);

      },searchEmploiees(conditions, pageNum = 1) {
        if (this.isLoading) {
          return;
        }
        this.isLoading = true;
        var userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
        this.searchConditions =[];

        for(var i=0;i<conditions.length;i++)
        {
          if(conditions[i]==null||conditions[i]==undefined)
          {
            conditions.splice(i,1);
          }
        }

        if(conditions.length>0)
        {//如果是点击查询事件，则取出去执行的值
           for(var i=0;i<conditions.length;i++)
              this.searchConditions.push(conditions[i].exec);
        }else{
          // 否则从session 里边去缓存的表单查询值
          var temp = sessionStorage.getItem('fundDaily'+userInfo.userId);

          if(temp==null){

          }else{
             var searchEmploiees = JSON.parse(temp);
             if(searchEmploiees.length>0)
             {
                for(var index  in searchEmploiees)
                {
                    this.searchConditions.push(searchEmploiees[index].exec);
                }
             }
          }

        }
        var storeOrder = JSON.parse(sessionStorage.getItem('fundDailyOrder'+userInfo.userId));
        if(storeOrder==null)
        {

        }else{
          if(storeOrder.length>0)
          {
            for(let index  in storeOrder)
            {
              this.searchConditions.push(storeOrder[index]);
            }
          }
        }
        this.searchCondition.params = this.searchConditions.toString();

        api.hfEmpTaskQuery({
          pageSize: this.noProcessPageData.pageSize,
          pageNum: pageNum,
          params: this.searchCondition,
        }).then(data => {
          if (data.code == 200) {
            this.noProcessData = data.data.rows;
            this.noProcessPageData.total = Number(data.data.total);
          }

          this.isLoading = false;
        })

      },SortChange(e){
        if (this.isLoading) {
          return;
        }
        this.isLoading = true;
        this.orderConditions = [];
        this.searchConditions =[];
        var userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
        var conditions = JSON.parse(sessionStorage.getItem('fundDaily'+userInfo.userId));
        var storeOrder = JSON.parse(sessionStorage.getItem('fundDailyOrder'+userInfo.userId));
        if(conditions!=null){
            for(var i=0;i<conditions.length;i++)
              this.searchConditions.push(conditions[i].exec);
        }


        var dx ='';
        if(e.key === 'companyId'){
            dx = 'tmp.company_id';
        }else if(e.key === 'employeeId'){
            dx = 'tmp.employee_id';
        }else if(e.key === 'hfEmpAccount'){
            dx = 'tmp.hf_emp_account';
        }else if(e.key === 'idNum'){
            dx = 'tmp.id_num';
        }

        const searchConditionExec = `${dx} ${e.order} `;

        if(storeOrder==null){

        }else{
          this.orderConditions = storeOrder;
        }

        var isE = false;
        if(this.orderConditions.length>0)
        {
            for(let index in this.orderConditions)
            {
               if(this.orderConditions[index].indexOf(dx)!= -1 && e.order==='normal')
               {  //如果是取消，则删除条件
                  this.orderConditions.splice(index,1);
                   isE = true;
               }else if(this.orderConditions[index].indexOf(dx)!= -1 && this.orderConditions[index].indexOf(e.order)== -1 ) {
                 //如果是切换查询顺序
                  this.orderConditions.splice(index,1);
                  this.orderConditions.push(searchConditionExec);
                   isE = true;
               }else if(this.orderConditions[index]===searchConditionExec){
                   this.orderConditions.splice(index,1);
               }

            }

            if(!isE)
            {
               this.orderConditions.push(searchConditionExec);
            }

        }else{
            this.orderConditions.push(searchConditionExec);
        }

        sessionStorage.setItem('fundDailyOrder'+userInfo.userId, JSON.stringify(this.orderConditions));

        if(this.orderConditions.length>0)
        {
          for(let index  in this.orderConditions)
          {
             this.searchConditions.push(this.orderConditions[index]);
          }
        }

        this.searchCondition.params = this.searchConditions.toString();

        api.hfEmpTaskQuery({
          pageSize: this.noProcessPageData.pageSize,
          pageNum: this.noProcessPageData.pageNum,
          params: this.searchCondition,
        }).then(data => {
          if (data.code == 200) {
            this.noProcessData = data.data.rows;
            this.noProcessPageData.total = Number(data.data.total);
          }

          this.isLoading = false;

          this.changeSortClass(this.orderConditions);
        })
      },
      changeSortClass(storeOrder) {
        this.noProcessColumns.forEach((e, idx) => {
          let order = 'normal'
          if(storeOrder==null)
          {

          }else{
            if(storeOrder.length>0)
            {
              for(var index  in storeOrder)
              {
                var orders = storeOrder[index].split(' ');
                if(e.key === 'employeeId' && storeOrder[index].indexOf('employee_id')!=-1) {
                  order = orders[1]
                  break;
                }

                if(e.key === 'companyId' && storeOrder[index].indexOf('company_id')!=-1) {
                  order = orders[1]
                  break;
                }

                if(e.key === 'hfEmpAccount' && storeOrder[index].indexOf('hf_emp_account')!=-1) {
                  order = orders[1]
                  break;
                }

                if(e.key === 'idNum' && storeOrder[index].indexOf('id_num')!=-1) {
                  order = orders[1]
                  break;
                }
              }
            }
          }
          tableStyle.changeSortElementClass('noProcessData', idx, order)
        });
      },
      beforeUpload(file) {
        let loading = document.getElementById("loading");

        loading.style.display = "inline-block";
        this.uploadFileList.length = 0;
        this.uploadData.file = file;
        api.empPreInputUpload(this.uploadData).then(data => {
          if (this.importResultData) {
            this.importResultData.length = 0;
          }
          if (data.code === 200) {
            this.uploadFileList.push({name: file.name, url: ''});
            this.importResultData = data.data;

            this.$Message.info("上传成功");
//            this.isSubmit = false;
          } else if (data.code === 222) {
            this.uploadFileList.push({name: file.name, url: ''});
            this.importResultData = data.data;

            this.$Message.error(data.message);
          } else {
            this.$Message.error(data.message);
          }
          loading.style.display = "none";
        })
        return false;
      },
      importClose() {
        this.isUpload = false;
//        this.isSubmit = false;
      },
      impTemplate() {
        api.downloadEmpPreInputTemplate({});
      },
      openBatchHandle() {
        this.isShowBatchHandle = true;
      },
      batchOk() {},
      batchCancel() {this.isShowBatchHandle = false;},
    }

  }
</script>
