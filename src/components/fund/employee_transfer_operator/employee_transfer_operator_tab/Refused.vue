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
                <Form-item label="证件号：" prop="IdNumber">
                  <Input v-model="operatorSearchData.IdNumber" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员公积金账号：" prop="companyFundAccount">
                  <Input v-model="operatorSearchData.employeeFundAccount" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="账户类型：" prop="accountTypeValue">
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
        <!-- <Button type="info">导出</Button> -->
      </Col>
    </Row>

    <Row class="mt20">
      <Col :sm="{span:24}">
        <Table border :columns="refusedColumns" :data="data.tRefusedData"></Table>
        <Page :total="4" :page-size="5" :page-size-opts="[5, 10]" show-sizer show-total  class="pageSize"></Page>
      </Col>
    </Row>
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
        processedColumns: [
          {title: '公积金类型', key: 'fundType', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.fundType),
              ]);
            }
          },
          {title: '客户编号', key: 'companyNumber', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companyNumber),
              ]);
            }
          },
          {title: '公司名称', key: 'companyName', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companyName),
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
          {title: '入职日期', key: 'entryDate', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.entryDate),
              ]);
            }
          },
          {title: '操作日期', key: 'operateDate', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.operateDate),
              ]);
            }
          },
          {title: '回单日期', key: 'feedbackDate', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.feedbackDate),
              ]);
            }
          },
          {title: '打印日期', key: 'printDate', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.printDate),
              ]);
            }
          },
          {title: '转出单位', key: 'transferOutCompany', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.printDate),
              ]);
            }
          },
          {title: '转入单位', key: 'transferInCompany', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.transferInCompany),
              ]);
            }
          },
          {title: '转移日期', key: 'transferDate', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.transferDate),
              ]);
            }
          },
          {title: '任务发起人', key: 'initiator', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.initiator),
              ]);
            }
          },
          {title: '任务发起时间', key: 'sponsorTime', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.sponsorTime),
              ]);
            }
          },
          {title: '备注', key: 'notes', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.notes),
              ]);
            }
          }
        ]
      }
    },
    mounted() {
      this[EventType.TREFUSED]()
    },
    computed: {
      ...mapState('tRefused',{
        data:state => state.data
      })
    },
    methods: {
      ...mapActions('tRefused',[EventType.TREFUSED]),
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      routerToFundCommonOperator(name) {
        this.$router.push({name: name})
      },
      nextStep() {
        this.$router.push({name: 'employeeFundTransferProgressTwo'});
      }
    }
  }
</script>
