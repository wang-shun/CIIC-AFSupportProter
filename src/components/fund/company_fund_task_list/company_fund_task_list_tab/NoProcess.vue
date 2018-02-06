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
                <Form-item label="客户名称：" prop="title">
                  <input-company v-model="operatorSearchData.customerName"></input-company>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业账户类型：" prop="accountTypeValue">
                  <Select v-model="operatorSearchData.accountTypeValue" style="width: 100%;" transfer>
                    <Option v-for="item in accountTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                  <!--<Select v-model="operatorSearchData.accountTypeValue" style="width: 100%;" transfer>-->
                    <!--<Option v-for="(value,key) in this.baseDic.companyHFAccountType" :value="key" :key="key">{{ value }}</Option>-->
                  <!--</Select>-->
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
                  <input-account v-model="operatorSearchData.companyFundAccount"></input-account>
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
        <!-- <Button type="primary" @click="isCreateTaskTicket = true">新建任务单</Button> -->
        <Button type="info" @click="">导出</Button>
      </Col>
    </Row>

    <Row class="mt20">
      <Col :sm="{span:24}">
        <Table border :columns="noProcessColumns" :data="lNoProcessData"></Table>
        <Page :total="4" :page-size="5" :page-size-opts="[5, 10]" show-sizer show-total  class="pageSize"></Page>
      </Col>
    </Row>
  </div>
</template>
<script>
  import InputAccount from '../../../common_control/form/input_account'
  import InputCompany from '../../../common_control/form/input_company'

  import axios from 'axios'
  const host = process.env.SITE_HOST

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
        serviceCenterData: [
          {value: 1, label: '大客户', children: [{value: '1-1', label: '大客户1'}, {value: '1-2', label: '大客户2'}]},
          {value: 2, label: '日本客户'},
          {value: 3, label: '虹桥'},
          {value: 4, label: '浦东'}
        ], //客服中心
        payBankList: [
          {value: '', label: '全部'},
          {value: 0, label: '徐汇'},
          {value: 1, label: '长宁'},
          {value: 2, label: '浦东'},
          {value: 3, label: '卢湾'},
          {value: 4, label: '静安'},
          {value: 5, label: '黄浦'},
        ],
        fundTypeList: [
          {value: '', label: '全部'},
          {value: 0, label: '基本公积金'},
          {value: 1, label: '补充公积金'}
        ],
        accountTypeList: [
          {value: '', label: '全部'},
          {value: 1, label: '中智大库'},
          {value: 2, label: '中智外包'},
          {value: 3, label: '独立户'},
        ],
        lNoProcessData: [
          {taskType: "开户", fundType: "基本公积金", customerNumber: "26318", customerName: "欧莱雅", managers: "王莺", customerPayStartDate: "", payMethod: "", UKey: "", serviceManager: "", initiator: "金翔云", sponsorTime: "2017/06/01 10:05:29"},
          {taskType: "转入", fundType: "补充公积金", customerNumber: "26318", customerName: "欧莱雅", managers: "王莺", customerPayStartDate: "", payMethod: "", UKey: "", serviceManager: "", initiator: "金翔云", sponsorTime: "2017/06/01 10:05:29"},
          {taskType: "转入", fundType: "基本公积金", customerNumber: "26318", customerName: "欧莱雅", managers: "王莺", customerPayStartDate: "", payMethod: "", UKey: "", serviceManager: "", initiator: "金翔云", sponsorTime: "2017/06/01 10:05:29"},
          {taskType: "转入", fundType: "补充公积金", customerNumber: "26318", customerName: "欧莱雅", managers: "王莺", customerPayStartDate: "", payMethod: "", UKey: "", serviceManager: "", initiator: "金翔云", sponsorTime: "2017/06/01 10:05:29"},
          {taskType: "变更", fundType: "基本公积金", customerNumber: "26318", customerName: "欧莱雅", managers: "王莺", customerPayStartDate: "", payMethod: "", UKey: "", serviceManager: "", initiator: "金翔云", sponsorTime: "2017/06/01 10:05:29"},
          {taskType: "变更", fundType: "补充公积金", customerNumber: "26318", customerName: "欧莱雅", managers: "王莺", customerPayStartDate: "", payMethod: "", UKey: "", serviceManager: "", initiator: "金翔云", sponsorTime: "2017/06/01 10:05:29"},
          {taskType: "终止", fundType: "基本公积金", customerNumber: "26318", customerName: "欧莱雅", managers: "王莺", customerPayStartDate: "", payMethod: "", UKey: "", serviceManager: "", initiator: "金翔云", sponsorTime: "2017/06/01 10:05:29"},
          {taskType: "销户", fundType: "补充公积金", customerNumber: "26318", customerName: "欧莱雅", managers: "王莺", customerPayStartDate: "", payMethod: "", UKey: "", serviceManager: "", initiator: "金翔云", sponsorTime: "2017/06/01 10:05:29"}
        ],
        noProcessColumns: [
          {title: '操作', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {props: {type: 'success', size: 'small'}, style: {margin: '0 auto'},
                  on: {
                    click: () => {
                      this.$router.push({name: 'companyFundTaskProgressThree'});
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
    },
    computed: {
    },
    methods: {
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
