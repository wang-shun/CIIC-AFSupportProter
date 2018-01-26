<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        雇员特殊操作
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
                <Form-item label="任务单编号：" prop="taskTicketNumber">
                  <Input v-model="operatorSearchData.taskTicketNumber" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户名称：" prop="customerName">
                  <Input v-model="operatorSearchData.customerName" placeholder="请输入..."></Input>
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
                <Form-item label="账户类型：" prop="accountTypeValue">
                  <Select v-model="operatorSearchData.accountTypeValue" style="width: 100%;" transfer>
                    <Option v-for="item in accountTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业公积金账号：" prop="companyFundAccount">
                  <Input v-model="operatorSearchData.companyFundAccount" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="是否加急：" prop="isEmergencyValue">
                  <Select v-model="operatorSearchData.isEmergencyValue" style="width: 100%;" transfer>
                    <Option v-for="item in emergencyList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
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
        <Button type="info">导出</Button>
      </Col>
    </Row>

    <Row class="mt20">
      <Col :sm="{span:24}">
        <Table border :columns="finishedColumns" :data="data.sFinishedData"></Table>
        <Page :total="4" :page-size="5" :page-size-opts="[5, 10]" show-sizer show-total  class="pageSize"></Page>
      </Col>
    </Row>

    <!-- 批退理由 -->
    <Modal
      v-model="isShowRefuseBatch"
      @on-ok="ok"
      @on-cancel="cancel">
      <Form>
        <p>
          <Form-item>
            <Input v-model="refuseReason" type="textarea" :rows=4 placeholder="请填写批退备注..."></Input>
          </Form-item>
        </p>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="isShowRefuseBatch = false">确认批退</Button>
        <Button type="warning" @click="isShowRefuseBatch = false">取消</Button>
      </div>
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
          taskTicketNumber: '',
          customerName: '',
          employeeName: '',
          fundTypeValue: 0,
          payBankValue: 0,
          IdNumber: '',
          accountTypeValue: 0,
          companyFundAccount: '',
          isEmergencyValue: false,
          taskStartTime: ''
        },
        isCreateTaskTicket: false,
        createTaskTicket: {
          employeeNumber: '',
          employeeName: '',
          IdNumber: '',
          changeTypeValue: '',
          changeTypeList: [
            {label: '变更类型1', label: 0},
            {label: '变更类型2', label: 1}
          ],
          createColumns: [
            {title: '操作', fixed: 'left', width: 100, align: 'center',
              render: (h, params) => {
                return h('div', [
                  h('a', {
                    on: {
                      click: () => {

                      }
                    }
                  }, '选择'),
                ]);
              }
            },
            {title: '公司名称', key: 'companyName', align: 'center',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'left'}}, [
                  h('span', params.row.companyName),
                ]);
              }
            },
            {title: '客户编号', key: 'companyNumber', align: 'center',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'left'}}, [
                  h('span', params.row.companyNumber),
                ]);
              }
            },
            {title: '雇员编号', key: 'employeeNumber', align: 'center',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'left'}}, [
                  h('span', params.row.employeeNumber),
                ]);
              }
            },
            {title: '雇员姓名', key: 'employeeName', align: 'center',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'left'}}, [
                  h('span', params.row.employeeName),
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
        taskTypeList: [
          {value: 0, label: '新增(新开)'},
          {value: 1, label: '新增(转入)'},
          {value: 2, label: '新增(启封)'},
          {value: 3, label: '调整'},
          {value: 4, label: '补缴'},
          {value: 5, label: '离职'}
        ],
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
        emergencyList: [
          {value: -1, label: ''},
          {value: 1, label: '加急'}
        ],
        isShowRefuseBatch: false,
        refuseReason: '',
        finishedColumns: [
          {title: '操作', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {props: {type: 'success', size: 'small'}, style: {margin: '0 auto'},
                  on: {
                    click: () => {
                      this.$router.push({name: 'employeeFundSpecialProgressTwo'});
                    }
                  }
                }, '办理'),
              ]);
            }
          },
          {title: '任务类型', key: 'type', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.type),
              ]);
            }
          },
          {title: '加急', key: 'emergency', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.emergency),
              ]);
            }
          },
          {title: '雇员', key: 'employee', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employee),
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
          {title: '雇员证件号', key: 'employeeCardNumber', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employeeCardNumber),
              ]);
            }
          },
          {title: '企业客户', key: 'companyCustomer', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companyCustomer),
              ]);
            }
          },
          {title: '客户编号', key: 'customerId', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.customerId),
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
      this[EventType.SFINISHED]()
    },
    computed: {
      ...mapState('sFinished',{
        data:state => state.data
      })
    },
    methods: {
      ...mapActions('sFinished',[EventType.SFINISHED]),
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
