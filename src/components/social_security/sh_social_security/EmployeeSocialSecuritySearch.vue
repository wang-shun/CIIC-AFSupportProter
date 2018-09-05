<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        雇员社保查询
        <div slot="content">
          <Form :label-width=150 ref="searchCondition" :model="searchCondition">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="服务中心：" prop="serviceCenterValue">
                  <Cascader :data="serviceCenterData"  v-model="searchCondition.serviceCenterValue" trigger="hover" transfer></Cascader>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业社保账户：" prop="ssAccount">
                   <input-account v-model="searchCondition.ssAccount"></input-account>
                </Form-item>
              </Col>
              <!-- <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业社保账户：" prop="companyAccountType">
                  <Input v-model="searchCondition.companyAccountType" placeholder="请输入..."></Input>
                </Form-item>
              </Col> -->
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员编号：" prop="employeeId">
                  <Input v-model="searchCondition.employeeId" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="结算区县：" prop="settlementArea">
                  <Select v-model="searchCondition.settlementArea" transfer>
                     <Option :value="''" :key="''">全部</Option>
                    <Option v-for="(value,key) in this.baseDic.dic_settle_area" :value="value" :key="key">{{value}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="社保账户类型：" prop="ssAccountType">
                  <Select v-model="searchCondition.ssAccountType" style="width: 100%;" transfer>
                    <Option value="" label="全部"></Option>
                  <Option v-for="item in accountTypeList" :value="item.key" :key="item.key" :label="item.value"></Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员姓名：" prop="employeeName">
                  <Input v-model="searchCondition.employeeName" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="社保状态：" prop="archiveTaskStatus">
                  <Select v-model="searchCondition.archiveTaskStatus" style="width: 100%;" transfer>
                    <Option v-for="item in sSecurityStateList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户编号：" prop="companyId">
                  <input-company v-model="searchCondition.companyId"></input-company>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户名称：" prop="title">
                  <input-company-name v-model="searchCondition.title" ></input-company-name>
                  <!-- <Input v-model="searchCondition.title"  placeholder="请输入..."></Input> -->
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="证件号：" prop="idNum">
                  <Input v-model="searchCondition.idNum" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="社保序号：" prop="ssSerial">
                  <Input v-model="searchCondition.ssSerial" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <!-- <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="人员分类：" prop="empClassify">
                  <Select v-model="searchCondition.empClassify" style="width: 100%;" transfer>
                    <Option v-for="item in personTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col> -->
            </Row>
            <Row>
              <Col :sm="{span:24}" class="tr">
                <Button type="primary" icon="ios-search" @click="handlePageNum(1)">查询</Button>
                <Button type="warning" @click="resetSearchCondition('searchCondition')" class="ml10">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <Row style="margin: 10px 0;">
      <Col :sm="{span: 24}" class="tr">
        <Button type="info" @click="exportData">导出</Button>
      </Col>
    </Row>

    <Table border id="searchSocialSecurityData" :row-class-name="rowClassName" :columns="employeeSocialSecurityColumns"
    :data="employeeSocialSecurityData" ref="employeeSocialSecurityData"
    @on-sort-change="SortChange" :loading="isLoading"
    height=340
    ></Table>
    <Page
        class="pageSize"
        @on-change="handlePageNum"
        @on-page-size-change="handlePageSize"
        :total="pageData.total"
        :page-size="pageData.pageSize"
        :page-size-opts="pageData.pageSizeOpts"
        :current="pageData.pageNum"
        show-sizer show-total></Page>

  </div>


</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import customerModal from "../../common_control/CustomerModal.vue"
  import companyAccountSearchModal from "../../common_control/CompanyAccountSearchModal.vue"
  import ICol from "../../../../node_modules/iview/src/components/grid/col"
  import EventTypes from '../../../store/event_types'
  import api from '../../../api/social_security/employee_operator'
  import InputAccount from '../../common_control/form/input_account'
  import InputCompany from '../../common_control/form/input_company'
  import InputCompanyName from '../../common_control/form/input_company/InputCompanyName.vue'
  import dict from '../../../api/dict_access/social_security_dict'
  import sessionData from '../../../api/session-data'
  import ts from '../../../api/house_fund/table_style'
  import tableStyle from '../../../api/table_style'

  export default {
    components: {ICol, customerModal, companyAccountSearchModal,InputAccount,InputCompany,InputCompanyName},
    data() {
      return {
        collapseInfo: [1, 2, 3], //展开栏
        pageData: {
          total: 0,
          pageNum: 1,
          pageSize: 100,
          pageSizeOpts: [100, 500 ]
        },
        searchCondition: {
          serviceCenterValue:[],
          companyId: '', //客户编号
          title: '', //客户名称
          companyAccountType: '', //社保账户类型
          settlementArea: '', //结算区域
          ssAccountType: '',  //社保账户类型
          employeeId: '', //雇员编号
          employeeName: '', //雇员姓名
          idNum: '', //证件号
          ssAccount:'',//企业社保账号
          archiveTaskStatus: '',//社保状态
          ssSerial:'',
          //empClassify: '' //人员分类
          orderParam: ''
        },
        orderConditions: [],
        serviceCenterData: [], //客服中心
        employeeSocialSecurityData:[],//列表数据
        isShowCustomerName: false, //客户名称Modal
        isShowAccountType: false, //社保账户类型Modal

        orderNumber: '', //任务单编号
        orderStartTime: '', //任务开始时间

        sSecurityStateList: [ //1-已办  2-已做 3-转出
        {value: '', label: '全部'},
          {value: '1', label: '已办'},
          {value: '2', label: '已做'},
          {value: '3', label: '转出'},
        ], //社保状态

        isShowCustomerName: false, //客户名称显示模态框
        mCustomerNumber: '', //客户编号
        mCustomerName: '', //客户姓名
        accountTypeList: [], //社保账户类型

        personTypeList: [
          {value: '1', label: '本地'},
          {value: '2', label: '外地'},
          {value: '3', label: '外籍三险'},
          {value: '4', label: '外籍五险'},
          {value: '5', label: '延迟退休人员'}

        ], //人员分类

        isLoading: false,

        employeeSocialSecurityColumns: [
          {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 120,fixed: 'left',
            render: (h, params) => {

              if(params.row.empArchiveId == null || params.row.empArchiveId=='' ){
                return h('div', [
                  h('Button', {
                    props: {type: 'success', size: 'small'},
                    style: {margin: '0 auto'},
                    on: {
                      click: () => {
                        sessionData.setJsonDataToSession('empSSsearch.searchCondition', this.searchCondition);
                        sessionData.setJsonDataToSession('empSSsearch.pageData', this.pageData);
                        this.$router.push({name:'employeeSocialSecurityInfo', query: {companyId: params.row.companyId,employeeId:params.row.employeeId}});
                      }
                    }
                  }, '查看'),
                ])

              }else{
                  return h('div', [
                  h('Button', {
                    props: {type: 'success', size: 'small'},
                    style: {margin: '0 auto'},
                    on: {
                      click: () => {
                        this.showInfo(params.row.empArchiveId)
                      }
                    }
                  }, '查看 / 编辑'),
                ])
              }
            }
          },
           {title: '客户编号', key: 'companyId', align: 'center', width: 120,fixed: 'left',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companyId),
              ])
            }
          },
          {title: '客户名称', key: 'title', align: 'center', width: 250,fixed: 'left',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.title),
              ])
            }
          },
          {title: '雇员编号', key: 'employeeId', align: 'center', width: 120,sortable: 'custom',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.employeeId),
              ]);
            }
          },
          {title: '雇员姓名', key: 'employeeName', align: 'center', width: 140,sortable: 'custom',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employeeName),
              ])
            }
          },
          {title: '证件号', key: 'idNum', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.idNum),
              ])
            }
          },
          {title: '企业社保账号', key: 'ssAccount', align: 'center', width: 120,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.ssAccount),
              ])
            }
          },
          {title: '开户密码', key: 'ssPwd', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.ssPwd),
              ])
            }
          },
          {title: '社保状态', key: 'archiveTaskStatus', align: 'center', width: 120,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', this.$decode.ssArchiveTaskStatus(params.row.archiveTaskStatus)),
              ])
            }
          },
          {title: '客服中心', key: 'serviceCenter', align: 'center', width: 120,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.serviceCenter),
              ])
            }
          },
          {title: '客服经理', key: 'leaderShipName', align: 'center', width: 120,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.leaderShipName),
              ])
            }
          },
          {title: '社保账户类型', key: 'ssAccountType', align: 'center', width: 120,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', this.$decode.accountType(params.row.ssAccountType)),
              ])
            }
          },
          {title: '结算区县', key: 'settlementArea', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.settlementArea),
              ])
            }
          },
          {title: '企业社保账户名称', key: 'comAccountName', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.comAccountName),
              ])
            }
          },
           {title: '起缴月份', key: 'startMonth', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.startMonth),
              ])
            }
          },
           {title: '截止月份', key: 'endMonth', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.endMonth),
              ])
            }
          },
           {title: '办理月份', key: 'ssMonth', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.ssMonth),
              ])
            }
          },
          {title: '入职日期', key: 'inDate', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.inDate),
              ])
            }
          }
        ]
      }
    },
    created() {
      var userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
      var storeOrder = JSON.parse(sessionStorage.getItem('searchSocialSecurityOrder'+userInfo.userId));

      this.employeeSocialSecurityColumns.filter((e) => {
        if(storeOrder !==null)
        {
          if(storeOrder.length>0)
          {
            for(var index in storeOrder)
            {
              var orders = storeOrder[index].split(' ');

              if(e.key === 'employeeId' && storeOrder[index].indexOf('employee_id')!=-1)
              {
                e.sortType = orders[1];
              }

              if(e.key === 'employeeName' && storeOrder[index].indexOf('employee_name')!=-1)
              {
                e.sortType = orders[1];
              }
            }
          }
        }

      })
    },
    mounted() {
      this.loadDict();
      this.getCustomers();

      var userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
      var storeOrder = JSON.parse(sessionStorage.getItem('searchSocialSecurityOrder'+userInfo.userId));
      this.changeSortClass(storeOrder);
    },
    computed: {

    },
    methods: {
      exportData() {
        // this.$refs['employeeSocialSecurityData'].exportCsv({
        //   filename: '原始数据'
        // });
        let params = this.searchCondition
        let arrayServiceCenter=params.serviceCenterValue;
        if(arrayServiceCenter!=null){
            params=JSON.parse(JSON.stringify(params));
            delete params.serviceCenterValue;
            params.serviceCenterValue=arrayServiceCenter[arrayServiceCenter.length-1];
        }
        api.empSSSearchExport(params)
      },
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      getCustomers(){
        let params = null;
        api.getCustomers({params:params}).then(data=>{
          this.serviceCenterData = data.data;
        })
      },
      showInfo (ind) {
        sessionData.setJsonDataToSession('empSSsearch.searchCondition', this.searchCondition);
        sessionData.setJsonDataToSession('empSSsearch.pageData', this.pageData);
        this.$router.push({name:'employeeSocialSecurityInfo', query: {empArchiveId: ind}});

      },
      loadDict(){
        dict.getDictData().then(data => {
          if (data.code == 200) {
            this.accountTypeList = data.data.SocialSecurityAccountType;
            sessionData.getJsonDataFromSession('empSSsearch.searchCondition', this.searchCondition);
            sessionData.getJsonDataFromSession('empSSsearch.pageData', this.pageData);
            let params = this.searchCondition;
            console.log(params)
            this.employeeQuery(params);
          }
        });
      },
      employeeQuery(params){
        let arrayServiceCenter=params.serviceCenterValue;
        if(arrayServiceCenter!=null){
            params=JSON.parse(JSON.stringify(params));
            delete params.serviceCenterValue;
            params.serviceCenterValue=arrayServiceCenter[arrayServiceCenter.length-1];
        }
        api.employeeQuery({
          pageSize: this.pageData.pageSize,
          pageNum: this.pageData.pageNum,
          params: params,
        }).then(data => {
          if (data.data) {
            this.employeeSocialSecurityData = data.data.rows;
            this.pageData.total = Number(data.data.total);
          }
        })
      },
      handlePageNum(val) {
        this.pageData.pageNum = val
        let params = this.searchCondition
        this.employeeQuery(params)
      },
      handlePageSize(val) {
        this.pageData.pageSize = val
        let params = this.searchCondition
        this.employeeQuery(params)
      },
      rowClassName(row, index) {
        return ts.empRowClassName(row, index)
      },
      SortChange(e){
        if (this.isLoading) {
          return;
        }
        this.isLoading = true;
        var userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
        let storeOrder = JSON.parse(sessionStorage.getItem('searchSocialSecurityOrder'+userInfo.userId));
//        sessionData.getJsonDataFromSession('empSSsearch.searchCondition', this.searchCondition);

        var dx ='';
        if (e.key === 'employeeId') {
          dx = 'emp.employee_id';
        } else if(e.key === 'employeeName') {
          dx = 'emp.employee_name';
        }
        const searchConditionExec = `${dx} ${e.order}`;
        if(storeOrder!==null){
          this.orderConditions = storeOrder;
        }
        let isE = false;
        if(this.orderConditions.length>0)
        {
          for(let index in this.orderConditions)
          {
            if(this.orderConditions[index].indexOf(dx)!== -1 && e.order==='normal')
            {  //如果是取消，则删除条件
              this.orderConditions.splice(index,1);
              isE = true;
            }else if(this.orderConditions[index].indexOf(dx)!== -1
              && this.orderConditions[index].indexOf(e.order)=== -1 ) {
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

        this.searchCondition.orderParam = "";
        if (this.orderConditions && this.orderConditions.length > 0) {
          this.searchCondition.orderParam = this.orderConditions.join(',');
        }
        sessionStorage.setItem('searchSocialSecurityOrder'+userInfo.userId, JSON.stringify(this.orderConditions));
        sessionData.setJsonDataToSession('empSSsearch.searchCondition', this.searchCondition);

        let params = this.searchCondition;
        let arrayServiceCenter=params.serviceCenterValue;
        if(arrayServiceCenter!=null){
          params=JSON.parse(JSON.stringify(params));
          delete params.serviceCenterValue;
          params.serviceCenterValue=arrayServiceCenter[arrayServiceCenter.length-1];
        }

        api.employeeQuery({
          pageSize: this.pageData.pageSize,
          pageNum: this.pageData.pageNum,
          params: params,
        }).then(data => {
          this.employeeSocialSecurityData = data.data.rows;
          this.pageData.total = Number(data.data.total);

          this.isLoading = false;

          this.changeSortClass(this.orderConditions);
        })
      },
      changeSortClass(storeOrder) {
        this.employeeSocialSecurityColumns.forEach((e, idx) => {
          let order = 'normal'

          if(storeOrder!==null)
          {
            if(storeOrder.length>0)
            {
              for(var index  in storeOrder)
              {
                var orders = storeOrder[index].split(' ');

                if(e.key === 'employeeId' && storeOrder[index].indexOf('employee_id')!=-1) {
                  order = orders[1]
                  break;
                }

                if(e.key === 'employeeName' && storeOrder[index].indexOf('employee_name')!=-1) {
                  order = orders[1]
                  break;
                }
              }
            }
          }
          tableStyle.changeSortElementClass('searchSocialSecurityData', idx, order)
        });
      },
      ok () {

      },
      cancel () {

      },
    }
  }

</script>
<style scoped>
  .ivu-card {background: rgba(246, 246, 246, 1);}
  .checkBtn .ivu-btn {float: right;}
</style>
