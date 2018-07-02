<template>
  <div style="height: 850px;">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        查询条件
        <div slot="content">
          <search-employee @on-search="searchEmploiees" :showHandle="showHandle"></search-employee>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span:24}">
      <Table border ref="selection"
             :columns="employeeResultColumns"
             :data="employeeResultData"
             @on-selection-change="selectionChange"
             @on-sort-change="SortChange"
             :loading="isLoading"></Table>
      <Page
        class="pageSize"
        @on-change="handlePageNum"
        @on-page-size-change="handlePageSite"
        :total="employeeResultPageData.total"
        :page-size="employeeResultPageData.pageSize"
        :page-size-opts="employeeResultPageData.pageSizeOpts"
        :current="employeeResultPageData.pageNum"
        show-sizer show-total></Page>
      </Col>
    </Row>

    <!-- 批退理由 -->
    <Modal
      v-model="isRefuseReason"
      :mask-closable="false"
      :closable="false"
      @on-ok="handleRefuseReason">
      <p>
        <Input v-model="rejectionRemark" type="textarea" :rows=4 placeholder="请填写批退备注..."></Input>
      </p>
    </Modal>
  </div>
</template>
<script>
//  import {mapState, mapGetters, mapActions} from 'vuex'
//  import EventType from '../../../../store/event_types'
  import api from '../../../../api/social_security/employee_operator'

  import InputAccount from '../../../common_control/form/input_account'
  import InputCompany from '../../../common_control/form/input_company'
  import InputCompanyName from '../../../common_control/form/input_company/InputCompanyName.vue'
  import dict from '../../../../api/dict_access/social_security_dict'
  import sessionData from '../../../../api/session-data'
  import searchEmployee from "./SearchEmployee.vue"
  import tableStyle from '../../../../api/table_style'

  export default {
    components: {InputAccount, InputCompany,InputCompanyName,searchEmployee},
    data() {
      return {
        collapseInfo: [1], //展开栏
        taskCategorydict: [],
        ssAccountTypedict: [],
        searchCondition: {
          params: '',
          taskStatus: '3'
        },
        showHandle:{
           name:'finished'
        },
        operatorSearchData: {
          taskStatus: '3',
          employeeName: '',
          settlementArea: '',
          ssAccountType: '',
          //empClassify: '',
          ssAccount: '',
          companyId: '',
          idNum: '',
          taskCategory: '',
          title: '',
          employeeId: '',
          urgent: '',
          startMonth: '',
        },

        // 批退
        isRefuseReason: false,
        isLoading: false,
        rejectionRemark: '',
        selectEmployeeResultData: [],

        employeeResultData: [],
        employeeResultPageData: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.EMPLOYEE_DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.EMPLOYEE_DEFAULT_PAGE_SIZE_OPTS
        },
        employeeResultColumns: [
          {
            title: '操作', key: 'action', fixed: 'left', width: 80, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {type: 'success', size: 'small'}, style: {margin: '0 auto'},
                  on: {
                    click: () => {
                      sessionData.setJsonDataToSession('employeeCommonOperator.Finished.operatorSearchData', this.operatorSearchData);
                      sessionData.setJsonDataToSession('employeeCommonOperator.Finished.employeeResultPageData', this.employeeResultPageData);

                      this.batchHandle(params.row);
                    }
                  }
                }, '查看'),
              ]);
            }
          },
          {
            title: '任务单类型', key: 'taskCategory', width: 120, fixed: 'left', align: 'center',
            render: (h, params) => {
              return h('div', [
                h('span',  this.$decode.taskCategory(params.row.taskCategory))
              ]);
            }
          },
          {
            title: '客户编号', key: 'companyId', width: 120, align: 'center',sortable: true
          },
          {
            title: '客户名称', key: 'title', width: 200, align: 'center'
          },
          {
            title: '雇员编号', key: 'employeeId', width: 120, align: 'center',sortable: true
          },
          {
            title: '雇员', key: 'employeeName', width: 100, align: 'center'
          },
          {
            title: '雇员证件号', key: 'idNum', width: 200, align: 'center',sortable: true
          },
          {
            title: '企业社保账号', key: 'ssAccount', width: 200, align: 'center',sortable: true
          },
          {
            title: 'UKEY密码', key: 'ssPwd', width: 200, align: 'center'
          },
          // {
          //   title: '执行日期', key: 'doDate', width: 150, align: 'center'
          // },
          {
            title: '发起人', key: 'createdDisplayName', width: 100, align: 'center'
          },
          {
            title: '发起时间', key: 'createdTime', width: 180, align: 'center'
          },
          {
            title: '办理备注', key: 'handleRemark', width: 300, align: 'center'
          },
          {
            title: '是否更正', key: 'isChange', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('span',  params.row.isChange=='1'?"是":"否")
              ]);
            }
          },
        ]
      }
    },
    created() {
      sessionData.getJsonDataFromSession('employeeCommonOperator.Finished.operatorSearchData', this.operatorSearchData);
      sessionData.getJsonDataFromSession('employeeCommonOperator.Finished.employeeResultPageData', this.employeeResultPageData);
      var userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
      var storeOrder = JSON.parse(sessionStorage.getItem('socialDailyOrder'+userInfo.userId));
      this.employeeResultColumns.filter((e) => {

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

             if(e.key === 'ssAccount'&&storeOrder[index].indexOf('ss_account')!=-1)
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
    async mounted() {
//      this[EventType.THISMONTHHANDLETYPE]()
      // this.employeeOperatorQuery();
      // this.loadDict();
      this.searchConditions =[];
       this.searchConditions = JSON.parse(sessionStorage.getItem('searchEmploiees'));

       if(this.searchConditions==null)
       {
         this.searchConditions =[];
       }


      this.searchEmploiees(this.searchConditions);
      this.loadDict();

      var userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
      var storeOrder = JSON.parse(sessionStorage.getItem('socialDailyOrder'+userInfo.userId));
      this.changeSortClass(storeOrder);
    },
    computed: {
//      ...mapState('thisMonthHandle', {
//        data: state => state.data
//      }),
    },
    methods: {
//      ...mapActions('thisMonthHandle', [EventType.THISMONTHHANDLETYPE]),
      routerToCommcialOperator(name) {
        this.$router.push({
          name: 'employeeCommcialOperator',
          query: {operatorType: name}
        });
      },
      loadDict(){
        dict.getDictData().then(data => {
          if (data.code == 200) {
            this.taskCategorydict = data.data.SOCLocalTaskCategory;
            this.ssAccountTypedict = data.data.SocialSecurityAccountType;
          }
        });
      },
      employeeOperatorQuery() {
        // 处理参数
        var params = {};
        {
          // 清除 '[全部]'
          params = this.$utils.clear(this.operatorSearchData);
          // 清除空字符串
          params = this.$utils.clear(params, '');
          // 处理 社保起缴月份
          if (params.startMonth) {
            params.startMonth = this.$utils.formatDate(params.startMonth, 'YYYYMM');
          }
        }
        this.isLoading = true;
        api.employeeOperatorQuery({
          pageSize: this.employeeResultPageData.pageSize,
          pageNum: this.employeeResultPageData.pageNum,
          params: params,
        }).then(data => {
          if (data.code == 200) {
            this.employeeResultData = data.data;
            this.employeeResultPageData.total = data.total;
          }
          this.isLoading = false;
        })
      },
      handlePageNum(val) {
        this.employeeResultPageData.pageNum = val;
        var conditions = [];
        this.searchEmploiees(conditions);
      },
      handlePageSite(val) {
        this.employeeResultPageData.pageSize = val;
        var conditions = [];
        this.searchEmploiees(conditions);
      },
      // 检查是否选中任务
      checkSelectEmployeeResultData() {
        if (this.selectEmployeeResultData.length == 0) {
          this.$Modal.warning({
            title: '批退',
            content: '请选择任务'
          });
          return false;
        }
        return true;
      },
      // 批退
      showRefuseReason() {
        if (this.checkSelectEmployeeResultData()) {
          this.isRefuseReason = true
        }
      },
      handleRefuseReason() {
        var ids = [];
        for (var d of this.selectEmployeeResultData) {
          ids.push(d.empTaskId);
        }

        var ajax = api.refuseReason({
          remark: this.rejectionRemark,
          ids: ids
        })

        this.$ajax.handle({
          vm: this,
          ajax: ajax,
          title: '任务批退',
          callback: (data) => {
            this.employeeOperatorQuery();
          }
        })
      },
      // 选中项发生变化时就会触发
      selectionChange(selection) {
        this.selectEmployeeResultData = selection;
      },
      // 检测批量办理
      checkHandle() {
        // 检查类型是否一致（只有选中了任务才能进行办理）
        if (!this.checkSelectEmployeeResultData()) {
          return false;
        }

        var length = this.selectEmployeeResultData.length;
        if (length > 1) {
          var taskCategory = this.selectEmployeeResultData[0].taskCategory

          for (var i = 1; i < length; i++) {
            if (taskCategory != this.selectEmployeeResultData[i].taskCategory) {
              this.$Modal.warning({
                title: '任务办理',
                content: '任务类型不一致'
              });
              return false;
            }
          }
        }
        this.batchHandle(this.selectEmployeeResultData, true);
      },
      // 批量办理
      batchHandle(data, isBatch = false) {
        if (isBatch) {
          // 组织任务 ID
          var empTaskIds = [];
          var rows = data;
          for (var row of rows) {
            empTaskIds.push(row.empTaskId);
          }

          // 任务类型，DicItem.DicItemValue 1:新进：2：转入 3调整 4 补缴 5 转出 6终止 7退账 8 提取 9特殊操作
          var taskCategory = rows[0].taskCategory;
          var name = 'empTaskHandleView';
          switch (taskCategory) {
            case '1':
            case '2':
              name = 'empTaskBatchHandleView';
              break;
            case '3':
              name = 'empTaskBatchHandle3View';
              break;
            case '4':
              name = 'empTaskBatchHandle4View';
              break;
            case '5':
              name = 'empTaskBatchHandle5View';
              break;
            default:
              name = 'empTaskBatchHandleView'
          }

          this.$router.push({
            name: name,
            query: {operatorType: taskCategory, empTaskIds: empTaskIds}
          });
        } else {
          // 任务类型，DicItem.DicItemValue 1新进  2  转入 3  调整 4 补缴 5 转出 6封存 7退账  9 特殊操作
          var taskCategory = data.taskCategory;
          var name = 'empTaskHandleView';
          let type={}
          switch (taskCategory) {
            case '1':
            case '2':
            case '12':
            case '13':
              name = 'empTaskHandleView';
              break;
            case '3':
              name = 'empTaskHandle3View';
              break;
            case '4':
              name = 'empTaskHandle4View';
              break;
            case '5':
            case '6':
            case '14':
            case '15':
              name = 'empTaskHandle5View';
              break;
              case '7':
              type={type:3}
              name = 'empTaskHandle7View';
              break;
            default:
              name = 'empTaskHandleView'
          }


          // 根据任务类型跳转
          this.$router.push({
            name: name,
            query: {operatorType: taskCategory,...type,empTaskId: data.empTaskId}
          });
        }
      },
      exprotExcel() {
      },
      searchEmploiees(conditions) {
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
          var temp = sessionStorage.getItem('socialDaily'+userInfo.userId);

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
        var storeOrder = JSON.parse(sessionStorage.getItem('socialDailyOrder'+userInfo.userId));
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
        var conditions = JSON.parse(sessionStorage.getItem('socialDaily'+userInfo.userId));
        var storeOrder = JSON.parse(sessionStorage.getItem('socialDailyOrder'+userInfo.userId));
        if(conditions!=null){
            for(var i=0;i<conditions.length;i++)
              this.searchConditions.push(conditions[i].exec);
        }

        var dx ='';
        if(e.key === 'companyId'){
            dx = 'c.company_id';
        }else if(e.key === 'employeeId'){
            dx = 'e.employee_id';
        }else if(e.key === 'ssAccount'){
            dx = 'ca.ss_account';
        }else if(e.key === 'idNum'){
            dx = 'e.id_num';
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

        sessionStorage.setItem('socialDailyOrder'+userInfo.userId, JSON.stringify(this.orderConditions));
        if(this.orderConditions.length>0)
        {
          for(let index  in this.orderConditions)
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
          this.isLoading = false;

          this.changeSortClass(storeOrder);
        })
      },
      changeSortClass(storeOrder) {
        this.employeeResultColumns.forEach((e, idx) => {
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

                if(e.key === 'ssAccount' && storeOrder[index].indexOf('ss_account')!=-1) {
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
          tableStyle.changeSortElementClass(1, idx, order)
        });
      },
    }
  }
</script>

