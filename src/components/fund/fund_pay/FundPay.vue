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
                <Form-item label="出账批号：" prop="paymentBatchNum">
                  <Input v-model="operatorSearchData.paymentBatchNum" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="支付状态：" prop="paymentState">
                  <Select v-model="operatorSearchData.paymentState" style="width: 100%;" transfer>
                    <Option v-for="item in paymentStateList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业账户类型：" prop="hfAccountType">
                  <Select v-model="operatorSearchData.hfAccountType" style="width: 100%;" transfer>
                    <Option v-for="item in accountTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="制单人：" prop="createPaymentUser">
                  <Input v-model="operatorSearchData.createPaymentUser" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="汇缴年月：" prop="paymentMonth">
                  <DatePicker v-model="operatorSearchData.paymentMonth" type="month" placement="bottom" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}" class="tr">
                <Button type="primary" icon="ios-search" @click="clickQuery">查询</Button>
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

    <Table border ref="fundPay" class="mt20" :columns="fundPayColumns" :data="fundPayData" :loading="loading"></Table>
    <Page :total="4" :page-size="5" :page-size-opts="[5, 10]" show-sizer show-total  class="pageSize"></Page>

    <Modal
      v-model="isShowPayProgress"
      title="支付进度"
      width="800"
    >
      <progress-bar :stepsInfo="steps" @on-step-click="progressClick"></progress-bar>
      <div slot="footer">
        <Button type="warning" @click="isShowPayProgress = false;">返回</Button>
      </div>
    </Modal>

    <Modal
      v-model="isShowFundPayChangeList"
      title="上海市公积金汇缴变更清册"
      width="960"
    >
      <fund-pay-change-list :fundPayChangeInfo="fundPayChangeInfo"></fund-pay-change-list>
      <div slot="footer">
        <Button type="warning" @click="isShowFundPayChangeList = false;">返回</Button>
      </div>
    </Modal>

    <Modal
      v-model="isShowAddFundPayChangeList"
      title="上海市补充公积金汇缴变更清册"
      width="960"
    >
      <add-fund-pay-change-list :addFundPayChangeInfo="addFundPayChangeInfo"></add-fund-pay-change-list>
      <div slot="footer">
        <Button type="warning" @click="isShowAddFundPayChangeList = false;">返回</Button>
      </div>
    </Modal>

    <Modal
      v-model="isShowFundPayRepairList"
      title="上海市公积金补缴清册"
      width="960"
    >
      <fund-pay-repair-list :fundPayRepairInfo="fundPayRepairInfo"></fund-pay-repair-list>
      <div slot="footer">
        <Button type="warning" @click="isShowFundPayRepairList = false;">返回</Button>
      </div>
    </Modal>

    <Modal
      v-model="isShowAddFundPayRepairList"
      title="上海市补充公积金补缴清册"
      width="960"
    >
      <add-fund-pay-repair-list :addFundPayRepairInfo="addFundPayRepairInfo"></add-fund-pay-repair-list>
      <div slot="footer">
        <Button type="warning" @click="isShowAddFundPayRepairList = false;">返回</Button>
      </div>
    </Modal>

    <Modal
      v-model="isShowAddFundPayRepairList"
      title="上海市补充公积金汇缴补缴清册"
      width="960"
    >
      <add-fund-pay-repair-list :addFundPayRepairInfo="addFundPayRepairInfo"></add-fund-pay-repair-list>
      <div slot="footer">
        <Button type="warning" @click="isShowAddFundPayRepairList = false;">返回</Button>
      </div>
    </Modal>

    <Modal
      v-model="isShowOperateEdit"
      title="编辑"
      width="960"
    >
      <Table border :columns="operateEditColumns" :data="operateEditData"></Table>
      <div slot="footer">
        <Button type="primary" @click="isShowOperateEdit = false;">重新生成汇缴支付批次</Button>
        <Button type="warning" @click="isShowOperateEdit = false;">返回</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import progressBar from '../../common_control/progress/ProgressBar.vue'
  import fundPayChangeList from '../common/FundPayChangeList.vue'
  import addFundPayChangeList from '../common/AddFundPayChangeList.vue'
  import fundPayRepairList from '../common/FundPayRepairList.vue'
  import addFundPayRepairList from '../common/AddFundPayRepairList.vue'
  import InputCompany from "../common/input_company"
  import {FundPay} from '../../../api/house_fund/fund_pay/fund_pay'


  export default {
    components: {progressBar, fundPayChangeList, addFundPayChangeList, fundPayRepairList, addFundPayRepairList,InputCompany},
    data() {
      return {
        collapseInfo: [1],
        fundPayData:[],//汇缴支付列表里的数据
        totalSize:0,//后台传过来的分页总数
        size:10,//默认单页记录数
        pageNum:1,//默认页数
        loading: false,
        operatorSearchData: {
          customerNumber: "",
          outAccountBatch: "",
          payStatusValue: 0,
          accountTypeValue: 0,
          ticketMaker: "",
          payDate: ""
        },
        paymentStateList: [
          {label: "全部", value: ''},
          {label: "可付", value: 3},
          {label: "申请中", value: 4},
          {label: "内部审批批退", value: 5},
          {label: "已申请到财务部", value: 6},
          {label: "财务部批退", value: 7},
          {label: "财务部支付成功", value: 8}
        ],
        accountTypeList: [
          {label: "全部", value: ''},
          {label: "中智大库", value: 1},
          {label: "中智外包", value: 2},
          {label: "独立户", value: 3},
        ],
        isShowPayProgress: false,
        fundPayColumns: [
          {type: 'selection', width: 60},
          {title: '出账批号', key: 'paymentBatchNum', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.paymentBatchNum),
              ]);
            }
          },
          {title: '申请支付总金额', key: 'totalApplicationAmonut', align: 'center', width: 130,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.totalApplicationAmonut),
              ]);
            }
          },
          {title: '总雇员数', key: 'totalEmpCount', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.totalEmpCount),
              ]);
            }
          },
          {title: '汇缴年月', key: 'paymentMonth', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.paymentMonth),
              ]);
            }
          },
          {title: '支付状态', key: 'paymentStateValue', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('a', {
                  on: {
                    click: () => {
                      this.isShowPayProgress = true;
                    }
                  }
                }, params.row.paymentStateValue),
              ]);
            }
          },
          {title: '制单人', key: 'createPaymentUser', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.createPaymentUser),
              ]);
            }
          },
          {title: '制单日期', key: 'createPaymentDate', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.createPaymentDate),
              ]);
            }
          },
          {title: '财务支付日期', key: 'financePaymentDate', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.financePaymentDate),
              ]);
            }
          },
          {title: '企业账户类型', key: 'accountTypeValue', align: 'center', width: 159,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.accountTypeValue),
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
      //  vuex数据
        steps: [
          {isOver: 1, title: '送审', author: '王莺', date: '2016-12-12 12:32', action: {name: '', href: ''}},
          {isOver: 0,title: '汇缴', author: '小龙女', date: '', action: {name: '催一下', href: ''}},
          {isOver: -1, title: '财务审核', author: '', date: '', action: {name: '', href: ''}},
          {isOver: -1, title: '回单', author: '', date: '', action: {name: '', href: ''}},
          {isOver: -1, title: '出票', author: '', date: '', action: {name: '', href: ''}},
          {isOver: -1, title: '财务支付', author: '', date: '', action: {name: '', href: ''}}
        ],
        fundPayChangeInfo: {
          companyName: "花旗银行(中国有限公司)",
          listId: "18130",
          basicFundAccount: "882222694",
          payYear: "2017",
          payMonth: "07",
          amountPage: "3",
          currentPage: "1",
          list:{
            add: [
              {index: 1, changeType: "开户", name: "徐亚一", IdNumber: "362301199003311531", fundType: "新开", payEveryMonth: "1820.00", salary: "13000.00", payPercent: "7%"},
              {index: 2, changeType: "开户", name: "石悦", IdNumber: "14010619921104304X", fundType: "新开", payEveryMonth: "1820.00", salary: "13000.00", payPercent: "7%"},
              {index: 3, changeType: "开户", name: "杨天儒", IdNumber: "5101081991108080629", fundType: "新开", payEveryMonth: "1820.00", salary: "13000.00", payPercent: "7%"},
              {index: 4, changeType: "开户", name: "饶钥", IdNumber: "420111199409115027", fundType: "新开", payEveryMonth: "1820.00", salary: "13000.00", payPercent: "7%"},
              {index: 5, changeType: "开户", name: "李欣阳", IdNumber: "341002199308251045", fundType: "新开", payEveryMonth: "1820.00", salary: "13000.00", payPercent: "7%"},
              {index: 6, changeType: "开户", name: "赵怡思", IdNumber: "130104199210041822", fundType: "新开", payEveryMonth: "1820.00", salary: "13000.00", payPercent: "7%"},
              {index: 7, changeType: "开户", name: "陈俐孜", IdNumber: "612524199311044883", fundType: "新开", payEveryMonth: "1820.00", salary: "13000.00", payPercent: "7%"},
              {index: 8, changeType: "开户", name: "张思宇", IdNumber: "440106199304210020", fundType: "新开", payEveryMonth: "1820.00", salary: "13000.00", payPercent: "7%"},
              {index: 9, changeType: "开户", name: "曾霄霄", IdNumber: "130104199012011841", fundType: "新开", payEveryMonth: "1820.00", salary: "13000.00", payPercent: "7%"},
              {index: 10, changeType: "开户", name: "李雨萌", IdNumber: "410403199009095746", fundType: "新开", payEveryMonth: "1120.00", salary: "8000.00", payPercent: "7%"}
            ],
            desc: [
              {fundAccount: "165543620", name: "李翔", notes: "封存", payEveryMonth: "1952.00"},
              {fundAccount: "061856885", name: "罗丽丽", notes: "封存", payEveryMonth: "2732.00"},
              {fundAccount: "058080697", name: "叶碧灵", notes: "封存", payEveryMonth: "2732.00"},
              {fundAccount: "134189553", name: "毛越", notes: "封存", payEveryMonth: "2142.00"},
              {fundAccount: "084736859", name: "陈雪", notes: "封存", payEveryMonth: "2494.00"},
              {fundAccount: "084839144", name: "李敏", notes: "封存", payEveryMonth: "2494.00"},
              {fundAccount: "139714996", name: "辛竞一", notes: "封存", payEveryMonth: "2484.00"},
              {fundAccount: "085612649", name: "袁雯", notes: "封存", payEveryMonth: "2494.00"},
              {fundAccount: "084927320", name: "钱慧芳", notes: "封存", payEveryMonth: "2494.00"},
              {fundAccount: "086379732", name: "王晓昕", notes: "封存", payEveryMonth: "2494.00"}
            ]
          },
          subtotal: {
            addPeoples: 10,
            addPrice: 17500.00,
            descPeoples: 10,
            descPrice: 17500.00
          },
          total: {
            addPeoples: 22,
            addPrice: 45428.00,
            descPeoples: 17,
            descPrice: 36288.00
          },
          maker: "王莺",
          makeDate: "2017/7/21 10:01:49"
        },
        addFundPayChangeInfo: {
          companyName: "罗克韦尔自动化(中国)有限公司",
          listId: "2816",
          basicFundAccount: "209882466381",
          payYear: "2017",
          payMonth: "07",
          amountPage: "2",
          currentPage: "1",
          list:{
            add: [
              {index: 1, changeType: "开户", name: "柳维奇", fundAccount: "158797954", addFundAccount: "", payEveryMonth: "614.00", payPercent: "3%"},
              {index: 2, changeType: "开户", name: "李永贵", fundAccount: "188592350", addFundAccount: "", payEveryMonth: "600.00", payPercent: "3%"},
              {index: 3, changeType: "开户", name: "徐浩", fundAccount: "104908920", addFundAccount: "", payEveryMonth: "1050.00", payPercent: "3%"},
              {index: 4, changeType: "开户", name: "李全波", fundAccount: "101259165", addFundAccount: "", payEveryMonth: "1170.00", payPercent: "3%"},
              {index: 5, changeType: "转入", name: "刘伟", fundAccount: "", addFundAccount: "052509700", payEveryMonth: "1170.00", payPercent: "3%"},
              {index: 6, changeType: "转入", name: "吴燕燕", fundAccount: "", addFundAccount: "083148130", payEveryMonth: "1170.00", payPercent: "3%"},
              {index: 7, changeType: "转入", name: "詹世涛", fundAccount: "", addFundAccount: "101391718", payEveryMonth: "1170.00", payPercent: "3%"},
              {index: 8, changeType: "转入", name: "何倩倩", fundAccount: "", addFundAccount: "109158030", payEveryMonth: "1170.00", payPercent: "3%"},
              {index: 9, changeType: "转入", name: "黄定伟", fundAccount: "", addFundAccount: "123358165", payEveryMonth: "1110.00", payPercent: "3%"},
              {index: 10, changeType: "", name: "", fundAccount: "", addFundAccount: "", payEveryMonth: "", payPercent: ""}
            ],
            desc: [
              {addFundAccount: "061379993", name: "赵雯静", notes: "封存", payEveryMonth: "494.00"},
              {addFundAccount: "089391677", name: "郭晓燕", notes: "封存", payEveryMonth: "396.00"},
              {addFundAccount: "115593987", name: "王欢", notes: "封存", payEveryMonth: "524.00"},
              {addFundAccount: "057658809", name: "杨钧", notes: "封存", payEveryMonth: "1070.00"},
              {addFundAccount: "089091566", name: "张志刚", notes: "封存", payEveryMonth: "1070.00"},
              {addFundAccount: "088758073", name: "冯建华", notes: "封存", payEveryMonth: "1170.00"},
              {addFundAccount: "052443191", name: "朱文君", notes: "封存", payEveryMonth: "1070.00"},
              {addFundAccount: "084108254", name: "徐罡", notes: "封存", payEveryMonth: "1008.00"},
              {addFundAccount: "057783719", name: "彭刚", notes: "封存", payEveryMonth: "1170.00"},
              {addFundAccount: "144385376", name: "刘小珍", notes: "封存", payEveryMonth: "630.00"}
            ]
          },
          subtotal: {
            addPeoples: 9,
            addPrice: 9224.00,
            descPeoples: 10,
            descPrice: 8602.00
          },
          total: {
            addPeoples: 9,
            addPrice: 9224.00,
            descPeoples: 12,
            descPrice: 10742.00
          },
          maker: "王莺",
          makeDate: "2017/8/21 10:05:34"
        },
        fundPayRepairInfo: {
          companyName: "花旗银行(中国有限公司)",
          listId: "18130",
          basicFundAccount: "882222694",
          payYear: "2017",
          payMonth: "7",
          payDay: "21",
          amountPage: "1",
          currentPage: "1",
          list:[
            {index: 1, employeeAccount: "084703222", name: "黎宇", IdNumber: "360102197607016335", repairReason: "①", dateToDate1: "2017.6~2017.6", payPercent1: "7%", repairPriceEveryMonth1: "2494.00", repairSubTotal1: "2494.00", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: "2494.00"},
            {index: 2, employeeAccount: "060119688", name: "毛颖桢", IdNumber: "310107198207193022", repairReason: "①", dateToDate1: "2017.6~2017.6", payPercent1: "7%", repairPriceEveryMonth1: "2494.00", repairSubTotal1: "2494.00", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: "2494.00"},
            {index: 3, employeeAccount: "141871167", name: "夏乔乔", IdNumber: "320282198412071427", repairReason: "①", dateToDate1: "2017.6~2017.6", payPercent1: "7%", repairPriceEveryMonth1: "2494.00", repairSubTotal1: "2494.00", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: "2494.00"},
            {index: 4, employeeAccount: "", name: "", IdNumber: "", repairReason: "", dateToDate1: "", payPercent1: "", repairPriceEveryMonth1: "", repairSubTotal1: "", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: ""},
            {index: 5, employeeAccount: "", name: "", IdNumber: "", repairReason: "", dateToDate1: "", payPercent1: "", repairPriceEveryMonth1: "", repairSubTotal1: "", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: ""},
            {index: 6, employeeAccount: "", name: "", IdNumber: "", repairReason: "", dateToDate1: "", payPercent1: "", repairPriceEveryMonth1: "", repairSubTotal1: "", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: ""},
            {index: 7, employeeAccount: "", name: "", IdNumber: "", repairReason: "", dateToDate1: "", payPercent1: "", repairPriceEveryMonth1: "", repairSubTotal1: "", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: ""},
            {index: 8, employeeAccount: "", name: "", IdNumber: "", repairReason: "", dateToDate1: "", payPercent1: "", repairPriceEveryMonth1: "", repairSubTotal1: "", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: ""},
            {index: 9, employeeAccount: "", name: "", IdNumber: "", repairReason: "", dateToDate1: "", payPercent1: "", repairPriceEveryMonth1: "", repairSubTotal1: "", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: ""},
            {index: 10, employeeAccount: "", name: "", IdNumber: "", repairReason: "", dateToDate1: "", payPercent1: "", repairPriceEveryMonth1: "", repairSubTotal1: "", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: ""}
          ],
          reason: "<p>补缴原因：<br/>① 漏缴补缴 ② 少缴补缴 ③ 欠缴单位补缴 ④ 外省市转入补缴 ⑤ 错缴更正补缴 ⑥ 特殊补缴</p><p>注：<br/>(1) 补缴原因栏填写补缴原因代码;<br/>(2) 本表一式三联，一联经建行盖章后返回单位，一联由建留存，一联由建行转公积金管理中心;<br/>(3) 正常缴存单位为整体或部分职工补缴住房公积金超过12个月的，须经市公积金管理中心或区县中心审核，本表须一式四联。</p>",
          subTotal: {
            peoples: 3,
            amount: 7482.00
          },
          total: {
            peoples: 3,
            amount: 7482.00
          },
          maker: "王莺"
        },
        addFundPayRepairInfo: {
          companyName: "花旗银行(中国有限公司)",
          listId: "18130",
          basicFundAccount: "882222694",
          payYear: "2017",
          payMonth: "7",
          payDay: "21",
          amountPage: "1",
          currentPage: "1",
          list:[
            {index: 1, employeeAccount: "084703222", name: "黎宇", IdNumber: "360102197607016335", repairReason: "①", dateToDate1: "2017.6~2017.6", payPercent1: "7%", repairPriceEveryMonth1: "2494.00", repairSubTotal1: "2494.00", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: "2494.00"},
            {index: 2, employeeAccount: "060119688", name: "毛颖桢", IdNumber: "310107198207193022", repairReason: "①", dateToDate1: "2017.6~2017.6", payPercent1: "7%", repairPriceEveryMonth1: "2494.00", repairSubTotal1: "2494.00", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: "2494.00"},
            {index: 3, employeeAccount: "141871167", name: "夏乔乔", IdNumber: "320282198412071427", repairReason: "①", dateToDate1: "2017.6~2017.6", payPercent1: "7%", repairPriceEveryMonth1: "2494.00", repairSubTotal1: "2494.00", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: "2494.00"},
            {index: 4, employeeAccount: "", name: "", IdNumber: "", repairReason: "", dateToDate1: "", payPercent1: "", repairPriceEveryMonth1: "", repairSubTotal1: "", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: ""},
            {index: 5, employeeAccount: "", name: "", IdNumber: "", repairReason: "", dateToDate1: "", payPercent1: "", repairPriceEveryMonth1: "", repairSubTotal1: "", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: ""},
            {index: 6, employeeAccount: "", name: "", IdNumber: "", repairReason: "", dateToDate1: "", payPercent1: "", repairPriceEveryMonth1: "", repairSubTotal1: "", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: ""},
            {index: 7, employeeAccount: "", name: "", IdNumber: "", repairReason: "", dateToDate1: "", payPercent1: "", repairPriceEveryMonth1: "", repairSubTotal1: "", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: ""},
            {index: 8, employeeAccount: "", name: "", IdNumber: "", repairReason: "", dateToDate1: "", payPercent1: "", repairPriceEveryMonth1: "", repairSubTotal1: "", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: ""},
            {index: 9, employeeAccount: "", name: "", IdNumber: "", repairReason: "", dateToDate1: "", payPercent1: "", repairPriceEveryMonth1: "", repairSubTotal1: "", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: ""},
            {index: 10, employeeAccount: "", name: "", IdNumber: "", repairReason: "", dateToDate1: "", payPercent1: "", repairPriceEveryMonth1: "", repairSubTotal1: "", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: ""}
          ],
          reason: "<p>补缴原因：<br/>① 漏缴补缴 ② 少缴补缴 ③ 欠缴单位补缴 ④ 外省市转入补缴 ⑤ 错缴更正补缴 ⑥ 特殊补缴</p><p>注：<br/>(1) 补缴原因栏填写补缴原因代码;<br/>(2) 本表一式三联，一联经建行盖章后返回单位，一联由建留存，一联由建行转公积金管理中心;<br/>(3) 正常缴存单位为整体或部分职工补缴住房公积金超过12个月的，须经市公积金管理中心或区县中心审核，本表须一式四联。</p>",
          subTotal: {
            peoples: 3,
            amount: 7482.00
          },
          total: {
            peoples: 3,
            amount: 7482.00
          },
          maker: "王莺"
        },
        operateEditData: [
          {fundAccountName: "客户1", payStatus: "可付", fundAccountType: "独立户", settleBank: "徐汇建行"},
          {fundAccountName: "客户2", payStatus: "未到账", fundAccountType: "独立户", settleBank: "徐汇建行"},
          {fundAccountName: "客户3", payStatus: "无需支付", fundAccountType: "独立户", settleBank: "徐汇建行"},
          {fundAccountName: "客户4", payStatus: "已付", fundAccountType: "独立户", settleBank: "徐汇建行"}
        ]
      }
    },
    mounted() {
      let sessionPageNum = sessionStorage.taskPageNum
      let sessionPageSize = sessionStorage.taskPageSize
      if(typeof(sessionPageNum)!="undefined" && typeof(sessionPageSize)!="undefined"){
        this.pageNum = Number(sessionPageNum)
        this.size = Number(sessionPageSize)
        sessionStorage.removeItem("taskPageNum")
        sessionStorage.removeItem("taskPageSize")
      }

      let params = {
        pageSize:this.size,
        pageNum:this.pageNum,
        params:{}
      }
      let self= this
      FundPay.getFundPaysTableData(params).then(data=>{
          self.loading=true;
          self.refresh(data)
        }
      ).catch(error=>{
        console.log(error);
      })
    },
    computed: {
    },
    methods: {
      clickQuery(){
        this.loading=true;
        let params = this.getParams(1)
        let self = this
        FundPay.getFundPaysTableData(params).then(data=>{
          self.refresh(data)
        }).catch(error=>{
          console.log(error)
        })
      },
      getParams(page) {
        return {
          pageSize: this.size,
          pageNum: page,
          params: {
            // companyId: this.operatorSearchData.companyId,//客户编号
            paymentBatchNum: (this.operatorSearchData.paymentBatchNum == "" || this.operatorSearchData.paymentBatchNum == null) ? null : this.operatorSearchData.paymentBatchNum,
            paymentState: (this.operatorSearchData.paymentState == "" || this.operatorSearchData.paymentState == null) ? null : this.operatorSearchData.paymentState,
            hfAccountType: (this.operatorSearchData.hfAccountType == "" || this.operatorSearchData.hfAccountType == null) ? null : this.operatorSearchData.hfAccountType,
            createPaymentUser: (this.operatorSearchData.createPaymentUser == "" || this.operatorSearchData.createPaymentUser == null) ? null : this.operatorSearchData.createPaymentUser,
            paymentMonth: (this.operatorSearchData.paymentMonth == "" || this.operatorSearchData.paymentMonth == null) ? null : this.$utils.formatDate(this.operatorSearchData.paymentMonth, 'YYYYMM'),
          }
        }
      },
      refresh(data){
        this.fundPayData = data.data.fundPayData;
        if(typeof(data.data.totalSize)=='undefined') this.totalSize = 0
        else this.totalSize = Number(data.data.totalSize)
        this.closeLoading();
      },
      closeLoading(){
        this.loading=false;
      },
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
