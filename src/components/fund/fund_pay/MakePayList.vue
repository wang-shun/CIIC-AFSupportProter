<template>
  <div>
    <Form :label-width=150 ref="operatorSearchData" :model="operatorSearchData">
      <Collapse v-model="collapseInfo">
        <Panel name="1">
          公积金汇缴支付
          <div slot="content">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="结算银行：" prop="settleBankValue">
                  <Select v-model="operatorSearchData.settleBankValue" style="width: 100%;" transfer>
                    <Option v-for="item in settleBankList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业公积金账户：" prop="outAccountBatch">
                  <Select v-model="operatorSearchData.companyFundAccountValue" style="width: 100%;" transfer>
                    <Option v-for="item in companyFundAccountList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="服务中心：" prop="serviceCenterValue">
                  <Cascader :data="serviceCenterData" v-model="operatorSearchData.serviceCenterValue" trigger="hover" transfer></Cascader>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="支付状态：" prop="payStatusValue">
                  <Select v-model="operatorSearchData.payStatusValue" style="width: 100%;" transfer>
                    <Option v-for="item in payStatusList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户编号：" prop="customerNumber">
                  <Input v-model="operatorSearchData.customerNumber" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户名称：" prop="customerName">
                  <Input v-model="operatorSearchData.customerName" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="汇缴年月：" prop="payDate">
                  <DatePicker v-model="operatorSearchData.payDate" type="month" placement="bottom" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}" class="tr">
                <Button type="primary" icon="ios-search">查询</Button>
                <Button type="warning" @click="resetSearchCondition('operatorSearchData')">重置</Button>
              </Col>
            </Row>
          </div>
        </Panel>
      </Collapse>
      <Table border class="mt20" :columns="makePayListColumns" :data="data.makePayListData"></Table>
      <Row class="mt20">
        <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="汇缴年月：">
            {{data.makePayListInfo.payDate}}
          </Form-item>
        </Col>
        <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="总行数：">
            {{data.makePayListInfo.rows}}
          </Form-item>
        </Col>
        <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="公积金账号总数：">
            {{data.makePayListInfo.fundAccounts}}
          </Form-item>
        </Col>
        <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="汇总总额：">
            {{data.makePayListInfo.payAmount}}
          </Form-item>
        </Col>
        <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="补缴金额：">
            {{data.makePayListInfo.repair}}
          </Form-item>
        </Col>
        <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="总金额：">
            {{data.makePayListInfo.amount}}
          </Form-item>
        </Col>
      </Row>
      <Row class="mt20">
        <Col :sm="{span: 24}" class="tr">
          <Button type="info" @click="goBack">生成汇缴支付批次</Button>
          <Button type="warning" @click="goBack">返回</Button>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventType from '../../../store/event_types'

  export default {
    data() {
      return {
        collapseInfo: [1],
        operatorSearchData: {
          settleBankValue: 0,
          companyFundAccountValue: 0,
          serviceCenterValue: "",
          payStatusValue: 1,
          customerNumber: "",
          customerName: "",
          payDate: ""
        },
        settleBankList: [
           {label: "全部", value: ''},
          {label: "徐汇支行", value: 0},
          {label: "浦东支行", value: 1},
        ],
        companyFundAccountList: [
          {label: "全部", value: ''},
          {label: "中智大库", value: 0},
          {label: "中智外包", value: 1},
          {label: "独立户", value: 2}
        ],
        serviceCenterData: [
          {value: 1, label: '大客户', children: [{value: '1-1', label: '大客户1'}, {value: '1-2', label: '大客户2'}]},
          {value: 2, label: '日本客户'},
          {value: 3, label: '虹桥'},
          {value: 4, label: '浦东'}
        ],
        payStatusList: [
          {label: "全部", value: ''},
          {label: "可付", value: 1},
          {label: "未到账", value: 2},
          {label: "无需支付", value: 3},
          {label: "申请中(内部审批)", value: 4},
          {label: "内部审批批退", value: 5},
          {label: "已付(支付成功)", value: 6},
        ],
        makePayListColumns: [
          {type: 'selection', width: 60},
          {title: '公积金账户名称', key: 'fundAccountName', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.fundAccountName),
              ]);
            }
          },
          {title: '公积金类型', key: 'fundType', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.fundType),
              ]);
            }
          },
          {title: '支付状态', key: 'payStatus', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.payStatus),
              ]);
            }
          },
          {title: '企业账户类型', key: 'fundAccountType', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.fundAccountType),
              ]);
            }
          },
          {title: '结算银行', key: 'settleBank', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.settleBank),
              ]);
            }
          }
        ]
      }
    },
    mounted() {
      this[EventType.MAKEPAYLIST]()
    },
    computed: {
      ...mapState('makePayList',{
        data:state => state.data
      })
    },
    methods: {
      ...mapActions('makePayList', [EventType.MAKEPAYLIST]),
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>
