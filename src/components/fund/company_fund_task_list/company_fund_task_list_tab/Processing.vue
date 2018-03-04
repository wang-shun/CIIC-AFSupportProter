<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        企业任务单
        <div slot="content">
          <Form :label-width='150' ref="operatorSearchData" :model="operatorSearchData">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客服中心：" prop="serviceCenterValue">
                  <Cascader :data="serviceCenterData" v-model="operatorSearchData.serviceCenterValue" trigger="hover" transfer></Cascader>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户编号：" prop="title">
                  <input-company v-model="operatorSearchData.companyId"></input-company>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业账户类型：" prop="accountTypeValue">
                  <Select v-model="operatorSearchData.accountTypeValue" style="width: 100%;" transfer>
                    <Option v-for="(value,key) in this.baseDic.companyHFAccountType" :value="key" :key="key">{{ value }}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="缴费银行：" prop="payBankValue">
                  <Select v-model="operatorSearchData.payBankValue" style="width: 100%;" transfer>
                    <Option v-for="(value,key) in this.baseDic.payBankList" :value="key" :key="key">{{ value }}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业公积金账户：" prop="companyFundAccount">
                  <input-account v-model="operatorSearchData.companyFundAccount"></input-account>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公积金类型：" prop="hfTypeName">
                  <Select v-model="operatorSearchData.hfTypeName" style="width: 100%;" transfer>
                    <Option v-for="(value,key) in this.baseDic.hfTypeNameList" :value="value" :key="value">{{ value }}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客服经理：" prop="serviceManager">
                  <Input v-model="operatorSearchData.serviceManager" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="任务发起时间：" prop="taskStartTime">
                  <DatePicker v-model="operatorSearchData.taskStartTime" type="daterange" placement="bottom" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}" class="tr">
                <Button type="primary" icon="ios-search" @click="clickQuery">查询</Button>
                <Button type="warning" @click="resetSearchCondition('operatorSearchData')">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="info">导出</Button>
      </Col>
    </Row>

    <Row class="mt20">
      <Col :sm="{span:24}">
        <Table border :columns="taskColumns" :data="taskData" :loading="loading"></Table>
        <Page
          class="pageSize"
          :total="totalSize"
          :page-size="size"
          :current="pageNum"
          show-sizer
          show-total
          @on-change="getPage"></Page>
      </Col>
    </Row>

  </div>
</template>
<script>
  import InputAccount from '../../../common_control/form/input_account'
  import InputCompany from '../../../common_control/form/input_company'
  import {Processing} from '../../../../api/house_fund/company_task_list/company_task_list_tab/processing'

  export default {
    components: {InputAccount, InputCompany},
    data() {
      return {
        taskData:[],//table 里的数据
        totalSize:0,//后台传过来的分页总数
        collapseInfo: [1], //展开栏
        size:10,//默认单页记录数
        pageNum:1,
        operatorSearchData: {
          serviceCenterValue: '',
          companyId: '',
          accountTypeValue: '',
          payBankValue: '',
          companyFundAccount: '',
          hfTypeName: '',
          serviceManager: '',
          taskStartTime: ''
        },
        serviceCenterData: [
          {value: 1, label: '大客户', children: [{value: '1-1', label: '大客户1'}, {value: '1-2', label: '大客户2'}]},
          {value: 2, label: '日本客户'},
          {value: 3, label: '虹桥'},
          {value: 4, label: '浦东'}
        ], //客服中心
        taskColumns: [
          {title: '操作', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {props: {type: 'success', size: 'small'}, style: {margin: '0 auto'},
                  on: {
                    click: () => {
                      this.setSessionNumAndSize()
                      switch(params.row.taskCategoryName) {
                        case '开户':
                          this.$router.push({name: 'companyFundTaskCommit', params: {
                              comTaskId: params.row.comTaskId,
                              companyInfo: params.row.companyInfo,
                              openAccountInfo: params.row.openAccountInfo}
                          });
                          break;
                        case '转入':
                          this.$router.push({name: 'companyFundTaskCommit', params: {
                              comTaskId: params.row.comTaskId,
                              companyInfo: params.row.companyInfo,
                              openAccountInfo: params.row.openAccountInfo}
                          });
                          break;
                        case '变更':
                          this.$router.push({name: 'companyFundTaskProgressChangeInfo', params: {
                              comTaskId: params.row.comTaskId,
                              companyFundAccountInfo: params.row.companyFundAccountInfo,
                              changeOperator: params.row.changeOperator}
                          });
                          break;
                        case '终止':
                          this.$router.push({name: 'companyFundTaskProgressEndInfo', params: {
                              comTaskId: params.row.comTaskId,
                              companyFundAccountInfo: params.row.companyFundAccountInfo,
                              endOperator: params.row.endOperator}
                          });
                          break;
                        case '销户':
                          this.$router.push({name: 'companyFundTaskProgressEndInfo', params: {
                              comTaskId: params.row.comTaskId,
                              companyFundAccountInfo: params.row.companyFundAccountInfo,
                              endOperator: params.row.endOperator}
                          });
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
          {title: '任务类型', key: 'taskCategoryName', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.taskCategoryName),
              ]);
            }
          },
          {title: '公积金类型', key: 'hfTypeName', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.hfTypeName),
              ]);
            }
          },
          {title: '客户编号', key: 'companyId', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companyId),
              ]);
            }
          },
          {title: '客户名称', key: 'companyName', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companyName),
              ]);
            }
          },
          {title: '经办人', key: 'manager', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.manager),
              ]);
            }
          },
          {title: '客户缴费起始年月', key: 'customerPayStartDate', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.customerPayStartDate),
              ]);
            }
          },
          {title: '付款方式', key: 'comTaskPaymentWayName', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.comTaskPaymentWayName),
              ]);
            }
          },
          {title: '公积金企业U盾', key: 'UKey', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.UKey),
              ]);
            }
          },
          {title: '客户经理', key: 'serviceManager', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.serviceManager),
              ]);
            }
          },
          {title: '发起人', key: 'initiator', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.initiator),
              ]);
            }
          },
          {title: '发起时间', key: 'sponsorTime', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.sponsorTime),
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
      let params = {
        pageSize:this.size,
        pageNum:this.pageNum,
        params:{
          taskStatusString: '1,2', //处理中，送审中
        }
      }
      let self= this
      Processing.postTableData(params).then(data=>{
          self.loading=true;
          self.refresh(data)
        }
      ).catch(error=>{
        console.log(error);
      })

    },
    computed: {
    },
    methods: {
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      getPage(page){
        this.pageNum = page
        this.setSessionNumAndSize()
        this.loading=true;
        let self= this
        let params =this.getParams(page)
        Processing.postTableData(params).then(data=>{
            self.refresh(data)
          }
        ).catch(error=>{
          console.log(error);
        })
      },
      setSessionNumAndSize(){
        sessionStorage.taskPageNum = this.pageNum
        sessionStorage.taskPageSize = this.size
      },
      //关闭查询loding
      closeLoading(){
        this.loading=false;
      },
      //将后台查询的数据赋到页面
      refresh(data){
        this.taskData = data.data.taskData;
        if(typeof(data.data.totalSize)=='undefined') this.totalSize = 0
        else this.totalSize = Number(data.data.totalSize)
        this.closeLoading();
      },
      //点击查询按钮
      clickQuery(){
        this.loading=true;
        //获得页面条件参数
        let params = this.getParams(1)
        let self = this
        Processing.postTableData(params).then(data=>{
          self.refresh(data)
        }).catch(error=>{
          console.log(error)
        })
      },
      //获得列表请求参数
      getParams(page){
        return {
          pageSize:this.size,
          pageNum:page,
          params:{
            taskStatusString: '1,2', //处理中，送审中
            companyId:this.operatorSearchData.companyId,//客户编号
            hfTypeName:(this.operatorSearchData.hfTypeName=="" || this.operatorSearchData.taskStartTime==null || this.operatorSearchData.hfTypeName=='全部') ? null : this.operatorSearchData.hfTypeName //公积金账户类型
          }
        }
      },
    }
  }
</script>
