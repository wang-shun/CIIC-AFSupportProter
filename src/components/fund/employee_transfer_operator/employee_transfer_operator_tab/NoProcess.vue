<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        雇员转移操作
        <div slot="content">
          <Form :label-width=150 ref="operatorSearchData" :model="operatorSearchData">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="服务中心：" prop="serviceCenterValue">
                  <Cascader :data="serviceCenterData" v-model="operatorSearchData.serviceCenterValue" trigger="hover" transfer></Cascader>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员编号：" prop="employeeNumber">
                  <Input v-model="operatorSearchData.employeeNumber" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="转入单位：" prop="customerName">
                  <Input v-model="operatorSearchData.transferInCompany" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="转出单位：" prop="taskStartTime">
                  <Input v-model="operatorSearchData.transferOutCompany" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员姓名：" prop="employeeName">
                  <Input v-model="operatorSearchData.employeeName" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公积金类型：" prop="fundTypeValue">
                  <Select v-model="operatorSearchData.fundTypeValue" style="width: 100%;" transfer>
                    <Option v-for="item in fundTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="缴费银行：" prop="payBankValue">
                  <Select v-model="operatorSearchData.payBankValue" style="width: 100%;" transfer>
                    <Option v-for="item in payBankList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="身份证号：" prop="IdNumber">
                  <Input v-model="operatorSearchData.IdNumber" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员公积金账号：" prop="companyFundAccount">
                  <Input v-model="operatorSearchData.employeeFundAccount" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="社保账户类型：" prop="accountTypeValue">
                  <Select v-model="operatorSearchData.accountTypeValue" style="width: 100%;" transfer>
                    <Option v-for="item in accountTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}" class="tr">
                <Button type="primary" icon="ios-search">查询</Button>
                <Button type="warning" @click="resetSearchCondition('operatorSearchData')">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="primary" @click="isCreateTaskTicket = true">新建转移任务单</Button>
        <Button type="info" @click="">批量打印转中心通知书</Button>
        <Dropdown>
          <Button type="primary">
            转移操作
            <Icon type="arrow-down-b"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem>导出雇员转移清册</DropdownItem>
            <DropdownItem>导出雇员转移TXT</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Button type="primary" @click="">扫描校验</Button>
      </Col>
    </Row>

    <Row class="mt20">
      <Col :sm="{span:24}">
        <Table border :columns="noProcessColumns" :data="data.tNoProcessData"></Table>
        <Page :total="4" :page-size="5" :page-size-opts="[5, 10]" show-sizer show-total  class="pageSize"></Page>
      </Col>
    </Row>

    <!-- 新建任务单 -->
    <Modal
      v-model="isCreateTaskTicket"
      width="720"
    >
      <Form :label-width="100">
        <Row>
          <Col :sm="{span: 12}">
            <Form-item label="雇员编号：">
              <Input v-model="createTaskTicket.employeeNumber" placeholder="请输入..."></Input>
            </Form-item>
          </Col>
          <Col :sm="{span: 12}">
            <Form-item label="雇员姓名：">
              <Input v-model="createTaskTicket.employeeName" placeholder="请输入..."></Input>
            </Form-item>
          </Col>
          <Col :sm="{span: 12}">
            <Form-item label="身份证号：">
              <Input v-model="createTaskTicket.employeeName" placeholder="请输入..."></Input>
            </Form-item>
          </Col>
          <Col :sm="{span: 12}">
            <Form-item label="客户编号：">
              <Input v-model="createTaskTicket.customerNumber" placeholder="请输入..."></Input>
            </Form-item>
          </Col>
          <Col :sm="{span: 12}">
            <Form-item label="客户名称：">
              <Input v-model="createTaskTicket.customerName" placeholder="请输入..."></Input>
            </Form-item>
          </Col>
          <Col :sm="{span: 12}">
            <Form-item label="上下岗状态：">
              <Select v-model="createTaskTicket.workStatueValue" style="width: 100%;" transfer>
                <Option v-for="item in createTaskTicket.workStatueList" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </Form-item>
          </Col>
        </Row>
        <Row>
          <Col :sm="{span: 24}" class="tr">
            <Button type="primary" icon="ios-search">查询</Button>
            <Button type="warning" @click="isCreateTaskTicket = false;">关闭</Button>
          </Col>
        </Row>
      </Form>
      <Table border class="mt10" :columns="createTaskTicket.createColumns" :data="data.createData"></Table>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventType from '../../../../store/event_types'

  export default {
    data() {
      return {
        collapseInfo: [1], //展开栏
        operatorSearchData: {
          serviceCenterValue: '',
          employeeNumber: '',
          transferInCompany: '',
          transferOutCompany: '',
          employeeName: '',
          fundTypeValue: 0,
          payBankValue: 0,
          IdNumber: '',
          employeeFundAccount: '',
          accountTypeValue: 0
        },
        isCreateTaskTicket: false,
        createTaskTicket: {
          employeeNumber: '',
          employeeName: '',
          IdNumber: '',
          customerNumber: '',
          customerName: '',
          workStatueValue: '',
          workStatueList: [
            {label: '在职', value: 0},
            {label: '离职', value: 1}
          ],
          createColumns: [
            {title: '操作', fixed: 'left', width: 60, align: 'center', type: 'selection'},
            {title: '公司编码', key: 'companyNumber', align: 'center', width: 150,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'left'}}, [
                  h('span', params.row.companyNumber),
                ]);
              }
            },
            {title: '公司名称', key: 'companyName', align: 'center', width: 150,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'left'}}, [
                  h('span', params.row.companyName),
                ]);
              }
            },
            {title: '雇员编号', key: 'employeeNumber', align: 'center', width: 150,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'left'}}, [
                  h('span', params.row.employeeNumber),
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
            {title: '证件号', key: 'IdNumber', align: 'center', width: 150,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'left'}}, [
                  h('span', params.row.IdNumber),
                ]);
              }
            },
            {title: '上下岗状态', key: 'workStatus', align: 'center', width: 100,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'left'}}, [
                  h('span', params.row.workStatus),
                ]);
              }
            },
            {title: '公积金状态', key: 'fundStatus', align: 'center', width: 100,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'left'}}, [
                  h('span', params.row.fundStatus),
                ]);
              }
            },
            {title: '客服中心', key: 'serviceCenter', align: 'center', width: 150,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'left'}}, [
                  h('span', params.row.serviceCenter),
                ]);
              }
            },
            {title: '客服经理', key: 'serviceManager', align: 'center', width: 150,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'left'}}, [
                  h('span', params.row.serviceManager),
                ]);
              }
            },
            {title: '社保账户类型', key: 'accountType', align: 'center', width: 150,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'left'}}, [
                  h('span', params.row.accountType),
                ]);
              }
            },
            {title: '转移失败原因', key: 'transferFailedReason', align: 'center', width: 150,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'left'}}, [
                  h('span', params.row.transferFailedReason),
                ]);
              }
            },
            {title: '操作提示日期', key: 'operateTipDate', align: 'center', width: 150,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'left'}}, [
                  h('span', params.row.operateTipDate),
                ]);
              }
            }
          ]
        },

        serviceCenterData: [
          {value: 1, label: '大客户', children: [{value: '1-1', label: '大客户1'}, {value: '1-2', label: '大客户2'}]},
          {value: 2, label: '日本客户'},
          {value: 3, label: '虹桥'},
          {value: 4, label: '浦东'}
        ], //客服中心
        payBankList: [
          {value: 0, label: '徐汇'},
          {value: 1, label: '长宁'},
          {value: 2, label: '浦东'},
          {value: 3, label: '卢湾'},
          {value: 4, label: '静安'},
          {value: 5, label: '黄浦'},
        ],
        fundTypeList: [
          {value: 0, label: '基本公积金'},
          {value: 1, label: '补充公积金'}
        ],
        accountTypeList: [
          {value: 0, label: '独立户'},
          {value: 1, label: '大库'},
          {value: 2, label: '外包'},
        ],
        noProcessColumns: [
          {title: '操作', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {props: {type: 'success', size: 'small'}, style: {margin: '0 auto'},
                  on: {
                    click: () => {
                      this.$router.push({name: 'employeeFundTransferProgressTwo'});
                    }
                  }
                }, '转移'),
              ]);
            }
          },
          {title: '公积金类型', key: 'fundType', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.fundType),
              ]);
            }
          },
          {title: '客户编号', key: 'customerNumber', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.customerNumber),
              ]);
            }
          },
          {title: '客户名称', key: 'customerName', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.customerName),
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
          {title: '雇员姓名', key: 'employeeName', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employeeName),
              ]);
            }
          },
          {title: '雇员证件号', key: 'employeeCardNumber', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employeeCardNumber),
              ]);
            }
          },
          {title: '上下岗状态', key: 'workStatus', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.workStatus),
              ]);
            }
          },
          {title: '状态', key: 'status', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.status),
              ]);
            }
          },
          {title: '入职日期', key: 'entryDate', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.entryDate),
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
          },
          {title: '校验结果', key: 'validateResult', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.validateResult),
              ]);
            }
          }
        ]
      }
    },
    mounted() {
      this[EventType.TNOPROCESS]()
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
      routerToFundCommonOperator(name) {
        this.$router.push({name: name})
      },
      ok () {

      },
      cancel () {

      }
    }
  }
</script>
