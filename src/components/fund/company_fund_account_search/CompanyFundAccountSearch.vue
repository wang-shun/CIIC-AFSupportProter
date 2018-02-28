<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        企业公积金账户查询
        <div slot="content">
          <Form :label-width=150 ref="operatorSearchData" :model="operatorSearchData">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户编号：" prop="customerNumber">
                  <Input v-model="operatorSearchData.customerNumber" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户名称：" prop="customerName">
                  <input-company v-model="operatorSearchData.customerName"></input-company>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户汇缴月份：" prop="taskStartTime">
                  <DatePicker v-model="operatorSearchData.customerPayDate" type="month" placement="bottom" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
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
                <Form-item label="公积金账号：" prop="fundAccountValue">
                  <!-- <Input v-model="operatorSearchData.fundAccountValue" placeholder="请输入..."></Input> -->
                  <InputAccount v-model="operatorSearchData.fundAccountValue"></InputAccount>
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
        <!-- <Button type="primary" @click="nextStep">编辑</Button> -->
        <!-- <Button type="primary" @click="isShowBindAndUnbind = true;">公司绑定\解绑</Button> -->
      </Col>
    </Row>

    <Row class="mt20">
      <Col :sm="{span:24}">
        <Table border :columns="companyFundAccountSearchColumns" :data="data.companyFundAccountSearchData"></Table>
        <Page :total="4" :page-size="5" :page-size-opts="[5, 10]" show-sizer show-total  class="pageSize"></Page>
      </Col>
    </Row>

    <Modal
      v-model="isShowBindAndUnbind"
      title="公司绑定\解绑"
      width="720"
    >
      <company-bind-and-unbind :companyFundAccountInfo="data.companyFundAccountInfo" :bindAndUnbindCompanyData="data.bindAndUnbindCompanyData"></company-bind-and-unbind>
      <div slot="footer">
        <Button type="primary">保存</Button>
        <Button type="warning">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventType from '../../../store/event_types'
  import InputCompany from "../../common_control/form/input_company"
  import companyBindAndUnbind from "../common/CompanyBindAndUnbind.vue"
  import InputAccount from "../common/input_account"

  export default {
    components: {InputCompany, companyBindAndUnbind,InputAccount},
    data() {
      return {
        collapseInfo: [1],
        operatorSearchData: {
          customerNumber: "",
          customerName: "",
          customerPayDate: "",
          fundTypeValue: "",
          fundAccountValue: "",
          onlyShowEffectivePayMonth: false
        },
        fundTypeList: [
          {label: "全部", value: ''},
          {label: "基本公积金", value: 0},
          {label: "补充公积金", value: 1},
        ],
        isShowBindAndUnbind: false,
        companyFundAccountSearchColumns: [
          {title: '操作', align: 'center', width: 180,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('Button', {props: {type: 'success', size: 'small'},
                  on: {
                    click: () => {
                      this.nextStep();
                    }
                  }
                }, '查看'),
                h('Button', {props: {type: 'success', size: 'small'}, style: {marginLeft: '10px'},
                  on: {
                    click: () => {
                      this.nextStep();
                    }
                  }
                }, '编辑')
              ])
            }
          },
          {title: '企业公积金名称', key: 'companyFundName', align: 'center', width: 300,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companyFundName),
              ]);
            }
          },
          {title: '公积金账号', key: 'fundAccount', align: 'center', width: 180,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.fundAccount),
              ]);
            }
          },
          {title: '公积金类型', key: 'fundType', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.fundType),
              ]);
            }
          },
          
          {title: 'U盾代管情况', key: 'UKey', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.UKey),
              ]);
            }
          },
          {title: '缴费银行', key: 'payBank', align: 'center', width: 250,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.payBank),
              ]);
            }
          },
          {title: '备注说明', key: 'notes', align: 'center', width: 465,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.notes),
              ]);
            }
          },
        ]
      }
    },
    mounted() {
      this[EventType.COMPANYFUNDACCOUNTSEARCH]()
    },
    computed: {
      ...mapState('companyFundAccountSearch',{
        data:state => state.data
      })
    },
    methods: {
      ...mapActions('companyFundAccountSearch',[EventType.COMPANYFUNDACCOUNTSEARCH]),
      nextStep() {
        this.$router.push({name: "companyFundAccountProgressTwo"});
      },
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
    }
  }
</script>
