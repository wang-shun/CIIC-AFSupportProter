<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        公积金汇缴支付
        <div slot="content">
          <Form :label-width=150 ref="operatorSearchData" :model="operatorSearchData">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户编号：" prop="companyId">
                  <Input v-model="operatorSearchData.companyId" placeholder="请输入..."></Input>
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
                    <Option value="" >全部</Option>
                     <Option v-for="(value,key) in this.baseDic.companyHFAccountType" :value="key" :key="key">{{ value }}</Option>
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
                  <Date-picker v-model="operatorSearchData.paymentMonth" type="month" format='yyyyMM' placement="bottom" placeholder="选择年月份" style="width: 100%;" transfer></Date-picker>
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
            <!-- <DropdownItem name="0">Excel输出</DropdownItem> -->
            <DropdownItem name="1">基本公积金变更清册</DropdownItem>
            <DropdownItem name="2">补充公积金变更清册</DropdownItem>
            <DropdownItem name="3">基本公积金补缴清册</DropdownItem>
            <DropdownItem name="4">补充公积金补缴清册</DropdownItem>
            <DropdownItem name="5">基本公积金汇缴书</DropdownItem>
            <DropdownItem name="6">补充公积金汇缴书</DropdownItem>
            <DropdownItem name="7">付款凭证打印</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown @on-click="processOpt">
          <Button type="primary">
            流程制作
            <Icon type="arrow-down-b"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="0">送审</DropdownItem>
            <DropdownItem name="1">汇缴</DropdownItem>
            <DropdownItem name="2">出票</DropdownItem>
            <DropdownItem name="3">回单</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown @on-click="generateBank">
          <Button type="info">
            生成网银文件
            <Icon type="arrow-down-b"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="0">补缴.txt</DropdownItem>
            <DropdownItem name="1">变更.txt</DropdownItem>
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
            <!-- <DropdownItem name="3">取消汇缴</DropdownItem> -->
          </DropdownMenu>
        </Dropdown>
      </Col>
    </Row>

    <Table border ref="fundPay" class="mt20" :columns="fundPayColumns" :data="fundPayData" :loading="loading" @on-selection-change="selectChange"></Table>
    <!-- <Page :total="4" :page-size="5" :page-size-opts="[5, 10]" show-sizer show-total  class="pageSize"></Page> -->
    <Page
      class="pageSize"
      @on-change="handlePageNum"
      @on-page-size-change="handlePageSite"
      :total="totalSize"
      :page-size="size"
      :page-size-opts="pageSizeOpts"
      :current="pageNum"
      show-sizer show-total></Page>

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
    
    
      v-model="isShowOperateDetail"
      title="详细"
      width="960"
    >
      <Table border :columns="operateDetailColumns" :data="operateDetailData"></Table>
      <div slot="footer">
        <Button type="info" @click="operateDetailExcelExport()">导出</Button>
        <Button type="warning" @click="isShowOperateDetail = false;">返回</Button>
      </div>
    </Modal>
    <Modal
      v-model="isShowOperateEdit"
      title="编辑"
      width="960"
    >
      <Table border :columns="operateEditColumns" :data="operateEditData"></Table>
      <div slot="footer">
        <Button type="primary" @click="clickOperateAdd()">添加</Button>
        <Button type="warning" @click="goBack()">返回</Button>
      </div>
    </Modal>
    <Modal
      v-model="isShowOperateAdd"
      title="添加"
      width="960"
    >
      <Table border :columns="operateAddColumns" :data="operateAddData"
             @on-select="updateMakePayListInfo"
             @on-select-all="updateMakePayListInfo"
             @on-select-cancel="updateMakePayListInfo"
             @on-selection-change="updateMakePayListInfo"></Table>
        <Form :label-width=75 ref="operatorSearchData" :model="operatorSearchData">
          <!-- <Collapse v-model="collapseInfo"> -->
            <!-- <Panel name="1"> -->
              <!-- <Row class="mt20">
                <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                  <Form-item label="汇缴年月：">
                    {{makePayListInfo.payDate}}
                  </Form-item>
                </Col>
                <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                  <Form-item label="总行数：">
                    {{makePayListInfo.rows}}
                  </Form-item>
                </Col>
              </Row>
              <Row class="mt20">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="付款方式：" prop="paymentWay">
                  <Select v-model="paymentWay" style="width: 100%;" transfer filterable >
                    <Option v-for="item in paymentWayList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="收款方：" prop="payee">
                  <Select v-model="payee" style="width: 100%;" transfer filterable >
                    <Option v-for="item in payeeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
            </Row> -->
          <!-- </Panel> -->
        <!-- </Collapse> -->
        </Form>
      <div slot="footer">
        <Button type="info" @click="createPaymentComList()">保存</Button>
        <Button type="warning" @click="goBack">返回</Button>
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
  import Tools from '../../../lib/tools'


  export default {
    components: {progressBar, fundPayChangeList, addFundPayChangeList, fundPayRepairList, addFundPayRepairList,InputCompany},
    data() {
      return {
        collapseInfo: [1],
        fundPayData:[],//汇缴支付列表里的数据
        operateEditData:[],//汇缴支付列表编辑操作数据
        operateDetailData:[],//汇缴支付列表详细操作数据
        operateAddData:[],//汇缴支付列表添加操作数据
        makePayListInfo:[],
        totalSize:0,//后台传过来的分页总数
        size:10,//默认单页记录数
        pageNum:1,//默认页数
        pageSizeOpts:[10,20,50],
        loading: false,
        currentIndex:-1,
        operatorSearchData: {
          companyId: "",
          paymentBatchNum: "",
          paymentState: '',
          hfAccountType:'',
          accountTypeValue: 0,
          createPaymentUser: "",
          paymentMonth:"",
          payDate: ""

        },
        operateAddParams:{
          paymentStatus : '',
          fundAccountType : '',
          paymentBank : '',
          companyId : '',
          companyName : '',
          paymentMonth : ''
        },
        selectedData: [],
        selectedData1: [],
        progressInfo:{
          paymentId:0,
          paymentState:0
        },
        //todo: 菜单值统一存储维护
        paymentStateList: [
          {label: "全部", value: ''},
          {label: "可付", value: 1},
          {label: "送审", value: 2},
          {label: "汇缴(已申请到财务部 ) ", value: 3},
          {label: "财务部批退", value: 4},
          {label: "财务部审批通过", value: 5},
          {label: "出票", value:6},
          {label: "回单", value:7}
        ],
        addFundPayRepairInfo: {
          companyName: '',
          listId: '',
          basicFundAccount: '',
          payYear: '',
          payMonth: '',
          payDay: '',
          amountPage: '',
          currentPage: '',
          list: [
            {
              index: 1,
              employeeAccount: '',
              name: '',
              IdNumber: '',
              repairReason: '',
              dateToDate1: '',
              payPercent1: '',
              repairPriceEveryMonth1: '',
              repairSubTotal1: '',
              dateToDate2: '',
              payPercent2: '',
              repairPriceEveryMonth2: '',
              repairSubTotal2: '',
              repairTotal: ''
            }
          ],
          reason: '',
          subTotal: {
            peoples: 0,
            amount: 0.00
          },
          total: {
            peoples: 0,
            amount: 0.00
          },
          maker: ''
        },
        isShowPayProgress: false,
        fundPayColumns: [
          // {type: 'selection', width: 60},
          {
            title: '', key: '', align: 'center', width: 40,
            render: (h, params) => {
              return h('Radio', {
                props: {
                  value: this.currentIndex == params.index,
                },
                on: {
                  'on-change': (val) => {
                    this.currentIndex = params.index
                  }
                }
              }, '');
            }
          },
          {title: '出账批号', key: 'paymentBatchNum', align: 'center', width: 120,
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
          {title: '总雇员数', key: 'totalEmpCount', align: 'center', width: 90,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.totalEmpCount),
              ]);
            }
          },
          {title: '汇缴年月', key: 'paymentMonth', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.paymentMonth),
              ]);
            }
          },
          {title: '支付状态', key: 'paymentStateValue', align: 'center', width: 130,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                 h('span', params.row.paymentStateValue),
                // h('a', {
                //   on: {
                //     click: () => {
                //       this.isShowPayProgress = true;
                //     }
                //   }
                // }, params.row.paymentStateValue),
              ]);
            }
          },
          {title: '制单人', key: 'createPaymentUser', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.createPaymentUser),
              ]);
            }
          },
          {title: '制单日期', key: 'createPaymentDateString', align: 'center', width: 180,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.createPaymentDateString),
              ]);
            }
          },
          {title: '财务支付日期', key: 'financePaymentDateString', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.financePaymentDateString),
              ]);
            }
          },
          {title: '企业账户类型', key: 'accountTypeValue', align: 'center',
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
        isShowOperateDetail: false,
        isShowOperateEdit: false,
        isShowOperateAdd: false,
        operateDetailColumns: [
          {type: 'selection', width: 60},
          {title: '公积金类型', key: 'hfTypeName', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.hfTypeName),
              ]);
            }
          },
          {title: '汇缴月份', key: 'paymentMonth', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.paymentMonth),
              ]);
            }
          },
          {title: '公司编号', key: 'companyId', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companyId + "【" + params.row.fCount + "】"),
              ]);
            }
          },
          {title: '公司名称', key: 'title', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.title + "【" + params.row.fCount + "】"),
              ]);
            }
          },
          {title: '汇缴银行', key: 'paymentBank', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', this.$decode.hf_paymentBank(params.row.paymentBank)),
              ]);
            }
          },
          {title: '汇缴金额', key: 'remittedAmount', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.remittedAmount),
              ]);
            }
          },
          {title: '补缴金额', key: 'repairAmount', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.repairAmount),
              ]);
            }
          },
          {title: '汇缴人数', key: 'remittedCountEmp', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.remittedCountEmp),
              ]);
            }
          },
          // {title: '到账金额', key: 'daozhangAmount', align: 'center', width: 200,
          //   render: (h, params) => {
          //     return h('div', {style: {textAlign: 'left'}}, [
          //       h('span', params.row.daozhangAmount),
          //     ]);
          //   }
          // },
          // {title: '到账人数', key: 'daozhangCountEmp', align: 'center', width: 200,
          //   render: (h, params) => {
          //     return h('div', {style: {textAlign: 'left'}}, [
          //       h('span', params.row.daozhangCountEmp),
          //     ]);
          //   }
          // }
        ],
        operateEditColumns: [
          {title: '操作', align: 'center', width: 120,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('Button', {props: {type: 'error', size: 'small'}, style: {marginLeft: '10px'},
                  on: {
                    click: () => {
                      this.delOperateEditData(params.row);
                    }
                  }
                }, '删除'),
              ]);
            }
          },
          {title: '公积金账户名称', key: 'comAccountName', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.comAccountName),
              ]);
            }
          },
          {title: '公司编号', key: 'companyId', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companyId + "【" + params.row.fCount + "】"),
              ]);
            }
          },
          {title: '支付状态', key: 'paymentStateValue', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.paymentStateValue),
              ]);
            }
          },

          {title: '公积金账户类型', key: 'hfTypeName', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.hfTypeName),
              ]);
            }
          },
          {title: '结算银行', key: 'paymentBankValue', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.paymentBankValue),
              ]);
            }
          }
        ],
        operateAddColumns: [
          {type: 'selection', width: 60},
          {title: '公积金账户名称', key: 'comAccountName', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.comAccountName),
              ]);
            }
          },
          {title: '公积金类型', key: 'hfTypeName', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.hfTypeName),
              ]);
            }
          },
          {title: '支付状态', key: 'paymentStateValue', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.paymentStateValue),
              ]);
            }
          },
          {title: '企业账户类型', key: 'accountTypeValue', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.accountTypeValue),
              ]);
            }
          },
          {title: '结算银行', key: 'paymentBankValue', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.paymentBankValue),
              ]);
            }
          }
        ],
        payee: '',
        paymentWay:3,
        payeeList: [
          {label: "住房资金归集待结算户", value: "住房资金归集待结算户"},
          {label: "上海市公积金管理中心（黄浦支行（1））", value: "上海市公积金管理中心（黄浦支行（1））"},
        ],
        paymentWayList: [
          {label: "支票", value: 2},
          {label: "转账", value: 3},
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
            {index: 7, employeeAccount: "", name: "",  IdNumber: "", repairReason: "", dateToDate1: "", payPercent1: "", repairPriceEveryMonth1: "", repairSubTotal1: "", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: ""},
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
        }
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
        FundPay.getFundPaysTableData(params).then(data=>{
          this.refresh(data)
        }).catch(error=>{
          console.log(error)
        })
      },
      clickOperateAdd() {
        if(!this.operateEditData[0]){
          this.$Message.error("此批次已删除，请返回重新生成！");
          return false;
        }
        // this.isShowOperateEdit = false;
        this.isShowOperateAdd = true;
        let row = {};
        row.paymentBank = this.operateEditData[0].paymentBank;
        row.fundAccountType = this.operateEditData[0].fundAccountType;
        row.paymentMonthValue = this.operateEditData[0].paymentMonth;
        row.paymentStatus = this.operateEditData[0].paymentStatus;
        let params = {
          pageSize: 99999,//暂时这么改，后续把分页去掉
          pageNum: 1,
          params:row
        };
        FundPay.getMakePayListsTableData(params).then(data=>{
              this.addPayment(data)
          }).catch(error=>{
            console.log(error)
          })

      },
      goBack() {
        this.isShowOperateAdd = false;
        this.isShowOperateEdit = false;
        this.selectedData = [];
        this.selectedData1 = [];
        this.payee = '',
        this.paymentWay = 3,
        this.clickQuery();
      },
      getParams(page) {
        if(this.operatorSearchData.paymentMonth!=''){
          this.operatorSearchData.payDate= Tools.formatDate(this.operatorSearchData.paymentMonth, 'YYYYMM');
          this.operatorSearchData.paymentMonth= Tools.formatDate(this.operatorSearchData.paymentMonth, 'YYYYMM');
        }
       return {
          pageSize: this.size,
          pageNum: page,
          params:this.operatorSearchData
        }
      },

      queryData(){
        this.loading=true;
        let params = {
          pageSize: this.size,
          pageNum: this.pageNum,
          params:this.operatorSearchData
        };
        FundPay.getFundPaysTableData(params).then(data=>{
          this.refresh(data)
        }).catch(error=>{
          console.log(error)
        })
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
      selectChange(selection) {

        if(selection.length > 0){
          var item = selection[0];
          this.progressInfo.paymentId = item.paymentId;
          this.progressInfo.paymentState = item.paymentState;
        }
        else{
          this.progressInfo.paymentId = 0;
          this.progressInfo.paymentState = 0;
        }
      },

      handlePageNum(val) {
        this.pageNum = val;
        this.queryData();
      },
      handlePageSite(val) {
        this.size = val;
        this.queryData();
      },
      //生成导出文件
      exportTable(name) {
        let row;
        row=this.checkSelect();
        if(!row)return false;
        let params ={paymentId:row.paymentId}
        switch(parseInt(name)) {
          case 0:
            this.$refs.fundPay.exportCsv({
              filename: 'excel',
              original: false
            });
            break;
          case 1:
             params.hfType=1;
             FundPay.chgDetailListExport({
                pageSize: this.$utils.DEFAULT_PAGE_SIZE,
                pageNum: 1,
                params: params,
              });
            break;
          case 2:
             params.hfType=2;
             FundPay.chgDetailListExport({
                pageSize: this.$utils.DEFAULT_PAGE_SIZE,
                pageNum: 1,
                params: params,
              });
            break;
          case 3:
            params.hfType=1;
             FundPay.repairDetailListExport({
                pageSize: this.$utils.DEFAULT_PAGE_SIZE,
                pageNum: 1,
                params: params,
              });
            break;
          case 4:
            params.hfType=2;
             FundPay.repairDetailListExport({
                pageSize: this.$utils.DEFAULT_PAGE_SIZE,
                pageNum: 1,
                params: params,
              });
            break;
          case 5:
           // this.printTransferNote();
            this.printPayNote(1);
            break;
          case 6:
            this.printPayNote(2);
            break;
          case 7:
            this.printFinancePayVoucher();
            break;
          default:
            break;
        }
      },

      checkSelect(){
        let row = {};
        if (this.currentIndex >= 0) {
          row = this.fundPayData[this.currentIndex];
          return row;
        }else{
          this.$Message.success("请选择一条记录！");
          return false;
        }
      },
      processOpt(name){
        switch(parseInt(name)) {
          case 0:
            this.processApproval();
            break;
          case 1:
            this.processPayment();
            break;
          case 2:
            this.processTicket();
            break;
          case 3:
            this.processReceipt();
            break;
          default:
            break;
        }
      },

      printTransferNote(){
        let rows = [
          {"year":"2018","month":"04","day":21,"employeeName":"张三","fundAccount":"CA21525","transferInUnitName":"上海我爱你家","transferInAccount":"SS2212121","transferOutUnitName":"上海你家爱我","transferOutAccount":"XX12254","totalNum":54},
          {"year":"2018","month":"04","day":22,"employeeName":"李四","fundAccount":"CA21568","transferInUnitName":"上海移动","transferInAccount":"SS878556","transferOutUnitName":"上海电信","transferOutAccount":"XX56455","totalNum":100}
        ];
        FundPay.printTransferNote(rows);
      },
      printPayNote(hfType){
        let row;
        row=this.checkSelect();
        if(!row)return false;

        let rows = [
          {"year":"2018","month":"04","day":21,"pageNum":1,"unitName":"上海移动","payYear":"2018","payMonth":"04","addFundAccount":"SX455656","pensonNum":54,"upperAmount":"壹仟陆佰捌拾捌元玖角玖分","amount":"1688.99","lastMonthPayNumber":45,"lastMonthPayAmount":"4555","thisMonthAddPayNumber":21,"thisMonthAddPayAmount":"5412","thisMonthReducePayNumber":14,"thisMonthReducePayAmount":"15000.36","thisMonthPayNumber":60,"thisMonthPayAmount":"6400","payBank":"招商","payAccount":"612655656","payCheckNumber":"C46568"},
          //{"year":"2018","month":"04","day":23,"pageNum":2,"unitName":"上海电信","payYear":"2018","payMonth":"04","addFundAccount":"SX455656","pensonNum":54,"upperAmount":"壹仟陆佰捌拾捌元玖角玖分","amount":"1688.99","lastMonthPayNumber":45,"lastMonthPayAmount":"4555","thisMonthAddPayNumber":21,"thisMonthAddPayAmount":"5412","thisMonthReducePayNumber":14,"thisMonthReducePayAmount":"15000.36","thisMonthPayNumber":60,"thisMonthPayAmount":"6401","payBank":"建设","payAccount":"612655656","payCheckNumber":"C46565"}
        ];
          let results=[];
          let params={paymentId:row.paymentId,hfType:hfType}
          FundPay.getRemittedBook(params).then(data=>{
            results=data.data;
            FundPay.printPayNote(results);
          }).catch(error=>{
            console.log(error)
          })
      },



//支付状态: 1 ,可付(默认)   2,送审   3 汇缴(已申请到财务部 ) 4  财务部批退  5,财务部审批通过  6 出票 7  回单
      processApproval(){
        let row;
        row=this.checkSelect();
        if(!row)return false;
        if(row.paymentState == 1 || row.paymentState == 4 ){
          let params = {
            paymentId:row.paymentId,
            operator:""
          };


          FundPay.processApproval(params).then(data=>{
            this.$Message.success(data.message);
            this.queryData();
          }).catch(error=>{
            console.log(error)
          })
        }else{
          this.$Message.info("该记录不能送审，请检查!");
        }
      },
      processPayment(){
        let row;
        row=this.checkSelect();
        if(!row)return false;
        if(row.paymentState == 2){
          let params = {
            paymentId:row.paymentId,
            operator:""
          };
          FundPay.processPayment(params).then(data=>{
            this.$Message.success(data.message);
            this.queryData();
          }).catch(error=>{
            console.log(error)
          })
        }else{
          this.$Message.info("该记录不能汇缴，请检查!");
        }
      },
      processTicket(){
        let row;
        row=this.checkSelect();
        if(!row)return false;
        if(row.paymentState == 5){
          let params = {
            paymentId:row.paymentId,
            operator:""
          };
          FundPay.processTicket(params).then(data=>{
            this.$Message.success(data.message);
            this.queryData();
          }).catch(error=>{
            console.log(error)
          })
        }else{
          this.$Message.info("该记录不能出票，请检查!");
        }
      },
      processReceipt(){
        let row;
        row=this.checkSelect();
        if(!row)return false;
        if(row.paymentState == 6){
          let params = {
            paymentId:row.paymentId,
            operator:""
          };
          FundPay.processReceipt(params).then(data=>{
            this.$Message.success(data.message);
            this.queryData();
          }).catch(error=>{
            console.log(error)
          })
        } else{
          this.$Message.info("该记录不能回单，请检查!");
        }
      },
      //操作
      operate(name) {
        switch(parseInt(name)) {
          case 0:
            this.viewPayment();
            break;
          case 1:
            this.editPayment();
            break;
          case 2:
            this.delPayment();
            break;
          case 3:
            break;
          default:
            break;
        }
      },
      viewPayment(){
        let row;
        row=this.checkSelect();
        if(!row)return false;
        let params ={
          pageSize: 99999,//暂时这么改，后续把分页去掉
          pageNum: 1,
          params:row
        }
        FundPay.getFundPaysOperateDetailData(params).then(data=>{
          this.operateDetailData = data.data.operateDetailData
        }).catch(error=>{
          console.log(error)
        })
          this.isShowOperateDetail = true;
      },
      editPayment(){
        let row;
        row=this.checkSelect();
        if(!row)return false;
        let params ={
          pageSize: 99999,//暂时这么改，后续把分页去掉
          pageNum: 1,
          params:row
        }
        FundPay.getFundPaysOperateEditData(params).then(data=>{
          this.operateEditData = data.data.operateEditData;
        }).catch(error=>{
          console.log(error)
        })
        this.isShowOperateEdit = true;
      },
      delPayment(){
        let row;
        row=this.checkSelect();
        if(!row)return false;
      if(row.paymentState != 1 && row.paymentState !=4 && row.paymentState !=2  ){
        this.$Message.info('当前状态，不允许删除！');
        return false;
      }
        this.$Modal.confirm({
                      title: '警告',
                      content: '您确认删除操作吗？',
                      okText: '删除',
                      onOk: () => {
                            let params ={
                            paymentId:row.paymentId
                            }
                            FundPay.delPayment(params).then(data=>{
                              this.$Message.success(data.message);
                              this.clickQuery();
                            });
                      }
                    })
      },
      // 添加汇缴支付数据(编辑汇缴支付弹框中)
      addPayment(data){
        this.operateAddData = data.data.makePayListData;
        this.makePayListInfo = data.data.makePayListInfo;
        if(typeof(data.data.totalSize)=='undefined') this.totalSize = 0
        else this.totalSize = Number(data.data.totalSize)
        this.closeLoading();
        this.isShowOperateAdd = true;
      },
      // 保存汇缴支付数据(添加汇缴支付弹框中)
      createPaymentComList() {
        if(this.selectedData.length==0){
            this.$Message.error('请选择添加列表中的公积金账户数据！');
            return false;
        }
        this.$Modal.confirm({
                    title: '确认',
                    content: '您确认添加吗？',
                    okText: '确认',
                    onOk: () => {
                      let params = {
                          listData:this.selectedData,  //
                          paymentId:this.checkSelect().paymentId,
                          paymentMonth:this.checkSelect().paymentMonth
                      }
                      FundPay.createPaymentComListById(params).then(data=>{
                        if(data.code==200){
                          this.$Message.success(data.message);
                          this.isShowOperateAdd = false;
                          this.editPayment();
                        }else{
                          this.$Message.error(data.message);
                        }
                      }).catch(error=>{
                        console.log(error)
                      })
                    }
                  })
      },
      ruleValidate: {
          paymentMonth: [
            { required: true,
              message: '必须选择汇缴年月',
              trigger: 'blur',
              type:'date'
            }
          ],
          fundAccountType: [
            { required: true,
              type: 'string',
              message: '至少选择一种企业公积金账户类型',
              trigger: 'blur',
            }
          ],
          paymentBank: [
            { required: true,
              message: '至少选择一家结算银行',
              trigger: 'blur',
            }
          ]
        },
      generateBank(name) {
        switch(parseInt(name)) {
          case 0:
            this.generateBankRepair();
            break;
          case 1:
            this.generateBankChange();
            break;
          default:
            break;
        }
      },
      generateBankRepair() {
        let row;
        row=this.checkSelect();
        FundPay.generateBankRepair({
          paymentId:row.paymentId,
        })
      },
      generateBankChange() {
        let row;
        row=this.checkSelect();
        FundPay.generateBankChange({
          paymentId:row.paymentId,
        })
      },
 	    printFinancePayVoucher(){
        let row;
        row=this.checkSelect();
        if(!row)return false;
        if(row.payApplyCode == null ||  row.payApplyCode ==''  ){
          this.$Message.info('汇缴操作后，才可以打印付款凭证！');
          return false;
        }
        let params ={payApplyCode:row.payApplyCode}
        FundPay.printFinancePayVoucher(params);
      },
      // 删除汇缴名单操作中的编辑页面中选中的列
      delOperateEditData(row) {
        this.$Modal.confirm({
                      title: '警告',
                      content: '您确认删除操作吗？',
                      okText: '删除',
                      onOk: () => {
                        let params = {
                          paymentId : row.paymentId,
                          paymentBank : row.paymentBank,
                          hfType : row.hfType,
                          paymentState : row.paymentState,
                          paymentStatus: row.paymentStatus,
                          paymentMonth : row.paymentMonth,
                          comAccountId : row.comAccountId,
                          paymentMonthValue : row.paymentMonthValue,
                          fundAccountType : row.fundAccountType,
                          companyId : row.companyId,
                          companyName : row.companyName
                        }
                      FundPay.delOperateEditData(params).then(data=>{
                        this.$Message.success(data.message);
                        this.editPayment();
                      });
                      }
                    })
      },
      updateMakePayListInfo(selection) {
        var sumAmount = 0;
        var payInBackAmount = 0;
        for(var i=0; i<selection.length;i++) {
          sumAmount += Number(selection[i].sumAmount);
          payInBackAmount += Number(selection[i].payInBackAmount);
        }
        this.makePayListInfo.payAmount = sumAmount;
        this.makePayListInfo.repair = payInBackAmount;
        this.makePayListInfo.amount = sumAmount + payInBackAmount;
        this.makePayListInfo.rows = selection.length;
        this.resetSelectedData(selection);
      },
      resetSelectedData(selection) {
        this.selectedData.length = 0;
        if(selection) {
          selection.forEach((element, index, array) => {
            this.selectedData.push(element.paymentAccountId);
            this.selectedData1.push(element.paymentStateValue);
          })
        }
      },

      //导出公积金汇缴支付操作详情Excel
      operateDetailExcelExport() {
        let row;
        row=this.checkSelect();
        if(!row)return false;
        let params ={paymentId : row.paymentId}
        FundPay.operateDetailExcelExport({
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageNum: 1,
          params: params,
        });

      }
    }
  }
</script>
