<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        企业任务单
        <div slot="content">
          <Form ref="companyTaskInfo" :model="companyTaskInfo" :label-width=150>
            <Row type="flex" justify="start">
              <!-- <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="账户类型：" prop="accountTypeValue">
                  <Select v-model="companyTaskInfo.accountTypeValue" style="width: 100%;" transfer>
                    <Option v-for="item in companyTaskInfo.accountTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col> -->
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户编号：" prop="customerNumber">
                  <Input v-model="companyTaskInfo.customerNumber" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户名称：" prop="customerName">
                  <Input v-model="getCustomerName" @on-focus="companyTaskInfo.isShowCustomerName = true" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
               <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="任务单类型：" prop="taskTypeValue">
                  <Select v-model="companyTaskInfo.taskTypeValue" style="width: 100%;" transfer>
                    <Option v-for="item in companyTaskInfo.taskTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <!-- <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="结算区县：" prop="regionValue">
                  <Select v-model="companyTaskInfo.regionValue" style="width: 100%;" transfer>
                    <Option v-for="item in companyTaskInfo.regionList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col> -->
              <!-- <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="处理状态：" prop="handleStateValue">
                  <Select v-model="companyTaskInfo.handleStateValue" style="width: 100%;" transfer>
                    <Option v-for="item in companyTaskInfo.handleStateList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col> -->
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
          <Button type="error" @click="isRefuseReason = true">批退</Button>
          <Button type="info" @click="exportExcel">导出</Button>
        </Col>
      </Row>

      <Row class="mt20">
        <Col :sm="{span:24}">
          <Table border :columns="taskColumns" :data="taskData" :loading="loading"></Table>
          
          <Page :total="totalSize" :page-size="size" :page-size-opts="sizeArr" show-sizer show-total  class="pageSize"  @on-change="getPage"></Page>
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
        @on-cancel="cancel" width='800'>
        <customer-modal :customerData="customerData"></customer-modal>
      </Modal>
    </Form>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import customerModal from '../../../commoncontrol/customermodal.vue'
  import EventType from '../../../../store/EventTypes'
  import Axios from 'axios'
  import {NoProgress} from '../../../../module/social_security/company_task_list_tab/no_progress'
  import mock from '../../../../data/social_security/company_task_list/company_task_list_tab/c_this_month_handle_data'
  export default {
    components: {customerModal},
    data() {
      return{
        taskData:[],//table 里的数据
        customerData:[],//客户信息
        totalSize:0,//后台传过来的总数
        collapseInfo: [1], //展开栏
        size:5,//分页
        sizeArr:[5,10],
        companyTaskInfo: {
          customerNumber: '',
          isShowCustomerName: false,
          // accountTypeValue: '',
          // accountTypeList: [
          //   {value: '1', label: '独立库'},
          //   {value: '2', label: '大库'},
          //   {value: '3', label: '外包'}
          // ],
          // regionValue: '',
          // regionList: [
          //   {value: '1', label: '徐汇'},
          //   {value: '2', label: '长宁'},
          //   {value: '3', label: '浦东'},
          //   {value: '4', label: '卢湾'},
          //   {value: '5', label: '静安'},
          //   {value: '6', label: '黄浦'}
          // ],
          taskTypeValue: '',
          taskTypeList: [
            {value: '1', label: '新开转入'},
            {value: '2', label: '调整'},
            {value: '3', label: '补缴'},
          ],
          taskStartTime: '',
          // handleStateValue: '',
          // handleStateList: [
          //   {value: '1', label: '已受理'},
          //   {value: '2', label: '已送审'},
          //   {value: '3', label: '已完成'}
          // ],
        },
        isRefuseReason: false,
        refuseReason: '',
        loading: true,//分页是表单加载动画
        taskColumns: [
          
          {title: '操作', key: 'action', fixed: 'left', width: 80, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {type: 'success', size: 'small'}, style: {margin: '0 auto'},
                  on: {
                    click: () => {
                      switch(params.row.type) {
                        case '开户':
                          this.$router.push({name: 'companytaskprogress2', query: {operatorType: '1'}})
                          break;
                        case '转移':
                          this.$router.push({name: 'companytaskprogress2', query: {operatorType: '2'}})
                          break;
                        case '变更':
                          this.$router.push({name: 'companytaskprogress2', query: {operatorType: '3'}})
                          break;
                        case '终止':
                          this.$router.push({name: 'companytaskprogress2', query: {operatorType: '4',tid:params.row.tid}})
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
          {title: '任务单编号', key: 'tid', width: 150, fixed: 'left', align: 'center',
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
          {title: '客户编号', key: 'customerId', width: 100, align: 'center',
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
          {title: '发起供应商', key: 'sponsor', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.sponsor),
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
      let self= this
      let params = {
          pageSize:this.size,
          pageNum:1,
        params:null
        
      }
      NoProgress.getTableData(params).then(data=>{
          self.loading=true;
           self.refreash(data)
        }
      ).catch(error=>{
        console.log(error);
      })
    },
    computed: {
      // data:function(){
      //   this.closeLoading()
      //   return this.$store.state.cThisMonthHandle.data
      //   }

      //get Customer Identity 客户的唯一标识
        getCustomerIdentity:function(){
        return this.$store.state.cThisMonthHandle.customerIdentity
      },
      //get CustomerName
      getCustomerName:function(){
        return this.$store.state.cThisMonthHandle.customerName
      }
    },
    methods: {
      //...mapActions('cThisMonthHandle',[EventType.CTHISMONTHHANDLETYPE]),
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
          this.loading=true;
          let self= this
          let params = {pageSize:this.size,currentPage:page}
          NoProgress.getTableData(params).then(data=>{
          self.loading=true;
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
        //获得页面条件参数
        let queryParams = {
          companyId:this.companyTaskInfo.customerNumber,//客户编号
          companyName:this.getCustomerName,//客户姓名
          taskCategory:this.companyTaskInfo.taskTypeValue,//任务类型
          taskStartTime:this.companyTaskInfo.taskStartTime,//任务发起时间
          pageSize:this.size,
          currentPage:1
        }

        let params = {
          pageSize:this.size,
          pageNum:1,
          params:{
          companyId:this.companyTaskInfo.customerNumber,//客户编号
          companyName:this.getCustomerName,//客户姓名
          taskCategory:this.companyTaskInfo.taskTypeValue,//任务类型
          taskStartTime:this.companyTaskInfo.taskStartTime,//任务发起时间
        }
        }
        
        NoProgress.postTableData(params).then(data=>{



        }).catch(error=>{

          console.log(error)
        })
      },
      ok () {

      },
      cancel () {

      }
    }
  }
</script>
