<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        企业任务单
        <div slot="content">
          <Form ref="companyTaskInfo" :model="companyTaskInfo" :label-width=150>
             <Row type="flex" justify="start">
               <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="任务单类型：" prop="taskTypeValue">
                  <Select v-model="companyTaskInfo.taskTypeValue" style="width: 100%;" transfer>
                    <Option v-for="item in companyTaskInfo.taskTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户编号：" prop="customerNumber">
                  <Input v-model="companyTaskInfo.customerNumber" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户名称：" prop="customerName">
                  <Input v-model="companyTaskInfo.customerName"  placeholder="请输入..."></Input>
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
                <Button type="primary" icon="ios-search" @click="clickQuery">查询</Button>
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
          <Page :total="totalSize" :page-size="size" :page-size-opts="sizeArr" :current="pageNum" show-sizer show-total  class="pageSize" @on-change="getPage"></Page>
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
      <!-- <Modal
        v-model="companyTaskInfo.isShowCustomerName"
        title="选择客户"
        @on-ok="ok"
        @on-cancel="cancel">
        <customer-modal :customerData="data.customerData"></customer-modal>
      </Modal> -->
    </Form>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import customerModal from '../../../common_control/CustomerModal.vue'
  import EventType from '../../../../store/event_types'
  import {Refused} from '../../../../api/social_security/company_task_list/company_task_list_tab/Refused'
  import Utils from '../../../../lib/utils'
  export default {
    components: {customerModal},
    data() {
      return{
        taskData:[],//table 里的数据
        customerData:[],//客户信息
        totalSize:0,//后台传过来的总数
        collapseInfo: [1], //展开栏
        size:5,//分页
        pageNum:1,
        sizeArr:[5],
        companyTaskInfo: {
          serviceCenterValue: '',
          serviceCenterList: [],
          customerNumber: '',
          customerName: '',
          isShowCustomerName: false,
          accountTypeValue: '',
          taskNumber: '',
          taskTypeValue: '',
          taskTypeList: [
            {value: '1', label: '开户'},
            {value: '2', label: '转移'},
            {value: '3', label: '变更'},
            {value: '4', label: '终止'},
          ],
          taskStartTime: ''
        },

        isRefuseReason: false,
        refuseReason: '',

        taskColumns: [
          {title: '操作', key: 'action', fixed: 'center', width: 80, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {type: 'success', size: 'small'}, style: {margin: '0 auto'},
                  on: {
                    click: () => {
                      switch(params.row.type) {
                        case '开户':
                          this.$router.push({name: 'openaccountinfo', query:{operatorType: '1',source:1,tid:params.row.tid}})
                          break;
                        case '转移':
                          this.$router.push({name: 'transfertnfo', query:{operatorType: '2',source:1,tid:params.row.tid}})
                          break;
                        case '变更':
                          this.$router.push({name: 'changeinfo', query:{operatorType: '3',source:1,tid:params.row.tid}})
                          break;
                        case '终止':
                          this.$router.push({name: 'endinfo', query:{operatorType: '4',source:1,tid:params.row.tid}})
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
          {title: '备注', key: 'notes', align: 'center',
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

      let sessionPageNum = sessionStorage.taskRePageNum
      let sessionPageSize = sessionStorage.taskRePageSize
      if(typeof(sessionPageNum)!="undefined" && typeof(sessionPageSize)!="undefined"){
         this.pageNum = Number(sessionPageNum)
         this.size = Number(sessionPageSize)
        //  sessionStorage.removeItem("taskRePageNum")
        //  sessionStorage.removeItem("taskRePageSize")
      }

      let params = {
          pageSize:this.size,
          pageNum:1,
        params:{}
      }
      let self= this
      Refused.postTableData(params).then(data=>{
          self.loading=true;
          self.refreash(data)
        }
      ).catch(error=>{
        console.log(error);
      })
    },
    computed: {
      ...mapState('cRefused',{
          data:state =>state.data
      })
    },
    methods: {
      ...mapActions('cRefused',[EventType.CREFUSEDTYPE]),
      resetSearchCondition(name) {
          //重置  將客戶名 清空
        let data={
           customerName:'',
           customerIdentity:''
        }
        //该state 只用来存放客户名称
        this.$store.commit(EventType.CTHISMONTHHANDLETYPE,data)
        this.$refs[name].resetFields()
      },
      routerToCommcialOperator: function(name) {
        this.$router.push({
          name: 'employeecommcialoperator',
          query: {operatorType: name}
        });
      },
      //页面 上 ，下一页操作
      getPage(page){

         this.pageNum = page
          sessionStorage.taskRePageNum=page
          sessionStorage.taskRePageSize = this.size
          this.loading=true;
          let self= this
          let params =this.getParams(page)
          Refused.postTableData(params).then(data=>{
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

      },
      //点击查询按钮
      clickQuery(){
         this.loading=true;
        //获得页面条件参数
      let params = this.getParams(1)
      let self = this
        Refused.postTableData(params).then(data=>{
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
              companyId:this.companyTaskInfo.customerNumber==""?'':this.companyTaskInfo.customerNumber,//客户编号
              companyName:this.companyTaskInfo.customerName==""?'':this.companyTaskInfo.customerName,//客户姓名
              taskCategory:this.companyTaskInfo.taskTypeValue==""?'':this.companyTaskInfo.taskTypeValue,//任务类型
              submitTimeStart:this.companyTaskInfo.taskStartTime==""?null:Utils.formatDate(this.companyTaskInfo.taskStartTime[0],'YYYY-MM-DD'),//任务发起时间
              submitTimeEnd:this.companyTaskInfo.taskStartTime==""?null:Utils.formatDate(this.companyTaskInfo.taskStartTime[1],'YYYY-MM-DD')
            }
         }
        },
      ok () {

      },
      cancel () {

      }
    }
  }
</script>
