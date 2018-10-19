<template>
  <div class="smList" style="margin-bottom: 56px">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        雇员日常操作
        <div slot="content">
          <search-employee @on-search="searchEmploiees" :showHandle="showHandle" sessionKey="fundDailyP" sessionKeyAdd="fundDailyPAdd"></search-employee>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
      <!--<Button type="error" @click="isShowRejectBatch = true">批量批退</Button>-->
      <Button type="info" @click="excelExport()">导出</Button>
      <!--<Button type="error" @click="batchCancel()">撤销</Button>-->
      </Col>
    </Row>

    <Row class="mt20">
      <Col :sm="{span:24}">
        <Table border id="processingData"
               :row-class-name="rowClassName"
               :columns="processingColumns"
               :data="processingData"
               @on-sort-change="SortChange"
               @on-row-dblclick="handleDblClick"
               :loading="isLoading" height=400></Table>
        <Page
          class="pageSize"
          @on-change="handlePageNum"
          @on-page-size-change="handlePageSize"
          :total="processingPageData.total"
          :page-size="processingPageData.pageSize"
          :page-size-opts="processingPageData.pageSizeOpts"
          :current="processingPageData.pageNum"
          show-sizer show-total></Page>
      </Col>
    </Row>
  </div>
</template>
<script>
import {localStorage, sessionStorage} from '../../../../assets/api/storage'
  import ts from '../../../../api/house_fund/table_style'
  import api from '../../../../api/house_fund/employee_task/employee_task'
  import InputCompany from '../../../common_control/form/input_company'
  import dict from '../../../../api/dict_access/house_fund_dict'
  import sessionData from '../../../../api/session-data'
  import searchEmployee from "./SearchEmployee.vue"
  import tableStyle from '../../../../api/table_style'

  export default {
    components: {InputCompany,searchEmployee},
    data() {
      return {
        collapseInfo: [1], //展开栏
        operatorSearchData: {
          serviceCenter: [],
          taskStatus: 2,
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
          taskStatus: 2
        },
        showHandle:{
           name:'progressing'
        },
        isLoading: false,
        taskTypeList: [],
        payBankList: [],
        fundTypeList: [],
        accountTypeList: [],
        isShowRejectBatch: false,
        rejectionRemark: '',
        selectedData: [],
        processingData: [],
        processingPageData: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.EMPLOYEE_DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.HF_DEFAULT_PAGE_SIZE_OPTS
        },
        processingColumns: [
          // {type: 'selection', fixed: 'left', width: 60, align: 'center'},
          {title: '任务单类型', key: 'taskCategoryName', width: 150, align: 'center',sortable: 'custom',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.taskCategoryName + ((params.row.isChange === '1')?"(更正)":"")),
              ]);
            }
          },
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
      sessionData.getJsonDataFromSession('employeeFundCommonOperator.processing.operatorSearchData', this.operatorSearchData);
      sessionData.getJsonDataFromSession('employeeFundCommonOperator.processing.processingPageData', this.processingPageData);
      var userInfo = JSON.parse(localStorage.getItem('userInfo'));
      var storeOrder = JSON.parse(sessionStorage.getItem('fundDailyPOrder'+userInfo.userId));
          this.processingColumns.filter((e) => {

      if(storeOrder==null)
      {

      }else{
        if(storeOrder.length>0)
        {
          for(var index  in storeOrder)
          {
            var orders = storeOrder[index].split(' ');
            if(e.key === 'taskCategoryName'&&storeOrder[index].indexOf('task_category')!=-1)
            {
              e.sortType = orders[1];
            }

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
          this.taskTypeList = data.data.HFLocalTaskCategory;
          this.taskTypeList.splice(7, 1); // 去除转移任务
          this.payBankList = data.data.PayBank;
          this.fundTypeList = data.data.FundType;
        }
      });

//      this.hfEmpTaskQuery();
      var conditions = [];
      this.searchEmploiees(conditions, this.processingPageData.pageNum);

      var userInfo = JSON.parse(localStorage.getItem('userInfo'));
      var storeOrder = JSON.parse(sessionStorage.getItem('fundDailyPOrder'+userInfo.userId));
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
          pageSize: this.processingPageData.pageSize,
          pageNum: this.processingPageData.pageNum,
          params: cparams,
        }).then(data => {
          if (data.code == 200) {
            this.processingData = data.data.rows;
            this.processingPageData.total = Number(data.data.total);
          }
          this.isLoading = false;
        })
      },
      handlePageNum(val) {
        this.processingPageData.pageNum = val;
        var conditions = [];
        this.searchEmploiees(conditions, this.processingPageData.pageNum);
      },
      handlePageSize(val) {
        this.processingPageData.pageNum = 1;
        this.processingPageData.pageSize = val;
        var conditions = [];
        this.searchEmploiees(conditions);
      },
      handleDblClick(row, index) {
        sessionData.setJsonDataToSession('employeeFundCommonOperator.processing.operatorSearchData', this.operatorSearchData);
        sessionData.setJsonDataToSession('employeeFundCommonOperator.processing.processingPageData', this.processingPageData);

        localStorage.setItem('employeeFundCommonOperator.empTaskId', row.empTaskId);
        localStorage.setItem('employeeFundCommonOperator.hfType', row.hfType);
        localStorage.setItem('employeeFundCommonOperator.taskCategory', row.taskCategory);
        localStorage.setItem('employeeFundCommonOperator.taskStatus', this.operatorSearchData.taskStatus);
        switch (row.taskCategory) {
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
      },
      ok() {},
      cancel() {},
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
      batchCancel() {
        if (this.selectedData.length == 0) {
          this.$Message.error("请先勾选需要撤销的任务");
          return false;
        }
        api.empTaskHandleCancel(
          this.selectedData
        ).then(data => {
          if (data.code == 200) {
            this.$Message.info("撤销操作成功");
            this.isShowRejectBatch = false;
            this.handlePageNum(1);
          } else {
            this.$Message.error(data.message)
          }
        })
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
        var userInfo = JSON.parse(localStorage.getItem('userInfo'));
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
          var temp = sessionStorage.getItem('fundDailyP'+userInfo.userId);

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
        var storeOrder = JSON.parse(sessionStorage.getItem('fundDailyPOrder'+userInfo.userId));
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
        this.searchCondition.params = this.searchConditions.join(';');
        api.hfEmpTaskExport({ params: this.searchCondition });
      },
      rowClassName(row, index) {
        return ts.empRowClassName(row, index);
      },searchEmploiees(conditions, pageNum = 1) {
        if (this.isLoading) {
          return;
        }
        this.isLoading = true;
        var userInfo = JSON.parse(localStorage.getItem('userInfo'));
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
          var temp = sessionStorage.getItem('fundDailyP'+userInfo.userId);

          if(temp==null){

          }else{
             var searchEmploiees = JSON.parse(temp);
             if(searchEmploiees.length>0)
             {
                for(let index  in searchEmploiees)
                {
                    this.searchConditions.push(searchEmploiees[index].exec);
                }
             }
          }

        }

        var storeOrder = JSON.parse(sessionStorage.getItem('fundDailyPOrder'+userInfo.userId));

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

        this.searchCondition.params = this.searchConditions.join(';');

        api.hfEmpTaskQuery({
          pageSize: this.processingPageData.pageSize,
          pageNum: pageNum,
          params: this.searchCondition,
        }).then(data => {
          if (data.code == 200) {
            this.processingData = data.data.rows;
            this.processingPageData.total = Number(data.data.total);
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
        var userInfo = JSON.parse(localStorage.getItem('userInfo'));
        var conditions = JSON.parse(sessionStorage.getItem('fundDailyP'+userInfo.userId));
        var storeOrder = JSON.parse(sessionStorage.getItem('fundDailyPOrder'+userInfo.userId));
        if(conditions!=null){
            for(var i=0;i<conditions.length;i++)
              this.searchConditions.push(conditions[i].exec);
        }

        var dx ='';
        if(e.key === 'taskCategoryName') {
          dx = 'tmp.task_category';
        }else if(e.key === 'companyId'){
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

        sessionStorage.setItem('fundDailyPOrder'+userInfo.userId, JSON.stringify(this.orderConditions));

        if(this.orderConditions.length>0)
        {
          for(let index  in this.orderConditions)
          {
             this.searchConditions.push(this.orderConditions[index]);
          }
        }

        this.searchCondition.params = this.searchConditions.join(';');

        api.hfEmpTaskQuery({
          pageSize: this.processingPageData.pageSize,
          pageNum: this.processingPageData.pageNum,
          params: this.searchCondition,
        }).then(data => {
          if (data.code == 200) {
            this.processingData = data.data.rows;
            this.processingPageData.total = Number(data.data.total);
          }
          this.isLoading = false;

          this.changeSortClass(this.orderConditions);
        })

      },
      changeSortClass(storeOrder) {
        this.processingColumns.forEach((e, idx) => {
          let order = 'normal'
          if(storeOrder==null)
          {

          }else{
            if(storeOrder.length>0)
            {
              for(var index  in storeOrder)
              {
                var orders = storeOrder[index].split(' ');
                if(e.key === 'taskCategoryName' && storeOrder[index].indexOf('task_category')!=-1) {
                  order = orders[1]
                  break;
                }

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
          tableStyle.changeSortElementClass('processingData', idx, order)
        });
      },
    }
  }
</script>
