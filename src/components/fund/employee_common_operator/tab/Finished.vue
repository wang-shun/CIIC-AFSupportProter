<template>
  <div class="smList" style="margin-bottom: 56px">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        雇员日常操作
        <div slot="content">
           <search-employee @on-search="searchEmploiees" ></search-employee>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="info" @click="excelExport()">导出</Button>
      </Col>
    </Row>

    <Row class="mt20">
      <Col :sm="{span:24}">
        <Table border :row-class-name="rowClassName" :columns="finishedColumns" :data="finishedData"  @on-sort-change="SortChange"></Table>
        <Page
          class="pageSize"
          @on-change="handlePageNum"
          @on-page-size-change="handlePageSize"
          :total="finishedPageData.total"
          :page-size="finishedPageData.pageSize"
          :page-size-opts="finishedPageData.pageSizeOpts"
          :current="finishedPageData.pageNum"
          show-sizer show-total></Page>
      </Col>
    </Row>
  </div>
</template>
<script>
  import ts from '../../../../api/house_fund/table_style'
  import api from '../../../../api/house_fund/employee_task/employee_task'
  import InputCompany from '../../../common_control/form/input_company'
  import dict from '../../../../api/dict_access/house_fund_dict'
  import sessionData from '../../../../api/session-data'
  import searchEmployee from "./SearchEmployee.vue"

  export default {
    components: {InputCompany,searchEmployee},
    data() {
      return {
        collapseInfo: [1], //展开栏
        operatorSearchData: {
          serviceCenter: [],
          taskStatus: 3,
          employeeId: '',
          taskCategory: '',
          paymentBank: '',
          employeeName: '',
          hfType: '',
          hfAccountType: '',
          idNum: '',
          submitTime: [],
          companyId: '',
          hfComAccount: ''
        },
        searchCondition: {
          params: '',
          taskStatus: 3
        },
        isLoading: false,
        taskTypeList: [],
        payBankList: [],
        fundTypeList: [],
        accountTypeList: [],
        isShowRejectBatch: false,
        rejectionRemark: '',
        finishedData: [],
        finishedPageData: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.DEFAULT_PAGE_SIZE_OPTS
        },
        finishedColumns: [
          {title: '操作', fixed: 'left', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {props: {type: 'success', size: 'small'}, style: {margin: '0 auto'},
                  on: {
                    click: () => {
                      sessionData.setJsonDataToSession('employeeFundCommonOperator.finished.operatorSearchData', this.operatorSearchData);
                      sessionData.setJsonDataToSession('employeeFundCommonOperator.finished.finishedPageData', this.finishedPageData);

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
                }, '查看'),
              ]);
            }
          },
          {title: '任务单类型', key: 'taskCategoryName', width: 150, align: 'center'},
          {title: '更正', key: 'isChangeName', width: 100, align: 'center'},
          {title: '雇员', key: 'employeeName', width: 150, align: 'center'},
          {title: '雇员编号', key: 'employeeId', width: 150, align: 'center',sortable: true},
          {title: '雇员证件号', key: 'idNum', width: 200, align: 'center'},
          {title: '企业客户', key: 'companyName', width: 200, align: 'center'},
          {title: '客户编号', key: 'companyId', width: 150, align: 'center',sortable: true},
          {title: '公积金类型', key: 'hfTypeName', width: 150, align: 'center'},
          {title: '公积金账号', key: 'hfEmpAccount', width: 200, align: 'center'},
          {title: '发起人', key: 'createdDisplayName', width: 150, align: 'center'},
          {title: '发起时间', key: 'submitTimeFormat', width: 200, align: 'center'}
        ]
      }
    },
    created () {
      sessionData.getJsonDataFromSession('employeeFundCommonOperator.finished.operatorSearchData', this.operatorSearchData);
      sessionData.getJsonDataFromSession('employeeFundCommonOperator.finished.finishedPageData', this.finishedPageData);
      this.finishedColumns.filter((e) => {
       var userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
       var storeOrder = JSON.parse(sessionStorage.getItem('fundDailyOrder'+userInfo.userId));
       
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

          }
        }
      }
        
      })
    },
    mounted() {
      dict.getDictData().then(data => {
        if (data.code == 200) {
          this.accountTypeList = data.data.SocialSecurityAccountType;
          this.taskTypeList = data.data.HFLocalTaskCategory;
          this.taskTypeList.splice(7, 1); // 去除转移任务
          this.payBankList = data.data.PayBank;
          this.fundTypeList = data.data.FundType;
        }
      });

      this.hfEmpTaskQuery();
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
          pageSize: this.finishedPageData.pageSize,
          pageNum: this.finishedPageData.pageNum,
          params: cparams,
        }).then(data => {
          if (data.code == 200) {
            this.finishedData = data.data.rows;
            this.finishedPageData.total = Number(data.data.total);
          }
          this.isLoading = false;
        })
      },
      handlePageNum(val) {
        this.finishedPageData.pageNum = val;
        var conditions = [];
        this.searchEmploiees(conditions);
      },
      handlePageSize(val) {
        this.finishedPageData.pageNum = 1;
        this.finishedPageData.pageSize = val;
        var conditions = [];
        this.searchEmploiees(conditions);
      },
      ok () {},
      cancel () {},
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
        cparams.hfComAccount = params.hfComAccount;
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
        var cparams = {};
        {
          // 清除 '[全部]'
          let params = this.$utils.clear(this.operatorSearchData);
          // 清除空字符串
          params = this.$utils.clear(params, '');
          cparams = this.beforeSubmit(params);
        }
        api.hfEmpTaskExport({ params: cparams });
      },
      rowClassName(row, index) {
        return ts.empRowClassName(row, index);
      },searchEmploiees(conditions) {
        var userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
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
            for(var index  in storeOrder)
            {
              this.searchConditions.push(storeOrder[index]);
            }
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
        })
           
      },SortChange(e){
        this.orderConditions = [];
        this.searchConditions =[];
        var userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
        var conditions = JSON.parse(sessionStorage.getItem('fundDaily'+userInfo.userId));
        var storeOrder = JSON.parse(sessionStorage.getItem('fundDailyOrder'+userInfo.userId));    
        if(conditions!=null){
            for(var i=0;i<conditions.length;i++)
              this.searchConditions.push(conditions[i].exec);  
        } 

        var dx ='';
        if(e.key == 'companyId'){
            dx = 'tmp.company_id';
        }else if(e.key == 'employeeId'){
            dx = 'tmp.employee_id';
        }else if(e.key == 'ssAccount'){
            dx = 'tmp.ss_account';
        }else if(e.key == 'idNum'){
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
            for(var index in this.orderConditions)
            { 
               if(this.orderConditions[index].indexOf(dx)!= -1 && e.order=='normal')
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
          for(var index  in this.orderConditions)
          {
             this.searchConditions.push(this.orderConditions[index]);
          }
        }
        this.searchCondition.params = this.searchConditions.toString();

        api.employeeOperatorQuery({
          pageSize: this.employeeResultPageData.pageSize,
          pageNum: this.employeeResultPageData.pageNum,
          params: this.searchCondition,
        }).then(data => {
          if (data.code == 200) {
            this.employeeResultData = data.data;
            this.employeeResultPageData.total = data.total;
            if(this.operatorSearchData.taskStatus=='-2'){
              this.isNextMonth = true;
            }
          }
        
        })
      }
    }
  }
</script>
