<template>
  <div class="smList" style="height: 850px;">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        企业任务单
        <div slot="content">
          <Form ref="companyTaskInfo" :model="companyTaskInfo" :label-width=150>
             <Row type="flex" justify="start">
               <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="社保账户类型：" prop="accountTypeValue">
                  <Select v-model="companyTaskInfo.accountTypeValue" style="width: 100%;" transfer>
                    <Option v-for="item in companyTaskInfo.accountTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户编号：" prop="customerNumber">
                 <input-company v-model="companyTaskInfo.customerNumber"></input-company>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户名称：" prop="customerName">
                  <input-company-name v-model="companyTaskInfo.customerName" ></input-company-name>
                </Form-item>
              </Col>
               <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="任务单类型：" prop="taskTypeValue">
                  <Select v-model="companyTaskInfo.taskTypeValue" style="width: 100%;" transfer>
                    <Option v-for="item in companyTaskInfo.taskTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="结算区县：" prop="regionValue">
                  <Select v-model="companyTaskInfo.regionValue" style="width: 100%;" transfer>
                    <Option :value="''" :key="''">全部</Option>
                    <Option v-for="(value,key) in this.baseDic.dic_settle_area" :value="value" :key="key">{{value}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="任务发起时间：" prop="taskStartTime">
                  <DatePicker v-model="companyTaskInfo.taskStartTime" type="daterange" placement="bottom" placeholder="选择日期" style="width: 100%" transfer></DatePicker>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span:24}" class="tr">
                <Button type="primary" @click="clickQuery(1)" icon="ios-search">查询</Button>
                <Button type="warning" @click="resetSearchCondition('companyTaskInfo')">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <Form>
      <Row class="mt20">
        <Col :sm="{span:24}">
          <Table border :columns="taskColumns" :data="taskData"></Table>
          <Page
            :total="pageData.total"
            :page-size="pageData.pageSize"
            :page-size-opts="pageData.pageSizeOpts"
            :current="pageData.pageNum"
          show-sizer show-total
          class="pageSize"
          @on-change="getPage"
          @on-page-size-change="handlePageSite"></Page>
        </Col>
      </Row>

      <!-- 批退理由 -->
      <Modal
        v-model="isRefuseReason"
        @on-ok="ok"
        @on-cancel="cancel">
        <Form>
          <p>
            <Form-item>
              <Input v-model="refuseReason" type="textarea" :rows=4 placeholder="请填写批退备注..."></Input>
            </Form-item>
          </p>
        </Form>
      </Modal>

      <!-- 客户名称 模态框 -->
      <Modal
        v-model="companyTaskInfo.isShowCustomerName"
        title="选择客户"
        @on-ok="ok"
        @on-cancel="cancel">
        <customer-modal :customerData="data.customerData"></customer-modal>
      </Modal>
    </Form>
  </div>
</template>
<script>
  import {localStorage, sessionStorage} from '../../../../assets/api/storage'
  import {mapState, mapGetters, mapActions} from 'vuex'
  import customerModal from '../../../common_control/CustomerModal.vue'
  import EventType from '../../../../store/event_types'
  import {Finished} from '../../../../api/social_security/company_task_list/company_task_list_tab/finished'
  import Utils from '../../../../lib/utils'
  import InputCompanyName from '../../../common_control/form/input_company/InputCompanyName.vue'
  import InputCompany from '../../../common_control/form/input_company'
  import sessionData from '../../../../api/session-data'

  export default {
    components: {customerModal,InputCompanyName,InputCompany},
    data() {
      return{
        collapseInfo: [1], //展开栏
//         size:5,//分页
//         pageNum:1,
//        sizeArr:[5,10],
//        totalSize:0,//后台传过来的总数
        taskData:[],//表格数据
        companyTaskInfo: {
          serviceCenterValue: '',
          serviceCenterList: [],
          customerNumber: '',
          customerName: '',
          isShowCustomerName: false,
          accountTypeValue: '',
          accountTypeList: [//1:中智大库 2中智外包 3独立户
           {value: '', label: '全部'},
            {value: '1', label: '大库'},
            {value: '2', label: '外包'},
            {value: '3', label: '独立库'}
          ],
          regionValue: '',
          taskNumber: '',
          taskTypeValue: '',
          taskTypeList: [
             {value: '', label: '全部'},
            {value: '1', label: '开户'},
            {value: '2', label: '转移'},
            {value: '3', label: '变更'},
            {value: '4', label: '终止'},
          ],
          taskStartTime: ''
        },
        pageData: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.DEFAULT_PAGE_SIZE_OPTS
        },
        isRefuseReason: false,
        refuseReason: '',

        taskColumns: [
          {title: '操作', key: 'action', fixed: 'left', width: 80, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {type: 'success', size: 'small'}, style: {margin: '0 auto'},
                  on: {
                    click: () => {
                      sessionData.setJsonDataToSession('companyTaskList.Finished.companyTaskInfo', this.companyTaskInfo);
                      sessionData.setJsonDataToSession('companyTaskList.Finished.pageData', this.pageData);

                      switch(params.row.type) {
                        case '开户':
                          this.$router.push({name: 'openAccountInfo', query:{operatorType: '1',source:0,tid:params.row.tid}})
                          break;
                        case '转移':
                          this.$router.push({name: 'transferInfo', query:{operatorType: '2',source:0,tid:params.row.tid}})
                          break;
                        case '变更':
                          this.$router.push({name: 'changeInfo', query:{operatorType: '3',source:0,tid:params.row.tid}})
                          break;
                        case '终止':
                          this.$router.push({name: 'endInfo', query:{operatorType: '4',source:0,tid:params.row.tid}})
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
          // {title: '任务单编号', key: 'tid', width: 150, fixed: 'center', align: 'center',
          //   render: (h, params) => {
          //     return h('div', {style: {textAlign: 'center'}}, [
          //       h('span', params.row.tid),
          //     ]);
          //   }
          // },
          {title: '任务单类型', key: 'type', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.type),
              ]);
            }
          },
          {title: '客户编号', key: 'customerId', width: 110, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.customerId),
              ]);
            }
          },
          {title: '企业客户', key: 'companyCustomer', width: 250, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.companyCustomer),
              ]);
            }
          },
          {title: '完成截止日期', key: 'finishDate', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.finishDate),
              ]);
            }
          },
          {title: '发起人', key: 'createdDisplayName', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.createdDisplayName),
              ]);
            }
          },
          {title: '发起时间', key: 'createdTime', width: 180, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.createdTime),
              ]);
            }
          },
          {title: '发起人备注', key: 'notes',width: 426, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.notes),
              ]);
            }
          }
        ]
      }
    },
    created() {
      sessionData.getJsonDataFromSession('companyTaskList.Finished.companyTaskInfo', this.companyTaskInfo);
      sessionData.getJsonDataFromSession('companyTaskList.Finished.pageData', this.pageData);
    },
    mounted() {

//      let sessionPageNum = sessionStorage.taskFiPageNum
//      let sessionPageSize = sessionStorage.taskFiPageSize
//
//      if(sessionPageNum && sessionPageSize){
//        this.pageData.pageNum = Number(sessionPageNum)
//        this.pageData.pageSize = Number(sessionPageSize)
//        //  sessionStorage.removeItem("taskFiPageNum")
//        //  sessionStorage.removeItem("taskFiPageSize")
//      }

      // let params = {
      //   pageSize:this.pageData.pageSize,
      //   pageNum:this.pageData.pageNum,
      //   params:{}
      // }
      let params=this.getParams(this.pageData.pageNum);
       let self= this
      Finished.postTableData(params).then(data=>{
          self.loading=true;
           self.refreash(data)

        }
      ).catch(error=>{
        console.log(error);
      })
    },
    computed: {
      ...mapState('cFinished',{
        data:state => state.data
    })
    },
    methods: {
      ...mapActions('cFinished',[EventType.CFINISHEDTYPE]),
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      routerToCommcialOperator: function(name) {
        this.$router.push({
          name: 'employeeCommcialOperator',
          query: {operatorType: name}
        });
      },
         //页面 上 ，下一页操作
      getPage(page){

        this.pageData.pageNum = page
          this.setSessionNumAndSize()
        sessionStorage.taskFiPageNum=this.pageData.pageNum
        sessionStorage.taskFiPageSize = this.pageData.pageSize
          this.loading=true;
          let self= this
          let params =this.getParams(page)
          Finished.postTableData(params).then(data=>{
          self.refreash(data)
          }
          ).catch(error=>{
            console.log(error);
          })
      },
      setSessionNumAndSize(){
        sessionStorage.taskPageNum=this.pageData.pageNum
        sessionStorage.taskPageSize = this.pageData.pageSize
      },
      //关闭查询loding
      closeLoading(){
          this.loading=false;
      },
       //将后台查询的数据赋到页面
      refreash(data){
          this.taskData = data.data.taskData
        this.pageData.total = data.data.totalSize;
          this.closeLoading();
      },
      //导表
      exportExcel(){

      },
       //点击查询按钮
      clickQuery(page){
        this.pageData.pageNum = page
         this.loading=true;
        //获得页面条件参数
      let params = this.getParams(1)
        Finished.postTableData(params).then(data=>{
           this.refreash(data)
        }).catch(error=>{
          console.log(error)
        })
      },
       //获得请求参数
      getParams(page){
         let submitTimeStart='';
        let submitTimeEnd='';
        if(this.companyTaskInfo.taskStartTime[0] && this.companyTaskInfo.taskStartTime[1] && this.companyTaskInfo.taskStartTime[0]!="" && this.companyTaskInfo.taskStartTime[1]!=""){
               submitTimeStart=Utils.formatDate(this.companyTaskInfo.taskStartTime[0],'YYYY-MM-DD');//任务发起时间
               submitTimeEnd=Utils.formatDate(this.companyTaskInfo.taskStartTime[1],'YYYY-MM-DD');
          }
        this.pageData.pageNum = page
        return {
          pageSize:this.pageData.pageSize,
          pageNum:this.pageData.pageNum,
            params:{
              companyId:this.companyTaskInfo.customerNumber==''?'':this.companyTaskInfo.customerNumber,//客户编号
              companyName:this.companyTaskInfo.customerName==''?'':this.companyTaskInfo.customerName,//客户姓名
              taskCategory:this.companyTaskInfo.taskTypeValue==''?'':this.companyTaskInfo.taskTypeValue,//任务类型
              accountType:this.companyTaskInfo.accountTypeValue==""?'':this.companyTaskInfo.accountTypeValue,//社保账户类型
              regionValue:this.companyTaskInfo.regionValue==''?'':this.companyTaskInfo.regionValue,//结算区县
              submitTimeStart:submitTimeStart,//任务发起时间
              submitTimeEnd:submitTimeEnd
            }
         }
        },
      ok () {

      },
      cancel () {

      },
      handlePageSite(val){
        this.pageData.pageSize = val;
         this.clickQuery(1)
      }
    }
  }
</script>
