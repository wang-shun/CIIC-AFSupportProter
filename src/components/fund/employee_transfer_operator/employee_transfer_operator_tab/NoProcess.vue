<template>
  <div style="height:850px">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        雇员转移查询条件
        <div slot="content">
          <Form :label-width=150 ref="searchCondition" :model="searchCondition">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="服务中心：" prop="serviceCenterValue">
                  <Cascader :data="customerCenterData" v-model="searchCondition.serviceCenterValue" trigger="hover" transfer></Cascader>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户编号：" prop="companyId">
                  <Input v-model="searchCondition.companyId" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员编号：" prop="employeeId">
                  <Input v-model="searchCondition.employeeId" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="转入单位：" prop="transferInUnit">
                  <Input v-model="searchCondition.transferInUnit" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="转出单位：" prop="transferOutUnit">
                  <Input v-model="searchCondition.transferOutUnit" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员姓名：" prop="employeeName">
                  <Input v-model="searchCondition.employeeName" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公积金类型：" prop="hfType">
                  <Select v-model="searchCondition.hfType" style="width: 100%;" transfer>
                    <Option v-for="item in fundTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="缴费银行：" prop="paymentBank">
                  <Select v-model="searchCondition.paymentBank" style="width: 100%;" transfer>
                    <Option v-for="(value,key) in this.baseDic.hfPaymentBank" :value="key" :key="key">{{value}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="证件号：" prop="idNum">
                  <Input v-model="searchCondition.idNum" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员公积金账号：" prop="hfEmpAccount">
                  <Input v-model="searchCondition.hfEmpAccount" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="账户类型：" prop="hfAccountType">
                  <Select v-model="searchCondition.hfAccountType" style="width: 100%;" transfer>
                    <Option v-for="item in accountTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>

              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="入离职状态：" prop="status">
                  <Select v-model="searchCondition.status" style="width: 100%;" transfer>
                    <Option v-for="item in workStatusList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公积金状态：" prop="archiveTaskStatus">
                  <Select v-model="searchCondition.archiveTaskStatus" style="width: 100%;" transfer>
                    <Option value="" key="">全部</Option>
                    <Option v-for="item in EmpArchiveStatus" :value="item.key" :key="item.key">{{item.value}}</Option>
                  </Select>
                </Form-item>
              </Col>

            </Row>
            <Row>
              <Col :sm="{span: 24}" class="tr">
                <Button type="primary" icon="ios-search" @click="handlePageNum(1)">查询</Button>
                <Button type="warning" @click="resetSearchCondition('searchCondition')">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="primary" @click="isCreateTaskTicket = true;handlePageNumNewTask(1);">新建转移任务单</Button>
        <!-- <Button type="info" @click="">批量打印转中心通知书</Button> -->
        <Dropdown @on-click="fileExport">
          <Button type="primary">
            转移操作
            <Icon type="arrow-down-b"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="0">导出入管清册</DropdownItem>
            <DropdownItem name="1">导出雇员转移清册</DropdownItem>
            <DropdownItem name="2">导出雇员转移TXT</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <!-- <Button type="primary" @click="">扫描校验</Button> -->
      </Col>
    </Row>

    <Row class="mt20">
      <Col :sm="{span:24}">
        <Table border :columns="noProcessColumns" :data="empTaskTransferData" @on-row-dblclick="dbClickHandleData" width></Table>
        <Page
        class="pageSize"
        @on-change="handlePageNum"
        @on-page-size-change="handlePageSize"
        :total="pageData.total"
        :page-size="pageData.pageSize"
        :page-size-opts="pageData.pageSizeOpts"
        :current="pageData.pageNum"
        show-sizer show-total></Page>
      </Col>
    </Row>

    <!-- 新建任务单 -->
    <Modal
      v-model="isCreateTaskTicket"
       title="新建转移任务单"
      width="820"
      :mask-closable="false"
    >
      <Form :label-width="100" :model="createTask.searchCondition" ref='createTaskSearchForm'>
        <Row>
          <Col :sm="{span: 12}">
            <Form-item label="雇员编号：" prop="employeeId">
              <Input v-model="createTask.searchCondition.employeeId" placeholder="请输入..."></Input>
            </Form-item>
          </Col>
          <Col :sm="{span: 12}">
            <Form-item label="雇员姓名：" prop="employeeName">
              <Input v-model="createTask.searchCondition.employeeName" placeholder="请输入..."></Input>
            </Form-item>
          </Col>
          <Col :sm="{span: 12}">
            <Form-item label="证件号：" prop="idNum">
              <Input v-model="createTask.searchCondition.idNum" placeholder="请输入..."></Input>
            </Form-item>
          </Col>
          <Col :sm="{span: 12}">
            <Form-item label="客户编号：" prop="companyId">
              <Input v-model="createTask.searchCondition.companyId" placeholder="请输入..."></Input>
            </Form-item>
          </Col>
          <Col :sm="{span: 12}">
            <Form-item label="客户名称：" prop="title">
              <Input v-model="createTask.searchCondition.title" placeholder="请输入..."></Input>
            </Form-item>
          </Col>
          <Col :sm="{span: 12}">
            <Form-item label="入离职状态：" prop="status">
              <Select v-model="createTask.searchCondition.status" style="width: 100%;" transfer>
                <Option v-for="item in createTask.workStatusList" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </Form-item>
          </Col>
        </Row>
        <Row>
           <!-- <Col :sm="{span: 12}" class="tr">
            <Form-item label="公积金类型：" prop="hfType">
                  <Select v-model="createTask.searchCondition.hfType" transfer>
                    <Option value="1" >基本公积金</Option>
                    <Option value="2" >补充公积金</Option>
                  </Select>
            </Form-item>
           </Col> -->
          <Col :sm="{span: 12}" class="tr">

            <Button type="primary" icon="ios-search" @click="handlePageNumNewTask(1)">查询</Button>
            <Button type="warning" @click="resetCreateTaskSearchCondition">重置</Button>
            <Button type="warning" @click="isCreateTaskTicket = false;">关闭</Button>
          </Col>
        </Row>
      </Form>
      <Table border class="mt10" :columns="createTask.createNewTaskColumns" :data="createTask.createNewTaskData"></Table>
      <Page
        class="pageSize"
        @on-change="handlePageNumNewTask"
        @on-page-size-change="handlePageSizeNewTask"
        :total="pageDataNewTask.total"
        :page-size="pageDataNewTask.pageSize"
        :page-size-opts="pageDataNewTask.pageSizeOpts"
        :current="pageDataNewTask.pageNum"
        show-sizer show-total></Page>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventType from '../../../../store/event_types'
  import api from '../../../../api/house_fund/employee_task/employee_transfer'
  import sessionData from '../../../../api/session-data'
  import commonApi from '../../../../api/house_fund/common/common'
  import dict from '../../../../api/dict_access/house_fund_dict'

  export default {
    data() {
      return {
        collapseInfo: [1], //展开栏
        pageData: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.DEFAULT_PAGE_SIZE_OPTS
        },
        searchCondition: {
          serviceCenterValue: [],
          employeeId: '',
          companyId: '',
          transferInUnit: '',
          transferOutUnit: '',
          employeeName: '',
          hfType: '',
          paymentBank:'',
          idNum: '',
          hfEmpAccount: '',
          hfAccountType: '',
          taskStatus: '1',
          status:'',
          archiveTaskStatus:'',
        },
        isCreateTaskTicket: false,
        pageDataNewTask: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.DEFAULT_PAGE_SIZE_OPTS
        },
        workStatusList: [
            {label: '全部', value: ''},
            {label: '在职', value: 2},
            {label: '离职', value: 3}
        ],
        EmpArchiveStatus:[],
        createTask: {
          searchCondition: {
            employeeId: '',
            employeeName: '',
            idNum: '',
            companyId: '',
            titile: '',
            status: '',
            hfType:'',
          },
          workStatusList: [
            {label: '全部', value: ''},
            {label: '在职', value: 2},
            {label: '离职', value: 3}
          ],
          createNewTaskData:[],
          createNewTaskColumns: [
            {title: '操作', fixed: 'left', width: 80, align: 'center',
              render:(h, params)=>{
                return h('div', {style: {textAlign: 'left'}}, [
                  h('Button',{props:{type:'success',size:'small'},style:{margin:'0 auto'},
                    on:{
                      click:()=>{
                        this.dealTransfer(params.row.employeeId,params.row.companyId,params.row.hfType);
                      }
                    }
                  },'选择'),
                ]);
              }

            },
            {title: '公积金类型', key: 'hfType', align: 'center', width: 120,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'left'}}, [
                  h('span', this.$decode.hfType(params.row.hfType)),
                ]);
              }
            },
            {title: '客户编号', key: 'companyNumber', align: 'center', width: 120,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'left'}}, [
                  h('span', params.row.companyId),
                ]);
              }
            },
            {title: '客户名称', key: 'title', align: 'center', width: 150,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'left'}}, [
                  h('span', params.row.title),
                ]);
              }
            },
            {title: '雇员编号', key: 'employeeId', align: 'center', width: 150,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'left'}}, [
                  h('span', params.row.employeeId),
                ]);
              }
            },
            {title: '雇员姓名', key: 'employeeName', align: 'center', width: 150,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'left'}}, [
                  h('span', params.row.employeeName),
                ]);
              }
            },
            {title: '证件号', key: 'idNum', align: 'center', width: 150,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'left'}}, [
                  h('span', params.row.idNum),
                ]);
              }
            },
            {title: '入离职状态', key: 'status', align: 'center', width: 100,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'left'}}, [
                  h('span', this.$decode.empComStatus(params.row.status) ),
                ]);
              }
            },
          ]
        },
        customerCenterData:[],
        fundTypeList: [
          {label: '全部',value:''},
          {value: '1', label: '基本公积金'},
          {value: '2', label: '补充公积金'}
        ],
        accountTypeList: [
          {label: '全部',value:''},
          {value: 3, label: '独立户'},
          {value: 1, label: '大库'},
          {value: 2, label: '外包'},
        ],
        empTaskTransferData:[],
        noProcessColumns: [
          // {title: '操作', width: 100, align: 'center',
          //   render: (h, params) => {
          //     return h('div', [
          //       h('Button', {props: {type: 'success', size: 'small'}, style: {margin: '0 auto'},
          //         on: {
          //           click: () => {
          //             sessionData.setJsonDataToSession('transfer.noprocess.searchCondition', this.searchCondition);
          //             sessionData.setJsonDataToSession('transfer.noprocess.pageData', this.pageData);
          //             let employeeId=params.row.employeeId;
          //             let companyId=params.row.companyId;
          //             let hfType=params.row.hfType;
          //             let empTaskId=params.row.empTaskId;
          //             this.$router.push({name: 'employeeFundTransferProgressTwo', query: {employeeId: employeeId,companyId:companyId,hfType:hfType,empTaskId:empTaskId}});
          //           }
          //         }
          //       }, '转移'),
          //     ]);
          //   }
          // },
          {title: '公积金类型', key: 'hfType', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', this.$decode.hfType(params.row.hfType)),
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
          {title: '客户名称', key: 'title', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.title),
              ]);
            }
          },
          {title: '雇员编号', key: 'employeeId', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employeeId),
              ]);
            }
          },
          {title: '雇员姓名', key: 'employeeName', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employeeName),
              ]);
            }
          },
          {title: '雇员证件号', key: 'idNum', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.idNum),
              ]);
            }
          },
          {title: '入离职状态', key: 'status', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', this.$decode.empComStatus(params.row.status)),
              ]);
            }
          },
          {title: '状态', key: 'taskStatus', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', this.$decode.hf_archiveStatus(params.row.archiveStatus)),
              ]);
            }
          },
          {title: '入职日期', key: 'inDate', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.inDate),
              ]);
            }
          },
          {title: '打印人', key: 'handleUserName', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.handleUserName),
              ]);
            }
          },
          {title: '发起人', key: 'createdDisplayName', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.createdDisplayName),
              ]);
            }
          },
          {title: '发起时间', key: 'submitTime', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.submitTime),
              ]);
            }
          },
          // {title: '校验结果', key: 'validateResult', width: 200, align: 'center',
          //   render: (h, params) => {
          //     return h('div', {style: {textAlign: 'left'}}, [
          //       h('span', params.row.validateResult),
          //     ]);
          //   }
          // }
        ]
      }
    },
    mounted() {
        dict.getDictData().then(data => {
        if (data.code == 200) {
          this.EmpArchiveStatus = data.data.EmpArchiveStatus;
          sessionData.getJsonDataFromSession('transfer.noprocess.searchCondition', this.searchCondition);
          sessionData.getJsonDataFromSession('transfer.noprocess.pageData', this.pageData);
        } else {
          this.$Message.error(data.message);
        }
      })

      let params = this.searchCondition
      this.queryTransfer(params);
      this.getCustomers();

    

    },
    computed: {
      ...mapState('tNoProcess',{
        data:state => state.data
      })
    },
    methods: {
      ...mapActions('tNoProcess',[EventType.TNOPROCESS]),
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      resetCreateTaskSearchCondition() {
        this.$refs['createTaskSearchForm'].resetFields()
      },
      routerToFundCommonOperator(name) {
        this.$router.push({name: name})
      },
      queryTransfer(params){
        let arrayServiceCenter=params.serviceCenterValue;
        if(arrayServiceCenter!=null){
          params=JSON.parse(JSON.stringify(params));
          delete params.serviceCenterValue;
          params.serviceCenterValue=arrayServiceCenter[arrayServiceCenter.length-1];
        }
        api.queryTransfer({
          pageSize: this.pageData.pageSize,
          pageNum: this.pageData.pageNum,
          params: params,
        }).then(data => {
          this.empTaskTransferData = data.data.rows;
          this.pageData.total = Number(data.data.total);
          })
      },
       handlePageNum(val) {
        this.pageData.pageNum = val;
        let params = this.searchCondition
        this.queryTransfer(params);
      },
      dbClickHandleData(row, index){
        sessionData.setJsonDataToSession('transfer.noprocess.searchCondition', this.searchCondition);
        sessionData.setJsonDataToSession('transfer.noprocess.pageData', this.pageData);
        let employeeId=row.employeeId;
        let companyId=row.companyId;
        let hfType=row.hfType;
        let empTaskId=row.empTaskId;
        let empArchiveId=row.empArchiveId;
        this.$router.push({name: 'employeeFundTransferProgressTwo', query: {employeeId: employeeId,companyId:companyId,hfType:hfType,empTaskId:empTaskId,empArchiveId:empArchiveId}});
      },
      getCustomers(){
        let params = null;
        api.getCustomers({params:params}).then(data=>{
          this.customerCenterData = data.data;
        })
      },

      handlePageSize(val) {
        this.pageData.pageSize = val;
        let params = this.searchCondition
        this.queryTransfer(params);
      },

      queryTransferForNewTask(params){
        api.queryTransferForNewTask({
          pageSize: this.pageDataNewTask.pageSize,
          pageNum: this.pageDataNewTask.pageNum,
          params: params,
        }).then(data => {
          this.createTask.createNewTaskData = data.data.rows;
          this.pageDataNewTask.total = Number(data.data.total);
        })
      },
      handlePageNumNewTask(val) {
        this.pageDataNewTask.pageNum = val;
        let params = this.createTask.searchCondition
        this.queryTransferForNewTask(params);
      },
      handlePageSizeNewTask(val) {
        this.pageDataNewTask.pageSize = val;
        let params = this.createTask.searchCondition
        this.queryTransferForNewTask(params);
      },
      dealTransfer(employeeId,companyId,hfType){
        this.$router.push({name:'employeeFundTransferProgressTwo', query: {employeeId: employeeId,companyId:companyId,hfType:hfType}});
      },
      ok () {

      },
      cancel () {

      },
      multiEmpTaskTransferExport() {
        if (!this.searchCondition.transferOutUnit || !this.searchCondition.transferInUnit) {
          this.$Message.error("导出雇员转移清册，必须在查询条件输入明确的【转出单位】及【转入单位】");
          return false;
        }
        commonApi.checkTransferUnitIsOnly({
          params: {
            transferOutUnit: this.searchCondition.transferOutUnit.trim(),
            transferInUnit: this.searchCondition.transferInUnit.trim()
          }
        }).then(data => {
          if (data.code === 200) {
            let rtn = Number(data.data);
            if (rtn > 0) {
              let rtnMessage = "";
              if (rtn === 1) {
                rtnMessage = "未匹配到任何转出单位";
              } else if (rtn === 2) {
                rtnMessage = "未匹配到任何转入单位";
              } else if (rtn === 3) {
                rtnMessage = "未匹配到任何转出单位和转入单位";
              } else if (rtn === 4) {
                rtnMessage = "匹配出了多家转出单位";
              } else if (rtn === 6) {
                rtnMessage = "匹配出了多家转出单位，且未匹配到任何转入单位";
              } else if (rtn === 8) {
                rtnMessage = "匹配出了多家转入单位";
              } else if (rtn === 9) {
                rtnMessage = "未匹配到任何转出单位，且匹配出了多家转入单位";
              } else if (rtn === 12) {
                rtnMessage = "匹配出了多家转出转入单位";
              } else if (rtn === 16) {
                rtnMessage = "转出单位不能是市公积金封存办(中心)";
              } else if (rtn === 18) {
                rtnMessage = "转出单位不能是市公积金封存办(中心)，且未匹配到任何转入单位";
              } else if (rtn === 24) {
                rtnMessage = "转出单位不能是市公积金封存办(中心)，且匹配出了多家转入单位";
              } else if (rtn === 32) {
                rtnMessage = "转入单位不能是市公积金封存办(中心)";
              } else if (rtn === 33) {
                rtnMessage = "未匹配到任何转出单位，且转入单位不能是市公积金封存办(中心)";
              } else if (rtn === 36) {
                rtnMessage = "匹配出了多家转出单位，且转入单位不能是市公积金封存办(中心)";
              } else if (rtn === 48) {
                rtnMessage = "转出转入单位不能是市公积金封存办(中心)";
              } else if (rtn === 5) {
                rtnMessage = "转出单位和转入单位不能是同一家单位";
              }
              this.$Message.error(rtnMessage);

              return false;
            } else {
              let params = this.searchCondition
              api.multiEmpTaskTransferExport({
                params: params,
              })
            }
          }
        })
      },
      empToCenterTransferExport() {
        if (!this.searchCondition.transferOutUnit) {
          this.$Message.error("导出入管清册，必须在查询条件输入【转出单位】");
          return false;
        }
        if (!this.searchCondition.hfType || this.searchCondition.hfType === '') {
          this.$Message.error("导出入管清册，必须在查询条件选择某一公积金类型");
          return false;
        }
        commonApi.getComFundAccountClassNameList({
          params: {
            comAccountName: this.searchCondition.transferOutUnit.trim(),
            hfComAccount: ''
          }
        }).then(data => {
          if (data.code === 200) {
            let total = Number(data.total);
            if (total === 0) {
              this.$Message.error("未匹配到任何转出单位");
              return false;
            } else if (total === 1) {
              if (data.data) {
                if (data.data.hfComAccount === '881383287'|| data.data.hfComAccount === '881383288') {
                  this.$Message.error("转出单位不能是市公积金封存办(中心)");
                  return false
                }
              }
              let params = this.searchCondition
              api.checkEmpTransferEndMonthSame({
                params: params,
              }).then(data => {
                if (data.code === 200) {
                  let rtn = Number(data.data);
                  if (rtn > 0) {
                    let rtnMessage = "";
                    if (rtn === 1) {
                      rtnMessage = "未匹配到任何转移任务单";
                    } else if (rtn === 2) {
                      rtnMessage = "匹配到的转移任务单中的封存年月不相同";
                    }
                    this.$Message.error(rtnMessage);
                    return false;
                  } else {
                    api.empToCenterTransferExport({
                      params: params,
                    })
                  }
                }
              })
            } else if (total > 1) {
              this.$Message.error("匹配出了多家转出单位，请进一步明确转出单位名称");
              return false;
            }
          }
        })

//        if (!this.searchCondition.transferInUnit) {
//          this.$Message.error("导出清册，必须在查询条件输入【转出单位】及【转入单位】");
//          return false;
//        }
//        let params = this.searchCondition
//        api.multiEmpTaskTransferExport({
//          params: params,
//        })
      },
      empTaskTransferTxtExport() {
        let params = this.searchCondition
        api.empTaskTransferTxtExport({
          params: params,
        })
      },
      fileExport(name) {
        switch(parseInt(name)) {
          case 0:
//            this.multiEmpTaskTransferExport();
            this.empToCenterTransferExport();
            break;
          case 1:
            this.multiEmpTaskTransferExport();
            break;
          case 2:
            this.empTaskTransferTxtExport();
            break;
          default:
            break;
        }
      }
    }
  }
</script>
