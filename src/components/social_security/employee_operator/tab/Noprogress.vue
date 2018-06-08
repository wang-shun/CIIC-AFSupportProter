<template>
  <div class="smList" style="height: 1050px;">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        查询条件
        <div slot="content">
            <search-employee @on-search="searchEmploiees" ></search-employee>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
      <!--<Button type="primary" style="width: 100px;" @click="batchAllHandle">批量全选</Button>-->
      <Button type="primary" style="width: 100px;" @click="checkHandle">批量办理</Button>
      <Button type="error" @click="showRefuseReason">批退</Button>
      <Button type="info" @click="exprotExcel">导出</Button>
      </Col>
    </Row>
    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
      <Table border ref="selection" :columns="employeeResultColumns" :data="employeeResultData" @on-selection-change="selectionChange" @on-sort-change="SortChange"></Table>
      <Page
        class="pageSize"
        @on-change="handlePageNum"
        @on-page-size-change="handlePageSite"
        :total="employeeResultPageData.total"
        :page-size="employeeResultPageData.pageSize"
        :page-size-opts="employeeResultPageData.pageSizeOpts"
        :current="employeeResultPageData.pageNum"
        show-sizer show-total
        ></Page>
      </Col>
    </Row>


    <!-- 批退理由 -->
      <Modal
        v-model="isRefuseReason"
        :mask-closable="false">
        <Form>
          <p>
            <Form-item>
              <Input v-model="rejectionRemark" type="textarea" :rows=4  placeholder="请填写批退备注..."></Input>
            </Form-item>
          </p>
        </Form>
         <div slot="footer">
            <Button  size="large"  @click="cancel">取消</Button>
            <Button  size="large"  @click="handleRefuseReason" :loading="isLoading">确定</Button>
        </div>
      </Modal>

  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventType from '../../../../store/event_types'
  import api from '../../../../api/social_security/employee_operator'

  import InputAccount from '../../../common_control/form/input_account'
  import InputCompany from '../../../common_control/form/input_company'
  import InputCompanyName from '../../../common_control/form/input_company/InputCompanyName.vue'
  import dict from '../../../../api/dict_access/social_security_dict'
  import searchEmployee from "./SearchEmployee.vue"
  export default {
    components: {InputAccount, InputCompany,InputCompanyName,searchEmployee},
    data() {
      return {
        refuseLoading:false,
        collapseInfo: [1], //展开栏
        taskCategorydict: [],
        ssAccountTypedict: [],
        orderConditions:[],
        searchCondition: {
          params: '',
          taskStatus: '-1'
        },
        operatorSearchData: {
          taskStatus: '-1',
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
        isNextMonth:false,
        // 批退
        isRefuseReason: false,
        isLoading: false,
        rejectionRemark: '',
        selectEmployeeResultData: [],

        employeeResultData: [],
        employeeResultPageData: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.DEFAULT_PAGE_SIZE_OPTS
        },
        employeeResultColumns: [
          {
            type: 'selection',
            fixed: 'left',
            width: 60,
            align: 'center'
          },
          {
            title: '操作', key: 'action', fixed: 'left', width: 80, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {type: 'success', size: 'small'}, style: {margin: '0 auto'},
                  on: {
                    click: () => {
                      this.batchHandle(params.row);
                    }
                  }
                }, '办理'),
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
            title: '是否更正', key: 'isChange', width: 100, align: 'center',
            render: (h, params) => {
            return h('div', [
                        h('span',  params.row.isChange=='1'?"是":"否")
                      ]);
            }
          },
          {
            title: '雇员', key: 'employeeName', width: 100, align: 'center'
          },
          {
            title: '雇员编号', key: 'employeeId', width: 100, align: 'center',sortable: true
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
            title: '客户编号', key: 'companyId', width: 120, align: 'center',sortable: true
          },
          {
            title: '客户名称', key: 'title', width: 200, align: 'center'
          },
          {
            title: '发起人', key: 'createdDisplayName', width: 100, align: 'center'
          },
          {
            title: '发起时间', key: 'createdTime', width: 180, align: 'center'
          },
          {
            title: '办理备注', key: 'handleRemark', width: 300, align: 'center'
          }
        ]
      }
    },
    async mounted() {
      debugger;
       this.searchConditions =[];
       this.searchConditions = JSON.parse(sessionStorage.getItem('searchEmploiees'));

       if(this.searchConditions==null)
       {
         this.searchConditions =[];
       }

      
      this.searchEmploiees(this.searchConditions);
      this.loadDict();
    },
    computed: {

    },
    methods: {
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
            if(this.operatorSearchData.taskStatus=='-2'){
              this.isNextMonth = true;
            }
          }
          this.isLoading = false;
        })
      },
      exprotExcel() {
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
        api.employeeOperatorQueryExport({
          pageSize: 999999,
          pageNum: 0,
          params: params,
        });
      },
      handlePageNum(val) {
        this.employeeResultPageData.pageNum = val;
        this.employeeOperatorQuery();
      },
      handlePageSite(val) {
        this.employeeResultPageData.pageSize = val;
        this.employeeOperatorQuery();
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
      cancel () {
         this.isRefuseReason = false;
      },
      // 批退
      showRefuseReason() {
        let length = this.selectEmployeeResultData.length;
        if (length > 0) {
          for (let i = 0; i < length; i++) {
            let category = this.selectEmployeeResultData[i].taskCategory;
            if ( category=='5' || category=='6' || category=='11'|| category=='14'|| category=='15') {
              this.$Modal.warning({
                title: '任务批退',
                content: '您选择的任务单存在转出类型，不允许批量批退办理'
              });
              return false;
            }
          }
        }
        if (this.checkSelectEmployeeResultData()) {
          this.isRefuseReason = true
        }
      },
      handleRefuseReason() {
        let remark= this.rejectionRemark;
        if(remark==""){
          this.$Message.warning('请填写批退原因！');
          return;
        }
        var ids = [];
        for (var d of this.selectEmployeeResultData) {
          ids.push(d.empTaskId);
        }
        this.isLoading = true;
        var ajax = api.refuseReason({
          remark:remark,
          ids: ids
        }).then(data=>{
          this.$Message.info(data.message);
          this.isLoading = false;
           this.isRefuseReason = false;
            this.employeeOperatorQuery();
        }).catch(
          error=>{
            this.isLoading = false;
          }
        )

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
      //批量全选
      batchAllHandle(){
        let taskCategory = this.operatorSearchData.taskCategory
        if(typeof(taskCategory)=='undefined'||taskCategory==null || taskCategory==''){
          this.$Message.warning('请选择任务单类型。');
          return;
        }
        let name = 'empTaskHandleView';
          switch (taskCategory) {
            case '1':
            case '2':
            case '12':
            case '13':
              name = 'empTaskBatchHandleView';
              break;
            case '3':
              name = 'empTaskBatchHandle3View';
              break;
            case '4':
              name = 'empTaskBatchHandle4View';
              break;
            case '5':
            case '6':
            case '14':
            case '15':
              name = 'empTaskBatchHandle5View';
              break;
              case '7':
              name = 'empTaskBatchHandle7View';
              break;
            default:
              name = 'empTaskBatchHandleView'
          }
          let startMonth = this.operatorSearchData.startMonth
          if(typeof(startMonth)!='undefined' && startMonth!=null && startMonth!=''){
            this.operatorSearchData.startMonth = this.$utils.formatDate(startMonth, 'YYYYMM')
          }
          this.$router.push({
            name: name,  //isBatchAll 是否是 批量选择
            params:{operatorSearchData:this.operatorSearchData},
            query: {operatorType: taskCategory,isBatchAll:1}
          });
      },
      // 批量办理
      batchHandle(data, isBatch = false) {
        
        if (isBatch) {
          // 组织任务 ID
          var empTaskIds = "";
          var rows = data;

          for (let i=0;i<rows.length;i++) {
              if(i==rows.length-1){
                empTaskIds+=rows[i].empTaskId;
              }else{
                empTaskIds+=rows[i].empTaskId+",";
              }
          }

          // 任务类型，DicItem.DicItemValue 1新进  2  转入 3  调整 4 补缴 5 转出 6封存 7退账  9 特殊操作
          var taskCategory = rows[0].taskCategory;
          var name = 'empTaskHandleView';
          switch (taskCategory) {
            case '1':
            case '2':
            case '12':
            case '13':
              name = 'empTaskBatchHandleView';
              break;
            case '3':
              name = 'empTaskBatchHandle3View';
              break;
            case '4':
              name = 'empTaskBatchHandle4View';
              break;
            case '5':
            case '6':
            case '14':
            case '15':
              name = 'empTaskBatchHandle5View';
              break;
              case '7':
              name = 'empTaskBatchHandle7View';
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
              name = 'empTaskHandle7View';
              break;
            default:
              name = 'empTaskHandleView'
          }
           let params = {}
          if(this.isNextMonth){
             params = {operatorType: taskCategory, empTaskId: data.empTaskId,isNextMonth:1};
          }else{
            params = {operatorType: taskCategory, empTaskId: data.empTaskId,isNextMonth:0}
          }
          // 根据任务类型跳转
          this.$router.push({
            name: name,
            query: params
          });
        }
      },
      searchEmploiees(conditions) {
       
            
        this.searchConditions =[];
            
        for(var i=0;i<conditions.length;i++)
              this.searchConditions.push(conditions[i].exec);

        
        var storeOrder = JSON.parse(sessionStorage.getItem('orderConditions'));
     
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
        
        })
           
      },SortChange(e){

        this.searchConditions =[];

        var conditions = JSON.parse(sessionStorage.getItem('searchEmploiees'));

        var storeOrder = JSON.parse(sessionStorage.getItem('orderConditions'));
            
        for(var i=0;i<conditions.length;i++)
              this.searchConditions.push(conditions[i].exec);  

        var dx ='';
        if(e.key == 'companyId'){
            dx = 'c.company_id';
        }else if(e.key == 'employeeId'){
            dx = 'e.employee_id';
        }else if(e.key == 'ssAccount'){
            dx = 'ca.ss_account';
        }else if(e.key == 'idNum'){
            dx = 'e.id_num';
        }

        const searchConditionExec = `${dx} ${e.order} `;
        
        if(storeOrder==null){
        
        }else{
          this.orderConditions = storeOrder;
        }
        debugger;
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

        sessionStorage.setItem('orderConditions', JSON.stringify(this.orderConditions));

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
