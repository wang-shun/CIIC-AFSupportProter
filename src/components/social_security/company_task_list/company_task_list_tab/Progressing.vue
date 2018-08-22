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
                <Form-item label="处理状态：" prop="handleStateValue">
                  <Select v-model="companyTaskInfo.handleStateValue" style="width: 100%;" transfer>
                    <Option v-for="item in companyTaskInfo.handleStateList" :value="item.value" :key="item.value">{{item.label}}</Option>
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
        <Col :sm="{span:24}" class="tr">
          <!-- <Button type="error" @click="getModal">批退</Button> -->
          <Button type="info" @click="exportExcel">导出</Button>
        </Col>
      </Row>

      <Row class="mt20">
        <Col :sm="{span:24}">
          <Table border :columns="taskColumns" :data="taskData" ref="selection"></Table>
          <Page
            :total="pageData.total"
            :page-size="pageData.pageSize"
            :page-size-opts="pageData.pageSizeOpts"
            :current="pageData.pageNum"
          show-sizer
          show-total
          class="pageSize"
          @on-change="getPage"
           @on-page-size-change="handlePageSite"></Page>
        </Col>
      </Row>

      <!-- 批退理由 -->
      <Modal
        v-model="isRefuseReason"
        :loading="refuseLoading"
        :mask-closable="false">
        <Form>
          <p>
            <Form-item>
              <Input v-model="refuseReason" type="textarea" :rows=4 placeholder="请填写批退备注..."></Input>
            </Form-item>
          </p>
        </Form>
        <div slot="footer">
            <Button  size="large"  @click="cancel">取消</Button>
            <Button  size="large"  @click="asyncOK">确定</Button>
        </div>
      </Modal>

      <!-- 客户名称 模态框 -->
      <!-- <Modal
        v-model="companyTaskInfo.isShowCustomerName"
        title="选择客户"
        @on-ok="ok"
        @on-cancel="cancel">
        <customer-modal :customerData="customerData"></customer-modal>
      </Modal> -->
    </Form>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import customerModal from '../../../common_control/CustomerModal.vue'
  import EventType from '../../../../store/event_types'
  import {Progressing} from '../../../../api/social_security/company_task_list/company_task_list_tab/progressing'
  import Utils from '../../../../lib/utils'
  import InputCompanyName from '../../../common_control/form/input_company/InputCompanyName.vue'
  import InputCompany from '../../../common_control/form/input_company'
  import sessionData from '../../../../api/session-data'

  export default {
    components: {customerModal,InputCompanyName,InputCompany},
    data() {
      return{
        refuseLoading:false,
        taskData:[],//table 里的数据
        customerData:[],//客户信息
//        totalSize:0,//后台传过来的总数
        collapseInfo: [1], //展开栏
//        size:5,//分页
//        pageNum:1,
//        sizeArr:[5,10],
        companyTaskInfo: {
          customerNumber: '',
          customerName:"",
          isShowCustomerName: false,
          accountTypeValue: '',
          accountTypeList: [
             {value: '', label: '全部'},
            {value: '1', label: '独立库'},
            {value: '2', label: '大库'},
            {value: '3', label: '外包'}
          ],
          regionValue: '',
          taskTypeValue: '',
          taskTypeList: [
            {value: '', label: '全部'},
            {value: '1', label: '开户'},
            {value: '2', label: '转入'},
            {value: '3', label: '变更'},
            {value: '4', label: '终止'},
          ],
          taskStartTime: '',
          handleStateValue: '',
          handleStateList: [
             {value: '', label: '全部'},
            {value: '1', label: '已受理'},
            {value: '2', label: '已送审'}
          ],
        },
        pageData: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.DEFAULT_PAGE_SIZE_OPTS
        },
        isRefuseReason: false,
        refuseReason: '',
        loading: true,//分页是表单加载动画

        taskColumns: [
           {
                 type: 'selection',
                 width: 60,
                 align: 'center',
                 fixed: 'left'
            },
          {title: '操作', key: 'action', fixed: 'center', width: 80, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {type: 'success', size: 'small'}, style: {margin: '0 auto'},
                  on: {
                    click: () => {
                      sessionData.setJsonDataToSession('companyTaskList.Progressing.companyTaskInfo', this.companyTaskInfo);
                      sessionData.setJsonDataToSession('companyTaskList.Progressing.pageData', this.pageData);

                      switch(params.row.type) {
                         case '开户':
                        //companyTaskProgressTwo 材料页面  现再屏蔽材料页面
                          this.$router.push({name: 'companyTaskProgressTypeInfo', query: {operatorType: '1',tid:params.row.tid}})
                          break;
                        case '转入':
                          this.$router.push({name: 'companyTaskProgressTypeInfo', query: {operatorType: '2',tid:params.row.tid}})
                          break;
                        case '变更':
                          this.$router.push({name: 'companyTaskProgressChangeInfo', query: {operatorType: '3',tid:params.row.tid}})
                          break;
                        case '终止':
                          this.$router.push({name: 'companyTaskProgressEndInfo', query: {operatorType: '4',tid:params.row.tid}})
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
      sessionData.getJsonDataFromSession('companyTaskList.Progressing.companyTaskInfo', this.companyTaskInfo);
      sessionData.getJsonDataFromSession('companyTaskList.Progressing.pageData', this.pageData);
    },
    mounted() {

//      let sessionPageNum = sessionStorage.taskPageNum
//      let sessionPageSize = sessionStorage.taskPageSize
//      if(sessionPageNum && sessionPageSize){
//        this.pageData.pageNum = Number(sessionPageNum)
//        this.pageData.pageSize = Number(sessionPageSize)
//         sessionStorage.removeItem("taskPageNum")
//         sessionStorage.removeItem("taskPageSize")
//      }
     let self= this
      let params = {
        pageSize:this.pageData.pageSize,
        pageNum:this.pageData.pageNum,
        params:{}
      }
      Progressing.getTableData(params).then(data=>{
          self.loading=true;
           self.refreash(data)
        }
      ).catch(error=>{
        console.log(error);
      })
    },
    computed: {
      ...mapState('cNextMonthHandle',{
          data:state => state.data
      }),
      //get Customer Identity 客户的唯一标识
      //   getCustomerIdentity:function(){
      //   return this.$store.state.cThisMonthHandle.customerIdentity
      // },
      //get CustomerName
      // getCustomerName:function(){
      //   return this.$store.state.cThisMonthHandle.customerName
      // }

    },
    methods: {
      ...mapActions('cNextMonthHandle',[EventType.CNEXTMONTHHANDLETYPE]),
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
          this.loading=true;
          let self= this
          let params =this.getParams(page)
          Progressing.postTableData(params).then(data=>{
          self.refreash(data)
          }
          ).catch(error=>{
            console.log(error);
          })
      },
       //关闭查询loding
      closeLoading(){
          this.loading=false;
      },
       //将后台查询的数据赋到页面
      refreash(data){
          this.taskData = data.data.taskData
          this.customerData = data.data.customerData;
        this.pageData.total = data.data.totalSize;
          this.closeLoading();
      },
      //导表
      exportExcel(){
        // let params ={
        //   companyId:this.companyTaskInfo.customerNumber==''?'':this.companyTaskInfo.customerNumber,//客户编号
        //   companyName:this.companyTaskInfo.customerName==''?'':this.companyTaskInfo.customerName,//客户姓名
        //   taskCategory:this.companyTaskInfo.taskTypeValue==''?'':this.companyTaskInfo.taskTypeValue,//任务类型
        //   accountType:this.companyTaskInfo.accountTypeValue==""?'':this.companyTaskInfo.accountTypeValue,//社保账户类型
        //   regionValue:this.companyTaskInfo.regionValue==''?'':this.companyTaskInfo.regionValue,//结算区县
        //   taskStatus:this.companyTaskInfo.handleStateValue==''?'':this.companyTaskInfo.handleStateValue,//处理状态
        //   submitTimeStart:this.companyTaskInfo.taskStartTime=='' || this.companyTaskInfo.taskStartTime==null||this.companyTaskInfo.taskStartTime[0]==null?null:Utils.formatDate(this.companyTaskInfo.taskStartTime[0],'YYYY-MM-DD'),//任务发起时间
        //   submitTimeEnd:this.companyTaskInfo.taskStartTime==''||this.companyTaskInfo.taskStartTime==null||this.companyTaskInfo.taskStartTime[0]==null ?null:Utils.formatDate(this.companyTaskInfo.taskStartTime[1],'YYYY-MM-DD')
        // };
        let params = this.getParams(1);
        Progressing.expExcel(params);
      },


      //点击查询按钮
      clickQuery(page){
        this.pageData.pageNum = page
         this.loading=true;
        //获得页面条件参数
        let params = this.getParams(1)
        Progressing.postTableData(params).then(data=>{
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
              taskStatus:this.companyTaskInfo.handleStateValue==''?'':this.companyTaskInfo.handleStateValue,//处理状态
              submitTimeStart:submitTimeStart,//任务发起时间
              submitTimeEnd:submitTimeEnd
            }
         }
        },
        getModal(){
           let getRows = this.$refs.selection.getSelection()
           if(getRows.length==0){
             this.$Message.warning('请先选择!');
             return
           }else{
             let taskType = getRows[0].type;
             for(let obj of getRows){
               if(taskType!=obj.type){
                  this.$Message.error('任务单类型不一致!');
                 return
               }
             }
           }
          this.isRefuseReason = true
          this.refuseLoading = true
        },
      asyncOK() {
         let getRows = this.$refs.selection.getSelection()
         let taskIdStr = ""
         for(let obj of getRows){
               taskIdStr+=obj.tid+","
             }


        let params = {
                    taskIdStr:taskIdStr,
                      refuseReason:this.refuseReason
                      }
        if(this.refuseReason===null || this.refuseReason.trim()==''){
           alert("请填写批退原因！");

        }else{
          let self = this
          Progressing.refusingTask(params).then(result=>{
            if(result){
              self.$Message.success("批退成功！")
              self.isRefuseReason = false
              this.clickQuery()
            }else{
                //this.refuseLoading = true
            }

          })
        }
      },
      cancel () {
          this.isRefuseReason = false;
      },
      handlePageSite(val){
        this.pageData.pageSize = val;
        this.clickQuery(1)
      }
    }
  }
</script>
