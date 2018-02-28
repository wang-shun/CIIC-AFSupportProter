<template>
  <div class="smList">
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
                    <Option v-for="item in companyTaskInfo.regionList" :value="item.label" :key="item.value">{{item.label}}</Option>
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
                <Button type="primary" @click="clickQuery" icon="ios-search">查询</Button>
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
          <Page :total="totalSize" :page-size="size" :page-size-opts="sizeArr" :current="pageNum" show-sizer show-total  class="pageSize" @on-change="getPage"></Page>
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
  import {Progressing} from '../../../../api/social_security/company_task_list/company_task_list_tab/Progressing'
  import Utils from '../../../../lib/utils'
  import InputCompanyName from '../../../common_control/form/input_company/InputCompanyName.vue'
  import InputCompany from '../../../common_control/form/input_company'
  export default {
    components: {customerModal,InputCompanyName,InputCompany},
    data() {
      return{
        refuseLoading:false,
        taskData:[],//table 里的数据
        customerData:[],//客户信息
        totalSize:0,//后台传过来的总数
        collapseInfo: [1], //展开栏
        size:5,//分页
        pageNum:1,
        sizeArr:[5],
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
          regionList: [
            {value: '', label: '全部'},
            {value: '徐汇', label: '徐汇'},
            {value: '长宁', label: '长宁'},
            {value: '浦东', label: '浦东'},
            {value: '卢湾', label: '卢湾'},
            {value: '静安', label: '静安'},
            {value: '黄浦', label: '黄浦'},
            {value: '杨浦', label: '杨浦'},
            {value: '普陀', label: '普陀'},
            {value: '宝山', label: '宝山'},
            {value: '虹口', label: '虹口'},
            {value: '闵行', label: '闵行'},
            {value: '松江', label: '松江'},
            {value: '嘉定', label: '嘉定'},
            {value: '青浦', label: '青浦'},
            {value: '奉贤', label: '奉贤'},
            {value: '崇明', label: '崇明'},
            {value: '金山', label: '金山'},
          ],
          taskTypeValue: '',
          taskTypeList: [
            {value: '', label: '全部'},
            {value: '1', label: '开户'},
            {value: '2', label: '转移'},
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
                      switch(params.row.type) {
                         case '开户':
                        //companyTaskProgressTwo 材料页面  现再屏蔽材料页面
                          this.$router.push({name: 'companyTaskProgressTypeInfo', query: {operatorType: '1',tid:params.row.tid}})
                          break;
                        case '转移':
                          this.$router.push({name: 'companyTaskProgressTransferInfo', query: {operatorType: '2',tid:params.row.tid}})
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
          {title: '任务单编号', key: 'tid', width: 150, fixed: 'center', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.tid),
              ]);
            }
          },
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
          {title: '发起人', key: 'initiator', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.initiator),
              ]);
            }
          },
          {title: '发起时间', key: 'sponsorTime', width: 180, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.sponsorTime),
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
    mounted() {

      let sessionPageNum = sessionStorage.taskPageNum
      let sessionPageSize = sessionStorage.taskPageSize
      if(typeof(sessionPageNum)!="undefined" && typeof(sessionPageSize)!="undefined"){
         this.pageNum = Number(sessionPageNum)
         this.size = Number(sessionPageSize)
         sessionStorage.removeItem("taskPageNum")
         sessionStorage.removeItem("taskPageSize")
      }
     let self= this
      let params = {
          pageSize:this.size,
          pageNum:this.pageNum,
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
          if(typeof(data.data.totalSize)=='undefined') this.totalSize  =0
          else this.totalSize  =Number(data.data.totalSize)
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
      clickQuery(){
         this.loading=true;
        //获得页面条件参数
      let params = this.getParams(1)
      let self = this
        Progressing.postTableData(params).then(data=>{

           self.refreash(data)

        }).catch(error=>{

          console.log(error)
        })
      },
      //获得请求参数
      getParams(page){
        return {
          pageSize:this.size,
          pageNum:page,
            params:{
              companyId:this.companyTaskInfo.customerNumber==''?'':this.companyTaskInfo.customerNumber,//客户编号
              companyName:this.companyTaskInfo.customerName==''?'':this.companyTaskInfo.customerName,//客户姓名
              taskCategory:this.companyTaskInfo.taskTypeValue==''?'':this.companyTaskInfo.taskTypeValue,//任务类型
              accountType:this.companyTaskInfo.accountTypeValue==""?'':this.companyTaskInfo.accountTypeValue,//社保账户类型
              regionValue:this.companyTaskInfo.regionValue==''?'':this.companyTaskInfo.regionValue,//结算区县
              taskStatus:this.companyTaskInfo.handleStateValue==''?'':this.companyTaskInfo.handleStateValue,//处理状态
              submitTimeStart:this.companyTaskInfo.taskStartTime=='' || this.companyTaskInfo.taskStartTime==null||this.companyTaskInfo.taskStartTime[0]==null?null:Utils.formatDate(this.companyTaskInfo.taskStartTime[0],'YYYY-MM-DD'),//任务发起时间
              submitTimeEnd:this.companyTaskInfo.taskStartTime==''||this.companyTaskInfo.taskStartTime==null||this.companyTaskInfo.taskStartTime[0]==null ?null:Utils.formatDate(this.companyTaskInfo.taskStartTime[1],'YYYY-MM-DD')
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
      }
    }
  }
</script>
