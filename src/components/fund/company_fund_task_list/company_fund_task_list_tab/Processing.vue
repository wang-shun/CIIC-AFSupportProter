<template>
  <div style="height:950px">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        企业任务单
        <div slot="content">
          <Form :label-width='150' ref="operatorSearchData" :model="operatorSearchData">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="服务中心：" prop="serviceCenterValue">
                  <Cascader :data="serviceCenterData" v-model="operatorSearchData.serviceCenterValue" trigger="hover" transfer></Cascader>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户编号：" prop="companyId">
                  <Input v-model="operatorSearchData.companyId" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <!-- <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业账户类型：" prop="hfAccountType">
                  <Select v-model="operatorSearchData.hfAccountType" style="width: 100%;" transfer>
                    <Option v-for="(value,key) in this.baseDic.companyHFAccountType" :value="key" :key="key">{{ value }}</Option>
                  </Select>
                </Form-item>
              </Col> -->
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="缴费银行：" prop="paymentBank">
                  <Select v-model="operatorSearchData.paymentBank" style="width: 100%;" transfer>
                    <Option  value="" >全部</Option>
                    <Option v-for="(value,key) in this.baseDic.hfPaymentBank" :value="key" :key="key">{{ value }}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业公积金账号：" prop="hfComAccount">
                   <Input v-model="operatorSearchData.hfComAccount" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公积金类型：" prop="hfType">
                  <Select v-model="operatorSearchData.hfType" style="width: 100%;" transfer>
                     <Option value="" >全部</Option>
                    <Option v-for="(value,key) in this.baseDic.hfType" :value="key" :key="key">{{ value }}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客服经理：" prop="leaderShipName">
                  <Input v-model="operatorSearchData.leaderShipName" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <!-- <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="任务发起时间：" prop="taskStartTime">
                  <DatePicker v-model="operatorSearchData.taskStartTime" type="daterange" placement="bottom" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                </Form-item>
              </Col> -->
            </Row>
            <Row>
              <Col :sm="{span: 24}" class="tr">
                <Button type="primary" icon="ios-search" @click="handlePageNum(1)">查询</Button>
                <Button type="warning" @click="resetSearchCondition('operatorSearchData')">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="info" @click="exportExcel">导出</Button>
      </Col>
    </Row>

    <Row class="mt20">
      <Col :sm="{span:24}">
        <Table border :columns="taskColumns" :data="taskData" :loading="loading" :row-class-name="rowClassName" @on-row-dblclick="dbClickHandleData"></Table>
        <Page
          class="pageSize"
          @on-page-size-change="handlePageSize"
          @on-change="handlePageNum"
          :total="pageData.total"
          :page-size="pageData.pageSize"
          :page-size-opts="pageData.pageSizeOpts"
          :current="pageData.pageNum"
          show-sizer
          show-total
          ></Page>
      </Col>
    </Row>

  </div>
</template>
<script>
import {localStorage, sessionStorage} from '../../../../assets/api/storage'
  import InputAccount from '../../../fund/common/input_account'

  import InputCompany from '../../../common_control/form/input_company'
  import {Processing} from '../../../../api/house_fund/company_task_list/company_task_list_tab/processing'
  import {CompanyTaskListHF} from '../../../../api/house_fund/company_task_list/company_task_list_hf'
  import sessionData from '../../../../api/session-data'
  import ts from '../../../../api/house_fund/table_style'
  export default {
    components: {InputAccount, InputCompany},
    data() {
      return {
        taskData:[],//table 里的数据
        totalSize:0,//后台传过来的分页总数
        collapseInfo: [1], //展开栏
        loading:true,
        pageData: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.DEFAULT_PAGE_SIZE_OPTS
        },
        loading: false,
        operatorSearchData: {
          serviceCenterValue: [],
          companyId: '',
          hfAccountType:'',
          paymentBank: '',
          hfComAccount:'',
          hfType:'',
          leaderShipName: '',
          taskStatusString: '1,2' //处理中
        },
        serviceCenterData: [], //客服中心
        taskColumns: [
          // {title: '操作', width: 100, align: 'center',
          //   render: (h, params) => {
          //     return h('div', [
          //       h('Button', {props: {type: 'success', size: 'small'}, style: {margin: '0 auto'},
          //         on: {
          //           click: () => {
                      // sessionData.setJsonDataToSession('companyFundTaskList.processing.operatorSearchData', this.operatorSearchData);
                      // sessionData.setJsonDataToSession('companyFundTaskList.processing.pageData', this.pageData);
                      // switch(params.row.taskCategoryName) {
                      //   case '开户':
                      //     this.$router.push({name: 'companyFundTaskCommit', params: {
                      //         comTaskId: params.row.comTaskId,
                      //         companyInfo: params.row.companyInfo,
                      //         openAccountInfo: params.row.openAccountInfo}
                      //     });
                      //     break;
                      //   case '转入':
                      //     this.$router.push({name: 'companyFundTaskCommit', params: {
                      //         comTaskId: params.row.comTaskId,
                      //         companyInfo: params.row.companyInfo,
                      //         openAccountInfo: params.row.openAccountInfo}
                      //     });
                      //     break;
                      //   case '变更':
                      //     this.$router.push({name: 'companyFundTaskProgressChangeInfo', params: {
                      //         comTaskId: params.row.comTaskId,
                      //         companyFundAccountInfo: params.row.companyFundAccountInfo,
                      //         changeOperator: params.row.changeOperator}
                      //     });
                      //     break;
                      //   case '终止':
                      //     this.$router.push({name: 'companyFundTaskProgressEndInfo', params: {
                      //         comTaskId: params.row.comTaskId,
                      //         companyFundAccountInfo: params.row.companyFundAccountInfo,
                      //         endOperator: params.row.endOperator}
                      //     });
                      //     break;
                      //   case '销户':
                      //     this.$router.push({name: 'companyFundTaskProgressEndInfo', params: {
                      //         comTaskId: params.row.comTaskId,
                      //         companyFundAccountInfo: params.row.companyFundAccountInfo,
                      //         endOperator: params.row.endOperator}
                      //     });
                      //     break;
                      //   default:
                      //     break;
          //             }
          //           }
          //         }
          //       }, '办理'),
          //     ]);
          //   }
          // },
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
          {title: '客服经理', key: 'serviceManager', width: 150, align: 'center',
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
    created() {
      sessionData.getJsonDataFromSession('companyFundTaskList.processing.operatorSearchData', this.operatorSearchData);
      sessionData.getJsonDataFromSession('companyFundTaskList.processing.pageData', this.pageData);
    },
    mounted() {
//      let sessionPageNum = sessionStorage.taskPageNum
//      let sessionPageSize = sessionStorage.taskPageSize
//
//      if(typeof(sessionPageNum)!="undefined" && typeof(sessionPageSize)!="undefined"){
//        this.pageNum = Number(sessionPageNum)
//        this.size = Number(sessionPageSize)
//        sessionStorage.removeItem("taskPageNum")
//        sessionStorage.removeItem("taskPageSize")
//      }
      this.hfComTaskQuery();
      this.getCustomers();
    },
    computed: {
    },
    methods: {
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
       hfComTaskQuery(){
          let params = this.getParams1();
        Processing.postTableData(params).then(data=>{
            this.refresh(data)
            this.pageData.total = Number(data.data.totalSize);
          }
        ).catch(error=>{
          console.log(error);
        });
      },
      handlePageNum(page){
        this.pageData.pageNum = page
        this.hfComTaskQuery();
      },
      handlePageSize(page) {
        this.pageData.pageNum = 1;
        this.pageData.pageSize = page;
        this.hfComTaskQuery();
      },
      //点击查询按钮
      clickQuery(){
        this.pageNum = 1;
        //获得页面条件参数
        let params = this.getParams1()
        Processing.postTableData(params).then(data=>{
          this.refresh(data)
        }).catch(error=>{
          console.log(error)
        })
      },
       //获得列表请求参数
      getParams1(){
        let params={};
        let arrayServiceCenter=this.operatorSearchData.serviceCenterValue;
        if(arrayServiceCenter!=null){
            params=JSON.parse(JSON.stringify(this.operatorSearchData));
            delete params.serviceCenterValue;
            params.serviceCenterValue=arrayServiceCenter[arrayServiceCenter.length-1];
        }
        return {
          pageSize:this.pageData.pageSize,
          pageNum:this.pageData.pageNum,
          params:params,
        }
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
      exportExcel(){
        let params = this.getParams1()
        CompanyTaskListHF.expExcel(params);
      },
      dbClickHandleData(row, index){

              sessionData.setJsonDataToSession('companyFundTaskList.processing.operatorSearchData', this.operatorSearchData);
              sessionData.setJsonDataToSession('companyFundTaskList.processing.pageData', this.pageData);
              switch(row.taskCategoryName) {
                case '开户':
                  this.$router.push({name: 'companyFundTaskCommit', params: {
                      comTaskId: row.comTaskId,
                      companyInfo: row.companyInfo,
                      openAccountInfo: row.openAccountInfo}
                  });
                  break;
                case '转入':
                  this.$router.push({name: 'companyFundTaskCommit', params: {
                      comTaskId: row.comTaskId,
                      companyInfo: row.companyInfo,
                      openAccountInfo: row.openAccountInfo}
                  });
                  break;
                case '变更':
                  this.$router.push({name: 'companyFundTaskProgressChangeInfo', params: {
                      comTaskId: row.comTaskId,
                      companyFundAccountInfo: row.companyFundAccountInfo,
                      changeOperator: row.changeOperator}
                  });
                  break;
                case '终止':
                  this.$router.push({name: 'companyFundTaskProgressEndInfo', params: {
                      comTaskId: row.comTaskId,
                      companyFundAccountInfo: row.companyFundAccountInfo,
                      endOperator: row.endOperator}
                  });
                  break;
                case '销户':
                  this.$router.push({name: 'companyFundTaskProgressEndInfo', params: {
                      comTaskId: row.comTaskId,
                      companyFundAccountInfo: row.companyFundAccountInfo,
                      endOperator: row.endOperator}
                  });
                  break;
                default:
                  break;
              }

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
      getCustomers(){
        CompanyTaskListHF.getCustomers({}).then(data=>{
          this.serviceCenterData = data.data;
        })
      },
      rowClassName(row, index) {
        return ts.comRowClassName(row, index);
      }
    }
  }
</script>
