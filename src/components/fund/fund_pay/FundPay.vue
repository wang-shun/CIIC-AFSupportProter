<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        公积金汇缴支付
        <div slot="content">
          <Form :label-width=150 ref="operatorSearchData" :model="operatorSearchData">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户编号：" prop="customerNumber">
                  <Input v-model="operatorSearchData.customerNumber" placeholder="请输入..."></Input>
                  
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="出账批号：" prop="outAccountBatch">
                  <Input v-model="operatorSearchData.outAccountBatch" placeholder="请输入..."></Input>
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
                <Form-item label="账户类型：" prop="accountTypeValue">
                  <Select v-model="operatorSearchData.accountTypeValue" style="width: 100%;" transfer>
                    <Option v-for="item in accountTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="制单人：" prop="ticketMaker">
                  <Input v-model="operatorSearchData.ticketMaker" placeholder="请输入..."></Input>
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
          </Form>
        </div>
      </Panel>
    </Collapse>
    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="primary" @click="goMakePayList">制作汇缴名单</Button>
        <Dropdown @on-click="exportTable">
          <Button type="info">
            生成导出文件
            <Icon type="arrow-down-b"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="0">Excel导出客户汇总</DropdownItem>
            <DropdownItem name="1">基本公积金变更清册</DropdownItem>
            <DropdownItem name="2">补充公积金变更清册</DropdownItem>
            <DropdownItem name="3">基本公积金补缴清册</DropdownItem>
            <DropdownItem name="4">补充公积金补缴清册</DropdownItem>
            <DropdownItem name="5">基本公积金汇缴补缴书</DropdownItem>
            <DropdownItem name="6">补充公积金汇缴补缴书</DropdownItem>
            <DropdownItem name="7">付款凭证打印</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <Button type="primary">
            流程制作
            <Icon type="arrow-down-b"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem>送审</DropdownItem>
            <DropdownItem>汇缴</DropdownItem>
            <DropdownItem>出票</DropdownItem>
            <DropdownItem>回单</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <Button type="info">
            生成网银文件
            <Icon type="arrow-down-b"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem>补缴.txt</DropdownItem>
            <DropdownItem>变更.txt</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown @on-click="operate">
          <Button type="primary">
            操作
            <Icon type="arrow-down-b"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="0">详细</DropdownItem>
            <DropdownItem name="1">编辑</DropdownItem>
            <DropdownItem name="2">删除</DropdownItem>
            <DropdownItem name="3">取消汇缴</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Col>
    </Row>

    <Table border ref="fundPay" class="mt20" :columns="fundPayColumns" :data="data.fundPayData"></Table>
    <Page :total="4" :page-size="5" :page-size-opts="[5, 10]" show-sizer show-total  class="pageSize"></Page>

    <Modal
      v-model="isShowPayProgress"
      title="支付进度"
      width="800"
    >
      <progress-bar :stepsInfo="data.steps" @on-step-click="progressClick"></progress-bar>
      <div slot="footer">
        <Button type="warning" @click="isShowPayProgress = false;">返回</Button>
      </div>
    </Modal>

    <Modal
      v-model="isShowFundPayChangeList"
      title="上海市公积金汇缴变更清册"
      width="960"
    >
      <fund-pay-change-list :fundPayChangeInfo="data.fundPayChangeInfo"></fund-pay-change-list>
      <div slot="footer">
        <Button type="warning" @click="isShowFundPayChangeList = false;">返回</Button>
      </div>
    </Modal>

    <Modal
      v-model="isShowAddFundPayChangeList"
      title="上海市补充公积金汇缴变更清册"
      width="960"
    >
      <add-fund-pay-change-list :addFundPayChangeInfo="data.addFundPayChangeInfo"></add-fund-pay-change-list>
      <div slot="footer">
        <Button type="warning" @click="isShowAddFundPayChangeList = false;">返回</Button>
      </div>
    </Modal>

    <Modal
      v-model="isShowFundPayRepairList"
      title="上海市公积金补缴清册"
      width="960"
    >
      <fund-pay-repair-list :fundPayRepairInfo="data.fundPayRepairInfo"></fund-pay-repair-list>
      <div slot="footer">
        <Button type="warning" @click="isShowFundPayRepairList = false;">返回</Button>
      </div>
    </Modal>

    <Modal
      v-model="isShowAddFundPayRepairList"
      title="上海市补充公积金补缴清册"
      width="960"
    >
      <add-fund-pay-repair-list :addFundPayRepairInfo="data.addFundPayRepairInfo"></add-fund-pay-repair-list>
      <div slot="footer">
        <Button type="warning" @click="isShowAddFundPayRepairList = false;">返回</Button>
      </div>
    </Modal>

    <Modal
      v-model="isShowAddFundPayRepairList"
      title="上海市补充公积金汇缴补缴清册"
      width="960"
    >
      <add-fund-pay-repair-list :addFundPayRepairInfo="data.addFundPayRepairInfo"></add-fund-pay-repair-list>
      <div slot="footer">
        <Button type="warning" @click="isShowAddFundPayRepairList = false;">返回</Button>
      </div>
    </Modal>

    <Modal
      v-model="isShowOperateEdit"
      title="编辑"
      width="960"
    >
      <Table border :columns="operateEditColumns" :data="data.operateEditData"></Table>
      <div slot="footer">
        <Button type="primary" @click="isShowOperateEdit = false;">重新生成汇缴支付批次</Button>
        <Button type="warning" @click="isShowOperateEdit = false;">返回</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventType from '../../../store/event_types'

  import progressBar from '../../common_control/progress/ProgressBar.vue'
  import fundPayChangeList from '../common/FundPayChangeList.vue'
  import addFundPayChangeList from '../common/AddFundPayChangeList.vue'
  import fundPayRepairList from '../common/FundPayRepairList.vue'
  import addFundPayRepairList from '../common/AddFundPayRepairList.vue'
  import InputComapny from "../common/input_company"
  

  export default {
    components: {progressBar, fundPayChangeList, addFundPayChangeList, fundPayRepairList, addFundPayRepairList,InputComapny},
    data() {
      return {
        collapseInfo: [1],
        operatorSearchData: {
          customerNumber: "",
          outAccountBatch: "",
          payStatusValue: 0,
          accountTypeValue: 0,
          ticketMaker: "",
          payDate: ""
        },
        payStatusList: [
          {label: "全部", value: ''},
          {label: "初始", value: 0},
          {label: "申请中", value: 1},
          {label: "支付成功", value: 2},
          {label: "批退", value: 3}
        ],
        accountTypeList: [
          {label: "全部", value: ''},
          {label: "中智大库", value: 0},
          {label: "中智外包", value: 1},
          {label: "独立户", value: 2},
        ],
        isShowPayProgress: false,
        fundPayColumns: [
          {type: 'selection', width: 60},
          {title: '出账批号', key: 'outAccountBatchNumber', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.outAccountBatchNumber),
              ]);
            }
          },
          {title: '申请支付总金额', key: 'applyAmount', align: 'center', width: 130,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.applyAmount),
              ]);
            }
          },
          {title: '总雇员数', key: 'employes', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.employes),
              ]);
            }
          },
          {title: '汇缴年月', key: 'payDate', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.payDate),
              ]);
            }
          },
          {title: '支付状态', key: 'payStatus', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('a', {
                  on: {
                    click: () => {
                      this.isShowPayProgress = true;
                    }
                  }
                }, params.row.payStatus),
              ]);
            }
          },
          {title: '制单人', key: 'ticketMaker', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.ticketMaker),
              ]);
            }
          },
          {title: '制单日期', key: 'ticketMakeDate', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.ticketMakeDate),
              ]);
            }
          },
          {title: '财务支付日期', key: 'financePayDate', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.financePayDate),
              ]);
            }
          },
          {title: '账户类型', key: 'accountType', align: 'center', width: 159,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.accountType),
              ]);
            }
          }
        ],
        isShowFundPayChangeList: false,
        isShowAddFundPayChangeList: false,
        isShowFundPayRepairList: false,
        isShowAddFundPayRepairList: false,
        isShowOperateEdit: false,
        operateEditColumns: [
          {title: '操作', align: 'center', width: 120,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('a', '删除'),
              ]);
            }
          },
          {title: '公积金账户名称', key: 'fundAccountName', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.fundAccountName),
              ]);
            }
          },
          {title: '支付状态', key: 'payStatus', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.payStatus),
              ]);
            }
          },
          {title: '公积金账户类型', key: 'fundAccountType', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.fundAccountType),
              ]);
            }
          },
          {title: '结算银行', key: 'settleBank', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.settleBank),
              ]);
            }
          }
        ],
      }
    },
    mounted() {
      this[EventType.FUNDPAY]()
    },
    computed: {
      ...mapState('fundPay',{
        data:state => state.data
      })
    },
    methods: {
      ...mapActions('fundPay', [EventType.FUNDPAY]),
      progressClick(stepInfo) {
        console.log(JSON.stringify(stepInfo));
      },
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      goMakePayList() {
        this.$router.push({name: 'makePayList'})
      },
      exportTable(name) {
        switch(parseInt(name)) {
          case 0:
            this.$refs.fundPay.exportCsv({
              filename: 'excel',
              original: false
            });
            break;
          case 1:
            this.isShowFundPayChangeList = true;
            break;
          case 2:
            this.isShowAddFundPayChangeList = true;
            break;
          case 3:
            this.isShowFundPayRepairList = true;
            break;
          case 4:
            this.isShowAddFundPayRepairList = true;
            break;
          default:
            break;
        }
      },
      operate(name) {
        switch(parseInt(name)) {
          case 0:
            break;
          case 1:
            this.isShowOperateEdit = true;
            break;
          case 2:
            break;
          case 3:
            break;
          default:
            break;
        }
      }
    }
  }
</script>
