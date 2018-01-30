<template>
  <Form :label-width=150>
    <Row class="mt20">
      <Col :sm="{span: 24}">
      <!-- <Button type="dashed">添加</Button>  -->
      <!-- <Button type="info">导出</Button> -->
      <!-- <Button type="error">删除</Button> -->
      </Col>
    </Row>

    <Table class="mt20" border :columns="operatorTableNewColumns" :data="operatorTableNewData"
           ref="employeeSocialSecurityData"></Table>
    <!--<Table class="mt20" border :columns="operatorTableRepairColumns" :data="data.operatorTableRepairData" ref="employeeSocialSecurityData"></Table>
    <Table class="mt20" border :columns="operatorTableChangeColumns" :data="data.operatorTableChangeData" ref="employeeSocialSecurityData"></Table>
    <Table class="mt20" width="1271" border :columns="operatorTableOutColumns" :data="data.operatorTableOutData" ref="employeeSocialSecurityData"></Table>-->

    <!-- <Row class="mt20" type="flex" justify="start">
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
      <Form-item label="办理方式：">
        <Select v-model="handleValue" style="width: 100%;" transfer>
          <Option v-for="item in handleList" :value="item.value" :key="item.value">{{item.label}}</Option>
        </Select>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-if="operatorType === '4'">
      <Form-item label="截止月份：">
        <DatePicker v-model="socialSecurityEndMonth" type="month" placeholder="选择日期" style="width: 100%;"
                    transfer></DatePicker>
      </Form-item>
      </Col>

      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-if="operatorType === '1'">
      <Form-item label="社保账号分类：">
        <Select v-model="socialSecurityAccountTypeValue" style="width: 100%;" transfer>
          <Option v-for="item in socialSecurityAccountTypeList" :value="item.value" :key="item.value">{{item.label}}
          </Option>
        </Select>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-else-if="operatorType === '2'">
      <Form-item label="补缴基数：">
        <Input v-model="socialSecurityRepairBase" placeholder="请输入..."></Input>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-else-if="operatorType === '3'">
      <Form-item label="新社保缴费基数:">
        <Input v-model="socialSecurityChangeBase" placeholder="请输入..."></Input>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-if="operatorType === '1'">
      <Form-item label="任务：">
        <Select v-model="taskValue" style="width: 100%;" transfer>
          <Option v-for="item in taskList" :value="item.value" :key="item.value">{{item.label}}</Option>
        </Select>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-else-if="operatorType === '2'">
      <Form-item label="补缴起始月份：">
        <DatePicker v-model="socialSecurityRepairStartMonth" type="month" placeholder="选择日期" style="width: 100%;"
                    transfer></DatePicker>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-else-if="operatorType === '3'">
      <Form-item label="调整起始月份：">
        <DatePicker v-model="socialSecurityChangeStartMonth" type="month" placeholder="选择日期" style="width: 100%;"
                    transfer></DatePicker>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-if="operatorType === '1'">
      <Form-item label="社保序号：">
        <Input v-model="socialSecurityIndex" placeholder="请输入..."></Input>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-else-if="operatorType === '2'">
      <Form-item label="补缴截止月份：">
        <DatePicker v-model="socialSecurityRepairEndMonth" type="month" placeholder="选择日期" style="width: 100%;"
                    transfer></DatePicker>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-else-if="operatorType === '3'">
      <Form-item label="调整截止月份：">
        <DatePicker v-model="socialSecurityChangeEndMonth" type="month" placeholder="选择日期" style="width: 100%;"
                    transfer></DatePicker>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-if="operatorType === '1'">
      <Form-item label="起缴月份：">
        <DatePicker v-model="socialSecurityStartMonth" type="month" placeholder="选择日期" style="width: 100%;"
                    transfer></DatePicker>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-else-if="operatorType === '2'">
      <Form-item label="补缴办理月份：">
        <DatePicker v-model="socialSecurityRepairDoMonth" type="month" placeholder="选择日期" style="width: 100%;"
                    transfer></DatePicker>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-else-if="operatorType === '3'">
      <Form-item label="调整办理月份：">
        <DatePicker v-model="socialSecurityChangeDoMonth" type="month" placeholder="选择日期" style="width: 100%;"
                    transfer></DatePicker>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-if="operatorType === '1'">
      <Form-item label="截止月份：">
        <DatePicker v-model="socialSecurityEndMonth" type="month" placeholder="选择日期" style="width: 100%;"
                    transfer></DatePicker>
      </Form-item>
      </Col>
    </Row> 
    <Row style="margin-top:20px;">
      <Col :sm="{span:22}" :md="{span: 24}" :lg="{span: 24}">
      <Form-item label="批退原因：">
        <Input v-model="refuseReason" type="textarea" :rows=4 placeholder="请输入..."></Input>
      </Form-item>
      </Col>
    </Row>-->
    <Row style="margin-top:20px;">
      <Col :sm="{span:24}" class="tr">
      <Button type="primary" @click="comfirm">批量提交</Button>
      <Button type="warning" @click="goback">返回</Button>
      </Col>
    </Row>
  </Form>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventType from '../../../../store/event_types'
  import api from '../../../../api/social_security/employee_operator'
  export default {
    data() {
      return {
        operatorType: this.$route.query.operatorType,
        empTaskIds: this.$route.query.empTaskIds,
        operatorTableNewColumns: [
          // {type: 'selection', align: 'center', width: 60, fixed: 'left'},
          {
            title: '操作', key: 'action', align: 'center', width: 80, fixed: 'left',
            render: (h, params) => {
              let self = this
              return h('div', {style: {textAlign: 'left'}}, [
                h('a', {
                  props: {},
                  on: {
                    click: () => {
                      self.operatorTableNewData.splice(params.index,1);
                      self.updateOperatorTableNewData.splice(params.index,1);
                    }
                  }
                }, '移出')
              ])
            }
          },
          // {
          //   title: '任务单编号', key: 'empTaskId', align: 'center', width: 150, fixed: 'left',
          //   render: (h, params) => {
          //     return h('div', {style: {textAlign: 'left'}}, [
          //       h('span', params.row.empTaskId),
          //     ]);
          //   }
          // },
          {
            title: '客户编号', width: 120, key: 'customerId', align: 'center', fixed: 'left',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.customerId),
              ]);
            }
          },
          {
            title: '客户名称', width: 120, key: 'title', align: 'center', fixed: 'left',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'title'}}, [
                h('span', params.row.title),
              ]);
            }
          },
          {
            title: '雇员姓名', width: 120, key: 'employeeName', align: 'center', fixed: 'left',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employeeName),
              ]);
            }
          },
          {
            title: '入职日期', width: 120, key: 'inDate', align: 'center', fixed: 'left',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.inDate),
              ]);
            }
          },
          {
            title: '处理方式', width: 120, key: 'handleWay', align: 'center',ellipsis: true, 
            render: (h, params) => {
              return h('div', [

                 h('span', params.row.handleWay=='1'||params.row.handleWay=="" || typeof(params.row.handleWay)=='undefined'?'网上申报': '柜面办理'),
                  // h('Select', {props: {value: params.row.handleWay=="" || typeof(params.row.handleWay)=='undefined'?'1': params.row.handleWay}},
                  //   [
                  //     h('Option', {props: {value: '1'}}, '网上申报'),
                  //     h('Option', {props: {value: '2'}}, '柜面办理'),
                  //   ]
                  // )
                ]
              );
            }
          },
           {
            title: '任务类型', width: 120, key: 'taskCategory', align: 'center',ellipsis: true,
            render: (h, params) => {
              return h('div', [
                 h('span', params.row.taskCategory=='1' || params.row.taskCategory=="" || typeof(params.row.taskCategory)=='undefined'?'新进': '转入'),
                  // h('Select', {props: {value: params.row.taskCategory=="" || typeof(params.row.taskCategory)=='undefined'?'1': params.row.taskCategory}},
                  //   [
                  //     h('Option', {props: {value: '1'}}, '新进'),
                  //     h('Option', {props: {value: '2'}}, '转入'),
                  //   ]
                  // )
                ]
              );
            }
          },
          {
            title: '基数', width: 120, key: 'empBase', align: 'center', 
            render: (h, params) => {
              return h('div', [
                h('span',  params.row.empBase)
                // h('i-input', {props: {value: params.row.empBase}})
              ]);
            }
          },
          {
            title: '社保起始月份', key: 'startMonth', align: 'center', width: 180, ellipsis: true,
            render: (h, params) => {
              return h('div', [
                  h('span',  params.row.startMonth)
                // h('DatePicker', {props: {type: 'month', value: params.row.startMonth}})
              ]);
            }
          },
          {
            title: '社保截止月份', key: 'endMonth', align: 'center', width: 180, ellipsis: true,
            render: (h, params) => {
              return h('div', [
                  h('span',  params.row.endMonth)
                // h('DatePicker', {props: {type: 'month', value: params.row.endMonth}})
              ]);
            }
          },
          {
            title: '办理备注', key: 'handleRemark', align: 'center', width: 260, ellipsis: true,
            render: (h, params) => {
              let self = this
              return h('div', [
                h('i-input', {
                  props: {value: params.row.handleRemark},
                  on:{
                    input:(event)=>{
                        self.updateOperatorTableNewData[params.index].handleRemark = event;
                    }
                  }
                }
                
                )
              ]);
            }
          }
        ],
        operatorTableNewData:[],
        updateOperatorTableNewData:[],
        refuseReason: '', //批退原因
      }
    },
    mounted() {
      let empTaskIdsArr = this.empTaskIds.split(",");
      let params ={operatorType:this.operatorType,empTaskIdList:empTaskIdsArr};
      api.queryBatchEmpArchiveByEmpTaskIds(params).then(data=>{
        if(data.data!=null){
          this.operatorTableNewData = data.data;
          this.updateOperatorTableNewData=this.$utils.deepClone(data.data);
        }

      })
    },
    computed: {
  
    },
    methods: {
      goback() {
        this.$router.push({name: 'employeeOperatorView'});
      },
      comfirm(){
        let param =this.updateOperatorTableNewData;
        if(param.length==0){
          this.$Message.error("任务单为空");
        }else{
          let params ={}
          params.ssEmpTaskBOList = param;
          api.handleBatchEmpTask(params).then(data=>{
            if(data!=null){
              if(data.data){
                this.$Message.success("办理成功");
                 this.goback();
              }else{
                this.$Message.error(data.message);
              }
            }else{
              this.$Message.error("网络异常");
            }
          })
            
        }
      }
    }
  }
</script>
