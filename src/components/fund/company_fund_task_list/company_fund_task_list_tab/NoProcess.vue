<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        企业任务单
        <div slot="content">
          <Form :label-width=150 ref="operatorSearchData" :model="operatorSearchData">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客服中心：" prop="serviceCenterValue">
                  <Cascader :data="serviceCenterData" v-model="operatorSearchData.serviceCenterValue" trigger="hover" transfer></Cascader>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户名称：" prop="title">
                  <input-company v-model="operatorSearchData.customerName"></input-company>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="社保账户类型：" prop="accountTypeValue">
                  <Select v-model="operatorSearchData.accountTypeValue" style="width: 100%;" transfer>
                    <Option v-for="item in accountTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
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
                <Form-item label="企业公积金账户：" prop="companyFundAccount">
                  <input-company v-model="operatorSearchData.companyFundAccount"></input-company>
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
        <Button type="primary" @click="isCreateTaskTicket = true">新建任务单</Button>
        <Button type="info" @click="">导出</Button>
      </Col>
    </Row>

    <Row class="mt20">
      <Col :sm="{span:24}">
        <Table border :columns="noProcessColumns" :data="data.lNoProcessData"></Table>
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
            <Form-item label="任务单类型：">
              <Select v-model="createTaskTicket.ticketTypeValue" style="width: 100%;" transfer>
                <Option v-for="item in createTaskTicket.ticketTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm="{span: 12}">
            <Form-item label="任务类型：">
              <Select v-model="createTaskTicket.taskValue" style="width: 100%;" transfer>
                <Option v-for="item in createTaskTicket.taskList" :value="item.value" :key="item.value">{{item.label}}</Option>
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

  import InputAccount from '../../../common_control/form/input_account'
  import InputCompany from '../../../common_control/form/input_company'

  export default {
    components: {InputAccount, InputCompany},
    data() {
      return {
        collapseInfo: [1], //展开栏
        operatorSearchData: {
          serviceCenterValue: '',
          customerName: '',
          accountTypeValue: '',
          payBankValue: '',
          companyFundAccount: '',
          fundTypeValue: '',
          serviceManager: '',
          taskStartTime: ''
        },
        isCreateTaskTicket: false,
        createTaskTicket: {
          customerNumber: '',
          customerName: '',
          ticketTypeValue: '',
          ticketTypeList: [
            {label: '企业基本公积金开户', value: 0},
            {label: '企业补充公积金开户', value: 1},
            {label: '企业账户变更', value: 2},
            {label: '企业账户转移', value: 3},
            {label: '企业账户终止', value: 4},
            {label: '企业账户销户', value: 5}
          ],
          taskValue: '',
          taskList: [
            {label: '开户', value: 0},
            {label: '转入', value: 1},
            {label: '变更', value: 2},
            {label: '终止', value: 3},
          ],
          createColumns: [
            {title: '操作', align: 'center',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'left'}}, [
                  h('a', '选择'),
                ]);
              }
            },
            {title: '客户编码', key: 'customerNumber', align: 'center',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'left'}}, [
                  h('span', params.row.customerNumber),
                ]);
              }
            },
            {title: '客户名称', key: 'customerName', align: 'center',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'left'}}, [
                  h('span', params.row.customerName),
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
                      this.$router.push({name: 'companyFundTaskProgressTwo'});
                    }
                  }
                }, '办理'),
              ]);
            }
          },
          {title: '任务类型', key: 'taskType', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.taskType),
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
          {title: '经办人', key: 'managers', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.managers),
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
          {title: '付款方式', key: 'payMethod', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.payMethod),
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
      this[EventType.LNOPROCESS]()
    },
    computed: {
      ...mapState('lNoProcess',{
        data:state => state.data
      })
    },
    methods: {
      ...mapActions('lNoProcess',[EventType.LNOPROCESS]),
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      ok () {

      },
      cancel () {

      }
    }
  }
</script>
